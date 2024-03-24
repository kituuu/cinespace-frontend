import { UploadContextProvider } from "@/contexts/UploadContext"

export default function UploadLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en"><head>
        <script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      ></script></head>
        <body ><UploadContextProvider>{children}</UploadContextProvider></body>
      </html>
    )
  }