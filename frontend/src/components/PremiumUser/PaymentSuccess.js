import React from "react";
import { useSearchParams } from "react-router-dom";

function PaymentSuccess() {
  const queryData = useSearchParams()[0];
  const p = queryData.get("reference");

  console.log("this is the params");
  console.log(p);
  return (
    <>
      <h1>This is the reffernce Number {p}</h1>
    </>
  );
}

export default PaymentSuccess;
