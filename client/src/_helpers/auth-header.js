import { authenticationService } from '../_services';
import axios from 'axios';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;


    if (currentUser && currentUser.token) {
        axios.get("http://localhost:8080/authenticate/trabajador", {
            headers: { 'x-access-token': currentUser.token },
        }).then((response) => {
            if (response.data.admin === 1) {
                return true;
            }
            else {
                return false;
            }
        })

    }
    else {
        return false
    }
}