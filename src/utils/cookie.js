import Cookies from 'js-cookie'
export function setUserInfo(token, id, phoneNumber,isLB) {

    Cookies.set('userToken',token)
    Cookies.set('userId',id)
    Cookies.set('phoneNumber',phoneNumber)
    Cookies.set('isLB',isLB)
}

export function deleteToken() {
    Cookies.remove('userToken');
    Cookies.remove('userId');
    Cookies.remove('phoneNumber');
    Cookies.remove('isLB')
}
export function getUser() {
    return {
        id: Cookies.get('userId'),
        token: Cookies.get('userToken'),
        phoneNumber: Cookies.get('phoneNumber'),
        isLB: Cookies.get('isLB')
    }
}
