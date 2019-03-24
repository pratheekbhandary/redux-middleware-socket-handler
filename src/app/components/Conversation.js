import React from "react";

export default function Conversation(props) {
    return (
      <React.Fragment>
        {props.messages && props.messages.map(msg => {
          if (msg.from !== props.userName) {
            return <li key={msg.timeStamp} className="incoming">{msg.message}</li>
          } else {
            return <li key={msg.timeStamp} className="outgoing">{msg.message}</li>
          }
        })}
      </React.Fragment>
    );
}
