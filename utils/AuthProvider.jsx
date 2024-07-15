import Cookies from "universal-cookie"

function CheckLogin(){
    let cookies = new Cookies();
    const token = cookies.get('token')
    const userId = cookies.get('userId')

    return (token && userId)
}

export default CheckLogin