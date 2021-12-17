import React, { useState } from 'react'
import PayPalBtn from './PayPalBtn'
import Cookies from "js-cookie"


const Payform = () => {
    
    const [isSign, setIsSign] = useState(false)
    const [isPay, setIsPay] = useState(false)
    const [subId, setSubId] = useState('')
    const [regOk, setRegOK] = useState({
        status: false,
        email: ""
    })

    const [regInput, setRegInput] = useState({
        name: "",
        email: "",
        password: ""
    })


    const toggle = () => {
        if (!isSign) {
            setIsSign(true)
        } else {
            setIsSign(false)
        }
    }


    const paypalSubscribe = (data, actions) => {
        return actions.subscription.create({
            'plan_id': "P-1MF359969F0734507MGFHBQA",
            
            //P-9D2866176L665505XMGGCCSI for dev mode
        });
    };

    const paypalOnError = (err) => {
        console.log("Error ", err)
    }

    const onCancel = () => {
        setSubId("Basic")
        handleSubmit()
    }

    const signpaypalOnApprove = (data, detail) => {
        // call the backend api to store transaction details
        // console.log("Payapl approved signed")
        // console.log(data.subscriptionID)
        const sub = data.subscriptionID
        setSubId(sub)
        setIsPay(true)
    };

    const paypalOnApprove = (data, detail) => {
        // call the backend api to store transaction details
        // console.log("Payapl approved")
        // console.log(data.subscriptionID)
        setSubId(data.subscriptionID)
        setIsPay(true)


    };

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


    const handleSubmit = () => {
        setRegOK({
            status: false,
            error: false,
            email: regInput.email

        })

        
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
                subId: subId
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


    const handleSubmitsign = () => {
        
        setRegOK({
            status: false,
            error: false,
            email: regInput.email

        })

        
        const signplanUrl = "/api/plansignin";

        fetch(signplanUrl, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify({
                email: regInput.email,
                password: regInput.password,
                subId: subId
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
            const cookieToken = results.token;
            Cookies.set('token', cookieToken, {
                expires: 30
            })
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
                {
                    regOk.status ?
                    <div>
                        <p className="title">{subId === "Basic" ? "Great, account created, without payment." : `Great, ${isSign ? 'subscription upgraded.' : 'account created.'}`}</p>
                        <p className="subtitle pt-2">{`Your ${isSign ? 'confirmation' : 'activation'} link has been to ${regOk.email}, check your inbox / email folders.`}</p>
                    </div>
                    :

                    <div>
                            <div className="forms">
                                <div className="payform">

                                    <p className="is-size-5 has-text-weight-bold">{isSign ? "Sign-in" : "Join now"}</p>
                                    <a
                                        className="is-size-7"
                                        onClick={toggle}
                                    >Already registered?</a>
                                    
                                </div>
                            
                                    {regOk.error &&

                                        <div className="notification is-small is-link is-light is-size-6 py-2 px-2 has-text-left">
                                            Please enter valid details.
                                        </div>

                                    }

                                    {!isSign &&

                                        <div className="field">
                                            <p className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder="Name"
                                                    value={regInput.name}
                                                    onChange={handleChange}
                                                />

                                            </p>
                                        </div>

                                    }
                                    <div className="field">
                                        <p className="control">
                                            <input
                                                className="input"
                                                type="email"
                                                placeholder="Email"
                                                value={regInput.email}
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
                                                value={regInput.password}
                                                onChange={handleChange}
                                            />

                                        </p>
                                    </div>
                                    <div className="field has-text-left">
                                        <div className="control">
                                            <label className="checkbox">
                                                <input type="checkbox" defaultChecked={true} className="mr-2" />

                                                I agree to the <a href="/terms">terms and conditions</a>

                                            </label>
                                        </div>
                                    </div>

                                    {isPay ?

                                        <div className="column">
                                            <div className="message is-success">
                                                <div className="message-header">
                                                    Almost done...
                                                </div>
                                                <div className="message-body">

                                                    <p>Congrads, subscription created, 1 click to save changes.</p>
                                                    <div className="has-text-centered">
                                                        <button
                                                            onClick={isSign ? handleSubmitsign : handleSubmit}
                                                            className="button is-active">Click here to complete process
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        :

                                        <div>
                                                <PayPalBtn
                                                
                                                amount="1.00"
                                                currency="USD"
                                                createSubscription={paypalSubscribe}
                                                onApprove={isSign ? signpaypalOnApprove : paypalOnApprove}
                                                catchError={paypalOnError}
                                                onError={paypalOnError}
                                                onCancel={onCancel}
                                            />

                                        </div>


                                    
                                    }


                            </div>



                    </div>


                }
                </section>
        </div>
    )
}

                    
      

export default Payform