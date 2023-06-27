import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:3001/users/login";

    axios
      .post(
        url,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // Todo add storage support
          localStorage.setItem("user", JSON.stringify(response.data.data));
          // console.log(response.data);
          router.push("/home");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center">
      <div className="bg-[#EFF1F4] p-4 rounded-xl items-center justify-center flex flex-col w-1/2 h-2/3">
        <div className="flex items-center w-full justify-center flex-col">
          <p className="mb-7 text-center">Log in to your dashboard</p>

          <form
            action=""
            className="w-1/2 items-center justify-center flex flex-col space-y-6"
          >
            <div className="flex flex-col">
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="flex w-full flex-col">
              <p className="text-sm">Name</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                className="border border-[#00000066] bg-[#EFF1F4] p-2 rounded-xl"
              />
            </div>
            <div className="flex w-full flex-col">
              <p className="text-sm">Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="border border-[#00000066] bg-[#EFF1F4] p-2 rounded-xl"
              />
            </div>
            <div className="flex w-full flex-col">
              <p className="text-sm">Password</p>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-[#00000066] bg-[#EFF1F4] p-2 rounded-xl"
              />
            </div>
            <button
              onClick={handleLogin}
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
