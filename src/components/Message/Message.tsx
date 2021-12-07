import React from "react";
import {Message} from "../../types";
import classNames from 'classnames';

type Props = {
  messageInfo: Message,
}

export class MessageStyle extends React.Component<Props, {}> {

  render() {

    const { type, msg, time } = this.props.messageInfo;
    const date = new Date(time);
    const realTime = date.toLocaleTimeString();
    console.log(realTime)
    console.log(this.props.messageInfo)

    return (
        <div className={classNames(
                 'message', {
                   'message--from': type === 'from',
                   'message--to': type === 'to',
                 },
             )}>
          <small>{realTime}</small>
          <p>{msg}</p>
        </div>
    )
  }
}
