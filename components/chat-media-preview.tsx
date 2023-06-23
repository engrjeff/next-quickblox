import * as React from "react";
import ImagePreview from "./image-preview";
import VideoPreview from "./video-preview";

type Props = {
  onDeleteClick: () => void;
} & React.ComponentProps<typeof ImagePreview>;

function ChatMediaPreview({ onDeleteClick, ...mediaProps }: Props) {
  let isImage = true;

  if (mediaProps.mode === "file") {
    isImage = mediaProps.file?.type.split("/")[0] === "image";
  }

  return (
    <div className="relative group">
      <div className="group-hover:opacity-70">
        {isImage ? (
          <ImagePreview {...mediaProps} />
        ) : (
          <VideoPreview {...mediaProps} />
        )}
      </div>
      <button
        aria-label="remove file"
        onClick={onDeleteClick}
        className="absolute -top-2 -right-2 p-1 rounded-full bg-gray-300 transition-transform scale-0 group-hover:scale-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default ChatMediaPreview;
