import React, {useState, FC, ChangeEvent, KeyboardEvent} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string;
    changeTitle: (title: string) => void;
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);

    const onEditMode = () => setEditMode(true)

    const offEditMode = () => {
        props.changeTitle(title);
        setEditMode(false);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.changeTitle(title);
            setEditMode(false);
        }
};

    return (
        editMode ?
            // <input value={title} autoFocus onBlur={offEditMode} onChange={onChangeHandler}/>
            <TextField
                variant={"standard"}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeHandler}
                size={"small"}
                onKeyDown={onKeyDownHandler}
                // value={title}
                // onChange={onChangeHandler}
                // onKeyDown={onKeyDownHandler}
                // variant={"outlined"}
                // label={"Title"}
                // error={error}
                // helperText={error && "Please, enter new Title"}
            ></TextField>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;