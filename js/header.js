const headerUrl = '?id=1'
const headerUrlParams = new URLSearchParams(headerUrl)
const header_user_id = headerUrlParams.get('id')

async function loadHeader(header_user_id){
    const user = await getProfile(header_user_id)

    const dropdownProfileImage = document.getElementById("dropdown_profile_image")
    dropdownProfileImage.setAttribute("src", `${backend_base_url}${user.profile_img}`)
    
    const dropdownUsername = document.getElementById("dropdown_username")
    dropdownUsername.innerText = user.username

    const profile = document.getElementById("profile")
    profile.setAttribute("id", `${header_user_id}`)
    profile.setAttribute("onclick", "profileButton(this.id)")

    const userinfo = document.getElementById("user_info")
    userinfo.setAttribute("id", `${header_user_id}`)
    userinfo.setAttribute("onclick", "userinfoButton(this.id)")
}

function profileButton(header_user_id){
    const url = `${frontend_base_url}/html/profile.html?id=${header_user_id}`
    location.href=url
}

function userinfoButton(header_user_id){
    const url = `${frontend_base_url}/html/user_info.html?id=${header_user_id}`
    location.href=url
}

loadHeader(header_user_id)