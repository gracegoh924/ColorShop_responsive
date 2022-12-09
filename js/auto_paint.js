includehtml();

//URL 설정
const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500/html/'

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

// 채색 모델 설정
async function chooseModel(imagemodel_id){ 
    const response = await fetch(`${backend_base_url}/posts/choosemodel/${imagemodel_id}`, {
        method:'GET',
    })
    model_json = await response.json()
    return model_json
}

// 이미지 post
async function postImage() {
    var imageData = new FormData();
    imageData.append("before_image", file);
    imageData.append("model", model_json.model_path)
    for (var pair of imageData.entries()) {
        console.log(pair[0]+','+pair[1]);
    }
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
        }else if(model_json.model == null){
            alert('채색 모델을 선택해주세요')
        }else{
            alert('로그인이 필요한 기능입니다')
        }
    }
}

// 이미지 GET
async function getImage() {
    const response = await fetch(`${backend_base_url}/posts/image/`, {
        method: 'GET',
    })
    response_json = await response.json()
    response_json_a = response_json[response_json.length - 1];

    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    if(payload_parse == null){
        alert('로그인 해주세요')
    }else if(payload_parse.username == response_json_a.user){
        return response_json_a
    }else{
        const result = response_json.filter(function (r) { return r.user == payload_parse.username })
        const result_image = result[result.length -1]
        return result_image
    }
}