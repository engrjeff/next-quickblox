/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

export function useImagePreview(imageFile: File | string | null) {
  const [previewSrc, setPreviewSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!imageFile) return;

    if (typeof imageFile === "string") {
      setPreviewSrc(imageFile);
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result as string);
      setIsLoading(false);
    };
    reader.readAsDataURL(imageFile);
    return () => {
      reader.abort();
    };
  }, [imageFile]);

  return { previewSrc, isLoading };
}

type ImagePreviewProps =
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

export default function ImagePreview(props: ImagePreviewProps) {
  const imageSource = props.mode === "url" ? props.src : props.file;
  const { previewSrc, isLoading } = useImagePreview(imageSource);

  if (isLoading) {
    return (
      <div
        style={{ width: 64, height: 64, borderRadius: 10 }}
        className="grayscale bg-gray-200 blur-sm"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <img
      src={previewSrc}
      alt={props.alt}
      style={{
        width: 56,
        height: 56,
        borderRadius: 10,
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  );
}
