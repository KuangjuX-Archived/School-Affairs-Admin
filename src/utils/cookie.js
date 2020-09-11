import Cookies from 'js-cookie'
export function setUserInfo(token, id) {
    //过期时间: 2h
    var expiresTime = new Date(millisecond + 60 * 1000 * 120);
    Cookies.set('userToken', token, {
        expires: expiresTime
    });
    Cookies.set('userId', id, {
        expires: expiresTime
    });
}
export function deleteToken() {
    Cookies.remove('userToken');
    Cookies.remove('userId');
}
export function getUser() {
    return {
        id: Cookies.get('userId'),
        token: Cookies.get('userToken')
    }
}