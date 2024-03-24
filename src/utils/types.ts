interface Video {
  _id: string;
  id: string;
  thumbnailPublic: string;
  dislikeCount: number;
  viewsCount: number;
  isKids: boolean;
  uploadedBy: string;
  title: string;
  desc: string;
  videoPublic: string;
  comments: Comment[];
}

interface User {
  _id:string;
  username:string;
  name:string;
  subs:string[];
  history:string[];
  vidUpload:string[];
  avatar:Link;
  totalViews:number;
}
type Link = string ;
interface Comment {
  comment: string;
  dislikeCount: number;
}

export type { Video, Comment, User};
