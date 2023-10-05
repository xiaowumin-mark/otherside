window.onload = function () {
    //发起请求获取token
    removeCookie('FilesAdd')
    setCookie('FilesAdd', '')




    //


    if (isMobile()) {

        if (sj == false) {
            console.log("手机");
            location.href = "/town/disk/sj"
        }

        // 判断true跳转到这个主页
    } else {

        console.log("pc");

    }

    GetFileList('/')




    $.ajax({
        url: ym + "api/town/disk/token",      //请求接口的地址
        type: "GET",                                   //请求的方法GET/POST
        data: {},
        success: function (res) {                      //请求成功后的操作
            console.log(res);
            let token = res
            document.getElementById('html_token').innerHTML = token.token
            //在控制台输出返回结果
        },
        error: function (err) {                       //请求失败后的操作
            console.log(22);
            err('e', '向服务器请求通行证失败，请稍后再试~')                          //请求失败在控制台输出22
        }
    })
    //let all = '<tr class="MuiTableRow-root jss609" draggable="true"><th class="MuiTableCell-root MuiTableCell-body jss616" role="cell" scope="row"><p class="MuiTypography-root jss614 jss613 MuiTypography-body2"><div><svg class="MuiSvgIcon-root jss610" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg></div>'+ q +'</p></th><td class="MuiTableCell-root MuiTableCell-body jss615 jss616"><p class="MuiTypography-root jss614 jss613 MuiTypography-body2"></p></td></tr>'
    let cookie_d = document.cookie


    let d_type = getCookie('d_type')
    console.log(d_type);
    d_type_ = document.cookie.indexOf("d_type=");
    console.log(d_type_);

    if (d_type_ == -1) {
        document.getElementById('top').innerHTML = '<div class="dropdown"><button onclick="myFunction()"class="dropbtn">菜单</button><div id="myDropdown"class="dropdown-content"><a href="#"onclick="$(\'#myModal\').modal(\'show\');">获取临时通行证</a><a href="#"onclick="$(\'#getppter\').modal(\'show\');">申请成为ppt创作者</a><a href="#"onclick="$(\'#login\').modal(\'show\');">登录ppter账户</a></div></div>'
        setCookie('d_type', 'pt', 60)
    } else if (d_type == 'pt') {
        document.getElementById('top').innerHTML = '<div class="dropdown"><button onclick="myFunction()"class="dropbtn">菜单</button><div id="myDropdown"class="dropdown-content"><a href="#"onclick="$(\'#myModal\').modal(\'show\');">获取临时通行证</a><a href="#"onclick="$(\'#getppter\').modal(\'show\');">申请成为ppt创作者</a><a href="#"onclick="$(\'#login\').modal(\'show\');">登录ppter账户</a></div></div>'
    } else if (d_type == 'ppter') {

        document.getElementById('top').innerHTML = '<div class="dropdown"><button onclick="myFunction()"class="dropbtn">菜单</button><div id="myDropdown"class="dropdown-content"><a href="#"onclick="$(\'#myModal\').modal(\'show\');">获取临时通行证</a><a href="#"onclick="$(\'#login\').modal(\'show\');">登录ppter账户</a><a href="#"onclick="$(\'#up_file\').modal(\'show\');">上传文件</a><a href="#"onclick="$(\'#mkdir\').modal(\'show\');">新建文件夹</a></div></div>'
        document.getElementById('ppter_img').innerHTML = '<i class="wp-s-header-user__body-vip-icon vipicon inline-block-v-middle vipicon-2-3"></i>'
        let ldata = getCookie('data')
        console.log($.parseJSON(ldata));
        let s = $.parseJSON(ldata)
        $.ajax({
            url: ym + "api/town/disk/loginppter",      //请求接口的地址
            type: "GET",                                   //请求的方法GET/POST
            data: s,
            success: function (res) {                      //请求成功后的操作
                console.log(res);
                if (res.Err == 'true') {
                    console.log(111);


                } else {
                    console.log(222);
                    err('e', '您的ppt创作者账号已被管理员删除！！')
                    removeCookie("data")
                    removeCookie('d_type')
                    setTimeout(function () {
                        location.reload(true);
                    }, 3000)
                }
                //setCookie('d_type','false_ppter','Thu, 18 Dec 2999 12:00:00 GMT')
                //在控制台输出返回结果
            },
            error: function (err) {                       //请求失败后的操作
                console.log(22);
                //请求失败在控制台输出22
            }
        })
    } else if (d_type == 'false_ppter') {

        document.getElementById('top').innerHTML = '<div class="dropdown"><button onclick="myFunction()"class="dropbtn">菜单</button><div id="myDropdown"class="dropdown-content"><a href="#"onclick="$(\'#myModal\').modal(\'show\');">获取临时通行证</a><a href="#"onclick="$(\'#login\').modal(\'show\');">登录ppter账户</a></div></div>'
        let ldata = getCookie('data')
        console.log(ldata);
        let s = $.parseJSON(ldata)
        $.ajax({
            url: ym + "api/town/disk/loginppter",      //请求接口的地址
            type: "GET",                                   //请求的方法GET/POST
            data: s,
            success: function (res) {                      //请求成功后的操作
                console.log(res);
                if (res.Err == 'true') {
                    console.log(111);
                    setCookie('d_type', 'ppter', 60)
                    err('s', '您的ppt创作者账号已通过审核！！')
                    setTimeout(function () {
                        location.reload(true);
                    }, 3000)
                } else if (res.Msg == '此账号未转正') {
                    err('s', '您的ppt创作者账号正在等待审核！！')


                } else {
                    removeCookie('d_type')
                    removeCookie('data')
                    err('e', '您的ppt创作者账号审核失败！！')
                    setTimeout(function () {
                        location.reload(true);
                    }, 3000)
                }
                //setCookie('d_type','false_ppter','Thu, 18 Dec 2999 12:00:00 GMT')
                //在控制台输出返回结果
            },
            error: function (err) {                       //请求失败后的操作
                console.log(22);

                //请求失败在控制台输出22
            }
        })
    }

}

