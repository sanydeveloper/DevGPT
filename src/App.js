import './App.css';
import gptlogo from './ChatGPT_Clone_assets/GPTlogo.png';
import addbtn from './ChatGPT_Clone_assets/add-30.png';
import msgicon from './ChatGPT_Clone_assets/message.svg';
import home from './ChatGPT_Clone_assets/home.svg';
import saved from './ChatGPT_Clone_assets/bookmark.svg';
import rocket from './ChatGPT_Clone_assets/rocket.svg';
import sendBtn from './ChatGPT_Clone_assets/send.svg';
import usericon from './ChatGPT_Clone_assets/user-icon.png';
import { useState, useEffect, useRef } from 'react';
import { generateContent } from './gemini';

function App() {
  const defaultMessage = {
    sender: 'bot',
    text: 'DevGPT is an advanced AI chatbot being developed by Team Dev Alliance. Designed to assist developers of all levels, DevGPT leverages cutting-edge natural language processing to provide insightful answers, code suggestions, and real-time debugging assistance. Whether you\'re a beginner learning the basics or an experienced developer tackling complex challenges, DevGPT is your reliable partner in navigating the world of programming. With its ability to understand context and deliver precise, relevant information, DevGPT is set to revolutionize the way developers interact with technology.'
  };

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([defaultMessage]);
  const [hasConversationStarted, setHasConversationStarted] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: 'user', text: input };
    const updatedMessages = hasConversationStarted ? [...messages, userMessage] : [userMessage];
    setMessages(updatedMessages);
    setInput("");
    setHasConversationStarted(true);

    try {
      let result;
      if (userMessage.text.toLowerCase().includes("who developed you")) {
        result = "Dev Alliance and Team";
      } else {
        result = await generateContent(userMessage.text);
      }
      const botMessage = { sender: 'bot', text: result };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const newChat = () => {
    setInput("");
    setMessages([defaultMessage]);
    setHasConversationStarted(false);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperside">
          <div className="uppersidetop">
            <img src={gptlogo} className="logo" alt="Logo" />  <span className="brand">DevGPT</span>
          </div>
          <button className="midbtn" onClick={newChat}>
            <img src={addbtn} className="addbtn" alt="New Chat" />New Chat
          </button>
          <div className="uppersidebottom">
            <button className="query">
              <img src={msgicon} alt="Query" />What is Programming ?
            </button>
            <button className="query">
              <img src={msgicon} alt="Query" />How to use an API ?
            </button>
          </div>
        </div>
        <div className="lowerside">
          <div className="listitems">
            <img src={home} alt="Home" className='listitemsimg' />Home
          </div>
          <div className="listitems">
            <img src={saved} alt="Saved" className='listitemsimg' />Saved
          </div>
          <div className="listitems">
            <img src={rocket} alt="Upgrade" className='listitemsimg' />Upgrade to pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div key={index} className={`chat ${message.sender === 'bot' ? 'bot' : ''}`}>
              <img className='chatimg' src={message.sender === 'bot' ? gptlogo : usericon} alt='' />
              <p className="txt">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input
              type="text"
              placeholder='Send a message'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className='send' onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>DevGPT may produce inaccurate information about people, places, or facts. DevGPT version 1.3.5.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
