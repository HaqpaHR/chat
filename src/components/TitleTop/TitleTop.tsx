import React from "react";
import { Users } from "../../types";
import { getData } from "../../api/api";

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
    console.log(staff)
    return (
        <div className="user__list--title">
          <img className="user__list--picture" src={staff?.icon} alt={staff?.name}/>
          <p className="user__list--name">{staff?.name}</p>
        </div>
    )
  }
}
