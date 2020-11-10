import React from "react";
import { Container, Alert, CardColumns, Card, Button } from "react-bootstrap";

export class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.clearFavouritesRef = React.createRef();
    this.state = {
      favouritesList: []
    };
  }

  componentDidMount() {
    this.clearFavouritesRef.current.addEventListener("click", () =>
      this.clearFavourites()
    );
    this.setState({
      favouritesList: JSON.parse(localStorage.getItem("favouriteMovies")) ?? []
    });
  }

  clearFavourites = () => {
    localStorage.clear();
    this.setState({
      favouritesList: []
    });
  };

  render() {
    return (
      <Container fluid>
        <Card className="mt-3">
          <Card.Header>
            My favourites list
            <Button
              ref={this.clearFavouritesRef}
              variant="danger"
              className="float-right"
            >
              Clear Favourites
            </Button>
          </Card.Header>
          <Card.Body>
            {!this.state.favouritesList.length ? (
              <Alert variant="info">No favourites list found</Alert>
            ) : (
              <CardColumns>
                {this.state.favouritesList.map((movie) => {
                  return (
                    <Card>
                      <Card.Img
                        variant="top"
                        src={movie.Poster}
                        thumbnail
                      ></Card.Img>
                    </Card>
                  );
                })}
              </CardColumns>
            )}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
