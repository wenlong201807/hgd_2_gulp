//  根目录为dev，以/替代比如查找dev/src/js/student/stu_b.js
// 则使用绝对路径为：/src/js/student/stu_b.js
require.config({
  shim: {
    carousel: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery',
    carousel: '/lib/carousel',
    student: '/js/tmpl/student'
  }
});

require(['jquery', 'carousel', 'student'], function($, carousel, stu) {
  $(function() {
    // alert('hhhhh');
    // 引入头部
    // $('.stu_header_cla_index').html(stu('stu_header_tpl'));

    // 引入蓝红导航
    $('.stu_nav_b_r_cla_index').html(
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

    // 引入轮播
    $('.stu_carousel_ind_cla_index').html(
      stu('stu_index/stu_carousel_ind_tpl', {
        carouselList: [
          {
            imgUrl: '/asset/img/carousel.png',
            title: '我是第1111111张图片',
            hrefUrl: '/view/student/stu_mystudy.html'
          },
          {
            imgUrl: '/asset/img/carousel.png',
            title: '我是第2222222张图片',
            hrefUrl: '/view/student/stu_hot_course_lists.html'
          },
          {
            imgUrl: '/asset/img/carousel.png',
            title: '我是第333333张图片',
            hrefUrl: '/view/student/stu_hot_course_details.html'
          },
          {
            imgUrl: '/asset/img/carousel.png',
            title: '我是第444444张图片',
            hrefUrl: '/view/student/stu_mystudy.html'
          }
        ]
      })
    );
    // 引入课程推荐
    // $('.stu_Recommended_cla_index').html(stu('stu_index/stu_Recommended_tpl'));
    // 引入热门教材
    // 有后台数据需要发送，封装成函数写在最底部位置
    // $('.stu_Popular_teaching_material_cla_index').html(
    //   stu('stu_index/stu_Popular_teaching_material_tpl', data)
    // );
    //* ************* 简化版的get请求写法---开始
    // $.getJSON('/api/stu_popular_teaching_material_details?size=10', function(
    //   data
    // ) {
    //   console.log(data);
    //   // 引入热门教材
    //   $('.stu_Popular_teaching_material_cla_index').html(
    //     stu('stu_index/stu_Popular_teaching_material_tpl', data)
    //   );
    // });
    //* ************* 简化版的get请求写法---介绍
    // 引入脚部
    $('.stu_footer_cla_index').html(stu('stu_footer_tpl'));
    initHeader();
    initCarousel();
    initPTM();
  });

  function initHeader() {
    $.ajax({
      url: '/api/header/info/stu',
      data: '',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        // $('.stu_header_cla_index').html(stu('stu_header_tpl', data));
        console.log(data.stu_info);
        console.log(data);
        console.log(data.stu_info[0]);
      }
    });
  }
  function initCarousel() {
    $('.carousel-content').carousel({
      carousel: '.carousel', // 轮播图容器
      indexContainer: '.img-index', // 下标容器

      timing: 2000, // 自动播放间隔
      animateTime: 1000, // 动画时间
      autoPlay: true, // 是否自动播放 true/false
      direction: 'left' // 滚动方向 right/left
    });
  }
  function initPTM(page, showData) {
    page = parseInt(page);
    page = page <= 0 || isNaN(page) ? 1 : page;
    showData = parseInt(showData);
    showData = showData <= 0 || isNaN(showData) ? 10 : showData;
    $.ajax({
      url: '/api/stu_popular_teaching_material_details',
      // data: { showData: showData, page: page },
      data: 'showData=' + showData + '&page=' + page,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        // 引入热门教材;
        $('.stu_Popular_teaching_material_cla_index').html(
          stu('stu_index/stu_Popular_teaching_material_tpl', data)
        );
      }
    });
  }
  // require(['jquery', 'student'], function($, stu) {})
});
