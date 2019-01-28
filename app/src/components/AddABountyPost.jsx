import React from "react";
import PropTypes from "prop-types";
import Bounty from "../contracts/Bounty.json";
import { drizzleConnect } from "drizzle-react";

class AddABountyPost extends React.Component {
    
    constructor(props, context) {
        super(props);
        this.state = {
            value: 0,
            description: ''
        }
    }

    onChange = (e) => {this.setState({[e.currentTarget.name]: e.currentTarget.value })};
    onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(this);
        const {description, value} = this.state;
        const { drizzle } = this.context;
        const account = '0x0';
        // const { accounts: [account] } = this.props;
    
        if (!description || !value) {
            console.log('missing values');
        } else {
            console.log(`Account: ${account}`);

            const contract =  new drizzle.web3.eth.Contract(Bounty.abi, null, {
                from: account,
                value
            });
            contract.deploy({arguments: [description]});
            this.context.drizzle.addContract({
                contractName: "BountyBy",
                web3Contract: contract
            }, ["LogNewBounty", "LogNewOffer", "LogFulfilled", "LogPayedReward"])
        }
    };
    

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input name="value" type="number" placeholder="price in ether offered on bounty" onChange={this.onChange}/>
                <textarea name="description" placeholder="Description" onChange={this.onChange}>
                </textarea>
                <button>Post a new Bounty</button>
            </form>
          )
    }
}

AddABountyPost.contextTypes = {
    drizzle: PropTypes.object
}

export default AddABountyPost;
