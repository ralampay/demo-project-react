import React, { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";
import axios from "axios";

export default function EmployeeList(props) {
    const [currentEmployee, setCurrentEmployee] = useState({
        id: null,
        firstName: "",
        lastName: "",
        isRegular: false
    });

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get(
            'http://localhost:5000/employees'
        ).then((res) => {
            console.log(res);
            setEmployees(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    const resetEmployee = () => {
        setCurrentEmployee({
            id: null,
            firstName: "",
            lastName: "",
            isRegular: false
        })
    }

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

    const saveEmployee = () => {
        console.log(currentEmployee);

        // Adding a new employee
        if(!currentEmployee.id) {
            let maxId = 0;

            employees.forEach((e) => {
                if(e.id > maxId) {
                    maxId = e.id;
                }
            })

            currentEmployee.id = maxId + 1;

            let temp = [...employees];
            temp.push(currentEmployee);

            setEmployees(temp);
        } else {
            for(var i = 0; i < employees.length; i++) {
                if(employees[i].id == currentEmployee.id) {
                    employees[i] = currentEmployee;
                    break;
                }
            }

            setEmployees(employees);
        }

        resetEmployee();
    }

    return (
        <>
            <EmployeeForm
                employee={currentEmployee}
                setCurrentEmployee={setCurrentEmployee}
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