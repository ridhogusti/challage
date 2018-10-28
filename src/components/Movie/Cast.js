import React from 'react';
import { connect } from 'react-redux';
import { castFetchData } from '../../actions/movie';
import loader from '../../img/puff.svg';

class Cast extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    const movieID = this.props.movieID;
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieID}/credits?&api_key=a97c45944def929e56015425b27a9983`;

    this.props.fetchData(apiUrl);
  }

  render() {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const imageSize = 'w185';
    
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the casts.</p>;
    }

    if (this.props.isLoading) {
      return <img className="loader" src={loader} alt="" />;
    }else{
      return (
        <ul className="grid">
          {
            this.props.casts.map((cast) => {
              // console.log(typeof cast.profile_path);
              let profile_img = `${baseUrl}${imageSize}${cast.profile_path}`;  
              if(cast.profile_path === 'null' || cast.profile_path === '' || typeof cast.profile_path !== 'string'){
                profile_img = 'https://i.stack.imgur.com/l60Hf.png';  
              }
              return (
                <li key={cast.id} className="grid__col grid__col--4 align-center">
                  <img className="profile__image" src={profile_img} alt={cast.name} />
                  <div className="castdesc">
                    <span>{cast.name} as {cast.character}</span>
                  </div>
                </li>
              );
            })
          }
        </ul>
      );  
    }

    
  }
}

export default connect(
  state => ({
      casts: state.casts,
      hasErrored: state.castsHasErrored,
      isLoading: state.castsIsLoading
    }),
    dispatch => ({
      fetchData: (url) => dispatch(castFetchData(url))
    })
)(Cast);
