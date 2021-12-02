import React from "react";
import {requestS} from "./api/api";


export class App extends React.Component<{},{}> {
  state ={
    request: '',
    sendData: '',
  }
  componentDidMount = async() => {
    let res = await requestS;
    console.log(res)
  }

  render() {
    const { request } = this.state
    return (
        <div>
         <h1>hi</h1>
        </div>
    )
  }
}