function getCookie(cookieName) {
    const strCookie = document.cookie
    const cookieList = strCookie.split(';')

    for (let i = 0; i < cookieList.length; i++) {
        const arr = cookieList[i].split('=')
        if (cookieName === arr[0].trim()) {
            return arr[1]
        }
    }

    return ''
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function removeCookie(name) {
    setCookie(name, 1, -1); //-1就是告诉系统已经过期，系统就会立刻去删除cookie
};

let ppt = '<svg heiht="40px" width="40px" t="1689057811278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1201" height="40px"><path d="M219.424 18.304h530.272l201.152 219.424v768H219.424V18.304z" fill="#FFFFFF" p-id="1202"></path><path d="M733.696 253.728V50.304H251.424v923.424h667.424v-720h-185.152z m217.152-16v768H219.424V18.304h530.272l201.152 219.424z m-58.08-16l-127.04-138.624v138.624h127.04z" fill="#465F78" p-id="1203"></path><path d="M64 256m32 0l448 0q32 0 32 32l0 448q0 32-32 32l-448 0q-32 0-32-32l0-448q0-32 32-32Z" fill="#FF501A" p-id="1204"></path><path d="M640 416h224v37.344h-224V416zM640 509.344h224v37.312h-224v-37.312zM640 602.656h224V640h-224v-37.344z" fill="#FF501A" p-id="1205"></path><path d="M224 658.88V384h89.056c33.76 0 55.744 1.376 66.016 4.128 15.744 4.128 28.928 13.12 39.552 27.008 10.624 13.76 15.936 31.552 15.936 53.44 0 16.864-3.072 31.04-9.184 42.56-6.112 11.488-13.952 20.544-23.424 27.2a80.352 80.352 0 0 1-28.704 12.928c-13.248 2.624-32.448 3.936-57.568 3.936h-36.16v103.68H224z m55.488-228.384v78.016h30.4c21.856 0 36.48-1.44 43.84-4.32a36.576 36.576 0 0 0 23.616-34.88c0.032-10.016-2.88-18.24-8.768-24.736a38.4 38.4 0 0 0-22.336-12.192c-6.624-1.28-19.936-1.888-39.936-1.888h-26.816z" fill="#FFFFFF" p-id="1206"></path></svg>'
let zip = '<svg width="40px" t="1689057841441" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1348" width="200" height="40px"><path d="M219.424 18.304h530.272l201.152 219.424v768H219.424V18.304z" fill="#FFFFFF" p-id="1349"></path><path d="M733.696 253.728V50.304H251.424v923.424h667.424v-720h-185.152z m217.152-16v768H219.424V18.304h530.272l201.152 219.424z m-58.08-16l-127.04-138.624v138.624h127.04z" fill="#465F78" p-id="1350"></path><path d="M64 288a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v448a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288zM640 416h224v37.344h-224V416zM640 509.344h224v37.312h-224v-37.312zM640 602.656h224V640h-224v-37.344z" fill="#EDC314" p-id="1351"></path><path d="M224.288 663.264v-35.04l139.36-195.52H224V384h213.824v35.04l-139.52 195.552h139.776v48.672H224.32z" fill="#FFFFFF" p-id="1352"></path></svg>'
let file = '<img width="40px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcf++Hv/ZU//OPv/DL/+9Gv/BI/+4Bf+4Ef/XcP/LOP/TSf/RRP/WTv/JM/+3Ef+9Ff/bhf+5BP/DJf+yDv/imv/kqv/bXP/w0v/fd//calQXUgwAAAAKdFJOUwB///8d3L9enl8sr20gAAACN0lEQVRYw+2Y65abIBRGE1EzVbyNSW18/wctHA6XYw4q9Ee7Vt2AgOHbcVyTOMztdnFxcXFMWf7gKHN190VRKDpFC0iNqB5ZvqpXzJRxHoF7hrAa9/hK9j2oYIA2QA/UqXeyNg5QDBrshhHbUH8xxO+uT7sOJ/tU5a4wh0eK8KmKHTxd28Bfo16pqphep5l6I+R/p8xr668kVghVceH8M5EZYnGhnBKRceGqmaZXPPw2xbO+1xU+8axwe8NfzkIV7xVZdF0AVhi+rWdxIfgmwloE6CkrDCPwJbYUeFgK61icxFcNKyxIxE+WgnllQ0y4+HffzZ8WZtJlCDtz+CzqaaFaVGiWBNEOZZ15zihsT2CFnXk4QStsLohTU3FC+Af8I8JWV1fa1jy8u+hnOUy2vnd5SkeGrJBfHZwDbxe87pfxQvejmMZZYxxdYSoyVyixSvtXFLJ7hWq5xCRNSTozczzHCj8T54kI5d8QCtvZAodDIa7DgRkJaII2hBfaJC7EOE7D076XuIoVBu8oN3kpBLVt4YXBVaUSFSbS5Akb00znSoPn9KCJCN0am7SnGhganC4kKhR2MV0vvEn4M7bFhM3GIZqtgfiPr9BdSAYnrnCX3rQeB/2xsKcHouiBBhpO+phQL9CdjmKqsRkXpkMz57dmfTY1v3k8is26zvN2A6yIbKVqm/tMjFBMp5jpxrWKbsB1dJw/AsC3Lt/YEaK7x1t5r7aLj3ned/fRj1TK3H9wXFxc/F/8BgM0jBZ4nc19AAAAAElFTkSuQmCC">'
let doc = '<svg width="40px" t="1689057861522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1492" width="40px" height="40px"><path d="M219.424 18.304h530.272l201.152 219.424v768H219.424V18.304z" fill="#FFFFFF" p-id="1493"></path><path d="M733.696 253.728V50.304H251.424v923.424h667.424v-720h-185.152z m217.152-16v768H219.424V18.304h530.272l201.152 219.424z m-58.08-16l-127.04-138.624v138.624h127.04z" fill="#465F78" p-id="1494"></path><path d="M73.152 288a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v448a32 32 0 0 1-32 32h-448a32 32 0 0 1-32-32V288zM640 416h224v37.344h-224V416zM640 509.344h224v37.312h-224v-37.312zM640 602.656h224V640h-224v-37.344z" fill="#317BFF" p-id="1495"></path><path d="M221.952 640l-56.256-235.616H214.4l35.52 161.856 43.072-161.856h56.576l41.28 164.576 36.16-164.576h47.904L417.696 640h-50.464l-46.912-176.16L273.536 640H221.952z" fill="#FFFFFF" p-id="1496"></path></svg>'
let jpg = '<svg width="40px" t="1689057928261" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1636" width="40px" height="40px"><path d="M153.6 18.2784h530.2784l201.1648 219.4432v768H153.6V18.2784z" fill="#FFFFFF" p-id="1637"></path><path d="M658.2784 263.3216V69.4784H204.8v885.0432h629.0432v-691.2h-175.5648z m226.7648-25.6v768H153.6V18.2784h530.2784l201.1648 219.4432z m-92.928-25.6l-82.6368-90.112v90.112h82.6368z" fill="#465F78" p-id="1638"></path><path d="M533.9136 358.4H614.4v223.0784c0 29.184-2.9184 51.6096-8.704 67.2768-7.8336 20.5312-22.016 37.0176-42.5984 49.5616-20.5824 12.288-47.6672 18.4832-81.3568 18.4832-39.424 0-69.8368-9.728-91.136-29.0816-21.2992-19.5584-32-48.128-32.2048-85.8112l76.1344-7.68c0.9216 20.1728 4.3008 34.4576 10.0864 42.752 8.7552 12.6976 22.016 18.9952 39.8848 18.9952 18.0224 0 30.72-4.4544 38.1952-13.4656 7.4752-9.1136 11.2128-27.9552 11.2128-56.4736V358.4z" fill="#26B99A" p-id="1639"></path></svg>'
let png = '<svg width="40px" t="1689057939596" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1781" width="40px" height="40px"><path d="M153.6 18.2784h530.2784l201.1648 219.4432v768H153.6V18.2784z" fill="#FFFFFF" p-id="1782"></path><path d="M658.2784 263.3216V69.4784H204.8v885.0432h629.0432v-691.2h-175.5648z m226.7648-25.6v768H153.6V18.2784h530.2784l201.1648 219.4432z m-92.928-25.6l-82.6368-90.112v90.112h82.6368z" fill="#465F78" p-id="1783"></path><path d="M358.4 256v460.8h100.6592v-149.4016h84.5824c36.5568 0 67.7376-6.5024 93.44-19.5584 25.856-13.056 45.6192-31.2832 59.2896-54.6816 13.6192-23.3984 20.4288-50.432 20.4288-80.9984 0-30.6176-6.7584-57.6-20.224-80.9984A138.0864 138.0864 0 0 0 638.464 275.968C613.0688 262.7072 582.2976 256 546.2016 256H358.4z m100.6592 233.3184V335.6672h67.84c19.5072 0 35.6352 3.2256 48.3328 9.6768 12.7488 6.2976 22.1696 15.2064 28.3648 26.7776 6.3488 11.3664 9.5232 24.7296 9.5232 40.0384 0 15.1552-3.1744 28.5696-9.5232 40.2432a65.2288 65.2288 0 0 1-28.3648 27.2384c-12.544 6.4512-28.4672 9.728-47.872 9.728H459.0592z" fill="#88C057" p-id="1784"></path></svg>'
let ico = '<svg width="40px" t="1689057950632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1926" width="40px" height="40px"><path d="M153.6 18.2784h530.2784l201.1648 219.4432v768H153.6V18.2784z" fill="#FFFFFF" p-id="1927"></path><path d="M658.2784 263.3216V69.4784H204.8v885.0432h629.0432v-691.2h-175.5648z m226.7648-25.6v768H153.6V18.2784h530.2784l201.1648 219.4432z m-92.928-25.6l-82.6368-90.112v90.112h82.6368z" fill="#465F78" p-id="1928"></path><path d="M563.2 307.2v409.6H460.8V307.2h102.4z" fill="#317BFF" p-id="1929"></path></svg>'
let pdf = '<svg width="40px" t="1689057959326" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2071" width="40px" height="40px"><path d="M153.6 18.2784h530.2784l201.1648 219.4432v768H153.6V18.2784z" fill="#FFFFFF" p-id="2072"></path><path d="M658.2784 263.3216V69.4784H204.8v885.0432h629.0432v-691.2h-175.5648z m226.7648-25.6v768H153.6V18.2784h530.2784l201.1648 219.4432z m-92.928-25.6l-82.6368-90.112v90.112h82.6368z" fill="#465F78" p-id="2073"></path><path d="M759.9104 572.0064c-11.3664-13.6704-34.6624-20.2752-71.2704-20.2752-21.248 0-46.9504 2.2528-76.3392 6.7584-80.384-59.392-102.912-124.928-102.912-124.928s13.7728-35.328 14.6432-93.0304c0.512-36.5056-5.0688-61.0816-19.456-75.3664A35.584 35.584 0 0 0 480.4608 256a31.5392 31.5392 0 0 0-18.8416 6.0416c-41.8304 30.9248 3.7888 176.64 5.0176 180.48-19.712 49.0496-44.544 101.0176-70.144 146.688-8.2944 14.848-7.4752 13.6704-14.4896 25.7536 0 0-70.7584 33.536-105.0624 74.752-19.3536 23.3472-21.8112 39.0656-20.7872 51.0464v0.256c1.6384 14.1312 19.5584 26.9824 37.5296 26.9824l2.2528-0.0512c18.2784-1.1776 38.3488-14.336 61.2864-40.192 15.1552-17.1008 34.816-47.104 58.5216-89.344 67.9936-19.5584 127.8464-33.4848 178.0224-41.472 36.7616 20.0192 91.4944 42.7008 128.768 42.7008 12.4928 0 22.528-2.56 29.8496-7.68 8.7552-6.0416 12.4928-13.6192 14.848-27.648 2.304-13.9776-0.9216-24.576-7.3728-32.3072z m-79.4112 17.0496c32.6656 0 50.3808 4.8128 59.4944 8.8064a38.5024 38.5024 0 0 1 6.2464 3.4816c-2.56 1.6384-7.5776 3.7376-16.6912 3.7376-15.104 0-34.9184-5.3248-59.136-15.872l10.0864-0.1536zM486.7072 285.184l0.1024-0.1536c7.0144 3.7376 10.24 29.952 9.6256 45.1584-0.9216 20.3776-1.1264 28.2624-4.608 40.8064-9.6256-26.112-10.3424-73.0624-5.12-85.8112z m2.56 206.7456c16.4864 27.0336 40.96 56.32 64.512 77.312-45.9776 9.7792-90.112 22.1184-117.6064 31.6928 29.44-50.8416 51.2-103.9872 53.0944-109.056zM300.032 725.2992c3.9936-6.656 14.848-19.712 42.496-44.8512-18.944 28.7744-32.8192 44.4928-46.9504 54.272a60.416 60.416 0 0 1 4.4544-9.4208z" fill="#FF501A" p-id="2074"></path></svg>'
let none = '<svg t="1689059244495" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2216" width="40px" height="40px"><path d="M153.6 18.2784h530.2784l201.1648 219.4432v768H153.6V18.2784z" fill="#FFFFFF" p-id="2217"></path><path d="M658.2784 263.3216V69.4784H204.8v885.0432h629.0432v-691.2h-175.5648z m226.7648-25.6v768H153.6V18.2784h530.2784l201.1648 219.4432z m-92.928-25.6l-82.6368-90.112v90.112h82.6368z" fill="#465F78" p-id="2218"></path><path d="M498.432 574.7712c-10.5472-83.5072 96.4096-102.144 96.4096-153.7536 0-32.4096-24.064-50.5344-63.744-50.5344-30.6176 0-55.7568 14.8992-80.384 42.0352L409.6 372.5824C441.7024 333.312 485.888 307.2 539.648 307.2 612.352 307.2 665.6 343.3472 665.6 414.1056c0 77.6704-109.9264 87.2448-101.888 160.6656H498.432zM531.5584 716.8c-26.112 0-44.6464-19.6608-44.6464-47.36 0-27.648 19.0464-46.7968 44.6464-46.7968 25.088 0 44.1856 19.1488 44.1856 46.7968s-19.0464 47.36-44.1856 47.36z" fill="#B2B2B2" p-id="2219"></path></svg>'
function ass(a) {
    let arr = a.path
    for (var i = 0; i < arr.length; i++) {
        //console.log(arr[i]);
        let r = arr[i]

        console.log(r)
        let num = r.name.split(".")
        console.log(num[1]);
        b = num.length - 1;
        //window.open("'+z+'/static/town'+r.slice(12)+'")

        //1秒后执行刷新
        if (num[b] == 'ppt') {

            let all = FileHtml(ppt, r.name, r.time, r.size)
            let y = document.getElementById('topmain').innerHTML
            document.getElementById('topmain').innerHTML = y + all


        } else if (num[b] == 'pptx') {

            let all = FileHtml(ppt, r.name, r.time, r.size)
            let y = document.getElementById('topmain').innerHTML
            document.getElementById('topmain').innerHTML = y + all

        } else if (num[b] == 'zip') {

            let all = FileHtml(zip, r.name, r.time, r.size)
            let y = document.getElementById('topmain').innerHTML
            document.getElementById('topmain').innerHTML = y + all

        } else if (num[b] == 'file') {
            let all = FileHtml(file, r.name, r.time, r.size)
            let y = document.getElementById('topmain').innerHTML
            document.getElementById('topmain').innerHTML = y + all


        } else if (num[b] == 'doc') {

            let all = FileHtml(doc, r.name, r.time, r.size)
            let y = document.getElementById('topmain').innerHTML
            document.getElementById('topmain').innerHTML = y + all


        } else if (num[b] == 'jpg') {
            let all = FileHtml(jpg, r.name, r.time, r.size)
            let y = document.getElementById('topmain').innerHTML
            document.getElementById('topmain').innerHTML = y + all
            FileHtml(jpg, r.name, r.time, r.size)


        } else if (num[b] == 'png') {
            let all = FileHtml(png, r.name, r.time, r.size)
            let y = document.getElementById('topmain').innerHTML
            document.getElementById('topmain').innerHTML = y + all


        } else if (num[b] == 'ico') {
            let all = FileHtml(ico, r.name, r.time, r.size)
            let y = document.getElementById('topmain').innerHTML
            document.getElementById('topmain').innerHTML = y + all


        } else if (num[b] == 'pdf') {
            let all = FileHtml(pdf, r.name, r.time, r.size)
            let y = document.getElementById('topmain').innerHTML
            document.getElementById('topmain').innerHTML = y + all


        } else {
            if (r.dir == 'true') {
                let all = FileHtml(file, r.name, r.time, '--')
                let y = document.getElementById('topmain').innerHTML
                document.getElementById('topmain').innerHTML = y + all
            } else {
                let all = FileHtml(none, r.name, r.time, r.size)
                let y = document.getElementById('topmain').innerHTML
                document.getElementById('topmain').innerHTML = y + all
            }



        }
        //let alle = '<tr onclick="aopen(\''+r.slice(12)+'\')" class="MuiTableRow-root jss609" draggable="true"><th class="MuiTableCell-root MuiTableCell-body jss616" role="cell" scope="row"><p class="MuiTypography-root jss614 jss613 MuiTypography-body2"><div><svg class="MuiSvgIcon-root jss610" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>'+ r.slice(12) +'</div></p></th><td class="MuiTableCell-root MuiTableCell-body jss615 jss616"><p class="MuiTypography-root jss614 jss613 MuiTypography-body2"></p></td></tr>'



    }
}

function aopen(n) {
    let d = getCookie('FilesAdd')
    if (d == '') {
        let w = z + '/' + n
        console.log(w);
        $('#d_token').modal('show');
        document.getElementById('go_token').onclick = function () {

            let token = document.getElementById('html_token').innerHTML
            let ip_token = $('#ip_token').val()
            if (ip_token == token) {
                $('#d_token').modal('hide');
                window.open(w)
                $.ajax({
                    url: ym + "api/town/disk/agatoken",      //请求接口的地址
                    type: "GET",                                   //请求的方法GET/POST
                    data: { "token": token },
                    success: function (res) {                      //请求成功后的操作
                        console.log(res);
                        if (res.Msg == "ok") {
                            document.getElementById('token_num').innerHTML = res.Num - 1

                        } else {
                            document.getElementById('ip_token_div').innerHTML = '<div class="alert alert-danger" role="alert">通行证下载次数已用完，请刷新网页再试！！<button type="button" class="btn btn-danger" data-bs-dismiss="modal">关闭</button></div>'

                        }

                        //在控制台输出返回结果
                    },
                    error: function (err) {                       //请求失败后的操作
                        console.log(err);                          //请求失败在控制台输出22
                    }
                })

            } else {
                $('#d_token').modal('hide');

                console.log(token);
                err('err', '通行证输入错误！')
            }
        }
    } else {
        let w = z + d + '/' + n
        console.log(w);
        $('#d_token').modal('show');
        document.getElementById('go_token').onclick = function () {

            let token = document.getElementById('html_token').innerHTML
            let ip_token = $('#ip_token').val()
            if (ip_token == token) {
                $('#d_token').modal('hide');
                window.open(w)
                $.ajax({
                    url: ym + "api/town/disk/agatoken",      //请求接口的地址
                    type: "GET",                                   //请求的方法GET/POST
                    data: { "token": token },
                    success: function (res) {                      //请求成功后的操作
                        console.log(res);
                        if (res.Msg == "ok") {
                            document.getElementById('token_num').innerHTML = res.Num - 1

                        } else {
                            document.getElementById('ip_token_div').innerHTML = '<div class="alert alert-danger" role="alert">通行证下载次数已用完，请刷新网页再试！！<button type="button" class="btn btn-danger" data-bs-dismiss="modal">关闭</button></div>'

                        }

                        //在控制台输出返回结果
                    },
                    error: function (err) {                       //请求失败后的操作
                        console.log(err);                          //请求失败在控制台输出22
                    }
                })

            } else {
                $('#d_token').modal('hide');

                console.log(token);
                err('err', '通行证输入错误！')
            }
        }
    }




    //window.open(z + n)
    //300代表延迟毫秒值

}


function getppter() {
    Name = $('#getppterform_name').val()
    pwd = $('#getppterform_pwd').val()
    email = $('#getppterform_email').val()
    msg = $('#getppterform_msg').val()
    console.log(Name + pwd + email + msg);

    $.ajax({
        url: ym + "api/town/disk/getppter",      //请求接口的地址
        type: "GET",                                   //请求的方法GET/POST
        data: { 'name': Name, 'pwd': pwd, 'email': email, 'msg': msg, },
        success: function (res) {                      //请求成功后的操作
            console.log(res);
            let d = '"'
            setCookie('d_type', 'false_ppter', 60)
            setCookie('data', '{"name":' + d + Name + d + ',"pwd":' + d + pwd + d + ',"email":' + d + email + d + '}', 60)
            //在控制台输出返回结果
            $('#getppter').modal('hide')

            err('s', '申请成功，请等待管理员审核通过~')
            setTimeout(function () {
                location.reload(true);
            }, 3000)
        },
        error: function (err) {                       //请求失败后的操作
            console.log(22);
            $('#getppter').modal('hide')
            err('e', '向服务器发送请求失败，请稍后再试~')                        //请求失败在控制台输出22
        }
    })
}

function login_ppter() {
    Name = $('#loginppterform_name').val()
    pwd = $('#loginppterform_pwd').val()
    email = $('#lognppterform_email').val()
    $.ajax({
        url: ym + "api/town/disk/loginppter",      //请求接口的地址
        type: "GET",                                   //请求的方法GET/POST
        data: { 'name': Name, 'pwd': pwd, 'email': email, },
        success: function (res) {                      //请求成功后的操作
            console.log(res);
            if (res.Err == 'true') {
                console.log(111);
                let d = '"'
                setCookie('d_type', 'ppter', 60)

                setCookie('data', '{"name":' + d + Name + d + ',"pwd":' + d + pwd + d + ',"email":' + d + email + d + '}', 60)
                $('#login').modal('hide')
                location.reload(true);
                err('s', '登录成功~')
            } else {
                console.log(222);
                $('#login').modal('hide')
                err('e', '登录失败！')
            }
            //setCookie('d_type','false_ppter','Thu, 18 Dec 2999 12:00:00 GMT')
            //在控制台输出返回结果
        },
        error: function (err) {                       //请求失败后的操作
            console.log(22);
            err('e', '向服务器请求失败，请稍后再试~')                       //请求失败在控制台输出22
        }
    })
}


function uploadNewImg() {
    // 构造表单数据
    getCookie('FilesAdd')
    let formData = new FormData();
    // --- 文件
    let file = $("#new-img")[0].files[0];
    formData.append("file", file);
    var add = JSON.stringify({
        "add": getCookie('FilesAdd'),
    });
    //这里包装 可以直接转换成对象
    formData.append('add', getCookie('FilesAdd'))
    console.log(formData);
    // 文件不能为空
    if (file) {
        // 发起上传操作
        $.ajax({
            url: ym + 'api/town/disk/file',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.Msg == "true") {
                    err('s', '上传成功！ 文件名：' + res.filename + '')

                    GetFileList(getCookie('FilesAdd'))
                }
            }
        })

    } else {
        // --- 给提示框赋值

        err('e', '请选择文件！')

    }
    // 清空input文件表单：再次打开上传界面，不会保留上次的选项

}

