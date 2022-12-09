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

// 로그인 시 정보 가져오기
async function getName() {
    const response = await fetch(`${backend_base_url}/users/mock/`, {
        headers:{
            'Authorization':'Bearer '+localStorage.getItem("access"),
        },
    })

    if (response.status == 200) {
        const payload = localStorage.getItem("payload");
        const payload_parse = JSON.parse(payload)
        return payload_parse.user_id
    } else {
        return null
    }
}

// 로그아웃
function logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    window.location.replace(`${frontend_base_url}/html/home.html`)
    alert('로그아웃 하셨습니다')
}

async function getProfile(profile_user_id){
    const response = await fetch(`${backend_base_url}/users/${profile_user_id}/`, {
        method: 'GET',
    })
    response_json = await response.json()
    return response_json
}

async function getPosts(){
    const response = await fetch(`${backend_base_url}/posts/cummunity/`, {
        method:'GET',
    })
    response_json = await response.json()
    console.log(response_json)
    return response_json
}

async function getPassword(userinfo_user_id){
    const response = await fetch(`${backend_base_url}/users/changepassword/${userinfo_user_id}/`, {
        mthod:'GET',
    })
    if(response.status == 200){
        response_json = await response.json()
        return response_json
    }else{
        return null
    }
}

async function postPassword(password) {
    const response = await fetch(`${backend_base_url}/users/changepassword/${userinfo_user_id}/`, {
        headers:{
            "Authorization": "Bearer " +localStorage.getItem("access"),
            'Content-type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(password)
    })

  if (response.status === 200) {
      alert("비밀번호 확인 완료")
  } else if (response.status === 400) {
    alert("현재 비밀번호와 동일한 비밀번호를 입력해주세요")
  } 
}

async function putPassword(userinfo_user_id, newPassword, newPassword2){
    const changePasswordData = {
        "password":newPassword,
        "repassword":newPassword2
    }

    const response = await fetch(`${backend_base_url}/users/changepassword/${userinfo_user_id}/`,{
        headers:{
            'Authorization':'Bearer '+localStorage.getItem("access"),
            'content-type':'application/json'
        },
        method:'PUT',
        body:JSON.stringify(changePasswordData)
    })

    response_json = await response.json()
    console.log(response_json)
    if(response.status == 201){
        alert('비밀번호를 변경했습니다')
        window.location.replace(`/html/user_info.html?id=${userinfo_user_id}`)
        return response_json
    }else if(response.status == 400){
        alert(response_json.password[0])
    }
}

// 상세 페이지로 이동
function postDetail(post_id){
    const url = `${frontend_base_url}/post_detail.html?id=${post_id}`
    location.href=url
}

// 상세 페이지 GET
async function getPostDetail(post_id) {
    const response = await fetch(`${backend_base_url}/posts/${post_id}/`, {
        method: 'GET'
    })

    response_json = await response.json()
    console.log(response_json)
    return response_json
}

async function putUserinfo(userinfo_user_id, profile_img, username, nickname, bio){
    const userinfoData = new FormData()
    userinfoData.append("profile_img", profile_img)
    userinfoData.append("username", username)
    userinfoData.append("nickname", nickname)
    userinfoData.append("bio", bio)

    const response = await fetch(`${backend_base_url}/users/${userinfo_user_id}/`, {
        headers:{
            'Authorization':'Bearer '+localStorage.getItem("access"),
        },
        method:'PUT',
        body: userinfoData
    })

    response_json = response.json()
    
    if(response.status == 200){
        alert('수정되었습니다')
        return response_json
    }else{
        if(profile_img == null){
            alert('프로필 사진을 선택해주세요')
        }else{
            alert('권한이 없습니다')
        }
    }
}

async function deleteUserinfo(userinfo_user_id){
    const response = await fetch(`${backend_base_url}/users/${userinfo_user_id}/`, {
        headers:{
            'Authorization':'Bearer '+localStorage.getItem("access"),
        },
        method:'DELETE'
    })

    if(response.status == 204){
        alert('삭제되었습니다')
        window.location.replace(`/html/profile.html?id=${userinfo_user_id}`)
    }
}

// 좋아요 post
async function postLike() {
    const response = await fetch(`${backend_base_url}/posts/${post_id}/like/`, {
        headers:{
            'Authorization':'Bearer '+localStorage.getItem("access"),
            'content-type':'application/json'
        },
        method: 'POST',
    })
}

// 좋아요 get
async function getLike() {
    const response = await fetch(`${backend_base_url}/posts/${post_id}/like/`, {
        method: 'GET'
    })
    
    response_json = await response.json()
    return response_json
}

async function getBestPosts(){
    const response = await fetch(`${backend_base_url}/posts/`, {
        method:'GET',
    })
    response_json = await response.json()
    console.log(response_json)
    return response_json
}