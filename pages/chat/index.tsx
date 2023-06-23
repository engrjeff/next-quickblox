import * as React from "react";
import useQuickblox from "@/providers/quickblox-provider";
import { Dialog } from "@/types/quickblox";
import ChatView from "@/components/chat-view";

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
      <header className="h-24 w-full shadow bg-white flex items-center justify-between px-20 z-10">
        <h1 className="text-2xl font-bold text-primary">Petpal Logo (vet)</h1>
        <button>Hi, {currentUser.full_name}</button>
      </header>
      <main className="relative">
        <div className="fixed top-24 mt-1 inset-y-0 w-[360px] bg-white border-r">
          <div className="p-4">
            <h2 className="text-muted font-medium">Waiting room</h2>
            <ul className="space-y-2">
              {dialogs.map((dialog) => (
                <li key={dialog._id}>
                  <button
                    className={`py-4 px-5 w-full text-left ${
                      dialog._id === selectedDialog?._id
                        ? "bg-gray-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedDialog(dialog)}
                  >
                    <span className="text-xs h-5 w-5 px-1 py-0.5 rounded-full mr-2 bg-green-600 text-white inline-flex justify-center">
                      {dialog.unread_messages_count}
                    </span>
                    <span className="font-semibold">{dialog.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pl-[360px]">
          <div className="h-[calc(100vh-96px)]">
            <ChatView dialog={selectedDialog} key={selectedDialog?._id} />
          </div>
        </div>
      </main>
    </>
  );
};

export default ChatPage;
