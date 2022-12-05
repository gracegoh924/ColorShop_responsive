const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500'


// 로그인
async function handleLogin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const response = await fetch(`${backend_base_url}/users/api/token/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })

    if (response.status == 200) {
        // 로컬스토리지에 토큰 저장
        const response_json = await response.json()
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        // 로컬스토리지에 토큰 정보 저장
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        // 로그인이 성공하면 홈으로 이동
        location.replace("/html/community.html")
    }else{
        alert('아이디 혹은 비밀번호를 잘못입력했습니다')
    }
}

// 포스트 get
async function getPosts() {
    const response = await fetch(`${backend_base_url}/posts/`, {
        method: 'GET',
    })
    response_json = await response.json()
    console.log(response_json)
    return response_json
}

// 좋아요 post
async function postLike() {
    const response = await fetch(`${backend_base_url}/post/${post_id}/like/`, {
        headers:{
            'Authorization':'Bearer '+localStorage.getItem("access"),
            'content-type':'application/json'
        },
        method: 'POST',
    })
}

// 좋아요 get
async function getLike() {
    const response = await fetch(`${backend_base_url}/post/${post_id}/like/`, {
        method: 'GET'
    })
    
    response_json = await response.json()
    console.log(response_json)
    return response_json
}

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
