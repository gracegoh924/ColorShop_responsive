includehtml();

const userinfoUrlParams = new URLSearchParams(window.location.search)
const userinfo_user_id = userinfoUrlParams.get('id')

async function loadUserinfo(userinfo_user_id){
    const userinfo = await getProfile(userinfo_user_id)

    const userinfoImage = document.getElementById("image")
    userinfoImage.setAttribute("src", `${backend_base_url}${userinfo.profile_img}`)

    const userinfoUsername = document.getElementById("userinfo_username")
    userinfoUsername.value = userinfo.username
    
    const userinfoPassword = document.getElementById("userinfo_password")
    userinfoPassword.value = userinfo.password

    const userinfoNickname = document.getElementById("userinfo_nickname")
    userinfoNickname.value = userinfo.nickname

    const userinfoBio = document.getElementById("userinfo_bio")
    userinfoBio.value = userinfo.bio

    var payload = localStorage.getItem("payload")
    var parsed_payload = await JSON.parse(payload)

    if(parsed_payload == null || parsed_payload.user_id != userinfo.id){
        const userinfoImage = document.getElementById("userinfo_image")
        userinfoImage.style.visibility = "hidden"

        const userinfoUsername = document.getElementById("userinfo_username")
        userinfoUsername.readOnly = true

        const userinfoNickname = document.getElementById("userinfo_nickname")
        userinfoNickname.readOnly = true

        const userinfoBio = document.getElementById("userinfo_bio")
        userinfoBio.readOnly = true

        const updateUserinfo = document.getElementById("update_userinfo")
        updateUserinfo.style.visibility = "hidden"

        const removeUserinfo = document.getElementById("remove_userinfo")
        removeUserinfo.style.visibility = "hidden"

        const changePassword = document.getElementById("button-addon")
        changePassword.style.visibility = "hidden"
    }
}

async function updateUserinfo(){
    const userinfoImage = document.getElementById("userinfo_image").files[0]
    const userinfoUsername = document.getElementById("userinfo_username").value
    const userinfoNickname = document.getElementById("userinfo_nickname").value
    const userinfoBio = document.getElementById("userinfo_bio").value
    
     await putUserinfo(userinfo_user_id, userinfoImage, userinfoUsername, userinfoNickname, userinfoBio)

    window.location.reload()
}

async function removeUserinfo(){
    const removeUserinfo = await deleteUserinfo(userinfo_user_id)
}

async function changePassword(){
    const changePasswordButton = document.getElementById("button-addon")
    const newPassword = document.getElementById("new_password").value
    const newPassword2 = document.getElementById("new_password2").value

    await putPassword(userinfo_user_id, newPassword, newPassword2)
}

// 포스팅 모달창 띄우기
const modal = document.getElementById("post_modal");
const buttonAddFeed = document.getElementById("button-addon");
buttonAddFeed.addEventListener("click", e => {
    modal.style.top = window.pageYOffset + 'px';
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";
})

// 포스팅 모달창 닫기
const buttonCloseModal = document.getElementById("close_modal");
buttonCloseModal.addEventListener("click", e => {
    modal.style.display = "none";
    document.body.style.overflowY = "visible";
});


loadUserinfo(userinfo_user_id);
