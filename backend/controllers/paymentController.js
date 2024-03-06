import { instance } from "../utils/razorPay.js";
import crypto from "crypto";
import Payment from "../models/Payment.Model.js";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: 50000, // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    // const generated_signature = hmac_sha256(
    //   razorpay_order_id + "|" + razorpay_payment_id,
    //   secret
    // );

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // console.log(generated_signature);
    // console.log(razorpay_signature);
    if (generated_signature == razorpay_signature) {
      console.log("payment is successfull");
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      // res.redirect(
      //   `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
      // );
      res
        .status(200)
        .json({
          message: "payment successfull",
          referenceId: razorpay_payment_id,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wen wrong" });
  }
};
