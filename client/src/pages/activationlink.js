import React from 'react'
import Tokenlink from '../components/Tokenlink'

const ActivationLink = () => {
    const [useremail, setUseremail] = React.useState("")
    const [resetErr, setResetErr] = React.useState(false)
    const [resetOk, setResetOk] = React.useState(false)


    const handleChange = (e) => {
        setResetErr(false)

        const { value } = e.target
        setUseremail(value)


    }


    const activationlinkUrl = "/api/activation-link";

    const handleSubmit = (e) => {

        fetch(activationlinkUrl, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            method: "POST",
            body: JSON.stringify({
                email: useremail
            }),
        })
            .then(async (response) => {

                if (!response.ok) {
                    setResetErr(true)
                    const err = await response.json();
                    throw err;
                }
                return await response.json();

            })
            .then((results) => {

                setResetOk(true)
            })
            .catch(err => console.log("err: ", err));
    }



    return (

        <div>
            <section className="section">

                {
                    resetOk ?
                        <div>
                            <p className="title">Check your inbox / email folders</p>
                            <p className="subtitle pt-2">{`Your activation link has been to ${useremail}.`}</p>
                        </div>
                        :
                        <div>
                            <Tokenlink
                                alert={resetErr}
                                alertText="Please enter valid email."
                                title="Activate account"
                                subtitle="We'll send your inbox activation link"
                                color="is-success"
                                cta="Let's do this"
                                type="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                onClick={handleSubmit}
                            />

                        </div>
                }

            </section>
        </div>
    )
}


export default ActivationLink