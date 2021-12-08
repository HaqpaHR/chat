import React from "react";
import { Users } from "../../types";
import { getData } from "../../api/api";
import './TitleTop.scss';

type Props = {
  data: Users[]
  selectedUserId: number,
}

export class TitleTop extends React.Component<Props,{}> {
  state = {
    usersInfo: [] as Users[]
  }

  componentDidMount = async() => {
    let res = await getData();
    let jsonResult = eval(res);
    this.setState({
      usersInfo: jsonResult
    })
  };

  chooseUser = () => {
    const result = this.state.usersInfo.find(user => user.id === this.props.selectedUserId);
    return result;
  }

  render() {
    const { usersInfo } = this.state;
    let staff = this.chooseUser();
    return (
        <div className="header__user-info">
          <img className="header__user--picture" src={staff?.icon} alt={staff?.name}/>
          <p className="header__user--name">{staff?.name}</p>
          <p className="header__user--relation">Вы понравились друг другу вчера</p>
          <div className="header__user--gallery"></div>
        </div>
    )
  }
}
