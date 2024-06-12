import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "./slices/todo";

function App() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    console.log(state);

    if (state.todo.isLoading) {
        return <h1>Loading....</h1>;
    }

    return (
        <>
            <button
                onClick={(e) => {
                    dispatch(fetchTodo());
                }}
                className="fetch-todos">
                Fetch
            </button>
            {state.todo.data && state.todo.data.map((e) => <li>{e.title}</li>)}
        </>
    );
}

export default App;
