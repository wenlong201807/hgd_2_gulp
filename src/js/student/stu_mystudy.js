require.config({
  paths: {
    jquery: '/lib/jquery',

    student: '/js/tmpl/student'
  }
});

require(['jquery', 'student'], function($, stu) {
  $(function() {
    // alert('我是学生端****我的学习页面的js');
    // 引入头部
    // $('.stu_header_cla_mystudy').html(stu('stu_header_tpl'));

    // 引入蓝红导航
    $('.stu_nav_b_r_cla_mystudy').html(
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
    // 引入stu_mystudy_tpl.html
    $('.stu_mystudy_tpl_cla_mystudy').html(stu('stu_mystudy/stu_mystudy_tpl'));
    // 引入脚部
    $('.stu_footer_cla_mystudy').html(stu('stu_footer_tpl'));
    // 调用stu_mystudy_tpl模块函数
    initMystudy();
  });
  //  stu_mystudy_tpl模块函数  功能实现
  function initMystudy() {
    // alert('stu_mystudy_tpl模块函数');
    $('.mystudy_nav li').on('click', function() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
      // console.log($(this).html());

      if ($(this).html() === '开课中') {
        $('.nav_ri').show();
      }
    });
  } // function initMystudy(){}
  // require(['jquery', 'student'], function($, stu) {})
});
