import { React, useState, useContext } from 'react'
import UserContext from '../context/UserContext'
import PayformSigned from './Payform signed'

const Accounttabs = () => {
    const [msg, setMsg] = useState('')
    const [uname, setUname] = useState('')
    const [uEmail, setUemail] = useState('')
    const [ualerts, setUalerts] = useState('')
    const [activeTab, setActiveTab] = useState(1)
    const [isInfo, setIsInfo] = useState(false)
    const [infoErr, setInfoErr] = useState(false)
    const [isCancel, setIsCancel] = useState(false)
    const [upgrade, setUpgrade] = useState(false)
    const [dgrade, setDgrade] = useState(false)
    const { userInfo, setUserInfo } = useContext(UserContext)
    
    const togglex = (num) => {
        const arrObj = [
            {
                a: upgrade,
                b: setUpgrade
            }, {
                a: isCancel,
                b: setIsCancel
            },]

        const position = arrObj[num]
        setMsg('I dont use it often')

        if (!position.a) {
            position.b(true)
            
        } else {
            position.b(false)
            
        }

    }

    const handleChange = (num) => {
        setActiveTab(num)
    };



    const handleInfo = (e, num) => {
        const { value } = e.target

        if (num === 1) {
            setUname(value)
        } else {
            setUemail(value)

        }



    }

    const handleAlert = (e) => {
        
        const { value } = e.target

        if (value === "Yes") {
            setUalerts(true)
        } else {
            setUalerts(false)
        }



    }

    const handleSubmit = (e) => {


        e.preventDefault()

        const infoUrl = "/api/info";

        fetch(infoUrl, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify({
                email: userInfo.email,
                name: uname,
                emailNew: uEmail,
                alerts: ualerts
            })
        }).then(async (response) => {
            if (!response.ok) {
                setInfoErr(true)
                const err = await response.json();
                throw err;
            }
            return await response.json()
        }).then(results => {
            setIsInfo(true)
            
            setUname('')
            setUemail('')
        })
            .catch(err => console.log('err: ', err))
    }

    const handleMsg = (e) => {
        setDgrade(false)
        
        setMsg(e.target.value)
    }

    const handleCancel = () => {
        const cancelplanUrl = "/api/cancelplan";

        fetch(cancelplanUrl, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify({
                email: userInfo.email,
                message: msg
            })
        }).then(async (response) => {
            if (!response.ok) {

                const err = await response.json();
                throw err;
            }
            return await response.json()
        }).then(results => {
            setDgrade(true)
            

        })
            .catch(err => console.log('err: ', err))

    }



    return (

        <div>

            <div className="tabs is-boxed is-centered">
                <ul>
                    <li
                        className={activeTab === 1 && "is-active"}
                        onClick={() => handleChange(1)}>
                        <a href="#">General</a>
                    </li>
                    <li
                        className={activeTab === 2 && "is-active"}
                        onClick={() => handleChange(2)}>
                        <a href="#">Security</a>
                    </li>
                    <li
                        className={activeTab === 3 && "is-active"}
                        onClick={() => handleChange(3)}>
                        <a href="#">Billing</a>
                    </li>
                    
                </ul>
            </div>
            <div id="tab-content">
                <div className={activeTab === 1 ? "has-text-left is-block" : "is-hidden"}>

                    <div className="field my-6">
                        <label className="label">Name</label>
                        <div className="field has-addons">
                            <div className="control">
                                <input
                                    className="input is-success"
                                    type="text"
                                    placeholder={userInfo.name}
                                    value={uname}
                                    onChange={(e) => handleInfo(e, 1)}
                                />
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
                                        onChange={(e) => handleInfo(e, 2)}
                                    />

                                </div>

                            </div>


                        </div>

                        <div className="field my-6">
                            <label className="label">Email Notifications</label>
                            <div className="field has-addons">
                                <div className="control">
                                    <label className="radio mr-3">
                                        <input
                                         className="mx-2"
                                         type="radio"
                                         name="answer"
                                         value="Yes"
                                         onChange={handleAlert} 
                                         />
                                        Yes
                                    </label>
                                    <label className="radio ml-2">
                                        <input
                                         className="mx-2"
                                         type="radio"
                                         name="answer" 
                                         onChange={handleAlert} 
                                        />
                                        No
                                    </label>

                                </div>

                            </div>


                        </div>
                        


                    </div>




                </div>
                
                <div className={activeTab === 2 ? "has-text-left is-block" : "is-hidden"}>
                    <a className="button is-info" href="/reset-link">
                        Reset Password
                    </a>

                </div>
                <div className={activeTab === 3 ? "has-text-left is-block" : "is-hidden"}>
                    <div>
                        <label className="label">Subscription</label>
                        <div className="field has-addons">
                            <div className="control">
                                <a className="button is-info is-static">
                                    Plan
                                </a>
                            </div>
                            <div className="control">
                                <input className="input is-success" type="text" value={userInfo.plan === "Basic" ? "Basic" : "Pro"} />
                            </div>

                        </div>
                        <div>
                            {userInfo.plan === "Basic" ?
                                <div className="mb-4">
                                    <button onClick={() => togglex(0)} className="button is-warranty">
                                        Upgrade
                                    </button>
                                </div>
                                :
                                <div className="mb-4">
                                    <button onClick={() => togglex(1)} className="button is-warranty">
                                        Cancel
                                    </button>
                                </div>
                            }



                        </div>

                        {isCancel &&



                            <div>
                                {dgrade ?

                                    <div className="notification is-small is-primary is-light is-size-6 py-2 px-2 has-text-left">
                                        {`Subscription updated, refresh page to view changes. A confirmation email will be sent to ${userInfo.email}.`}
                                    </div>


                                    :

                                    <div>

                                        <div className="field">
                                            <p className="is-size-6 my-4">So, why do you want to cancel?</p>

                                            <div className="field-body">
                                                <div className="field is-narrow">
                                                    <div className="control">
                                                        <div className="select">
                                                            <select onClick={handleMsg}>
                                                                <option>I don't use it often</option>
                                                                <option>I'm using similar service</option>
                                                                <option>Other</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="field">
                                            <div className="field-label">

                                            </div>
                                            <div className="field-body">
                                                <div className="field">
                                                    <div className="control">
                                                        <button
                                                            onClick={handleCancel}
                                                            className="button is-primary">
                                                            Send message
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                        }
                        {upgrade &&
                            <div>
                                <PayformSigned />
                            </div>}

                    </div>

                </div>
            </div>
            {infoErr &&
            <div className="notification is-small is-warning is-light is-size-6 py-2 px-2 has-text-left">
            Please enter valid details.
        </div>
        }

            {isInfo && activeTab == 1 ?
                <div className="notification is-small is-primary is-light is-size-6 py-2 px-2 has-text-left">
                    {`Thanks, information sent. A confirmation email will be sent to ${userInfo.email}.`}
                </div>
                :
                <div className={activeTab > 1 ? "is-hidden" : "field-body has-text-left"}>
                    <div className="field">
                        <div className="control">
                            <button
                                onClick={handleSubmit}
                                className="button is-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>

            }


        </div>
    )
}

export default Accounttabs