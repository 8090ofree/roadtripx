import React, { useContext } from 'react'
import Accounttabs from '../components/Accounttabs'
import UserContext from '../context/UserContext'
import Signinform from '../components/Signinform'

const Account = () => {

  const { userInfo, setUserInfo } = useContext(UserContext)

  return (

    <div>
      {userInfo.name ?
        <div className="container">
            <div className="subtitle py-5">
            <p className="title">Account</p>
        <p className="subtitle pt-2">Email us for support hello@socialkeys.com</p>
        
        </div>
        <Accounttabs />
    </div>
        
        :
        <div>

          <Signinform
            title="Hi!"
            subtitle="Let's get it on"
          />

        </div>
      }
    </div>
  )
}

export default Account