function getfile() {



    $("#topmain").empty();
    $.ajax({
        url: ym + "api/town/disk/all",      //请求接口的地址
        type: "GET",                                   //请求的方法GET/POST
        data: {},
        success: function (res) {                      //请求成功后的操作
            console.log(res);
            GetFileList(getCookie('FilesAdd'))
            //在控制台输出返回结果
            err('success', '创建文件成功~')
        },
        error: function (err) {                       //请求失败后的操作
            console.log(22);
            err('e', '向服务器请求失败，请稍后再试~')                        //请求失败在控制台输出22
        }
    })

}







function FileHtml(type, name, time, size) {
    if (sj == true) {
        time = ''
    }

    console.log(name);
    let num = name.split(".")
    let v = ","
    let x = "'"

    b = num.length - 1;
    console.log(num[b]);
    if (num[b] == "png") {
        let d = '<a onclick="ShowFile(\'' + name + x + v + x + time + x + v + x + size + x + v + x + num[b] + '\')" href="#" class="link-primary">预览</a>'
        let html = '<tr data-id="346201885544169"class="wp-s-table-skin-hoc__tr wp-s-pan-table__body-row  mouse-choose-item"index="3"><td class="wp-s-pan-table__body-row--checkbox-block is-select"></td><td class="wp-s-pan-table__td"><div class="wp-s-pan-list__file-name cursor-p"><div class="pointer-events-all cursor-p"draggable="true"><div class="wp-s-file-list-drag-copy"><div class="wp-s-file-list-drag-copy__item is-id-1">' + type + '<span class="wp-s-file-list-drag-copy__item-title-text inline-block-v-middle text-ellip">书</span></div><!----></div><div>' + type + '<a title="' + name + '"class="wp-s-pan-list__file-name-title-text inline-block-v-middle text-ellip list-name-text"onclick="aopen(\'' + name + '\')">' + name + '</a></div></div></div></td><td class="wp-s-pan-table__td normal-column"><div class="wp-s-pan-list__time-column"><p class="column-content-hide">' + time + '</p><div class="wp-s-pan-list__time-column-actions table-list-actions"><div class="wp-s-agile-tool-bar  is-table-tool"skin="default"><div class="wp-s-agile-tool-bar__table  is-default-skin is-table-tool"skin-conf="[object Object]"tools-skin-conf="[object Object]"container-width=""><div class="wp-s-agile-tool-bar__h-group"skin="default"><div class="u-button-group wp-s-agile-tool-bar__h-button-group is-list is-has-more"><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="分享"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="下载"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="删除"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="重命名"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div></div></div><div class="wp-s-agile-tool-bar__h-more-group is-more is-table-tool is-default-skin is-show-list"innerheight=""><button type="button"class="u-button wp-s-agile-tool-bar__h-more-group--button is-need-left-sep u-button--text u-button--small is-more is-table-tool is-default-skin is-show-list"title="更多"style="height: 50px;"><!----><span><div class="wp-s-inner-popover tool-bar-more-group-pop is-default-skin"style="width: 130px; left: 50%; top: 41px; margin-left: -65px;"><div class="wp-s-inner-popover__content"><div class="wp-s-agile-tool-bar__v-group"><div class="u-button-group wp-s-agile-tool-bar__v-button-group is-list is-default-skin "><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title=""style="height: 30px;"><!----><span></span></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="下载"style="height: 30px;"><!----><a onclick="aopen(\'' + name + '\')"href="#"class="link-primary">下载</a></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="预览"style="height: 30px;"><!---->' + d + '</button></div><!----></div></div></div></div></div></span></button></div></div></div></div></div></td><td class="wp-s-pan-table__td normal-column wp-format-size"><section class="">' + size + '</section></td></tr>'
        return html
    } else if (num[b] == "jpg") {
        let d = '<a onclick="ShowFile(\'' + name + x + v + x + time + x + v + x + size + x + v + x + num[b] + '\')" href="#" class="link-primary">预览</a>'
        let html = '<tr data-id="346201885544169"class="wp-s-table-skin-hoc__tr wp-s-pan-table__body-row  mouse-choose-item"index="3"><td class="wp-s-pan-table__body-row--checkbox-block is-select"></td><td class="wp-s-pan-table__td"><div class="wp-s-pan-list__file-name cursor-p"><div class="pointer-events-all cursor-p"draggable="true"><div class="wp-s-file-list-drag-copy"><div class="wp-s-file-list-drag-copy__item is-id-1">' + type + '<span class="wp-s-file-list-drag-copy__item-title-text inline-block-v-middle text-ellip">书</span></div><!----></div><div>' + type + '<a title="' + name + '"class="wp-s-pan-list__file-name-title-text inline-block-v-middle text-ellip list-name-text"onclick="aopen(\'' + name + '\')">' + name + '</a></div></div></div></td><td class="wp-s-pan-table__td normal-column"><div class="wp-s-pan-list__time-column"><p class="column-content-hide">' + time + '</p><div class="wp-s-pan-list__time-column-actions table-list-actions"><div class="wp-s-agile-tool-bar  is-table-tool"skin="default"><div class="wp-s-agile-tool-bar__table  is-default-skin is-table-tool"skin-conf="[object Object]"tools-skin-conf="[object Object]"container-width=""><div class="wp-s-agile-tool-bar__h-group"skin="default"><div class="u-button-group wp-s-agile-tool-bar__h-button-group is-list is-has-more"><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="分享"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="下载"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="删除"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="重命名"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div></div></div><div class="wp-s-agile-tool-bar__h-more-group is-more is-table-tool is-default-skin is-show-list"innerheight=""><button type="button"class="u-button wp-s-agile-tool-bar__h-more-group--button is-need-left-sep u-button--text u-button--small is-more is-table-tool is-default-skin is-show-list"title="更多"style="height: 50px;"><!----><span><div class="wp-s-inner-popover tool-bar-more-group-pop is-default-skin"style="width: 130px; left: 50%; top: 41px; margin-left: -65px;"><div class="wp-s-inner-popover__content"><div class="wp-s-agile-tool-bar__v-group"><div class="u-button-group wp-s-agile-tool-bar__v-button-group is-list is-default-skin "><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title=""style="height: 30px;"><!----><span></span></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="下载"style="height: 30px;"><!----><a onclick="aopen(\'' + name + '\')"href="#"class="link-primary">下载</a></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="预览"style="height: 30px;"><!---->' + d + '</button></div><!----></div></div></div></div></div></span></button></div></div></div></div></div></td><td class="wp-s-pan-table__td normal-column wp-format-size"><section class="">' + size + '</section></td></tr>'
        return html
    } else if (num[b] == 'pdf') {
        let d = '<a onclick="ShowFile(\'' + name + x + v + x + time + x + v + x + size + x + v + x + num[b] + '\')" href="#" class="link-primary">预览</a>'
        let html = '<tr data-id="346201885544169"class="wp-s-table-skin-hoc__tr wp-s-pan-table__body-row  mouse-choose-item"index="3"><td class="wp-s-pan-table__body-row--checkbox-block is-select"></td><td class="wp-s-pan-table__td"><div class="wp-s-pan-list__file-name cursor-p"><div class="pointer-events-all cursor-p"draggable="true"><div class="wp-s-file-list-drag-copy"><div class="wp-s-file-list-drag-copy__item is-id-1">' + type + '<span class="wp-s-file-list-drag-copy__item-title-text inline-block-v-middle text-ellip">书</span></div><!----></div><div>' + type + '<a title="' + name + '"class="wp-s-pan-list__file-name-title-text inline-block-v-middle text-ellip list-name-text"onclick="aopen(\'' + name + '\')">' + name + '</a></div></div></div></td><td class="wp-s-pan-table__td normal-column"><div class="wp-s-pan-list__time-column"><p class="column-content-hide">' + time + '</p><div class="wp-s-pan-list__time-column-actions table-list-actions"><div class="wp-s-agile-tool-bar  is-table-tool"skin="default"><div class="wp-s-agile-tool-bar__table  is-default-skin is-table-tool"skin-conf="[object Object]"tools-skin-conf="[object Object]"container-width=""><div class="wp-s-agile-tool-bar__h-group"skin="default"><div class="u-button-group wp-s-agile-tool-bar__h-button-group is-list is-has-more"><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="分享"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="下载"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="删除"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="重命名"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div></div></div><div class="wp-s-agile-tool-bar__h-more-group is-more is-table-tool is-default-skin is-show-list"innerheight=""><button type="button"class="u-button wp-s-agile-tool-bar__h-more-group--button is-need-left-sep u-button--text u-button--small is-more is-table-tool is-default-skin is-show-list"title="更多"style="height: 50px;"><!----><span><div class="wp-s-inner-popover tool-bar-more-group-pop is-default-skin"style="width: 130px; left: 50%; top: 41px; margin-left: -65px;"><div class="wp-s-inner-popover__content"><div class="wp-s-agile-tool-bar__v-group"><div class="u-button-group wp-s-agile-tool-bar__v-button-group is-list is-default-skin "><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title=""style="height: 30px;"><!----><span></span></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="下载"style="height: 30px;"><!----><a onclick="aopen(\'' + name + '\')"href="#"class="link-primary">下载</a></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="预览"style="height: 30px;"><!---->' + d + '</button></div><!----></div></div></div></div></div></span></button></div></div></div></div></div></td><td class="wp-s-pan-table__td normal-column wp-format-size"><section class="">' + size + '</section></td></tr>'
        return html
    } else if (num[b] == 'ico') {
        let d = '<a onclick="ShowFile(\'' + name + x + v + x + time + x + v + x + size + x + v + x + num[b] + '\')" href="#" class="link-primary">预览</a>'
        let html = '<tr data-id="346201885544169"class="wp-s-table-skin-hoc__tr wp-s-pan-table__body-row  mouse-choose-item"index="3"><td class="wp-s-pan-table__body-row--checkbox-block is-select"></td><td class="wp-s-pan-table__td"><div class="wp-s-pan-list__file-name cursor-p"><div class="pointer-events-all cursor-p"draggable="true"><div class="wp-s-file-list-drag-copy"><div class="wp-s-file-list-drag-copy__item is-id-1">' + type + '<span class="wp-s-file-list-drag-copy__item-title-text inline-block-v-middle text-ellip">书</span></div><!----></div><div>' + type + '<a title="' + name + '"class="wp-s-pan-list__file-name-title-text inline-block-v-middle text-ellip list-name-text"onclick="aopen(\'' + name + '\')">' + name + '</a></div></div></div></td><td class="wp-s-pan-table__td normal-column"><div class="wp-s-pan-list__time-column"><p class="column-content-hide">' + time + '</p><div class="wp-s-pan-list__time-column-actions table-list-actions"><div class="wp-s-agile-tool-bar  is-table-tool"skin="default"><div class="wp-s-agile-tool-bar__table  is-default-skin is-table-tool"skin-conf="[object Object]"tools-skin-conf="[object Object]"container-width=""><div class="wp-s-agile-tool-bar__h-group"skin="default"><div class="u-button-group wp-s-agile-tool-bar__h-button-group is-list is-has-more"><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="分享"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="下载"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="删除"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="重命名"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div></div></div><div class="wp-s-agile-tool-bar__h-more-group is-more is-table-tool is-default-skin is-show-list"innerheight=""><button type="button"class="u-button wp-s-agile-tool-bar__h-more-group--button is-need-left-sep u-button--text u-button--small is-more is-table-tool is-default-skin is-show-list"title="更多"style="height: 50px;"><!----><span><div class="wp-s-inner-popover tool-bar-more-group-pop is-default-skin"style="width: 130px; left: 50%; top: 41px; margin-left: -65px;"><div class="wp-s-inner-popover__content"><div class="wp-s-agile-tool-bar__v-group"><div class="u-button-group wp-s-agile-tool-bar__v-button-group is-list is-default-skin "><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title=""style="height: 30px;"><!----><span></span></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="下载"style="height: 30px;"><!----><a onclick="aopen(\'' + name + '\')"href="#"class="link-primary">下载</a></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="预览"style="height: 30px;"><!---->' + d + '</button></div><!----></div></div></div></div></div></span></button></div></div></div></div></div></td><td class="wp-s-pan-table__td normal-column wp-format-size"><section class="">' + size + '</section></td></tr>'
        return html
    } else if (num[b] == 'ppt' || num[b] == 'pptx') {
        if (size.substr(-2) == "MB") {
            let sizez = parseFloat(size.substring(0, size.length - 2))
            if (sizez <= 5) {
                console.log('ppt文件可以预览');
                let d = '<a onclick="ShowFile(\'' + name + x + v + x + time + x + v + x + size + x + v + x + num[b] + '\')" href="#" class="link-primary">预览</a>'
                let html = '<tr data-id="346201885544169"class="wp-s-table-skin-hoc__tr wp-s-pan-table__body-row  mouse-choose-item"index="3"><td class="wp-s-pan-table__body-row--checkbox-block is-select"></td><td class="wp-s-pan-table__td"><div class="wp-s-pan-list__file-name cursor-p"><div class="pointer-events-all cursor-p"draggable="true"><div class="wp-s-file-list-drag-copy"><div class="wp-s-file-list-drag-copy__item is-id-1">' + type + '<span class="wp-s-file-list-drag-copy__item-title-text inline-block-v-middle text-ellip">书</span></div><!----></div><div>' + type + '<a title="' + name + '"class="wp-s-pan-list__file-name-title-text inline-block-v-middle text-ellip list-name-text"onclick="aopen(\'' + name + '\')">' + name + '</a></div></div></div></td><td class="wp-s-pan-table__td normal-column"><div class="wp-s-pan-list__time-column"><p class="column-content-hide">' + time + '</p><div class="wp-s-pan-list__time-column-actions table-list-actions"><div class="wp-s-agile-tool-bar  is-table-tool"skin="default"><div class="wp-s-agile-tool-bar__table  is-default-skin is-table-tool"skin-conf="[object Object]"tools-skin-conf="[object Object]"container-width=""><div class="wp-s-agile-tool-bar__h-group"skin="default"><div class="u-button-group wp-s-agile-tool-bar__h-button-group is-list is-has-more"><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="分享"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="下载"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="删除"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="重命名"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div></div></div><div class="wp-s-agile-tool-bar__h-more-group is-more is-table-tool is-default-skin is-show-list"innerheight=""><button type="button"class="u-button wp-s-agile-tool-bar__h-more-group--button is-need-left-sep u-button--text u-button--small is-more is-table-tool is-default-skin is-show-list"title="更多"style="height: 50px;"><!----><span><div class="wp-s-inner-popover tool-bar-more-group-pop is-default-skin"style="width: 130px; left: 50%; top: 41px; margin-left: -65px;"><div class="wp-s-inner-popover__content"><div class="wp-s-agile-tool-bar__v-group"><div class="u-button-group wp-s-agile-tool-bar__v-button-group is-list is-default-skin "><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title=""style="height: 30px;"><!----><span></span></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="下载"style="height: 30px;"><!----><a onclick="aopen(\'' + name + '\')"href="#"class="link-primary">下载</a></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="预览"style="height: 30px;"><!---->' + d + '</button></div><!----></div></div></div></div></div></span></button></div></div></div></div></div></td><td class="wp-s-pan-table__td normal-column wp-format-size"><section class="">' + size + '</section></td></tr>'
                return html
            } else {
                console.log('ppt文件不可以预览', size);
                let d = ''
                let html = '<tr data-id="346201885544169"class="wp-s-table-skin-hoc__tr wp-s-pan-table__body-row  mouse-choose-item"index="3"><td class="wp-s-pan-table__body-row--checkbox-block is-select"></td><td class="wp-s-pan-table__td"><div class="wp-s-pan-list__file-name cursor-p"><div class="pointer-events-all cursor-p"draggable="true"><div class="wp-s-file-list-drag-copy"><div class="wp-s-file-list-drag-copy__item is-id-1">' + type + '<span class="wp-s-file-list-drag-copy__item-title-text inline-block-v-middle text-ellip">书</span></div><!----></div><div>' + type + '<a title="' + name + '"class="wp-s-pan-list__file-name-title-text inline-block-v-middle text-ellip list-name-text"onclick="aopen(\'' + name + '\')">' + name + '</a></div></div></div></td><td class="wp-s-pan-table__td normal-column"><div class="wp-s-pan-list__time-column"><p class="column-content-hide">' + time + '</p><div class="wp-s-pan-list__time-column-actions table-list-actions"><div class="wp-s-agile-tool-bar  is-table-tool"skin="default"><div class="wp-s-agile-tool-bar__table  is-default-skin is-table-tool"skin-conf="[object Object]"tools-skin-conf="[object Object]"container-width=""><div class="wp-s-agile-tool-bar__h-group"skin="default"><div class="u-button-group wp-s-agile-tool-bar__h-button-group is-list is-has-more"><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="分享"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="下载"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="删除"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="重命名"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div></div></div><div class="wp-s-agile-tool-bar__h-more-group is-more is-table-tool is-default-skin is-show-list"innerheight=""><button type="button"class="u-button wp-s-agile-tool-bar__h-more-group--button is-need-left-sep u-button--text u-button--small is-more is-table-tool is-default-skin is-show-list"title="更多"style="height: 50px;"><!----><span><div class="wp-s-inner-popover tool-bar-more-group-pop is-default-skin"style="width: 130px; left: 50%; top: 41px; margin-left: -65px;"><div class="wp-s-inner-popover__content"><div class="wp-s-agile-tool-bar__v-group"><div class="u-button-group wp-s-agile-tool-bar__v-button-group is-list is-default-skin "><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title=""style="height: 30px;"><!----><span></span></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="下载"style="height: 30px;"><!----><a onclick="aopen(\'' + name + '\')"href="#"class="link-primary">下载</a></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="预览"style="height: 30px;"><!---->' + d + '</button></div><!----></div></div></div></div></div></span></button></div></div></div></div></div></td><td class="wp-s-pan-table__td normal-column wp-format-size"><section class="">' + size + '</section></td></tr>'
                return html
            }
        } else {
            console.log('ppt文件可以预览', size);
            let d = '<a onclick="ShowFile(\'' + name + x + v + x + time + x + v + x + size + x + v + x + num[b] + '\')" href="#" class="link-primary">预览</a>'
            let html = '<tr data-id="346201885544169"class="wp-s-table-skin-hoc__tr wp-s-pan-table__body-row  mouse-choose-item"index="3"><td class="wp-s-pan-table__body-row--checkbox-block is-select"></td><td class="wp-s-pan-table__td"><div class="wp-s-pan-list__file-name cursor-p"><div class="pointer-events-all cursor-p"draggable="true"><div class="wp-s-file-list-drag-copy"><div class="wp-s-file-list-drag-copy__item is-id-1">' + type + '<span class="wp-s-file-list-drag-copy__item-title-text inline-block-v-middle text-ellip">书</span></div><!----></div><div>' + type + '<a title="' + name + '"class="wp-s-pan-list__file-name-title-text inline-block-v-middle text-ellip list-name-text"onclick="aopen(\'' + name + '\')">' + name + '</a></div></div></div></td><td class="wp-s-pan-table__td normal-column"><div class="wp-s-pan-list__time-column"><p class="column-content-hide">' + time + '</p><div class="wp-s-pan-list__time-column-actions table-list-actions"><div class="wp-s-agile-tool-bar  is-table-tool"skin="default"><div class="wp-s-agile-tool-bar__table  is-default-skin is-table-tool"skin-conf="[object Object]"tools-skin-conf="[object Object]"container-width=""><div class="wp-s-agile-tool-bar__h-group"skin="default"><div class="u-button-group wp-s-agile-tool-bar__h-button-group is-list is-has-more"><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="分享"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="下载"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="删除"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="重命名"style="height: 50px;"><!----><span><!----><!----></span></button><!----></div></div></div><div class="wp-s-agile-tool-bar__h-more-group is-more is-table-tool is-default-skin is-show-list"innerheight=""><button type="button"class="u-button wp-s-agile-tool-bar__h-more-group--button is-need-left-sep u-button--text u-button--small is-more is-table-tool is-default-skin is-show-list"title="更多"style="height: 50px;"><!----><span><div class="wp-s-inner-popover tool-bar-more-group-pop is-default-skin"style="width: 130px; left: 50%; top: 41px; margin-left: -65px;"><div class="wp-s-inner-popover__content"><div class="wp-s-agile-tool-bar__v-group"><div class="u-button-group wp-s-agile-tool-bar__v-button-group is-list is-default-skin "><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title=""style="height: 30px;"><!----><span></span></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="下载"style="height: 30px;"><!----><a onclick="aopen(\'' + name + '\')"href="#"class="link-primary">下载</a></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="预览"style="height: 30px;"><!---->' + d + '</button></div><!----></div></div></div></div></div></span></button></div></div></div></div></div></td><td class="wp-s-pan-table__td normal-column wp-format-size"><section class="">' + size + '</section></td></tr>'
            return html
        }

    } else if (size == '--') {
        let d = ''
        let html = '<tr data-id="346201885544169"class="wp-s-table-skin-hoc__tr wp-s-pan-table__body-row  mouse-choose-item"index="3"><td class="wp-s-pan-table__body-row--checkbox-block is-select"></td><td class="wp-s-pan-table__td"><div class="wp-s-pan-list__file-name cursor-p"><div class="pointer-events-all cursor-p"draggable="true"><div class="wp-s-file-list-drag-copy"><div class="wp-s-file-list-drag-copy__item is-id-1">' + type + '<span class="wp-s-file-list-drag-copy__item-title-text inline-block-v-middle text-ellip">书</span></div><!----></div><div>' + type + '<a title="' + name + '"class="wp-s-pan-list__file-name-title-text inline-block-v-middle text-ellip list-name-text" onclick="OpenFile(\'/' + name + x + v + x + "up" + '\')">' + name + '</a></div></div></div></td><td class="wp-s-pan-table__td normal-column"><div class="wp-s-pan-list__time-column"><p class="column-content-hide">' + time + '</p><div class="wp-s-pan-list__time-column-actions table-list-actions"><div class="wp-s-agile-tool-bar  is-table-tool"skin="default"><div class="wp-s-agile-tool-bar__table  is-default-skin is-table-tool"skin-conf="[object Object]"tools-skin-conf="[object Object]"container-width=""><div class="wp-s-agile-tool-bar__h-group"skin="default"><div class="u-button-group wp-s-agile-tool-bar__h-button-group is-list is-has-more"><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="分享"style="height: 50px;"><!----><i class="u-icon-share"></i><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="下载"style="height: 50px;"><!----><i class="u-icon-download"></i><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="删除"style="height: 50px;"><!----><i class="u-icon-delete"></i><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="重命名"style="height: 50px;"><!----><i class="u-icon-rename"></i><span><!----><!----></span></button><!----></div></div></div><div class="wp-s-agile-tool-bar__h-more-group is-more is-table-tool is-default-skin is-show-list"innerheight=""><button type="button"class="u-button wp-s-agile-tool-bar__h-more-group--button is-need-left-sep u-button--text u-button--small is-more is-table-tool is-default-skin is-show-list"title="更多"style="height: 50px;"><!----><i class="u-icon-more"></i><span><div class="wp-s-inner-popover tool-bar-more-group-pop is-default-skin"style="width: 130px; left: 50%; top: 41px; margin-left: -65px;"><div class="wp-s-inner-popover__content"><div class="wp-s-agile-tool-bar__v-group"><div class="u-button-group wp-s-agile-tool-bar__v-button-group is-list is-default-skin "><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title=""style="height: 30px;"><!----><i class="u-icon-copy"></i><span></span></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="下载"style="height: 30px;"><!----></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="预览"style="height: 30px;"><!---->' + d + '</button></div><!----></div></div></div></div></div></span></button></div></div></div></div></div></td><td class="wp-s-pan-table__td normal-column wp-format-size"><section class="">' + size + '</section></td></tr>'
        return html
    } else {
        let d = ''
        let html = '<tr data-id="346201885544169"class="wp-s-table-skin-hoc__tr wp-s-pan-table__body-row  mouse-choose-item"index="3"><td class="wp-s-pan-table__body-row--checkbox-block is-select"></td><td class="wp-s-pan-table__td"><div class="wp-s-pan-list__file-name cursor-p"><div class="pointer-events-all cursor-p"draggable="true"><div class="wp-s-file-list-drag-copy"><div class="wp-s-file-list-drag-copy__item is-id-1">' + type + '<span class="wp-s-file-list-drag-copy__item-title-text inline-block-v-middle text-ellip">书</span></div><!----></div><div>' + type + '<a title="' + name + '"class="wp-s-pan-list__file-name-title-text inline-block-v-middle text-ellip list-name-text" onclick="aopen(\'' + name + '\')">' + name + '</a></div></div></div></td><td class="wp-s-pan-table__td normal-column"><div class="wp-s-pan-list__time-column"><p class="column-content-hide">' + time + '</p><div class="wp-s-pan-list__time-column-actions table-list-actions"><div class="wp-s-agile-tool-bar  is-table-tool"skin="default"><div class="wp-s-agile-tool-bar__table  is-default-skin is-table-tool"skin-conf="[object Object]"tools-skin-conf="[object Object]"container-width=""><div class="wp-s-agile-tool-bar__h-group"skin="default"><div class="u-button-group wp-s-agile-tool-bar__h-button-group is-list is-has-more"><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="分享"style="height: 50px;"><!----><i class="u-icon-share"></i><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="下载"style="height: 50px;"><!----><i class="u-icon-download"></i><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="删除"style="height: 50px;"><!----><i class="u-icon-delete"></i><span><!----><!----></span></button><!----></div><div class="wp-s-agile-tool-bar__h-action is-need-left-sep is-list"><button type="button"class="u-button wp-s-agile-tool-bar__h-action-button u-button--text u-button--small"title="重命名"style="height: 50px;"><!----><i class="u-icon-rename"></i><span><!----><!----></span></button><!----></div></div></div><div class="wp-s-agile-tool-bar__h-more-group is-more is-table-tool is-default-skin is-show-list"innerheight=""><button type="button"class="u-button wp-s-agile-tool-bar__h-more-group--button is-need-left-sep u-button--text u-button--small is-more is-table-tool is-default-skin is-show-list"title="更多"style="height: 50px;"><!----><i class="u-icon-more"></i><span><div class="wp-s-inner-popover tool-bar-more-group-pop is-default-skin"style="width: 130px; left: 50%; top: 41px; margin-left: -65px;"><div class="wp-s-inner-popover__content"><div class="wp-s-agile-tool-bar__v-group"><div class="u-button-group wp-s-agile-tool-bar__v-button-group is-list is-default-skin "><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title=""style="height: 30px;"><!----><i class="u-icon-copy"></i><span></span></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="下载"style="height: 30px;"><!----><a onclick="aopen(\'' + name + '\')" href="#" class="link-primary">下载</a></button></div><!----></div><div class="wp-s-agile-tool-bar__item"><div class="wp-s-agile-tool-bar__v-action is-list"><button type="button"class="u-button wp-s-agile-tool-bar__v-action-button u-button--text u-button--small"title="预览"style="height: 30px;"><!---->' + d + '</button></div><!----></div></div></div></div></div></span></button></div></div></div></div></div></td><td class="wp-s-pan-table__td normal-column wp-format-size"><section class="">' + size + '</section></td></tr>'
        return html
    }



}


