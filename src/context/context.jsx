import { createContext,useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {


    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    const delayPara = (index,nextWord)=>{
        setTimeout(()=>{
            setResultData( prev => prev+nextWord )
        }, 75*index)

    }

    const newChat = ()=>{
        setLoading(false)
        setShowResult(false)
    }





    const onSent = async (prompt) => {
        setResultData(""); // Clear previous result
        setLoading(true); // Start loading
        setShowResult(true); // Show result area
        setRecentPrompt(prompt); // Set the most recent prompt
        setPrevPrompts(prev => [...prev, prompt])
      
        try {
          // Get the response
          const response = await run(prompt);
      
          // Split response by "**" and process
          let responseArray = response.split("**");
          let newResponse = ""; // Initialize the new response variable
      
          for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
              newResponse += responseArray[i]; // Add normal text
            } else {
              newResponse += "<b>" + responseArray[i] + "</b>"; // Add bold text for odd indices
            }
          }
      
          // Replace "*" with line breaks
          let newResponse2 = newResponse.split("*").join("<br>");
      
          // Set the final formatted result data
        //   setResultData(newResponse2);
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0; i < newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ");
        }
          
        } catch (error) {
          // Handle any error that occurs during the request
          setResultData("An error occurred while processing your request.");
        } finally {
          // Stop loading animation regardless of success or failure
          setLoading(false);
        }
      };

      
      
      
      const contextValue = {
          prevPrompts,
          setPrevPrompts,
          onSent,
          setRecentPrompt,
          recentPrompt,
          showResult,
          loading,
          resultData,
          input,
          setInput,
          newChat
          
          
        };
        
        return (
            <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

































// const onSent = async (prompt) => {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     setRecentPrompt(prompt)
  
//     try {
//       const response = await run(prompt);
     
//       setResultData(response );
//     } catch (error) {
      
//       setResultData("An error occurred while processing your request.");
//     }


//     let responseArray = response.split("**");
//     let newResponse;
//     for (let i = 0; i < responseArray.length; i++) {
//         if (i === 0 || i % 2 !== 1) {
          
//           newResponse += responseArray[i]; 
//         } else {
         
//           newResponse += "<b>" + responseArray[i] + "</b>"; 
//         }
//     }
//     let newResponse2 = newResponse.split("*").join("<br>");
//     setResultData(newResponse2);
        
//     setLoading(false);
//   };




//   const onSent = async (prompt) => {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);

//     const response = await run(input);
//     setResultData(response)
//     setLoading(false)
//     setInput("")
//   }
export default ContextProvider;