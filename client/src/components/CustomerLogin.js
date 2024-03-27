import React from 'react';
import customer from '../images/customer.png';
import {useHistory} from 'react-router-dom';

const CustomerLogin = ()=>{
  const history = useHistory();

  const handleLogin = () => {
    const username = document.getElementById('exampleInputEmail1').value;
    history.push(`/customer/?username=${username}`);
  };

    return (
<div>
    <br></br>
<h1 className="mt-5 mb-5" style={{textAlign : "center"}}>Customer Login</h1>
<div className="border container p-0 shadow-lg p-3 mb-5 bg-white rounded "  style={{display: 'flex',  justifyContent:'center'}}>
    <img src={customer} alt="customer missing" className="rounded mx-auto d-block ml-10 mr-10 flex-left p-5" height="400px"></img>
    <div className='container flex-right p-5' style={{ alignSelf: "right" }}>
      <div className="form-group">
        <label className="mt-4">Username</label>
        <input type="text" className="form-control mb-3" id="exampleInputEmail1" name="username" aria-describedby="emailHelp"  required/>
        <label >Password</label>
        <input type="text" className="form-control" id="exampleInputPassword1"   required/>
      </div>

      <button type="submit" className="btn btn-primary btn-lg mt-3" onClick={handleLogin}>Login</button>
    </div>  
</div>
</div>
    );
};

export default CustomerLogin;