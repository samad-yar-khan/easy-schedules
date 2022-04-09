import React , { useEffect, useState } from "react";
import { Meteor } from 'meteor/meteor'


export const TaskForm = ()=>{

    [text,setText] = useState("");

    const inputChange =(e)=>{
        setText(e.target.value);
    }

    const addTask = (e)=>{
        e.preventDefault();
        if(text.length !== 0){
           Meteor.call('tasks.insert',text);
        }
        setText("");
    }

    return (
        <form className="task-form">
            <input 
                type="text" 
                name="task-text" 
                id="main-input" 
                placeholder="Enter Task ..."
                onChange={inputChange}
            />

            <button type="submit" onClick={addTask}>
                Add Task
            </button>
        </form>
    )

}