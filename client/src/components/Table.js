import { React, useState, useContext } from 'react'
import UserContext from '../context/UserContext'
import Payform from './Payform'
import PayformSigned from './Payform signed'


const Table = () => {

  const { userInfo, setUserInfo } = useContext(UserContext)
  const [isForm, setIsForm] = useState(false)


  const tForm = () => {
    if (!isForm) {
      setIsForm(true)
    } else {
      setIsForm(false)
    }
  }

  return (
    <div>
      <div className="sectiontable">
        <div className="pricing-table is-comparative">
          <div className="pricing-plan is-features">
            <div className="plan-header">Features</div>
            <div className="plan-price"><span className="plan-price-amount">&nbsp;</span></div>
            <div className="plan-items">
              <div className="plan-item">Usage</div>
              <div className="plan-item">Data</div>
              <div className="plan-item">Export</div>
              <div className="plan-item">Email Support</div>
            </div>
            <div className="plan-footer">
            </div>
          </div>


          <div className="pricing-plan is-warning">
            <div className="plan-header">Free</div>
            <div className="plan-price"><span className="plan-price-amount"><span className="plan-price-currency">$</span>0</span>/month</div>
            <div className="plan-items">
              <div className="plan-item" data-feature="Usage">5 calls/day</div>
              <div className="plan-item" data-feature="Data">25</div>
              <div className="plan-item" data-feature="Export">1TB</div>
              <div className="plan-item" data-feature="Email Support">-</div>
            </div>
            <div className="plan-footer">
              <a className="button is-fullwidth" href="/signup">Sign up</a>
              {/* <button className="button is-fullwidth">Choose</button> */}
            </div>
          </div>

          <div className="pricing-plan is-active">
            <div className="plan-header">Premium</div>
            <div className="plan-price"><span className="plan-price-amount"><span className="plan-price-currency">$</span>99</span>/month</div>
            <div className="plan-items">
              <div className="plan-item" data-feature="Usage">Unlimited</div>
              <div className="plan-item" data-feature="Data">500</div>
              <div className="plan-item" data-feature="Export">1TB</div>
              <div className="plan-item" data-feature="Email Support">v</div>
            </div>
            <div className="plan-footer">
              <button className="button is-fullwidth" onClick={tForm}>Sign up</button>
            </div>
          </div>


        </div>


      </div>

      {isForm &&
        <div>
          {userInfo.email ?
            <PayformSigned />
            :
            <Payform />}
        </div>}
    </div>
  )
}

export default Table