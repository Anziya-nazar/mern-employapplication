import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axiosInstance from "../axiosinterceptor";
import { Link, useNavigate } from "react-router-dom";
import UpdateEmployee from "./UpdateEmployee";

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleAddEmployee = () => {
    navigate("/add");
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = sessionStorage.getItem("userToken");
        const response = await axiosInstance.get(
          "http://localhost:4000/admin/employees",
          {
            headers: {
              token: token,
            },
          }
        );
        setEmployees(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = (employeeId) => {
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
    setSelectedEmployeeId(employeeId);
  };

  const handleView = (employeeId) => {
    navigate(`/view/${employeeId}`);
  };

  return (
    <div className="mt-5">
      <div className="container" style={{ paddingTop: "20px" }}>
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
                    component={Link}
                    to={`/employees/${employee._id}`}
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

export default Employees;
