import React from "react";
import { Users } from "../../types";
import { getData } from "../../api/api";
import { Message } from "../../types";
import {TitleTop} from "../TitleTop/TitleTop";

interface Props {
  onSelect: (id: number) => void;
  selectedUserId: number;
  getData: Users[],
}

export class UserList extends React.Component<Props, {}> {

  lastMessage = (messages: Message[]) => {
    let last = messages[messages.length-1];
    return last?.msg
  };

  getTypeOfMessage = (messages: Message[]) => {
    const lastMessage = messages[messages.length-1];
    if(lastMessage?.type === 'to') {
      return 'Ты: '
    }
  };

  componentDidMount = async() => {
    let res = await getData();
    let jsonResult = eval(res);
    this.setState(state => ({
      getData: jsonResult
    }))
  };

  render() {
    return (
      <div className="user__list-container">
        <div className='user__list--container'>
          {
            this.props.getData.map(user => (
                <div
                    key={user.id}
                    className="user__list--item"
                    onClick={() => this.props.onSelect(user.id)}
                >
                  <img src={user.icon} alt={user.name} />
                  <li>{user.name}</li>
                  <p>{this.getTypeOfMessage(user.messages)}<span>{this.lastMessage(user.messages)}</span></p>
                </div>
            )
          )
          }
        </div>
      </div>
    )
  }
}
