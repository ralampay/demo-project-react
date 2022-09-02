import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeList(props) {

    return (
        <>
            <EmployeeCard
                firstName="Raphael"
                lastName="Alampay"
                isRegular={true}
            />
            <EmployeeCard
                firstName="Leonardo"
                lastName="Alampay"
                isRegular={false}
            />
        </>
    )
}