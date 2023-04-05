import mongoose, { model } from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    fulldate: String,
    bookings: Array
})
const AppointmentModel = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema)

const AbsentSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'unavailability'
    } ,
    dates: Array,
})
const AbsentModel = mongoose.models.AbsentDay || mongoose.model('AbsentDay', AbsentSchema)

const CouponSchema = new mongoose.Schema({
    code: String,
    value: Number,
    type: String,
    identifier: String
})
const CouponModel = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema)

export { CouponModel, AbsentModel }
export default AppointmentModel