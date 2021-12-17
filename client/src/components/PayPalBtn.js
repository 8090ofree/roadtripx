
import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

export function PayPalBtn(props) {
  const { amount, currency, createSubscription, onApprove, catchError,onError, onCancel, onClick} = props;
  const paypalKey = "Affe6YIFZAwIpAXgrmeOwnN6jLDtGv5FfrAmGC5nbChbreJMPIFV_2p2ccssiFLxU7fPX8bRQd_lFH1_"
  // "AZG7mteqe-HWN8JL1xa-Z35-UsMKeXOoRZmmPMwBXJ-4SZ2WavI_84_sBgMkYmrgsha_8UY7hzwjUD7u"
  
  return (
    <PayPalButton
      // onClick={(err) => onClick(err)}
      amount={amount}
      currency={currency}
      createSubscription={(data, details) => createSubscription(data, details)}
      onApprove={(data, details) => onApprove(data, details)}
      onError={(err) => onError(err)}
      catchError={(err) => catchError(err)}
      onCancel={(err) => onCancel(err)}
      options={{
        clientId: paypalKey,
        vault:true,
        intent: 'subscription'
      }}
      style={{
        shape: 'rect',
        color: 'blue',
        layout: 'vertical',
        label: 'subscribe',

        
      }}
    />
  );
}

export default PayPalBtn;
