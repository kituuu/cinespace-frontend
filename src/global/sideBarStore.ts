import { create } from "zustand";

export interface SideBarState {
  sidebarActive: boolean;
  setSidebarActive: (status: boolean) => void;
}

const useSidebarStore = create<SideBarState>((set) => ({
  sidebarActive: false,
  setSidebarActive: (status: boolean) => {
    set({ sidebarActive: status });
  },
}));

export default useSidebarStore;
