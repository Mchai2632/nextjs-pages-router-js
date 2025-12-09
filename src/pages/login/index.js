import React from "react";
import { useForm } from "react-hook-form";
import { Input, InputGroup } from "@/components/ui/form";
import Button from "@/components/ui/Button/Button";
import RootWrapper from "@/layout/page/root";

const schemaForm = {
  name: {
    label: "Username",
    key: "username", // use for register
    required: true,
    errorMsg: "Username is required !",
    defaultValue: "",
    placeholder: "",
  },
  password: {
    label: "Password",
    key: "password", // use for register
    required: true,
    errorMsg: "Password is required !",
    defaultValue: "",
    placeholder: "",
    type: "password",
  },
};

export default function LoginPage() {
  async function onSubmit(data) {
    const { rememberMe, ...restData } = data;

    if (rememberMe) {
      console.log("I will save data in localStorage / autocomplete");
    }

    try {
      const res = await fetch("/api/login/auth", { method: "POST", body: JSON.stringify(restData) });

      if (res.status === 500) return alert("Server Down. Please try again later. ");

      const rJson = await res.json();
      if (!rJson.ok) return alert(rJson.message);
      return alert(rJson.message);
    } catch (error) {
      console.error(error);
      return alert(error);
    }

    // console.log(rJson);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <main className="relative min-h-screen w-full h-full flex justify-center items-center">
      <div className="h-full w-full absolute top-0 left-0">
        <img src="/images/login-background.jpg" alt="bg" className="w-full h-full object-cover" draggable={false} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-1/2 rounded-3xl py-4 px-6 bg-bg/20 text-text backdrop-blur-2xl shadow-s hover:shadow-m transition-shadow duration-300"
      >
        <InputGroup>
          <Input
            label={schemaForm.name.label}
            defaultValue={schemaForm.name.defaultValue}
            {...register(schemaForm.name.key, { required: schemaForm.name.required })}
            error={errors[schemaForm.name.key] && schemaForm.name.errorMsg}
            placeholder={schemaForm.name.placeholder}
            type={schemaForm.name.type}
          />
          <Input
            label={schemaForm.password.label}
            defaultValue={schemaForm.password.defaultValue}
            {...register(schemaForm.password.key, { required: schemaForm.password.required })}
            error={errors[schemaForm.password.key] && schemaForm.password.errorMsg}
            type={schemaForm.password.type}
          />
        </InputGroup>

        <div className="flex">
          <input type="checkbox" id="rememberMe" {...register("rememberMe")} />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <div className="flex justify-end w-full">
          <Button type="submit" variant="primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
