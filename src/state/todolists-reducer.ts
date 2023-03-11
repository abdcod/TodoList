import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST",
    payload: {
        todolistId: string
    }
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST",
    payload: {
        title: string,
        todolistId: string
    }
}

export type ChangeToDoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        title: string,
        todolistId: string
    }
}

export type ChangeToDoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        filter: FilterValuesType,
        todolistId: string
    }
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeToDoListTitleAT | ChangeToDoListFilterAT;

const initialState: Array<TodoListType> = [];

export const todolistsReducer = (todolists = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {

        case "REMOVE-TODOLIST":
            return todolists.filter((tl) => tl.id !== action.payload.todolistId)

        case "ADD-TODOLIST":
            //const newTodolistId = v1();
            const newTodo: TodoListType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: "all"
            }
            return [...todolists, newTodo];

        case "CHANGE-TODOLIST-TITLE":
            return todolists.map((tl) => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.title
            } : tl)

        case "CHANGE-TODOLIST-FILTER":
            return todolists.map((tl) => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.filter
            } : tl)

        default:
            return todolists;
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId: id
        }
    }
}

export const AddTodolistAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title: title,
            todolistId: v1()
        }
    }
}

export const ChangeToDoListTitleAС = (title: string, todolistId: string): ChangeToDoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            title: title,
            todolistId: todolistId
        }
    }
}

export const ChangeToDoListFilterAC = (filter: FilterValuesType, todolistId: string): ChangeToDoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            filter: filter,
            todolistId: todolistId
        }
    }
}


