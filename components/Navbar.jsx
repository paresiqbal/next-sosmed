import Link from "next/link";

import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="p-5 shadow-md text-xl flex flex-col items-center gap-2 lg:flex lg:flex-row lg:justify-between">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/Dashboard/Blog">Blog</Link>
      </div>
      <div>
        {!user && ( //Checking user login or not
          <Link
            href="/Auth/Login"
            className="px-5 py-2 rounded-md text-white font-semibold bg-gray-700"
          >
            Login
          </Link>
        )}
        {user && ( //Change login to post if user already login
          <div className="flex items-center gap-4">
            <Link
              href="/Dashboard/Post"
              className="font-semibold text-base bg-primary-green px-4 py-2 rounded-md"
            >
              Post
            </Link>
            <Link
              href="/Dashboard/PostImage"
              className="font-semibold text-base bg-primary-green px-4 py-2 rounded-md"
            >
              Post Image
            </Link>
            <Link
              href="/Dashboard/ChatRoom"
              className="font-semibold text-base bg-primary-green px-4 py-2 rounded-md"
            >
              Chat
            </Link>
            <Link
              href="/Dashboard/User"
              className="lg:flex items-center align-middle gap-1"
            >
              <p className="text-sm ">{user.displayName}</p>
              <img
                src={user.photoURL}
                className="w-9 rounded-full cursor-pointer"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
