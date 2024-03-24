"use client";
import { Comment, Video } from "@/utils/types";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Navbar,
} from "@nextui-org/react";
import { SeekForwardIcon, SeekBackwardIcon } from "@vidstack/react/icons";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import "@/styles/video.css";
import { Avatar } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import useSidebarStore from "@/global/sideBarStore";
import { useMediaQuery } from "react-responsive";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { CLOUDINARY_URL, DENO_URL, PUBLIC_URL } from "@/contants";
export default function VideoScreen({ searchParams }: { searchParams: any }) {
  const [usercmt, setusercmt] = useState("");
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const sbactive = useSidebarStore((state) => state.sidebarActive);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [desc, setdesc] = useState(false);
  const id = searchParams.id;
  const playerRef = useRef<ReactPlayer | null>(null);
  const [bitRate, setBitRate] = useState("400k");
  const link = `https://res.cloudinary.com/cinespace/video/upload/br_${bitRate}/v1693681213/${id}`;
  const [showVid, setShowVid] = useState(false);
  const [seekTo, setSeekTo] = useState<number>(0);

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  // Added by me

  const [video, setVideo] = useState<Video>();
  useEffect(() => {
    const fetchVideo = async () => {
      axios.get(`${DENO_URL}/video/${id}`).then((res) => {
        setVideo(res.data.data.document);
      });
    };
    fetchVideo();
  }, []);
  const postcomment = () => {
    const oldComments = video?.comments;
    const newComment: Comment = { comment: usercmt, dislikeCount: 0 };
    const newComments = [newComment, ...oldComments!];
    axios
      .put(`${DENO_URL}/video/${id}`, {
        comments: newComments,
      })
      .then((res) => {
        const fetchVideo = async () => {
          axios.get(`${DENO_URL}/video/${id}`).then((res) => {
            setVideo(res.data.data.document);
          });
        };
        fetchVideo();
      });
  };
  // end
  console.log(video);
  function seekforward(event: any): void {
    playerRef.current?.seekTo(playerRef.current?.getCurrentTime()! + 5);
  }
  function seekbackward(event: any): void {
    playerRef.current?.seekTo(playerRef.current?.getCurrentTime()! - 5);
  }

  function onStart() {
    if (searchParams.t && seekTo == 0) {
      setSeekTo(parseFloat(searchParams.t));
      playerRef.current?.seekTo(searchParams.t);
    } else playerRef.current?.seekTo(seekTo);
  }
  return (
    <>
      <Navbar />
      <div className="thumb">
        {showVid ? (
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              muted={true}
              ref={playerRef}
              url={link}
              controls
              width="100%"
              height="80vh"
              onStart={onStart}
              playing={showVid}
            />
          </div>
        ) : (
          <div className="player-wrapper">
            <img
              style={{
                width: "100%",
                height: "80vh",
                objectFit: "contain",
              }}
              src={`${CLOUDINARY_URL}/${
                video?.thumbnailPublic === video?.videoPublic
                  ? "video"
                  : "image"
              }/upload/v1693681213/${video?.thumbnailPublic}.jpg`}
              onClick={() => {
                setShowVid(true);
              }}
            ></img>
          </div>
        )}
      </div>
      <br />
      <div className="grid grid-cols-3">
        <div className="flex">
          <button
            onClick={seekforward}
            style={{
              display: "flex",
              fontSize: "1.3rem",
              width: "150px",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "110px",
            }}
            className="flex items-center"
          >
            <SeekForwardIcon />
            &nbsp;5 sec
          </button>
          <button
            onClick={seekbackward}
            style={{
              display: "flex",
              fontSize: "1.3rem",
              width: "150px",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "30px",
            }}
            className="flex items-center"
          >
            <SeekBackwardIcon />
            &nbsp;5 sec
          </button>
        </div>
        <div></div>
        <div className="flex flex-row justify-end">
          <Dropdown className="btn">
            <DropdownTrigger>
              <button className="btn border-gray-200">Quality</button>
            </DropdownTrigger>
            <DropdownMenu
              className="dropdown-menu"
              aria-label="Action event example"
              onAction={(key) => {
                setSeekTo(playerRef.current?.getCurrentTime()!);
                setBitRate(key.toString());
              }}
            >
              <DropdownItem className="dropdown-option" key="400k">
                144p
              </DropdownItem>
              <DropdownItem className="dropdown-option" key="700k">
                240p
              </DropdownItem>
              <DropdownItem className="dropdown-option" key="1m">
                360p
              </DropdownItem>
              <DropdownItem className="dropdown-option" key="4m">
                480p
              </DropdownItem>
              <DropdownItem className="dropdown-option" key="7m">
                720p
              </DropdownItem>
              <DropdownItem className="dropdown-option" key="10m">
                1080p
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className={`infoo ${sbactive ? "activeinfo" : ""}`}>
        <div className="channel">
          <Avatar sx={{ height: 50, width: 50 }} />
          <div className="channelinfo">
            <h1>{video?.uploadedBy}</h1>
            <p>{"884K subscribers"}</p>
          </div>
          <div
            className={`subbtn px-2 ${subscribed ? "bg-slate-500" : ""}}`}
            onClick={() => {
              setSubscribed(!subscribed);
              //TODO: add subscribe backend call
            }}
          >
            {isMobile ? (
              subscribed ? (
                <NotificationsActiveIcon />
              ) : (
                <NotificationsOffIcon />
              )
            ) : subscribed ? (
              <div>
                <NotificationsOffIcon />
                Unbscribe
              </div>
            ) : (
              <div>
                <NotificationsActiveIcon />
                Subsribe
              </div>
            )}
          </div>
        </div>
        <div className="buttons">
          <div
            className="dislike"
            onClick={() => {
              setLiked(!liked);
              //TODO: database stuff
            }}
          >
            {liked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
            {video?.dislikeCount}
          </div>
          <div
            className="share"
            onClick={() => {
              toast("Copied to Clipboard!");
              navigator.clipboard.writeText(
                `${PUBLIC_URL}/video?id=${
                  video?.videoPublic
                }&t=${
                  playerRef.current?.getCurrentTime()! != undefined
                    ? playerRef.current?.getCurrentTime()!
                    : 0
                }`
              );
            }}
          >
            <ReplyIcon />
            {/* {"Share"} */}
            {!isMobile && "Share"}
          </div>
        </div>
      </div>
      <div
        className={`description ${sbactive ? "descactive" : ""}`}
        onClick={() => {
          setdesc(!desc);
        }}
      >
        <p> {video?.viewsCount} Views | 16 hours ago</p>
        <div className={`${desc ? "less" : "more"}`}>{video?.desc}</div>
      </div>
      <div className="comments">
        <h1>{video?.comments.length} Comments</h1>
        <input
          type="text"
          className="commentinput"
          onFocus={onFocus}
          placeholder="Add a comment..."
          onChange={(e) => {
            setusercmt(e.target.value);
          }}
        />
        {focused && (
          <div className="commentoptions">
            <div
              className="cancelbtn"
              onClick={() => {
                setFocused(false);
                setusercmt("");
                //TODO: database stuff
              }}
            >
              Cancel
            </div>

            <div
              className={`${
                usercmt ? "commentbtnactive" : "commentbtndisabled"
              }`}
              onClick={postcomment}
            >
              Comment
            </div>
          </div>
        )}
        {video?.comments.map((comment, i) => {
          return (
            <div className="comment" key={i}>
              <h1>{comment.comment}</h1>
              <div
                className="dislike"
                onClick={() => {
                  //TODO: database stuff
                }}
              >
                {liked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                {comment?.dislikeCount}
              </div>
            </div>
          );
        })}
      </div>
      <Toaster />
    </>
  );
}
