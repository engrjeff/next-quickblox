interface ChatStartViewProps {
  onStartConsultationClick: () => void;
  dialogName: string;
}

export default function ChatStartView(props: ChatStartViewProps) {
  const { onStartConsultationClick, dialogName } = props;

  return (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <span className="inline-flex items-center justify-center h-10 w-10 bg-status-yellow text-white rounded-full">
        <MoreIcon />
      </span>
      <h2 className="text-[32px] font-bold text-status-yellow">
        Ready for Consultation
      </h2>
      <p className="text-xl font-bold">
        {dialogName} is now ready to start the consultation.
      </p>
      <p className="text-lg">Pet owner is waiting for you..</p>
      <button
        onClick={onStartConsultationClick}
        className="bg-primary text-white px-9 py-3 font-semibold rounded-full shadow-sm mt-10"
      >
        Start Consultation
      </button>
    </div>
  );
}

const MoreIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-9 h-9"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
};
