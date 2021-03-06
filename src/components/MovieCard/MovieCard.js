import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "antd";
import { Link } from "react-router-dom";

class MovieCard extends Component {
  addToFavorite = movie_id => {
    this.props.add_movie_to_favorite(movie_id);
  };
  deleteFromFavorite = movie_id => {
    this.props.delete_favorite_movie(movie_id);
  };
  render() {
    const { data, favoriteList } = this.props;
    const isFavorite = favoriteList.map(m => m.movie_id).indexOf(String(data.id)) !== -1;
    return (
      <div className="col-6 col-sm-4 col-md-3 mb-4">
        <div className="border shadow-sm bg-white">
          <div className="OverFlowHidden">
            <Button
              className={`MovieCardFavBtn bg-danger ${isFavorite && "MovieCardFavBtnShow"}`}
              type="primary"
              shape="circle"
              onClick={
                isFavorite ? () => this.deleteFromFavorite(data.id) : () => this.addToFavorite(data.id)
              }
            >
              {/* icon={`${isFavorite ? "heart" : "heart-o"}`} */}
              <Icon type="heart" theme={isFavorite && "filled"} />
            </Button>
            <Link to={`/movie/${data.id}`}>
              {data.poster_path ? (
                <img
                  className="img-fluid imgScale"
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
                  alt={data.title}
                />
              ) : (
                <img
                  className="img-fluid imgScale"
                  src="https://fakeimg.pl/260x380/eee/333333,255/?text=No+Image&font=roboto"
                  alt=""
                />
              )}
            </Link>
          </div>
          <div className="p-2 d-flex justify-content-between align-items-center">
            <div className="col-10 p-0">
              <h6 className="m-0 text-left MovieTitleHeader">{data.title}</h6>
              <h6 className="m-0 text-left text-black-50">
                <small>{data.release_date}</small>
              </h6>
            </div>
            <div className="col-2 p-0">
              <span className="badge badge-pill badge-success font-weight-light">{data.vote_average}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default MovieCard;
