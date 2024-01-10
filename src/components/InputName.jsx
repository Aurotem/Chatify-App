import { useState, useEffect, useRef } from "react";

export default function InputName({ getName }) {
  const [hasName, setHasName] = useState(false);
  let userName = useRef();

  //* Set the typed name in localStorage as well as in a variable.
  function setName(user) {
    setHasName(false);
    localStorage.setItem("userName", user);
    userName.current = localStorage.getItem("userName");
    getName();
  }

  //* Firstly, get username from localStorage, ask user to type if there is not.
  useEffect(function getLocalName() {
    userName.current = localStorage.getItem("userName");
    if (userName.current) {
      setHasName(false);
    } else {
      setHasName(true);
    }
  }, []);
  return hasName ? (
    <>
      <div className="fixed h-dvh w-dvw bg-white top-0"></div>
      <div className="absolute hizala w-full h-1/4 items-center justify-center flex rounded-xl md:w-1/2 flex-col">
        <p className="text-xl text-center top-0">Hoşgeldin!</p>
        <p className="text-sm mt-6 text-center">
          Bir rumuz girip sohbete hemen başlayabilirsin.
        </p>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>

        <input
          ref={userName}
          onKeyDown={(e) => e.key == "Enter" && setName(userName.current.value)}
          type="text"
          id="user-name"
          className=" mt-8 block w-3/4 p-4 ps-5 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Rumuz Gir:"
          required
        />
        <button
          onClick={() => setName(userName.current.value)}
          className="text-white mt-2 w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Başla
        </button>
      </div>
    </>
  ) : null;
}
