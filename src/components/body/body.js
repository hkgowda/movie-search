import React from "react";
import {
  Card,
  FormControl,
  Button,
  InputGroup,
  DropdownButton,
  Dropdown,
  Row
} from "react-bootstrap";
import Http from "../../http";
import { MovieList } from "../movie-list";

export class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.http = Http();
    this.onSearchTextChangeRef = React.createRef();
    this.onSearchRef = React.createRef();
    this.state = {
      searchText: "",
      movieTypes: ["All", "Movie", "Series", "Episode"],
      selectedType: "All",
      movieList: null
    };
  }

  onMoveTypeChange = (type) => {
    this.setState({
      selectedType: type
    });
  };

  search = (e) => {
    const selectedType = this.state.selectedType === "All" ? "" : `&type=${this.state.selectedType.toLowerCase()}`
    let url = `&s=${this.state.searchText}${selectedType}`;
    this.http.get(url).then((res) => {
      this.setState({
        movieList: res.data.Search
      });
    });
  };

  onSearchTextChange = (e) => {
    this.setState({
      searchText: e.target.value
    });
  };

  componentDidMount() {
    this.onSearchRef.current.addEventListener("click", (e) => this.search(e));
    this.onSearchTextChangeRef.current.addEventListener("input", (e) =>
      this.onSearchTextChange(e)
    );
  }

  render() {
    return (
      <React.Fragment>
        <Card className="mt-3">
          <Card.Body>
            <div>
              <InputGroup>
                <FormControl
                  ref={this.onSearchTextChangeRef}
                  placeholder="Search Movies"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />

                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title={this.state.selectedType}
                >
                  {this.state.movieTypes.map((type, index) => {
                    return (
                      <Dropdown.Item
                        eventKey={type}
                        onSelect={() => this.onMoveTypeChange(type)}
                      >
                        {type}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
                <Button
                  variant="secondary"
                  className="ml-2"
                  ref={this.onSearchRef}
                >
                  Search
                </Button>
              </InputGroup>
            </div>
          </Card.Body>
        </Card>
        {this.state.movieList === null ? (
          <span></span>
        ) : (
          <Card className="mt-3">
            <MovieList
              movieList={this.state.movieList}
              searchText={this.state.searchText}
              type={this.state.selectedType}
            ></MovieList>
          </Card>
        )}
      </React.Fragment>
    );
  }
}
