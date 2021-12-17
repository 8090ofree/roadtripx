import React from 'react'
import Cookies from 'js-cookie';
import Signinform from '../components/Signinform';
import Tokenlink from '../components/Tokenlink';


const Signout = () => {

  const [noToken, setNoToken] = React.useState(false);

  React.useEffect(() => {
    Cookies.remove('token');
    setNoToken(true);
  }, [noToken]);



  return (

    <div>
      <p>hi hi hi</p>
      {noToken ?

        <div>
          <Signinform
            title="You're sign out"
            subtitle="Sign in here"
          />
        </div>
        :

        <div>
          <Tokenlink
            title="Clock is ticking"
            subtitle="Enter username or link"
            color="is-warning"
            cta="Start the data flud"
            type="text"
            placeholder="Enter @username or link"
            
            />
        </div>

      }
    </div>

  );
};

export default Signout;

