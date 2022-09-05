import React, { useState } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import EmployeeList from "./EmployeeList";
import EmployeeShow from "./EmployeeShow";
import About from "./pages/About";

export default function App(props) {
    const originalTitle = "My Awesome Application";
    const [title, setTitle] = useState(originalTitle);
    const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);

    return (
        <>
            <Router>
                <div className="container">
                    <h1>
                        {title}
                    </h1>

                    <ul>
                        <li>
                            <Link to={`/`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={`/about`}>
                                About
                            </Link>
                        </li>
                    </ul>

                    <hr/>

                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <EmployeeList
                                />
                            }
                        />
                        <Route
                            exact
                            path="/about"
                            element={
                                <About/>
                            }
                        />
                        <Route
                            exact
                            path='/employees/:id'
                            element={
                                <EmployeeShow
                                />
                            }
                        />
                    </Routes>

                    <hr/>
                    <section>
                        Some Footer
                    </section>
                </div>
            </Router>
        </>
    );
}