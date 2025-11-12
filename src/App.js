import './App.css';
import gptLogo from './Assets/chatgpt.svg';
import addBtn from './Assets/add-30.png';
import msgIcon from './Assets/message.svg';
import home  from './Assets/home.svg';
import shaved  from './Assets/bookmark.svg';
import rocket from './Assets/rocket.svg';

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <div className="uperSide">
          <div className="uperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
            <button className="midBtn">
              <img src={addBtn} alt="new chat" className="addBtn" /> New Chat
            </button>
            <div className="upperSideBottom">
              <button className="query">
                <img src={msgIcon} alt="Query" /> What is Programming?
              </button>
              <button className="query">
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

      <div className="main"></div>
    </div>
  );
}

export default App;
