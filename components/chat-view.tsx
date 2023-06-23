import * as React from "react";
import { Dialog } from "@/types/quickblox";
import RenderIf from "./render-if";
import useQuickblox from "@/providers/quickblox-provider";
import useChatHistory from "@/hooks/useChatHistory";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";

interface ChatViewProps {
  dialog: Dialog | null;
}

export default function ChatView({ dialog }: ChatViewProps) {
  const { currentUser } = useQuickblox();
  const chatHistory = useChatHistory({ dialogId: dialog?._id });
  const [view, setView] = React.useState<"start" | "chat">("start");

  if (!currentUser) return null;

  if (!dialog) return <p className="p-4">select a pet owner to chat with</p>;

  const recepientId = dialog.occupants_ids.find((i) => i !== currentUser.id);

  console.log(chatHistory);

  return (
    <>
      <RenderIf condition={view === "start"}>
        <div className="p-4 h-full">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-4xl font-bold text-primary">
              Hi, {currentUser.full_name}
            </h2>
            <p>{dialog.name} is now ready for consultation</p>
            <button
              onClick={() => setView("chat")}
              className="bg-primary text-white px-9 py-3 font-semibold rounded-full shadow-sm"
            >
              Start Consultation
            </button>
          </div>
        </div>
      </RenderIf>
      <RenderIf condition={view === "chat"}>
        <div className="h-full flex flex-col">
          <ChatMessages
            chatData={chatHistory.data ?? []}
            currentUserId={currentUser.id}
            dialogName={dialog.name}
          />
          <ChatInput
            dialogId={dialog._id}
            userId={recepientId ?? 0}
            onSendCallback={chatHistory.refetch}
          />
        </div>
      </RenderIf>
    </>
  );
}
