import mongoose from 'mongoose';

import { handleDuplicateKeyError } from './error.js';

const schema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    required: true,
    unique: true,
    ref: 'UserProfile',
  },
  vehicleDetails: {
    type: String,
    required: true,
    maxLength: 255,
  },
  licenseImage: {
    type: String,
  },
  bluebookImage: {
    type: String,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
}, {
  versionKey: false,
});

schema.post('save', handleDuplicateKeyError);
schema.post('update', handleDuplicateKeyError);
schema.post('findOneAndUpdate', handleDuplicateKeyError);
schema.post('insertMany', handleDuplicateKeyError);

const Driver = mongoose.model('Driver', schema);

export default Driver;