"use client";
import Navbar from "@/components/Navbar/Navbar";
import Videotypetwo from "@/components/Video/Videotypetwo";
import { CLOUDINARY_URL, DENO_URL } from "@/contants";
import useSidebarStore from "@/global/sideBarStore";
import "@/styles/search.css";
import { Video } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  params: search;
}

interface search {
  search: string;
}

export default function Search({ params }: Props) {
  const [movies, setMovies] = useState<Video[]>([]);
  useEffect(() => {
    axios.get(`${DENO_URL}/search/${params.search}`).then((res) => {
      setMovies(res.data.data.documents);
    });
  }, []);
  useEffect(() => {
  }, [movies]);

  const sbactive = useSidebarStore((state) => state.sidebarActive);
  return (
    <>
      <Navbar />
      <main className={`master1 ${sbactive ? "master1-active" : ""}`}>
        {movies.map((video) => {
          return (
            <Videotypetwo
              thumbnailPublic={`${CLOUDINARY_URL}/${
                video?.thumbnailPublic === video?.videoPublic
                  ? "video"
                  : "image"
              }/upload/v1693681213/${video?.thumbnailPublic}.jpg`}
              channelName={video.uploadedBy}
              channelLink={`${CLOUDINARY_URL}/video/upload/v1693681213/${video.videoPublic}`}
              channelImg={
                "https://media.licdn.com/dms/image/D4E03AQGI1ZJx1AywYQ/profile-displayphoto-shrink_800_800/0/1665646742212?e=1699488000&v=beta&t=Td2ujhuMGBT5UARVIpY3gbyKxmOeLF6qL7Qw7bCxhM8"
              }
              videoViews={"1B"}
              videoTitle={video.title}
              videoTime={"1 day"}
              videoPublic={video.videoPublic}
              key={video._id}
              id={video._id}
              videoDesc={video.desc}
            />
          );
        })}
      </main>
    </>
  );
}
