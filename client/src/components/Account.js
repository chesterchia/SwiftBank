import React, { useState } from "react";
import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../userpool";
import { useHistory } from 'react-router-dom';

const AccountContext = createContext();

const Account = (props) => {

    const [session, setSession] = useState(null);

    const history = useHistory();

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        setSession(session);
                        resolve(session);
                    }
                });
            } else {
                reject();
            }
        });
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
                    history.push(`/customer/?username=${Username}`);
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

    const logout = () => {
        const user = Pool.getCurrentUser();
        if(user) {
            user.signOut();
            history.push(`/customer/login`);
        }
    };

    const getAccessToken = () => {
        if(session){
            return session.getAccessToken().getJwtToken()
        }
    }

    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout, getAccessToken }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