function ShowFile(name, time, size, type) {
    getCookie('FilesAdd')
    if (sj == true) {
        err('e', '手机不支持预览文件哦~')
    } else {
        if (getCookie('FilesAdd') == '') {
            if (type == "pdf") {
                let p = '<iframe src="' + z + '/' + name + '" width="100%" height="100%" frameborder="0"></iframe>'
                document.getElementById('showfile').innerHTML = p
            } else if (type == "ppt" || type == "pptx") {
                console.log(pptShow + z + '/' + name);
                window.open(pptShow + z + '/' + name)
            } else {
                let p = '<div data-v-093a1112=""><div data-v-093a1112="" class="nd-detail__img bg"><!----><img data-v-093a1112="" src="' + z + '/' + name + '" class="thumb"><!----></div></div><div data-v-093a1112=""class="nd-detail__props"><div data-v-093a1112=""class="nd-detail__name"><span data-v-093a1112="">' + name + '</span></div><div data-v-093a1112=""class="prop">创建时间:' + time + '</div><div data-v-093a1112=""class="prop">最后修改:' + time + '</div><div data-v-093a1112=""class="prop">文件格式:' + type + '</div><div data-v-093a1112=""class="prop">文件大小:' + size + '</div><div data-v-093a1112=""class="prop"><span data-v-093a1112=""></span><div data-v-59549eba=""data-v-093a1112=""class="nd-file-main__nav simple"><div data-v-59549eba=""class="nd-file-main__nav-left"><div data-v-59549eba=""><!----><span data-v-59549eba=""class="nd-file-selector__nav-item"><span class="nd-file-selector__nav-item-title text-ellip"></span><span class="nd-file-selector__nav-item-sep">&gt;</span></span><span data-v-59549eba=""class="nd-file-selector__nav-item is-disable-nav"><span class="nd-file-selector__nav-item-title text-ellip"></span><span class="nd-file-selector__nav-item-sep">&gt;</span></span></div></div><!----></div></div></div>'
                document.getElementById('showfile').innerHTML = p
            }
        } else {
            if (type == "pdf") {
                let p = '<iframe src="' + z + getCookie('FilesAdd') + '/' + name + '" width="100%" height="100%" frameborder="0"></iframe>'
                document.getElementById('showfile').innerHTML = p
            } else if (type == "ppt" || type == "pptx") {
                console.log(pptShow + z + getCookie('FilesAdd') + '/' + name);
                window.open(pptShow + z + getCookie('FilesAdd') + '/' + name)
            } else {
                let p = '<div data-v-093a1112=""><div data-v-093a1112="" class="nd-detail__img bg"><!----><img data-v-093a1112="" src="' + z + getCookie('FilesAdd') + '/' + name + '" class="thumb"><!----></div></div><div data-v-093a1112=""class="nd-detail__props"><div data-v-093a1112=""class="nd-detail__name"><span data-v-093a1112="">' + name + '</span></div><div data-v-093a1112=""class="prop">创建时间:' + time + '</div><div data-v-093a1112=""class="prop">最后修改:' + time + '</div><div data-v-093a1112=""class="prop">文件格式:' + type + '</div><div data-v-093a1112=""class="prop">文件大小:' + size + '</div><div data-v-093a1112=""class="prop"><span data-v-093a1112=""></span><div data-v-59549eba=""data-v-093a1112=""class="nd-file-main__nav simple"><div data-v-59549eba=""class="nd-file-main__nav-left"><div data-v-59549eba=""><!----><span data-v-59549eba=""class="nd-file-selector__nav-item"><span class="nd-file-selector__nav-item-title text-ellip"></span><span class="nd-file-selector__nav-item-sep">&gt;</span></span><span data-v-59549eba=""class="nd-file-selector__nav-item is-disable-nav"><span class="nd-file-selector__nav-item-title text-ellip"></span><span class="nd-file-selector__nav-item-sep">&gt;</span></span></div></div><!----></div></div></div>'
                document.getElementById('showfile').innerHTML = p
            }
        }

    }




}

