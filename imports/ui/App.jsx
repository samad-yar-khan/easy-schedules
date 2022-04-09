import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor'
import { TasksCollection } from '../db/TasksCollection.js';
import { useTracker } from 'meteor/react-meteor-data'
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';
import { Fragment } from 'react/cjs/react.production.min';
import { LoginForm } from './LoginForm.jsx';


const toggleCheck = ({ _id, isChecked })=>{
  Meteor.call('tasks.setIsChecked',_id,!isChecked);
}

const deleteTask = ({_id})=>{
  Meteor.call('tasks.remove',_id);
}

const logout = () => Meteor.logout();

export const App = () => {


  
  const user = useTracker(()=> Meteor.user());
  const [hideCompleted , setHideCompleted ] = useState(false);
  const completedFilter =  { isChecked : {$ne : true} };
  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...completedFilter, ...userFilter };
  
    const { tasks, pendingTaskCount, isLoading } = useTracker(() => {
      const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
      if (!Meteor.user()) {
        return noDataAvailable;
      }
      const handler = Meteor.subscribe('tasks');
  
      if (!handler.ready()) {
        return { ...noDataAvailable, isLoading: true };
      }
  
      const tasks = TasksCollection.find(
        hideCompleted ? pendingOnlyFilter : userFilter,
        {
          sort: { createdAt: -1 },
        }
      ).fetch();
      const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
  
      return { tasks, pendingTasksCount };
    });


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
            <TaskForm />
              <div className='filter'>
                <button onClick={(e)=>{ e.preventDefault(); setHideCompleted(!hideCompleted);}}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
                </button>
              </div>
              {isLoading && <div className="loading">loading...</div>}

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
