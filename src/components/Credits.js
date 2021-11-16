import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class CreditsComponent extends Component {

    constructor(){
        super()

        this.state = {
            credit: {

                id: 'NEW_ID',
                amount: 0,
                date: 'FILL',
                description: 'DESCRIPTION',

            },
        }
    }
    
    creditsView = () => {

        const { credits } = this.props;

        return credits.map((credit) => {

            let date = credit.date.slice(0,10);
            return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>

        })
    }

    manageChange = (e) =>{

        const updatedCredit = {...this.state.credit}
        const inputField = e.target.name
        const inputValue = e.target.value

        updatedCredit[inputField] = inputValue
        let rightNow = new Date()
        updatedCredit['date'] = rightNow.toISOString()

        this.setState({credit: updatedCredit})

    }
    
    manageSubmit  = (e) =>{
        e.preventDefault();

        this.props.addCredit(this.state.credit);
    }

    render(){

        return (
            <div>
                <h1> Credits </h1>
                {this.creditsView()}

                <h1/>
                <AccountBalance accountBalance={this.props.accountBalance}/>
                <h1/>

                <Link to="/userProfile">User Profile</Link>
                <h1></h1>

                <Link to="/LogIn">Log In</Link>
                <h1></h1>

                <Link to="Credits">Credits</Link>
                <h1></h1>

                <Link to="/">Return to Home</Link>
                <h1></h1>

                <h1></h1>
                <form onSubmit={this.manageSubmit}>
                    <div>
                    <label htmlFor="description"> Description: </label>
                        <input type="text" name="description" onChange={this.manageChange}/>
                    </div>

                    <div>
                    <label htmlFor="amount"> Amount: </label>
                        <input type="text" name="amount" onChange={this.manageChange}/>
                    </div>
                    <button>Submit</button>
                </form>
                
            </div>
        )
    }
}

export default CreditsComponent;

