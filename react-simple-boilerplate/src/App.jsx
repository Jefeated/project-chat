import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Anonymous'}, 
      messages: [],
      userCount: 0
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(username, message, type) {
    const newMessage = {
      type: type,
      username: username,
      content: message
    }
    
    this.socket.send(JSON.stringify(newMessage));
  }

  nameChange(username, type){
    console.log(this.state)
    const nameChange = {
      type: type,
      message: `${this.state.currentUser.name} changed their name to: ${username}`
    }
      this.setState({currentUser: {name: username}});

    this.socket.send(JSON.stringify(nameChange));
  }


componentDidMount() {
  this.socket = new WebSocket('ws://127.0.0.1:3001');
  this.socket.onopen = () => {
   console.log('got a connection');
  
    //var messageInput = document.getElementById('message');

    this.socket.onmessage = (e) => {
      const payload = JSON.parse(e.data);

      switch(payload.type)
      {
        case 'userCount':
          this.setState({userCount: payload.userCount})
          break;
        case 'incomingMessage':
        case 'incomingNotification':
          {
            const message = payload;
            const messages = this.state.messages.concat(message)
            this.setState({ messages });
            // this.setState( { messages: [...this.state.messages, message] });
          }
          break;
        default:
          console.error(`Unknown message type ${payload.type}`);
        }
      };
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="connected"> User(s) online: {this.state.userCount} </div>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar name = {this.state.currentUser.name} addMessage={this.addMessage} nameChange={this.nameChange.bind(this)}/>
      </div>      
    )
  }
}

export default App;
