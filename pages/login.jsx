import React from "react";

function login() {
  return (
    <div className="items-center flex min-h-scren bg-white justify-center p-6 ">

      <div className="flex">

      </div>
      <div className="flex items-center justify-center flex-col">
        <p>Log in to your dashboard</p>

        <form action="" className=" space-y-2">
          <div className="flex flex-col">
            <p>Email</p>
            <input type="text" className="border p-2 rounded-xl" />
          </div>

          <div className="flex flex-col">
            <p>Password</p>
            <input type="password" className="border p-2 rounded-xl" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default login;
