import React, { useState } from "react";

export default function MessageForm(props) {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <label>
                            First Name: 
                        </label>
                        <input
                            className="form-control"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}