"use client"
import React, { useEffect, useRef } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function PhoneNumber({handler}) {
    const ref = useRef(null)
    const phoneHandler = (value, country, e, formattedValue) => {
        // handler(formattedValue)
    }
    return (
        <PhoneInput
            preferredCountries={['gb','us','in']}
            ref={ref}
            country={'us'}
            containerClass="w-full focus:"
            onChange={phoneHandler}
            name="phone-input"
            inputProps={{
                name: 'phone'
            }}
        />
    )
}
