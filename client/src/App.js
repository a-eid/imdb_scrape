import React, { Component } from "react"
import axios from "axios"
import StarsRating from "react-stars-rating"
import "./App.css"
let baseUrl = "http://localhost:8000/api/movies"

class App extends Component {
  state = {
    init: false,
    loading: false,
    error: null,
    movie: null,
    value: "",
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSearch = e => {
    this.setState({
      init: true,
      loading: true,
      error: null,
    })

    this.apiRequest()
  }

  apiRequest() {
    const value = this.state.value

    this.setState({
      init: true,
      loading: true,
      error: null,
    })

    axios
      .post(`${baseUrl}`, {
        term: this.state.value,
      })
      .then(res => {
        this.setState({
          init: false,
          loading: false,
          error: null,
          movie: res.data,
        })
      })
  }

  loading = () => {
    return <div> Loading.. </div>
  }

  onEnter = e => {
    if (e.key === "Enter") {
      this.apiRequest()
    }
  }

  poster = () => {
    return this.state.movie.poster ? 
      this.state.movie.poster : 
      this.state.movie.media_images[0]
  }

  render() {
    return (
      <div className="App">
        <header>
          <div>
            <input
              type="text"
              name="value"
              value={this.state.value}
              onChange={this.onChange}
              onKeyPress={this.onEnter}
            />
            <button onClick={this.onSearch}>search</button>
          </div>
        </header>

        <section>
          {this.state.loading ? (
            this.loading()
          ) : this.state.movie ? (
            <div className="movie__card">
              <h1>{this.state.movie.title}</h1>
              <div className="movie__card__rating">
                <StarsRating rating={this.state.movie.rating / 2} />
              </div>
              <img src={this.poster()} alt="" />
            </div>
          ) : this.state.init ? (
            "No Movie with the name specified"
          ) : (
            "type something to search"
          )}
        </section>
      </div>
    )
  }
}

export default App
