import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemPropsFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemPropsFormPropsType> = (props: AddItemPropsFormPropsType) => {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(event.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle);
            //setError(false);
        } else {
            setError(true);
        }
        setTitle("");
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem();
    const errorMessage = error &&
        <p style={{color: "red", fontWeight: "bold", margin: "0"}}>Title is not applicable</p>;
    const inputErrorClasses = error ? 'input-error' : "";

    return (
        <div className={"addItemForm"}>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={inputErrorClasses}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    );
};

export default AddItemForm;