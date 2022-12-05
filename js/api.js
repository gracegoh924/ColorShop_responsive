const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500'

async function getProfile(profile_user_id){
    const response = await fetch(`${backend_base_url}/users/${profile_user_id}/`, {
        method:'GET',
    })
    response_json = await response.json()
    return response_json
}

async function getPost(){
    const response = await fetch(`${backend_base_url}/posts/`, {
        method:'GET',
    })
    response_json = await response.json()
    return response_json
}

async function putUserinfo(userinfo_user_id, profile_img, username, nickname, bio){
    const userinfoData = new FormData()
    userinfoData.append("profile_img", profile_img)
    userinfoData.append("username", username)
    userinfoData.append("nickname", nickname)
    userinfoData.append("bio", bio)

    const response = await fetch(`${backend_base_url}/users/1/`, {
        headers:{
            'Authorization':'Bearer '+localStorage.getItem("access"),
        },
        method:'PUT',
        body: userinfoData
    })
    
    if(response.status == 200){
        response_json = response.json()
        alert('수정되었습니다')
        return response_json
    }
}

async function deleteUserinfo(userinfo_user_id){
    const response = await fetch(`${backend_base_url}/users/1/`, {
        headers:{
            'Authorization':'Bearer '+localStorage.getItem("access"),
        },
        method:'DELETE'
    })

    if(response.status == 204){
        alert('삭제되었습니다')
        window.location.replace(`/html/profile.html?id=1`)
    }
}
