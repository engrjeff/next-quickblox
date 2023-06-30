/* eslint-disable @next/next/no-img-element */
import { ChatAttachment } from "@/types/quickblox";

interface ChatAttachmentProps {
  attachment: ChatAttachment;
}

export default function ChatAttachmentPreview({
  attachment,
}: ChatAttachmentProps) {
  const { type } = attachment;

  if (type === "image") {
    return (
      <img
        src={attachment.url}
        alt={attachment.id}
        width={100}
        className="w-[100px] aspect-square object-cover"
      />
    );
  }

  if (type === "video") {
    return (
      <video
        src={attachment.url}
        controls
        width={300}
        className="w-[300px] aspect-video rounded-lg"
      >
        Your browser does not support the video tag
      </video>
    );
  }

  return null;
}
