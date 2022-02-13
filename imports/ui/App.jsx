import React from 'react';
import { TasksCollection } from '../api/TasksCollection.js';
import { useTracker } from 'meteor/react-meteor-data'
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';


const toggleCheck = (task)=>{
  TasksCollection.update(task._id , {
    $set :{
      isChecked : !task.isChecked
    }
  });
}

const deleteTask = (task)=>{
  TasksCollection.remove(task._id);
}

export const App = () => {

  const tasks = useTracker(()=>TasksCollection.find({} , { sort: { createdAt: -1 } } ).fetch());

  return (
    <div>
      <TaskForm/>
      <h1>Welcome to Meteor!</h1>
      {tasks.map(task => <Task key={task._id} task={task} onCheckBoxClick={toggleCheck} deleteTask={deleteTask}/>)}
    </div>
  );

}
