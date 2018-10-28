import React, { Component } from 'react';
import { connect } from 'react-redux';
import { recomendedsFetchData } from '../../actions/movie';
import loader from '../../img/puff.svg';
import {Link} from 'react-router-dom';

class Recomended extends Component {

  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    const movieID = this.props.movieID;
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieID}/recommendations?&api_key=f1f087bcabf3e275dce6c4be94cb971b`;

    this.props.fetchData(apiUrl);
  }

  render() {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const imageSize = 'w500';
    
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the recomendeds.</p>;
    }

    if (this.props.isLoading) {
      return <img className="loader" src={loader} alt="" />;
    }else{
      return (
        <div>
          <h1 className="subtitle">Rekomendasi Film: </h1>
          <ul className="row">
            {
              this.props.recomendeds.map((recomended) => {
                return (
                  <div key={recomended.id} className="col-md-3">
                    <Link className="teaser" to={`/${recomended.id}-${recomended.original_title.replace(/ /g, '-')}`}>
                      <img className="profile__image" src={`${baseUrl}${imageSize}${recomended.poster_path}`} alt={recomended.name} />
                      <div className="similardesc">
                        <span>{recomended.original_title}</span>
                      </div>
                    </Link>
                  </div>
                );
              })
            }
          </ul>
        </div>
      );  
    }

    
  }
}

export default connect(
  state => ({
      recomendeds: state.recomendeds,
      hasErrored: state.recomendedsHasErrored,
      isLoading: state.recomendedsIsLoading
    }),
    dispatch => ({
      fetchData: (url) => dispatch(recomendedsFetchData(url))
    })
)(Recomended);
