import mongoose, { Schema } from 'mongoose'
const ObjectId = Schema.ObjectId

const Restaurant = new Schema({
  _id: ObjectId,
  name: { type: String, required: true },
  address: { type: String, required: true },
  openDate: { type: Date, required: true },
  closeDate: { type: Date, required: true },
  totalTable: { type: Number, required: true },
  imageUrls: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  deletedAt: { type: Date }
})
const RestaurantModel = mongoose.model('Restaurants', Restaurant)

export { RestaurantModel }
