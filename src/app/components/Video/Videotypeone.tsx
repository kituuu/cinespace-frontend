import img from "next/image";
import "@/components/Video/videotypeone.css";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  thumbnailPublic: string;
  videoPublic: string;
  channelName: string;
  channelLink: string;
  channelImg: string;
  videoViews: string;
  videoTitle: string;
  videoTime: string;
}

function Videotypeone({
  id,
  thumbnailPublic,
  videoPublic,
  channelName,
  channelLink,
  channelImg,
  videoViews,
  videoTitle,
  videoTime,
}: Props) {
  const router = useRouter();

  return (
    <div className="main">
      <img

        className="thumbnail"
        src={thumbnailPublic}
        alt=""
        // style={{ objectFit: "cover" }}
        // fill={true}
        height={225}
        width={400}
        onClick={() => {
          router.push(`/video?id=${videoPublic}`);
        }}
      />

      <div className="info">
        <Avatar className="-z-5" src={channelImg} />
        <div className="text">
          <h1
            onClick={() => {
              router.push(`/video?id=${videoPublic}`);
            }}
            className="title"
          >
            {videoTitle}
          </h1>
          <p className="channel">
            <Link href={channelLink}>{channelName}</Link>
          </p>
          <p className="viewdate">
            {videoViews} views - {videoTime} ago
          </p>
        </div>
      </div>
    </div>
  );
}

export default Videotypeone;
