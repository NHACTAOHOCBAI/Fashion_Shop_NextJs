import clsx from "clsx";

export default function MessageBubble({
  isMe,
  content,
  showTime,
  time,
  seen,
}: {
  isMe: boolean;
  content: string;
  showTime?: boolean;
  time?: string;
  seen?: boolean;
}) {
  return (
    <div
      className={clsx("flex w-full", isMe ? "justify-end" : "justify-start")}
    >
      <div className="max-w-[70%]">
        <div
          className={clsx(
            "px-4 py-2 text-sm",
            isMe
              ? "bg-blue-500 text-white rounded-2xl rounded-br-md"
              : "bg-white text-gray-800 rounded-2xl rounded-bl-md shadow"
          )}
        >
          {content}
        </div>

        {showTime && (
          <div
            className={clsx(
              "text-[11px] mt-1 text-gray-400 flex items-center gap-1",
              isMe ? "justify-end" : "justify-start"
            )}
          >
            {time}
            {isMe && seen && <span>✓✓</span>}
          </div>
        )}
      </div>
    </div>
  );
}
