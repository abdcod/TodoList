import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {
    AddTodolistAC,
    AddTodoListAT, ChangeToDoListFilterAC,
    ChangeToDoListFilterAT,
    ChangeToDoListTitleAT, ChangeToDoListTitleAС,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";


test("correct todolist should be removed",
    () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
        const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

        expect(endState.length).toBe(1);
        expect(endState[0].id).toBe(todolistId2);
    })

test("correct todolist should be added", () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: AddTodoListAT = {
    //     type: "ADD-TODOLIST",
    //     payload: {
    //         title: newTodoListTitle
    //     }
    // }
    const endState = todolistsReducer(startState, AddTodolistAC(newTodoListTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);


})


test("correct todolist should change its name", () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: ChangeToDoListTitleAT = {
    //     type: "CHANGE-TODOLIST-TITLE",
    //     payload: {
    //         todolistId: todolistId2,
    //         title: newTodoListTitle
    //     }
    // }
    const endState = todolistsReducer(startState, ChangeToDoListTitleAС(newTodoListTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle);
})

test("correct filter of todolist should be changed", () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: ChangeToDoListFilterAT = {
    //     type: "CHANGE-TODOLIST-FILTER",
    //     payload: {
    //         filter: newFilter,
    //         todolistId: todolistId2
    //     }
    // }
    const endState = todolistsReducer(startState, ChangeToDoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})
