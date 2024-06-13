import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "./slices/todo";
import { markAsCompleted } from "./slices/todo";
import { Table, Button, Tag } from 'antd';

function App() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.todo);

    if (state.isLoading) {
        return <h1>Loading....</h1>;
    }

    const columns = [
        {
            title: 'Task',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Completed',
            dataIndex: 'completed',
            key: 'completed',
            render: (completed) => (completed ? <Tag color="green">YES</Tag> : <Tag color="red">NO</Tag>),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                !record.completed && (
                    <Button
                        onClick={() => {
                            console.log("Mark as Completed clicked for task ID:", record.id);
                            dispatch(markAsCompleted(record.id));
                        }}
                        type="default"
                    >
                        Mark as Completed
                    </Button>
                )
            ),
        },
    ];

    return (
        <>
            <div>
                <Button
                    onClick={() => {
                        dispatch(fetchTodo());
                    }}
                    className="fetch-todos">
                    Fetch
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={state.data}
                rowKey="id"
            />
        </>
    );
}

export default App;
