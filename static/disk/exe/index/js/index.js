const { ipcRenderer } = require("electron");
function cz(cz) {
    if (cz == 0) {
        ipcRenderer.send("start_msg", cz);
    } else if (cz == 1) {
        ipcRenderer.send("start_msg", cz);
    }
}
window.onload = function () {
    const webview = document.getElementById('xcx_html')

    //webview.openDevTools();


    window.location.href = "#home";
    let ys = document.getElementById('style')
    var style = localStorage.getItem('style');
    if (style == 1) {
        ys.innerHTML = `
    <style>
        .left {
            background: linear-gradient(180.00deg, rgb(227, 160, 159), rgb(129, 183, 208));            
        }
        .top {
            background: rgb(217, 162, 164);
        }
        .p{
            background-color: #ffffff
        }
    </style>
    `
    } else if (style == 2) {
        ys.innerHTML = `
    <style>
        .left {
            background: linear-gradient(180.00deg, rgb(159, 192, 214),rgb(207, 186, 135));
        }
        .top {
            background: rgb(161, 192, 211);
        }
        .p{
            background-color: #ffffff
        }
    </style>
    `
    } else if (style == 3) {
        ys.innerHTML = `
    <style>
        .left {
            background: linear-gradient(180.00deg, rgb(238, 179, 155),rgb(128, 166, 227));
        }
        .top {
            background: rgb(236, 179, 156);
        }
        .p{
            background-color: #ffffff
        }
    </style>
    `
    } else if (style == 4) {
        ys.innerHTML = `
    <style>
        .left {
            background: rgb(227, 227, 227);            
        }
        .top {
            background: rgb(227, 227, 227);
        }
        .p{
            background-color: #ffffff
        }
    </style>
    `
    } else if (style == 5) {
        ys.innerHTML = `
    <style>
        .left {
            background: rgb(36, 38, 39);
        }
        .top {
            background: rgb(36, 38, 39);
        }
        path {
            fill: rgb(221, 221, 221);
        }
        .p{
            background-color: rgb(53, 55, 56)
        }
    </style>
    `
    }
}
function stylee(nmu, id) {
    if (id == 'z') {
        document.getElementById(id).style.height = '200px'
        document.getElementById('x').style.height = '180px'
        document.getElementById('c').style.height = '180px'
        document.getElementById('v').style.height = '180px'
        document.getElementById('b').style.height = '180px'
        localStorage.setItem('style', 1);
    } else if (id == 'x') {
        document.getElementById(id).style.height = '200px'
        document.getElementById('z').style.height = '180px'
        document.getElementById('c').style.height = '180px'
        document.getElementById('v').style.height = '180px'
        document.getElementById('b').style.height = '180px'
        localStorage.setItem('style', 2);
    } else if (id == 'c') {
        document.getElementById(id).style.height = '200px'
        document.getElementById('z').style.height = '180px'
        document.getElementById('x').style.height = '180px'
        document.getElementById('v').style.height = '180px'
        document.getElementById('b').style.height = '180px'
        localStorage.setItem('style', 3);
    } else if (id == 'v') {
        document.getElementById(id).style.height = '200px'
        document.getElementById('z').style.height = '180px'
        document.getElementById('x').style.height = '180px'
        document.getElementById('c').style.height = '180px'
        document.getElementById('b').style.height = '180px'
        localStorage.setItem('style', 4);
    } else if (id == 'b') {
        document.getElementById(id).style.height = '200px'
        document.getElementById('z').style.height = '180px'
        document.getElementById('x').style.height = '180px'
        document.getElementById('c').style.height = '180px'
        document.getElementById('v').style.height = '180px'
        localStorage.setItem('style', 5);
    }

    console.log(nmu);
    let ys = document.getElementById('style')
    var style = localStorage.getItem('style');
    if (style == 1) {
        ys.innerHTML = `
    <style>
        .left {
            background: linear-gradient(180.00deg, rgb(227, 160, 159), rgb(129, 183, 208));            
            background-position: 100% .1s; 
        }
        .top {
            background: rgb(217, 162, 164);
        }
        .p{
            background-color: #ffffff
        }
    </style>
    `
    } else if (style == 2) {
        ys.innerHTML = `
    <style>
        .left {
            background: linear-gradient(180.00deg, rgb(159, 192, 214),rgb(207, 186, 135));
            background-position: 100% .1s; 
        }
        .top {
            background: rgb(161, 192, 211);
        }
        .p{
            background-color: #ffffff
        }
    </style>
    `
    } else if (style == 3) {
        ys.innerHTML = `
    <style>
        .left {
            background: linear-gradient(180.00deg, rgb(238, 179, 155),rgb(128, 166, 227));
            background-position: 100% .1s; 
        }
        .p{
            background-color: #ffffff
        }
        .top {
            background: rgb(236, 179, 156);
        }
    </style>
    `
    } else if (style == 4) {
        ys.innerHTML = `
    <style>
        .left {
            background: rgb(227, 227, 227); 

        }
        .top {
            background: rgb(227, 227, 227);
        }
        .p{
            background-color: #ffffff
        }
    </style>
    `
    } else if (style == 5) {
        ys.innerHTML = `
    <style>
        .left {
            background: rgb(36, 38, 39);
            
        }
        .top {
            background: rgb(36, 38, 39);
        }
        path {
            fill: rgb(221, 221, 221);
        }
        .p{
            background-color: rgb(53, 55, 56)
        }
    </style>
    `
    }
}