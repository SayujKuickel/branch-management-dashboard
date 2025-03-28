"use client";

import { useEffect, useState } from "react";
import InputText from "../forms/InputText";
import Button from "../inputs/Button";
import { Login } from "@/utils/apiQueries";
import { useRouter } from "next/navigation";

const defaultFormValues = {
  username: "",
  password: "",
};

const LoginForm = ({}) => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formValues.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!formValues.username.match(/^[A-Za-z]+$/)) {
      newErrors.username = "Username can only contain alphabetic characters";
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log(formValues);
      const res = await Login(formValues);
      const { accessToken, user } = res.data;

      sessionStorage.setItem("access-token", accessToken);
      sessionStorage.setItem("user-name", user);
      router.push("/");
      setFormValues(defaultFormValues);
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  // useEffect(() => {
  //   const token = sessionStorage.getItem("access-token");
  //   if (token) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <form onSubmit={handleSubmit}>
      <InputText
        label="Username"
        name="username"
        placeholder="admin"
        value={formValues.username}
        onChange={handleChange}
        error={errors.username}
      />
      <InputText
        label="Password"
        name="password"
        type="password"
        placeholder="*****"
        value={formValues.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Button type={"submit"} icon={"plus"} title={"Login"} />
    </form>
  );
};

export default LoginForm;
