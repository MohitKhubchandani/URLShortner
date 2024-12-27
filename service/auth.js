import jwt from 'jsonwebtoken';
import { secret } from '../configs/serverConfig.js';
function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

function getUser(token){
    try {
        return jwt.verify(token, secret);   
    } catch (error) {
        return null;    
    }
}

export { setUser, getUser };