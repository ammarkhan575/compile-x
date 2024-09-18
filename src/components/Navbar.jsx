import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-2 bg-[#0F0F0F] py-2 text-white">
      <div>Compile-X</div>
      <div>
        <button className="bg-[#2F2F2F] px-4 py-2 rounded-md text-[#29C244]">
          {" "}
          ▶️ Run
        </button>
      </div>
      <div className="flex gap-4">
        <button className="bg-blue-400 px-4 py-2 rounded-md">Login</button>
        <button className="bg-blue-400 px-4 py-2 rounded-md">Signup</button>
      </div>
    </div>
  );
};

export default Navbar;
