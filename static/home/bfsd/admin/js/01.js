window.onload = function () {
    GetXcxList()
}
function GetXcxList() {
    $.ajax({
        url: ym + "api/bfsd/disk/xcx_list", type: "post", success: function (result) {
            console.log(result.list);
            let a = result.list
            for (let i = a.length - 1; i >= 0; i--) {
                console.log(i);
                let ac = document.getElementById('disk_xcx_left').innerHTML
                document.getElementById('disk_xcx_left').innerHTML = ac + `
                <div id='disk_xcx_list_${a[i].ID}' class="card" style="13rem">
                    <img src="http://${a[i].Icon}" style="border-radius: 10px;width: 60px;height:60px;" class="card-img-top" alt="${a[i].Name}">
                    <div class="card-body">
                        <h5 class="card-title">${a[i].Name}</h5>
                        <p class="card-text">
                            <td>网址：${a[i].Path}</td><br>
                            <td>名称：${a[i].Name}</td><br>
                            <td>介绍：${a[i].Introduce}</td><br>
                            <td>是否是官方推荐：${a[i].Bfsdstar}</td><br>
                            <td>是否可见：${a[i].Type}</td><br>
                            <td>推荐数：${a[i].Star}</td><br>
                            <button type="button" onclick="dxcx('${a[i].ID}')" class="btn btn-danger">删除</button>


                        </p>
                        
                    </div>
                </div>
                `
            }
        }



    });
}

function disk_xcx_form() {
    let Name = $('#disk_xcx_form_name').val()
    let path = $('#disk_xcx_form_path').val()
    let file = $('#disk_xcx_form_file')[0].files[0];
    let introduce = $('#disk_xcx_form_introduce').val()
    let bfsdstar = document.getElementById('disk_xcx_form_bfsdstar').checked

    let formData = new FormData();
    // --- 文件
    formData.append("file", file);
    //这里包装 可以直接转换成对象
    formData.append('name', Name)
    formData.append('path', path)
    formData.append('bfsdstar', bfsdstar)
    formData.append('introduce', introduce)
    formData.append('type', 'true')

    console.log(formData);
    // 文件不能为空
    if (file) {
        // 发起上传操作
        $.ajax({
            url: ym + 'api/bfsd/disk/xcx_add_list',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                console.log(res);

                err('s', '上传成功！')
                GetXcxList()

            }
        })

    } else {
        // --- 给提示框赋值

        err('e', '上传失败！')

    }
}
function dxcx(id) {
    $.ajax({
        url: ym + "api/bfsd/disk/xcx_d_list", data: { Id: id }, type: "post", success: function (result) {
            console.log(result);
            $('#disk_xcx_list_' + id).remove()
            err('s', '删除成功！')
        }
    });
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