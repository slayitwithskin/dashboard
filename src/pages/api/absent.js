// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Main from "../../../lib/connection";
import { AbsentModel } from "../../../lib/schema";
const date = new Date()

export default async function absentHandler(req, res) {
  await Main()
  if (req.method == "GET") {
    let result = await AbsentModel.find()
    if (!result) {
      return res.status(204).json({ message: "No data found" })
    }
    if (result) {
      return res.status(200).json(result)
    }
  }
  if (req.method == "POST") {
    let searchResult = await AbsentModel.find({ type: 'unavailability' })
    if (searchResult) {
      let result = await AbsentModel.findOneAndUpdate({ type: 'unavailability' }, req.body, {upsert: true, new: true, rawResult: true}).exec()
      if (!result) {
        return res.status(500).json({ message: "Could not update data" })
      }
      if (result) {
        return res.status(200).json(result)
      }
    }
    if (!searchResult) {
      let result = await AbsentModel.create({ type: 'unavailability' }, req.body)
      if (!result) {
        return res.status(500).json({ message: "Could not create data" })
      }
      if (result) {
        return res.status(200).json(result)
      }
    }
  }
  else {
    res.status(403).json({ message: "Method not supported" })
  }
}
