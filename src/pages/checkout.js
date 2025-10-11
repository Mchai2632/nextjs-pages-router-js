import Form from "@/components/Form";
import Button from "@/components/ui/Button";
import React, { useEffect, useState } from "react";

export default function checkout() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: 0,
  });

  //   name, email, phone, amount
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value, // 根据 input 的 name 更新对应字段
    }));
  };

  const handlePay = () => {
    fetch("/api/travel-booking/create-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.paymentUrl);

        console.log(data);

        window.location.href = data.paymentUrl; // 跳转到 ToyyibPay 付款页面
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch data");
      });
  };

  return (
    <div>
      Checkout Page
      <Form data={data} handleInputChange={handleInputChange} />
      <Button onClick={handlePay} className="">
        Pay
      </Button>
    </div>
  );
}
