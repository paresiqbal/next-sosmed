import Chat from "@/components/Chat";
import { useState, useRef } from "react";

export default function ChatRoom() {
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  return (
    <div className="container py-10">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="flex flex-col items-center justify-center py-10 gap-4">
          <label className="text-2xl font-semibold py-8">
            Enter Room Code:
          </label>
          <input
            className="outline outline-purple-600 rounded-md pt-2 text-sm"
            ref={roomInputRef}
          />
          <button
            className=" bg-gray-800 py-2 px-5 text-2xl font-semibold text-white rounded-lg"
            onClick={() => setRoom(roomInputRef.current.value)}
          >
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
}
