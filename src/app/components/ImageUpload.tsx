import { useUploadContext } from "@/contexts/UploadContext";
import { openUploadWidget } from "@/utils/CloudinaryService";

const ThumbnailUpload = () => {
  const { setImgPublicId: setImgPublicId } = useUploadContext();

  function uploadImageWidget(event: any): void {
    let myWidget = openUploadWidget(
      {
        cloudName: "cinespace",
        uploadPreset: "cs_upload",
        // resourceType: "image",
        sources: ["local"],
        multiple: false,
        clientAllowedFormats: ["jpg", "jpeg", "png", "svg"],
        styles: {
          palette: {
            window: "#B99763",
            sourceBg: "#FFEBCD",
            windowBorder: "#B99763",
            tabIcon: "#cc6600",
            inactiveTabIcon: "#E8D5BB",
            menuIcons: "#ebe5db",
            link: "#ffb107",
            action: "#FFEBCD",
            inProgress: "#99cccc",
            complete: "#78b3b4",
            error: "#ff6666",
            textDark: "#4C3F3F",
            textLight: "#D8CFCF",
          },
        },
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setImgPublicId(result.info.public_id);
        }
      }
    );
    myWidget.open();
  }

  return (
    <div className=" flex justify-center items-center">
      <button className="upload-btn" onClick={uploadImageWidget}>
        <div className="px-4">Add your Thumbnail</div>
      </button>
    </div>
  );
};
export default ThumbnailUpload;
