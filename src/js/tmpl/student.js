/* TMODJS:{"version":"1.0.0"} */
!(function() {
  function template(filename, content) {
    return (/string|function/.test(typeof content) ? compile : renderFile)(
      filename,
      content
    );
  }

  var cache = (template.cache = {});
  var String = window.String;

  function toString(value, type) {
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
  }

  var escapeMap = {
    '<': '&#60;',
    '>': '&#62;',
    '"': '&#34;',
    "'": '&#39;',
    '&': '&#38;'
  };

  function escapeFn(s) {
    return escapeMap[s];
  }

  function escapeHTML(content) {
    return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
  }

  var isArray =
    Array.isArray ||
    function(obj) {
      return {}.toString.call(obj) === '[object Array]';
    };

  function each(data, callback) {
    if (isArray(data)) {
      for (var i = 0, len = data.length; i < len; i++) {
        callback.call(data, data[i], i, data);
      }
    } else {
      for (i in data) {
        callback.call(data, data[i], i);
      }
    }
  }

  function resolve(from, to) {
    var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
    var dirname = ('./' + from).replace(/[^/]+$/, '');
    var filename = dirname + to;
    filename = filename.replace(/\/\.\//g, '/');
    while (filename.match(DOUBLE_DOT_RE)) {
      filename = filename.replace(DOUBLE_DOT_RE, '/');
    }
    return filename;
  }

  var utils = (template.utils = {
    $helpers: {},

    $include: function(filename, data, from) {
      filename = resolve(from, filename);
      return renderFile(filename, data);
    },

    $string: toString,

    $escape: escapeHTML,

    $each: each
  });

  var helpers = (template.helpers = utils.$helpers);

  function renderFile(filename, data) {
    var fn =
      template.get(filename) ||
      showDebugInfo({
        filename: filename,
        name: 'Render Error',
        message: 'Template not found'
      });
    return data ? fn(data) : fn;
  }

  function compile(filename, fn) {
    if (typeof fn === 'string') {
      var string = fn;
      fn = function() {
        return new String(string);
      };
    }

    var render = (cache[filename] = function(data) {
      try {
        return new fn(data, filename) + '';
      } catch (e) {
        return showDebugInfo(e)();
      }
    });

    render.prototype = fn.prototype = utils;
    render.toString = function() {
      return fn + '';
    };

    return render;
  }

  function showDebugInfo(e) {
    var type = '{Template Error}';
    var message = e.stack || '';

    if (message) {
      // 利用报错堆栈信息
      message = message
        .split('\n')
        .slice(0, 2)
        .join('\n');
    } else {
      // 调试版本，直接给出模板语句行
      for (var name in e) {
        message += '<' + name + '>\n' + e[name] + '\n\n';
      }
    }

    return function() {
      if (typeof console === 'object') {
        console.error(type + '\n\n' + message);
      }
      return type;
    };
  }

  template.get = function(filename) {
    return cache[filename.replace(/^\.\//, '')];
  };

  template.helper = function(name, helper) {
    helpers[name] = helper;
  };

  if (typeof define === 'function') {
    define(function() {
      return template;
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = template;
  } else {
    this.template = template;
  }

  /* v:1 */
  template(
    'stu_footer_tpl',
    '<footer class="foo_cla ">\r\n  <div class="copyright">Copyrignt © 2004-2016 哈尔滨工业大学出版社 版权所有 京ICP备11017824号-7</div>\r\n</footer>'
  ); /* v:1 */
  template('stu_header_tpl', function(
    $data,
    $filename
    /* `` */
  ) {
    'use strict';
    var $utils = this,
      $helpers = $utils.$helpers,
      $each = $utils.$each,
      stu_info = $data.stu_info,
      val = $data.val,
      i = $data.i,
      $escape = $utils.$escape,
      $out = '';
    $out +=
      '<!-- \r\n\r\n  这个是头部模块，模板的名字stu_header\r\n  使用了小图标，引用时需要在页面引用lib图库的\r\n    lib/font-awesome-4.7.0/css/font-awesome.css \r\n -->\r\n\r\n<header class="hea_cla">\r\n  <div class="stu_header_first">\r\n    <nav class="float_left logo">\r\n      <img src="/asset/img/logo.png" alt="稍等" title="哈工大在线教育">\r\n      <h1>哈工大在线教育</h1>\r\n    </nav>\r\n    <div class="float_left search">\r\n      <div class="float_left search_le">课程 &nbsp;\r\n        <i class="fa fa-sort-desc "></i>\r\n        <ul class="abs_choices">\r\n          <li>课程</li>\r\n          <li>教材</li>\r\n        </ul>\r\n      </div>\r\n\r\n      <input class="float_left search_ri" type="text">\r\n      <i class="fa fa-search fa-2x absolute" aria-hidden="true"></i>\r\n    </div>\r\n\r\n    ';
    $each(stu_info, function(val, i) {
      $out +=
        '\r\n    <ul class="float_left users">\r\n      <li class="float_left ">\r\n        <div class="first">\r\n          <i class="fa fa-commenting-o fa-3x" aria-hidden="true"></i>\r\n\r\n        </div>\r\n        <div class="first_msg">1</div>\r\n        <div class="first_msg">';
      $out += $escape(val.msgNum);
      $out +=
        '</div>\r\n      </li>\r\n      <li class="float_left ">\r\n\r\n        <div class="second">\r\n          <img class="imgSrc" src="/asset/img/portrait.png" alt="portrait" title="我是张三丰">\r\n          <img class="imgSrc" src="';
      $out += $escape(val.imgUrl);
      $out +=
        '" alt="portrait" title="我是张三丰">\r\n        </div>\r\n\r\n      </li>\r\n      <li class="float_left">\r\n        <div class="users-menu-wrap">\r\n          <span>张三丰</span> &nbsp;\r\n          <span>';
      $out += $escape(val.name);
      $out +=
        '</span> &nbsp;\r\n          <i class="fa fa-sort-desc "></i>\r\n\r\n          <ul class="users-menu-list">\r\n            <li>我的资源</li>\r\n            <li>我的订单</li>\r\n            <li>个人资料</li>\r\n            <li>退出登录</li>\r\n          </ul>\r\n        </div>\r\n      </li>\r\n      <li class="float_left ">\r\n        <div class="users-menu-wrap">\r\n          <span>学生端</span> &nbsp;\r\n          <i class="fa fa-sort-desc "></i>\r\n\r\n          <ul class="users-menu-list">\r\n            <li>学生端</li>\r\n            <li>教师端</li>\r\n          </ul>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n    ';
    });
    $out += '\r\n\r\n  </div>\r\n</header>';
    return new String($out);
  }); /* v:1 */
  template('stu_nav_b_r_tpl', function(
    $data,
    $filename
    /* `` */
  ) {
    'use strict';
    var $utils = this,
      $helpers = $utils.$helpers,
      $each = $utils.$each,
      list_b = $data.list_b,
      val = $data.val,
      $index = $data.$index,
      $escape = $utils.$escape,
      list_r = $data.list_r,
      $out = '';
    $out +=
      '<!-- ************************************** -->\r\n\r\n<nav class="b_r">\r\n  <div class="nav_b_r_wrap">\r\n    <ul class="blue_col">\r\n      ';
    $each(list_b, function(val, $index) {
      $out += ' ';
      if (val.isSep) {
        $out +=
          '\r\n      <li class="blue_col_item_none">\r\n        <a href="javascript:;">';
        $out += $escape(val.content);
        $out += '</a>\r\n      </li>\r\n      ';
      } else {
        $out += '\r\n      <li class="blue_col_item">\r\n        <a href="';
        $out += $escape(val.hrefUrl);
        $out += '">';
        $out += $escape(val.content);
        $out += '</a>\r\n      </li>\r\n      ';
      }
      $out += ' ';
    });
    $out += '\r\n    </ul>\r\n\r\n\r\n    <ul class="red_col">\r\n      ';
    $each(list_r, function(val, $index) {
      $out += ' ';
      if (val.isSep) {
        $out +=
          '\r\n      <li class="red_col_item_none">\r\n        <a href="javascript:;">';
        $out += $escape(val.content);
        $out += '</a>\r\n      </li>\r\n      ';
      } else {
        $out += '\r\n      <li class="red_col_item">\r\n        <a href="';
        $out += $escape(val.hrefUrl);
        $out += '">';
        $out += $escape(val.content);
        $out += '</a>\r\n      </li>\r\n      ';
      }
      $out += ' ';
    });
    $out +=
      '\r\n    </ul>\r\n\r\n\r\n  </div>\r\n  <div class="nav_b_r_nowrap_right"></div>\r\n</nav>';
    return new String($out);
  }); /* v:1 */
  template('stu_nav_sec_tpl', function(
    $data,
    $filename
    /* `` */
  ) {
    'use strict';
    var $utils = this,
      $helpers = $utils.$helpers,
      $each = $utils.$each,
      stu_nav_sec_tpl_list = $data.stu_nav_sec_tpl_list,
      value = $data.value,
      i = $data.i,
      isText = $data.isText,
      $escape = $utils.$escape,
      admin = $data.admin,
      code = $data.code,
      title = $data.title,
      list = $data.list,
      $out = '';
    $out +=
      '<ul class="stu_nav_sec_wrap_tpl">\r\n\r\n    <!-- <li class="stu_nav_sec_item isText">首页</li>\r\n  <li class="stu_nav_sec_item ">></li>\r\n  <li class="stu_nav_sec_item isText">课程</li>\r\n  <li class="stu_nav_sec_item ">></li> -->\r\n\r\n    ';
    $each(stu_nav_sec_tpl_list, function(value, i) {
      $out += '\r\n    <!-- <li ';
      if (isText) {
        $out += ' class="stu_nav_sec_item isText" ';
      } else {
        $out += ' class="stu_nav_sec_item" ';
      }
      $out += '>';
      $out += $escape(value);
      $out +=
        '</li> -->\r\n    <!-- <li class="stu_nav_sec_item">\r\n        <a href="#">';
      $out += $escape(value);
      $out += '</a>\r\n    </li> -->\r\n    ';
      if ((i + 1) % 2) {
        $out +=
          '\r\n    <li class="stu_nav_sec_item isText">\r\n\r\n        <a href="#">';
        $out += $escape(value);
        $out += '</a>\r\n    </li>\r\n    ';
      } else {
        $out +=
          '\r\n    <li class="stu_nav_sec_item">\r\n\r\n        <a href="javscript:;" disabled>';
        $out += $escape(value);
        $out += '</a>\r\n    </li>\r\n    ';
      }
      $out += ' ';
    });
    $out += '\r\n</ul>\r\n\r\n\r\n\r\n\r\n<!-- ';
    if (admin) {
      $out += '\r\n	<p>admin</p>\r\n';
    } else if (code > 0) {
      $out += '\r\n	<p>master</p>\r\n';
    } else {
      $out += '\r\n    <p>error!</p>\r\n';
    }
    $out += ' -->\r\n\r\n\r\n<!-- <h1>';
    $out += $escape(title);
    $out += '</h1>\r\n<ul>\r\n    ';
    $each(list, function(value, i) {
      $out += '\r\n        <li>索引 ';
      $out += $escape(i + 1);
      $out += ' ：';
      $out += $escape(value);
      $out += '</li>\r\n    ';
    });
    $out +=
      "\r\n</ul> -->\r\n\r\n\r\n<!-- {\r\n  newsListTpl: childTpl,\r\n  list1: [\r\n  {title: '国内标题1', desc: '国内描述1'},\r\n  {title: '国内标题2', desc: '国内描述2'},\r\n  {title: '国内标题3', desc: '国内描述3'},\r\n  ],\r\n  list2: [\r\n  {title: '国际标题1', desc: '国际描述1'},\r\n  {title: '国际标题2', desc: '国际描述2'},\r\n  {title: '国际标题3', desc: '国际描述3'},\r\n  ],\r\n} -->";
    return new String($out);
  }); /* v:1 */
  template(
    'stu_hot_course_details/stu_hot_course_details_top_tpl',
    '<div class="stu_hot_course_details_top">\r\n  <!-- 我是学生端中详情页的上头部分-有图片，时间，老师，开课，学生人数等内容 -->\r\n  <div class="stu_de_le">\r\n    <img class="stu_de_le_img" src="/asset/img/course_map7.png" alt="" title="我是图片7">\r\n  </div>\r\n  <div class="stu_de_ri">\r\n    <h2>课程名字</h2>\r\n    <span class="course_vis">课程邀请码</span>&nbsp;&nbsp;&nbsp;\r\n    <span class="course_num">12365478</span>\r\n    <div class="sep_line"></div>\r\n    <table class="ta_cla">\r\n      <tbody class="tb_cla">\r\n        <tr>\r\n          <td>任课教师</td>\r\n          <td>张三疯</td>\r\n          <td colspan="2">东南大学</td>\r\n          <td></td>\r\n          <td>开课时间</td>\r\n          <td colspan="3">2018.09.08-2019.06.04</td>\r\n        </tr>\r\n        <tr>\r\n          <td>报名权限</td>\r\n          <td colspan="3">所有用户都可以报名</td>\r\n          <td></td>\r\n          <td>学生人数</td>\r\n          <td>200</td>\r\n          <td></td>\r\n          <td></td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n    <span class="join_course">加入课程</span>\r\n\r\n  </div>\r\n</div>\r\n<div class="stu_hot_course_details_bottom_wrap">\r\n\r\n  <div class=" stu_hot_course_details_bottom_le">\r\n    <h3 class="title_intro">课程介绍</h3>\r\n\r\n    <ul class="content_wrap">\r\n      <li class="content_item te_ind_2">\r\n        虽然前端的MVVM开发模式已经进入各个公司和各个开发人员的视野，而且也异常火爆。为什么还要学习jQuery呢？ Query库封装的的确非常经典，做一下小项目和简单的项目足够支撑\r\n      </li>\r\n      <li class="content_item te_ind_2">\r\n        虽然前端的MVVM开发模式已经进入各个公司和各个开发人员的视野，而且也异常火爆。为什么还要学习jQuery呢？ Query库封装的的确非常经典，做一下小项目和简单的项目足够支撑\r\n      </li>\r\n      <li class="content_item te_ind_2">\r\n        虽然前端的MVVM开发模式已经进入各个公司和各个开发人员的视野，而且也异常火爆。为什么还要学习jQuery呢？ Query库封装的的确非常经典，做一下小项目和简单的项目足够支撑\r\n      </li>\r\n      <li class="content_item te_ind_2">\r\n        虽然前端的MVVM开发模式已经进入各个公司和各个开发人员的视野，而且也异常火爆。为什么还要学习jQuery呢？ Query库封装的的确非常经典，做一下小项目和简单的项目足够支撑\r\n      </li>\r\n\r\n    </ul>\r\n    <div class="sep_line"></div>\r\n    <h3>教师介绍</h3>\r\n    <ul class="content_wrap">\r\n      <li class="content_item te_ind_2">\r\n        虽然前端的MVVM开发模式已经进入各个公司和各个开发人员的视野，而且也异常火爆。为什么还要学习jQuery呢？ Query库封装的的确非常经典，做一下小项目和简单的项目足够支撑\r\n      </li>\r\n      <li class="content_item te_ind_2">\r\n        虽然前端的MVVM开发模式已经进入各个公司和各个开发人员的视野，而且也异常火爆。为什么还要学习jQuery呢？ Query库封装的的确非常经典，做一下小项目和简单的项目足够支撑\r\n      </li>\r\n      <li class="content_item te_ind_2">\r\n        虽然前端的MVVM开发模式已经进入各个公司和各个开发人员的视野，而且也异常火爆。为什么还要学习jQuery呢？ Query库封装的的确非常经典，做一下小项目和简单的项目足够支撑\r\n      </li>\r\n      <li class="content_item te_ind_2">\r\n        虽然前端的MVVM开发模式已经进入各个公司和各个开发人员的视野，而且也异常火爆。为什么还要学习jQuery呢？ Query库封装的的确非常经典，做一下小项目和简单的项目足够支撑\r\n      </li>\r\n    </ul>\r\n    <div class="sep_line"></div>\r\n    <h3>课程目录</h3>\r\n    <ul class="content_wrap">\r\n      <li class="content_item">第二课时，haohao学习，天天向上</li>\r\n      <li class="content_item">第二课时，haohao学习，天天向上</li>\r\n      <li class="content_item">第二课时，haohao学习，天天向上</li>\r\n      <li class="content_item">第二课时，haohao学习，天天向上</li>\r\n    </ul>\r\n\r\n  </div>\r\n  <div class=" stu_hot_course_details_bottom_ri_t con_det_bot_ri">\r\n    <span class="title">选用的教材</span>\r\n    <li class="img_p_wrap">\r\n      <img class="con_det_bot_img" src="/asset/img/course_map8.png" alt="" title="我是图片1">\r\n      <p class="title_p">平面几何立体几何平面几何立体几何</p>\r\n    </li>\r\n\r\n  </div>\r\n  <div class=" stu_hot_course_details_bottom_ri_b  con_det_bot_ri">\r\n    <span class="title">选用的教材\r\n      <span class="title_right">more...</span>\r\n    </span>\r\n    <li class="img_p_wrap">\r\n      <img class="con_det_bot_img" src="/asset/img/course_map6.png" alt="" title="我是图片1">\r\n      <p class="title_p">平面几何立体几何平面几何立体几何</p>\r\n\r\n      <img class="con_det_bot_img" src="/asset/img/course_map5.png" alt="" title="我是图片1">\r\n      <p class="title_p">平面几何立体几何平面几何立体几何</p>\r\n    </li>\r\n  </div>\r\n  <div class="stu_hot_course_details_bottom_wrap_clear_fix"></div>\r\n</div>'
  ); /* v:1 */
  template('stu_hot_course_lists/stu_hot_course_lists_left_tpl', function(
    $data,
    $filename
    /* `` */
  ) {
    'use strict';
    var $utils = this,
      $helpers = $utils.$helpers,
      $each = $utils.$each,
      hot_course_lists = $data.hot_course_lists,
      val = $data.val,
      $index = $data.$index,
      $escape = $utils.$escape,
      $out = '';
    $out +=
      '<div class="stu_hot_course_lists_tpl">\r\n  <ul class="stu_hcl_le">\r\n    <!-- <li class="title_nav">jingran meiyou </li> -->\r\n    <!-- **************** -->\r\n    <!-- <li class="title_nav">jingran meiyou </li> -->\r\n    <!-- **************** -->\r\n    <!-- ***************** -->\r\n    ';
    $each(hot_course_lists, function(val, $index) {
      $out +=
        '\r\n    <li class="title_nav">\r\n      <h3>\r\n        <span cid="';
      $out += $escape(val.id);
      $out += '" class="title_nav_hid">+</span> ';
      $out += $escape(val.title);
      $out +=
        '\r\n      </h3>\r\n      <ul class="content_hid">\r\n        <li class="content_hi active">';
      $out += $escape(val.content1);
      $out += '</li>\r\n        <li class="content_hi">';
      $out += $escape(val.content2);
      $out += '</li>\r\n        <li class="content_hi">';
      $out += $escape(val.content3);
      $out += '</li>\r\n      </ul>\r\n    </li>\r\n    ';
    });
    $out +=
      '\r\n\r\n    <!-- ****************** -->\r\n    <!-- *************** -->\r\n    <!-- <li class="title_nav">jingran meiyou </li> -->\r\n    <!-- *************** -->\r\n  </ul>\r\n</div>';
    return new String($out);
  }); /* v:1 */
  template('stu_hot_course_lists/stu_hot_course_lists_right_tpl', function(
    $data,
    $filename
    /* `` */
  ) {
    'use strict';
    var $utils = this,
      $helpers = $utils.$helpers,
      $each = $utils.$each,
      hot_course_lists = $data.hot_course_lists,
      val = $data.val,
      $index = $data.$index,
      $escape = $utils.$escape,
      hot_material_data = $data.hot_material_data,
      index = $data.index,
      material_name = $data.material_name,
      course_introduce = $data.course_introduce,
      $out = '';
    $out +=
      '<div class="stu_hot_course_lists_tpl">\r\n  <ul class="stu_hcl_le">\r\n    <!-- <li class="title_nav">jingran meiyou </li> -->\r\n    <!-- **************** -->\r\n    <!-- <li class="title_nav">jingran meiyou </li> -->\r\n    <!-- **************** -->\r\n    <!-- ***************** -->\r\n    ';
    $each(hot_course_lists, function(val, $index) {
      $out +=
        '\r\n    <li class="title_nav">\r\n      <h3>\r\n        <span cid="';
      $out += $escape(val.id);
      $out += '" class="title_nav_hid">+</span> ';
      $out += $escape(val.title);
      $out +=
        '\r\n      </h3>\r\n      <ul class="content_hid">\r\n        <li class="content_hi active">';
      $out += $escape(val.content1);
      $out += '</li>\r\n        <li class="content_hi">';
      $out += $escape(val.content2);
      $out += '</li>\r\n        <li class="content_hi">';
      $out += $escape(val.content3);
      $out += '</li>\r\n      </ul>\r\n    </li>\r\n    ';
    });
    $out +=
      '\r\n\r\n    <!-- ****************** -->\r\n    <!-- *************** -->\r\n    <!-- <li class="title_nav">jingran meiyou </li> -->\r\n    <!-- *************** -->\r\n  </ul>\r\n  <div class="stu_hcl_ri">\r\n    <div class="stu_hcl_ri_t">\r\n      <span>共\r\n        <span>100</span> 个课程</span>\r\n      <span>\r\n        &lt;</span>\r\n      <span>1</span>\r\n      <span>/</span>\r\n      <span>10</span>\r\n      <span>&gt;</span>\r\n    </div>\r\n    <ul class="stu_hcl_ri_m">\r\n      <!-- ********************** -->\r\n      ';
    $each(hot_material_data.material_details, function(val, index) {
      $out += '\r\n      <li class="stu_hcl_ri_m_item">\r\n        <img src="';
      $out += $escape(val.material_img);
      $out += '" alt=" " title="wosshi">\r\n        <h3>';
      $out += $escape(material_name);
      $out += '</h3>\r\n        <span>';
      $out += $escape(course_introduce);
      $out += '}</span>\r\n        <span>{course_teacher';
    });
    $out +=
      '\r\n    </ul>\r\n    <div class="stu_hcl_ri_b ">\r\n      <div class="stu_hcl_ri_b_le ">go1122</div>\r\n      <div class="stu_hcl_ri_b_paging_style stu_hcl_ri_b_paging_box "></div>\r\n    </div>\r\n  </div>\r\n  <div class="clear_fix "></div>\r\n</div>';
    return new String($out);
  }); /* v:1 */
  template('stu_index/stu_carousel_ind_tpl', function(
    $data,
    $filename
    /* `` */
  ) {
    'use strict';
    var $utils = this,
      $helpers = $utils.$helpers,
      $each = $utils.$each,
      carouselList = $data.carouselList,
      val = $data.val,
      $index = $data.$index,
      $escape = $utils.$escape,
      $out = '';
    $out +=
      '<div class="stu_carousel_container">\r\n\r\n  <div class="carousel-content">\r\n    <ul class="carousel">\r\n      ';
    $each(carouselList, function(val, $index) {
      $out += '\r\n      <li>\r\n        <a href="';
      $out += $escape(val.hrefUrl);
      $out += '">\r\n          <img src="';
      $out += $escape(val.imgUrl);
      $out += '" title="';
      $out += $escape(val.title);
      $out += '">\r\n        </a>\r\n      </li>\r\n      ';
    });
    $out +=
      '\r\n      <!-- <li>\r\n        <img src="/asset/img/carousel.png">\r\n      </li>\r\n      <li>\r\n        <img src="/asset/img/carousel.png">\r\n      </li> -->\r\n\r\n    </ul>\r\n    <ul class="img-index"></ul>\r\n\r\n  </div>\r\n\r\n</div>';
    return new String($out);
  }); /* v:1 */
  template('stu_index/stu_hot_course_details_tpl', ''); /* v:1 */
  template('stu_index/stu_Popular_teaching_material_tpl', function(
    $data,
    $filename
    /* `` */
  ) {
    'use strict';
    var $utils = this,
      $helpers = $utils.$helpers,
      $each = $utils.$each,
      hot_material_data = $data.hot_material_data,
      val = $data.val,
      index = $data.index,
      $escape = $utils.$escape,
      $out = '';
    $out +=
      '<div class="ptm_container">\r\n  <div class="ptm_co_title">\r\n    <div class="le">热门教材</div>\r\n    <a class="ri">more...</a>\r\n  </div>\r\n\r\n  <ul class="content_img_p_wrap">\r\n    ';
    $each(hot_material_data.material_details, function(val, index) {
      $out +=
        '\r\n    <li class="content_item">\r\n      <a href="/view/student/stu_hot_course_details.html?id=';
      $out += $escape(val.material_id);
      $out += '">\r\n        <img class="co_item_img" src="';
      $out += $escape(val.material_img);
      $out += '" alt="" title="';
      $out += $escape(val.material_name);
      $out += '">\r\n        <span>';
      $out += $escape(val.course_introduce);
      $out += '</span>>\r\n      </a>\r\n    </li>\r\n    ';
    });
    $out +=
      '\r\n\r\n\r\n    <!-- <li class="content_item">\r\n      <img class="co_item_img" src="/asset/img/teaching.png" alt="" title="我是教材">\r\n      <span>人教版小学生编程教材jQuery老马前端——谦太详和</span>>\r\n    </li>\r\n    <li class="content_item">\r\n      <img class="co_item_img" src="/asset/img/teaching.png" alt="" title="我是教材">\r\n      <span>人教版小学生编程教材jQuery老马前端——谦太详和</span>>\r\n    </li>\r\n    <li class="content_item">\r\n      <img class="co_item_img" src="/asset/img/teaching.png" alt="" title="我是教材">\r\n      <span>人教版小学生编程教材jQuery老马前端——谦太详和</span>>\r\n    </li>\r\n    <li class="content_item">\r\n      <img class="co_item_img" src="/asset/img/teaching.png" alt="" title="我是教材">\r\n      <span>人教版小学生编程教材jQuery老马前端——谦太详和</span>>\r\n    </li>\r\n    <li class="content_item">\r\n      <img class="co_item_img" src="/asset/img/teaching.png" alt="" title="我是教材">\r\n      <span>人教版小学生编程教材jQuery老马前端——谦太详和</span>>\r\n    </li>\r\n    <li class="content_item">\r\n      <img class="co_item_img" src="/asset/img/teaching.png" alt="" title="我是教材">\r\n      <span>人教版小学生编程教材jQuery老马前端——谦太详和</span>>\r\n    </li>\r\n    <li class="content_item">\r\n      <img class="co_item_img" src="/asset/img/teaching.png" alt="" title="我是教材">\r\n      <span>人教版小学生编程教材jQuery老马前端——谦太详和</span>>\r\n    </li>\r\n    <li class="content_item">\r\n      <img class="co_item_img" src="/asset/img/teaching.png" alt="" title="我是教材">\r\n      <span>人教版小学生编程教材jQuery老马前端——谦太详和</span>>\r\n    </li>\r\n    <li class="content_item">\r\n      <img class="co_item_img" src="/asset/img/teaching.png" alt="" title="我是教材">\r\n      <span>人教版小学生编程教材jQuery老马前端——谦太详和</span>>\r\n    </li> -->\r\n  </ul>\r\n</div>';
    return new String($out);
  }); /* v:1 */
  template('stu_index/stu_Recommended_tpl', ''); /* v:1 */
  template(
    'stu_mystudy/stu_mystudy_tpl',
    '<div class="stu_mystudy_tpl">\r\n\r\n\r\n  <ul class="mystudy_nav">\r\n    <li class="flo_le nav_le active">开课中</li>\r\n    <li class="flo_le nav_le">已完结</li>\r\n    <li class="nav_ri">课程管理</li>\r\n    <!-- <div class="abs"></div> -->\r\n  </ul>\r\n  <!-- 待批改项*********开始 -->\r\n  <ul class="mystudy_wrap">\r\n    <li class="mystudy_item">\r\n      <div class="item_le">\r\n        <img class="item_le_img " src="" alt="稍等片刻">\r\n        <div class="item_le_ab">待批作业</div>\r\n      </div>\r\n\r\n      <div class="item_ri">\r\n\r\n        <h3>电力电子技术基础课程</h3>\r\n\r\n        <ul class="mystudy_info">\r\n          <li class="flo_le info_item">任课教师&nbsp;&nbsp;张三丰&nbsp;中医药大学</li>\r\n          <li class="flo_le info_item">邀请码&nbsp;&nbsp;0022336655</li>\r\n\r\n          <li class="flo_le info_item">截止时间&nbsp;&nbsp;2018.05.31</li>\r\n          <li class="flo_le info_item">\r\n            <i class="fa fa-user-o"></i>&nbsp;&nbsp;200 </li>\r\n        </ul>\r\n        <hr>\r\n        <div></div>\r\n        <!-- <ul class="mystudy_work">\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">待提交</li>\r\n              <li class="flo_le tag_section">第一章作业</li>\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">待提交</li>\r\n              <li class="flo_le tag_section">第一章作业</li>\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">活动</li>\r\n              <li class="flo_le tag_section">活动通知标题</li>\r\n              <li class="flo_le tag_section">活动时间</li>\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">通知</li>\r\n\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n        </ul> -->\r\n      </div>\r\n    </li>\r\n  </ul>\r\n  <!-- 待批改项*********结束 -->\r\n\r\n\r\n  <!-- 无权限*****开始 -->\r\n  <ul class="mystudy_wrap">\r\n    <li class="mystudy_item">\r\n      <div class="item_le">\r\n        <img class="item_le_img " src="" alt="稍等片刻">\r\n        <div class="item_le_ab">无权限</div>\r\n      </div>\r\n\r\n      <div class="item_ri">\r\n\r\n        <h3>电力电子技术基础课程</h3>\r\n\r\n        <ul class="mystudy_info">\r\n          <li class="flo_le info_item">任课教师&nbsp;&nbsp;张三丰&nbsp;中医药大学</li>\r\n          <li class="flo_le info_item">邀请码&nbsp;&nbsp;0022336655</li>\r\n\r\n          <li class="flo_le info_item">截止时间&nbsp;&nbsp;2018.05.31</li>\r\n          <li class="flo_le info_item">\r\n            <i class="fa fa-user-o"></i>&nbsp;&nbsp;200 </li>\r\n        </ul>\r\n        <hr>\r\n        <!-- <ul class="mystudy_work">\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">待提交</li>\r\n              <li class="flo_le tag_section">第一章作业</li>\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">待提交</li>\r\n              <li class="flo_le tag_section">第一章作业</li>\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">活动</li>\r\n              <li class="flo_le tag_section">活动通知标题</li>\r\n              <li class="flo_le tag_section">活动时间</li>\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">通知</li>\r\n\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n        </ul> -->\r\n      </div>\r\n    </li>\r\n  </ul>\r\n  <!-- 无权限*****结束 -->\r\n\r\n\r\n  <!-- 视频类内容管理******开始 -->\r\n  <ul class="mystudy_wrap">\r\n    <li class="mystudy_item">\r\n      <div class="item_le">\r\n        <img class="item_le_img " src="" alt="稍等片刻">\r\n        <div class="item_le_ab">无权限</div>\r\n      </div>\r\n\r\n      <div class="item_ri">\r\n\r\n        <h3>电力电子技术基础课程</h3>\r\n\r\n        <ul class="mystudy_info">\r\n          <li class="flo_le info_item">任课教师&nbsp;&nbsp;张三丰&nbsp;中医药大学</li>\r\n          <li class="flo_le info_item">邀请码&nbsp;&nbsp;0022336655</li>\r\n\r\n          <li class="flo_le info_item">截止时间&nbsp;&nbsp;2018.05.31</li>\r\n          <li class="flo_le info_item">\r\n            <i class="fa fa-user-o"></i>&nbsp;&nbsp;200 </li>\r\n        </ul>\r\n        <hr>\r\n        <ul class="mystudy_work">\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">待提交</li>\r\n              <li class="flo_le tag_section">第一章作业</li>\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">待提交</li>\r\n              <li class="flo_le tag_section">第一章作业</li>\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">活动</li>\r\n              <li class="flo_le tag_section">活动通知标题</li>\r\n              <li class="flo_le tag_section">活动时间</li>\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <li class="work_item">\r\n            <ul class="item_list">\r\n              <li class="flo_le tag_color">通知</li>\r\n\r\n              <li class="flo_le tag_time">00：00 00:00--00:00 00:00</li>\r\n              <li class="flo_ri">\r\n                <i class="fa fa-times"></i>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n  <!-- 视频类内容管理******开始 -->\r\n  <div class="mystudy_bottom">\r\n    <div class="flo_le ">共\r\n      <span class="color">100</span> 个课程</div>\r\n    <div class="flo_le ">分页器</div>\r\n  </div>\r\n</div>'
  );
})();
