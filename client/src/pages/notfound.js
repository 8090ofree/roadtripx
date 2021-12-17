import React from 'react'
import Tokenlink from '../components/Tokenlink'

const NotFound = props => {
    
    
   return(

    <div>
        <section className="section">

            
                <div>
                <p className="is-size-4">Hi, something went wrong.</p>
                                <p className="is-size-5">The page was not found, try homepage or search</p>
                <Tokenlink
            title="Clock is ticking"
            subtitle="Enter username or link"
            color="is-warning"
            cta="Start the data flud"
            type="text"
            placeholder="Enter @username or link"
            
            />

                </div>
                

            
        </section>
    </div>
   ) 
}

export default NotFound