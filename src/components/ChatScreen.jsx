//* React
import { useState, useEffect } from "react";

//*Components
import MessageInput from "./MessageInput";

//* Firebase Imports
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig, app, analytics } from "../../firebase/fire";

let messages = [];
export default function ChatScreen({ userName }) {
  const [stateMessages, setStateMessages] = useState([]);
  const db = getDatabase();
  const messageRef = ref(db, "chatrooms/" + "global");

  //*Chatroom
  let chatRoomId = "global";

  //* Using useEffect to prevent infinite loop.
  useEffect(() => {
    onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        //* Check the data is null or not
        if (messages != Object.values(data)) {
          //* Check the data is equal to our data to prevent infinite loop (again)
          messages = Object.values(data);
          setStateMessages(messages);
        }
      }
    });
  }, []);

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative"></div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">Genel Sohbet</span>
            </div>
          </div>
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch justify-items-start h-full overflow-x-hidden"
      >
        {stateMessages.map((e, i) =>
          e.user !== userName ? (
            <div key={"global" + i} className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      <p className="mb-1 text-left text-base">{e.user}</p>
                      {e.message}
                    </span>
                    <p className="text-left">{e.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div key={"global" + i} className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                    <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                    <p className="mb-1 text-right text-base">
                      {e.user.charAt(0).toUpperCase() + e.user.slice(1)}
                    </p>
                    <span className="flex">{e.message}</span>
                  </span>
                  <p className="text-right">{e.date}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <MessageInput userName={userName} chatRoomId={chatRoomId} />
    </div>
  );
}
