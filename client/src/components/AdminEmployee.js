import React,{useState, useEffect, useContext} from 'react';
import { AccountContext } from "./Account";

const PostEmployee = ()=>{
  const [AllEmployee, setEmployees] = useState([]);
  const [username,setUsername] = useState('');
  const [user_password,setPassword] = useState('');

  const [jwtAccessToken, setJwtAccessToken] = useState(null);


  const { getAccessToken } = useContext(AccountContext);


  const DeleteEmp= async (username) => {
    try {
        const delete_emp = await fetch(`https://backendapis.swiftbank.tech/employee/${username}`,{
            method : "DELETE"
        });
        console.log(delete_emp);
        setEmployees(AllEmployee.filter(emp => emp.username!==username));
    } catch (error) {
        console.log(error);
    }
};
  const AddEmployee = async()=> {
    try {
      const body = {username,user_password};
      const query = fetch('https://backendapis.swiftbank.tech/employee',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(body)
      });
      console.log(query);
    } catch (error) {
      console.log(error);
    }
  };
  const GetEmployees = async(accessToken)=> {
    try {
      const query = await fetch('https://backendapis.swiftbank.tech/employee', {
        headers : {'Authorization' : accessToken}
      });
      const data = await query.json();
      setEmployees(data);
      console.log(data);
  } catch (error) {
      console.log(error);
  }
  };

  useEffect(()=>{
    const accessToken = getAccessToken();
    console.log("ADDDD")
    if(accessToken){
      setJwtAccessToken(accessToken);
      GetEmployees(accessToken);
    }
},[]);
    return (
        <div className='container'>
        <form className='mt-5 jumbotron' onSubmit={AddEmployee}>
        <h1>Add Employee</h1>
            <hr></hr>
  <div className="form-group">
    <label>Username</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange ={e=> setUsername(e.target.value)}  required/>
    <label >Password</label>
    <input type="text" className="form-control" id="exampleInputPassword1" onChange ={e=> setPassword(e.target.value)}  required/>
  </div>

  <button type="submit" className="btn btn-primary">Add</button>
</form>

<div className='container p-3'>
<h1 style={{textAlign : 'center'}}>All Employees</h1>
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {AllEmployee.map(emp => (
          <tr key={emp.username}>
            <td>{AllEmployee.indexOf(emp)+1}</td>
            <td>{emp.username}</td>
            <td><button className='btn btn-danger' onClick = {()=>DeleteEmp(emp.username)} >Delete</button></td>

          </tr>
      ))}
  </tbody>
</table>
</div>
</div>
    );
};

export default PostEmployee;
