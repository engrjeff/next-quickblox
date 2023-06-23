import * as React from "react";
import { ChatItem } from "@/types/quickblox";
import format from "date-fns/format";
import ChatAttachmentPreview from "./chat-attachment";
import { cn } from "@/lib/util";

interface ChatMessagesProps {
  currentUserId: number;
  chatData: ChatItem[];
  dialogName: string;
}

export default function ChatMessages({
  currentUserId,
  chatData,
  dialogName,
}: ChatMessagesProps) {
  const chatBottomRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!chatBottomRef.current) return;
    if (chatData.length > 0) {
      const lastChild = chatBottomRef.current.lastElementChild;
      lastChild?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData.length]);

  return (
    <div
      ref={chatBottomRef}
      id="chat-messages-container"
      className="flex-1 max-h-[calc(100%-70px)] overflow-y-auto p-6 space-y-3 scroll-smooth flex flex-col"
    >
      {chatData.map((chat) => (
        <div
          key={chat._id}
          className={cn(
            "max-w-[70%]",
            chat.sender_id === currentUserId ? "self-end" : "self-start",
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">
              {chat.sender_id === currentUserId ? "You" : dialogName}
            </span>
            <span className="text-sm text-muted">
              {format(new Date(chat.created_at), "hh:mm a")}
            </span>
          </div>
          {Boolean(chat.message) && (
            <div
              className={`p-4 shadow-sm rounded-lg inline-block ml-auto ${
                chat.sender_id === currentUserId
                  ? "bg-primary text-white rounded-bl-none"
                  : "bg-white rounded-br-none"
              }`}
            >
              <p>{chat.message}</p>
            </div>
          )}
          {chat.attachments.length > 0 && (
            <div className="mt-3 flex gap-3 flex-wrap">
              {chat.attachments.map((attachment) => (
                <div key={attachment.id}>
                  <ChatAttachmentPreview attachment={attachment} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
