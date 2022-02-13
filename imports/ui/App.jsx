import React, { useState } from 'react';
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

  const [hideCompleted , setHideCompleted ] = useState(false);
  const completedFilter =  { isChecked : {$ne : true} };
  const showAll = {}; 
  const tasks = useTracker(()=>TasksCollection.find(
    hideCompleted ? completedFilter  : showAll , 
    { sort: { createdAt: -1 } } )
    .fetch());
  const pendingTaskCount = useTracker(()=> TasksCollection.find(completedFilter).count());

  const pendingTasksTitle = `${pendingTaskCount === 0 ? '' : `${pendingTaskCount}` }`;


  return (
    <div className='app'>
      <header>
        <div className='app-bar'>
          <div className='app-header'>
            <h1>  📝️ Easy Schedules {pendingTasksTitle} </h1>
          </div>
        </div>

      </header>
    <div className='main'>
      <TaskForm/>
      <div className='filter'>
        <button onClick={(e)=>{ e.preventDefault(); setHideCompleted(!hideCompleted);}}>
        {hideCompleted ? 'Show All' : 'Hide Completed'}
        </button>
      </div>

      <ul className='tasks'>
        {
          tasks.map((task) =>{
            return ( 
              <Task 
                key={task._id} 
                task={task} 
                onCheckBoxClick={toggleCheck} 
                deleteTask={deleteTask}/>)
          })
        }
      </ul>
    </div>
    </div>
  );

}
