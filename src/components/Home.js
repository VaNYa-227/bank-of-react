import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
        <div>
          <img src="https://picsum.photos/201" alt="bank"/>
          <h1>Bank of React</h1>

          <Link to="/userProfile">User Profile</Link>
          <h1></h1>

          <Link to="/LogIn">Log In</Link>
          <h1></h1>

          <Link to="/Credits">Credits</Link>
          <h1></h1>

          <Link to="/Debits">Debits</Link>
          <h1></h1>

          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;
