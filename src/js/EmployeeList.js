import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeList(props) {
    const [currentEmployee, setCurrentEmployee] = useState({
        id: null,
        firstName: "",
        lastName: "",
        isRegular: false
    });

    const [employees, setEmployees] = useState([]);

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

    const saveEmployee = (emp) => {
        console.log(emp);

        // Adding a new employee
        if(!emp.id) {
            let maxId = -1;

            employees.forEach((e) => {
                if(e.id > maxId) {
                    maxId = e.id;
                }
            })

            emp.id = maxId + 1;

            let temp = [...employees];
            temp.push(emp);

            setEmployees(temp);
        }
    }

    return (
        <>
            <EmployeeForm
                employee={currentEmployee}
                saveEmployee={saveEmployee}
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
                        setCurrentEmployee={setCurrentEmployee}
                    />
                )
            })}
        </>
    )
}