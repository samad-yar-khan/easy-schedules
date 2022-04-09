import React , { useEffect, useState } from "react";
import { TasksCollection } from "../api/TasksCollection";

export const TaskForm = ({ user })=>{

    [text,setText] = useState("");

    const inputChange =(e)=>{
        setText(e.target.value);
    }

    const addTask = (e)=>{
        e.preventDefault();
        if(text.length !== 0){
            TasksCollection.insert({
                text : text.trim(),
                createdAt: new Date(),
                userId: user._id,
            });
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