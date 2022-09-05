import React, { useState, useEffect } from "react";

export default function EmployeeForm(props) {
    return (
        <>
            <div className="form-group my-4">
                <label>
                    First Name
                </label>
                <input
                    value={props.employee.firstName}
                    className="form-control"
                    disabled={props.isSubmitting}
                    onChange={(event) => {
                        let emp = {...props.employee};
                        emp.firstName = event.target.value;
                        props.setCurrentEmployee(emp);
                    }}
                />
            </div>
            <div className="form-group my-4">
                <label>
                    Last Name
                </label>
                <input
                    value={props.employee.lastName}
                    className="form-control"
                    disabled={props.isSubmitting}
                    onChange={(event) => {
                        let emp = {...props.employee};
                        emp.lastName = event.target.value;
                        props.setCurrentEmployee(emp);
                    }}
                />
            </div>
            <div className="form-group my-4">
                <label>
                    Is Regular
                </label>
                <input
                    checked={props.employee.isRegular}
                    type="checkbox"
                    disabled={props.isSubmitting}
                    onChange={(event) => {
                        let emp = {...props.employee};
                        emp.isRegular = !emp.isRegular;
                        props.setCurrentEmployee(emp);
                    }}
                />
            </div>
            <hr/>
            <button
                className="btn btn-primary"
                disabled={props.isSubmitting}
                onClick={() => {
                    props.saveEmployee(props.employee);
                }}
            >
                Save Employee
            </button>
        </>
    )
}