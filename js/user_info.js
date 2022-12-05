const userinfoUrl = '?id=1'
const userinfoUrlParams = new URLSearchParams(userinfoUrl)
const userinfo_user_id = userinfoUrlParams.get('id')

async function loadUserinfo(userinfo_user_id){
    const userinfo = await getProfile(userinfo_user_id)

    const userinfoImage = document.getElementById("image")
    userinfoImage.setAttribute("src", `${backend_base_url}${userinfo.profile_img}`)

    const userinfoUsername = document.getElementById("userinfo_username")
    userinfoUsername.value = userinfo.username

    const userinfoNickname = document.getElementById("userinfo_nickname")
    userinfoNickname.value = userinfo.nickname

    const userinfoBio = document.getElementById("userinfo_bio")
    userinfoBio.value = userinfo.bio
}

async function updateUserinfo(userinfo_user_id){
    const userinfoImage = document.getElementById("userinfo_image").files[0]
    const userinfoUsername = document.getElementById("userinfo_username").value
    const userinfoNickname = document.getElementById("userinfo_nickname").value
    const userinfoBio = document.getElementById("userinfo_bio").value
    
    const updateUserinfo = await putUserinfo(userinfo_user_id, userinfoImage, userinfoUsername, userinfoNickname, userinfoBio)

    window.location.replace(`/html/user_info.html?id=1`)
}

async function removeUserinfo(userinfo_user_id){
    const removeUserinfo = await deleteUserinfo(userinfo_user_id)
}

loadUserinfo(userinfo_user_id)