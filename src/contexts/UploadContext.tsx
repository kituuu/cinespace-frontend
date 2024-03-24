"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
interface ContextProps {
  VidpublicId: string;
  setVidPublicId: Dispatch<SetStateAction<string>>;
  ImgpublicId: string;
  setImgPublicId: Dispatch<SetStateAction<string>>;
}
const UploadContext = createContext<ContextProps>({
  VidpublicId: "",
  setVidPublicId: (): string => "",
  ImgpublicId: "",
  setImgPublicId: (): string => "",
});
export const useUploadContext = () => useContext(UploadContext);

export const UploadContextProvider = ({ children }: { children: any }) => {
  const [VidpublicId, setVidPublicId] = useState("");
  const [ImgPublicId, setImgPublicId] = useState("");
  return (
    <UploadContext.Provider
      value={{
        VidpublicId: VidpublicId,
        setVidPublicId: setVidPublicId,
        ImgpublicId: ImgPublicId,
        setImgPublicId: setImgPublicId,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
