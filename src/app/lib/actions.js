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

// Quick note: variables ending with health are used to track the current health of the bike components,  the variables ending with lifespan are used to track the default health of the bike components
// the common trend you will see in both the actions.js and data.js files is the use of user session to validate the user to their data. The user email is the unique ID used on all fields
// upon the creation of a new bicycle, the drivetrain, brake, tyre and bike health are all set to a default value of 100. The bicycle is then saved to the database. If settings are added before a bicycle is added, then it will use the value from settings to set the healths.
export const addBicycles = async (formData) => {
    const session = await getServerSession();
    const userEmail = session?.user?.email
    const bicyclename = formData.get('bicyclename');
    const bicycletype = formData.get('bicycletype');
    const bicycleyear = formData.get('bicycleyear');
    const bicyclemileage = formData.get('bicyclemileage');
    const bicycledescription = formData.get('bicycledescription');
        // im checking to see if settings or settings components are present, if empty it will assign default value of 100, otherwise it will use values from settings
        try{
            connectToMongo();
            const settings = await Settings.findOne({ userEmail: session.user.email });
            const drivetrainhealth = ((settings && settings.drivetrainLifespan) ? settings.drivetrainLifespan : 100)
            const brakehealth = ((settings && settings.brakeLifespan) ? settings.brakeLifespan : 100)
            const tyrehealth = ((settings && settings.tyreLifespan) ? settings.tyreLifespan : 100)
            const bikehealth = ((settings && settings.bikeLifespan) ? settings.bikeLifespan : 100)
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
        //redirects to the bicycles page after submission
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

// adds user rides but also updates the bicycle component healths as seen, if value is blank then it defaults to 100. As you can see it will return the bicycle the user has most recently created at which means only the most recent bicycle will be updated.

export const addRides = async (formData) => {
    const session = await getServerSession();
    const userEmail = session?.user?.email
    const ridename = formData.get('ridename');
    const ridedistance = formData.get('ridedistance');
    const ridedate = formData.get('ridedate');
    const ridespeed = formData.get('ridespeed');
    const ridebicycle = formData.get('ridebicycle');
    const ridetime = formData.get('ridetime');
    const ridedescription = formData.get('ridedescription');
        try{
            connectToMongo();
            // this is used to find the most recent bicycle that the user has created
            const bicycles = (await Bicycles.find({ bicyclename: ridebicycle, userEmail: userEmail }).sort({ createdAt: -1 }).limit(1));
            const previousBicycle = bicycles[0];
            // Math.max is used to make sure the value doent go below 0
            let drivetrainhealth = Math.max(0, previousBicycle.drivetrainhealth - ridedistance);
            console.log("Updated ride health: ", drivetrainhealth)
            let brakehealth = Math.max(0, previousBicycle.brakehealth - ridedistance);
            console.log("Updated ride health: ", brakehealth)
            let tyrehealth = Math.max(0, previousBicycle.tyrehealth - ridedistance);
            console.log("Updated ride health: ", tyrehealth)
            let bikehealth = Math.max(0, previousBicycle.bikehealth - ridedistance);
            console.log("Updated ride health: ", bikehealth)
            // updates the bicycle healths as well as adding on the mileage
            await Bicycles.updateOne({ bicyclename: ridebicycle, userEmail: userEmail }, { $set: { drivetrainhealth: drivetrainhealth, brakehealth: brakehealth, tyrehealth: tyrehealth, bikehealth: bikehealth }, $inc: { bicyclemileage: ridedistance}});
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

// These 4 functions below are used to update the component health of a bicycle in the database. This gets updates when a user clicks on the 'reset service' in the dashboard.
// It will first search for a bicycle that was most recently created, if bike is found, it will update the health of components. If settings or settings.drivetrainlifespan is empty, it will default to 100.
// This is not a great way of doing so as I have 4 different functions for each health component. I should have made a single function that could do it
//The value that it returns at the end is passed into the component gauge to show the % value, I have multiplied it to 100 as it ensures that the gauge will reset too 100%

export const UpdateDrivetrainHealth = async () => {
    const session = await getServerSession()
    const userEmail = session?.user?.email

    try{
        connectToMongo();
        const bike = await Bicycles.findOne({ userEmail: userEmail }).sort({createdAt: -1});
        const settings = await Settings.findOne({ userEmail: userEmail });
        if (bike) {
            bike.drivetrainhealth = ((settings && settings.drivetrainLifespan) ? settings.drivetrainLifespan : 100);
            await bike.save();
            console.log(bike)
            return bike.drivetrainhealth*100;
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
        const settings = await Settings.findOne({ userEmail: userEmail });
        if (bike) {
            bike.brakehealth = ((settings && settings.brakeLifespan) ? settings.bikeLifespan : 100);
            await bike.save(); 
            console.log(bike)
            return bike.brakehealth*100;
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
        const settings = await Settings.findOne({ userEmail: userEmail });
        if (bike) {
            bike.tyrehealth = ((settings && settings.tyreLifespan) ? settings.tyreLifespan : 100);
            await bike.save();
            console.log(bike)
            return bike.tyrehealth*100;
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
        const settings = await Settings.findOne({ userEmail: userEmail });
        if (bike) {
            bike.bikehealth = ((settings && settings.bikeLifespan) ? settings.bikeLifespan : 100);
            await bike.save();
            console.log(bike)
            return bike.bikehealth*100;
        } else {
            throw new Error('No ride found for this user');
        }
    }
    catch(err){
        console.log(err);
        throw new Error('Error updating ride');
    }
}

// Update experiance simply adds 10 xp to the user. This gets called when the user clicks on the reset button, this only works below 100% health

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
// Settings is used to configure the lifespan of the components. The setttings are frequently used to reference values needed for when resetting. 
// This function is used to add settings to the database. Upon submission of the settings form, it will update the bicycles and update the settings.
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
      let bicycles = await Bicycles.findOneAndUpdate(
        { userEmail: userEmail },
        { drivetrainhealth: drivetrainLifespan,
          brakehealth: brakeLifespan,
          tyrehealth: tyreLifespan,
          bikehealth: bikeLifespan}
        );
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