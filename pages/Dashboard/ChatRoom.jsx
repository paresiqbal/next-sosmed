import Chat from "@/components/Chat";
import { useState, useRef } from "react";

export default function ChatRoom() {
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  return (
    <div className="my-20 p-5 shadow-lg max-w-md mx-auto bg-gray-700 rounded-md text-white">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <label className="text-2xl font-semibold py-8">
              Enter Room Code:
              <h1 className="text-sm">Note: room1, room2</h1>
            </label>
            <input
              className="outline outline-purple-600 rounded-md pt-2 text-sm text-black"
              ref={roomInputRef}
            />
            <button
              className=" bg-gray-800 py-2 px-5 text-2xl font-semibold text-white rounded-lg"
              onClick={() => setRoom(roomInputRef.current.value)}
            >
              Enter Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
