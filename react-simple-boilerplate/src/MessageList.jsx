import React, { Component, PropTypes } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // const { messages } = this.props;
    return (
  <main>
    {
      // messages.map(message => <Message key={message.id} {...message} />)
      
      this.props.messages.map((message) => {

        const { username, content, type, id } = message;

        /*const username = message.username;
        const content = message.content;*/

        return <Message key={id} username={username} content={content} type={type} />

        //return <Message key={id} { ...message } />
      })
    }
  </main>
    )}
}

// Function-style dumb component
// function MessageList(props) {
//   return props.messages.map(message => <Message key={message.id} {...message} />)
// }

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
}

export default MessageList;