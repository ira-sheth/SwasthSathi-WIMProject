import React, { useEffect } from 'react';

const RazorpayQuickButton = () => {
  useEffect(() => {
    const options = {
      key: 'rzp_test_NWtvbObWQ1nbX1', // Replace with your Razorpay API Key
      amount: 50, // Amount in paise (e.g., 50000 for ₹500.00)
      currency: 'INR',
      name: 'SwasthSaathi',
      description: 'Appointment Confirmation Payment',
      order_id: 'order_12345', // Replace with your order ID generated on the server side
      handler: function (response) {
        alert('Payment successful: ' + response.razorpay_payment_id);
      },
      prefill: {
        email: 'customer@example.com',
        contact: '9876543210',
      },
      theme: {
        color: '#F37254',
      },
    };

    const quickButton = new window.Razorpay.QuickPay(options);
    quickButton.create();

    // Clean up when the component is unmounted
    return () => {
      quickButton.close();
    };
  }, []);

  return (
    <div>
      <button id="razorpay-quick-button">Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayQuickButton;
