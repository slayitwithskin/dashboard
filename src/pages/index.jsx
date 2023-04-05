import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import Cookies from 'js-cookie';
var bcrypt = require('bcryptjs')
import {
  useToast
} from '@chakra-ui/react'

const Index = () => {
  const Toast = useToast({
    position: 'top'
  })
  useEffect(() => {
    // Define the 'otpless' function
    window.otpless = (otplessUser) => {
      // Retrieve the user's details after successful login
      const waName = otplessUser.waName;
      const waNumber = otplessUser.waNumber;

      // Handle the signup/signin process
      // ...
      if (waNumber == process.env.NEXT_PUBLIC_PHONE || waNumber == NEXT_PUBLIC_ALTERNATE_PHONE) {
        Cookies.set("authToken", bcrypt.hash(process.env.NEXT_PUBLIC_SALT))
        setTimeout(() => {
          window.location.href("/dashboard")
        }, 2000)
      }
      else{
        Toast({
          status: 'error',
          title: 'Permission Denied',
          description: 'This number is not allowed'
        })
      }
    };
  }, []);

  return (
    <>
      <Script
        src='https://otpless.com/auth.js'
        strategy='beforeInteractive'
      />
    </>
  )
}

export default Index