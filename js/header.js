// 로그인 확인
async function checkLogin() {
    const name = await getName();
    const loginoutButton = document.getElementById("loginout")

    loginoutButton.innerText = ''

    if(name){
        loginoutButton.innerText = "로그아웃"
        loginoutButton.setAttribute("onclick", "logout()")
    }else{
        loginoutButton.innerText = "로그인"
        loginoutButton.setAttribute("onclick", "location.href=`${frontend_base_url}/html/sign_in_up.html`") 
    }
}

async function loadHeader(){
    var payload = localStorage.getItem("payload")
    var parsed_payload = await JSON.parse(payload)

    const user_id = parsed_payload.user_id

    const user = await getProfile(user_id)

    const dropdownProfileImage = document.getElementById("dropdown_profile_image")
    dropdownProfileImage.setAttribute("src", `${backend_base_url}${user.profile_img}`)
    
    const dropdownUsername = document.getElementById("dropdown_username")
    dropdownUsername.innerText = user.username

    const profile = document.getElementById("profile")
    profile.setAttribute("id", `${user_id}`)
    profile.setAttribute("onclick", "profileButton(this.id)")

    const userinfo = document.getElementById("user_info")
    userinfo.setAttribute("id", `${user_id}`)
    userinfo.setAttribute("onclick", "userinfoButton(this.id)")
}

function profileButton(user_id){
    const url = `${frontend_base_url}/html/profile.html?id=${user_id}`
    location.href=url
}

function userinfoButton(user_id){
    const url = `${frontend_base_url}/html/user_info.html?id=${user_id}`
    location.href=url
}

checkLogin()
loadHeader()