function isMobile() {
    if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        return true; // 移动端
    } else {
        return false; // PC端
    }
}

function OpenFile(add, choose) {
    let all_ = '<span onclick="GetFileList(\'/\')" class="wp-s-pan-file-main__nav-item"><span class="wp-s-pan-file-main__nav-item-title text-ellip">'
    let alll_ = '</span> <span class="wp-s-pan-file-main__nav-item-sep">&gt;</span></span>'
    let fileadd_ = '<span class="wp-s-pan-file-main__nav-item is-disable-nav"><span class="wp-s-pan-file-main__nav-item-title text-ellip">'
    let fileaddd_ = '</span> <span class="wp-s-pan-file-main__nav-item-sep">&gt;</span></span>'
    if (choose == 'up') {

        let fileadd = getCookie('FilesAdd')
        console.log(fileadd);
        setCookie('FilesAdd', fileadd + add)
        let fileaddd = getCookie('FilesAdd')
        console.log(fileaddd);
        GetFileList(fileaddd)
        let address = fileaddd.split("/")
        console.log(address);
        for (var i = 0; i < address.length; i++) {
            if (address[i] == '') {
                let qbwj = all_ + '全部文件' + alll_

                document.getElementById('TopFileAdd').innerHTML = qbwj
            } else {
                let y = document.getElementById('TopFileAdd').innerHTML
                console.log(y);
                document.getElementById('TopFileAdd').innerHTML = y + fileadd_ + address[i] + fileaddd_
            }
        }
    } else if (choose == 'down') {

    } else {

    }
}

