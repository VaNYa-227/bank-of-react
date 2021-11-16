import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './LogIn';
import Credits from './components/Credits';
import Debits from './components/Debits';
import './App.css';
import axios from "axios"


class App extends Component {

  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      },
      credits: [],
      debits: []
    }
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
    this.componentDidMount()
  }

  addCredit = (e) =>{

    let newCredits = [...this.state.credits]

    let addThis = {

      'id': e.id,
      'amount': e.amount,
      'date': e.date,
      'description': e.description

    };

    newCredits.push(addThis);

    let sumAmount = Number(this.state.accountBalance) + Number(e.amount);
    
    this.setState({credits: newCredits})
    this.setState({accountBalance: sumAmount})

  }

  addDebit = (e) =>{

    let newDebits = [...this.state.debits]

    let addThis = {

      'id': e.id,
      'amount': e.amount,
      'date': e.date,
      'description': e.description

    };

    newDebits.push(addThis);
    let sumAmount =  Number(this.state.accountBalance) - Number(e.amount);
    
    this.setState({debits: newDebits})
    this.setState({accountBalance: sumAmount})
    
  }

  async componentDidMount(){

    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")

    credits = credits.data
    debits = debits.data

    let creditSum = 0;
    let debitSum = 0;

    debits.forEach((debit) => { debitSum += debit.amount})
    credits.forEach((credit) => { creditSum += credit.amount})

    let accountBalance = creditSum - debitSum;

    this.setState({debits, credits, accountBalance});

  }

  render() {

    const {credits} = this.state;
    const {debits} = this.state;

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} accountBalance={this.state.accountBalance}/>
    );

    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits addCredit={this.addCredit} credits={credits} accountBalance={this.state.accountBalance}/>)
    const DebitsComponent = () => (<Debits addDebit={this.addDebit} debits={debits} accountBalance={this.state.accountBalance}/>)

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/Credits" render={CreditsComponent}/>
            <Route exact path="/Debits" render={DebitsComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;
