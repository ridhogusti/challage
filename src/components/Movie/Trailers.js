import React from 'react';
import { connect } from 'react-redux';
import { trailersFetchData } from '../../actions/movie';
import loader from '../../img/puff.svg';
import YouTube from 'react-youtube';

class Trailers extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    const movieID = this.props.movieID;
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieID}/videos?&api_key=a97c45944def929e56015425b27a9983`;

    this.props.fetchData(apiUrl);
  }

  render() {
    const opts = {
      height: '360',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the trailers.</p>;
    }

    if (this.props.isLoading) {
      return <img className="loader" src={loader} alt="" />;
    }else{
      return (
        <div>
          <h1 className="subtitle">Trailers: </h1>
          <ul className="grid">
            {
              this.props.trailers.map((trailer) => {
                return (
                  <li key={trailer.id} className="grid__col grid__col--6 align-center">
                    <YouTube
                      videoId={trailer.key}
                      opts={opts}
                      onReady={this._onReady}
                    />
                    <div className="trailerdesc">
                      <span>{trailer.name}</span>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      );  
    }

    
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default connect(
  state => ({
      trailers: state.trailers,
      hasErrored: state.trailersHasErrored,
      isLoading: state.trailersIsLoading
    }),
    dispatch => ({
      fetchData: (url) => dispatch(trailersFetchData(url))
    })
)(Trailers);
