import React from 'react'
import Cookies from "js-cookie"

const Signinform = props => {
    const [signErr, setSignErr] = React.useState(false)
    const [authInfo, setAuthInfo] = React.useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        
        setSignErr(false)
        const { value } = e.target

        setAuthInfo((prevValue) => {
            if (e.target.placeholder === "Email") {
                return {
                    email: value,
                    password: prevValue.password
                }
            } else {
                return {
                    email: prevValue.email,
                    password: value
                };
            }
        }
        )
    };


    const handleSubmit = (e) => {
        setSignErr(false)
        e.preventDefault()
        
        const signinUrl = "/api/signin";

        fetch(signinUrl, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify({
                email: authInfo.email,
                password: authInfo.password
            })
        }).then(async (response) => {
            setAuthInfo({
                email: "",
                password: ""
            })
            
            if (!response.ok) {
                setSignErr(true)
                const err = await response.json();
                throw err;
            }
            return await response.json()
        }).then(results => {

            const cookieToken = results.token;
            Cookies.set('token', cookieToken, {
                expires: 30
            })
            
            setAuthInfo((prevValue) => {
                if (results) {
                    return {
                        email: "",
                        password: "",
                    }
                }
            })
            setTimeout(() => {
                window.location.href = '/';
              }, 2000);
        })
            .catch(err => console.log('err: ', err))
    }


    return (

        <div>
            <section className="section">
                <div className="forms">
                    <p className="title">{props.title}</p>
                    <p className="subtitle">{props.subtitle}</p>
                    {signErr &&

                        <div className="notification is-small is-link is-light is-size-6 py-2 px-2 has-text-left">
                            Please enter valid details.
                        </div>

                    }
                    
                    <div className="field">
                        <p className="control">
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                value={authInfo.email}
                                onChange={handleChange}
                            />

                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <input
                                className="input"
                                type="password"
                                placeholder="Password"
                                value={authInfo.password}
                                onChange={handleChange}
                            />

                        </p>
                    </div>

                    <div className="field-body is-horizontal">
                    

                        <p className="control">
                            <button
                                className="button is-success mb-2"
                                onClick={handleSubmit}
                            >
                                Sign-in
                            </button>
                        </p>
                        <div className="signlinks">

                     
                        <a
                            className="is-size-7"
                            href="/reset-link"
                        >Forgot password?</a>
                       
                        <a
                            className="is-size-7"
                            href="/signup"
                        >Register</a>
                        </div>
                    
                        


                    </div>



                </div>
            </section>

        </div>
    )
}

export default Signinform