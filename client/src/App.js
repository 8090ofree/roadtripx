import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signin from './pages/signin'
import Account from './pages/account'
import Protected from './pages/protected'
import Signout from './pages/signout';
import Signup from './pages/signup'
import Activate from './pages/activate'
import Activationlink from './pages/activationlink'
import Reset from './pages/reset'
import Resetlink from './pages/resetlink'
import Home from './pages/home'
import Layout from './components/Layout';
import UserContext from './context/UserContext'
import axios from 'axios'
import Cookies from 'js-cookie';
import NotFound from './pages/notfound'


function App() {
  let count = 0;

  const [ userInfo, setUserInfo ] = React.useState({
    tokenuser: undefined,
    name: undefined,
    email: undefined,
    plan: undefined,
    newsletter: undefined,
    promotions: undefined
  })

  React.useEffect(() => {

    const isSignedIn = async () => {

      let token = Cookies.get('token');

      if(token){
        const isUser = await axios.get('/api/isauth', {
          headers: { "x-auth-token": token}
        })
        if(isUser){
          console.log('axios res: ', isUser, token)
          setUserInfo({
          tokenuser: token,
          name: isUser.data.user.name,
          email: isUser.data.user.email,
          plan: isUser.data.user.plan,
          newsletter: isUser.data.user.newsletter,
          promotions: isUser.data.user.promotions
        })
        }
      }

    }


    isSignedIn()
  },[count])

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo}}>
    <Layout>
      <div className="App">

      
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/p" element={<Protected />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/activate" element={<Activate />} />
          <Route path="/activation-link" element={<Activationlink />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/reset-link" element={<Resetlink />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/sign-out" element={<Signout />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
        
      </div>

    </Layout>
    </UserContext.Provider>


  );
}

export default App;



