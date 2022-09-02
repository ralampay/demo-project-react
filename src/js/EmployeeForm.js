import React, { useState } from "react";

export default function EmployeeForm(props) {
    const [firstName, setFirstName] = useState("");

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
                    className="form-control"
                    onChange={(event) => {

                    }}
                />
            </div>
            <div className="form-group my-4">
                <label>
                    Is Regular
                </label>
                <input
                    type="checkbox"
                    onChange={(event) => {

                    }}
                />
            </div>
            <hr/>
            <button
                className="btn btn-primary"
                onClick={() => {

                }}
            >
                Save Employee
            </button>
        </>
    )
}