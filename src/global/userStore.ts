import { create } from "zustand";

export interface UserState {
  profile: string;
  name: string;
  username: string;
  subs:string[];
  history: string[];
  vidUploaded : string[];
  totalViews:number;
  setUserProfile: (link: string) => void;
  setUserName: (name: string) => void;
  setUserUserName: (username: string) => void;
  setUserSubs: (subs:string[])=>void;
  setUserHistory: (history:string[])=>void;
  setUserVidUploaded: (subs:string[])=>void;
  setUserTotalViews:(totalViews:number)=>void;
}

const useUserStore = create<UserState>((set) => ({
  profile: "",
  name: "",
  username:"",
  subs:[""],
  history:[""],
  vidUploaded:[""],
  totalViews:0,
  setUserProfile: (link: string) => {
    set({ profile: link });
  },
  setUserName: (name: string) => {
    set({ name: name });
  },
  setUserUserName: (name: string) => {
    set({ username: name });
  },
  setUserHistory(history:string[]) {
      set({history: history})
  },
  setUserSubs(subs:string[]) {
      set({subs: subs})
  },
  setUserVidUploaded(vidUploaded:string[]) {
      set({vidUploaded: vidUploaded})
  },
  setUserTotalViews(totalViews:number) {
      set({totalViews:totalViews})
  },
}));

export default useUserStore;
