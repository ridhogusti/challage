import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, initBalance } from '../../actions/movie';
import loader from '../../img/puff.svg';
import {Link, withRouter} from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import TextTruncate from 'react-text-truncate';


class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1  };
  }

  componentDidMount() {
    let url = new URL(window.location.href)
    let page = url.searchParams.get("page")
    if (page == null) {
      page = 1
    }
    this.renderPage(page)
    this.setState({
      page: page
    })
  }

  async before() {
    await this.setState({
      page: this.state.page - 1
    })
    this.props.history.push(`/?page=${this.state.page}`)
    this.renderPage(this.state.page)
  }
  async next() {
    await this.setState({
      page: parseInt(this.state.page) + 1
    })
    await this.props.history.push(`/?page=${this.state.page}`)
    await this.renderPage(this.state.page)
  }

  renderPage(pageNumber) {
    const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=f1f087bcabf3e275dce6c4be94cb971b&region=US&page='+pageNumber
    
    this.props.fetchData(apiUrl)
    this.formatDate = this.formatDate.bind(this)
    
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
      balance   = JSONbalance.balance;
      
    }
  
    this.props.getInitBalance(balance, purchased);

    this.setState({page: this.state.page})
  }

  formatDate(date) {
    return date.substring(0, 4)
  }
  render() {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const imageSize = 'w500';


    if (this.props.isLoading) {
      return <div className="loader-overlay"><img className="loader" src={loader} alt="" /></div>
    }else {
      let purchased = []
      if (this.props.purchasedlist.length !== 0) {
        purchased = JSON.parse(this.props.purchasedlist)
        purchased = purchased.purchasedlist
      }
      let items = []
      let total_pages = 0
      if (this.props.items.length !== 0) {
        items = JSON.parse(this.props.items)
        total_pages = items.total_pages
        items = items.items
      }


      let pagePrev = '';
      console.log(this.state.page, 'aoeuttu');

      if (this.state.page > 1) {
        console.log('masuk', this.state.page);
        pagePrev = (
          <li className="page-item">
            <a className="page-link" onClick={() => this.before()}>Previous</a>
          </li>
        )
      }else {
        pagePrev = (
          <li className="page-item disabled">
            <a className="page-link" onClick={() => this.before()}>Previous</a>
          </li>
        )
      }

      let pageNext = '';

      if (total_pages > this.state.page) {
        pageNext = (
          <li className="page-item">
            <a className="page-link" onClick={() => this.next()}>Next</a>
          </li>
        )
      }else {
        pageNext = (
          <li className="page-item disabled">
            <a className="page-link" onClick={() => this.next()}>Next</a>
          </li>
        )
      }

      return (
        <div className="container">

          <div className="row">
          { 
            items.map((item, index) => {
              let ispurchased;
              if(purchased.indexOf(item.id) < 0){
                ispurchased = '';
              }else{
                ispurchased = '<div>Purchased</div>';
              }
              return (
                <div key={index} className="col-md-4 teaser">
                <div className="ispurchased" dangerouslySetInnerHTML={{__html: ispurchased}}></div>
                  <Link to={`/${item.id}-${item.original_title.replace(/ /g, '-')}`}>
                    <div className="card customCard">
                      <img className="card-img-top" src={`${baseUrl}${imageSize}${item.poster_path}`} alt={item.original_title} />
                    </div>
                    <div className="teaserOverlay">
                      <div className="teaser__overlay-inner">
                        <h2 className="teaser__heading">{item.original_title}</h2>
                          <TextTruncate
                              className="teaser__body"
                              line={5}
                              truncateText=" …"
                              text={item.overview}
                          />
                        <div className="teaser__meta">
                          <span className="teaser__label">{item.vote_average}/10</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })
           }
          </div>
          <br/>
          <br/>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              { pagePrev }
              { pageNext }
            </ul>
          </nav>
        </div>
          
        
        
      );
    }

  }
}

export default withRouter(connect(
  state => ({
    items: state.items,
    isLoading: state.itemsIsLoading,
    hasErrored: state.itemsHasErrored,
    purchasedlist: state.balance
  }),
  dispatch => ({
    fetchData: (url) => dispatch(itemsFetchData(url)),
    getInitBalance: (balance, purcahsed) => dispatch(initBalance(balance, purcahsed))
  })
)(MovieList));