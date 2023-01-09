import React, {FC} from 'react';

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
}

export type TaskType = {
    title: string,
    isDone: boolean,
    id: number,
}

// : FC<TodoListPropsType>

const TodoList: FC<TodoListPropsType> = (props) => {

    let taskList = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            // const removeTask = () => alert(task.id)
            return (
                <li>
                    <input type="checkbox" checked={task.isDone} />
                    <span>{task.title}</span>
                    <button>x</button>
                </li>
            )
        }) : <span>Your taskslist is empty</span>


    // const taskList;
    // if (props.tasks.length === 0){
    //     taskList = <span>Your taskList</span>
    // }
    //
    // props.tasks.length






    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;