import Message from "../components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../utils/firebase";
import { BiSend } from "react-icons/bi";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessages] = useState([]);

  //Submit a message
  const submitMessage = async () => {
    //Check if the user is logged
    if (!auth.currentUser) return router.push("/auth/login");

    if (!message) {
      console.log(message);
      toast.error("Don't leave an empty message 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  //Get Comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);

  return (
    <div>
      <Message {...routeData}>
        <div className="my-4 h-screen">
          <div className="flex">
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              value={message}
              placeholder="Send a reply"
              className="bg-gray-800 w-full p-2 text-white text-sm rounded-l-md"
            />
            <button
              onClick={submitMessage}
              className="bg-gray-800 text-white py-2 px-4 text-sm rounded-r-md"
            >
              <BiSend />
            </button>
          </div>
          <div className="py-6">
            <h2 className="font-bold">Comments</h2>
            {allMessage?.map((message) => (
              <div
                className="bg-gray-800 text-white p-4 my-2  rounded-md"
                key={message.time}
              >
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-10 rounded-full" src={message.avatar} />
                  <h2>{message.userName}</h2>
                </div>
                <h2>{message.message}</h2>
              </div>
            ))}
          </div>
        </div>
      </Message>
    </div>
  );
}
