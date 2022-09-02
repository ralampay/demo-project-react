import React, { useState } from "react";
import EmployeeList from "./EmployeeList";

export default function App(props) {
    const originalTitle = "My Awesome Application";
    const [title, setTitle] = useState(originalTitle);
    const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);

    return (
        <>
            <div className="container">
                <h1>
                    {title}
                </h1>

                <hr/>
                <EmployeeList
                />
            </div>
        </>
    );
}