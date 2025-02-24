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
import { auth, db } from "../firebase-config";

//React Icons
import { IoMdSend } from "react-icons/io";
import { LiaSignOutAltSolid } from "react-icons/lia";

const Chat = (props) => {
  const { room, signUserOut } = props;
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");

  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return; // Prevent empty messages

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe(); // Cleanup function
  }, [room]);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <div className="flex justify-between items-center p-4 bg-slate-900 text-white shadow-md">
        <h2 className="text-2xl font-bold">{room}</h2>
        <button
          onClick={signUserOut}
          className="bg-red-900 hover:bg-red-600 p-0.5 rounded-full text-3xl transition"
        >
          <LiaSignOutAltSolid />
        </button>
      </div>

      <div className="px-4 py-2 flex-1 overflow-y-auto space-y-2">
        {messages.map((message) => {
          const isCurrentUser = message.user === auth.currentUser.displayName;
          return (
            <div
              key={message.id}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-1 rounded-lg max-w-xs ${
                  isCurrentUser
                    ? "bg-green-950 text-white shadow-md"
                    : "bg-gray-800 text-white"
                }`}
              >
                <span
                  className={`text-xs block ${
                    isCurrentUser ? "text-pink-400" : "text-orange-400"
                  }`}
                >
                  {message.user}
                </span>
                <p className="px-1 pb-0.5">{message.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center px-2 py-1 shadow-md space-x-4"
      >
        <input
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          className="border border-gray-300 rounded-2xl flex-1 px-2 md:px-4 py-1 md:py-2 text-sm md:text-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="bg-blue-500 text-white rounded-full disabled:bg-gray-300 p-1.5 text-xl"
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default Chat;
