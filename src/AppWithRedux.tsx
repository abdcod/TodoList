import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Box, Button, IconButton, Typography, Toolbar, Grid, Container, Paper} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {
    ActionType, AddTodolistAC,
    ChangeToDoListFilterAC,
    ChangeToDoListTitleAС,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    ActionsType,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";


export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TaskStateType = {
    [todolist: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoListId_1 = v1();
    const todoListId_2 = v1();

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch();

    // const [todoLists, dispatchTodolists] = useReducer<Reducer<Array<TodoListType>, ActionType>>(todolistsReducer, [
    //     {id: todoListId_1, title: "What to learn", filter: "all"},
    //     {id: todoListId_2, title: "What to buy", filter: "all"},
    // ])

    // const [tasks, dispatchTasks] = useReducer<Reducer<TaskStateType, ActionsType>>(tasksReducer,{
    //     [todoListId_1]: [
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: false},
    //     ],
    //     [todoListId_2]: [
    //         {id: v1(), title: "Whisky", isDone: true},
    //         {id: v1(), title: "Coca-Cola", isDone: true},
    //         {id: v1(), title: "Ice", isDone: false},
    //     ],
    // })

    const changeToDoListFilter = (filter: FilterValuesType, todolistId: string) => {
        //setTodolists(todoLists.map((tl) => tl.id === todolistId ? {...tl, filter: filter} : tl));
        dispatch(ChangeToDoListFilterAC(filter,todolistId))
    }

    const changeToDoListTitle = (title: string, todolistId: string) => {
        //setTodolists(todoLists.map((tl) => tl.id === todolistId ? {...tl, title: title} : tl));
        dispatch(ChangeToDoListTitleAС(title,todolistId))
    }

    const removeTodoList = (todoListId: string) => {
        // const updatedTodoLists = todoLists.filter((tl) => tl.id !== todoListId);
        // setTodolists(updatedTodoLists);

        const removeToDoListAction = RemoveTodolistAC(todoListId)

        dispatch(removeToDoListAction)
    }

    const addTodolist = (title: string) => {
        // const newTodolistId = v1();
        // const newTodo: TodoListType = {
        //     id: newTodolistId,
        //     title: title,
        //     filter: "all"
        // }
        // setTodolists([...todoLists, newTodo]);
        // setTasks({...tasks, [newTodolistId]: []})

        const addToDoListAction = AddTodolistAC(title)

        dispatch(addToDoListAction);

    }

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId));
    }

    const addTask = (title: string, todolistId: string) => {
        // const newTask: TaskType = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        dispatch(addTaskAC(title, todolistId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        //setTasks({...tasks, [todolistId]: tasks[todolistId].map((t) => t.id === taskId ? {...t, isDone: isDone} : t)})
        // setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone: isDone} : t))
        dispatch(changeTaskStatusAC(taskId,isDone,todolistId));
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        //setTasks({...tasks, [todolistId]: tasks[todolistId].map((t) => t.id === taskId ? {...t, title: title} : t)})
        dispatch(changeTaskTitleAC(taskId,title,todolistId))
    }

    const getFilteredTaskForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {

        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks;
        }
    }


    const todoListComponents = todoLists.length ?
        todoLists.map((tl) => {

            const filteredTasks = getFilteredTaskForRender(tasks[tl.id] || [], tl.filter);
            return (
                <Grid item>
                    <Paper sx={{p: "20px"}} elevation={16}>
                        <TodoList
                            key={tl.id}
                            todoListId={tl.id}
                            title={tl.title}
                            tasks={filteredTasks}
                            removeTask={removeTask}
                            changeToDoListFilter={changeToDoListFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeToDoListTitle={changeToDoListTitle}
                        />
                    </Paper>
                </Grid>

            )
        }) : <span></span>

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container sx={{p: "10px 0px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={6}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;