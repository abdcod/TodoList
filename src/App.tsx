import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const toDoListTitle_1: string = "Всем привет";
    // const toDoListTitle_2: string = "Всем пока";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterValuesType>("all");

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([...tasks, newTask]);
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


    const filteredTasks = getFilteredTaskForRender(tasks, filter);
    // const tasks_1: Array<TaskType> = [
    //     {id: 1, title: "HTML", isDone: true},
    //     {id: 2, title: "CSS", isDone: true},
    //     {id: 3, title: "JS", isDone: false},
    //     {id: 3, title: "JS", isDone: false},
    //     {id: 3, title: "JS", isDone: false},
    // ]

    return (
        <div className="App">
            <TodoList
                title={toDoListTitle_1}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
            {/*<TodoList title={toDoListTitle_2} tasks={tasks}/>*/}
            {/*<TodoList title={"Привет"} tasks={tasks_1}/>*/}
        </div>
    );
}

export default App;
