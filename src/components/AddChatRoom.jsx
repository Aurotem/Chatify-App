import { useRef } from "react";
export default function AddChatRoom({ handleAddChatRoom }) {
  const chatRoomToAdd = useRef();
  return (
    <>
      <div className="fixed h-dvh w-dvw bg-white z-10"></div>
      <div className="hizala fixed h-1/3 w-1/4 bg-white z-10">
        <input
          ref={chatRoomToAdd}
          type="text"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-3 text-sm"
          placeholder="Oda ismi:"
        />
        <button
          onClick={() => handleAddChatRoom(chatRoomToAdd.current.value)}
          className=" w-full inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
        >
          Ekle
        </button>
      </div>
    </>
  );
}
