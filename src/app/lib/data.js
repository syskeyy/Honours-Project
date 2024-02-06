import { Bicycles } from './models.js';
import { Rides } from './models.js';
import { User } from './models.js';
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
            console.log(bicycle)
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

export const fetchDrivetrainHealth = async (q) => {
    const session = await getServerSession()
    const userEmail = session?.user?.email
    const regex = new RegExp(q, "i");

    try{
        connectToMongo();
        const bike = await Bicycles.findOne({bicyclename: {$regex:regex}, userEmail: userEmail}).sort({createdAt: -1}).select('drivetrainhealth');

        if (!bike) {
            return 0;
        }
        
        return bike.drivetrainhealth;

    }
    catch(err){
        console.log(err);
        throw new Error('Error fetching ride');

    }
}


export const fetchBrakeHealth = async (q, bike) => {
    const session = await getServerSession()
    const userEmail = session?.user?.email
    const regex = new RegExp(q, "i");

    try{
        connectToMongo();
        const bike = await Bicycles.findOne({bicyclename: {$regex:regex}, userEmail: userEmail}).sort({createdAt: -1}).select('brakehealth');

        if (!bike) {
            return 0;
        }
        
        return bike.brakehealth;

    }
    catch(err){
        console.log(err);
        throw new Error('Error fetching ride');

    }
}


export const fetchTyreHealth = async (q) => {
    const session = await getServerSession()
    const userEmail = session?.user?.email
    const regex = new RegExp(q, "i");

    try{
        connectToMongo();
        const bike = await Bicycles.findOne({bicyclename: {$regex:regex}, userEmail: userEmail}).sort({createdAt: -1}).select('tyrehealth');

        if (!bike) {
            return 0;
        }
        
        return bike.tyrehealth;

    }
    catch(err){
        console.log(err);
        throw new Error('Error fetching ride');

    }
}


export const fetchBikeHealth = async (q) => {
    const session = await getServerSession()
    const userEmail = session?.user?.email
    const regex = new RegExp(q, "i");

    try{
        connectToMongo();
        const bike = await Bicycles.findOne({bicyclename: {$regex:regex}, userEmail: userEmail}).sort({createdAt: -1}).select('bikehealth');

        if (!bike) {
            return 0;
        }
        
        return bike.bikehealth;

    }
    catch(err){
        console.log(err);
        throw new Error('Error fetching ride');

    }
}

export const fetchExperiance = async () => {
    const session = await getServerSession()
    const email = session?.user?.email

    try{
        connectToMongo();
        const user = await User.findOne({ email: email });
        return user.xp;
    }
    catch(err){
        console.log(err);
        throw new Error('Error updating experience');
    }
}
