import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {

    const toDoListTitle_1: string = "Всем привет";
    const toDoListTitle_2: string = "Всем пока";
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
        {id: 3, title: "JS", isDone: false},
        {id: 3, title: "JS", isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={toDoListTitle_1} tasks={tasks_1}/>
            <TodoList title={toDoListTitle_2} tasks={tasks_1}/>
            {/*<TodoList title={"Привет"} tasks={tasks_1}/>*/}
        </div>
    );
}

export default App;
