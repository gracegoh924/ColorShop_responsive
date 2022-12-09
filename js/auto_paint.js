includehtml();

// 이미지 띄우기
const dropArea = document.querySelector(".before_image"),
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
            let imgTag = `<img src="${fileURL}" alt="">`;
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("이미지 파일이 아닙니다.");
        dropArea.classList.remove("active");
        dragText.textContent = "드래그 하여 이미지 업로드";
    }
}



// 이미지 post
async function postImage() {
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
        // 홈페이지에서 after_image 띄우기
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
async function deepImages() {
    const getimages = await getImages();
    const deepimg = document.getElementById("deepimage");
    deepimg.setAttribute("src", `${backend_base_url}${getimages.after_image}`);
}

// 포스팅 등록
function postCreate() {
    const content = document.getElementById("input_content").value;
    postPost(content);
}

// 포스팅 모달창 닫기
const buttonCloseModal = document.getElementById("close_modal");
buttonCloseModal.addEventListener("click", (e) => {
    modal.style.display = "none";
    document.body.style.overflowY = "visible";
});