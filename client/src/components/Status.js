import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AccountContext } from "./Account";
import { useHistory, useLocation } from 'react-router-dom';

const Status = (props) => {
    const [status, setStatus] = useState(false);

    const { getSession } = useContext(AccountContext);
    const history = useHistory();
    const location = useLocation();
    const publicPaths = ['/customer/login', '/customer/signup', '/employee/login', '/'];
    // const isLoginPage = location.pathname === '/customer/login';

    useEffect(() => {

        getSession().then((session) => {
            const username = session.getIdToken().payload['cognito:username'] || session.getIdToken().payload.username;
            
            if (publicPaths.includes(location.pathname)) {
                console.log(username)
                history.push(`/customer/?username=${username}`);
            } else {
                setStatus(true);
            }
        }).catch(() => {
            if (!publicPaths.includes(location.pathname)) {
                history.push('/');
            }
        });

    }, []);

    return<>
    {props.children}</>
};

export default Status;