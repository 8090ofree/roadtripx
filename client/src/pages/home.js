import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import Tokenlink from '../components/Tokenlink'
import Table from '../components/Table'





const Home = () => {


  const { userInfo, setUserInfo } = useContext(UserContext)

  return (

    <div>
      <h1 className="is-size-4 has-text-left">Right Layout</h1>
      
      <p>{userInfo.name ? `${userInfo.name}, your email is ${userInfo.email}` : "Hello"}</p>

      <Tokenlink
        title="Clock is ticking"
        subtitle="Enter username or link"
        color="is-warning"
        cta="Start the data flud"
        type="text"
        placeholder="Enter @username or link"

      />
      <div className="my-6">
        <Table />
      </div>
      <h1 className="subtitle has-text-right">Left Layout</h1>
    </div>
  )
}

export default Home

