import img from "next/image";
import "@/components/Video/videotypetwo.css";
import { Avatar } from "@mui/material";
import Link from "next/link";

interface Props {
  id: string;
  thumbnailPublic: string;
  videoPublic:string;
  channelName: string;
  channelLink: string;
  channelImg: string;
  videoViews: string;
  videoTitle: string;
  videoTime: string;
  videoDesc:string;
}
function Videotypetwo({
  id,
  thumbnailPublic,
  videoPublic,
  channelName,
  channelLink,
  channelImg,
  videoViews,
  videoTitle,
  videoTime,
  videoDesc
}: Props) {
  return (
    <div className="main">
      <Link href={`/video?id=${videoPublic}`}>
        <img
          className="thumbnail"
          src={thumbnailPublic}
          alt=""
          height={200}
          width={400}
        />
      </Link>

      <div className="info">
        <Link href={`/video?id=${videoPublic}`}>
          <h1 className="title">{videoTitle}</h1>
          <p className="viewdate">
            {videoViews} views - {videoTime} ago
          </p>
        </Link>

        <Link href={channelLink}>
          <div className="channeldiv">
            <Avatar
              sx={{ width: 30, height: 30 }}
              className="-z-5"
              src={channelImg}
            />
            <p className="channel">{channelName}</p>
          </div>
        </Link>

        <Link href={`/video?id=${videoPublic}`}>
          <p className="desc">{videoDesc}</p>
        </Link>
      </div>
    </div>
  );
}

export default Videotypetwo;


