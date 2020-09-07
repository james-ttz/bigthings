$(function () {
    getMaterial()
})
//首先要获取用户的信息
function getMaterial() {
    $.ajax({
        method: 'GET',
        url: 'http://ajax.frontend.itheima.net/my/userinfo',
        //需要携带请求头
        headers: {
            //要把存储在本地的token值携带一起发起请求
            Authorization: localStorage.getItem('token')
        },
        //回调函数
        success: function (res) {

            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res);
            // form.val('formUserInfo', res.data)
        }
    })
}
