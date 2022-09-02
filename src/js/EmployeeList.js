import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeList(props) {
    const [employees, setEmployees] = useState([
        {
            id: 1,
            firstName: "Raphael",
            lastName: "Alampay",
            isRegular: true
        },
        {
            id: 2,
            firstName: "Leonardo",
            lastName: "Alampay",
            isRegular: false
        }
    ]);

    const handleEmployeeToggle = (emp) => {
        let temp = [...employees];

        temp.forEach((e) => {
            if(e.id == emp.id) {
                e.isRegular = !e.isRegular;
                return;
            }
        })

        setEmployees(temp);
    }

    return (
        <>
            <EmployeeForm
            />
            {employees.map((emp) => {
                return (
                    <EmployeeCard
                        key={`employee-${emp.id}`}
                        id={emp.id}
                        firstName={emp.firstName}
                        lastName={emp.lastName}
                        isRegular={emp.isRegular}
                        employee={emp}
                        handleEmployeeToggle={handleEmployeeToggle}
                    />
                )
            })}
        </>
    )
}