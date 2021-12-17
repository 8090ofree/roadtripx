import React from 'react'

const Tokenlink = props => {
    return (

        <div>
            <section className="section">
                <div className="forms">
                    <p className="title">{props.title}</p>
                    <p className="subtitle is-size-5 pt-1">{props.subtitle}</p>
                    <div className="field">
                        <p className="control">
                            <input
                                className="input"
                                type={props.type}
                                placeholder={props.placeholder}
                                value={props.value}
                                onChange={props.onChange}
                            />

                        </p>
                    </div>

                    <div className={props.show ? "field" : "is-hidden"}>
                        <p className="control">
                            <input
                                className="input"
                                type="password"
                                placeholder="Enter password"
                                value={props.value2}
                                onChange={props.change}
                            />

                        </p>
                    </div>
                    <div className={props.alert ? "notification is-small is-link is-light is-size-6 py-2 px-2 has-text-left" : "is-hidden"}>
                        {props.alertText}
                    </div>

                    <div className="field">
                        <p className="control">
                            <button
                             className={`button ${props.color}`}
                             onClick={props.onClick}
                             >
                                {props.cta}
                            </button>
                        </p>
                    </div>


                </div>
            </section>

        </div>
    )
}

export default Tokenlink