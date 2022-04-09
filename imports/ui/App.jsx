import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor'
import { TasksCollection } from '../api/TasksCollection.js';
import { useTracker } from 'meteor/react-meteor-data'
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';
import { Fragment } from 'react/cjs/react.production.min';
import { LoginForm } from './LoginForm.jsx';


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

const logout = () => Meteor.logout();

export const App = () => {

  const user = useTracker(()=> Meteor.user());
  const [hideCompleted , setHideCompleted ] = useState(false);
  const completedFilter =  { isChecked : {$ne : true} };
  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...completedFilter, ...userFilter };
  const tasks = useTracker(()=>TasksCollection.find(
    hideCompleted ? pendingOnlyFilter  : userFilter , 
    { sort: { createdAt: -1 } } )
    .fetch());
  const pendingTaskCount = useTracker(()=> {
    if(!user){
      return 0;
    }
    return TasksCollection.find(pendingOnlyFilter).count()}
    );

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

      {user ?
        <Fragment>
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>
            <TaskForm user={user}/>
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
        </Fragment>

        :
        <LoginForm/>
      }
       </div>
      
    </div>
  );

}
