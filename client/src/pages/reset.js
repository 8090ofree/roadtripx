import React from 'react'
import queryString from "query-string"
import Tokenlink from '../components/Tokenlink'
import Signinform from '../components/Signinform'
import Resetlink from './resetlink'

const Reset = () => {
    const [canSign, setCanSign] = React.useState(false)
    const [pwdErr, setPwdErr] = React.useState(false)
    const [resetOk, setResetOk] = React.useState(true)
    const [newpwd, setNewpwd] = React.useState({
        new: "",
        password: "",
        passwordToken: ""
    })

    const urlParams = queryString.parse(window.location.search);
    const token = urlParams.token;
     
    const handleChange = (e) => {
        
        setPwdErr(false)
        const { value } = e.target

        setNewpwd((prevValue) => {
            if (e.target.placeholder === "Enter new password") {
                return {
                    new: value,
                    password: prevValue.password
                };
            } else {
                return {
                    new: prevValue.new,
                    password: value,
                }
            }
        });

    }


    const resetUrl = "/api/reset";

    const handleSubmit = (e) => {

        const isPwd = newpwd.new !== newpwd.password
        setPwdErr(isPwd)

        if (!isPwd) {
            fetch(resetUrl, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
                method: "POST",
                body: JSON.stringify({
                    password: newpwd.new,
                    passwordToken: token
                }),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        setResetOk(false)
                        const err = await response.json();
                        throw err;
                    }
                    return await response.json();

                })
                .then((results) => {
                    setCanSign(true)
                })
                .catch(err => console.log("err: ", err));
        }

    }

    return (

        <div>
            <section className="section">

                {
                    resetOk ?


                        <div>
                            {canSign ?
                            
                            <div>

                                <Signinform
                                    title="Alright, password changed!"
                                    subtitle="You can now signin"
                                />

                            </div>

                            :

                            <div>


                            <Tokenlink

                                title="Reset password"
                                subtitle="Type your new password"
                                color="is-success"
                                type="password"
                                placeholder="Enter new password"
                                value={newpwd.new}
                                onChange={handleChange}
                                show="true"
                                alert={pwdErr}
                                alertText="Please enter matched passwords."
                                value2={newpwd.password}
                                change={handleChange}
                                placeholder2="Enter password"
                                cta="Let's do this"
                                onClick={handleSubmit}
                            />

                            </div>
                            }

                            
                        </div>

                        :


                        <div>
                            
                            <p className="is-size-4">Hi, something went wrong.</p>
                                <p className="is-size-5">Please try with a new link:</p>
                            <Resetlink />
                            

                        </div>


                }
            </section>
        </div>
    )
}

export default Reset
