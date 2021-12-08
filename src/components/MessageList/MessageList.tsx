import React from "react";
import {getData,getMessages,sendData} from "../../api/api";
import { Message } from "../../types";
import { MessageStyle } from "../Message/Message";
import "./MessageList.scss";
import { v4 as uuid4 } from 'uuid';

interface Props {
  selectedUserId: number,
}

interface State {
  messages: Message[],
  userMessage: string,
}


export class MessageList extends React.Component<Props, State> {
  state = {
    messages: [] as Message[],
    userMessage: '',
  };

  async componentDidMount() {
    const res = await getMessages(this.props.selectedUserId);
    let jsonResult = eval(res);
    console.log(jsonResult)
    this.setState({
      messages: jsonResult.messages
    })
  }

  async componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      const res = await getMessages(this.props.selectedUserId);
      let jsonResult = eval(res);
      this.setState(state => ({
        messages: jsonResult.messages
      }))
    }
  }

  inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({
      userMessage: value,
    })
  };

  buttonSendHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let nowTime = Date.now();
    console.log(nowTime);

    const newObj = {
      type: 'from',
      msg: this.state.userMessage,
      time: nowTime,
    }

    sendData(this.props.selectedUserId, this.state.userMessage);

    let result =  sendData(this.props.selectedUserId, this.state.userMessage);
    console.log(result);

    this.setState(state => ({
      messages: [...state.messages, newObj],
      userMessage: '',
    }))
  }

  render() {
    const { messages, userMessage} = this.state;
    return (
      <div className='message__container'>
        <div className='message__list'>
          {messages.map((message:Message) => (<MessageStyle messageInfo={message} key={uuid4()} />))}
        </div>
        <form
            onSubmit={this.buttonSendHandler}
            className='message__send'
        >
          <input
              className='message__send--input'
              type='text'
              placeholder='Твое сообщение... (Enter чтобы отправить)'
              value={userMessage}
              onChange={this.inputHandler}
          />
          <div className='message__send--icons'></div>
          <button
              type='submit'
              className='button__send'
          ></button>
        </form>
      </div>
    )
  }
}
