import React from "react";
import axios from "axios";

export default class TodosList extends React.Component {
  state = {
    todo: "",
    sayings: []
  };

  handleChange = event => {
    this.setState({
      todo: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(`http://haekal-todo-list-api.herokuapp.com/todos`, {
        todo: this.state.todo
      })
      .then(res => {
        console.log(res);
        this.setState({
          sayings: res.data
        });
        console.log(res.sayings);
      });
  };

  deleteChange = event => {
    this.setState({ id: event.target.value });
  };

  deleteSubmit = index => {
    axios
      .delete(`http://haekal-todo-list-api.herokuapp.com/todos/${index}`)
      .then(res => {
        this.setState({
          data: res.data
        });
        if (res.status === 200) {
          alert("data sudah dihapus");
        }
      });
  };

  componentDidMount() {
    axios.get(`http://haekal-todo-list-api.herokuapp.com/todos`).then(res => {
      const data = res.data;
      this.setState({ data });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Your task today:
            <input
              type="text"
              name="todo"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Add</button>
        </form>
        <div>
          {this.state.sayings.map((activity, index) => (
            <li key={index}>
              <div>{activity.todo}</div>
              <div onClick={() => this.deleteSubmit(index)}>delete</div>
            </li>
          ))}
        </div>
      </div>
    );
  }
}
