import React, { useState, useEffect } from "react";
import {
    useParams,
    Link
} from "react-router-dom";
import axios from "axios";

import config from "../config";

export default function EmployeeShow(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isRegular, setIsRegular] = useState(false);
    const [tasks, setTasks] = useState([]);

    const { id } = useParams();

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
                        >
                            Put on Probation
                        </button>
                    )
                } else {
                    return (
                        <button
                            className="ms-2 btn btn-success"
                        >
                            Make Regular
                        </button>
                    )
                }
            })()}
        </>
    )
}