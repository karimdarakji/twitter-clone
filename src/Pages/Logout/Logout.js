import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'

import { getLocalStorage } from '../../storage'

export const Logout = (props) => {

    const logout = () => {
        axios.get("http://localhost:5000/register/logout", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${getLocalStorage('ui').token}`
            }
          }).then(response => {
            if (response.data.success) {
              localStorage.clear()
              props.history.go()
            }
             else if(response.success) {
              localStorage.clear()
              props.history.go()
            } 
        })
    }

    return (
        <div>
            <Button onClick={logout} >Logout</Button>
        </div>
    )
}
