var express = require('express');
var app = express();

app.use(express.static('../app'))

app.get('/index', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.get('/getSwitchGames', function (req, res) {
    const SwitchEshop = require('nintendo-switch-eshop');
    new Promise((resolve, reject) => {
        resolve(SwitchEshop.getGamesJapan())
    }).then((response) => {
        res.end(JSON.stringify(response));
    })
})


var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})






function getRequest(url, fun) {
    new Promise((resolve, reject) => {
        //先声明一个异步请求对象
        var request = null;
        if (window.ActiveXObject) {//如果是IE
            request = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            request = new XMLHttpRequest(); //实例化一个xmlHttpReg
        }

        //如果实例化成功,就调用open()方法,就开始准备向服务器发送请求
        if (request != null) {
            request.open("GET", url, true);
            request.send(null);
            request.onreadystatechange = doResult; //设置回调函数

        }

        function doResult() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    resolve(request.responseText)
                }
            }

        }
    }).then((res) => {
        fun && fun(res)
    })
}


function getSwitchGame() {
    getRequest('/getSwitchGames', (res) => {
        document.body.innerHTML=(JSON.parse(res)[0].TitleName)
    })
}



