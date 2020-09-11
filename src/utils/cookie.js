import Cookies from 'js-cookie'
export function setUserInfo(token, id, phoneNumber) {
    Cookies.set('userToken', token);
    Cookies.set('userId', id);
    Cookies.set('phoneNumber',phoneNumber);
}
export function deleteToken() {
    Cookies.remove('userToken');
    Cookies.remove('userId');
    Cookies.remove('phoneNumber');
}
export function getUser() {
    return {
        id: Cookies.get('userId'),
        token: Cookies.get('userToken'),
        phoneNumber: Cookies.get('phoneNumber')
    }
}
