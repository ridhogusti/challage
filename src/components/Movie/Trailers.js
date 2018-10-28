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
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieID}/videos?&api_key=f1f087bcabf3e275dce6c4be94cb971b`;

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
          <ul className="row">
            {
              this.props.trailers.map((trailer) => {
                return (
                  <div key={trailer.id} className="col-md-6">
                    <YouTube
                      videoId={trailer.key}
                      opts={opts}
                      onReady={this._onReady}
                    />
                    <div className="trailerdesc">
                      <span>{trailer.name}</span>
                    </div>
                  </div>
                );
              })
            }
          </ul>
        </div>
      );  
    }

    
  }
  _onReady(event) {
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
