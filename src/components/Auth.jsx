import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

//React icons
import { FcGoogle } from "react-icons/fc";

import Cookies from "universal-cookie";
const cookie = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-50 text-slate-900">
      <h1 className="text-4xl font-bold mb-2">Meso</h1>
      <p className="text-lg mb-6">The new wave of communication</p>
      <button
        onClick={signInWithGoogle}
        className="flex items-center px-4 py-2 text-lg md:text-xl bg-white shadow-md rounded-md border border-gray-300 hover:bg-gray-100 hover:scale-105 duration-300 transition"
      >
        Sign in with <FcGoogle className="ml-2" />
      </button>
    </div>
  );
};

export default Auth;
