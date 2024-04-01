import React, {useState} from 'react';
import Pool from "../userpool";
import customer from '../images/customer.png';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import {useHistory} from 'react-router-dom';

const CustomerSignup = () => {

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [showConfirmationForm, setShowConfirmationForm] = useState(false);
    const [signUpError, setSignUpError] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();

        const attributeList = [];
          attributeList.push(
            new CognitoUserAttribute({  
                Name: 'email',
                Value: email,
            })
          );

          Pool.signUp(username, password, attributeList, null, (err, data) => {
            if (err) {
                console.error(err);
                console.log("error");
                setSignUpError(err.message || JSON.stringify(err));
            } else {
                console.log(data);
                setShowConfirmationForm(true);
            }
            
        });
    }

    const confirmSignUp = (event) => {

        event.preventDefault()

        const userData = {
            Username: username,
            Pool: Pool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
            if (err) {
                console.log("error")
                console.error(err);
                setSignUpError(err.message || JSON.stringify(err));
            } else {
                console.log(result)
                console.log('Registration confirmed');
                AddCustomer();
                history.push(`/customer/?username=${username}`);
            }
        });
    }

    const AddCustomer = async()=>{
        const name = username;
        const phone = 80904598;
        const house_no = 123456;
        const city = "SG";
        const zipcode = 1234;
        const body = {name,phone,email,house_no,city,zipcode,username,password};
        // const query = await fetch('http://localhost:5000/customer',{
        const query = await fetch(`http://54.255.229.9:5000/customer`,{
        // const query = await fetch(`https://qepipkmv82.execute-api.ap-southeast-1.amazonaws.com/v1/customer`,{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify(body)
        });
  
        console.log(query);
      };

    return (

        <div>
            <br></br>
            <h1 className="mt-5 mb-5" style={{textAlign : "center"}}>Customer Sign Up</h1>
            <div className="border container p-0 shadow-lg p-3 mb-5 bg-white rounded ">
                <div className='row'>
                    <img src={customer} alt="customer missing" className="rounded mx-auto d-block ml-10 mr-10 col p-5" height="500vh"></img>                
                    
                    {!showConfirmationForm && (
                    <form className='container col p-5 ' style={{alignSelf : "right"}}  onSubmit={onSubmit}>

                        {/* Display sign-up error message if sign-up fails */}
                        {signUpError && <p className='text-danger'>{signUpError}</p>}

                        <div className="form-group">
                            <label className="mt-4">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={(event) => setUsername(event.target.value)} 
                                required
                            />
                            <label className="mt-4">Email</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                aria-describedby="emailHelp" 
                                onChange={(event) => setEmail(event.target.value)} 
                                required
                            />
                            <label className="mt-4">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                onChange={(event) => setPassword(event.target.value)}  required
                            />

                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg my-4" 
                            >
                                Sign Up
                            </button>

                            <p>Already a Swift Bank user? <a href="/customer/login">Log In here</a></p>
                        </div>
                    </form>
                    )}
                

                    {/* Render confirmation form if showConfirmationForm is true */}
                    {showConfirmationForm && (
                        <form className='container col p-5' style={{alignSelf : "right"}}  onSubmit={confirmSignUp}>

                            {/* Display sign-up error message if sign-up fails */}
                            {signUpError && <p className='text-danger'>{signUpError}</p>}

                            <div className="container col form-group">
                                <label className="mt-4">Enter Confirmation Code</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="exampleInputConfirmation" 
                                    value={confirmationCode}
                                    onChange={(event) => setConfirmationCode(event.target.value)} 
                                    required
                                />
                                
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg mt-3"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default CustomerSignup;