import React, { useState } from "react";

export default function EmployeeCard(props) {

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
            </div>
        </div>
    )
}