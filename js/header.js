console.log('1')
window.onload = function (){
    checkLogin()
    dropdawn()
}

function home(){
    const url = `${frontend_base_url}home.html`
    location.href=url
}

function autoPaint(){
    const url = `${frontend_base_url}auto_paint.html`
    location.href=url
}

function community(){
    const url = `${frontend_base_url}community.html`
    location.href=url
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
    const name = await getName()

    console.log('2')
    
    const loginoutButton = document.getElementById("loginout")
    console.log(loginoutButton)
    loginoutButton.innertext = ''

    if(name == null){
        loginoutButton.innertext = "로그인/회원가입"
        loginoutButton.setAttribute("onclick", "location.href=`${frontend_base_url}sign_in_up.html`") 
    }else{
        loginoutButton.innertext = "로그아웃"
        loginoutButton.setAttribute("onclick", "logout()")
    }
}

async function dropdawn(){
    var payload = localStorage.getItem("payload")
    var parsed_payload = await JSON.parse(payload)

    if(parsed_payload != null){
        const user_id = parsed_payload.user_id
        const user = await getProfile(user_id)

    console.log('3')
    console.log(user)
            
    const dropdownProfileImage = document.getElementById("dropdown_profile_image")
    console.log(dropdownProfileImage)
    dropdownProfileImage.setAttribute("src", `${backend_base_url}${user.profile_img}`)
    
    const dropdownUsername = document.getElementById("dropdown_username")
    dropdownUsername.innertext = user.username + '님, '

    const profile = document.getElementById("profile")
    profile.setAttribute("id", `${user.id}`)
    profile.setAttribute("onclick", "profileButton(this.id)")

    const userinfo = document.getElementById("user_info")
    userinfo.setAttribute("id", `${user.id}`)
    userinfo.setAttribute("onclick", "userinfoButton(this.id)")
    }
}