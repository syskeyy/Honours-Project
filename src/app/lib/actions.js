"use server"

// Imports
import { revalidatePath } from 'next/cache';
import { Bicycles } from './models';
import { Rides } from './models';
import { User } from './models';
import { Settings } from './models';
import { connectToMongo } from './utils';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next";

// The common trend you will see in both the actions.js and data.js files is the use of user session to validate the user to their data. The user email is the unique ID used on all fields.
// Upon the creation of a new bicycle, the drivetrain, brake, tyre and bike health are all set to 100. The bicycle is then saved to the database.
export const addBicycles = async (formData) => {
    const session = await getServerSession();
    const bicyclename = formData.get('bicyclename');
    const bicycletype = formData.get('bicycletype');
    const bicycleyear = formData.get('bicycleyear');
    const bicyclemileage = formData.get('bicyclemileage');
    const bicycledescription = formData.get('bicycledescription');
    const drivetrainhealth = 100;
    const brakehealth = 100;
    const tyrehealth = 100;
    const bikehealth = 100;

        try{
            connectToMongo();
            const newBicycle = new Bicycles({
                userEmail: session.user.email,
                bicyclename,
                bicycletype,
                bicycleyear,
                bicyclemileage,
                bicycledescription,
                drivetrainhealth,
                brakehealth,
                tyrehealth,
                bikehealth
            });
        
        await newBicycle.save();
        }catch(err){
            console.log(err.errors);
            throw new Error('Error submitting bicycles');
        }

    revalidatePath("/dashboard/bicycles");
    redirect("/dashboard/bicycles");
}

// The deleteBicycle function is used to delete a bicycle from the database. It uses the bicycle id to find the bicycle and then deletes it.
export const deleteBicycle = async (formData) => {
    const { id } = Object.fromEntries(formData);

        try{
            connectToMongo();
            await Bicycles.findByIdAndDelete(id);
            console.log("Bicycle deleted") 

        }catch(err){
            console.log(err.errors);
            throw new Error('Error deleting bicycles');
        }

    revalidatePath("/dashboard/bicycles");
    redirect("/dashboard/bicycles");
}

// Adds user rides but also updates the bicycle component healths as seen, if value is blank then it defaults to 20. As you can see it will return the bicycle the user has most recently created at which means only the most recent bicycle will be updated.
export const addRides = async (formData) => {
    const session = await getServerSession();
    const ridename = formData.get('ridename');
    const ridedistance = formData.get('ridedistance');
    const ridedate = formData.get('ridedate');
    const ridespeed = formData.get('ridespeed');
    const ridebicycle = formData.get('ridebicycle');
    const ridetime = formData.get('ridetime');
    const ridedescription = formData.get('ridedescription');
        try{
            connectToMongo();
            const settings = await Settings.findOne({ userEmail: session.user.email, });
            const bicycles = (await Bicycles.find({ bicyclename: ridebicycle }).sort({ createdAt: -1 }).limit(1));
            const previousBicycle = bicycles[0];

            let drivetrainLifespan = settings ? settings.drivetrainLifespan : 20;
            let drivetrainhealth = previousBicycle ? Math.max(0, Math.min(100, previousBicycle.drivetrainhealth - drivetrainLifespan)) : 20;

            let brakeLifespan = settings ? settings.brakeLifespan : 20;
            let brakehealth = previousBicycle ? Math.max(0, Math.min(100, previousBicycle.brakehealth - brakeLifespan)) : 20;

            let tyreLifespan = settings ? settings.tyreLifespan : 20;
            let tyrehealth = previousBicycle ? Math.max(0, Math.min(100, previousBicycle.tyrehealth - tyreLifespan)) : 20;
            
            let bikeLifespan = settings ? settings.bikeLifespan : 10;
            let bikehealth = previousBicycle ? Math.max(0, Math.min(100, previousBicycle.bikehealth - bikeLifespan)) : 20;

            await Bicycles.updateOne({ bicyclename: ridebicycle }, { $set: { drivetrainhealth: drivetrainhealth, brakehealth: brakehealth, tyrehealth: tyrehealth, bikehealth: bikehealth }, $inc: { bicyclemileage: ridedistance}});
            const newRides = new Rides({
                userEmail: session.user.email,
                ridename,
                ridedistance,
                ridedate,
                ridetime,
                ridebicycle,
                ridedescription,
                ridespeed
            });
        await newRides.save();
        }catch(err){
            console.log(err.errors);
            throw new Error('Error submitting rides');
        }
    revalidatePath("/dashboard/rides");
    redirect("/dashboard/rides");
}

