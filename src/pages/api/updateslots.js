import Main from "../../../lib/connection"
import AppointmentModel from "../../../lib/schema"


export default async function (req, res) {
    const method = req.method
    const { fulldate, slots } = req.body
    if (method === 'POST') {
        Main().catch(error => console.error(error))
        // const create = new appointmentModel({
        //     fulldate: bookingDate,
        //     bookings: slots.split(","),
        // })
        const filter = { fulldate: fulldate }
        const update = { $addToSet: { bookings: { $each: slots.split(",") } } }
        const query = await AppointmentModel.findOneAndUpdate(filter, update, { upsert: true, new: true, rawResult: true })
        res.status(200).json(query)
    }
    else
        res.status(403).send(`${method} Method Not Allowed!`)
    // create.save().then(console.log("New Booking Added!"))

}