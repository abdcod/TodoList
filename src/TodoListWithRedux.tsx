import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, List, ListItem, Typography} from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {ChangeToDoListFilterAC, ChangeToDoListTitleAС, RemoveTodolistAC} from "./state/todolists-reducer";

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    title: string,
    isDone: boolean,
    id: string
}

const TodoListWithRedux: FC<TodoListPropsType> = (props) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListId])

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true)
    }

    const dispatch = useDispatch();


    let taskList = tasks.length
        ? <List>{tasks.map((task: TaskType) => {
            const removeTask = () => dispatch(removeTaskAC(task.id, props.todoListId));
            const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id,event.currentTarget.checked,props.todoListId));

            const taskClasses = task.isDone ? "task-done" : "task"
            const changeTaskTitle = (title: string) => dispatch(changeTaskTitleAC(task.id,title,props.todoListId))

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

    const addTask = (title:string) => dispatch(addTaskAC(title, props.todoListId))

    const removeTodoList = () => dispatch(RemoveTodolistAC(props.todoListId))

    const handlerCreator = (filter: FilterValuesType) => {
        return () => dispatch(ChangeToDoListFilterAC(filter,props.todoListId))
    }

    const changeTodoListTitle = (title: string) => dispatch(ChangeToDoListTitleAС(title,props.todoListId))

    return (
        <div>
            <Typography variant={"h5"} align={"center"}><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
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
                        onClick={handlerCreator("all")}
                    >All
                    </Button>
                    <Button
                        sx={{mr: "2px", fontSize: "12px", p: "4px 4px"}}
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={handlerCreator("active")}>Active
                    </Button>
                    <Button
                        sx={{fontSize: "12px", p: "4px 4px"}}
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={handlerCreator("completed")}>Done
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default TodoListWithRedux;