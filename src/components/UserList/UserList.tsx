import React from "react";
import { Users } from "../../types";
import { getData } from "../../api/api";
import { Message } from "../../types";
import './UserList.scss';
import classNames from "classnames";

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
    return ''
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
      <div className='user__list--container'>
        {
          this.props.getData.map(user => (
            <div
                key={user.id}
                className={classNames("user__list--item", {
                  "selected": user.id === this.props.selectedUserId,
                })}
                onClick={() => this.props.onSelect(user.id)}
            >
              <img
                src={user.icon}
                alt={user.name}
                className="user__list--image"
              />
              <li className="user__list--name">{user.name}</li>
              <p className="user__list--message-you"
              >{this.getTypeOfMessage(user.messages)}
                <span className="user__list--message">{this.lastMessage(user.messages)}</span>
              </p>
            </div>
          )
        )
        }
    </div>
    )
  }
}
