includehtml();

// 이미지 띄우기
const dropArea = document.querySelector(".before_image_box"),
    dragText = dropArea.querySelector("header"),
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
    dragText.textContent = "파일을 내려놓으세요";
})

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "드래그해서 스케치 이미지 업로드";
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
            let imgTag = `<img src="${fileURL}" alt=""><span class="material-symbols-outlined" onclick="delImg(this)" style="position: absolute; font-size: xx-large; font-weight: bold; cursor: pointer;">close</span>`;
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("이미지 파일이 아닙니다.");
        dropArea.classList.remove("active");
        dragText.textContent = "드래그 하여 이미지 업로드";
    }
}

function delImg(_this){
    dropArea.classList.remove("active");
    location.href=`${frontend_base_url}auto_paint.html`
}

// 이미지 post
async function postImage() {
    var loading = document.getElementById('loading_image')
    var afterImage = document.getElementById('after_image')

    loading.style.display = 'block'
    afterImage.style.display = 'none'

    var imageData = new FormData();
    imageData.append("before_image", file);
    imageData.append("model", model_json.model_path)
    const response = await fetch(`${backend_base_url}/posts/image/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        body: imageData
    })

    if (response.status == 201) {
        var loading = document.getElementById('loading_image')
        var afterImage = document.getElementById('after_image')
        
        loading.style.display = 'none'
        afterImage.style.display = 'block'

        const getimages = await getImage();
        const after_image = document.getElementById("after_image")
        after_image.setAttribute("src", `${backend_base_url}${getimages.after_image}`)
        return response
    }else{
        if(file == null){
            alert('파일을 올려주세요')
        }else if(model_json.model_path == null){
            alert('채색 모델을 선택해주세요')
        }else{
            alert('로그인이 필요한 기능입니다')
        }
    }
}

// 포스팅 모달창 띄우기
const modal = document.getElementById("post_modal");
const buttonAddFeed = document.getElementById("img_post_btn");
buttonAddFeed.addEventListener("click", (e) => {
    modal.style.top = window.pageYOffset + "px";
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";
});

// 포스팅 모달창 이미지 띄우기
async function deepImage() {
    const getimage = await getImage();
    const deepimg = document.getElementById("deepimage");
    deepimg.setAttribute("src", `${backend_base_url}${getimage.after_image}`);
}

// 포스팅 등록
function postCreate() {
    const title = document.getElementById("input_title").value;
    const content = document.getElementById("input_content").value;
    postPost(title, content);
}

// 포스팅 모달창 닫기
const buttonCloseModal = document.getElementById("close_modal");
buttonCloseModal.addEventListener("click", (e) => {
    modal.style.display = "none";
    document.body.style.overflowY = "visible";
});