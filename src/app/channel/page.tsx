"use client";
import useSidebarStore from "@/global/sideBarStore";
import Navbar from "@/components/Navbar/Navbar";
import { Video } from "@/utils/types";
import "@/styles/main.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Videotypeone from "../components/Video/Videotypeone";

export default function Subscriptions({ searchParams }: { searchParams: any }) {
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  const [videoUpl, setVidUpl] = useState<String[]>([]);
  const [vidUplVideo, setVidUplVideo] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const user = searchParams.username;
  useEffect(() => {
    axios
      .get("http://localhost:10000/user?username=" + user)
      .then((res) => {
        console.log(res.data[0].vidUpload);
        setVidUpl(res.data[0].vidUpload);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    let vidArray: Video[] = [];
    for (let his of videoUpl) {
      console.log(his);
      axios
        .get("http://localhost:8000/video/" + his)
        .then((res) => {
          console.log("hi", res.data.data.document);
          vidArray.push(res.data?.data.document);
          setVidUplVideo(vidArray);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    console.log("well", vidArray);
  }, [videoUpl]);
  useEffect(() => {
    console.log(vidUplVideo);
    axios.get("http://localhost:10000/user?username=" + user).then((res) => {
      console.log();
      if (vidUplVideo.length == res.data[0].vidUpload.length) setLoading(false);
    });
  }, [vidUplVideo]);
  return (
    <>
      <Navbar />
      <main className={`master ${sbactive ? "master-active" : ""}`}>
        {!loading ? (
          <>
            {vidUplVideo.map((video) => {
              return (
                <>
                  {vidUplVideo.map((video) => {
                    if (vidUplVideo.length != videoUpl.length) {
                      return (
                        <div onClick={() => setVidUpl([...videoUpl])}>
                          Something went Wrong. Click here to refresh.
                        </div>
                      );
                    }
                    return (
                      <>
                        <Videotypeone
                          key={video._id}
                          id={video._id}
                          thumbnailPublic={`https://res.cloudinary.com/cinespace/${
                            video.thumbnailPublic === video.videoPublic
                              ? "video"
                              : "image"
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
                      </>
                    );
                  })}
                </>
              );
            })}
          </>
        ) : (
          <div onClick={() => setVidUpl([...videoUpl])}>
            Something went Wrong. Click here to refresh.
          </div>
        )}
      </main>
    </>
  );
}
