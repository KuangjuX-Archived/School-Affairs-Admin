import Cookies from 'js-cookie'
export function setUserInfo(token, id) {
    Cookies.set('userToken', token);
    Cookies.set('userId', id);
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