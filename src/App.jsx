//* React Imports
import { useState, useEffect } from "react";

//*Components
import InputName from "./components/InputName";
import ChatScreen from "./components/ChatScreen";

function App() {
  const [userName, setUserName] = useState();
  const [hasName, setHasName] = useState(false);

  function getName() {
    setUserName(localStorage.getItem("userName"));
  }
  useEffect(getName, []);

  function handleHasName(a) {
    setHasName(a)
  }
  return (
    <>
      <ChatScreen userName={userName} setHasName={handleHasName} />
      <InputName getName={getName} hasName={hasName} setHasName={handleHasName} name={userName} />
    </>
  );
}

export default App;
