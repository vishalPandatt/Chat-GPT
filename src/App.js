import './App.css';
import gptLogo from './Assets/chatgpt.svg';
import addBtn from './Assets/add-30.png';
import msgIcon from './Assets/message.svg';
import home  from './Assets/home.svg';
import shaved  from './Assets/bookmark.svg';
import rocket from './Assets/rocket.svg';
import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // {role: 'user'|'assistant', text}

  async function sendPrompt() {
    if (!prompt.trim()) return;
    const userMsg = prompt.trim();
    setMessages((m) => [...m, { role: 'user', text: userMsg }]);
    setPrompt('');
    setLoading(true);
    try {
      // prefer explicit server URL if provided, otherwise use relative path (proxy)
      const serverBase = process.env.REACT_APP_API_URL || 'http://localhost:5173';
      const res = await fetch(serverBase + '/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg }),
      });
      // attempt to parse JSON, but fall back to text for useful errors
      let data;
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || `Unexpected content-type: ${contentType}`);
      }

      const answer = (data?.choices && data.choices[0] && data.choices[0].text) || data?.error || 'No response';
      setMessages((m) => [...m, { role: 'assistant', text: String(answer).trim() }]);
    } catch (err) {
      const msg = err?.message || String(err);
      setMessages((m) => [...m, { role: 'assistant', text: 'Error: ' + msg }]);
    } finally {
      setLoading(false);
    }
  }

  function handleNewChat() {
    setMessages([]);
    setPrompt('');
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div className="uperSide">
          <div className="uperSideTop">
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img src={gptLogo} alt="Logo" className="logo" />
              <span className="brand">ChatGPT</span>
            </div>
            <button className="midBtn" onClick={() => { setMessages([]); setPrompt(''); }}>
              <img src={addBtn} alt="new chat" className="addBtn" /> New Chat
            </button>
            <div className="upperSideBottom">
              <button className="query" onClick={() => { setPrompt('What is Programming?'); }}>
                <img src={msgIcon} alt="Query" /> What is Programming?
              </button>
              <button className="query" onClick={() => { setPrompt('How to use an API?'); }}>
                <img src={msgIcon} alt="Query" /> How to use an API?
              </button>
            </div>
          </div>
        </div>

        <div className="lowerSide">
          <div className='listItems'><img src={home} alt='home' className='listItemsImg'></img>Home</div>
          <div className='listItems'><img src={shaved} alt='bookmark' className='listItemsImg'></img>Shaved</div>
          <div className='listItems'><img src={rocket} alt='rocket' className='listItemsImg'></img>Upgrade to Pro</div>
        </div>
      </div>

      <div className="main">
        <div style={{padding: '2rem'}}>
          <div style={{marginBottom: '1rem'}}>
            <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Type your question..." style={{width: '100%', height: '6rem', fontSize: '1.4rem', padding: '1rem'}} />
          </div>
          <div style={{display: 'flex', gap: '1rem'}}>
            <button className="midBtn" style={{maxWidth: '12rem'}} onClick={sendPrompt} disabled={loading}>{loading ? 'Thinking...' : 'Send'}</button>
          </div>

          <div className="messageContainer">
            {messages.length === 0 ? (
              <div className="emptyState">
                <h2 style={{margin:0}}>Start a conversation</h2>
                <p style={{marginTop: '0.5rem', color: 'rgba(255,255,255,0.6)'}}>Type a question and press Send.</p>
              </div>
            ) : (
              <div className="messages">
                {messages.map((m, i) => (
                  <div key={i} className={`message ${m.role}`}>
                    <div className="messageBubble">{m.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

