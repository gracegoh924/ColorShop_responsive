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

const dropArea = document.querySelector(".before_image"),
    image = dropArea.querySelector(".userinfo_image"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file;

button.onclick = () => {
    input.click();
}

input.addEventListener("change", function () {
    file = this.files[0];
    dropArea.classList.add("active");
    showFile();
})

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
})

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
})

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showFile();
})

function showFile() {
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            image.setAttribute("src", `${fileURL}`)
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("이미지 파일이 아닙니다.");
        dropArea.classList.remove("active");
        dragText.textContent = "드래그 하여 이미지 업로드";
        window.location.reload()
    }

    button.remove()

    const buttons = document.createElement("div")

    const saveButton = document.createElement("button")
    saveButton.setAttribute("onclick", "save()") 
    saveButton.innerText = '저장'
    
    const cancelButton = document.createElement("button")
    cancelButton.setAttribute("onclick", "cancel()")
    cancelButton.innerText = '취소'

    buttons.append(saveButton)
    buttons.append(cancelButton)
    dropArea.append(buttons)

}

async function save() {
    const userinfoUsername = document.getElementById("userinfo_username")

    await putUserinfoImage(userinfo_user_id, file, userinfoUsername.value)
}

function cancel() {
    window.location.reload()
}

async function updateUserinfo(){
    const userinfoUsername = document.getElementById("userinfo_username")
    const userinfoNickname = document.getElementById("userinfo_nickname")
    const userinfoBio = document.getElementById("userinfo_bio")

    await putUserinfo(userinfo_user_id, userinfoUsername.value, userinfoNickname.value, userinfoBio.value)
}

async function removeUserinfo(){
    const userinfo = await getProfile(userinfo_user_id)
    if(userinfo_user_id == userinfo){
        await deleteUserinfo(userinfo_user_id)
    }else{
        
    }
}

// 포스팅 모달창 띄우기
const removeModal = document.getElementById("remove_modal");
const removeButton = document.getElementById("remove_userinfo");
removeButton.addEventListener("click", e => {
    removeModal.style.display = "flex";
    document.body.style.overflowY = "hidden";
})

async function removeUserinfo(){
    await deleteUserinfo(userinfo_user_id)
}

// 포스팅 모달창 닫기
const removeModalClose = document.getElementById("no_button");
removeModalClose.addEventListener("click", e => {
    removeModal.style.display = "none";
    document.body.style.overflowY = "visible";
});


async function changePassword(){
    const newPassword = document.getElementById("new_password").value
    const newPassword2 = document.getElementById("new_password2").value

    await putPassword(userinfo_user_id, newPassword, newPassword2)
}

// 포스팅 모달창 띄우기
const passwordModal = document.getElementById("password_modal");
const passwordModalOpen = document.getElementById("button-addon");
passwordModalOpen.addEventListener("click", e => {
    passwordModal.style.display = "flex";
    document.body.style.overflowY = "hidden";
})

// 포스팅 모달창 닫기
const passwordModalClose = document.getElementById("password_modal_close");
passwordModalClose.addEventListener("click", e => {
    passwordModal.style.display = "none";
    document.body.style.overflowY = "visible";
});

loadUserinfo(userinfo_user_id);
