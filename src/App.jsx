//* React Imports
import { useState,useEffect } from "react";

//*Components
import InputName from "./components/InputName";
import ChatScreen from "./components/ChatScreen";

function App() {
  const [userName, setUserName] = useState();
  function getName() {
    setUserName(localStorage.getItem('userName'))
  }
useEffect(getName,[])

 
  return (
    <>
    <ChatScreen userName={userName}/>
      <InputName getName={getName}/>
    </>
  );
}

export default App;
