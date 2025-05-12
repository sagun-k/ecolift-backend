import mongoose from 'mongoose';

import { handleDuplicateKeyError } from './error.js';

const schema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'UserProfile',
  },
  pickupLocation: {
    type: String,
    required: true,
    maxLength: 255,
  },
  dropoffLocation: {
    type: String,
    required: true,
    maxLength: 255,
  },
  status: {
    type: String,
    required: true,
    maxLength: 20,
  },
  distance: {
    type: Number,
    required: true,
  },
  isPreBooked: {
    type: Boolean,
    required: true,
  },
  preBookedDate: {
    type: Date,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
    validate: {
      validator: (val) => Math.floor(val) === val,
      message: 'An integer is required',
    },
  },
  driver: {
    type: mongoose.ObjectId,
    ref: 'Driver',
  },
}, {
  versionKey: false,
});

schema.post('save', handleDuplicateKeyError);
schema.post('update', handleDuplicateKeyError);
schema.post('findOneAndUpdate', handleDuplicateKeyError);
schema.post('insertMany', handleDuplicateKeyError);

const Ride = mongoose.model('Ride', schema);

export default Ride;