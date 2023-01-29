import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "@/utils/firebase";

import { BiSend } from "react-icons/bi";

export default function Chat(props) {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMesesages] = useState([]);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMesesages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div>
      <h1 className="text-2xl pb-5 underline decoration-purple-600 font-medium">
        {room.toUpperCase()}
      </h1>
      <div className="py-2">
        {messages.map((message) => (
          <div key={message.id} className=" text-white rounded-lg py-1">
            <span className="pr-2">{message.user}:</span>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="pt-5 flex text-md text-white">
        <input
          placeholder="Type message"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          className="bg-gray-800 w-full rounded-l-md py-1"
        />
        <button type="submit" className="bg-cyan-600 rounded-r-md px-3">
          <BiSend />
        </button>
      </form>
    </div>
  );
}
