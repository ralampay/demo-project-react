import React, { useState } from "react";

import MessageForm from "./MessageForm";

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

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setIsMessageFormOpen(!isMessageFormOpen);
                    }}
                >
                    Toggle Message Form
                </button>

                {(() => {
                    if(isMessageFormOpen) {
                        return (
                            <MessageForm
                            />
                        )
                    }
                })()}

                <hr/>
                <input
                    className="form-control"
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />

            </div>
        </>
    );
}