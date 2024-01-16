import mongoose from "mongoose";

export const connectToMongo = async () => {

    const connection = {};

    try {
        if (connection.isConnected) return;
          console.log('=> using existing database connection');
          const db = await mongoose.connect(process.env.MONGODB_URI);
          connection.isConnected = db.connections[0].readyState;        
      }

    catch (error) {
        console.log('=> error connecting to database:', error);
        throw new Error('Error connecting to MongoDB');
    }
}