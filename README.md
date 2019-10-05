## JDEV_TODO_APP
This project was created uses the following packages:
  * create-react-app
  * momentjs
  * react-moment

## Description
This is a simple todo list app but has a number of extra features. Using this simple react app, you can: <br />
  * Create Todo List Items,
  * Mark them as complete
  * Mark them as habits
  * Redo items by clicking once more on the mark as done/complete icon
  * Delete Them.
 
Once an item has been marked as a habit, its due date resets to the end of the day, implying that you have to complete the action by the end of the day. 

The app offers a map that indicates the different actions one can make such as delete, mark habit and mark done/complete. 
It also defines the colors of the different items for clarification. Primarily, red is for todo items that are past their due date, green is for items that have been completed, teal for habits, and blue for normal todos.

The App uses validation, in that it does not allow you to add empty todo list items. It also renders content conditionally and offers messages in return. Users have to confirm whether or not items should be deleted which is an extra measure to prevent one from deleting their todo list items.

Currently, the app stores its data on local storage but will later be updated to store its data on a database allowing users to login and update their todo lists as they please. This will also add extra features such as authentication to differentiate users. In localstorage, the app uses the key, **jdev_todos**, to prevent it from overwriting other todo lists that users might be using.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode on port 3000.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />

## Hope you enjoy, feel free to clone the app and make your own changes

