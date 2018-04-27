import axios from 'axios'
import { host, port }  from '../config'

export const authCall = (creds) => {
    return axios.post(host + port + '/auth-counter/', creds).then((result) => {
        return result.data
    }, (err) => {
        return err
    })
}

export const getInvsCall = (counter) => {
    return axios.get(host + port + '/invs-counter/' + counter).then((result) => {
        return result.data
    }, (err) => {
        return err
    })
}


export const upload = (data) => {
    return axios.post(host + port + '/upload', data, { headers: { 'content-type': 'multipart/form-data' } }).then(result => {
        return result.data;
    }, (err) => {
        return err
    });
}