import React,{useState, useEffect, useContext} from 'react';
import { AccountContext } from "./Account";

const DisplayBranch = () =>{
    const [AllBranches,setBranches] = useState([]);

    const [jwtAccessToken, setJwtAccessToken] = useState(null);


    const { getAccessToken } = useContext(AccountContext);

    const GetBranches = async(accessToken) =>{
        try {
            const query = await fetch('https://qepipkmv82.execute-api.ap-southeast-1.amazonaws.com/v1/branch',{
                method : 'GET',
                headers : {'Authorization' : accessToken}
            });
            const data = await query.json();
            setBranches(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(()=>{
      const accessToken = getAccessToken();
      console.log("ADDDD")
      if(accessToken){
        setJwtAccessToken(accessToken);
        GetBranches(accessToken);
      }
    },[]);
    return (
      <div class='mt-5'> 
          <h1 style = {{textAlign : 'center'}}>All Branches</h1>
           <table class="table container mt-5">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Branch Name</th>
            <th scope="col">House number</th>
            <th scope="col">City</th>
            <th scope="col">Zip code</th>
          </tr>
        </thead>
        <tbody>
          {AllBranches.map (branch=>(
            <tr key = {branch.branch_id}>
                <td>{branch.branch_id}</td>
                <td>{branch.name}</td>
                <td>{branch.house_no}</td>
                <td>{branch.city}</td>
                <td>{branch.zip_code}</td> 
            </tr>
          ))};
        </tbody>
      </table>
      
      </div>
    );
};

export default DisplayBranch;