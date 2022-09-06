import React, { useState, useEffect } from "react";
import {
    useParams,
    Link
} from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';

import config from "../config";

export default function EmployeeShow(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isRegular, setIsRegular] = useState(false);
    const [tasks, setTasks] = useState([]);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    const [currentTask, setCurrentTask] = useState({
        id: null,
        content: "",
        employeeId: parseInt(id)
    })

    const resetCurrentTask = () => {
        setCurrentTask({
            id: null,
            content: "",
            employeeId: parseInt(id)
        })
    }

    useEffect(() => {
        axios.get(
            `${config.routes.employees}/${id}`
        ).then((res) => {
            let emp = res.data;
            setFirstName(emp.firstName);
            setLastName(emp.lastName);
            setIsRegular(emp.isRegular);
        }).catch((error) => {
            console.log(error);
        })

        axios.get(
            `${config.routes.employees}/${id}/tasks`
        ).then((res) => {
            let temp = res.data;
            setTasks(temp);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>
            <Modal
                show={isTaskModalOpen}
            >
                <Modal.Header>
                    <Modal.Title>Task Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        value={currentTask.content}
                        className="form-control"
                        disabled={isLoading}
                        onChange={(event) => {
                            let temp = {...currentTask};
                            temp.content = event.target.value;
                            setCurrentTask(temp);
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-primary"
                        disabled={isLoading}
                        onClick={() => {
                            setIsLoading(true);

                            if(currentTask.id) {
                                // Update
                                axios.put(
                                    `${config.routes.tasks}/${currentTask.id}`,
                                    currentTask
                                ).then((res) => {
                                    let updatedTask = res.data;
                                    let temp = [...tasks];

                                    for(var i = 0; i < temp.length; i++) {
                                        if(temp[i].id == updatedTask.id) {
                                            temp[i] = updatedTask;
                                            break;
                                        }
                                    }

                                    setTasks(temp);
                                    setIsLoading(false);
                                    setIsTaskModalOpen(false);
                                    resetCurrentTask();
                                }).catch((error) => {
                                    console.log(error);
                                    alert("Something went wrong!");
                                    setIsLoading(false);
                                })
                            } else {
                                // Create
                                axios.post(
                                    config.routes.tasks,
                                    currentTask
                                ).then((res) => {
                                    let newTask = res.data;
                                    let temp = [...tasks];
                                    temp.push(newTask);
                                    setTasks(temp);
                                    setIsLoading(false);
                                    setIsTaskModalOpen(false);
                                    resetCurrentTask();
                                }).catch((error) => {
                                    console.log(error);
                                    alert("Something went wrong!");
                                    setIsLoading(false);
                                })
                            }
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-secondary"
                        disabled={isLoading}
                        onClick={() => {
                            setIsTaskModalOpen(false);
                        }}
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={isConfirmOpen}
            >
                <Modal.Header>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-primary"
                        disabled={isLoading}
                        onClick={() => {
                            setIsLoading(true);

                            let emp = {
                                id: id,
                                firstName: firstName,
                                lastName: lastName,
                                isRegular: !isRegular
                            }

                            axios.put(
                                `${config.routes.employees}/${id}`,
                                emp
                            ).then((res) => {
                                setIsRegular(res.data.isRegular);
                                setIsLoading(false);
                                setIsConfirmOpen(false);
                            }).catch((error) => {
                                console.log(error);
                                alert("Something went wrong!");
                                setIsLoading(false);
                            })
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="btn btn-secondary"
                        disabled={isLoading}
                        onClick={() => {
                            setIsConfirmOpen(false);
                        }}
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
            <h1>
                {lastName}, {firstName}
            </h1>
            <hr/>
            {(() => {
                if(tasks.length > 0) {
                    return (
                        <>
                            <table className="table table-sm table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">
                                            Id
                                        </th>
                                        <th>
                                            Content
                                        </th>
                                        <th className="text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task) => {
                                        return (
                                            <tr key={`task-${task.id}`}>
                                                <td className="text-center">
                                                    {task.id}
                                                </td>
                                                <td>
                                                    {task.content}
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            setCurrentTask(task);
                                                            setIsTaskModalOpen(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </>
                    )
                } else {
                    return (
                        <>
                            <p>No tasks found.</p>
                        </>
                    )
                }
            })()}
            <hr/>
            <Link
                className="btn btn-secondary"
                to="/"
            >
                Back to List
            </Link>
            {(() => {
                if(isRegular) {
                    return (
                        <button
                            className="ms-2 btn btn-danger"
                            onClick={() => {
                                setIsConfirmOpen(true);
                            }}
                        >
                            Put on Probation
                        </button>
                    )
                } else {
                    return (
                        <button
                            className="ms-2 btn btn-success"
                            onClick={() => {
                                setIsConfirmOpen(true);
                            }}
                        >
                            Make Regular
                        </button>
                    )
                }
            })()}
            <button
                className="ms-2 btn btn-primary"
                onClick={() => {
                    setIsTaskModalOpen(true);
                }}
            >
                Add Task
            </button>
        </>
    )
}