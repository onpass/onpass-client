//import config from 'config';
//import { authHeader } from '../_helpers';
const config = require("../config.json")
import axios from 'axios'
axios.defaults.withCredentials = true;

export const userService = {
    login,
    logout,
    register,
    /*
    getAll,
    getById,
    update,
    delete: _delete
    */
};

function login(username, password) {
        return axios.post(`${config.apiUrl}/auth/login`, { username, password })
}

function logout() {
    return axios.post(`${config.apiUrl}/auth/logout`, null)
}

function register(user) {
    return axios.post(`${config.apiUrl}/user`, user)
}

/*
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}


function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
*/

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}