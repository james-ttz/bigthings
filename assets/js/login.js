
$(function () {
    //点击去注册让登录页面隐藏
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show()
    })
    // 点击登录让注册页面隐藏
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })


    //自定义表单验证
    var form = layui.form;
    form.verify({
        //自定义一个密码验证
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //验证密码确认框
        //首先拿到注册页面的密码框内容，再和确认密码框的值比较
        repwd: function (value) {
            var psd = $('#psd').val();
            if (psd !== value) {
                return '两次密码不一致';
            }
        }
    })


    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止表单的默认提交行为

        e.preventDefault()
        //发起ajax请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {

            if (res.status !== 0) {

                return layer.msg(res.message)
            };
            layer.msg('注册成功，请登录！');
            // 模拟人的点击行为
            $('#link_login').click()
        })



    })
    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        var data = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        };
        //发起ajax请求
        $.post('http://ajax.frontend.itheima.net/api/login', data, function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！')
            };
            layer.msg('登录成功！');
            //登录成功后把token 保存到本地
            localStorage.setItem("token ", res.token);
            //登录完成后跳转到主页面
            location.href = '/index.html'
        })
    })
})