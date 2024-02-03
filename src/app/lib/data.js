import { Bicycles } from './models.js';
import { Rides } from './models.js';
import { connectToMongo } from './utils';
import { getServerSession } from 'next-auth/next'


export const fetchBicycles = async (q) => {
    const session = await getServerSession()
    const userEmail = session?.user?.email
        const regex = new RegExp(q, "i");
        try{
            connectToMongo();
            const bicycles = await Bicycles.find({ bicyclename: { $regex: regex }, userEmail: userEmail });
            return bicycles;

        }
        catch(err){
            console.log(err); 
            throw new Error('Error fetching bicycles');

        }
    }
export const fetchBicycle = async (id) => {

        try{
            connectToMongo();
            const bicycle = await Bicycles.findById(id);
            return bicycle;
        }
        catch(err){
            console.log(err);
            throw new Error('Error fetching bicycles');

        }
    }
    
export const fetchAllBicycle = async () => {
    const session = await getServerSession()
    const userEmail = session?.user?.email

        try{
            connectToMongo();
            const bicycle = await Bicycles.find({userEmail: userEmail});
            return bicycle;
        }
        catch(err){
            console.log(err);
            throw new Error('Error fetching bicycles');

        }
    }

export const fetchRides = async (q, page) => {
    const session = await getServerSession()
    const userEmail = session?.user?.email

    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 10;
    try{
        connectToMongo();
        const count = await Rides.find({ridename: {$regex:regex}, userEmail: userEmail}).count();
        const rides = await Rides.find({ridename: {$regex:regex}, userEmail: userEmail}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        return {rides, count};

    }
    catch(err){
        console.log(err);
        throw new Error('Error fetching rides');

    }
}

export const fetchMostRecentRideDrivetrainHealth = async (q) => {
    const session = await getServerSession()
    const userEmail = session?.user?.email
    
    const regex = new RegExp(q, "i");

    try{
        connectToMongo();
        const ride = await Rides.findOne({ridename: {$regex:regex}, userEmail: userEmail}).sort({createdAt: -1}).select('drivetrainhealth');
        console.log(ride)
        return ride.drivetrainhealth;

    }
    catch(err){
        console.log(err);
        throw new Error('Error fetching ride');

    }
}

export const fetchRide = async (id) => {

    try{
        connectToMongo();
        const ride = await Rides.findById(id);
        return ride;
    }
    catch(err){
        console.log(err);
        throw new Error('Error fetching bicycles');

    }
}