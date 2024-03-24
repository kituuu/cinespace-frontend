"use client";
import React, { useState } from "react";
import "@/components/Navbar/navbar.css";
import { Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import useSidebarStore from "@/global/sideBarStore";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const sidebar = useSidebarStore((state: any) => state.sidebarActive);
  const [search, setSearch] = useState("");
  const searchkaro = () => {
    if (search) {
      router.push(`/${search}`);
    }
  };
  return (
    <div
      className={`flex flex-row justify-between w-screen px-5 py-2 bg-white items-center fixed z-10 top-0 ${
        sidebar ? "sidebaractiv" : ""
      }`}
    >
      <h1 className="logo" onClick={()=>router.push('/')}>Cinespace</h1>
      <div className="w-4/12 flex flex-row justify-between items-center">
        <input
          className="self-cente w-full h-15 my-0 searchinput"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDownCapture={(e) => {
            e.key === "Enter" && searchkaro();
          }}
        />
        <div className="search" onClick={searchkaro}>
          <Search fontSize="large" className="searchicon" />
        </div>
      </div>
      <div>
        <Avatar
          className=""
          src="https://media.licdn.com/dms/image/D4E03AQGI1ZJx1AywYQ/profile-displayphoto-shrink_800_800/0/1665646742212?e=1699488000&v=beta&t=Td2ujhuMGBT5UARVIpY3gbyKxmOeLF6qL7Qw7bCxhM8"
        />
      </div>
    </div>
  );
}

export default Navbar;
