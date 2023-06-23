import { useQuery } from "@tanstack/react-query";
import useQuickblox from "@/providers/quickblox-provider";
import { ChatItem } from "@/types/quickblox";
import { useEffect } from "react";

interface UseChatHistoryOptions {
  dialogId?: string;
}

export default function useChatHistory({ dialogId }: UseChatHistoryOptions) {
  const { Quickblox, currentUser } = useQuickblox();

  const fetchFunction = async (): Promise<ChatItem[]> => {
    return await new Promise((resolve, reject) => {
      const params = { chat_dialog_id: dialogId };

      Quickblox.chat.message.list(params, function (err: any, result: any) {
        if (err) {
          resolve([]);
        }

        resolve(result.items);
      });
    });
  };

  const query = useQuery({
    queryKey: [`chat-dialog-${dialogId}`],
    queryFn: fetchFunction,
    enabled: Boolean(currentUser) && Boolean(dialogId),
  });

  useEffect(() => {
    if (!currentUser) return;

    Quickblox.chat.onMessageListener = async (userId: number, message: any) => {
      console.log(message);
      await query.refetch();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return query;
}
