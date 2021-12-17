import React, { useState } from 'react'

const Signupform = () => {


    const [regOk, setRegOK] = useState({
        status: false,
        email: ""
    })

    const [regInput, setRegInput] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        const { value } = e.target

        setRegInput((prevValue) => {
            if (e.target.placeholder === "Name") {
                return {
                    name: value,
                    email: prevValue.email,
                    password: prevValue.password
                };
            } else if (e.target.placeholder === "Email") {
                return {
                    name: prevValue.name,
                    email: value,
                    password: prevValue.password
                }
            } else {
                return {
                    name: prevValue.name,
                    email: prevValue.email,
                    password: value
                };
            }
        }
        )
    };


    const handleSubmit = (e) => {
        setRegOK({
            status: false,
            error: false,
            email: regInput.email

        })
        e.preventDefault()
        
        const regUrl = "/api/signup";

        fetch(regUrl, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify({
                name: regInput.name,
                email: regInput.email,
                password: regInput.password,
                subId: "Basic",
            })
        }).then(async (response) => {
            if (!response.ok) {
                setRegOK((prevValue) => {

                    return {
                        status: false,
                        error: true,
                        email: prevValue.email
                    }
                })

                const err = await response.json();
                throw err;
            }
            return await response.json()
        }).then(results => {
            setRegOK((prevValue) => {

                return {
                    status: true,
                    error: false,
                    email: prevValue.email
                }
            })
            
            setRegInput((prevValue) => {
                if (results) {
                    return {
                        name: "",
                        email: "",
                        password: "",
                    }
                }
            })
            
        })
            .catch(err => console.log('err: ', err))
    }






    return (

        <div>
            <section className="section">
                {regOk.status ?
                    <div>
                        <p className="title">Great, account created.</p>
                        <p className="subtitle pt-2">{`Your activation link has been to ${regOk.email}, check your inbox / email folders.`}</p>
                    </div>
                    :

                    <div className="forms">
                        <p className="title">Sign up</p>
                        <p className="subtitle">Join now</p>

                        {regOk.error &&

                            <div className="notification is-small is-link is-light is-size-6 py-2 px-2 has-text-left">
                                Please enter valid details.
                            </div>

                        }


                        <div class="field">
                            <p class="control">
                                <input
                                    class="input"
                                    type="text"
                                    placeholder="Name"
                                    value={regInput.name}
                                    onChange={handleChange}
                                />

                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <input
                                    class="input"
                                    type="email"
                                    placeholder="Email"
                                    value={regInput.email}
                                    onChange={handleChange}
                                />

                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <input
                                    class="input"
                                    type="password"
                                    placeholder="Password"
                                    value={regInput.password}
                                    onChange={handleChange}
                                />

                            </p>
                        </div>
                        <div className="field has-text-left">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox" defaultChecked={true} className="mr-2" />
                                   
                                    I accept <a href="/terms">terms and conditions</a>
                                   
                                </label>
                            </div>
                        </div>

                        <div className="field-body is-horizontal">


                            <p className="control">
                                <button
                                    className="button is-success mb-2"
                                    onClick={handleSubmit}
                                >
                                    Sign up Now
                                </button>
                            </p>
                            <div className="signlinks">


                                <a
                                    className="is-size-7"
                                    href="/signin"
                                >Already registered?</a>


                            </div>




                        </div>


                    </div>

                }

            </section>

        </div>
    )
}

export default Signupform