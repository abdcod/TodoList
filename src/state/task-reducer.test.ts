import {v1} from "uuid";
import {TaskStateType, TodoListType} from "../App";
import {AddTodolistAC, RemoveTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TaskType} from "../TodoList";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

let startState: TaskStateType;

beforeEach(() => {
    startState = {

        "todolistid1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
        ],
        "todolistid2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false},
        ]
    }
})



test("correct task should be deleted from correct array", () => {

        const action = removeTaskAC("2", "todolistid2");

        const endState = tasksReducer(startState, action);

        expect(endState).toEqual({
            "todolistid1": [
                {id: "1", title: "CSS", isDone: false},
                {id: "2", title: "JS", isDone: true},
                {id: "3", title: "React", isDone: false},
            ],
            "todolistid2": [
                {id: "1", title: "bread", isDone: false},
                {id: "3", title: "tea", isDone: false},
            ],
        })

    })

test("correct task should be added to correct array", () => {

    const action = addTaskAC("juice", "todolistid2");

    const endState = tasksReducer(startState, action);

    expect(endState["todolistid1"].length).toBe(3);
    expect(endState["todolistid2"].length).toBe(4);
    expect(endState["todolistid2"][0].isDone).toBe(false);
    expect(endState["todolistid2"][0].id).toBeDefined();
    // expect(endState["todolistid2"][0].
    expect(endState["todolistid2"][0].title).toBe("juice");
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', false, 'todolistid2')

    const endState = tasksReducer(startState, action)

    expect(endState["todolistid2"].length).toBe(3)
    expect(endState["todolistid2"][1].isDone).toBe(false)
    expect(endState["todolistid1"][1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC('2', "coffee", 'todolistid2')

    const endState = tasksReducer(startState, action)

    expect(endState["todolistid2"].length).toBe(3)
    expect(endState["todolistid2"][1].title).toBe("coffee")
    expect(endState["todolistid1"][1].title).toBe("JS")
})

test('new array should be added when new todolist is added', () => {

    const action = AddTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistid1' && k != 'todolistid2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC('todolistid2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistid2']).not.toBeDefined()
})


