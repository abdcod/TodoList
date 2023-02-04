import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeToDoListFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}


export type TaskType = {
    title: string,
    isDone: boolean,
    id: string,
}

// : FC<TodoListPropsType>


const TodoList: FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    let taskList = props.tasks
        ? props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, event.currentTarget.checked, props.todoListId)
            const taskClasses = task.isDone ? "task-done" : "task"
            return (
                <li key={task.id} className={taskClasses}>
                    <input onChange={changeTaskStatus} type="checkbox" checked={task.isDone}/>
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
        const trimmedTitle = title.trim();
        if (trimmedTitle !== "") {
            props.addTask(trimmedTitle, props.todoListId);
            //setError(false);
        } else {
            setError(true);
        }
        setTitle("");
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask();
    const removeTodoList = () => props.removeTodoList(props.todoListId)

    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeToDoListFilter(filter, props.todoListId);
    }
    const errorMessage = error &&
        <p style={{color: "red", fontWeight: "bold", margin: "0"}}>Title is not applicable</p>;

    const inputErrorClasses = error ? 'input-error' : "";

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}></button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={inputErrorClasses}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button className={props.filter === "all" ? "btn-active" : ""} onClick={handlerCreator("all")}>All
                </button>
                <button className={props.filter === "active" ? "btn-active" : ""}
                        onClick={handlerCreator("active")}>Active
                </button>
                <button className={props.filter === "completed" ? "btn-active" : ""}
                        onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;