import mongoose from "mongoose";

//This is the schema for the mongodb database
// The models are quite self explanatory, I just set the types I wanted to use, and what was required and what was not

//Schema is references from https://mongoosejs.com/docs/schematypes.html
const BicycleSchema = new mongoose.Schema({
    userEmail: {
      type: String,
      required: true,
    },
    bicyclename: {
      type: String,
      required: true,
      maxlength: 20
    },
    bicycletype: {
      type: String,
      enum: ['gravel', 'road', 'mountain','hybrid', 'cyclocross', 'bmx', 'folding', 'electric', 'other'],
      required: true
    },
    bicycleyear: {
      type: String,
      required: false
    },
    bicyclemileage: {
      type: Number,
      required: true,
      min: 0
    },
    bicycledescription: {
      type: String,
      required: false,
      maxlength: 2000
    },
    drivetrainhealth: {
      type: Number,
      required: false,
      min: 0,
      max: 1000
    },
    brakehealth: {
      type: Number,
      required: false,
      min: 0,
      max: 1000
    },
    tyrehealth: {
      type: Number,
      required: false,
      min: 0,
      max: 1000
    },
    bikehealth: {
      type: Number,
      required: false,
      min: 0,
      max: 1000
    }
  },{timestamps: true});

// Bicycle collection schema. 

const RidesSchema = new mongoose.Schema({
    userEmail: {
      type: String,
      required: true,
    },
    ridename: {
      type: String,
      required: true,
      maxlength: 40
    },
    ridedistance: {
      type: Number,
      required: true,
      min: 0
    },
    ridedate: {
      type: Date,
      required: true,
    },
    ridebicycle: {
      type: String,
      required: true,
    },
    ridespeed: {
      type: Number,
      required: true,
    },
    ridetime: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: props => `${props.value} is not a valid time!`
      }
    },
    ridedescription: {
      type: String,
      required: false,
      maxlength: 2000
    }
  },{timestamps: true});

// User collection schema.
const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      image: {
        type: String,
        required: false,
      },
      xp: {
        type: Number,
        required: false,
        default: 0,
        maxlength: 10000
      },
    },
    { timestamps: true },
  );
// User settings schema.
const UserSettings = new mongoose.Schema(
    {
      userEmail: {
        type: String,
        required: true,
      },
      drivetrainLifespan: {
        type: Number,
        required: false,
        default: 100,
        min: 1,
        max: 1000
      },
      brakeLifespan: {
        type: Number,
        required: false,
        default: 100,
        min: 1,
        max: 1000
      },
      tyreLifespan: {
        type: Number,
        required: false,
        default: 100,
        min: 1,
        max: 1000
      },
      bikeLifespan: {
        type: Number,
        required: false,
        default: 100,
        min: 1,
        max: 1000
      },
      notificationOff: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    { timestamps: true },
  );

export const Bicycles = mongoose.models.Bicycles || mongoose.model("Bicycles", BicycleSchema);
export const Rides = mongoose.models.Rides || mongoose.model("Rides", RidesSchema);
export const User =  mongoose.models.User || mongoose.model("User", UserSchema);
export const Settings =  mongoose.models.Settings || mongoose.model("Settings", UserSettings);