/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = window.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('choice-data','<span class="data-name">出版时间:</span>\r\n<div id="date">\r\n  <select name="year" id="year">\r\n    <option value="">选择年份</option>\r\n  </select>\r\n  <select name="month" id="month">\r\n    <option value="">选择月份</option>\r\n  </select>\r\n</div>');/*v:1*/
template('head','<header class="hea_cla">\r\n  <div class="stu_header_first">\r\n    <nav class="float_left logo">\r\n      <img src="../../asset/img/logo.png" alt="" title="哈工大在线教育">\r\n      <h1>哈工大在线教育</h1>\r\n    </nav>\r\n    <div class="bug">\r\n    </div>\r\n    <ul class="float_left users">\r\n      <li class="float_left ">\r\n        <div class="first">\r\n          <i class="fa fa-commenting-o fa-3x" aria-hidden="true"></i>\r\n        </div>\r\n      </li>\r\n      <li class="float_left ">\r\n        <div class="second">\r\n          <img class="imgSrc" src="../../asset/img/portrait.png" alt="" title="我是张三">\r\n        </div>\r\n\r\n      </li>\r\n      <li class="float_left">\r\n        <div class="users-menu-wrap">\r\n          <span>张三</span>\r\n        </div>\r\n      </li>\r\n      <li class="float_left ">\r\n        <div class="users-menu-wrap">\r\n          <a href="../../index.html">退出</a>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</header>');/*v:1*/
template('knowledge','<div class="top-l">\r\n  <a href="#">资源管理</a>\r\n  <span> > </span>\r\n  <a href="#">知识体系管理</a>\r\n</div>\r\n<div class="popup-s">\r\n  <button id="add">添加题型</button>\r\n</div>\r\n<div class="popup-i" id="popup-i">\r\n  <span>添加题型</span>\r\n  <div class="up-t">\r\n    <span>题型名称 ：</span>\r\n    <input type="text">\r\n  </div>\r\n  <div class="up-mt">\r\n    <span>类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span>\r\n    <select>\r\n      <option>小题</option>\r\n      <option>大题</option>\r\n    </select>\r\n  </div>\r\n  <form class="up-mb">\r\n    <span>基础题型：</span>\r\n    <input id="1" type="checkbox" name="item" value="单选题" />\r\n    <label for="1">单选题</label>\r\n    <input id="2" type="checkbox" name="item" value="多选题" />\r\n    <label for="2">多选题</label>\r\n    <input id="3" type="checkbox" name="item" value="判断题" />\r\n    <label for="3">判断题</label>\r\n    <input id="4" type="checkbox" name="item" value="填空题-小题" />\r\n    <label for="4">填空题-小题</label>\r\n    <input id="5" type="checkbox" name="item" value="主观题" />\r\n    <label for="5">主观题</label>\r\n  </form>\r\n  <div class="up-b">\r\n    <button id="close1">关闭</button>\r\n    <button id="close2">确认</button>\r\n  </div>\r\n  <script type="text/javascript">\r\n\r\n    $(window.onload = function () {\r\n      function $(id) {\r\n        return document.getElementById(id);\r\n      }\r\n      function myDiv() {\r\n        var mTop = (document.documentElement.clientHeight - 500) / 2;\r\n        var mleft = (document.documentElement.clientWidth - 400) / 2;\r\n        $("popup-i").style.top = mTop + "px";\r\n        $("popup-i").style.left = mleft + "px";\r\n      }\r\n      myDiv();\r\n      $("add").onclick = function () {\r\n        $("popup-i").style.display = "block";\r\n        mask.style.display = "block";\r\n      }\r\n      $("close1").onclick = function () {\r\n        $("popup-i").style.display = "none";\r\n        mask.style.display = "none"\r\n      }\r\n      $("close2").onclick = function () {\r\n        $("popup-i").style.display = "none";\r\n        mask.style.display = "none"\r\n      }\r\n      var mask = document.createElement("div");\r\n      mask.className = "mask";\r\n      mask.style.width = document.documentElement.clientWidth;\r\n      mask.style.height = document.documentElement.clientHeight;\r\n      document.body.appendChild(mask);\r\n      window.onresize = function () {\r\n        myDiv();\r\n        mask.style.width = document.documentElement.clientWidth;\r\n        mask.style.height = document.documentElement.clientHeight;\r\n      }\r\n    }\r\n    )\r\n  </script>');/*v:1*/
template('nav','<div class="r-lf">\r\n  <ul class="item">\r\n    <li class="li on">\r\n      <div class="i-top">资源管理</div>\r\n      <div class="content">\r\n        <div class="text">\r\n          <a href="../../view/redactor/index.html">课题管理</a>\r\n        </div>\r\n        <div class="text">\r\n          <a href="../../view/redactor/knowledge.html">知识体系管理</a>\r\n        </div>\r\n        <div class="text">\r\n          <a href="../../view/redactor/02.html">教材管理</a>\r\n        </div>\r\n        <div class="text">\r\n          <a href="../../view/redactor/03.html">课件管理</a>\r\n        </div>\r\n        <div class="text">\r\n          <a href="../../view/radcator/04.html">习题管理</a>\r\n        </div>\r\n      </div>\r\n    </li>\r\n    <li class="li on">\r\n      <div class="i-top">课程包管理</div>\r\n      <div class="content">\r\n        <div class="text">\r\n          <a href="#">课程包分类管理</a>\r\n        </div>\r\n        <div class="text">\r\n          <a href="#">课程包内容管理</a>\r\n        </div>\r\n      </div>\r\n    </li>\r\n    <li class="li on">\r\n      <div class="i-top">销售管理</div>\r\n      <div class="content">\r\n        <div class="text">\r\n          <a href="#">课程包销量管理</a>\r\n        </div>\r\n        <div class="text">\r\n          <a href="#">订单管理</a>\r\n        </div>\r\n      </div>\r\n    </li>\r\n    <li class="li on">\r\n      <div class="i-top">序列号管理</div>\r\n      <div class="content">\r\n        <div class="text">\r\n          <a href="#">课程包序列号生成及批次查询</a>\r\n        </div>\r\n        <div class="text">\r\n          <a href="#">序列号查询</a>\r\n        </div>\r\n      </div>\r\n    </li>\r\n    <li class="li on">\r\n      <div class="i-top">辅助内容管理</div>\r\n      <div class="content">\r\n        <div class="text">\r\n          <a href="#">首页推荐管理</a>\r\n        </div>\r\n      </div>\r\n    </li>\r\n    <li class="li on">\r\n      <div class="i-top">统计管理</div>\r\n      <div class="content">\r\n        <div class="text">\r\n          <a href="#">课程统计</a>\r\n        </div>\r\n        <div class="text">\r\n          <a href="#">课程包序列号激活统计</a>\r\n        </div>\r\n      </div>\r\n    </li>\r\n    <li class="li on">\r\n      <div class="i-top">用户管理</div>\r\n      <div class="content">\r\n        <div class="text">\r\n          <a href="#">个人用户管理</a>\r\n        </div>\r\n        <div class="text">\r\n          <a href="#">教师认证管理</a>\r\n        </div>\r\n        <div class="text">\r\n          <a href="#">管理员管理</a>\r\n        </div>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n</div>\r\n<script>\r\n  $(function () {\r\n    $(".text").hide();\r\n    $(".item>li").on("click", function (e) {\r\n      $(this).find(".text").slideToggle().parents(".li on").siblings().find(".text").slideUp();\r\n    });\r\n  })\r\n</script>');/*v:1*/
template('picture','<form name="r-p-form" id="r-p-form">\r\n  <img src="../../asset/img/1.png" id="r-img" height="300px" width="300px" class="r-img">\r\n  <br>\r\n  <input type="file" name="r-file" id="r-file" class="r-file" multiple="multiple" />\r\n</form>\r\n<script src="./jquery-1.12.4.js"></script>\r\n<script>\r\n  $("#r-file").change(function () {\r\n    var objUrl = getObjectURL(this.files[0]);\r\n    console.log("objUrl = " + objUrl);\r\n    if (objUrl) {\r\n      $("#r-img").attr("src", objUrl);\r\n      $("#r-img").removeClass("r-img");\r\n    }\r\n  });\r\n  //建立一個可存取到該file的url\r\n  function getObjectURL(file) {\r\n    var url = null;\r\n    if (window.createObjectURL != undefined) { // basic\r\n      url = window.createObjectURL(file);\r\n    }\r\n    else if (window.URL != undefined) {\r\n      // mozilla(firefox)\r\n      url = window.URL.createObjectURL(file);\r\n    }\r\n    else if (window.webkitURL != undefined) {\r\n      // webkit or chrome\r\n      url = window.webkitURL.createObjectURL(file);\r\n    }\r\n    return url;\r\n  }\r\n</script>');/*v:1*/
template('popup','<div class="top-l">\r\n  <a href="#"> 资源管理</a>\r\n  <span> > </span>\r\n  <a href="#"> 题型管理</a>\r\n</div>\r\n<div class="popup-s">\r\n  <button id="add">添加题型</button>\r\n</div>\r\n<div class="popup-i" id="popup-i">\r\n  <span>添加题型</span>\r\n  <div class="up-t">\r\n    <span>题型名称 ：</span>\r\n    <input type="text">\r\n  </div>\r\n  <div class="up-mt">\r\n    <span>类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span>\r\n    <select>\r\n      <option>小题</option>\r\n      <option>大题</option>\r\n    </select>\r\n  </div>\r\n  <form class="up-mb">\r\n    <span>基础题型：</span>\r\n    <input id="1" type="checkbox" name="item" value="单选题" />\r\n    <label for="1">单选题</label>\r\n    <input id="2" type="checkbox" name="item" value="多选题" />\r\n    <label for="2">多选题</label>\r\n    <input id="3" type="checkbox" name="item" value="判断题" />\r\n    <label for="3">判断题</label>\r\n    <input id="4" type="checkbox" name="item" value="填空题-小题" />\r\n    <label for="4">填空题-小题</label>\r\n    <input id="5" type="checkbox" name="item" value="主观题" />\r\n    <label for="5">主观题</label>\r\n  </form>\r\n  <div class="up-b">\r\n    <button id="close1">关闭</button>\r\n    <button id="close2">确认</button>\r\n  </div>\r\n  <script type="text/javascript">\r\n\r\n    $(window.onload = function () {\r\n      function $(id) {\r\n        return document.getElementById(id);\r\n      }\r\n      function myDiv() {\r\n        var mTop = (document.documentElement.clientHeight - 500) / 2;\r\n        var mleft = (document.documentElement.clientWidth - 400) / 2;\r\n        $("popup-i").style.top = mTop + "px";\r\n        $("popup-i").style.left = mleft + "px";\r\n      }\r\n      myDiv();\r\n      $("add").onclick = function () {\r\n        $("popup-i").style.display = "block";\r\n        mask.style.display = "block";\r\n      }\r\n      $("close1").onclick = function () {\r\n        $("popup-i").style.display = "none";\r\n        mask.style.display = "none"\r\n      }\r\n      $("close2").onclick = function () {\r\n        $("popup-i").style.display = "none";\r\n        mask.style.display = "none"\r\n      }\r\n      var mask = document.createElement("div");\r\n      mask.className = "mask";\r\n      mask.style.width = document.documentElement.clientWidth;\r\n      mask.style.height = document.documentElement.clientHeight;\r\n      document.body.appendChild(mask);\r\n      window.onresize = function () {\r\n        myDiv();\r\n        mask.style.width = document.documentElement.clientWidth;\r\n        mask.style.height = document.documentElement.clientHeight;\r\n      }\r\n    }\r\n    )\r\n  </script>');/*v:1*/
template('resource','<div class="top-l">\r\n  <a href="#">资源管理</a>\r\n  <span> > </span>\r\n  <a href="#">知识体系管理</a>\r\n</div>\r\n<div class="popup-s">\r\n  <button id="add">添加题型</button>\r\n</div>\r\n<div class="popup-i" id="popup-i">\r\n  <span>添加题型</span>\r\n  <div class="up-t">\r\n    <span>题型名称 ：</span>\r\n    <input type="text">\r\n  </div>\r\n  <div class="up-mt">\r\n    <span>类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span>\r\n    <select>\r\n      <option>小题</option>\r\n      <option>大题</option>\r\n    </select>\r\n  </div>\r\n  <form class="up-mb">\r\n    <span>基础题型：</span>\r\n    <input id="1" type="checkbox" name="item" value="单选题" />\r\n    <label for="1">单选题</label>\r\n    <input id="2" type="checkbox" name="item" value="多选题" />\r\n    <label for="2">多选题</label>\r\n    <input id="3" type="checkbox" name="item" value="判断题" />\r\n    <label for="3">判断题</label>\r\n    <input id="4" type="checkbox" name="item" value="填空题-小题" />\r\n    <label for="4">填空题-小题</label>\r\n    <input id="5" type="checkbox" name="item" value="主观题" />\r\n    <label for="5">主观题</label>\r\n  </form>\r\n  <div class="up-b">\r\n    <button id="close1">关闭</button>\r\n    <button id="close2">确认</button>\r\n  </div>\r\n  <script type="text/javascript">\r\n\r\n    $(window.onload = function () {\r\n      function $(id) {\r\n        return document.getElementById(id);\r\n      }\r\n      function myDiv() {\r\n        var mTop = (document.documentElement.clientHeight - 500) / 2;\r\n        var mleft = (document.documentElement.clientWidth - 400) / 2;\r\n        $("popup-i").style.top = mTop + "px";\r\n        $("popup-i").style.left = mleft + "px";\r\n      }\r\n      myDiv();\r\n      $("add").onclick = function () {\r\n        $("popup-i").style.display = "block";\r\n        mask.style.display = "block";\r\n      }\r\n      $("close1").onclick = function () {\r\n        $("popup-i").style.display = "none";\r\n        mask.style.display = "none"\r\n      }\r\n      $("close2").onclick = function () {\r\n        $("popup-i").style.display = "none";\r\n        mask.style.display = "none"\r\n      }\r\n      var mask = document.createElement("div");\r\n      mask.className = "mask";\r\n      mask.style.width = document.documentElement.clientWidth;\r\n      mask.style.height = document.documentElement.clientHeight;\r\n      document.body.appendChild(mask);\r\n      window.onresize = function () {\r\n        myDiv();\r\n        mask.style.width = document.documentElement.clientWidth;\r\n        mask.style.height = document.documentElement.clientHeight;\r\n      }\r\n    }\r\n    )\r\n  </script>');/*v:1*/
template('search','<input type="text" id="s-content">\r\n<button class="s-btn"> 搜索</button>\r\n<form class="form">\r\n  <span>发布状态：</span>\r\n  <input id="item" type="radio" name="item" value="小题&大题" />\r\n  <label for="all">全部</label>\r\n  <input id="simple" type="radio" name="item" value="小题" />\r\n  <label for="">小题</label>\r\n  <input id="hard" type="radio" name="item" value="大题" />\r\n  <label for="hard">大题</label>\r\n</form>');/*v:1*/
template('table',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title1=$data.title1,title2=$data.title2,title3=$data.title3,title4=$data.title4,title5=$data.title5,title6=$data.title6,$each=$utils.$each,data=$data.data,item=$data.item,$index=$data.$index,$out='';$out+='<table class="table">\r\n  <thead>\r\n    <tr>\r\n      <th>';
$out+=$escape(title1);
$out+='</th>\r\n      <th>';
$out+=$escape(title2);
$out+='</th>\r\n      <th>';
$out+=$escape(title3);
$out+='</th>\r\n      <th>';
$out+=$escape(title4);
$out+='</th>\r\n      <th>';
$out+=$escape(title5);
$out+='</th>\r\n      <th>';
$out+=$escape(title6);
$out+='</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    ';
$each(data,function(item,$index){
$out+='\r\n    <tr>\r\n      <td>';
$out+=$escape(item.ID);
$out+='</td>\r\n      <td>';
$out+=$escape(item.name);
$out+='</td>\r\n      <td>';
$out+=$escape(item.type);
$out+='</td>\r\n      <td>';
$out+=$escape(item.base);
$out+='</td>\r\n      <td>';
$out+=$escape(item.choice);
$out+='</td>\r\n      <td>\r\n        <a class="bj" href="#">编辑</a>\r\n        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>\r\n        <a class="sc" href="#">删除</a>\r\n      </td>\r\n    </tr>\r\n    ';
});
$out+='\r\n  </tbody>\r\n</table>\r\n<script>\r\n  $($(document).on(\'click\', \'.sc\', function () {\r\n    $(this).parent().parent().remove();\r\n  })\r\n  );\r\n  $(function () {\r\n    $(".bj").click(function () {\r\n      str = $(this).text() == "编辑" ? "确认" : "编辑";\r\n      $(this).text(str);\r\n      $(this).parent().siblings("td:lt(5)").each(function () {\r\n        obj_text = $(this).find("input:text");\r\n        if (!obj_text.length) {\r\n\r\n          $(this).html("<input type=\'text\' class=\'r-bjk\' value=\'" + $(this).text() + "\'>");\r\n        }\r\n        else {\r\n\r\n          $(this).html(obj_text.val());\r\n        }\r\n      });\r\n    });\r\n  });\r\n</script>';
return new String($out);
});/*v:1*/
template('tree',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="tree">\r\n  ';
$each(data,function(item,$index){
$out+='\r\n  <ul>\r\n    <li>\r\n      <div class="close_menu">\r\n        <span></span>\r\n        <table>\r\n          <tr>\r\n            <td>';
$out+=$escape(item.ID);
$out+='</td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n      <ul>\r\n        <li>\r\n          <div class="close_menu">\r\n            <span></span>\r\n            <td>';
$out+=$escape(item.name);
$out+='</td>\r\n          </div>\r\n          <ul>\r\n            <li>\r\n              <div class="close_menu">\r\n                <span></span>\r\n                <table>\r\n                  <tr>\r\n                    <td>';
$out+=$escape(item.type);
$out+='</td>\r\n                    <td class="tree-tj">\r\n                      <button> 添加</button>\r\n                    </td>\r\n                    <td class="tree-xg">\r\n                      <button>修改</button>\r\n                    </td>\r\n                    <td class="tree-sc">\r\n                      <button>删除</button>\r\n                    </td>\r\n                    <td class="tree-sy">\r\n                      <button>上移</button>\r\n                    </td>\r\n                    <td class="tree-xy">\r\n                      <button>下移</button>\r\n                    </td>\r\n                  </tr>\r\n                </table>\r\n              </div>\r\n              <ul>\r\n                <table class="sj">\r\n                  <tr>\r\n                    <td>';
$out+=$escape(item.ID);
$out+='</td>\r\n                    <td class="tree-tj">\r\n                      <button> 添加</button>\r\n                    </td>\r\n                    <td class="tree-xg">\r\n                      <button>修改</button>\r\n                    </td>\r\n                    <td class="tree-sc">\r\n                      <button>删除</button>\r\n                    </td>\r\n                    <td class="tree-sy">\r\n                      <button>上移</button>\r\n                    </td>\r\n                    <td class="tree-xy">\r\n                      <button>下移</button>\r\n                    </td>\r\n                  </tr>\r\n                </table>\r\n              </ul>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n      </ul>\r\n      ';
});
$out+='\r\n</div>\r\n<script>\r\n  // $(document).ready(function () {\r\n  //   $(\'.close_menu\').each(function () {\r\n  //     $(this).siblings(\'ul\').hide();\r\n  //   });\r\n  //   $(document).on(\'click\', \'.close_menu span\', function () {\r\n  //     $(this).parent().addClass(\'open_menu\').removeClass(\'close_menu\');\r\n  //     $(this).parent().siblings(\'ul\').fadeIn();\r\n  //     treewidth();\r\n  //   });\r\n  //   $(document).on(\'click\', \'.open_menu span\', function () {\r\n  //     $(this).parent().parent().find(\'.open_menu\').addClass(\'close_menu\').removeClass(\'open_menu\');\r\n  //     $(this).parent().parent().find(\'ul\').hide();\r\n  //     treewidth();\r\n  //   });\r\n  //   $(document).on(\'click\', \'.tree a\', function () {\r\n  //     $(\'.ontree\').removeClass(\'ontree\');\r\n  //     $(this).addClass(\'ontree\');\r\n  //   });\r\n  //   treewidth();\r\n  //   function treewidth() {\r\n  //     var items = new Array();\r\n  //     var parents = new Array();\r\n  //     var text_num = 0, parent_num = 0;\r\n  //     $(\'.tree a\').each(function () {\r\n  //       if ($(this).is(\':hidden\') == false) {\r\n  //         items.push($(this).text().length);\r\n  //         parents.push($(this).parents(\'ul\').length);\r\n  //       }\r\n  //     });\r\n  //     // document.title="最多字数："+Math.max.apply(null, items)+",最大层数："+Math.max.apply(null, parents);\r\n  //     text_num = Math.max.apply(null, items);\r\n  //     parent_num = Math.max.apply(null, parents);\r\n  //     $(\'.tree\').width(parent_num * 20 + text_num * 14 + 44);\r\n  //   }\r\n  // });\r\n</script>';
return new String($out);
});

}()