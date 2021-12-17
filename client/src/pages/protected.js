import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import Signinform from '../components/Signinform'

const Protected = () => {

  const { userInfo, setUserInfo } = useContext(UserContext)

  return (

    <div>
      {userInfo.name ?
        <div>
          <h1 className="is-size-4 has-text-left">This is protected page</h1>
          <p>{userInfo.name}, your email is {userInfo.email}</p>
          <h1 className="subtitle has-text-right">Only logged users can view this page</h1>
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

export default Protected