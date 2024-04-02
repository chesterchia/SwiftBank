import React,{useState, useEffect, useContext} from 'react';
import avatar from '../images/avatar.png';
import { AccountContext } from "./Account";
import { useHistory } from 'react-router-dom';

const CustomerControl = ()=>{

  const history = useHistory();

    const [id,setID] = useState('');
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [house_no,setHouse] = useState('');
    const [city,setCity] = useState('');
    const [zipcode,setZipCode] = useState('');
    const [username,setUsername] = useState('');
    const [MyAccounts,setAccounts] = useState([]);
    const [current_balance,setBalance] = useState('');
    const [Alltransaction,SetTransaction] = useState([]);
    const [jwtAccessToken, setJwtAccessToken] = useState(null);

    const { logout, getAccessToken } = useContext(AccountContext);

    // const accessToken = getAccessToken();

    const DeleteAccount = async(account_id)=>{
      try {
        const query = await fetch(`https://qepipkmv82.execute-api.ap-southeast-1.amazonaws.com/v1/accounts/${account_id}`,{
        // const query = await fetch(`http://localhost:5000/${account_id}`,{
          method : 'DELETE',
          headers : {'Authorization' : jwtAccessToken}
        });
        console.log(query);
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    };
    const AddAccount = async()=>{
      const customer_id = document.getElementById('customer_id_value').value;
      const body = {customer_id,current_balance};
      const query = await fetch('https://qepipkmv82.execute-api.ap-southeast-1.amazonaws.com/v1/accounts',{
      // const query = await fetch('http://localhost:5000/accounts',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json' , 'Authorization' : jwtAccessToken},
        body : JSON.stringify(body)
      });
      window.location.reload();

      console.log(query);
    };
    const GetAccountDetails = async()=>{
      try {
        const query = await fetch(`https://qepipkmv82.execute-api.ap-southeast-1.amazonaws.com/v1/accounts/${id}`, {
          headers : {'Authorization' : jwtAccessToken}
        });
        // const query = await fetch(`http://localhost:5000/accounts/${id}`);

        const data = await query.json();
        setAccounts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    const GetTransactions = async()=>{
      try {
        const customer_id = document.getElementById('customer_id_value').value;
        const query = await fetch(`https://qepipkmv82.execute-api.ap-southeast-1.amazonaws.com/v1/transaction/${customer_id}` , {
            headers : {'Authorization' : jwtAccessToken}
          });
        // const query = await fetch(`http://localhost:5000/transaction/${customer_id}`);
        const data = await query.json();
        console.log(data)
        SetTransaction(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    const GoTransactions = async(account_id)=>{
      history.push(`/customer/transaction?account_no=${account_id}`);
    };
    const GetCustomer = async(accessToken)=>{
        try {
            const parameters = window.location.search.substring(1).split("&");
            const temp = parameters[0].split("=");
            console.log(parameters);
            console.log(temp);
            const username = temp[1];
            // const query = await fetch(`http://54.255.229.9:5000/customer/${username}`, {
              // headers : {'Authorization' : accessToken}
            // });
            console.log("HERE: " + accessToken);
            const query = await fetch(`https://qepipkmv82.execute-api.ap-southeast-1.amazonaws.com/v1/customer/${username}`, {
              headers : {'Authorization' : accessToken}
            });
            const data = await query.json();
            console.log(data);
            setID(data['customer_id']);
            setName(data['name']);
            setPhone(data['phone']);
            setEmail(data['email']);
            setHouse(data['house_no']);
            setCity(data['city']);
            setZipCode(data['zipcode']);
            setUsername(username);
            localStorage.setItem('username', username);
            localStorage.setItem('customer_id', data['customer_id'])
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        // Accessing Token
        const accessToken = getAccessToken();
        console.log("ADDDD")
        if(accessToken){
          setJwtAccessToken(accessToken);
          GetCustomer(accessToken);
        }
        // eslint-disable-next-line
      },[]);

    return (
<div>
    <div className='border p-5' style={{backgroundColor : '#006d77'}}>
    <button class="btn btn-success ml-3" onClick={logout} type="button" data-toggle="collapse" data-target="#alltransaction" aria-expanded="false" aria-controls="collapseExample">
    Logout
  </button>
    <h1 className='mt-5' style={{textAlign : 'center', color : '#e5e5e5'}}>Customer Details</h1>
    <hr style={{color : '#FFFFFF'}}></hr>
    <img src={avatar} alt='missing avatar' className='rounded mx-auto d-block'></img>
    <h3 className='mt-5' style={{textAlign : 'center', color : '#e5e5e5'}}>username@{username}</h3>
    </div>
<div className='container border mt-5 p-5' >
<h2>Personal Details</h2>
<div className="input-group mb-3 mt-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">customerid@</span>
  </div>
  <input type="text" value={id} className="form-control" placeholder="id" aria-label="Username" aria-describedby="basic-addon1" readOnly/>
</div>
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">name@</span>
  </div>
  <input type="text" value={name} className="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" readOnly/>
</div>
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">phone@</span>
  </div>
  <input type="text" value={phone} className="form-control" placeholder="id" aria-label="Username" aria-describedby="basic-addon1" readOnly/>
</div>
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">email@</span>
  </div>
  <input type="text" value={email} className="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" readOnly/>
</div>
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">house@</span>
  </div>
  <input type="text" value={house_no} className="form-control" placeholder="id" aria-label="Username" aria-describedby="basic-addon1" readOnly/>
</div>
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">city@</span>
  </div>
  <input type="text" value={city} className="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" readOnly/>
</div>
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">zipcode@</span>
  </div>
  <input type="text" value={zipcode} className="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" readOnly/>
</div>
<hr></hr>
<button className='btn btn-outline-info'data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"> Create Account</button>

<button class="btn btn-outline-primary ml-3" type="button" data-toggle="collapse" data-target="#AccountDetails" aria-expanded="false" aria-controls="collapseExample" onClick={GetAccountDetails}>
    Get Account Details
  </button>

  <button class="btn btn-success ml-3" onClick={GetTransactions} type="button" data-toggle="collapse" data-target="#alltransaction" aria-expanded="false" aria-controls="collapseExample">
    View Transactions
  </button>

<div className="collapse" id="collapseExample">
  <div className="form-group shadow p-3 mb-5 bg-white rounded mt-3">
    <label>Customer Id</label>
    <input type="text" value={id} className="form-control mb-3" id="customer_id_value" name="username" aria-describedby="emailHelp" disabled  required/>
    <label >Balance</label>
    <input type="text" className="form-control" id="exampleInputPassword1" onChange = {e=> setBalance(e.target.value)}  required/>
      
  <button className="btn btn-primary btn-lg mt-3" onClick={AddAccount}>Add</button>
  </div>
</div>

<div class="collapse" id="alltransaction">
  <div class="card card-body">
    Your Transactions
    <table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Account ID</th>
      <th scope="col">Action</th>
      <th scope="col">Amount</th>
      <th scope="col">Branch ID</th>
      <th scope="col">Date of Transaction</th>
    </tr>
  </thead>
  <tbody>
    {Alltransaction.map (t=>(
      <tr key={t.transaction_id}>
      <td>{t.transaction_id}</td>
      <td>{t.account_id}</td>
      <td>{t.action}</td>
      <td>{t.amount}</td>
      <td>{t.branch_id}</td>
      <td>{t.date_of_transaction}</td></tr>
    ))}
  </tbody>
</table>
  </div>
</div>
  

{MyAccounts.map(account => (
<form>
<div className="card shadow-lg p-3 mb-5 bg-white rounded collapse" id="AccountDetails" key={`${account.customer_id}-${account.account_id}`}>

<hr className='mt-5'></hr>
<h1 style={{textAlign : 'left'}}>Savings Account</h1>
<hr></hr>
  <div className="card-header">
    Account #{MyAccounts.indexOf(account)+1}
  </div>
  <div className="card-body">
    <div className="input-group mb-3">
     <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon3">@account no</span>
     </div>
     <input type="text" value={account.account_id} name='account_no' className="form-control" aria-describedby="basic-addon3" readOnly/>
    </div>

  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">₹</span>
    </div>
    <input type="text" value={account.current_balance} className="form-control" aria-label="Amount (to the nearest dollar)" readOnly/>
    <div className="input-group-append">
    </div>
  </div>

  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">Date Opened</span>
    </div>
    <input type="text" value={account.date_opened.substring(0,10) + ' '+ account.date_opened.substring(11,16)} className="form-control" aria-label="Amount (to the nearest dollar)" readOnly/>
    <div className="input-group-append">
    </div>
  </div>
  <button className='btn btn-info' type='submit' onClick={()=>GoTransactions(account.account_id)}>Make Transaction</button>
  <button className='btn btn-danger ml-3' onClick={()=>DeleteAccount(account.account_id)}>Delete</button>
</div>
</div>
</form>
))}

</div>

</div>
    
)};

export default CustomerControl;