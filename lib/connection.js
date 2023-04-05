import mongoose from "mongoose";
const password = process.env.MONGODB_PASSWORD
const username = process.env.MONGODB_USERNAME
const Main = async(req, res) =>{
    await mongoose.connect(`mongodb+srv://${username}:${password}@website.igsibhp.mongodb.net/appointments`)
}

export default Main