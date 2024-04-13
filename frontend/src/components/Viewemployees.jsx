import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axiosInstance from "../axiosinterceptor";
import UpdateEmployee from "./UpdateEmployee";

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId] = useState(null);

  const handleAddEmployee = () => {
    if (!window.confirm("You need Admin privileges to perform this action"))
      return;
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:4000/user/employees"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = (employeeId) => {
    if (!window.confirm("You need Admin privileges to perform this action"))
      return;

    axiosInstance
      .delete(`http://localhost:4000/admin/employees/${employeeId}`)
      .then((response) => {
        alert(response.data.message);
        setEmployees(
          employees.filter((employee) => employee._id !== employeeId)
        );
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleUpdate = (employeeId) => {
    if (!window.confirm("You need Admin privileges to perform this action"))
      return;
  };

  const handleView = (employeeId) => {
    if (!window.confirm("You need Admin privileges to perform this action"))
      return;
    // Don't navigate here
  };

  return (
    <div className="mt-5">
      <div className="container">
      <Button
          style={{
            float: "right",
            marginTop: "1px",
            marginBottom: "12px", 
            backgroundColor: "orange",
            color: "white",
          }}
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Designation</th>
              <th scope="col">Location</th>
              <th scope="col">Salary</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>{employee.location}</td>
                <td>{employee.salary}</td>
                <td className="d-flex justify-content-between">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleView(employee._id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(employee._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEmployeeId && <UpdateEmployee employeeId={selectedEmployeeId} />}
    </div>
  );
};

export default ViewEmployees;
