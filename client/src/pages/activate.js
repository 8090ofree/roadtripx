import React from 'react'
import queryString from "query-string";
import Signinform from '../components/Signinform';
import Tokenlink from '../components/Tokenlink'

const Activate = props => {
    
    const [ Activate, setActivate ] = React.useState(true)
    const urlParams = queryString.parse(window.location.search);
    
    const token = urlParams.token;
    let count = 0
    
    React.useEffect(() => {
        
        if (!token) {
          setActivate(false)
          return;
        }

        const activateUrl = "/api/activate";

        fetch(activateUrl, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify({
            activationToken: token,
        }),
        })
        .then(async (response) => {
            if (!response.ok) {
                setActivate(false)
            const err = await response.json();
            throw err;
            
            }
            return await response.json();
            
        })
        .then((results) => {
            
            setActivate(true)
        })
        .catch(err => console.log("err: ", err));
        
  }, [count]);


   return(

    <div>
        <section className="section">

            {
                Activate ?
                <div>
                 
                    <Signinform
                        title="Alright, account activated!"
                        subtitle="You can now signin"
                    />

                </div>
                
                :
                <div>
                    <Tokenlink
                        
                        title="Oops..."
                        subtitle="Something wend wrong, we'll resend your inbox new link"
                        color="is-success"
                        cta="Let's get it on"
                        type="email"
                        placeholder="Enter your email"
                    />

                </div>
                

            }
        </section>
    </div>
   ) 
}

export default Activate