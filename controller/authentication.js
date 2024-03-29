import {
    addNewUser,
    checkForUser,
    getAllUsers
} from "../models/userModel.js";

async function checkIfUserAlreadyExist(newUsername) {
    const users = await getAllUsers();
    if (users.length === 0) {
        return true
    }
    const userNameExists = users.filter(user => user.userName === newUsername);
    if (userNameExists.length > 0) {
        return false
    }
    return true
}

async function registerNewUser(userName) {
    try {
        const addUser = await addNewUser(userName);
        if (!addUser) {
            throw "Something went wrong in registering process"
        }
        return addUser;
    } catch (err) {
        //console.log(err, "36");
        return Promise.reject(err);
    }
}

async function loginUser(userName, userPassword) {
    try {
        const userExist = await checkForUser(userName, userPassword);
        if (userExist) {
            return userExist;
        }
        throw "something went wrong on our end when checking for users"
    } catch (err) {
        //console.log(err, "35");
        return Promise.reject(err);
    }

}

// TODO find a better, clean correct way to destroy session from within websocket
function destroySessionInWebsocket(req) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err, "can't destroy session");
            // ws.terminate()
        }
        console.log('session destroyed');
        // ws.close()
    });
}

export {
    registerNewUser,
    loginUser,
    checkIfUserAlreadyExist,
    destroySessionInWebsocket
}