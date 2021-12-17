import { React, useState, useContext } from 'react'
import UserContext from '../context/UserContext'
import Payform from './Payform'





const AccountOld = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [uname, setUname] = useState('')
    const [uEmail, setUemail] = useState('')
    const [unews, setUnews] = useState('')
    const [upromo, setUpromo] = useState('')
    const [uplan, setUplan] = useState('')
    const toggleNews = () => {
        if (!unews) {
            setUnews(true)
        } else {
            setUnews(false)
        }
    }
    const togglePromo = () => {
        if (!upromo) {
            setUpromo(true)
        } else {
            setUpromo(false)
        }
    }

    const handleChange = (e, num) => {
        
        num === 1 && setUname(e.target.value)
        num === 2 && setUemail(e.target.value)
        num === 3 && setUplan(e.target.value)
        num === 4 && toggleNews(e.target.value)
        num === 5 && togglePromo(e.target.value)
        
    };

    const handleC = () => {
        
        console.log(
            '1: ', uname,
            '2: ', uEmail,
            '3: ', uplan,
            '4: ', unews,
            '5: ', upromo,
        )
    };


    // const handleSubmit = (e) => {

    //     e.preventDefault()
    //     console.log(regInput)
    //     const regUrl = "/api/signup";

    //     fetch(regUrl, {
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "same-origin",
    //         method: "POST",
    //         body: JSON.stringify({
    //             name: regInput.name,
    //             email: regInput.email,
    //             password: regInput.password,
    //             subId: "Basic"
    //         })
    //     }).then(async (response) => {
    //         if (!response.ok) {
    //             setRegOK((prevValue) => {

    //                 return {
    //                     status: false,
    //                     error: true,
    //                     email: prevValue.email
    //                 }
    //             })

    //             const err = await response.json();
    //             throw err;
    //         }
    //         return await response.json()
    //     }).then(results => {
    //         setRegOK((prevValue) => {

    //             return {
    //                 status: true,
    //                 error: false,
    //                 email: prevValue.email
    //             }
    //         })
    //         console.log(results)
    //         setRegInput((prevValue) => {
    //             if (results) {
    //                 return {
    //                     name: "",
    //                     email: "",
    //                     password: "",
    //                 }
    //             }
    //         })
    //     })
    //         .catch(err => console.log('err: ', err))
    // }

    return (

        <div className="has-text-left">
            <div className="field my-6">
                <label className="label">Name</label>
                <div className="field has-addons">
                    <div className="control">
                        <input
                            className="input is-success"
                            type="text"
                            placeholder={userInfo.name}
                            value={uname}
                            onChange={(e) => handleChange(e, 1)}
                        />
                    </div>

                </div>

            </div>

            <div className="field my-6">
                <label className="label">Email</label>
                <div className="field has-addons">
                    <div className="control">
                        <input
                            className="input is-success"
                            type="text"
                            placeholder={userInfo.email}
                            value={uEmail}
                            onChange={(e) => handleChange(e, 2)}
                        />

                    </div>

                </div>


            </div>

            <div className="field my-6">
                <label className="label">Security</label>
                <a className="button is-info" href="/reset-link">
                    Reset Password
                </a>
            </div>

            <div className="field my-6">
                <label className="label">Billing</label>
                <div className="field has-addons">
                    <div className="control">
                        <a className="button is-info is-static">
                            Plan
                        </a>
                    </div>
                    <div className="control">
                        <div className="select is-success">
                            <select onChange={(e) => handleChange(e, 3)}>
                                <option>{userInfo.plan}</option>
                                <option>{
                                    userInfo.plan === "Basic" ? "Go Pro" : "Downgrade"

                                }</option>
                            </select>
                        </div>
                        {userInfo.plan !== "Basic" && uplan === "Go Pro"
                        /**
                         * <div>

                            <div>
                                <p className="title is-size-5 mb-3">Place order with secured system</p>
                            </div>

                            <div>


                                <PayPalBtn
                                    onClick={() => console.log('hi')}
                                    amount="1.00"
                                    currency="USD"
                                    createSubscription={paypalSubscribe}
                                    onApprove={paypalOnApprove}
                                    catchError={paypalOnError}
                                    onError={paypalOnError}
                                    onCancel={paypalOnError}
                                />

                            </div>

                        </div>
                         */
                            
                        }
                    </div>

                </div>
            </div>

            <div className="field my-6">
                <label className="label">Notifications</label>
                <div className="field has-text-left">
                    <div className="control">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                defaultChecked={userInfo.newsletter}
                                className="mr-2"
                                value={unews}
                                onChange={(e) => handleChange(e, 4)}
                            />

                            Email newsletter

                        </label>
                    </div>
                </div>
                <div className="field has-text-left">
                    <div className="control">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                defaultChecked={userInfo.promotions}
                                className="mr-2"
                                value={upromo}
                                onChange={(e) => handleChange(e, 5)}
                            />

                            Promotions

                        </label>
                    </div>
                </div>
            </div>




            <div className="field my-6">
                <label className="label">Support</label>

                <div className="control">
                    <a href="mailto:hello@socialkeys.com">hello@socialkeys.com</a>
                </div>
            </div>





            <div className="field is-grouped">
                <div className="control">
                    <button
                     onClick={handleC}
                     className="button is-link is-light">Save</button>
                </div>
            </div>
        </div>
    )
}

export default AccountOld

