interface ChatSessionListItemProps {
  unreadCount: number;
  name: string;
  timeSinceLastChat: string;
  isActive: boolean;
  onClick: () => void;
  onDeleteClick: () => void;
}

export default function ChatSessionListItem({
  unreadCount,
  name,
  timeSinceLastChat,
  onClick,
  onDeleteClick,
  isActive,
}: ChatSessionListItemProps) {
  return (
    <div
      className={`flex justify-between p-4 transition-colors ${
        isActive ? "bg-listactive" : "hover:bg-gray-100"
      }`}
    >
      <button onClick={onClick} className="flex w-full">
        <div className="flex items-center justify-between gap-4">
          <span className="h-4 w-4 p-[2px] bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
            {unreadCount}
          </span>
          <div className="flex-1 text-left">
            <h2 className="text-lg font-bold">{name}</h2>
            <span className="text-muted text-sm">{timeSinceLastChat}</span>
          </div>
        </div>
      </button>
      <button
        aria-label="remove from queue"
        className="hover:text-red-600"
        onClick={onDeleteClick}
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
