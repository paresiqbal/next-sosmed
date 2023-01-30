import Link from "next/link";

import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);
  console.log(user);

  return (
    <div className="p-5 shadow-md text-xl flex flex-col items-center gap-2 lg:flex lg:flex-row lg:justify-between">
      <div>
        {!user && ( //Checking user login or not
          <Link
            href="/Auth/Login"
            className="px-5 py-2 rounded-md text-white font-semibold bg-gray-700"
          >
            Login
          </Link>
        )}
        {user && (
          <div>
            <div className="flex flex-col items-center gap-2 lg:flex-row">
              <img className="rounded-full w-25" src={user.photoURL} />
              <h1 className="font-semibold underline decoration-purple-500 lg:text-2xl">
                {user.displayName}
              </h1>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