function GetFileList(add) {
    if (add == '/') {
        document.getElementById('TopFileAdd').innerHTML = '<span class="title">全部文件</span>'
        setCookie('FilesAdd', '')
    }
    $("#topmain").empty();
    $.ajax({
        url: ym + "api/town/disk/all",      //请求接口的地址
        type: "GET",                                   //请求的方法GET/POST
        data: { 'add': add },
        success: function (res) {                      //请求成功后的操作
            console.log(res);
            let file = res
            ass(file)
            //在控制台输出返回结果


        },
        error: function (err) {                       //请求失败后的操作
            console.log(22);
            err('e', '向服务器请求文件失败，请稍后再试~')                        //请求失败在控制台输出22
        }
    })

}

function mkdir() {
    Name = $('#ip_mkdir').val()
    add = getCookie('FilesAdd')
    $.ajax({
        url: ym + "api/town/disk/mkdir",      //请求接口的地址
        type: "GET",                                   //请求的方法GET/POST
        data: { 'add': add, 'name': Name },
        success: function (res) {                      //请求成功后的操作
            console.log(res);
            $('#mkdir').modal('hide')
            err('s', '创建文件夹' + Name + '，成功~')
            //在控制台输出返回结果
            GetFileList(getCookie('FilesAdd'))


        },
        error: function (err) {                       //请求失败后的操作
            console.log(22);
            err('e', '创建文件夹' + Name + '，失败！')                     //请求失败在控制台输出22
        }
    })
}

function err(h, test) {
    let toastLiveExample = document.getElementById('liveToast')
    let toast = new bootstrap.Toast(toastLiveExample)
    if (h == 's') {
        document.getElementById('liveToast').className = 'toast align-items-center text-bg-primary border-0'
        document.getElementById('Err_p').innerHTML = test
        toast.show()
    } else {
        document.getElementById('liveToast').className = 'toast align-items-center text-bg-danger border-0'
        document.getElementById('Err_p').innerHTML = test
        toast.show()
    }

}