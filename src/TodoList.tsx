import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, List, ListItem, Typography} from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';

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
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeToDoListTitle: (title: string, todolistId: string) => void

}


export type TaskType = {
    title: string,
    isDone: boolean,
    id: string
}

// : FC<TodoListPropsType>


const TodoList: FC<TodoListPropsType> = (props) => {

    // const [title, setTitle] = useState<string>("");
    // const [error, setError] = useState<boolean>(false);

    let taskList = props.tasks.length
        ? <List>{props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, event.currentTarget.checked, props.todoListId)
            const taskClasses = task.isDone ? "task-done" : "task"
            const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListId)
            return (
                <ListItem sx={{p: "0px"}} key={task.id} className={taskClasses}>
                    {/*<input onChange={changeTaskStatus} type="checkbox" checked={task.isDone}/>*/}
                    <Checkbox size={"small"} onChange={changeTaskStatus} checked={task.isDone} />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    {/*<button onClick={removeTask}>x</button>*/}
                    <BackspaceIcon
                        sx={{ml: "10px", fontSize: "12px", verticalAlign: "middle"}}
                        color={"warning"}
                        onClick={removeTask}></BackspaceIcon>
                </ListItem>
            )
        })}</List> : <span>Your taskslist is empty</span>


    // const taskList;
    // if (props.tasks.length === 0){
    //     taskList = <span>Your taskList</span>
    // }
    //
    // props.tasks.length

    const addTask = (title:string) => props.addTask(title, props.todoListId)

    // {
    //     const trimmedTitle = title.trim();
    //     if (trimmedTitle !== "") {
    //         props.addTask(trimmedTitle, props.todoListId);
    //         //setError(false);
    //     } else {
    //         setError(true);
    //     }
    //     setTitle("");
    // }

    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     error && setError(false);
    //     setTitle(event.currentTarget.value)
    // }
    // const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask();
    const removeTodoList = () => props.removeTodoList(props.todoListId)

    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeToDoListFilter(filter, props.todoListId);
    }
    // const errorMessage = error &&
    //     <p style={{color: "red", fontWeight: "bold", margin: "0"}}>Title is not applicable</p>;
    //
    // const inputErrorClasses = error ? 'input-error' : "";

    const changeTodoListTitle = (title: string) => props.changeToDoListTitle(title, props.todoListId);

    return (
        <div>
            <Typography variant={"h5"} align={"center"}><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                {/*<button onClick={removeTodoList}>х</button>*/}
                {/*<IconButton onClick={removeTodoList}></IconButton>*/}
                <BackspaceIcon
                    color={"error"}
                    sx={{ml: "10px", fontSize: "18px", verticalAlign: "middle"}}
                    onClick={removeTodoList}></BackspaceIcon>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <ul>
                {taskList}
            </ul>
            <div>
                <ButtonGroup
                    fullWidth
                    disableElevation
                    size="small"
                    variant="contained"
                >
                <Button
                    sx={{mr: "2px", fontSize: "12px", p: "4px 4px"}}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    //className={props.filter === "all" ? "btn-active" : ""}
                    onClick={handlerCreator("all")}
                >All
                </Button>
                <Button
                    sx={{mr: "2px", fontSize: "12px", p: "4px 4px"}}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    //className={props.filter === "active" ? "btn-active" : ""}
                    onClick={handlerCreator("active")}>Active
                </Button>
                <Button
                    sx={{fontSize: "12px", p: "4px 4px"}}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    //className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={handlerCreator("completed")}>Done
                </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default TodoList;