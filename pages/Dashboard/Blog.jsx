import Message from "../../components/Message";
import { useEffect, useState } from "react";

import { db } from "@/utils/firebase";
import { async } from "@firebase/util";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";

import { BiComment, BiLike, BiDislike, BiShare } from "react-icons/bi";

export default function () {
  //Create state all of the post
  const [allPost, setAllPost] = useState([]);

  const getPost = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPost(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="container my-12 text-lg">
      <h1 className="text-3xl text-center font font-semibold underline decoration-purple-600">
        Blog's
      </h1>
      <h3 className="text-xl py-4">See what people thought</h3>
      <div>
        {allPost.map((post) => (
          <Message key={post.id} {...post}>
            <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
              <div className="flex mx-4 justify-between">
                <button className="flex items-center justify-center gap-2 py-2 text-sm">
                  <BiComment />
                  {post.comments?.length > 0 ? post.comments?.length : 0}
                </button>
                <button className="flex items-center justify-center gap-2 py-2 text-sm">
                  <BiLike /> 1K
                </button>
                <button className="flex items-center justify-center gap-2 py-2 text-sm">
                  <BiDislike /> 200
                </button>
                <button className="flex items-center justify-center gap-2 py-2 text-sm">
                  <BiShare /> 57
                </button>
              </div>
            </Link>
          </Message>
        ))}
      </div>
    </div>
  );
}
