import Cookies from 'js-cookie'
export function setUserInfo(token, id, phoneNumber) {
    //过期时间: 2h
    // let millisecond = 1
    // const expiresTime = new Date(millisecond + 60 * 1000 * 120);
    // Cookies.set('userToken', token, {
    //     expires: expiresTime
    // });
    // Cookies.set('userId', id, {
    //     expires: expiresTime
    // });
    // Cookies.set('phoneNumber',phoneNumber,{
    //     expires: expiresTime
    // })

    Cookies.set('userToken',token)
    Cookies.set('userId',id)
    Cookies.set('phoneNumber',phoneNumber)
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
