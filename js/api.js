const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500'

async function getProfile(user_id){
    const response = await fetch(`${backend_base_url}/users/${user_id}/`, {
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

