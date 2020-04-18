import React from "react";
//import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import { API_URL , API_KEY_3} from "../utils/api";
import MovieTab from "./MovieTabs";

// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "revenue.desc",
      pageNumber: 1,
      total_page: 33
    };
    this.updatePagination = this.updatePagination.bind(this);
  }
  
  componentDidMount() {
    console.log("mount")
     this.fetchMovie();
}
  componentDidUpdate(prevProps, prevState) {
    console.log("prevstate from Update", prevState);
    if ((prevState.sort_by !== this.state.sort_by) || (prevState.pageNumber !== this.state.pageNumber))
      this.fetchMovie()  
  
  }
  
  fetchMovie = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.pageNumber}`)
    .then((response)=> {
      return response.json()
    })
    .then((data) => {

      this.setState({
        movies: data.results,
        total_page: data.total_pages
      })
    })
  }

  deleteMovie = movie => {
    console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    console.log(updateMovies);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = sort =>  {
    this.setState({
      sort_by: sort
    })
  }

  updatePagination(Update) {
    const UpNum = this.state.pageNumber + Update 
    this.setState({
      pageNumber: UpNum
    }
    )
//    this.fetchMovie();
  }  

  render() {
    console.log("App render", this);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row">
              <div className="col-12">
                <MovieTab sort_by={this.state.sort_by} updateSortBy={this.updateSortBy}/>
              </div>
            </div>
            {// ==============================================
            }
            
            <div className="col-4">
            <nav aria-label="Page navigation movie">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${
                  this.state.pageNumber === 1 ? "disabled" : ""
                }`}
              >
                <button 
                  className="page-link"
                  //href="https://mail.ru"
                  onClick={this.updatePagination.bind(this,-1)}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </button>
              </li>

              <li
                className={`page-item ${
                  this.state.pageNumber === this.state.total_page
                    ? "disabled"
                    : ""
                }`}
              >
                <button className="page-link" onClick={this.updatePagination.bind(this,1)} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </button>
              </li>
            </ul>
            
          </nav>
          Current page {this.state.pageNumber} Total page {this.state.total_page}
          </div>


            {// ==============================================
            }



            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
