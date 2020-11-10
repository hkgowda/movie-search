import React from "react";
import { Card, Button, Alert, CardColumns } from "react-bootstrap";
import "./movie-list.css";

export class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.favouriteBtn = React.createRef();
    this.state = {
      movieList: this.props.movieList,
      favouriteMovies: []
    };
  }

  componentDidMount() {
    let favouriteMovies =
      JSON.parse(localStorage.getItem("favouriteMovies")) ?? [];
    this.setFavouriteMovies(favouriteMovies);
  }

  favouriteMovie = (movie) => {
    let favouriteMovies =
      JSON.parse(localStorage.getItem("favouriteMovies")) ?? [];
    favouriteMovies.push(movie);
    this.setFavouriteMovies(favouriteMovies);
  };

  unFavouriteMovie = (movie) => {
    let favouriteMovies = [...this.state.favouriteMovies];
    const index = favouriteMovies.findIndex(m => m.imdbID === movie.imdbID)
    if (index > -1) {
      favouriteMovies.splice(index, 1);
    }
    this.setFavouriteMovies(favouriteMovies);
  };

  setFavouriteMovies = (favouriteMovies) => {
    this.setState({ favouriteMovies }, () => {
      localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
    });
  };

  render() {
    return (
      <Card.Body>
        {!this.props.movieList ? (
          <Alert variant="info" className="mb-0">
            No <b>{this.props.type === "All" ? "Movie/Series/Episode" : this.props.type}</b> found for the search text <b>{this.props.searchText}</b>
          </Alert>
        ) : (
          <CardColumns>
            {this.props.movieList.map((movie) => {
              return (
                <Card>
                  <Card.Img
                    variant="top"
                    src={movie.Poster}
                    thumbnail
                  ></Card.Img>
                  {this.state.favouriteMovies.some(
                    (m) => m.imdbID === movie.imdbID
                  ) ? (
                    <Button
                      ref={this.unFavouriteBtn}
                      className="favourite-btn"
                      variant="warning"
                      onClick={() => this.unFavouriteMovie(movie)}
                    >
                      Unfavourite
                    </Button>
                  ) : (
                    <Button
                      ref={this.favouriteBtn}
                      className="favourite-btn"
                      variant="secondary"
                      onClick={() => this.favouriteMovie(movie)}
                    >
                      Favourite
                    </Button>
                  )}
                </Card>
              );
            })}
          </CardColumns>
        )}
      </Card.Body>
    );
  }
}
