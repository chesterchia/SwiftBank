import React, { useState, useContext } from "react";
import customer from "../images/customer.png";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userpool from "../userpool";
import { AccountContext } from "./Account";

const CustomerLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [formState, setFormState] = useState("login");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    const { authenticate } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        authenticate(username, password)
            .then((data) => {
                console.log("Logged in!", data);
            })
            .catch((err) => {
                console.error("Failed to login", err);
                setError(err.message);
            });

        // const user = new CognitoUser({
        //   Username: username,
        //   Pool: userpool
        // });

        // const authDetails = new AuthenticationDetails({
        //   Username: username,
        //   Password: password
        // });

        // user.authenticateUser(authDetails, {
        //   onSuccess: (data) => {
        //     console.log("onSuccess:", data);
        //     window.location.href ="http://localhost:3000/customer?username=" + username;
        //   },
        //   onFailure: (err) => {
        //     console.log("onFailure:", err);
        //     setError(err.message);
        //   },
        //   newPasswordRequired: (data) => {
        //     console.log("newPasswordRequired:", data);
        //   }
        // })
    };

    const sendResetLink = (event) => {
        event.preventDefault();

        const userData = {
            Username: username,
            Pool: userpool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function (result) {
                console.log("Password reset code sent.", result);
                setFormState("resetPassword");
            },
            onFailure: function (err) {
                console.error("Error sending reset password link", err);
                setError(err.message || JSON.stringify(err));
            },
        });
    };

    const resetPassword = (event) => {
        event.preventDefault();

        const userData = {
            Username: username,
            Pool: userpool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess() {
                console.log("Password reset successfully.");
                setError("Password reset successful. Please Login.")
                setFormState("login");
            },
            onFailure(err) {
                console.error("Error resetting password", err);
                setError(err.message || JSON.stringify(err));
            },
        });
    };

    return (
        <div>
            <br></br>
            <h1 className="mt-5 mb-5" style={{ textAlign: "center" }}>
                Customer Login
            </h1>
            <div
                className="border container p-0 shadow-lg p-3 mb-5 bg-white rounded "
                style={{ display: "flex", justifyContent: "center" }}
            >
                <img
                    src={customer}
                    alt="customer missing"
                    className="rounded mx-auto d-block ml-10 mr-10 flex-left p-5"
                    height="400px"
                ></img>
                {/* <form className='container flex-right p-5 ' style={{alignSelf : "right"}} action='http://localhost:3000/customer' > */}
                {/* <form
                    className="container flex-right p-5 "
                    style={{ alignSelf: "right" }}
                    onSubmit={handleLogin}
                > */}
                {/* <form
                    className="container flex-right p-5 "
                    style={{ alignSelf: "right" }}
                    onSubmit={onSubmit}
                >
                    <div className="form-group">
                        <label className="mt-4">Username</label>
                        <input
                            type="text"
                            className="form-control mb-3"
                            id="exampleInputEmail1"
                            name="username"
                            aria-describedby="emailHelp"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label>Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p className="mt-2">{error}</p>
                        <button>Forgot Password?</button>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg mt-3"
                    >
                        Login
                    </button>
                </form> */}
                {formState === "login" && (
                    <form
                        className="container flex-right p-5"
                        style={{ alignSelf: "right" }}
                        onSubmit={onSubmit}
                    >
                        <div className="form-group">
                            <label className="mt-4">Username</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                onChange={(e) => setUsername(e.target.value)}
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
                            <button
                                type="button"
                                className="btn btn-link"
                                onClick={() => setFormState("forgotPassword")}
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg mt-3"
                        >
                            Login
                        </button>
                    </form>
                )}
                {formState === "forgotPassword" && (
                    <form
                        className="container flex-right p-5"
                        style={{ alignSelf: "right" }}
                        onSubmit={sendResetLink}
                    >
                        <div className="form-group">
                            <p>
                                An email verification code will
                                be sent to the email address linked with
                                your username. Kindly check both
                                your email inbox and spam folder for the
                                verification code.
                            </p>
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <p className="mt-2">{error}</p>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg mt-3"
                        >
                            Send Reset Link
                        </button>
                        <div></div>
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => setFormState("login")}
                        >
                            Back to Login
                        </button>
                    </form>
                )}
                {formState === "resetPassword" && (
                    <form
                        className="container flex-right p-5"
                        style={{ alignSelf: "right" }}
                        onSubmit={resetPassword}
                    >
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                className="form-control mb-3"
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <label>Verification Code</label>
                            <input
                                type="password"
                                className="form-control mb-3"
                                onChange={(e) =>
                                    setVerificationCode(e.target.value)
                                }
                                required
                            />
                            <p className="mt-2">{error}</p>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg mt-3"
                        >
                            Reset Password
                        </button>
                        <div></div>
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => setFormState("login")}
                        >
                            Back to Login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CustomerLogin;
