import axios from "axios";
import React, { useEffect, useState } from "react";

function User() {
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
      .catch((err) => console.err(err));
  }, []);

  return (
    <div className="flex justify-end items-center">
      {users &&
        users.slice(0, 1).map((items, index) => (
          <div
            key={index}
            className="bg-[#D7DADF]   absolute top-5 flex rounded-full justify-center items-center text-sm h-10 w-10"
          >
            {items.name &&
              items.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
          </div>
        ))}
    </div>
  );
}

export default User;
