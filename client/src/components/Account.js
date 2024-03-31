import React, { useState } from "react";
import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../userpool";
import Pool2 from "../employeeuserpool";
import { useHistory } from 'react-router-dom';

const AccountContext = createContext();

const Account = (props) => {

    const [session, setSession] = useState(null);

    const history = useHistory();

    // const getSession = async () => {
    //     return await new Promise((resolve, reject) => {
    //         const user = Pool.getCurrentUser();
    //         if (user) {
    //             user.getSession((err, session) => {
    //                 if (err) {
    //                     reject();
    //                 } else {
    //                     setSession(session);
    //                     resolve(session);
    //                 }
    //             });
    //         } else {
    //             reject();
    //         }
    //     });
    // };

    const getSessionFromPool = async (pool) => {
        return new Promise((resolve, reject) => {
            const user = pool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject(err);
                    } else {
                        setSession(session);
                        resolve(session);
                    }
                });
            } else {
                reject(new Error(`No user found in Pool`));
            }
        });
    };
    
    const getSession = async () => {
        try {
            return await getSessionFromPool(Pool);
        } catch (error) {
            console.log(`No user found in Pool 1. Trying with Pool2.`);
            try{
                return await getSessionFromPool(Pool2);
            }
            catch(error){
                console.log(`No user found in Pool 2.`);
            }
        }
    };

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool,
            });

            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess:", data);
                    resolve(data);
                    history.push(`/customer?username=${Username}`);
                },
                onFailure: (err) => {
                    console.log("onFailure:", err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired:", data);
                    resolve(data);
                },
            });
        });
    };

    const authenticateEmployee = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool: Pool2,
            });

            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess:", data);
                    resolve(data);
                    history.push(`/employee?username=${Username}`);
                },
                onFailure: (err) => {
                    console.log("onFailure:", err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired:", data);
                    resolve({ type: 'newPasswordRequired', data: user });
                },
            });
        });
    };

    // setSession(data);

    const logout = () => {
        const user = Pool.getCurrentUser();
        if(user) {
            user.signOut();
            history.push(`/customer/login`);
            history.go(0);
        }
    };

    const logoutEmployee = () => {
        const user = Pool2.getCurrentUser();
        if(user) {
            user.signOut();
            history.push(`/employee/login`);
            history.go(0);
        }
    };

    const getAccessToken = () => {
        if(session){
            return session.getAccessToken().getJwtToken()
        }
    }

    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout, getAccessToken, authenticateEmployee, logoutEmployee }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
