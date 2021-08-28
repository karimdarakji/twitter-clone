import React, {useState} from 'react'
import welcome from './welcome.png'
import './App.css'
import logo from './logo.png'
import { Button, } from 'react-bootstrap'
import SignupModal from './Components/SignupModal/SignupModal'

export default function Welcome(props) {

    const [showModal, setShowModal] = useState(false)

    const togglemodal = () => {
        setShowModal(!showModal)
    }

    return (
        <>
        
        <div className="body_t" style={{height:'90vh'}}>
        <div className="col-lg-6" >
        <img src={welcome} alt="" style={{width:'100%', height:'100%'}} />
        </div>
        <div className="col-lg-6 w-100 row" style={{paddingLeft:'3%',paddingTop:'5%',textAlign:'initial'}}>
            <div className="w-100">
        <img src={logo} alt='' width={90} />
         </div>
         <div className="w-100 mt-5">
         <h2 style={{fontSize:'60px', fontWeight:'bold'}}>Happening now</h2>
         </div>
         <div className="w-100 mt-5">
         <h2 style={{fontSize:'45px', fontWeight:'bold'}}>Join Twitter today.</h2>
         </div>
         <div className=" mt-5">
         <Button className="d-block py-3" style={{background:'#1da1f2', width:'400px',fontWeight:'bold', borderRadius:'30px'}} onClick={() => setShowModal(true)}>Sign up</Button>
         <Button className="mt-4 py-3"  style={{background:'transparent',color:'#1da1f2' ,width:'400px', fontWeight:'bold', borderRadius:'30px'}} onClick={() => props.history.push('/login')}>Log in</Button>
         </div>
        </div>
        </div>
        <div className="w-100 px-5 footer_info mt-3" style={{textAlign:'center'}}>
        <span className="">About </span><span className="ml-2">Help Center</span>
        <span className="ml-2">Terms of Service</span>
        <span className="ml-2">Privacy Policy</span>
        <span className="ml-2">Cookie Policy</span>
        <span className="ml-2">Ads info</span>
        <span className="ml-2">Blog</span>
        <span className="ml-2">Status</span>
        <span className="ml-2">Careers</span>
        <span className="ml-2">Brand Resources</span>
        <span className="ml-2">Advertising</span>
        <span className="ml-2">Marketing</span>
        </div>
        <div className="w-100 footer_info" style={{textAlign:'center'}}>
        <span className="ml-2">Twitter for Business</span>
        <span className="ml-2">Developers</span>
        <span className="ml-2">Directory</span>
        <span className="ml-2">Settings</span>
        <span className="ml-2">@ 2021 Twitter, Inc.</span>
        </div>



        <SignupModal
        show={showModal}
        onHide={() => togglemodal()}
        />
        </>
    )
}
