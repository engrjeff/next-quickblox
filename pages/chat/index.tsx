import * as React from "react";
import useQuickblox from "@/providers/quickblox-provider";
import { Dialog } from "@/types/quickblox";
import ChatView from "@/components/chat-view";
import NoQueueView from "@/components/no-queue-view";
import Header from "@/components/header";
import ChatSessionListItem from "@/components/chat-session-list-item";
import RenderIf from "@/components/render-if";

const ChatPage = () => {
  const { currentUser, dialogs } = useQuickblox();

  const [selectedDialog, setSelectedDialog] = React.useState<Dialog | null>(
    null,
  );

  if (!currentUser) {
    return (
      <div>
        <h1>No user</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="relative">
        <div className="fixed top-24 inset-y-0 w-[360px] bg-white border-r">
          <div className="py-4">
            <h2 className="text-muted font-medium px-4 mb-4">Chat Sessions</h2>
            <ul className="space-y-2">
              {dialogs.map((dialog) => (
                <li key={dialog._id}>
                  <ChatSessionListItem
                    unreadCount={dialog.unread_messages_count}
                    name={dialog.name}
                    timeSinceLastChat="< 1 min"
                    onClick={() => setSelectedDialog(dialog)}
                    onDeleteClick={() => {}}
                    isActive={selectedDialog?._id === dialog._id}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pl-[360px]">
          <div className="h-[calc(100vh-96px)]">
            <RenderIf condition={Boolean(selectedDialog)}>
              <ChatView dialog={selectedDialog} key={selectedDialog?._id} />
            </RenderIf>
            <RenderIf condition={dialogs.length === 0}>
              <NoQueueView />
            </RenderIf>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChatPage;
