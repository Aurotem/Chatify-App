/* eslint-disable no-unused-vars */
//* React
import { useState, useEffect, useRef } from "react";

//*Components
import MessageInput from "./MessageInput";
import AddChatRoom from "./AddChatRoom";

//* Firebase Imports
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig, app, analytics } from "../../firebase/fire";

let messages = [];

//!Getting Chat Rooms from local storage.
let chatRooms = JSON.parse(localStorage.getItem("chatRooms"));
if (!chatRooms) {
  localStorage.setItem("chatRooms", JSON.stringify(["global"]));
  chatRooms = JSON.parse(localStorage.getItem("chatRooms"));
}
export default function ChatScreen({ userName, setHasName }) {
  //*Messages to display
  const [stateMessages, setStateMessages] = useState([]);

  //*Dummy div ref to scroll to bottom
  const dummyDiv = useRef();

  //*Dummy Div Scroll Function
  function scroll() {
    dummyDiv.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  //*Chatroom Information
  const [chatRoomId, setChatRoomId] = useState("global");
  const [addingChatRoom, setAddingChatRoom] = useState(false);

  //*Adding Chat Rooms
  function handleAddChatRoom(e) {
    let currentChatRooms = JSON.parse(localStorage.getItem("chatRooms"));
    currentChatRooms.push(e);
    localStorage.setItem("chatRooms", JSON.stringify(currentChatRooms));
    chatRooms = JSON.parse(localStorage.getItem("chatRooms"));
    setAddingChatRoom((prev) => !prev);
  }

  //* Closing Add ChatRoom Screen
  function handleCloseChatRoomScreen() {
    setAddingChatRoom((prev) => !prev);
  }

  //* Chat Room Selector
  function selectChatRoom(chatRoom) {
    hideChatRooms();
    setChatRoomId((prev) => {
      if (prev != chatRoom) {
        setStateMessages([]);
        return chatRoom;
      } else {
        return chatRoom;
      }
    });
    setTimeout(scroll, 500);
  }

  //!----------CREATING DATABASE INSTANCE------------
  const db = getDatabase();
  const messageRef = ref(db, "chatrooms/" + chatRoomId);
  //!-------------------------------------------------

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
          setTimeout(scroll, 500);
        }
      }
    });
  }, [chatRoomId]);

  //! ------------Dynamic Classes-------------
  const [active, setActive] = useState(["", "", false]);
  let chatRoomDivClasses = `chatRooms flex flex-col h-dvh z-1 p:2 md:p-6 relative overflow-y-scroll ${active[0]}`;

  let messagesDivClasses = `flex-1 p:2 sm:p-6 justify-between flex flex-col h-dvh message-section ${active[1]}`;

  //TODO Dynamic Class Functions
  function showChatRooms() {
    setActive(["active", "deactive", true]);
  }

  function hideChatRooms() {
    setActive(["", "", false]);
  }

  //! ------------Dynamic Classes-------------

  return (
    <>
      {addingChatRoom && (
        <AddChatRoom
          handleAddChatRoom={handleAddChatRoom}
          handleCloseChatRoomScreen={handleCloseChatRoomScreen}
        />
      )}
      <div className="grid grid-cols-2 main-screen">
        <div className={chatRoomDivClasses}>
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4 w-full">
              <div className="relative"></div>
              <div className="flex flex-col leading-tight w-full">
                <div className="text-2xl mt-1 flex items-center justify-between">
                  <span className="text-gray-700 mr-3">Sohbet Odaları</span>
                  <button
                    onClick={handleCloseChatRoomScreen}
                    className="text-right text-sm hover:bg-gray-300 rounded-md p-1 max-w-fit max-h-fit"
                  >
                    + Sohbet odası ekle
                  </button>
                  {active[2] && (
                    <button
                      onClick={hideChatRooms}
                      className="fixed right-2 top-2 text-4xl z-50 text-gray-900"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {chatRooms.map((e, i) => (
            <div
              key={"chatRoom" + e + ":" + i}
              onClick={() => selectChatRoom(e)}
              className="chat-room my-2"
            >
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start w-full">
                  <div className="w-full">
                    <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 w-full">
                      <p className="mb-1 text-left text-base">
                        {e.charAt(0).toUpperCase() + e.slice(1)}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={messagesDivClasses}>
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4">
              <div className="relative"></div>
              <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center justify-between">
                  <span className="text-gray-700 mr-3">
                    {chatRoomId.charAt(0).toUpperCase() + chatRoomId.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setHasName(true)}
              className="text-gray-700 text-sm flex align-center justify-center sticky w-full greetings"
            >{`Merhaba, ${userName}!`}</button>
            {!active[2] && (
              <button
                onClick={showChatRooms}
                className="mr-4 text-2xl z-0 sm:z-20 text-gray-700"
              >
                Rooms
              </button>
            )}
          </div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch justify-items-start h-dvh overflow-x-hidden"
          >
            {stateMessages ? (
              stateMessages.map((e, i) =>
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
              )
            ) : (
              <p>Henüz bir mesaj yok.</p>
            )}
            <div ref={dummyDiv}></div>
          </div>
          <MessageInput userName={userName} chatRoomId={chatRoomId} />
        </div>
      </div>
    </>
  );
}
