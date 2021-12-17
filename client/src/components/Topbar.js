import {React, useState, useContext} from 'react'
import UserContext from '../context/UserContext'

const Topbar = () => {

    const {userInfo, setUserInfo} = useContext(UserContext)
    const [ isActive, setIsActive ] = useState(false)

    const toggle = () => {
        if(!isActive){
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

   return(

       <div>
           <nav className="navbar has-shadow is-fixed-top">
           
               <div className="navbar-brand">
             
                   <div className="theme">
                   <a 
                    href="/"
                    className="navbar-item px-0">
                       <img src="./metagood.png" alt="site logo" />
                   </a>
                   </div>

                   <div className="menuItem">
                           <div className="navbar-item px-0">
                               <div className={`dropdown is-right ${isActive && 'is-active'}`} >
                                   <div className="dropdown-trigger">
                                       <button onClick={toggle} className="button menuBtn" aria-haspopup="true" aria-controls="dropdown-menu6">
                                           <span className="icon">
                                               <img src="./ellipsis-v-solid.svg"  width="7" height="7" alt="site bar menu" />
                                           </span>
                                       </button>

                                   </div>
                                   <div className="dropdown-menu" id="dropdown-menu6" role="menu">
                                       <div className="dropdown-content">
                                           <a href={userInfo.name ? '/account' : '/signin'} className="dropdown-item">
                                               {userInfo.name ? `Hi ${userInfo.name}`: "Account"}
                                           </a>
                                           <a href="/about" className="dropdown-item">
                                               About
                                           </a>
                                           <a href="/terms" className="dropdown-item">
                                               Terms
                                           </a>
                                            {userInfo.name &&
                                                <a href="/sign-out" className="dropdown-item">
                                                    Sign-out
                                                </a>
                                            }
                                       </div>
                                   </div>
                               </div>
                           </div>
                   </div>

                   
                   
               </div>
        
               
           </nav>
       </div>
   ) 
}

export default Topbar

