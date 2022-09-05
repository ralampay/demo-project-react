import React, { useState } from "react";
import { 
    Link,
    useNavigate
} from "react-router-dom";

export default function EmployeeCard(props) {
    const navigate = useNavigate();

    return (
        <div className="card my-4">
            <div className="card-body">
                <h2>
                    {props.firstName} {props.lastName}
                </h2>
                {(() => {
                    if(props.isRegular) {
                        return (
                            <div className="badge bg-success">
                                Regular
                            </div>
                        )
                    } else {
                        return (
                            <div className="badge bg-danger">
                                On Probation
                            </div>
                        )
                    }
                })()}
                <hr/>
                <Link
                    to={`/employees/${props.id}`}
                    className="btn btn-primary"
                >
                    Show
                </Link>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        navigate(`/employees/${props.id}`);
                    }}
                >
                    Show Alternative
                </button>
                <button 
                    className="btn btn-secondary"
                    onClick={() => {
                        const currentEmployee = {
                            id: props.id,
                            firstName: props.firstName,
                            lastName: props.lastName,
                            isRegular: props.isRegular
                        };

                        console.log(currentEmployee);

                        props.setCurrentEmployee(currentEmployee);
                    }}
                >
                    Edit
                </button>
                {(() => {
                    if(props.isRegular) {
                        return (
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    props.handleEmployeeToggle(props.employee)
                                }}
                            >
                                Put on Porbation
                            </button>
                        )
                    } else {
                        return (
                            <button 
                                className="btn btn-success"
                                onClick={() => {
                                    props.handleEmployeeToggle(props.employee)
                                }}
                            >
                                Make Regular
                            </button>
                        )
                    }
                })()}
            </div>
        </div>
    )
}