import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

export default function () {
  //Form state
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const routeData = route.query;

  //Post
  const submitPost = async (e) => {
    e.preventDefault();

    //Check form before submit
    if (!post.description) {
      toast.error("Description is empty 🤔 ?", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      return;
    }

    if (post.description.length > 300) {
      toast.error("Description is too long 😓 !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      return;
    }

    //Checking user edit the post or if not then make a new post
    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);

      //Toas notification
      toast.success("Post has been Edited 👌 !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      return route.push("/Dashboard/Blog");
    } else {
      //Make new post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });

      //Toas notification
      toast.success("Post has been made successfully 😀 !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      return route.push("/Dashboard/Blog");
    }
  };

  //Check user already login or not
  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/Auth/Login");

    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold ">
          {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-md p-2 text-sm"
          ></textarea>
          <p
            className={`text-whtie font-medium text-sm ${
              post.description.length > 300 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/300
          </p>
          <button
            type="submit"
            className="bg-primary-green w-full font-semibold p-2 my-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
