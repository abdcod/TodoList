import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";


type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
    // tasks: Array<TaskType>
}
type TaskStateType = {
    [todolist: string]: Array<TaskType>
}

function App() {

    const todoListId_1 = v1();
    const todoListId_2 = v1();


    const [todoLists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Whisky", isDone: true},
            {id: v1(), title: "Coca-Cola", isDone: true},
            {id: v1(), title: "Ice", isDone: false},
        ],
    })

    //

    // const toDoListTitle_1: string = "Всем привет";
    // const toDoListTitle_2: string = "Всем пока";

    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML", isDone: true},
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: false},
    // ])

    // const [filter, setFilter] = useState<FilterValuesType>("all");


    const changeToDoListFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todoLists.map((tl) => tl.id === todolistId ? {...tl, filter: filter} : tl));
    }

    const removeTodoList = (todoListId: string) => {
        const updatedTodoLists = todoLists.filter((tl) => tl.id !== todoListId );
        setTodolists(updatedTodoLists);
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodo: TodoListType = {
            id: newTodolistId,
            title: title,
            filter: "all"
        }
        setTodolists([...todoLists, newTodo]);
        setTasks({...tasks, [newTodolistId]: []})
    }

    const removeTask = (taskId: string, todolistId: string) => { // тут всё понятно, если вдуматься!!!
        // const tasksForUpdate = tasks[todolistId];
        // const updatedTasks = tasksForUpdate.filter(task => task.id !== taskId);
        // const copyTasks = {...tasks};
        // copyTasks[todolistId] = updatedTasks;
        // setTasks(copyTasks);
        // то, что выше - это подробно

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const taskForUpdate = tasks[todolistId];
        // const updatedTasks = [...taskForUpdate, newTask];
        // const copyTasks = {...tasks};
        // copyTasks[todolistId] = updatedTasks;
        // setTasks(copyTasks);
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]});
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map((t) => t.id === taskId ? {...t, isDone: isDone} : t) })


        // setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const getFilteredTaskForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {

        switch (filter) {
            case "active":
                return tasks.filter(task => task.isDone === false)
            case "completed":
                return tasks.filter(task => task.isDone === true)
            default:
                return tasks;
        }
    }


    const todoListComponents = todoLists.length ?
        todoLists.map((tl) => {

        const filteredTasks = getFilteredTaskForRender(tasks[tl.id] || [], tl.filter);
        return (

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
            />

        )
    }) : <span>Create your first TodoList</span>





    // const tasks_1: Array<TaskType> = [
    //     {id: 1, title: "HTML", isDone: true},
    //     {id: 2, title: "CSS", isDone: true},
    //     {id: 3, title: "JS", isDone: false},
    //     {id: 3, title: "JS", isDone: false},
    //     {id: 3, title: "JS", isDone: false},
    // ]

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoListComponents}
            {/*<TodoList title={toDoListTitle_2} tasks={tasks}/>*/}
            {/*<TodoList title={"Привет"} tasks={tasks_1}/>*/}
        </div>
    );
}

export default App;
