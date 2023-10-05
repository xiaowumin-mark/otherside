const { ipcRenderer } = require('electron')


window.onload = function () {
    

    $.ajax({
        url: 'http://182.92.84.4/api/bfsd/disk/xcx_list',
        type: 'post',
        data: {},
        success: function (res) {
            console.log(res);
            listgo(res)
        }
    });



}
function listgo(a) {
    for (let i = a.list.length - 1; i >= 0; i--) {
        
        let y = document.getElementById('main').innerHTML
        document.getElementById('main').innerHTML = y + `
        <div  onclick="Send('new_window', {'Width':1100,'Height':700,'Tltle':'${a.list[i].Name}','Frame':true,'Resizable':true,'Loadurl':'${a.list[i].Path}'},${a.list[i].ID});" class="bg-bg-200 dark:bg-bgDark-200 rounded-lg" title="在此应用中打开"> 
            <div
                class="cursor-pointer border-b border-border-100 dark:border-borderDark-100 hover:bg-bg-400 dark:hover:bg-bgDark-400 relative">
                <a class="flex p-3 lg:p-20px pr-18 lg:pr-104px group" >
                    <div
                        class="w-16 h-16 lg:w-20 lg:h-20 mr-4 rounded-md overflow-hidden flex justify-center flex-none">
                        <img class="max-h-20 max-w-20"
                            src='http://${a.list[i].Icon}' title="在默认浏览器中打开">
                    </div>
                    <div class="justify-between flex flex-col ">
                        <div>
                            <div
                                class="m-0 lg:font-light text-base lg:text-xl text-text-100 dark:text-textDark-200 flex flex-row items-center ">
                                ${a.list[i].Name}<div class="hidden lg:flex flex-row items-center"><svg
                                        class="ml-2 mr-1 fill-current text-bg-200 dark:text-bgDark-200 group-hover:text-text-300 dark:group-hover:text-textDark-300"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path
                                            d="M10 3v2H5v14h14v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6zm7.586 2H13V3h8v8h-2V6.414l-7 7L10.586 12l7-7z">
                                        </path>
                                    </svg><span
                                        class="text-bg-200 dark:text-bgDark-200 group-hover:text-text-300 dark:group-hover:text-textDark-300 text-sm"></span>
                                </div>
                            </div>
                            <div class="text-text-200 dark:text-textDark-300 font-normal multirow-ellipsis-2">${a.list[i].Introduce}
                            </div>
                        </div>
                        <div class="hidden lg:flex flex-row items-center self-end l-110px w-full mt-2">
                            
                        </div>
                    </div>
                </a>
                <div class="absolute right-3 lg:right-4" style="top: 50%; transform: translateY(-50%);">
                    <div
                        class="text-text-100 dark:text-textDark-200 cursor-pointer w-14 h-16 lg:w-16 lg:h-18 rounded-lg border border-border-100 dark:border-borderDark-100 hover:border-border-liked dark:hover:border-borderDark-liked bg-bg-200 dark:bg-bgDark-200 hover:bg-bg-300 dark:hover:bg-bgDark-300 flex flex-col items-center justify-center">
                        <svg style="margin-top: 10px;margin-left: 16px;"
                            class="fill-current text-text-100 dark:text-textDark-200" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" width="16" height="16">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 8l6 6H6z"></path>
                        </svg>
                        <div>
                            <p style="text-align: center;">${a.list[i].Star}</p>
                        </div>
                    </div>
                </div>
            </div>

        `
    }

}

function ajax(type, url, parmas, callback) {

    //创建ajax引擎对象
    let xhr = new XMLHttpRequest();
    //处理参数,定义一个空数组
    let arr = [];
    //遍历对象，拼接到数组中
    for (const key in parmas) {
        if (Object.hasOwnProperty.call(parmas, key)) {
            arr.push(key + "=" + parmas[key]);
        }
    }
    parmas = arr.join("&");

    if (type == "get") {
        //配置请求方式和请求地址
        xhr.open(type, url + "?" + parmas);
        // 发送请求
        xhr.send();
    } else {
        //配置请求方式和请求地址
        xhr.open(type, url);
        //请求头
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // 发送请求
        xhr.send(parmas);
    }

    // 监听状态变化和接收数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // 处理数据
            callback(JSON.parse(xhr.responseText));
        }
    }

}
function Send(p, d, id) {
    ipcRenderer.send(p, d)
    console.log(id);
    $.ajax({
        url: 'http://182.92.84.4/api/bfsd/disk/xcx_add_list',
        type: 'post',
        data: {"id":id},
        success: function (res) {
            console.log(res);
            
        }
    });
    $.ajax({
        url: 'http://182.92.84.4/api/bfsd/disk/xcx_list',
        type: 'post',
        data: {},
        success: function (res) {
            console.log(res);

            $('#main').empty()
            listgo(res)
        }
    });


    
}

function Search() {
    let data = $('#search_in').val()
    $.ajax({
        url: 'http://182.92.84.4/api/bfsd/disk/xcx_search_list',
        type: 'post',
        data: {"name":data},
        success: function (res) {
            console.log(res);
            $('#main').empty()
            listgo(res)
        }
    });
}