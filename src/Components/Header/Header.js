import { Navbar } from 'react-bootstrap';

import '../../App.css'
export default function Header(props){
  
  return(
        <div className="header">
        <Navbar >
        <Navbar.Brand href="/home"><span style={{fontWeight:'bold'}}>Home</span></Navbar.Brand>
      </Navbar>
      </div>
    )
}
