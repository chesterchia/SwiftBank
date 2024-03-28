import React from 'react';
import customer from '../images/customer.png';
import employee from '../images/employee.png';
import {useHistory} from 'react-router-dom';
const LoginPage = ()=>{
    const history = useHistory();

    return(
<div className="container p-5 mt-4"  style={{  justifyContent:'center', alignItems:'center', height: '100vh' ,textAlign : 'center', backgroundColor : '#edf2f4'}}>
<h1 style={{textAlign : "center"}}>Welcome to Bank management sytem!!</h1>
<table className="table">
  <tbody>
    <tr>
      <td>
        <div className="card text-black bg-white mt-3 shadow-lg p-3 mb-5 bg-white rounded">
  <div className="">
    <h3 className="float-left">Customer</h3>
    <button className="btn btn-outline-success float-right" height="100px" onClick = {()=>history.push('/customer/login')}>Login</button>
    </div>
  <div className="card-body pd-5">
    <img src={customer} alt="customer not found" height="300px" className="rounded mx-auto d-block mt-4" />
  </div>
</div>
</td>
<td>
        <div className="card text-black bg-white mt-3 shadow-lg p-3 mb-5 bg-white rounded">
  <div className="">
    <h3 className="float-left">Employee</h3>
    <button className="btn btn-outline-success float-right" height="100px" onClick = {()=>history.push('/employee/login')}>Login</button>
    </div>
  <div className="card-body pd-5">
    <img src={employee} alt="employee not found" height="300px" className="rounded mx-auto d-block mt-4" />
  </div>
</div>
</td>

    </tr>

  </tbody>
</table>
</div>
    );
};

export default LoginPage;


// import React from 'react';
// // import { useHistory } from 'react-router-dom';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// // import { GoogleLogin } from '@react-oauth/google';
// import { gapi } from "gapi-script";
// import AWS from 'aws-sdk';

// const LoginPage = () => {
//     // const history = useHistory();

//     gapi.load("client:auth2", () => {
//         gapi.client.init({
//           clientId:
//             "236370254395-bvbket4pc9l3n1ke3cnnqqcbq7oqm9f6.apps.googleusercontent.com",
//           plugin_name: "chat",
//         });
//     });


//     const responseGoogle = (response) => {
//         console.log(response);
//         credentialExchange(response.tokenObj);
//     }

//     const onLogoutSuccess = () => {
//         console.log('SUCESS LOG OUT');
//     };

//     const credentialExchange = (googleToken) => {
//         const googleTokenDecoded = parseJwt(googleToken.id_token);

//         console.log("ID: " + googleTokenDecoded.sub);
//         console.log('Full Name: ' + googleTokenDecoded.name);
//         console.log("Email: " + googleTokenDecoded.email);

//         if (googleTokenDecoded['sub']) {
//             AWS.config.region = 'ap-southeast-1';
//             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//                 IdentityPoolId: 'ap-southeast-1:8b70a91c-f8fe-4644-baa1-a22e486fa42e',
//                 Logins: {
//                     'accounts.google.com': googleToken.id_token
//                 }
//             });

//             AWS.config.credentials.get(function(err) {
//                 if (!err) {
//                     console.log(AWS.config.credentials)
//                     console.log('Exchanged to Cognito Identity Id: ' + AWS.config.credentials.identityId);
//                     // if we are here, things are working as they should...
//                 } else {
//                     document.getElementById('output').innerHTML = "<b>YOU ARE NOT AUTHORISED TO QUERY AWS!</b>";
//                     console.log('ERROR: ' + err);
//                 }
//             });
//         } else {
//             console.log('User not logged in!');
//         }
//     }

//     const parseJwt = (token) => {
//         var base64Url = token.split('.')[1];
//         var base64 = base64Url.replace('-', '+').replace('_', '/');
//         var plain_token = JSON.parse(window.atob(base64));
//         return plain_token;
//     };

//     return (
//         <div className="container p-5 mt-4" style={{ justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', backgroundColor: '#edf2f4' }}>
//             <h1 style={{ textAlign: "center" }}>Welcome to Bank management system!!</h1>
//             {/* <table className="table">
//                 <tbody>
//                     <tr>
//                         <td>
//                             <div className="card text-black bg-white mt-3 shadow-lg p-3 mb-5 bg-white rounded">
//                                 <div className="">
//                                     <h3 className="float-left">Customer</h3>
//                                     <button className="btn btn-outline-success float-right" height="100px" onClick={() => history.push('/customer/login')}>Login</button>
//                                 </div>
//                                 <div className="card-body pd-5">
//                                     <img src={customer} alt="customer not found" height="300px" className="rounded mx-auto d-block mt-4" />
//                                 </div>
//                             </div>
//                         </td>
//                         <td>
//                             <div className="card text-black bg-white mt-3 shadow-lg p-3 mb-5 bg-white rounded">
//                                 <div className="">
//                                     <h3 className="float-left">Employee</h3>
//                                     <button className="btn btn-outline-success float-right" height="100px" onClick={() => history.push('/employee/login')}>Login</button>
//                                 </div>
//                                 <div className="card-body pd-5">
//                                     <img src={employee} alt="employee not found" height="300px" className="rounded mx-auto d-block mt-4" />
//                                 </div>
//                             </div>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table> */}
//             <div>
//                 <GoogleLogin
//                     clientId="236370254395-bvbket4pc9l3n1ke3cnnqqcbq7oqm9f6.apps.googleusercontent.com"
//                     buttonText="Login with Google"
//                     onSuccess={responseGoogle}
//                     onFailure={responseGoogle}
//                     cookiePolicy={'single_host_origin'}
//                 />
//             </div>
//             <div>
//                 <GoogleLogout
//                     clientId="236370254395-bvbket4pc9l3n1ke3cnnqqcbq7oqm9f6.apps.googleusercontent.com"
//                     buttonText="Logout"
//                     onLogoutSuccess={onLogoutSuccess}
//                     cookiePolicy={'single_host_origin'}
//                 />
//             </div>
//             <div id="output"></div>
//         </div>
//     );
// };

// export default LoginPage;

