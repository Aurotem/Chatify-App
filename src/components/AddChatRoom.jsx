import { useRef } from "react";
export default function AddChatRoom({ handleAddChatRoom, handleCloseChatRoomScreen }) {
  const chatRoomToAdd = useRef();
  return (
    <>
        <div className="fixed h-dvh w-dvw bg-white top-0 z-10"><button className="text-gray-800 text-4xl absolute right-2 top-2" onClick={handleCloseChatRoomScreen}>X</button></div>
      <div className="absolute hizala w-full h-1/4 items-center justify-center flex rounded-xl md:w-1/2 flex-col z-20">
        <p className="text-xl text-center top-0">Sohbet odası ekle</p>
        <p className="text-sm mt-6">
          Bu alanda bir sohbet odası oluşturabilir, veya varolan bir odaya katılabilirsin.
        </p>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>

        <input
          ref={chatRoomToAdd}
          onKeyDown={(e) => e.key == "Enter" && handleAddChatRoom(chatRoomToAdd.current.value)}
          type="text"
          id="user-name"
          className=" mt-8 block w-3/4 p-4 ps-5 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Oda ismi:"
          required
        />
        <button
          onClick={() => handleAddChatRoom(chatRoomToAdd.current.value)}
          className="text-white mt-2 w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ekle
        </button>
      </div>
    </>
  );
}
