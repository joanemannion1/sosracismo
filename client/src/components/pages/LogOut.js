import React, { useEffect } from 'react';
import history from '../../history';
import auth from '../auth'
import { authenticationService } from '../../_services';
export default function LogOut() {


    authenticationService.logout()
    localStorage.removeItem('token')
    history.push('/LogIn')



    return (
        <>


        </>
    )
}

