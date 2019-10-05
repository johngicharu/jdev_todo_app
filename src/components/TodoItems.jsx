import React from "react";
import Moment from "react-moment";

class TodoItems extends React.Component {
  onDelete = (e, id) => {
    e.preventDefault();
    this.props.onDelete(id);
  };
  onMarkDone = (e, id) => {
    e.preventDefault();
    this.props.onMarkDone(id);
  };
  onMarkHabit = (e, id) => {
    e.preventDefault();
    this.props.onMarkHabit(id);
  };
  render() {
    const todos = [
      ...this.props.todos.filter(todo => todo.isHabit),
      ...this.props.todos.filter(todo => !todo.isHabit)
    ];
    return (
      <div>
        <ul className="todos col-sm-12">
          {todos.map(todo => {
            let cardClass = "bg-";
            if (!todo.done) {
              // If late
              if (todo.dueDate === "") {
                cardClass += todo.isHabit ? "info" : "primary";
              } else {
                if (Date.now() > Date.parse(todo.dueDate)) {
                  cardClass += "danger";
                } else {
                  cardClass += todo.isHabit ? "info" : "primary";
                }
              }
            } else {
              cardClass += "success";
            }

            let favClass = "icon-";
            todo.isHabit ? (favClass += "heart") : (favClass += "heart-empty");
            return (
              <li
                className={`card card-body text-white ${cardClass} mb-2`}
                key={todo.id}
              >
                <div className="row">
                  <div className="col-sm-8">{todo.todo}</div>
                  <div className="col-sm-4 ml-auto">
                    <a
                      href="http://"
                      className="btn"
                      title="Mark Done"
                      onClick={e => this.onMarkDone(e, todo.id)}
                    >
                      <i style={{ color: "white" }} className="icon-ok"></i>
                    </a>
                    <a
                      href="http://"
                      className="btn"
                      title="Make Habit"
                      onClick={e => this.onMarkHabit(e, todo.id)}
                    >
                      <i style={{ color: "white" }} className={favClass}></i>
                    </a>
                    <a
                      href="http://"
                      className="btn"
                      title="Delete"
                      onClick={e => this.onDelete(e, todo.id)}
                    >
                      <i style={{ color: "white" }} className="icon-trash"></i>
                    </a>
                  </div>
                </div>
                <div className="row mx-2">
                  {/* Check the dates and render the correct due date */}
                  {todo.dueDate !== "" ? (
                    Date.now() < Date.parse(todo.dueDate) ? (
                      <p className="col-sm-12">
                        Due{" "}
                        <Moment to={todo.dueDate}>{todo.createdDate}</Moment>
                      </p>
                    ) : (
                      <p className="col-sm-12">
                        Was Due{" "}
                        <Moment from={todo.dueDate}>{Date.now()}</Moment>
                      </p>
                    )
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TodoItems;
