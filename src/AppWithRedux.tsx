import React from 'react';
import './App.css';
import {TaskType} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Box, Button, IconButton, Typography, Toolbar, Grid, Container, Paper} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {AddTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodoListWithRedux from "./TodoListWithRedux";

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

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)


    const dispatch = useDispatch();


    const addTodolist = (title: string) => {
        dispatch(AddTodolistAC(title));
    }

    const todoListComponents = todoLists.length ?
        todoLists.map((tl) => {
            return (
                <Grid item key={tl.id}>
                    <Paper sx={{p: "20px"}} elevation={16}>
                        <TodoListWithRedux
                            todoListId={tl.id}
                            title={tl.title}
                            filter={tl.filter}
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