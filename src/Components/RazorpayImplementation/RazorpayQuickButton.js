import React from "react";
import axios from "axios";

function  RazorpayQuickButton() {

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const result = await axios.post("http://localhost:5000/payment/orders");

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_ZTN72weLZ1Cqfu", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "SwasthSaathi.",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post("http://localhost:5000/payment/success", data);

            alert(result.data.msg);
        },
        prefill: {
            name: "",
            email: "support@swasthsaathi.com",
            contact: "8998998989",
        },
        notes: {
            address: "SwasthSaathi",
        },
        theme: {
            color: "#ECF2FF ",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

    return (
        <div>
          <button class="text-appointment-btn" id="razorpay-quick-button" onClick={displayRazorpay}>Pay and Book</button>
        </div>
    );
}

export default  RazorpayQuickButton;