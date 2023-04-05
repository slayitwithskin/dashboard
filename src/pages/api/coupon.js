// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Main from "../../../lib/connection";
import { CouponModel } from "../../../lib/schema";

export default async function couponHandler(req, res) {
  await Main()
  if (req.method == "GET") {
    let result = await CouponModel.find()
    if (!result) {
      return res.status(204).json({ message: "No data found" })
    }
    if (result) {
      return res.status(200).json(result)
    }
  }

  if (req.method == "POST") {
    let result = await CouponModel.create(req.body)
    if (!result) {
      return res.status(500).json({ message: "Could not update data" })
    }
    if (result) {
      return res.status(200).json(result)
    }
  }

  if (req.method == "PUT") {
    let result = await CouponModel.findOneAndDelete({ code: req.body.code }).exec()
    if (!result) {
      return res.status(500).json({ message: "Could not update data" })
    }
    if (result) {
      return res.status(200).json(result)
    }
  }
  else {
    res.status(403).json({ message: "Method not supported" })
  }
}
