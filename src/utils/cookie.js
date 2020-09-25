import Cookies from 'js-cookie'
export function setUserInfo(token, id, phoneNumber,isLB,name) {

    Cookies.set('userToken',token)
    Cookies.set('userId',id)
    Cookies.set('phoneNumber',phoneNumber)
    Cookies.set('isLB',isLB)
    Cookies.set('name',name)
}

export function deleteToken() {
    Cookies.remove('userToken');
    Cookies.remove('userId');
    Cookies.remove('phoneNumber');
    Cookies.remove('isLB')
    Cookies.remove('name')
}
export function getUser() {
    return {
        id: Cookies.get('userId'),
        token: Cookies.get('userToken'),
        phoneNumber: Cookies.get('phoneNumber'),
        isLB: Cookies.get('isLB'),
        name: Cookies.get('name')
    }
}
