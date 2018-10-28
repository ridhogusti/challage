import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { itemFetchData, initBalance, balancePurchase } from '../../actions/movie';
import loader from '../../img/puff.svg';
import NumberFormat from 'react-number-format';
import Cast from './Cast';
// import Similar from './Similar';
import Trailers from './Trailers';
import Menu from '../Menu';
import {reactLocalStorage} from 'reactjs-localstorage';


class MovieDetail extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
    }

    this.dispatchBalance = this.dispatchBalance.bind(this);

  }

  componentDidMount() {
    this.renderPage();
  }


  componentDidUpdate() {
    if(this.state.url !== this.props.location.pathname && this.state.url !== ''){
      this.renderPage();
    }
  }


  renderPage(){
    let movieID = this.props.match.params.Id.split('-');
    let apiUrl = `https://api.themoviedb.org/3/movie/${movieID[0]}?&api_key=f1f087bcabf3e275dce6c4be94cb971b`;

    this.props.fetchData(apiUrl);
    this.setState({url: this.props.location.pathname})

    let purchased = [];
    let balance;
    if(this.props.purchasedlist.length !== 0){
      purchased = JSON.parse(this.props.purchasedlist);
      balance = purchased.balance;
      purchased = purchased.purchasedlist;
      reactLocalStorage.set('balance', this.props.purchasedlist);
    }else if(reactLocalStorage.get('balance')){
      console.log(reactLocalStorage.get('balance'));
      let JSONbalance = JSON.parse(reactLocalStorage.get('balance'));
      purchased = JSONbalance.purchasedlist;
      balance   = JSONbalance.balance;
      
    }
    this.props.getInitBalance(balance, purchased);
  }

  dispatchBalance(balance, price, movid, purchased, e) {
    if(balance < price){
      alert("Insufficient balance");
      return false;
    }else if(purchased.indexOf(movid) >= 0){
      alert("Already purchased");
      return false;
    }else{
      purchased.push(movid);
      this.props.UpdateBalance(balance-price, purchased);
      reactLocalStorage.set('balance',(JSON.stringify({'type': 'BALANCE_FETCH_DATA_SUCCESS','balance': (balance-price),'purchasedlist': purchased})));
      return true;
    }
  }

  render() {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const imageSize = 'w500';
    const { title, overview, release_date, vote_average, backdrop_path, original_title, poster_path, tagline, runtime, revenue} = this.props.single;
    const headerStyles = {
      backgroundImage: `url(${baseUrl}w780${backdrop_path})`,
    };

    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items.</p>;
    }

    if (this.props.isLoading) {
      return <div className="loader-overlay"><img className="loader" src={loader} alt="" /></div>;
    }else{
      let purchased = [];
      let balance = 0;
      if(this.props.purchasedlist.length !== 0){
        purchased = JSON.parse(this.props.purchasedlist);
        balance  = purchased.balance; 
        purchased = purchased.purchasedlist;
      }
      let movid = this.props.match.params.Id.split('-');
      movid = parseInt(movid[0]);
      let poster_img = '';
      if(typeof poster_path !== 'undefined'){
        poster_img = `${baseUrl}${imageSize}${poster_path}`;
      }
      let price = 0;
      if(vote_average < 4){
        price = 3500;
      }else if(vote_average < 7){
        price = 8250;
      }else if(vote_average < 9){
        price = 16350;
      }else{
        price = 21500;
      }
      let ispurchased;
      if(purchased.indexOf(movid) < 0){
        ispurchased = <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp '} renderText={value => <button onClick={this.dispatchBalance.bind(this, balance, price, movid, purchased)} className="btnbuy">Buy {value}</button>} />;
      }else{
        ispurchased = <button disabled className="btnbuy">Purchase</button>;
      }

      return (
        <main className="main" role="main" style={headerStyles}>
          <Menu />
          
          <div className="movie-details">
            <div className="teaser__image">
              <img src={poster_img} alt={original_title} />
              {/* <Similar movieID={movid} /> */}
            </div>
            <div className="wrapdesc">
              <h1 className="movie-details__heading">{title}</h1>
              <h2 className="tagline">{tagline}</h2> 
              {ispurchased}
              <p className="movie-details__body">{overview}</p>
              <div className="movie-details__meta">
                <p className="movie-details__date">Release date : <span>{release_date}</span></p>
                <p className="movie-details__rating">Average vote : <span>{vote_average}</span></p>
                <p>Duration : <span>{runtime} min</span></p>
                <NumberFormat value={revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>Revenue : <span>{value}</span></p>} />
                <p>Casts :</p>
                <Cast movieID={movid} />
              </div>
            </div>
            <div className="wrapsimilar">
              <Trailers movieID={movid} />
            </div>
          </div>
        </main>
      );  
    }

    
  }
}


export default withRouter(connect(
  // (state, ownProps) => ({
  //   single: state.items.find((item) => {
  //     if (Number(item.id) === Number(ownProps.match.params.movieId)) {
  //       return item;
  //     }
  //   })
  // }),
  state => ({
    single: state.item,
    purchasedlist: state.balance,
    hasErrored: state.itemHasErrored,
    isLoading: state.itemIsLoading
  }),
  dispatch => ({
    fetchData: (url) => dispatch(itemFetchData(url)),
    getInitBalance: (balance, purchased) => dispatch(initBalance(balance, purchased)),
    UpdateBalance: (remain, purchasedlist) => dispatch(balancePurchase(remain, purchasedlist))
  })
)(MovieDetail));
