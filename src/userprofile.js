import Header from './Components/Header/Header';
import {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import { useAccordionToggle } from 'react-bootstrap';

let user = JSON.parse(localStorage.getItem('user-info'));


function Userprofile(props) {

 const name = props.match.params.name;
 const fake = [{senderid: user.id, receiverid: props.match.params.id, following: false}];
//const isfake = [{senderid: user.id, receiverid: props.match.params.id, following: true}];

 // console.warn(fake);
 const [data,setData]=useState([]);
 const [isFollowed,setisFollowed]=useState(fake);
 useEffect( ()=> {
   getuser();

    check();
    
 },[])
 async function getuser()
 {
    let result = await fetch("http://localhost:8000/api/getuser/"+props.match.params.id);
    result = await result.json();
    setData(result);
 }
 async function follow()
 {
    
    let result = await fetch("http://localhost:8000/api/follow/"+user.id+"/"+props.match.params.id,{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
        }
    })
  //  setisFollowed(true);
check();
 }
 async function check()
 {
    let result2 = await fetch("http://localhost:8000/api/check/"+user.id+"/"+props.match.params.id);
    result2 = await result2.json();
    if (result2.sender_id == user.id && result2.receiver_id == props.match.params.id)
    {
        setisFollowed({following:true});
        
    }
    else setisFollowed({following:false});
 }
 async function unfollow()
 {
    let result = await fetch("http://localhost:8000/api/unfollow/"+user.id+"/"+props.match.params.id,{
        method:'DELETE'  
});
result = await result.json();
//console.warn(result);
check();
 }
 
    return(
        
        <div>
            <Header />
            <div style={{marginTop:10}}>
            <h5 >{data.name}'s Profile</h5>
            
                <img src={"http://localhost:8000/"+data.profile_picture} width="150" height="150" style={{borderRadius:70}}/>
            
            <br/>
            <div style={{marginTop:10}}>
                { isFollowed.following == true ?
                            <button onClick={unfollow} class="btn btn-primary">Following</button>
                 :
            <button onClick={follow} class="btn btn-primary">Follow</button>
                }
            </div>
            </div>
        </div>
    )
}

export default withRouter(Userprofile);