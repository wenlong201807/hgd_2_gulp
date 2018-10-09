require.config({
  paths: {
    jquery: '/lib/jquery',
    student: '/js/tmpl/student'
  }
});
require(['jquery', 'student'], function($, stu) {
  $(function() {
    // alert('stu_hot_course_details_js---入口文件  ');
    // 引入头部
    // $('.stu_header_cla_details').html(stu('stu_header_tpl'));

    // 引入蓝红导航条
    $('.stu_nav_b_r_cla_details').html(
      stu('stu_nav_b_r_tpl', {
        msg:
          '我是导航条蓝红色部分的，为了成为各页面通用的模板，需要传入一些参数作为变动内容',
        list_b: [
          {
            content: '首页',
            hrefUrl: '/view/student/stu_index.html',
            isSep: false
          },
          {
            content: '课程',
            hrefUrl: '/view/student/stu_hot_course_lists.html',
            isSep: false
          },
          {
            content: '教材',
            hrefUrl: '/view/student/stu_hot_course_details.html',
            isSep: false
          },
          {
            content: '|',
            isSep: true
          },
          {
            content: '我的学习',
            hrefUrl: '/view/student/stu_mystudy.html',
            isSep: false
          }
        ],
        list_r: [
          {
            content: '通过序列号获取资源权限',
            hrefUrl: '',
            isSep: false
          },
          {
            content: '|',
            isSep: true
          },
          {
            content: '通过序列号获取资源权限',
            hrefUrl: '',
            isSep: false
          }
        ]
      })
    );
    // 二级头部导航栏模板引入
    $('.stu_hot_course_details_nav_cla_details').html(
      stu('stu_nav_sec_tpl', {
        // 模板数据源文件内容以键值对--或者--数组--或者--混用两者--的方式书写在此
        isText: true, // 如果为真时，则给li的类名加上类名为.isText的类???未生效！！！！
        stu_nav_sec_tpl_list: [
          '首页',
          '>',
          '课程',
          '>',
          '一级分类名称',
          '>',
          '二级分类名称',
          '>',
          '课程名称'
        ]
      })
    );

    // 引入详情页
    $('.stu_hot_course_details_top_cla_details').html(
      stu('stu_hot_course_details/stu_hot_course_details_top_tpl', {
        courseTitle: '课程名字测试'
      })
    );
    // 引入脚部
    $('.stu_footer_cla_details').html(stu('stu_footer_tpl'));
    ininHCD();
  });
  function ininHCD() {
    // alert('我是一个模板一次接收两个请求的功能块');
    //* *************** */
    // 异步请求两个ajax后台数据，使用计数方式或者布尔值判断
    // 第一个后台数据
    // let count = 0;
    // let data3 = {};
    // $.ajax({
    //   url: ' /api/stu_popular_teaching_material_details',
    //   data: 'size:10',
    //   dataType: 'json',
    //   type: 'GET',
    //   async: false,
    //   success: function(data1) {
    //     data3.data1 = data1;
    //     if (count >= 1) {
    //       // 引入热门教材;
    //       $('.stu_Popular_teaching_material_cla_index').html(
    //         stu('stu_index/stu_Popular_teaching_material_tpl', data3)
    //       );
    //     } else {
    //       count = 1;
    //     }
    //   }
    // });
    //* ******************************** */
    // 第二个后台数据
    // $.ajax({
    //   url: ' /api/stu_popular_teaching_material_details',
    //   data: 'size:10',
    //   dataType: 'json',
    //   type: 'GET',
    //   success: function(data2) {
    //     data3.data2 = data2;
    //     if (count >= 1) {
    //       // 引入热门教材;
    //       $('.stu_Popular_teaching_material_cla_index').html(
    //         stu('stu_index/stu_Popular_teaching_material_tpl', data3)
    //       );
    //     } else {
    //       count = 1;
    //     }
    //   }
    // });
    //* **************************** */
  }
  // require(['jquery', 'student'], function($, stu){})
});
