import React from "react";
import {Message} from "../../types";
import classNames from 'classnames';
import './Message.scss';

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
              'message__from': type === 'from',
              'message__to': type === 'to',
            },
        )}>
          <span className={classNames(
              'message__type', {
                'from': type === 'from',
                'to': type === 'to',
              },
          )}>{msg}</span>
          <small className='message__time'>{realTime}</small>
        </div>
    )
  }
}
