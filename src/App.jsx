import { useRef, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookie = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookie.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {room ? (
        <Chat room={room} signUserOut={signUserOut} />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold mb-4">Enter Room Name</p>
          <input
            type="text"
            ref={roomInputRef}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Room Name"
          />
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={() => setRoom(roomInputRef.current.value)}
              className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition"
            >
              Enter Chat
            </button>
            <button
              onClick={signUserOut}
              className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
