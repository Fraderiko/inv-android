import axios from 'axios'
import { host, port }  from '../config'

export const authCall = creds => {
    return axios.post(host + port + '/auth-counter/', creds).then((result) => {
        return result.data
    }, (err) => {
        return err
    })
}

export const getInvsCall = counter => {
    return axios.get(host + port + '/invs-counter/' + counter).then((result) => {
        console.log(result.data)
        return result.data
    }, (err) => {
        return err
    })
}


export const upload = data => {
    return axios.post(host + port + '/upload', data, { headers: { 'content-type': 'multipart/form-data' } }).then(result => {
        return result.data;
    }, (err) => {
        return err
    });
}

export const updateInvCall = inv => {
    return axios.put(host + port + '/inv/' + inv._id, inv).then((result) => {
        return result.data
    }, (err) => {
        return err
    }) 
}

export const createLines = lines => {
    return axios.post(host + port + '/line/', { lines }).then((result) => {
        return result.data
    }, (err) => {
        return err
    }) 
}

export const getTasksCall = counter => {
    return axios.get(host + port + '/tasks/counter/' + counter).then((result) => {
        return result.data
    }, (err) => {
        return err
    }) 
}

export const updateTaskCall = task => {
    return axios.put(host + port + '/tasks/' + task._id, task).then((result) => {
        return result.data
    }, (err) => {
        return err
    }) 
}