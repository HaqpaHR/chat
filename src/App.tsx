import React from "react";
import {getData} from "./api/api";
import { UserList } from "./components/UserList/UserList";
import {MessageList} from "./components/MessageList/MessageList";
import {TitleTop} from "./components/TitleTop/TitleTop";
import "./App.scss"
import {Users} from "./types";

interface State {
  selectedUserId: number,
  getData: Users[]
}

export class App extends React.Component<{},State> {
  state = {
    selectedUserId: 124,
    getData: [] as Users[],
  }

  changeUser = (id: number) => {
    if (this.state.selectedUserId !== id) {
      this.setState({
        selectedUserId: id,
      });
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
    const { selectedUserId, getData } = this.state;
    return (
        <div className="app">
          <div className="user__list--top">
            <select className="user__list--select">
              <option value=''></option>
              <option value=''></option>
            </select>
            <TitleTop data={this.state.getData} selectedUserId={this.state.selectedUserId} />
          </div>
          <UserList onSelect={this.changeUser} selectedUserId={selectedUserId} getData={getData} />
          <MessageList selectedUserId={selectedUserId} />
        </div>
    )
  }
}
