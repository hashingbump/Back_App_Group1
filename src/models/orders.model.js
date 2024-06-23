import mongoose, { Schema } from 'mongoose'
const ObjectId = Schema.ObjectId
const Order = new Schema({
  _id: ObjectId,
  userId: { type: ObjectId, ref: 'Users', required: true },
  tableId: { type: [ObjectId], ref: 'Tables', required: true },
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  payment: { type: String, require: true },
  menu: { type: [String], required: true },
  status: { type: Boolean, required: true },
  checkin: { type: Date, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  deletedAt: { type: Date }
})
const OrderModel = mongoose.model('Orders', Order)

export { OrderModel }
