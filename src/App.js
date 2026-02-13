import './App.css';
import gptLogo from './Assets/chatgpt.svg';
import addBtn from './Assets/add-30.png';
import msgIcon from './Assets/message.svg';
import home  from './Assets/home.svg';
import shaved  from './Assets/bookmark.svg';
import rocket from './Assets/rocket.svg';
import { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'user', text: input }]);
      setInput('');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'assistant', text: 'This is a sample response from Gemini AI.' }]);
      }, 500);
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebarTop">
          <button className="newChatBtn">
            <span>+</span>
          </button>
          <div className="logo-section">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">Gemini</span>
          </div>
        </div>

        <div className="chatHistory">
          <div className='historyTitle'>Chat History</div>
          <button className="query">
            <img src={msgIcon} alt="Query" /> What is Programming?
          </button>
          <button className="query">
            <img src={msgIcon} alt="Query" /> How to use an API?
          </button>
        </div>

        <div className="sidebarBottom">
          <div className='listItems'><img src={home} alt='home' className='listItemsImg'></img>Home</div>
          <div className='listItems'><img src={shaved} alt='bookmark' className='listItemsImg'></img>Saved</div>
          <div className='listItems'><img src={rocket} alt='rocket' className='listItemsImg'></img>Upgrade</div>
        </div>
      </div>

      <div className="main">
        <div className="messageContainer">
          {messages.length === 0 ? (
            <div className="emptyState">
              <h1>Hi there</h1>
              <p>How can I help you today?</p>
            </div>
          ) : (
            <div className="messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.type}`}>
                  <div className={`messageBubble ${msg.type}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="inputContainer">
          <div className="searchBox">
            <input
              type="text"
              className="inputField"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="sendBtn" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
