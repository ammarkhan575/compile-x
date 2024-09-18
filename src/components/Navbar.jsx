import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 bg-[#242424] py-2 text-white">
      <div className="text-[#29C244] font-bold">Compile-X</div>
      <div>
        <button className="bg-[#383838] px-4 py-1 rounded-md text-[#29C244] shadow-[5px_5px_0px_0px_rgba(0,0,0)] hover:shadow transition duration-200 border border-black">
          ▶️ Run
        </button>
      </div>
      <div className="flex gap-4">
        {/* <button className="bg-blue-400 px-4 py-2 rounded-md">Login</button>
        <button className="bg-blue-400 px-4 py-2 rounded-md">Signup</button> */}
      </div>
    </div>
  );
};

export default Navbar;
