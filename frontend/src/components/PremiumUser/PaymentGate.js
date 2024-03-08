import axios from "axios";
import React from "react";
import { useGlobalContext } from "../../Context/globalContext";

function PaymentGate() {
  const { loggedUser } = useGlobalContext();
  const token = loggedUser?.token;
  console.log(token);

  const paymentHandler = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/getkey`
    );
    const key = data.key;
    console.log("token this", token);
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/checkout`,
      null, // you have to pass this as null othervise this body taken by the req.body and all header data go to the req.body ok so pass null
      {
        headers: {
          Autherization: token,
        },
      }
    );
    console.log(response.data);
    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: 50000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "d4 Experiments",
      description: "payment for the premium user to get the bonuses",
      image: "https://example.com/your_logo",
      order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.REACT_APP_BACKEND_URL}/api/paymentverification?token=${token}`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#FF47C5",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <button
      onClick={paymentHandler}
      className="border-b border-red-500 text-purple-700 hover:text-purple-800 font-bold   transition-all duration-300 hover:translate-x-1"
    >
      Premium User? <span className="">Try it's Free </span>
    </button>
  );
}

export default PaymentGate;
