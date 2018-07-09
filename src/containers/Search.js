import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchFilter from "../components/Search/SearchFilter";
import SearchResults from "../components/Search/SearchResults";
import TvNoSignal from "../media/tv_no_signal.mp4";
import * as actions from "../actions/MovieActions";

class Search extends Component {
  renderBG = () => {
    const { searchedMovies } = this.props;
    if (searchedMovies.length === 0) {
      return (
        <video loop muted autoPlay className="fullscreen-bg__video">
          <source src={TvNoSignal} type="video/mp4" />
        </video>
      );
    } else {
      const BGUrl = searchedMovies[0].backdrop_path;
      return (
        <section
          className="SearchJumbotron"
          style={{
            background: `url('https://image.tmdb.org/t/p/w1400_and_h450_face${BGUrl}') no-repeat center center fixed`
          }}
        />
      );
    }
  };
  componentWillUnmount() {
    this.props.empty_search_movies();
  }
  render() {
    console.log("Hello this.props", this.props); // log is here
    const { match } = this.props;
    return (
      <div className="position-relative">
        <div className="fullscreen-bg">
          {this.renderBG()}
          <div className="video_mask" />
        </div>
        <div className="container">
          <SearchFilter
            search_movies={this.props.search_movies}
            keyWord={match.params.keyWord}
          />
          <SearchResults searchedMovies={this.props.searchedMovies} />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchedMovies: PropTypes.array,
  search_movies: PropTypes.func
};

const mapStateToProps = state => {
  return {
    searchedMovies: state.movies.searchedMovies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search_movies: keyWord => {
      dispatch(actions.search_movies(keyWord));
    },
    empty_search_movies: () => {
      dispatch(actions.empty_search_movies());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

{
  /* <div className="container">
        <SearchFilter />
        <SearchResults />
      </div> */
}
