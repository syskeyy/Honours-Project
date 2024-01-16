"use server"

import { revalidatePath } from 'next/cache';
import { Bicycles } from './models';
import { Rides } from './models';
import { connectToMongo } from './utils';
import { redirect } from 'next/navigation';

export const addBicycles = async (formData) => {
    const bicyclename = formData.get('bicyclename');
    const bicycletype = formData.get('bicycletype');
    const bicycleyear = formData.get('bicycleyear');
    const bicyclemileage = formData.get('bicyclemileage');
    const bicycledescription = formData.get('bicycledescription');

        try{
            connectToMongo();
            const newBicycle = new Bicycles({
                bicyclename,
                bicycletype,
                bicycleyear,
                bicyclemileage,
                bicycledescription
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
    const ridename = formData.get('ridename');
    const ridedistance = formData.get('ridedistance');
    const ridedate = formData.get('ridedate');
    const ridetime = formData.get('ridetime');
    const ridedescription = formData.get('ridedescription');

        try{
            connectToMongo();
            const newRides = new Rides({
                ridename,
                ridedistance,
                ridedate,
                ridetime,
                ridedescription
            });
        
        await newRides.save();
        }catch(err){
            console.log(err.errors);
            throw new Error('Error submitting rides');
        }
    revalidatePath("/dashboard/rides");
    redirect("/dashboard/rides");
}