import Header from './Components/Header/Header';
import {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
function Search() {
    let user = JSON.parse(localStorage.getItem('user-info'));

    const [data,setData]=useState([]);

    async function search(key)
    {
        let result = await fetch("http://localhost:8000/api/searchtweet/"+key);
        result = await result.json();
        setData(result);
    }

    return (
        <div>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
            <h1>Search</h1>
            <br />
            <input type="text" onChange={(e)=>search(e.target.value)} className="form-control" placeholder="Search tweets"/>
          <br />
           <div> 
               {
                    data.map((item)=>
                    <div>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        { user.name == item.name ?
                        <Link to="/profile">
                            <img src={"http://localhost:8000/"+item.picture} width="30" height="30" style={{borderRadius:10}}/>
                    </Link>
                            :
                    <Link to={"userprofile/"+item.tweet_id}>
                    <img src={"http://localhost:8000/"+item.picture} width="30" height="30" style={{borderRadius:10}}/>
                    </Link>
                      }
                    <p style={{marginLeft:10,fontWeight:'bold'}}>{item.name}</p>
                   
                     <br/>
                    </div>
                    <div style={{//border:'1px solid lightgrey',
                    width:'30%',margin:'auto',borderRadius:7}}>
                    <p style={{marginLeft:10}}>{item.text}</p>
                    </div>
                    <br/>
                    <hr/>
                    </div>
                    
                    )
                }
                    </div>
        </div>
        </div>
    )
}

export default Search;