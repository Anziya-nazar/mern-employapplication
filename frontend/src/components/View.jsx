import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import axiosInstance from "../axiosinterceptor";
import { useParams } from "react-router-dom";

const View = () => {
  const { id: employeeId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (employeeId) {
      axiosInstance
        .get(`http://localhost:4000/admin/employees/${employeeId}`)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [employeeId]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #00d2ff, #3a7bd5)",
      }}
    >
      {employee && (
        <div
          style={{
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
          }}
        >
          <h1 style={{ fontWeight: 400, textAlign: "center" }}>
            Details of {employee.name}
          </h1>
          <Card sx={{ maxWidth: 600 }}>
            <CardContent>
              <div className="row">
                <div className="left_view col-lg-6 col-md-6 col-12">
                  <img
                    src="/profile.png"
                    style={{ width: 50 }}
                    alt="profile pic"
                  />
                  <h3 className="mt-3">
                    Name:<span>{employee.name}</span>
                  </h3>
                  <h3 className="mt-3">
                    Age:<span>{employee.age}</span>
                  </h3>
                  <p>
                    <LocationOnIcon />
                    Location: <span>{employee.location}</span>
                  </p>
                  <p>
                    <CurrencyRupeeIcon />
                    Salary: <span>{employee.salary}</span>
                  </p>
                </div>
                <div className="right_view col-lg-6 col-md-6 col-12">
                  <p className="mt-5">
                    <EmailIcon />
                    Email: <span>{employee.email}</span>
                  </p>
                  <p>
                    <WorkIcon />
                    Designation: <span>{employee.designation}</span>
                  </p>
                  <p>
                    <HomeIcon />
                    Address: <span>{employee.address}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default View;
