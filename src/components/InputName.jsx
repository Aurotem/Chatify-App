import { useState, useEffect, useRef } from "react";

export default function InputName({getName}) {
  const [hasName, setHasName] = useState(false);

  let userName = useRef();
  //* Set the typed name in localStorage as well as in a variable.
  function setName() {
    setHasName(false);
    localStorage.setItem("userName", userName.current.value);
    userName.current = localStorage.getItem("userName");
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
    <div className="absolute w-1/2 hizala">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
      <input
        ref={userName}
        type="text"
        id="user-name"
        className="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Mesaj Yaz"
        required
      />
      <button
        onClick={setName}
        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Gönder
      </button>
    </div>
  ) : null;
}
