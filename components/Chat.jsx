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
      <h1 className="text-2xl pb-5 underline font-medium">
        {room.toUpperCase()}
      </h1>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <span className="pr-2">{message.user}:</span>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="pt-5 flex text-md text-white ">
        <input
          placeholder="Type message"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          className="bg-gray-800 w-full rounded-l-md"
        />
        <button type="submit" className="bg-gray-800 rounded-r-md px-2">
          <BiSend />
        </button>
      </form>
    </div>
  );
}
