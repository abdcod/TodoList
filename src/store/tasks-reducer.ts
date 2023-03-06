import todoList, {TaskType} from "../TodoList";
import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodolistAC, RemoveTodoListAT} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodoListAT | RemoveTodoListAT

export const tasksReducer = (state: TaskStateType, action: ActionsType ): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            } ;
        case "ADD-TASK":
            //const newID = v1();
            const newTask = {id: v1(), title: action.title, isDone: false};
            return {
            ...state,
            [action.todolistId]: [ newTask, ...state[action.todolistId]]
        };
        case "CHANGE-TASK-STATUS":
        return {
            ...state,
            [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task )
        };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.title} : task )
            };
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolistId]: []
            };
        case "REMOVE-TODOLIST":
            let obj = {
                ...state
            }
            delete obj[action.payload.todolistId];
            return obj;
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}

