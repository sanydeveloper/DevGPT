import './App.css';
import gptlogo from './ChatGPT_Clone_assets/GPTlogo.png';
import addbtn from './ChatGPT_Clone_assets/add-30.png';
import msgicon from './ChatGPT_Clone_assets/message.svg';
import home from './ChatGPT_Clone_assets/home.svg';
import saved from './ChatGPT_Clone_assets/bookmark.svg';
import rocket from './ChatGPT_Clone_assets/rocket.svg';
import sendBtn from './ChatGPT_Clone_assets/send.svg';
import usericon from './ChatGPT_Clone_assets/user-icon.png';
import { useState } from 'react';
import { generateContent } from './gemini';
import HistoryModal from './components/History-Models';

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [page, setPage] = useState("Home"); // For page navigation

  const handleSend = async () => {
    if (!input.trim()) return; // Avoid sending empty queries

    try {
      const result = await generateContent(input);
      setOutput(result);
      setHistory([...history, { input, response: result }]);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const handlePredefinedQuery = async (query) => {
    setInput(query); // Set the input to the predefined query
    try {
      const result = await generateContent(query);
      setOutput(result);
      setHistory([...history, { input: query, response: result }]);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const newChat = () => {
    setInput("");
    setOutput("");
  };

  const openHistory = () => setIsHistoryOpen(true);
  const closeHistory = () => setIsHistoryOpen(false);

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperside">
          <div className="uppersidetop">
            <img src={gptlogo} className="logo" alt="Logo" />
            <span className="brand">DevGPT</span>
          </div>
          <button className="midbtn" onClick={newChat}>
            <img src={addbtn} className="addbtn" alt="New Chat" />
            New Chat
          </button>
          <div className="uppersidebottom">
            <button className="query" onClick={() => handlePredefinedQuery("What is Programming?")}>
              <img src={msgicon} alt="Query" />
              What is Programming?
            </button>
            <button className="query" onClick={() => handlePredefinedQuery("How to use an API?")}>
              <img src={msgicon} alt="Query" />
              How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerside">
          <div className="listitems" onClick={() => setPage("Home")}>
            <img src={home} alt="Home" className="listitemsimg" />
            Home
          </div>
          <div className="listitems" onClick={() => setPage("Saved")}>
            <img src={saved} alt="Saved" className="listitemsimg" />
            Saved
          </div>
          <div className="listitems" onClick={() => setPage("Upgrade")}>
            <img src={rocket} alt="Upgrade" className="listitemsimg" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        {page === "Home" && (
          <>
            <button onClick={openHistory} className="history-button">
              View History
            </button>
            {isHistoryOpen && <HistoryModal history={history} onClose={closeHistory} />}
            <div className="chats">
              {input && (
                <div className="chat">
                  <img className="chatimg" src={usericon} alt="" />
                  <p className="txt">{input}</p>
                </div>
              )}
              {output && (
                <div className="chat bot">
                  <img className="chatimg" src={gptlogo} alt="" />
                  <p className="txt">{output}</p>
                </div>
              )}
            </div>
            <div className="chatfooter">
              <div className="inp">
                <input
                  type="text"
                  placeholder="Send a message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="send" onClick={handleSend}>
                  <img src={sendBtn} alt="Send" />
                </button>
              </div>
              <p>
                DevGPT may produce inaccurate information about people, places, or facts. DevGPT
                version 1.3.5.
              </p>
            </div>
          </>
        )}
        {page === "Saved" && <div className="page">Saved Responses Page (Coming Soon)</div>}
        {page === "Upgrade" && <div className="page">Upgrade to Pro Page (Coming Soon)</div>}
      </div>
    </div>
  );
}

export default App;
