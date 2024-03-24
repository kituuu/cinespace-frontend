"use client";
import { useUploadContext } from "@/contexts/UploadContext";

import Upload from "@/app/components/VideoUpload";
import Navbar from "@/components/Navbar/Navbar";
import Videotypeone from "@/components/Video/Videotypeone";
import useSidebarStore from "@/global/sideBarStore";
import "@/styles/main.css";
import { Video } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  const [data, setData]: [Video[], Function] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/videos").then((res) => {
      setData(res.data.data.documents);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}>
        {data.map((video) => {
          return (
            <Videotypeone
              key={video._id}
              id={video._id}
              thumbnailPublic={`https://res.cloudinary.com/cinespace/${
                video.thumbnailPublic === video.videoPublic ? "video" : "image"
              }/upload/v1693681213/${video.thumbnailPublic}.jpg`}
              channelName={video.uploadedBy}
              channelLink={`https://res.cloudinary.com/cinespace/video/upload/v1693681213/${video.videoPublic}`}
              channelImg={
                "https://media.licdn.com/dms/image/D4E03AQGI1ZJx1AywYQ/profile-displayphoto-shrink_800_800/0/1665646742212?e=1699488000&v=beta&t=Td2ujhuMGBT5UARVIpY3gbyKxmOeLF6qL7Qw7bCxhM8"
              }
              videoViews={"1B"}
              videoTitle={video.title}
              videoTime={"1 day"}
              videoPublic={video.videoPublic}
            />
          );
        })}
      </main>
    </>
  );
}
