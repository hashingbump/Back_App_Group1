import mongoose from 'mongoose';
import collections from '../database/collection.js';

const staffSchema = new mongoose.Schema({
    userName: String,
    avatar: String,
    sex: String,
    email: String,
    password: String
});

const StaffsModel = mongoose.model(collections.STAFFS, staffSchema);
export default StaffsModel;