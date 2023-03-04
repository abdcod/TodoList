import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
    // const errorMessage = error &&
    //     <p style={{color: "red", fontWeight: "bold", margin: "0"}}>Title is not applicable</p>;
    const inputErrorClasses = error ? 'input-error' : "";

    return (
        <div className={"addItemForm"}>
            <TextField
                size={"small"}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                variant={"outlined"}
                label={"Title"}
                error={error}
                helperText={error && "Please, enter new Title"}
            ></TextField>
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyDown={onKeyDownHandler}*/}
            {/*    className={inputErrorClasses}*/}
            {/*/>*/}
            {/*<button onClick={addItem}>+</button>*/}
            <Button
                sx={{fontSize: "12px", p: "4px 4px", ml: "6px"}}
                size="small"
                variant={"contained"}
                onClick={addItem}
                endIcon={<AddCircleIcon/>}
            >Add</Button>
            {/*{errorMessage}*/}
        </div>
    );
};

export default AddItemForm;