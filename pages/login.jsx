import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
//import { login } from "../slices/userSlice";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error, success, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (success) {
      router.push("/home");
    }
  }, [success, router]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://127.0.0.1:3001/users/login", formData)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center">
      <div className="bg-[#EFF1F4] p-4 rounded-xl items-center justify-center flex flex-col w-1/2 h-2/3">
        <div className="flex items-center w-full justify-center flex-col">
          <p className="mb-7 text-center">Log in to your dashboard</p>
          <form
            onSubmit={handleSubmit}
            className="w-1/2 items-center justify-center flex flex-col space-y-6"
          >
            <div className="flex flex-col">
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="flex w-full flex-col">
              <p className="text-sm">Name</p>
              <input
                name="name"
                type="text"
                value={name}
                onChange={handleChange}
                required
                className="border border-[#00000066] bg-[#EFF1F4] p-2 rounded-xl"
              />
            </div>
            <div className="flex w-full flex-col">
              <p className="text-sm">Email</p>
              <input
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
                className="border border-[#00000066] bg-[#EFF1F4] p-2 rounded-xl"
              />
            </div>
            <div className="flex w-full flex-col">
              <p className="text-sm">Password</p>
              <input
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                required
                className="border border-[#00000066] bg-[#EFF1F4] p-2 rounded-xl"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#0066FF] rounded-xl p-2 w-full text-white"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
