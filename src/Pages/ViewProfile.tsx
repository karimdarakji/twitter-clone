import React from "react";
import moment from "moment";

import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { BiCake } from "react-icons/bi";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import "../Styles/profile.scss";

function Profile() {
  // const [value, setValue] = React.useState('1');

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const birth = moment(new Date(userInfo.birth))
  // const created = moment( new Date(userInfo.createdAt) )

  /* const toggleTab = (index) => {
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
    }  */
  return (
    <div id="UserProfile">
      {/* <div className="cover">
          
          </div>

          <div>
            <div className="profile-pic" style={{backgroundImage: `url("${picture}")`}}></div>

            <div className="edit-profile">
              <a className="edit-btn" href="/"> Edit profile</a>
            </div>
          
          </div>

          <div className="user-info">
            <div className="name">{userInfo.name}</div>
            <div className="username">@{userInfo.username}</div>

            <div className="d-flex">
              <IoLocationOutline className="ic"/>
              <span className="info">Lebanon</span>

              <BiCake className="ic"/>
              <span className="info">Born {birth.format('LL')}</span>

              <IoCalendarOutline className="ic"/>
              <span className="info">Joined {created.format('MMMM YYYY')}</span>

            </div>

            <div className="fl">

              <div className="following">
                <span className="fn">26 </span> Following
              </div>

              <div className="following">
                <span className="fn">23 </span> Followers
              </div>

            </div>
          </div>

          <div className="mui-tabs">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                  <Tab label="Tweets" value="1" />
                  <Tab label="Tweets & Replies" value="2" />
                  <Tab label="Media" value="3" />
                  <Tab label="Likes" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">Item One</TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
              <TabPanel value="4">Item four</TabPanel>
            </TabContext>
          </Box>
          </div> */}
    </div>
  );
}

export default Profile;
