import { it } from 'node:test';
import { Bicycles } from './models.js';
import { Rides } from './models.js';
import { connectToMongo } from './utils';



export const fetchBicycles = async (q) => {

        const regex = new RegExp(q, "i");
        try{
            connectToMongo();
            const bicycles = await Bicycles.find({bicyclename: {$regex:regex}});
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

        try{
            connectToMongo();
            const bicycle = await Bicycles.find();
            return bicycle;
        }
        catch(err){
            console.log(err);
            throw new Error('Error fetching bicycles');

        }
    }

export const fetchRides = async (q, page) => {

    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 10;
    try{
        connectToMongo();
        const count = await Rides.find({ridename: {$regex:regex}}).count();
        const rides = await Rides.find({ridename: {$regex:regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
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