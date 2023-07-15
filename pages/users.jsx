import SideBar from "@/components/SideBar";
import User from "@/components/User";
import { PlusIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function users() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(!show);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const url = "http://127.0.0.1:3001/users";

    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post(url, { user })
      .then((res) => {
        console.log(res.data);
        setShow(!show);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const [users, setUsers] = useState();

  useEffect(() => {
    const url = "http://127.0.0.1:3001/users";

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="bg-[#F6F7F9] flex flex-row min-h-screen px-32">
        <SideBar />
        <div className="flex flex-col w-full">
          <User />
          <div className="flex mr-4 mb-6  items-center mt-20   flex-row w-full justify-end">
            <button
              onClick={handleShow}
              className="bg-[#ECEFF4] flex items-center  p-2 text rounded-xl"
            >
              <PlusIcon className="h-4 w-4 " />
              Add user
            </button>
          </div>
          {show && (
            <div className="flex flex-col w-full mb-4 mt-4 bg-[#EFF1F4] p-4 rounded-lg">
              <div className="flex w-full justify-between items-center">
                <form
                  onSubmit={handleFormSubmit}
                  className="flex gap-4 w-full  flex-col"
                >
                  <div className="flex space-x-2 w-full">
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        placeholder="Enter name"
                        className="bg-[#EFF1F4] border p-2 rounded-lg ml-2 w-full "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex w-full items-center">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="bg-[#EFF1F4] border p-2 rounded-lg ml-2 w-full "
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="bg-[#EFF1F4] border p-2 rounded-lg ml-2 w-full "
                    />
                  </div>
                  <div className="flex w-full space-x-2">
                    <button
                      type="submit"
                      className="text- w-full text-white bg-[#06f] rounded-xl p-2 items-center"
                    >
                      Save user
                    </button>

                    <button
                      onClick={handleClose}
                      className=" font-light justify-center w-full items-center flex rounded-xl py-2 border border-[#06f] text-black/50  "
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex p-4 w-full bg-[#EFF1F4] rounded-xl flex-col">
            <p className="text-lg pb-2">Active Users</p>
            <div className="w-full ">
              <div className="flex items-center space-x-2">
                <div className="flex flex-col space-y-2 w-full">
                  {users &&
                    users.map((items, index) => (
                      <div
                        className="flex items-center justify-between w-full"
                        key={index}
                      >
                        <div className="flex items-center">
                          <div className="bg-[#D7DADF] flex rounded-full justify-center items-center text-sm h-10 w-10">
                            {items.name &&
                              items.name
                                .split(" ")
                                .map((name) => name[0])
                                .join("")
                                .toUpperCase()}
                          </div>
                          <p className="ml-2">{items.name}</p>
                        </div>
                        <p className="text-sm"> Added {items.created_at}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default users;
