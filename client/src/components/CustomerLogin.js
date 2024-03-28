import React, { useState, useContext } from "react";
import customer from "../images/customer.png";
import { AccountContext } from "./Account";

const CustomerLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {authenticate} = useContext(AccountContext);

    const onSubmit = (event) => {
      event.preventDefault();

      authenticate(username, password).then(data => {
        console.log("Logged in!", data);
      })
      .catch(err => {
        console.error("Failed to login", err);
        setError(err.message);
      })
    }

    return (
        <div>
            <br></br>
            <h1 className="mt-5 mb-5" style={{ textAlign: "center" }}>
                Customer Login
            </h1>
            <div
                className="border container p-0 shadow-lg p-3 mb-5 bg-white rounded"
                style={{ justifyContent: "center" }}
            >
                <div className="row">
                    <img
                        src={customer}
                        alt="customer missing"
                        className="rounded mx-auto d-block ml-10 mr-10 col p-5"
                        height="500vh"
                    ></img>
                    {/* <form
                        className="container col p-5 "
                        style={{ alignSelf: "right" }}
                        onSubmit={onSubmit}
                    > */}
                        <div className="container col p-5 form-group">
                            <label className="mt-4">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                name="username"
                                aria-describedby="emailHelp"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label className="mt-4">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className="mt-2">{error}</p>
                            <a>Forgot Password?</a>
                            <br></br>
                            <button
                            type="submit"
                            className="btn btn-primary btn-lg my-3"
                            onClick={onSubmit}
                        >
                            Login
                        </button>
                        <p>New to Swift Bank? <a href="/customer/signup">Sign Up here</a></p>
                        </div>

                    {/* </form> */}
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
