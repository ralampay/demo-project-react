import React, { useState, useEffect } from "react";

export default function EmployeeForm(props) {
    const [id, setId] = useState(props.employee.id);
    const [firstName, setFirstName] = useState(props.employee.firstName);
    const [lastName, setLastName] = useState(props.employee.lastName);
    const [isRegular, setIsRegular] = useState(props.employee.isRegular);

    const resetForm = () => {
        setId(null);
        setFirstName("");
        setLastName("");
        setIsRegular(false);
    }

    return (
        <>
            <div className="form-group my-4">
                <label>
                    First Name
                </label>
                <input
                    value={firstName}
                    className="form-control"
                    onChange={(event) => {
                        setFirstName(event.target.value);
                    }}
                />
            </div>
            <div className="form-group my-4">
                <label>
                    Last Name
                </label>
                <input
                    value={lastName}
                    className="form-control"
                    onChange={(event) => {
                        setLastName(event.target.value);
                    }}
                />
            </div>
            <div className="form-group my-4">
                <label>
                    Is Regular
                </label>
                <input
                    checked={isRegular}
                    type="checkbox"
                    onChange={(event) => {
                        setIsRegular(!isRegular);
                    }}
                />
            </div>
            <hr/>
            <button
                className="btn btn-primary"
                onClick={() => {
                    let emp = {
                        id: id,
                        firstName: firstName,
                        lastName: lastName,
                        isRegular: isRegular
                    };

                    props.saveEmployee(emp);
                    resetForm();
                }}
            >
                Save Employee
            </button>
        </>
    )
}