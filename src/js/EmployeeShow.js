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
    }, [])

    return (
        <>
            <h1>
                {lastName}, {firstName}
            </h1>
            <hr/>
            <Link
                className="btn btn-secondary"
                to="/"
            >
                Back to List
            </Link>
        </>
    )
}