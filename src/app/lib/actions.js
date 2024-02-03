"use server"

import { revalidatePath } from 'next/cache';
import { Bicycles } from './models';
import { Rides } from './models';
import { connectToMongo } from './utils';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next";

export const addBicycles = async (formData) => {
    const session = await getServerSession();
    const bicyclename = formData.get('bicyclename');
    const bicycletype = formData.get('bicycletype');
    const bicycleyear = formData.get('bicycleyear');
    const bicyclemileage = formData.get('bicyclemileage');
    const bicycledescription = formData.get('bicycledescription');
        try{
            connectToMongo();
            const newBicycle = new Bicycles({
                userEmail: session.user.email,
                bicyclename,
                bicycletype,
                bicycleyear,
                bicyclemileage,
                bicycledescription,
                drivetrainhealth
            });
        
        await newBicycle.save();
        }catch(err){
            console.log(err.errors);
            throw new Error('Error submitting bicycles');
        }

    revalidatePath("/dashboard/bicycles");
    redirect("/dashboard/bicycles");

}


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

export const addRides = async (formData) => {
    const session = await getServerSession();
    const ridename = formData.get('ridename');
    const ridedistance = formData.get('ridedistance');
    const ridedate = formData.get('ridedate');
    const ridespeed = formData.get('ridespeed');
    const ridebicycle = formData.get('bicycle');
    const ridetime = formData.get('ridetime');
    const ridedescription = formData.get('ridedescription');
        try{
            connectToMongo();
            const rides = (await Rides.find({ ridebicycle }).sort({ createdAt: -1 }).limit(1));
            const previousRide = rides[0];
            const drivetrainhealth = previousRide ? previousRide.drivetrainhealth - 20 : 100;
            const newRides = new Rides({
                userEmail: session.user.email,
                ridename,
                ridedistance,
                ridedate,
                ridetime,
                ridebicycle,
                ridedescription,
                ridespeed,
                drivetrainhealth
            });
        
        await newRides.save();
        }catch(err){
            console.log(err.errors);
            throw new Error('Error submitting rides');
        }
    revalidatePath("/dashboard/rides");
    redirect("/dashboard/rides");
}

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