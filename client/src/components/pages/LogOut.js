import React, { useEffect } from 'react';
import history from '../../history';
import auth from '../auth'

export default function LogOut() {


    auth.logout()
    localStorage.removeItem('token')
    history.push('/LogIn')



    return (
        <>


        </>
    )
}

