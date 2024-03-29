import React, { useState, useContext } from "react";
import employee from "../images/employee.png";
import { AccountContext } from "./Account";
import { useHistory } from 'react-router-dom';

const EmployeeLogin = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [formState, setFormState] = useState("login");
    const [cognitoUser, setCognitoUser] = useState(null);

    const { authenticateEmployee } = useContext(AccountContext);

    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault();

        authenticateEmployee(username, password)
            .then((data) => {
                if (data.type == "newPasswordRequired") {
                    console.log(data);
                    setCognitoUser(data.data)
                    setFormState("resetPassword");
                } else {
                    console.log("Logged in!", data);
                }
            })
            .catch((err) => {
                console.error("Failed to login", err);
                setError(err.message);
            });
    };

    const onResetPassword = (event) => {
        event.preventDefault();

        cognitoUser.completeNewPasswordChallenge(
            newPassword,
            {},
            {
                onSuccess: (result) => {
                    console.log("Password Changed successfully.", result);
                    // setError(
                    //     "Password changed successful. Please login again."
                    // );
                    // setFormState("login");
                    history.push(`/employee`);
                },
                onFailure: (err) => {
                    console.error("Error changing password", err);
                    setError(err.message || JSON.stringify(err));
                },
            }
        );
    };

    return (
        <div>
            <br></br>
            <h1 className="mt-5 mb-5" style={{ textAlign: "center" }}>
                Employee Login
            </h1>
            <div
                className="border container p-0 shadow-lg p-3 mb-5 bg-white rounded "
                style={{ display: "flex", justifyContent: "center" }}
            >
                <img
                    src={employee}
                    alt="customer missing"
                    className="rounded mx-auto d-block ml-10 mr-10 flex-left p-5"
                    height="400px"
                ></img>

                {formState == "login" && (
                    <form
                        className="container flex-right p-5 "
                        onSubmit={onSubmit}
                        style={{ alignSelf: "right" }}
                        method="get"
                    >
                        <div className="form-group">
                            <label className="mt-4">Username</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                aria-describedby="emailHelp"
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className="mt-2">{error}</p>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-primary btn-lg mt-3"
                        >
                            Login
                        </button>
                    </form>
                )}
                {formState == "resetPassword" && (
                    <form
                        className="container flex-right p-5 "
                        onSubmit={onResetPassword}
                        style={{ alignSelf: "right" }}
                        method="get"
                    >
                        <div className="form-group">
                            <p>
                                You must change your password before logging on the first time.
                            </p>
                            <label className="mt-2">Old Password</label>
                            <input
                                type="password"
                                className="form-control mb-3"
                                aria-describedby="emailHelp"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="mt-2">New Password</label>
                            <input
                                type="password"
                                className="form-control mb-3"
                                aria-describedby="emailHelp"
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            class="btn btn-primary btn-lg mt-3"
                        >
                            Login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EmployeeLogin;
