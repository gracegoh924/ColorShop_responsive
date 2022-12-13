async function loadHeader(){
    var payload = localStorage.getItem("payload")
    var parsed_payload = await JSON.parse(payload)
    console.log(payload)

    if(parsed_payload == null){
        const dropdownUsername = document.getElementById("dropdown_username")
        dropdownUsername.innerText = ''
    }else{
        const user_id = parsed_payload.user_id
        const user = await getProfile(user_id)

        const dropdownProfileImage = document.getElementById("dropdown_profile_image")
        dropdownProfileImage.setAttribute("src", `${backend_base_url}${user.profile_img}`)
        
        const dropdownUsername = document.getElementById("dropdown_username")
        dropdownUsername.innerText = user.username + '님, '
    
        const profile = document.getElementById("profile")
        profile.setAttribute("id", `${user_id}`)
        profile.setAttribute("onclick", "profileButton(this.id)")
    
        const userinfo = document.getElementById("user_info")
        userinfo.setAttribute("id", `${user_id}`)
        userinfo.setAttribute("onclick", "userinfoButton(this.id)")
    }
}

// 드롭다운 이동
function profileButton(user_id){
    if(user_id == null){
        alert('로그인해주세요')
    }else{
        const url = `${frontend_base_url}profile.html?id=${user_id}`
        location.href=url
    }
}

function userinfoButton(user_id){
    if(user_id == null){
        alert('로그인해주세요')
    }else{
        const url = `${frontend_base_url}user_info.html?id=${user_id}`
        location.href=url
    }
}

function signinupButton(){
    const url = `${frontend_base_url}sign_in_up.html`
    location.href=url
}

// 로그인 확인
async function checkLogin() {
    const name = await getName();
    const loginoutButton = document.getElementById("loginout")
    loginoutButton.innerText = ''

    if(name == null){
        loginoutButton.innerText = "로그인"
        loginoutButton.setAttribute("onclick", "location.href=`${frontend_base_url}sign_in_up.html`") 
    }else{
        loginoutButton.innerText = "로그아웃"
        loginoutButton.setAttribute("onclick", "logout()")
    }
}

loadHeader();
checkLogin();
