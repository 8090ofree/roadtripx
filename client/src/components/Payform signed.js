import React, { useState, useContext } from 'react'
import PayPalBtn from './PayPalBtn'
import UserContext from '../context/UserContext'

const PayformSigned = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [isPay, setIsPay] = useState(false)
    const [subErr, setSubErr] = useState(false)
    const [subOk, setSubOk] = useState(false)
    const [subId, setSubId] = useState('')


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
    }

    const paypalOnApprove = (data, detail) => {
        // call the backend api to store transaction details
        // console.log("Payapl approved")
        // console.log(data.subscriptionID)
        const sub = data.subscriptionID
        setIsPay(true)
        setSubId(sub)


    };


    const handleSubmit = () => {

        const subUrl = "/api/plan";

        fetch(subUrl, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify({
                email: userInfo.email,
                subId: subId
            })
        }).then(async (response) => {

            if (!response.ok) {
                setSubErr(true)

                const err = await response.json();
                throw err;
            }
            return await response.json()
        }).then(results => {

            setSubOk(true)
            setIsPay(false)


        })
            .catch(err => console.log('err: ', err))
    }
    
    return (

        <div>
            <div className="forms has-text-centered py-4">
                <div>

                    {!isPay && !subOk && <div>
                        <p className="title is-size-6 mb-3">Place order with secured system</p>
                    </div>}

                    {subErr &&
                        <div className="notification is-warning">
                            <button className="delete"></button>
                            Process failed, please contact us for support hello@socialkeys.com
                        </div>
                    }

                    {isPay ?
                        <div>
                            <div className="column has-text-centered">
                                <div className="message is-success">
                                    <div className="message-header">
                                        Almost done...
                                    </div>
                                    <div className="message-body">

                                        <p>Congrads, subscription created, 1 click to save changes</p>
                                        <div className="has-text-centered mt-2">
                                            <button
                                                onClick={handleSubmit}
                                                className="button is-focus is-active">Click to complete process
                                            </button>
                                        </div>

                                    </div>



                                </div>

                            </div>
                        </div>

                        :

                        <div>
                            {subOk ?

                                <div className="notification is-primary is-light">
                                    <button className="delete"></button>
                                    {`Subscription updated, a confirmation email has been sent to ${userInfo.email}.`}
                                </div>
                                :

                                <div>


                                    <PayPalBtn

                                        amount="1.00"
                                        currency="USD"
                                        createSubscription={paypalSubscribe}
                                        onApprove={paypalOnApprove}
                                        catchError={paypalOnError}
                                        onError={paypalOnError}
                                        onCancel={onCancel}
                                    />

                                </div>

                            }

                        </div>

                    }
                </div>
            </div>
        </div>



    )
}

export default PayformSigned