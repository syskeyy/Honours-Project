import { Bicycles } from './models.js';
import { Rides } from './models.js';
import { User } from './models.js';
import { Settings } from './models.js';
import { connectToMongo } from './utils';
import { getServerSession } from 'next-auth/next'


// JS Logical operators were referenced from https://www.w3schools.com/js/js_comparisons.asp

// Mongoose methods were referenced from https://mongoosejs.com/docs/api/model.html

// fetches a bicycle using a given id. This is done in the search box that displays the bicycle names depending on the user input
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

// fetches a bicycle using a given id
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
    
// fetches all bicycles associated with the user 
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
// fetches all rides associated with the user. Lists 8 entries per page and allows for pagination.
export const fetchRides = async (q, page) => {
    const session = await getServerSession()
    const userEmail = session?.user?.email

    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 8;
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
// fetches all rides associated with the user. Lists 4 entries for the dashboard page.

export const fetchRidesDashboard = async (q, page) => {
    const session = await getServerSession()
    const userEmail = session?.user?.email

    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 4;
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

// fetches a ride using a given id
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

// next 4 functions are essentially the same, it fetches the user's component healths from the bicycles collection. I admit, this is quite redundant and could have been done like the last function.
export const fetchDrivetrainHealth = async (q) => {
    const session = await getServerSession()
    const userEmail = session?.user?.email
    const regex = new RegExp(q, "i");

    try{
        connectToMongo();
        const bike = await Bicycles.findOne({bicyclename: {$regex:regex}, userEmail: userEmail}).sort({createdAt: -1}).select('drivetrainhealth');
        const settings = await Settings.findOne({userEmail: userEmail});
        if (!bike) {
            return 0;
        }
        const drivetrainPercentage = bike.drivetrainhealth / ((settings && settings.drivetrainLifespan) ? settings.drivetrainLifespan : 100) * 100;
        return drivetrainPercentage;

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
        const settings = await Settings.findOne({userEmail: userEmail});
        if (!bike) {
            return 0;
        }
        const brakePercentage = bike.brakehealth / ((settings && settings.brakeLifespan) ? settings.brakeLifespan : 100) * 100;
        return brakePercentage;

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
        const settings = await Settings.findOne({userEmail: userEmail});

        if (!bike) {
            return 0;
        }
        const tyrePercentage = bike.tyrehealth / ((settings && settings.tyreLifespan) ? settings.tyreLifespan : 100) * 100;
        return tyrePercentage;

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
        const settings = await Settings.findOne({userEmail: userEmail});

        if (!bike) {
            return 0;
        }

        const bikePercentage = bike.bikehealth / ((settings && settings.bikeLifespan) ? settings.bikeLifespan : 100) * 100;
        return bikePercentage;


    }
    catch(err){
        console.log(err);
        throw new Error('Error fetching ride');

    }
}

// fetches the user's experience from the user collection. This is used in the xp bar in the dashboard.
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

// So this will fetch the users set lifespan for each component. This is used in the card components in the dashboard to display how much a ride affects the lifespan of a component. If empty it will default to 100.
export const fetchLifespan = async () => {
    const session = await getServerSession()
    const userEmail = session?.user?.email

    try{
        connectToMongo();
        const lifespan = await Settings.findOne({ userEmail: userEmail })|| {};
        return {
            drivetrainLifespan: lifespan.drivetrainLifespan || 100,
            brakeLifespan: lifespan.brakeLifespan || 100,
            tyreLifespan: lifespan.tyreLifespan || 100,
            bikeLifespan: lifespan.bikeLifespan || 100
        }

    }
    catch(err){
        console.log(err);
        throw new Error('Error updating dashboard lifespan');
    }
}

// So this bit fetches the users details for the email function. It will return the email, xp and name of the user and turn it into an array using the map method which will get passed into the api/send. 
// Similar solution was found here: https://forum.freecodecamp.org/t/how-to-get-username-from-userid-using-map-function/516256, I altered it to fit my needs.
export const fetchEmail = async () => {
    try{
        connectToMongo();
        const users = await User.find();
        console.log(users);
        return users.map(user => ({
            email: user.email,
            xp: user.xp,
            name: user.name
        }));
    }
    catch(err){
        console.log(err);
        throw new Error('Error fetching email');
    }
}