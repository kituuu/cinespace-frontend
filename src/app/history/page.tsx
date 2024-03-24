"use client";
import Navbar from "@/components/Navbar/Navbar";
import useSidebarStore from "@/global/sideBarStore";

import "@/styles/main.css";
import { Video } from "@/utils/types";
import axios from "axios";
import { useState, useEffect } from "react";
import Videotypeone from "../components/Video/Videotypeone";
import { BACKEND_URL, CLOUDINARY_URL, DENO_URL } from "@/contants";
export default function History() {
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  const [history, setHistory] = useState<String[]>([]);
  const [hisVideo, setHisVideo] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user?username=casper`)
      .then((res) => {
        console.log();
        setHistory(res.data[0].history);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    let vidArray: Video[] = [];
    for (let his of history) {
      console.log(his);
      axios
        .get(`${DENO_URL}/video/${his}`)
        .then((res) => {
          console.log("hi", res.data.data.document);
          vidArray.push(res.data?.data.document);
          setHisVideo(vidArray);
        })
        .catch((e) => {
          console.log(e);
        });

    }
    console.log("well",vidArray);
    
  }, [history]);
useEffect(()=>{
  console.log(hisVideo);
  axios
      .get(`${BACKEND_URL}/user?username=casper`)
      .then((res) => {
        console.log();
        if(hisVideo.length==res.data[0].history.length) setLoading(false)
      })
  
  
},[hisVideo])

  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}>
      {hisVideo.map((video) => {
          if(hisVideo.length != history.length){
            return <div onClick={()=>setHistory([...history])}>Something went Wrong. Click here to refresh.</div>
          }
          return (
            <>
                <Videotypeone
                  key={video._id}
                  id={video._id}
                  thumbnailPublic={`${CLOUDINARY_URL}/${
                    video.thumbnailPublic === video.videoPublic
                      ? "video"
                      : "image"
                  }/upload/v1693681213/${video.thumbnailPublic}.jpg`}
                  channelName={video.uploadedBy}
                  channelLink={`${CLOUDINARY_URL}/video/upload/v1693681213/${video.videoPublic}`}
                  channelImg={
                    "https://media.licdn.com/dms/image/D4E03AQGI1ZJx1AywYQ/profile-displayphoto-shrink_800_800/0/1665646742212?e=1699488000&v=beta&t=Td2ujhuMGBT5UARVIpY3gbyKxmOeLF6qL7Qw7bCxhM8"
                  }
                  videoViews={"1B"}
                  videoTitle={video.title}
                  videoTime={"1 day"}
                  videoPublic={video.videoPublic}
                />
              
                
              
            </>
          );
        })}
      </main>
    </>
  );
}
