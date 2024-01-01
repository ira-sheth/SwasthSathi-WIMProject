require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const router = express.Router();

const app = express();
app.use(express.json());
app.use(cors());

router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_ZTN72weLZ1Cqfu',
            key_secret: 'RLBKuHHOzwT2rDyxxaG6O2ms',
        });

        const options = {
            amount: 5000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send(error);
    }
});

router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "RLBKuHHOzwT2rDyxxaG6O2ms");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "Payment Successful with SwasthSaathi",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });

        res.redirect('http://localhost:3000/bookappointment')

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).send(error);
    }
});

module.exports = router;