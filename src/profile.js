import Header from './Components/Header/Header';
import {useEffect, useState} from 'react';
function Profile() {
    
    const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };



    let user = JSON.parse(localStorage.getItem('user-info'))
    const [file,setFile]=useState("");
    const [data,setData] = useState([]);
    const [datalikes,setDatalikes] = useState([]);
    const [datacomments,setDatacomments] = useState([]);


    useEffect( ()=>{
       // getlike();
       // getuser_notfollowed();
       getowntweets();
    },[])


   async function uploadprofile(){
        console.warn(file);
        const formData = new FormData();
        formData.append('file',file);
        formData.append('email',user.email);
        let result = await fetch("http://localhost:8000/api/uploadProfileImage",{
            method: 'POST',
            body: formData
        });
        alert("Profile picture has been updated!");
    }

    async function getowntweets()
    {
        let result2 = await fetch("http://localhost:8000/api/getowntweets/"+user.id);
        result2 = await result2.json();
        setData(result2);
    }
    async function getownlikes()
    {
        let result2 = await fetch("http://localhost:8000/api/getownlikes/"+user.id);
        result2 = await result2.json();
        setDatalikes(result2);
    }
    async function getowncomments()
    {
        let result2 = await fetch("http://localhost:8000/api/getowncomments/"+user.id);
        result2 = await result2.json();
        setDatacomments(result2);
    }
    return(
        
        <div>
            <Header />
            <div style={{marginTop:10}}>
            <h5 >{user.name}'s Profile</h5>
            
                <img src={"http://localhost:8000/"+user.profile_picture} width="150" height="150" style={{borderRadius:70}}/>
            
            <br/>
            <input style={{marginTop:40}} type="file" className="form" placeholder="file" onChange={(e)=>setFile(e.target.files[0])}/>
            <br/>
            <button style={{marginTop:20}} onClick={uploadprofile} className="btn btn-primary">Upload Profile Image</button>
            </div>


            <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Tweets
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => {toggleTab(2);getowncomments()}}
        >
          Replies
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => {toggleTab(3);getownlikes()}}
        >
          Likes
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          {
                    data.map((item)=>
                    <div>
                 <img src={"http://localhost:8000/"+user.profile_picture} width="30" height="30" style={{borderRadius:10}}/>
                 <span style={{fontWeight:'bold', marginLeft:5}}>{item.name}</span>
          <p>{item.text}
            
          </p>
          <hr/>
          </div>
                    )}
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          
          {
                    datacomments.map((item)=>
                    <div>
                 <img src={"http://localhost:8000/"+item.picture} width="30" height="30" style={{borderRadius:10}}/>
                 <span style={{fontWeight:'bold', marginLeft:5}}>{item.name}</span>
          <p>{item.text}
            
          </p>
          <hr/>
          </div>
                    )}
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          
          {
                    datalikes.map((item)=>
                    <div>
                 <img src={"http://localhost:8000/"+item.picture} width="30" height="30" style={{borderRadius:10}}/>
                 <span style={{fontWeight:'bold', marginLeft:5}}>{item.name}</span>
          <p>{item.text}
            
          </p>
          <hr/>
          </div>
                    )}
        </div>
      </div>
    </div>
        </div>
    )
}

export default Profile;