import { useEffect, useRef, useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-Sb-nUYX1qp2L6FeXrplQuH4Mnrfzp5g",
  authDomain: "chatify-38f61.firebaseapp.com",
  databaseURL:
    "https://chatify-38f61-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatify-38f61",
  storageBucket: "chatify-38f61.appspot.com",
  messagingSenderId: "50438805825",
  appId: "1:50438805825:web:2b3c1e3ebda7d75eec69c0",
  measurementId: "G-PWRDB84GGK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [hasName, setHasName] = useState(false);
  const message = useRef();
  let userName = useRef();
  let localName = '';

  function setName() {
    setHasName(true);
    localStorage.setItem("userName", userName.current.value);
    userName = localName
  }

  //* Firstly, get username from localStorage, ask user to type if there is not.
  useEffect(() => {
    localName = localStorage.getItem("userName");
    if (!localName) {
      setHasName(false);
    } else {
      userName = localName
      setHasName(true);

    }
  }, []);

  function sendMessage() {
    const db = getDatabase();
    set(ref(db, "messages/"), {
      user: userName.current.value,
      message: message.current.value,
    });
  }

  return (
    <>
      {!hasName && (
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
      )}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
        <input
          ref={message}
          type="text"
          id="search"
          className="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Mesaj Yaz"
          required
        />
        <button
          onClick={sendMessage}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Gönder
        </button>
      </div>
    </>
  );
}

export default App;
