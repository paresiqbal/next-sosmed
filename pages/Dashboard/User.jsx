import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "@/components/Message";

import { FiDelete, FiEdit } from "react-icons/fi";
import Link from "next/link";

export default function () {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  //Redirect user to login after logout
  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/Auth/Login");

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  //Get user data
  useEffect(() => {
    getData();
  }, [user, loading]);

  //Detele Posts
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  return (
    <div className="container">
      <div>Profile</div>
      <div className="py-4">
        <div>Posts</div>
        {posts.map((post) => (
          <Message {...post} key={post.id}>
            <div className="flex gap-4">
              <button
                onClick={() => deletePost(post.id)}
                className="flex items-center justify-center gap-2 py-2 text-sm"
              >
                <FiDelete />
                Delete
              </button>

              <Link href={{ pathname: "/Dashboard/Post", query: post }}>
                <button className="flex items-center justify-center gap-2 py-2 text-sm">
                  <FiEdit />
                  Edit
                </button>
              </Link>
            </div>
          </Message>
        ))}
      </div>
      <button
        onClick={() => {
          auth.signOut();
        }}
        className="font-medium text-white bg-gray-800 py-2 px-4 rounded-md"
      >
        Sign Out
      </button>
    </div>
  );
}
