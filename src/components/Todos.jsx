import React, { Component } from "react";
import AddTodo from "./AddTodo";
import TodoItems from "./TodoItems";
import moment from "moment";

class Todos extends Component {
  state = {
    todoEmpty: false,
    todo: {
      todo: "",
      dueDate: ""
    },
    todos: []
  };

  componentDidMount() {
    // get items from local storage
    // Named this as jdev_todos just in case you have another todo list installed using todos key in localStorage, while running the app via localhost
    if (window.localStorage.getItem("jdev_todos") !== null) {
      this.setState({
        todos: JSON.parse(window.localStorage.getItem("jdev_todos"))
      });
    } else {
      window.localStorage.setItem("jdev_todos", JSON.stringify([]));
    }
  }

  componentDidUpdate() {
    // update state to component
    window.localStorage.setItem("jdev_todos", JSON.stringify(this.state.todos));
  }

  handleChange = (title, value) => {
    const { todo } = this.state;
    todo[title] = value;

    this.setState({ todo });
  };

  handleSubmit = submitted => {
    if (submitted) {
      if (this.state.todo.todo.replace(/\s/g, "") === "") {
        this.setState({ todoEmpty: true });
      } else {
        const todo = {
          id: `${1 + Math.random()}`,
          todo: this.state.todo.todo,
          done: false,
          isHabit: false,
          createdDate: Date.now(),
          dueDate:
            this.state.todo.dueDate !== undefined ? this.state.todo.dueDate : ""
        };
        let todos = [...this.state.todos];
        todos.unshift(todo);
        this.setState({
          todo: { todo: "", dueDate: "" },
          todos
        });
      }
    }
  };

  handleDelete = id => {
    // Confirm if user really wants to delete the item
    if (window.confirm("Are you sure? This cannot be undone")) {
      const todos = [...this.state.todos];
      // filter through array to remove the todo item
      this.setState({ todos: todos.filter(todo => todo.id !== id) });
    }
  };

  handleMarkDone = id => {
    const todos = [...this.state.todos];
    // map through to get the id and change the done state to true
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    this.setState({ todos: newTodos });
  };

  handleMarkHabit = id => {
    const todos = [...this.state.todos];
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isHabit = !todo.isHabit;
      }
      if (todo.isHabit) {
        const tomorrow = moment()
          .add(1, "day")
          .endOf("day");
        todo.dueDate = tomorrow;
      }
      return todo;
    });

    this.setState({ todos: newTodos });
  };

  clearAllTodos = e => {
    // prevent a page reload
    e.preventDefault();
    // confirm if the user is sure, then set the todos to an empty array
    if (window.confirm("Are you sure? This cannot be undone")) {
      this.setState({ todos: [] });
    }
  };

  handleClearTodos = (e, isHabits) => {
    // Prevent reload
    e.preventDefault();
    // Confirm that the user is sure
    if (window.confirm("Are you sure? This cannot be undone")) {
      // First copy todos from state
      const todos = [...this.state.todos];
      // Check if Habits are being cleared
      if (isHabits) {
        // Only non-habits should remain
        this.setState({ todos: todos.filter(todo => !todo.isHabit) });
      } else {
        // only habits should remain
        this.setState({ todos: todos.filter(todo => todo.isHabit) });
      }
    }
  };

  render() {
    const { todos } = this.state;
    return (
      <div>
        <h1 className="row mb-3">Add Todo</h1>
        {/* Render the add todo form */}
        <AddTodo
          className="row"
          todo={this.state.todo}
          todoEmpty={this.state.todoEmpty}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
        <h1 className="row mb-3 mt-5">Todos</h1>
        {/* Render todos if they are present, otherwise render the message */}
        <div className="card card-body">
          {todos.length !== 0 ? (
            <>
              <div className="card card-body my-4">
                <h3 className="text-muted mb-3">Map</h3>
                <div className=" row col-sm-12">
                  <div className="col-sm-2 rounded-lg bg-success mx-2 text-center text-white py-2 mb-2">
                    done
                  </div>
                  <div className="col-sm-2 rounded-lg bg-danger mx-2 text-center text-white py-2 mb-2">
                    late
                  </div>
                  <div className="col-sm-2 rounded-lg bg-primary mx-2 text-center text-white py-2 mb-2">
                    new
                  </div>
                  <div className="col-sm-2 rounded-lg bg-info mx-2 text-center text-white py-2 mb-2">
                    new Habit
                  </div>
                  <div className="row col-sm-12 mt-4">
                    <div className="col-sm-4">
                      <p className="d-flex">
                        <small className="icon-ok" />{" "}
                        <span className="ml-2">Mark Done</span>
                      </p>
                    </div>
                    <div className="col-sm-4">
                      <p className="d-flex">
                        <small className="icon-trash" />{" "}
                        <span className="ml-2">Delete</span>
                      </p>
                    </div>
                    <div className="col-sm-4">
                      <p className="d-flex">
                        <small className="icon-heart" />{" "}
                        <span className="ml-2">Mark Habit</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-body">
                <button
                  onClick={this.clearAllTodos}
                  className="btn btn-danger my-3 mx-auto"
                >
                  Delete All Todos & Habits
                </button>
                <hr />
                <h3 className="my-4">Habits</h3>
                {/* Check if there are habits using Arr.reduce() */}
                {todos.filter(todo => todo.isHabit).length !== 0 ? (
                  // If there are habits, render them, otherwise, render the message
                  <>
                    <button
                      onClick={e => this.handleClearTodos(e, true)}
                      className="btn btn-danger mr-auto mb-4"
                    >
                      Delete All Habits
                    </button>
                    <TodoItems
                      className="row"
                      onMarkDone={this.handleMarkDone}
                      onMarkHabit={this.handleMarkHabit}
                      onDelete={this.handleDelete}
                      todos={todos.filter(todo => todo.isHabit)}
                    />
                  </>
                ) : (
                  <p className="info-Text text-muted">
                    Habits are a great way of improving yourself to be the best
                    you can. Add some by liking them below
                  </p>
                )}
                <hr />
                <h3 className="my-4">Non-Habits</h3>
                <button
                  onClick={e => this.handleClearTodos(e, false)}
                  className="btn btn-danger mr-auto mb-4"
                >
                  Delete All Non-Habits
                </button>
                <TodoItems
                  className="row"
                  onMarkDone={this.handleMarkDone}
                  onMarkHabit={this.handleMarkHabit}
                  onDelete={this.handleDelete}
                  todos={todos.filter(todo => !todo.isHabit)}
                />
              </div>
            </>
          ) : (
            <p className="info-text text-muted">
              Sorry, you don't have any stuff to do, but it's always nice to add
              some to keep you busy and keep you accountable... Let's add some
              shall we?
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Todos;
