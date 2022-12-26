includehtml();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
clear();

var dx = canvas.offsetLeft;
var dy = canvas.offsetTop;
var onoff = false;
var oldx = -dx;
var oldy = -dy;

var linecolor = "black";
var linw = 4;

var dir;

var file = document.getElementById("files")

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

if (IsPC()) {
    canvas.addEventListener("mousemove", draw, true);
    canvas.addEventListener("mousedown", down, false);
    canvas.addEventListener("mouseup", up, false);
} else {
    canvas.addEventListener("touchmove", touch, true);
    canvas.addEventListener("touchend", touch, false);
    canvas.addEventListener("touchstart", touch, false);
}

function touch(event) {
    var event = event || window.event;
    switch (event.type) {
        case "touchstart":
            onoff = true;
            oldx = event.touches[0].clientX - dx;
            oldy = event.touches[0].clientY - dy;
            break;
        case "touchend":
            onoff = false;
            var oldx = -dx;
            var oldy = -dy;
            cPush();
            break;
        case "touchmove":
            if (true == onoff) {
                var newx = event.touches[0].clientX - dx;
                var newy = event.touches[0].clientY - dy;
                ctx.beginPath();
                ctx.moveTo(oldx, oldy);
                ctx.lineTo(newx, newy);
                ctx.strokeStyle = linecolor;
                ctx.lineWidth = linw;
                ctx.lineCap = "round";
                ctx.stroke();
                oldx = newx;
                oldy = newy;
            }
            break;
    }

}

function clear() {
    canvas.height = canvas.height;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 512, 512);
}

var cPushArray = new Array();
var cStep = -1;

function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(canvas.toDataURL());
}

cPush();
function cUndo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () {
            clear();
            ctx.drawImage(canvasPic, 0, 0);
        }
    }
}

function cRedo() {
    if (cStep < cPushArray.length - 1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () {
            clear();
            ctx.drawImage(canvasPic, 0, 0);
        }
    }
}

function down(event) {
    onoff = true;
    oldx = event.offsetX;
    oldy = event.offsetY;
}

function up(event) {
    onoff = false;
    var oldx = -dx;
    var oldy = -dy;
    cPush();
}

function draw(event) {
    if (true == onoff) {
        var newx = event.offsetX;
        var newy = event.offsetY;
        ctx.beginPath();
        ctx.moveTo(oldx, oldy);
        ctx.lineTo(newx, newy);
        ctx.strokeStyle = linecolor;
        ctx.lineWidth = linw;
        ctx.lineCap = "round";
        ctx.stroke();
        oldx = newx;
        oldy = newy;
    }
}

function cReset() {
    clear();
}

$("#import").click(function () {
    $("#files").click();
});

function resize(maxWidth, maxHeight, width, height) {
    var param = {
        width: width,
        height: height
    };
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    return param;
}

function selectImage() {
    var img = new Image();
    var reader = new FileReader();
    file = this.files[0];
    reader.onload = function () {
        img.src = this.result;
    }
    reader.readAsDataURL($('#files').prop('files')[0]);
    img.onload = function () {
        var height = img.height;
        var width = img.width;
        var new_height, new_width;
        if (height > width) {
            if (height > 512) {
                new_height = 512;
                new_width = 512 * width / height;
            } else {
                new_height = height;
                new_width = width;
            }
        } else {
            if (width > 512) {
                new_width = 512;
                new_height = 512 * height / width;
            } else {
                new_height = height;
                new_width = width;
            }
        }
        clear();
        ctx.drawImage(img, (512 - new_width) / 2, (512 - new_height) / 2, new_width, new_height);
    }
}

async function cSketchify() {
    var img = new Image();
    var reader = new FileReader();
    reader.onload = function () {
        img.src = this.result;
    }
    var imageData = new FormData();
    var image = canvas.toDataURL("image/png", 0.1).substring(22)
    imageData.append("image_url", image);
    imageData.append("model", "./AutoPainter/media/autopaint_model/model1/")
    const response = await fetch(`${backend_base_url}/posts/sketchify/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        body: imageData
    })

    if (response.status == 201) {
        const getimages = await getImage();
        img.src = `${backend_base_url}${getimages.after_image}`
        img.crossOrigin = 'Anonymous';
            img.onload = function () {
                clear();
                ctx.drawImage(img, 0, 0);
            }
        return response
    }else{
        if(image == null){
            alert('이미지 파일을 선택해주세요')
        }else{
            alert('로그인이 필요한 기능입니다')
        }
    }
}

async function transForm1(event) {
    var img = new Image();
    var reader = new FileReader();
    reader.onload = function () {
        img.src = this.result;
    }
    var imageData = new FormData();
    var image = canvas.toDataURL("image/png").substring(22)
    imageData.append("image_url", image);
    const response = await fetch(`${backend_base_url}/posts/trans1/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        body: imageData
    })

    if (response.status == 201) {
        const getimages = await getImage();
        const after_image = document.getElementById("imgResult")
        after_image.setAttribute("src", `${backend_base_url}${getimages.after_image}`)
        return response
    }else{
        if(this == null){
            alert('파일을 올려주세요')
        }else{
            alert('로그인이 필요한 기능입니다')
        }
    }
}

async function transForm2(event) {
    var img = new Image();
    var reader = new FileReader();
    reader.onload = function () {
        img.src = this.result;
    }
    var imageData = new FormData();
    var image = canvas.toDataURL("image/png").substring(22)
    imageData.append("image_url", image);
    const response = await fetch(`${backend_base_url}/posts/trans2/`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        body: imageData
    })

    if (response.status == 201) {
        const getimages = await getImage();
        const after_image = document.getElementById("imgResult")
        after_image.setAttribute("src", `${backend_base_url}${getimages.after_image}`)
        return response
    }else{
        if(image == null){
            alert('파일을 올려주세요')
        }else{
            alert('로그인이 필요한 기능입니다')
        }
    }
}


function updateBorders(color) {
    var hexColor = "transparent";
    if (color) {
        hexColor = color.toHexString();
    }
    linecolor = hexColor;
}

$(function () {

    $("#full").spectrum({
        allowEmpty: true,
        color: "#ECC",
        showInput: true,
        containerClassName: "full-spectrum",
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,
        showAlpha: true,
        maxPaletteSize: 10,
        preferredFormat: "hex",
        localStorageKey: "spectrum.demo",
        move: function (color) {
            updateBorders(color);
        },
        show: function () {

        },
        beforeShow: function () {

        },
        hide: function (color) {
            updateBorders(color);
        },

        palette: [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", /*"rgb(153, 153, 153)","rgb(183, 183, 183)",*/
                "rgb(204, 204, 204)", "rgb(217, 217, 217)", /*"rgb(239, 239, 239)", "rgb(243, 243, 243)",*/ "rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
        ]
    });

});

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