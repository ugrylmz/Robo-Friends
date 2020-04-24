import React, { Component } from "react";
import CardList from "../components/CardList";
// import { robots } from "./robots";
import SearchBox from "../components/SearchBox";
import "../containers/App.css";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
/*
We have App component which has two states
robots and searchfield
we can use constructor function to create this.state
changes in robots and searchfield describe the app in constructor, in state.

virtual dom is an object collects this entire state and react uses 
this state to render and pass them down as props to these components
so that components that are just pure functions can just render 
*/

export class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ""
    };
    // console.log("constructor");
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
    // this.setState({ robots: robots });
    // console.log("componentDidMount");
  }
  onSearchChange = event => {
    this.setState({ searchfield: event.target.value }); // update the state
  };
  render() {
    const { robots, searchfield } = this.state;
    // console.log("render ");
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase()); // we manage the state is here...
    });
    // console.log(filteredRobots);
    return !robots.length ? (
      <h1 className="tc">LoAdInG...</h1>
    ) : (
      <div className="tc">
        <h1 className="center f1">Robo Friends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}
export default App;
