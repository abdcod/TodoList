import React, {useState, FC, ChangeEvent} from 'react';

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

    return (
        editMode ? <input value={title} autoFocus onBlur={offEditMode} onChange={onChangeHandler}/> : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;