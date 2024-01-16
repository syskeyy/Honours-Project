import mongoose from "mongoose";

const BicycleSchema = new mongoose.Schema({
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
    }
  },{timestamps: true});

const RidesSchema = new mongoose.Schema({
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

export const Bicycles = mongoose.models.Bicycles || mongoose.model("Bicycles", BicycleSchema);
export const Rides = mongoose.models.Rides || mongoose.model("Rides", RidesSchema);