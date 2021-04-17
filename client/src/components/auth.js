import axios from 'axios';
import { ThermometerSnow } from 'react-bootstrap-icons';

class Auth {
    constructor() {
        this.authenticated = false
        this.email = ""
    }

    login(cb) {
        this.authenticated = true
        cb()
    }

    logout(cb) {
        this.authenticated = false
    }

    getEmail() {
        axios.get("http://localhost:8080/authenticate/trabajador", {
            headers: { 'x-access-token': localStorage.getItem("token") },
        }).then((response) => {
            this.email = response.data.email
            return this.email
        })
    }

    isAuthenticated() {
        axios.get("http://localhost:8080/authenticate/trabajador", {
            headers: { 'x-access-token': localStorage.getItem("token") },
        }).then((response) => {
            if (response.data.email) {
                this.authenticated = true
                return true
            }
        })
        return this.authenticated;
    }
}

export default new Auth()