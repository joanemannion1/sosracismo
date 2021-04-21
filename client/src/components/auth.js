import axios from 'axios';
import { ThermometerSnow } from 'react-bootstrap-icons';

class Auth {
    constructor() {
        this.authenticated = false
        this.email = ""
        this.admin = false
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
            headers: { 'x-access-token': localStorage.token },
        }).then((response) => {
            this.email = response.data.email
            return this.email
        })
    }

    getAdmin() {
        axios.get("http://localhost:8080/authenticate/trabajador", {
            headers: { 'x-access-token': localStorage.token },
        }).then((response) => {
            this.admin = response.data.admin
            return this.admin
        })
    }

    isAuthenticated() {
        axios.get("http://localhost:8080/authenticate/trabajador", {
            headers: { 'x-access-token': localStorage.token },
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