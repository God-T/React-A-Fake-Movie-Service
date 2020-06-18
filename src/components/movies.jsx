import React, { Component } from "react";
import Movie from "./movie";

import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../uilts/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 3,
    currPage: 1,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currPage: page });
  };

  handleNext = (page) => {
    this.setState({ currPage: page + 1 });
  };
  handlePrev = (page) => {
    this.setState({ currPage: page - 1 });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movie.like;
    this.setState({ movies });
  };

  render() {
    const { pageSize, currPage, movies } = this.state;
    const { length: moviesCount } = movies;
    const moviesToDisplay = paginate(movies, currPage, pageSize);
    if (moviesCount === 0) return <p>There are no movies in the db.</p>;
    return (
      <React.Fragment>
        <p>Showing {moviesCount} movies in the db.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {moviesToDisplay.map((movie) => (
              <Movie
                key={movie._id}
                movie={movie}
                onDelete={() => this.handleDelete(movie)}
                onLikeChange={() => this.handleLike(movie)}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          moviesCount={moviesCount}
          pageSize={pageSize}
          currPage={currPage}
          onPageChange={this.handlePageChange}
          onNextPage={this.handleNext}
          onPrevPage={this.handlePrev}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
