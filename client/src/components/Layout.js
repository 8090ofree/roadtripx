import React from 'react'
import Footer from './Footer'
import Topbar from './Topbar'


const Layout = ({ children }) => {
  
  return (
      <div>
        <Topbar />
        <div className="topDiv"></div>
        <main className="theme">
    
          {children}</main>
        <div className="btmDiv"></div>
        <Footer />
      </div>
  );
  
} 

export default Layout