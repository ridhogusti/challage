import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { initBalance } from '../actions/movie';
import loader from '../img/puff.svg';
import {reactLocalStorage} from 'reactjs-localstorage';

class Nav extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
	    }
	}

	componentDidMount() {
		let purchased = [];
	    let balance;
	    if(this.props.purchasedlist.length !== 0){
	      purchased = JSON.parse(this.props.purchasedlist);
	      balance = purchased.balance;
	      purchased = purchased.purchasedlist;
	      reactLocalStorage.set('balance', this.props.purchasedlist);
	    }else if(reactLocalStorage.get('balance')){
	  	  let JSONbalance = JSON.parse(reactLocalStorage.get('balance'));
	      purchased = JSONbalance.purchasedlist;
	      balance 	= JSONbalance.balance;
	      
	    }
		this.props.getInitBalance(balance, purchased);
	}
	render() {
		if (this.props.hasErrored) {
	      return <p>Sorry! There was an error loading the balance.</p>;
	    }
	    if (this.props.isLoading) {
	      return <div className="loader-overlay"><img className="loader" src={loader} alt="" /></div>;
	    }else{
	    	// console.log(this.props.balance);
	    	let balance = 0;
	    	if(this.props.purchasedlist.length !== 0){
	    		balance = JSON.parse(this.props.purchasedlist);
	    		balance = balance.balance;
	    	}
			return (
				// <header className="header" role="banner">
				// 	<nav className="nav">
				// 		<div className="nav__inner">
				// 			<Link className="nav__link" to="/"><span className="site-logo"></span></Link>
				// 			<div className="balance"><NumberFormat value={balance} displayType={'text'} thousandSeparator={true} prefix={'Rp '} renderText={value => <p>{value}</p>} /></div>
				// 		</div>
				// 	</nav>
        // </header>
        <div>
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <a className="navbar-brand customNavRight" href="">TokoFlix</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
              </ul>

              <span className="customNavRight"><NumberFormat value={balance} displayType={'text'} thousandSeparator={true} prefix={'Rp '} renderText={value => <span>{value}</span>} /> </span>
            </div>
          </nav>
        </div>
		    );
		}
	}
}


export default withRouter(connect(
  state => ({
    purchasedlist: state.balance,
    hasErrored: state.balanceHasErrored,
    isLoading: state.balanceIsLoading
  }),
  dispatch => ({
    getInitBalance: (balance, purchased) => dispatch(initBalance(balance, purchased))
  })
)(Nav));