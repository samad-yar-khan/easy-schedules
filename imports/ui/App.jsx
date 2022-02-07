import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Task } from './Task.jsx';

const tasks = [
  {_id: 1 , text: 'Learn Metero'},
  {_id: 2 , text: 'Raise Issue'},
  {_id: 3 , text: 'Raise PR'},
];

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    {tasks.map(task => <Task key={task._id} text={task.text}/>)}
  </div>
);
