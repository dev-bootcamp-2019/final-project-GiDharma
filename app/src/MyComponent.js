import React from "react";
import AddABountyPostContainer from "./components/AddABountyPostContainer";

import {
  AccountData
} from "drizzle-react-components";

class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 'ShowBountyForm': false };
  }

  render() {
    const {ShowBountyForm} = this.state;

    return (
      <div className="App">
        <h3>Hello World</h3>
        <div className="section">
          <h4>Active Account</h4>
          <AccountData accountIndex="0" units="ether" precision="3" />
        </div>
        <button onClick={() => {this.setState({'ShowBountyForm': true})}}>
        Add a new bounty
        </button>
        {
          ShowBountyForm &&
          <AddABountyPostContainer/>
        }
      </div>
    )
  }
}

export default MyComponent;
