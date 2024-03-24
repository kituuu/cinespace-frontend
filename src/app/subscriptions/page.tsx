"use client";
import useSidebarStore from "@/global/sideBarStore";
import axios from "axios";
import { useEffect, useState } from "react";
import "@/styles/main.css";
import Navbar from "@/components/Navbar/Navbar";
import { User } from "@/utils/types";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/contants";

export default function Subscriptions() {
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  const [username, setUsername] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<User[]>([]);

  const router = useRouter()
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user?username=casper`)
      .then((res) => setUsername(res.data[0].subs));
  }, []);

  useEffect(() => {
    let userArray: User[] = [];
    for (let user of username) {
      axios.get(`${BACKEND_URL}/user?username=${user}`).then((res) => {
        userArray.push(res.data[0]);
        setUserInfo(userArray);
      });
    }
  }, [username]);

  useEffect(() => {
    if (userInfo.length == username.length) {
    } else {
      setUsername([...username]);
    }
  }, [userInfo]);



  

  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""} gap-4`}>
        {userInfo.map((user) => {
          if (userInfo.length != username.length)
            return (
              <div
                onClick={() => {
                  setUsername([...username]);
                }}
              >
                Something Went Wrong. Click to refresh.
              </div>
            );

          return (
            <div onClick={()=>{router.push('/channel?username='+user.username)}} >
              <center>
                <Avatar src={user?.avatar} />
              </center>
              {user?.name}
            </div>
          );
        })}
      </main>
    </>
  );
}
