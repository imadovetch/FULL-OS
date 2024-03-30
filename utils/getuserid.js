import { gettoken } from './gettoken';

export function getuserid() {
    const token = gettoken('token');

    const userId = token.substring(0, 36);
    
    return userId;
}