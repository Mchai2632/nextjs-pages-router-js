import Form from "@/components/Form";
import Button from "@/components/ui/Button";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  //   name, email, phone, amount
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value, // 根据 input 的 name 更新对应字段
    }));
  };

  const handleLogin = () => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.paymentUrl);

        console.log(data);

        // window.location.href = data.paymentUrl; // 跳转到 ToyyibPay 付款页面
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch data");
      });
  };

  return (
    <div>
      Login Page
      <form className="border-1 p-2">
        <div>
          <label htmlFor="name">name: </label>
          <input
            id="name"
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">email: </label>
          <input
            id="email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <Button onClick={handleLogin} className="">
        Pay
      </Button>
    </div>
  );
}
