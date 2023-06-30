import * as React from "react";
import { Dialog } from "@/types/quickblox";
import RenderIf from "./render-if";
import useQuickblox from "@/providers/quickblox-provider";
import useChatHistory from "@/hooks/useChatHistory";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import ChatMateHeader from "./chatmate-header";
import { cn } from "@/lib/util";
import ChatStartView from "./chat-start-view";

interface ChatViewProps {
  dialog: Dialog | null;
}

export default function ChatView({ dialog }: ChatViewProps) {
  const { currentUser } = useQuickblox();
  const chatHistory = useChatHistory({ dialogId: dialog?._id });
  const [view, setView] = React.useState<"start" | "chat">("start");
  const [tab, setTab] = React.useState<"about" | "messages">("messages");

  if (!currentUser) return null;

  if (!dialog) return <p className="p-4">select a pet owner to chat with</p>;

  const recepientId = dialog.occupants_ids.find((i) => i !== currentUser.id);

  console.log(chatHistory);

  return (
    <>
      <RenderIf condition={view === "start"}>
        <ChatStartView
          dialogName={dialog.name}
          onStartConsultationClick={() => setView("chat")}
        />
      </RenderIf>
      <RenderIf condition={view === "chat"}>
        <div className="h-full flex flex-col">
          <ChatMateHeader petOwnerName={dialog.name} />
          <div className="flex bg-white border-y">
            <TabButton
              isActive={tab === "about"}
              onClick={() => setTab("about")}
            >
              About
            </TabButton>
            <TabButton
              isActive={tab === "messages"}
              onClick={() => setTab("messages")}
            >
              Chat
            </TabButton>
          </div>
          <RenderIf condition={tab === "about"}>
            <div className="p-5 bg-white">
              <div className="font-semibold">
                <h4 className="text-muted">Reason for Consultation</h4>
                <p>Skin Allergies</p>
              </div>
            </div>
          </RenderIf>
          <RenderIf condition={tab === "messages"}>
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
          </RenderIf>
        </div>
      </RenderIf>
    </>
  );
}

interface TabButtonProps extends React.ComponentProps<"button"> {
  isActive: boolean;
}

const TabButton = ({ isActive, className, ...props }: TabButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "flex-1 py-3 px-4 border-b-2",
        isActive
          ? "border-primary font-bold text-primary"
          : "border-transparent",
      )}
    />
  );
};
