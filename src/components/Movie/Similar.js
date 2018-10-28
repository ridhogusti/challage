import React from 'react';
import { connect } from 'react-redux';
import { similarsFetchData } from '../../actions/movie';
import loader from '../../img/puff.svg';
import {Link} from 'react-router-dom';

class Similar extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    const movieID = this.props.movieID;
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieID}/similar?&api_key=f1f087bcabf3e275dce6c4be94cb971b`;

    this.props.fetchData(apiUrl);
  }

  render() {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const imageSize = 'w500';
    
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the similars.</p>;
    }

    if (this.props.isLoading) {
      return <img className="loader" src={loader} alt="" />;
    }else{
      return (
        <div>
          <h1 className="subtitle">Similar: </h1>
          <ul className="row">
            {
              this.props.similars.map((similar) => {
                return (
                  <li key={similar.id} className="col-md-3">
                    <Link className="teaser" to={`/${similar.id}-${similar.original_title.replace(/ /g, '-')}`}>
                      <img className="profile__image" src={`${baseUrl}${imageSize}${similar.poster_path}`} alt={similar.name} />
                      <div className="similardesc">
                        <span>{similar.original_title}</span>
                      </div>
                    </Link>
                  </li>
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
      similars: state.similars,
      hasErrored: state.similarsHasErrored,
      isLoading: state.similarsIsLoading
    }),
    dispatch => ({
      fetchData: (url) => dispatch(similarsFetchData(url))
    })
)(Similar);
