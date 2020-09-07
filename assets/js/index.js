$(function () {
    getInformation()
    btnOut()
})


//获取用户的信息
function getInformation() {

    $.ajax({
        method: 'GET',
        url: 'http://ajax.frontend.itheima.net/my/userinfo',
        // headers 就是请求头配置对象
        headers: {
            //要把存储在本地的token值携带一起发起请求
            Authorization: localStorage.getItem('token')
        },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)

        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        complete: function (res) {
          
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }
        }
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}

//实现点击退出 退出到登陆页面
function btnOut() {
    $('#btnout').on('click', function () {
        console.log(1111 + '------');
        layer.confirm('确定退出当前页面?', { icon: 3, title: '提示' },
            function (index) {
                //删除本地存储的token

                localStorage.removeItem('token')
                //点击弹出的确定按钮返回登录页面
                location.href = "/login.html";
                layer.close(index);
            });
    })
}