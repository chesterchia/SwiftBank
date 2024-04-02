import React,{useState, useEffect, useContext} from 'react';
import { AccountContext } from "./Account";
import { useHistory } from 'react-router-dom';

const FormTransaction = ()=>{
    const history = useHistory();

    const [account_id,SetAccid] = useState('');
    const [branch_id,SetBrid] = useState('');
    const [amount,SetAmt] = useState('');
    const [jwtAccessToken, setJwtAccessToken] = useState(null);

    const { getAccessToken } = useContext(AccountContext);

    const GetAccountID = ()=>{
        const parameters = window.location.search.substring(1).split("&");
        const temp = parameters[0].split("=");
        SetAccid(temp[1]);
    };

    useEffect(()=>{
        const accessToken = getAccessToken();
        // console.log("ADDDD")
        if(accessToken){
          setJwtAccessToken(accessToken);
        }
        GetAccountID();
    },[]);

    const DoTransaction = (event)=>{
        event.preventDefault();
        const action = document.getElementById('inputState').value;
        const customer_id = localStorage.getItem('customer_id');
        try {
            const body = {customer_id, account_id,branch_id,amount,action};
            const query = fetch ('https://qepipkmv82.execute-api.ap-southeast-1.amazonaws.com/v1/transaction',{
                method : 'POST',
                headers : {'Content-Type':'application/json', 'Authorization' : jwtAccessToken},
                body : JSON.stringify(body)
            });
            console.log(body);
            handleCancel();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        history.push('/customer?username='+localStorage.getItem('username'));
    };

    return(
    <form className='mt-5 jumbotron'>
    <h1>Transaction</h1>
        <hr></hr>
    <div className="form-group">
    <label>Account ID</label>
    <input type="text" className="form-control" id="exampleInputEmail1" value={account_id} disabled required />
    <label >Branch ID</label>
    <input type="text" className="form-control" onChange={e=>SetBrid(e.target.value)} required/>
    <label >Amount</label>
    <input type="text" className="form-control" onChange={e=>SetAmt(e.target.value)} required/>
    <label >Action</label>
    <select id="inputState" class="form-control">
        <option selected>Deposit</option>
      </select>
    </div>

    <button type="submit" className="btn btn-danger mr-3" onClick={handleCancel}>Cancel</button>    
    <button type="submit" className="btn btn-primary" onClick={DoTransaction}>Add</button>
    </form>
  );  
};

export default FormTransaction;