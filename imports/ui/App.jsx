import React from 'react';
import { TasksCollection } from '../api/TasksCollection.js';
import { useTracker } from 'meteor/react-meteor-data'
import { Task } from './Task.jsx';

export const App = () => {

  const tasks = useTracker(()=>TasksCollection.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      {tasks.map(task => <Task key={task._id} text={task.text}/>)}
    </div>
  );

}
