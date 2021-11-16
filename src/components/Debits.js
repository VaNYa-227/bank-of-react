import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class DebitsComponent extends Component {

    constructor(){
        super()

        this.state = {
            debit: {

                id: 'NEW_ID',
                amount: 0,
                date: 'FILL',
                description: 'DESCRIPTION',

            },
        }
    }

    debitsView = () => {

        const { debits } = this.props;

        return debits.map((debit) => {

            let date = debit.date.slice(0,10);
            return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>

        })
    }

    manageChange = (e) =>{

        const updatedDebit = {...this.state.debit}
        const inputValue = e.target.value
        const inputField = e.target.name

        updatedDebit[inputField] = inputValue
        let rightNow = new Date()
        updatedDebit['date'] = rightNow.toISOString()

        this.setState({debit: updatedDebit})

    }
    
    manageSubmit  = (e) =>{

        e.preventDefault();

        this.props.addDebit(this.state.debit);
    }

//Navigation buttons/links
    render(){

        return (
            <div>
                <h1> Debits </h1>
                {this.debitsView()}

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

export default DebitsComponent;

