import { useState, useEffect } from "react";

export function useVideoPreview(file: File | string | null) {
  const [previewSrc, setPreviewSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!file) return;

    if (typeof file === "string") {
      setPreviewSrc(file);
      setIsLoading(false);
      return;
    }

    const videoUrl = URL.createObjectURL(file);

    setPreviewSrc(videoUrl);
  }, [file]);

  return { previewSrc, isLoading };
}

type VideoPreviewProps =
  | {
      mode: "file";
      alt: string;
      file: File | null;
    }
  | {
      mode: "url";
      alt: string;
      src: string;
    };

export default function VideoPreview(props: VideoPreviewProps) {
  const source = props.mode === "url" ? props.src : props.file;
  const { previewSrc, isLoading } = useVideoPreview(source);

  return (
    <video
      width={120}
      height={64}
      src={previewSrc}
      style={{
        borderRadius: 10,
        width: 120,
        aspectRatio: "16/9",
      }}
    >
      Your browser does not support the video tag
    </video>
  );
}
