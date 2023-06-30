import * as React from "react";

import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";

import AlertModal from "./alert-modal";

interface ChatMateHeaderProps {
  petOwnerName: string;
}

export default function ChatMateHeader({ petOwnerName }: ChatMateHeaderProps) {
  return (
    <div className="px-6 py-4 bg-white flex justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-2xl">{petOwnerName}</h2>
          <span className="text-sm text-muted">5 min</span>
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="/pet.jpg"
            alt="pet of owner"
            width={50}
            height={50}
            className="w-[50px] object-cover aspect-square rounded-full"
          />
          <div>
            <h3 className="font-bold">My Pet</h3>
            <p className="text-accent font-bold text-sm">Golden Retriever</p>
            <span className="text-sm">Pet ID: 123456</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <ChatStatusIndicator />
        <ChatMateHeaderMenu />
      </div>
    </div>
  );
}

const ChatMateHeaderMenu = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-3 text-primary font-semibold justify-end hover:bg-gray-100 px-1.5 py-1 rounded">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </span>
        <span>More</span>
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right rounded-md bg-white shadow-lg w-44">
          <div className="px-1 py-1">
            <Menu.Item>
              <CompleteConsulatationAlert />
            </Menu.Item>
            <Menu.Item>
              <button className="w-full flex px-2 py-1 text-sm rounded transition-colors hover:bg-gray-100">
                Assign to ...
              </button>
            </Menu.Item>
            <Menu.Item>
              <button className="w-full flex px-2 py-1 text-sm rounded transition-colors hover:bg-gray-100">
                Skip from queue
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const ChatStatusIndicator = () => {
  return (
    <div className="flex items-center justify-end gap-1">
      <div className="text-status-red">
        <span className="sr-only">Cancelled</span>
        <CheckedCircled />
      </div>
      <div className="text-status-yellow">
        <span className="sr-only">In Queue</span>
        <CheckedCircled />
      </div>
      <div className="text-status-green">
        <span className="sr-only">Active</span>
        <CheckedCircled />
      </div>
      <div className="ml-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-muted"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

const CheckedCircled = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const CompleteConsulatationAlert = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => setIsOpen(false);

  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-full flex px-2 py-1 text-sm rounded transition-colors hover:bg-gray-100"
      >
        Finish Consultation
      </button>
      <AlertModal isOpen={isOpen} onClose={handleClose}>
        <div className="flex flex-col items-center space-y-5">
          <Image
            src="/warning-icon.png"
            alt="warning icon"
            width={48}
            height={48}
          />
          <h3 className="font-bold text-xl leading-[32px] text-center">
            Are you sure you want to mark this as complete consultation?
          </h3>
          <div className="flex w-full gap-4 pt-4">
            <button className="flex-1 h-12 border border-gray-300 rounded-full bg-white font-semibold hover:bg-gray-100">
              Cancel
            </button>
            <button
              onClick={() => alert("Confirmed!")}
              className="flex-1 h-12 bg-accent2 hover:bg-accent2/80 text-white rounded-full font-semibold"
            >
              Confirm
            </button>
          </div>
        </div>
      </AlertModal>
    </>
  );
};
