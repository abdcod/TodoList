import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    title: string,
    isDone: boolean,
    id: string,
}

// : FC<TodoListPropsType>


const TodoList: FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")

    let taskList = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id)
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        }) : <span>Your taskslist is empty</span>


    // const taskList;
    // if (props.tasks.length === 0){
    //     taskList = <span>Your taskList</span>
    // }
    //
    // props.tasks.length

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value);
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask();

    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button onClick={handlerCreator("all")}>All</button>
                <button onClick={handlerCreator("active")}>Active</button>
                <button onClick={handlerCreator("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;