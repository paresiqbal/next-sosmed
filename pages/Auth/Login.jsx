import { FaGithub, FaFacebook, FaGoogle } from "react-icons/fa";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  //Sign in with Google
  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  //Redirect user to home after login
  useEffect(() => {
    if (user) {
      route.push("/Dashboard/Blog");
    } else {
      console.log("Login");
    }
  }, [user]);

  return (
    <div className="mx-4 mt-32 p-10 text-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold">Join Now</h2>
      <div className="py-4 flex flex-col gap-1">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <FaGoogle className="text-2xl" />
          Sign in with Google
        </button>
        <button className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2">
          <FaFacebook className="text-2xl" />
          Sign in with Facebook
        </button>
        <button className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2">
          <FaGithub className="text-2xl" />
          Sign in with Github
        </button>
      </div>
    </div>
  );
}
