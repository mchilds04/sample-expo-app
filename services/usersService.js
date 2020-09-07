import users from "../data/users.json";
import { API } from "aws-amplify";

const _fakePromise = (result, waitTime = 6000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result), waitTime);
    })
};

export const getUsers = () => {
    // return _fakePromise(users);
    return API.get("UserAPI", "/api/users", {});
}

export const getUser = (id) => {
    const user = users.filter((user) => user.id === id)[0];
    return _fakePromise(user);
}

export const updateUser = (id, userInfo) => {
    const user = users.filter((user) => user.id === id)[0];
    const updatedUser = { ...user, ...userInfo };
    return _fakePromise(updatedUser);
}