// The deleteRide function is used to delete a ride from the database. It uses the ride id to find the ride and then deletes it.
export const deleteRide = async (formData) => {
    const { id } = Object.fromEntries(formData);

        try{
            connectToMongo();
            await Rides.findByIdAndDelete(id);
            console.log("rides Deleted") 

        }catch(err){
            console.log(err.errors);
            throw new Error('Error deleting rides');
        }
    revalidatePath("/dashboard/rides");
    redirect("/dashboard/rides");
}

// These functions are used to update the component health of a bicycle in the database. This gets fetched when a user clicks on the 'reset service' in the dashboard. 
// This is not a great way of doing so as I have 4 different functions for each health component. I should have made a single function that could do it.
export const UpdateDrivetrainHealth = async () => {
    const session = await getServerSession()
    const userEmail = session?.user?.email

    try{
        connectToMongo();
        const bike = await Bicycles.findOne({ userEmail: userEmail }).sort({createdAt: -1});
        if (bike) {
            bike.drivetrainhealth = 100;
            await bike.save();
            console.log(bike)
            return bike.drivetrainhealth;
        } else  {
                return 0;
                throw new Error('No ride found for this user');
            }

    }
    catch(err){
        console.log(err);
        throw new Error('Error updating ride');
    }
}

export const UpdateBrakeHealth = async () => {
    const session = await getServerSession()
    const userEmail = session?.user?.email

    try{
        connectToMongo();
        const bike = await Bicycles.findOne({ userEmail: userEmail }).sort({createdAt: -1});
        if (bike) {
            bike.brakehealth = 100;
            await bike.save();
            console.log(bike)
            return bike.brakehealth;
        } else {
            throw new Error('No ride found for this user');
        }
    }
    catch(err){
        console.log(err);
        throw new Error('Error updating ride');
    }
}

export const UpdateTyreHealth = async () => {
    const session = await getServerSession()
    const userEmail = session?.user?.email

    try{
        connectToMongo();
        const bike = await Bicycles.findOne({ userEmail: userEmail }).sort({createdAt: -1});
        if (bike) {
            bike.tyrehealth = 100;
            await bike.save();
            console.log(bike)
            return bike.tyrehealth;
        } else {
            throw new Error('No ride found for this user');
        }
    }
    catch(err){
        console.log(err);
        throw new Error('Error updating ride');
    }
}

export const UpdateBikeHealth = async () => {
    const session = await getServerSession()
    const userEmail = session?.user?.email

    try{
        connectToMongo();
        const bike = await Bicycles.findOne({ userEmail: userEmail }).sort({createdAt: -1});
        if (bike) {
            bike.bikehealth = 100;
            await bike.save();
            console.log(bike)
            return bike.bikehealth;
        } else {
            throw new Error('No ride found for this user');
        }
    }
    catch(err){
        console.log(err);
        throw new Error('Error updating ride');
    }
}


export const updateExperiance = async () => {
    const session = await getServerSession()
    const email = session?.user?.email

    try{
        connectToMongo();
        const user = await User.findOne({ email: email });
        console.log('user:', user);
        if (user) {
            user.xp += 10;
            await user.save();
            console.log(user.xp)
            return user.xp;
        } else {
            throw new Error('No xp field found for this user');
        }
    }
    catch(err){
        console.log(err);
        throw new Error('Error updating experience');
    }
}

// This function is used to add settings to the database. 
export const addSettings = async (formData) => {
    const session = await getServerSession();
    const userEmail = session?.user?.email;
    const drivetrainLifespan = formData.get('drivetrainLifespan');
    const brakeLifespan = formData.get('brakeLifespan');
    const tyreLifespan = formData.get('tyreLifespan');
    const bikeLifespan = formData.get('bikeLifespan');
    const notificationOff = formData.has('checkbox');
    const notificationThreshold = formData.get('notificationThreshold');
    try {
      connectToMongo();
      let settings = await Settings.findOneAndUpdate(
        { userEmail: userEmail },
        {
          userEmail: userEmail,
          drivetrainLifespan,
          brakeLifespan,
          tyreLifespan,
          bikeLifespan,
          notificationOff,
          notificationThreshold
        },
        { new: true, upsert: true });
    } catch (err) {
      console.log(err.errors);
      throw new Error('Error submitting settings');
    }
  
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }