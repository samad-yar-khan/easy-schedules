import React from "react";

export const Task  = ({task , onCheckBoxClick , deleteTask})=> {
    return (
        <li className={`${task.isChecked? 'done' : ''}`}>
            <input
                type='checkbox'
                readOnly
                checked={!!task.isChecked}
                onClick={(e)=>{
                    e.preventDefault();
                    onCheckBoxClick(task);
                }}
            />
            <span>
                {task.text}
            </span>

            <button onClick={(e) => { e.preventDefault(); deleteTask(task)}}>
                X
            </button>
        </li>);
};