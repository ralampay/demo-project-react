import React, { useState } from "react";

import MessageForm from "./MessageForm";

export default function App(props) {
    const originalTitle = "My Awesome Application";
    const [title, setTitle] = useState(originalTitle);
    const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);

    return (
        <>
            <h1>
                {title}
            </h1>

            <button
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
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
            />
        </>
    );
}