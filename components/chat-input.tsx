import * as React from "react";
import useQuickblox from "@/providers/quickblox-provider";
import ChatMediaPreview from "./chat-media-preview";
import { UploadedFile } from "@/types/quickblox";

function getFileType(fileType: string) {
  return fileType.split("/")[0];
}

interface ChatInputProps {
  dialogId: string;
  userId: number;
  onSendCallback: () => Promise<any>;
}

export default function ChatInput({
  dialogId,
  userId,
  onSendCallback,
}: ChatInputProps) {
  const { Quickblox } = useQuickblox();

  const [message, setMessage] = React.useState("");
  const [attachments, setAttachments] = React.useState<File[]>();
  const [isSending, setIsSending] = React.useState(false);

  const handleFileAttachmentChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const fileList = e.currentTarget.files;

    if (!fileList) return;

    const files = Array.from(fileList).map((file) => file);

    // check if max filesize limit is exceeded
    const MAX_FILE_SIZE = 4000000; // 4mb
    const hasExceeded = files.some((f) => f.size >= MAX_FILE_SIZE);

    if (hasExceeded) {
      alert(`File attachment size should not exceed 4mb`);
      return;
    }

    setAttachments(files);
  };

  const handleSendMessage: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    try {
      setIsSending(true);

      e.preventDefault();

      if (!attachments && !message) return;

      // if there are attachments, upload then prepare the message
      let uploadedFiles: UploadedFile[] = [];

      if (attachments && attachments.length > 0) {
        const fileParamsArr = attachments.map((file) => ({
          file,
          name: file.name,
          type: file.type,
          size: file.size,
          public: false,
        }));

        const uploadResult = await Promise.allSettled(
          fileParamsArr.map(async (fileParam) => {
            const result = await new Promise<UploadedFile>(
              (resolve, reject) => {
                Quickblox.content.createAndUpload(
                  fileParam,
                  (err: any, res: any) => {
                    if (err) {
                      return reject(err);
                    }
                    resolve(res);
                  },
                );
              },
            );

            return result;
          }),
        ).then((resultValues) => resultValues);

        for (const item of uploadResult) {
          if (item.status === "fulfilled") {
            uploadedFiles.push(item.value);
          } else {
            console.log(item.reason);
          }
        }
      }

      const attachmentDataToSend = uploadedFiles.map((fileItem) => ({
        id: fileItem.uid,
        type: getFileType(fileItem.content_type),
        url: Quickblox.content.privateUrl(fileItem.uid),
      }));

      const messageData = {
        type: "chat",
        body: message,
        extension: {
          save_to_history: 1,
          dialog_id: dialogId,
          attachments: attachmentDataToSend,
        },
        markable: 1,
      };

      const messageId = Quickblox.chat.send(userId, messageData);

      reset();

      await onSendCallback();
    } catch (e: any) {
      if (e.name === "ChatNotConnectedError") {
        // not connected to chat
        console.log("CHAT NOT CONNECTED");
      }
    } finally {
      setIsSending(false);
    }
  };

  const deleteFileByIndex = (fileIndex: number) => {
    const updatedFiles = attachments?.filter((f, index) => index !== fileIndex);
    setAttachments(updatedFiles);
  };

  const reset = () => {
    setMessage("");
    setAttachments(undefined);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="bg-white border-t flex flex-col justify-between"
    >
      <input
        type="text"
        name="message"
        placeholder="write your message"
        className="outline-none flex-1 p-5 bg-white"
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      {attachments && attachments.length > 0 && (
        <div className="p-4 flex items-center gap-3">
          {attachments.map((file, idx) => (
            <ChatMediaPreview
              key={`file-${idx}`}
              mode="file"
              alt={file.name}
              file={file}
              onDeleteClick={() => deleteFileByIndex(idx)}
            />
          ))}
        </div>
      )}
      <div className="flex items-center p-5 pt-0 justify-between">
        <div>
          <input
            type="file"
            name="attachments"
            id="attachments"
            className="opacity-0 w-[0.1px] h-[0.1px] absolute"
            accept="image/*, video/*"
            multiple
            onChange={handleFileAttachmentChange}
          />
          <label
            htmlFor="attachments"
            className="w-8 h-8 rounded-md hover:bg-gray-100 cursor-pointer inline-flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
              />
            </svg>
          </label>
        </div>
        <button
          disabled={isSending}
          className="bg-primary px-4 py-2 rounded-full shadow text-white text-sm font-medium disabled:opacity-70"
        >
          Send <span className="ml-2">&rarr;</span>
        </button>
      </div>
    </form>
  );
}
