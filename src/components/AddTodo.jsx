import React, { Component } from "react";
// import PropTypes from 'prop-types'

class AddTodo extends Component {
  onChange = e => {
    this.props.onChange(e.target.name, e.target.value);
  };
  onSubmit = e => {
    // prevent the form from submitting
    e.preventDefault();
    // submit the form via props
    this.props.onSubmit(true);
  };
  render() {
    const { todo } = this.props;
    return (
      <div>
        {/* Create form
        get value from the state and update it accordingly after the form is submitted */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="todo">
              Todo <sup className="text-danger">*</sup>
            </label>
            <input
              type="text"
              name="todo"
              id="todo"
              className={`form-control ${
                this.props.todoEmpty ? "is-invalid" : ""
              }`}
              placeholder="Todo"
              value={todo.todo}
              onChange={this.onChange}
            />
            {this.props.todoEmpty ? (
              <div className="invalid-feedback">Todo Item cannot be empty</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              id="dueDate"
              value={todo.dueDate}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Todo
          </button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
