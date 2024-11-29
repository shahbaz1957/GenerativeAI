import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {onSent,recentPrompt,showResult,loading,resultData,input,setInput } = useContext(Context);

  // Local state to manage input field
  const [localInput, setLocalInput] = useState("");



  const handleSend = () => {
    if (localInput.trim() === "") {
      alert("Input cannot be empty.");
      return;
    }
  
    onSent(localInput); // Pass the input directly
    setLocalInput(""); // Clear the local input field after sending
  };

//   const handleSend = () => {
//     setInput(localInput); // Update the global context state
//     onSent(); // Call the send function
//   };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

    {!showResult? 
    <>
        <div className="greet">
          <p>
            <span>Hello Jay</span>
          </p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest beautiful places to seen on an upcoming road trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Briefly summarize the concept: urban planing </p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstrom team bonding activities for our works retreat</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Improvethe readability of the following code</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
    </>
    :
     <div className="result">
        <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {
            loading
            ?<div className="loader">
                <hr />
                <hr />
                <hr />
            </div>
            :<p dangerouslySetInnerHTML={{ __html:resultData}} ></p>
            }
        </div>
     </div>}

        
        <div className="main-bottom">
          <div className="search-box">
            {/* Local input state to avoid unnecessary renders */}
            <input
              onChange={(e) => setLocalInput(e.target.value)}
              value={localInput}
              placeholder="Enter a prompt"
              type="text"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
               <img onClick={handleSend} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini can make mistakes, so double-check it
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;