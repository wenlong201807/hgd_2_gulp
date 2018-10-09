require.config({
  paths: {
    jquery: '/lib/jquery',
    student: '/js/tmpl/student',
    stuPagination: '/lib/jquery.stu_pagination'
  },
  shim: {
    stuPagination: ['jquery']
  }
});
require(['jquery', 'stuPagination', 'student'], function(
  $,
  stuPagination,
  stu
) {
  $(function() {
    // alert('stu_hot_course_listls_js---入口文件  ');
    // 引入头部
    // $('.stu_header_cla_lists').html(stu('stu_header_tpl'));

    // 引入蓝红导航条
    $('.stu_nav_b_r_cla_lists').html(
      stu(
        'stu_nav_b_r_tpl',

        {
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
        }
      )
    );
    // 二级头部导航栏模板引入
    $('.stu_hot_course_lists_nav_cla_lists').html(
      stu('stu_nav_sec_tpl', {
        // 模板数据源文件内容以键值对--或者--数组--或者--混用两者--的方式书写在此
        // isText: false, // 如果为真时，则给li的类名加上类名为.isText的类???未生效！！！！
        stu_nav_sec_tpl_list: [
          '首页',
          '>',
          '课程',
          '>',
          '一级分类名称',
          '>',
          '二级分类名称'
        ]
      })
    );

    // 详情页中，顶部模块与底部模块（分为左右两小块）使用同一个模板引入
    $('.stu_hot_course_lists_main_cla_lists').html(
      stu('stu_hot_course_lists/stu_hot_course_lists_tpl', {
        msg: '列表手风琴，方便选择不同级别的内容',
        hot_course_lists: [
          {
            title: '前端基础',
            content1: 'html5',
            content2: 'js基础',
            content3: 'css2'
          },
          {
            title: '前端中级',
            content1: 'dom',
            content2: 'js高级',
            content3: 'css3'
          },
          {
            title: '前端核心',
            content1: '结构用模板',
            content2: '样式用scss',
            content3: '交互用requirejs'
          },
          {
            title: '前端终极',
            content1: 'angular',
            content2: 'react',
            content3: 'vue'
          }
        ]
      })
    );
    // 引入脚部
    $('.stu_footer_cla_lists').html(stu('stu_footer_tpl'));

    // 学生列表页中的分页js部分--函数 调用
    initStuHclPagingBox();
    // 详情页中
    initHotCourseLists();
    // 详情页中左侧菜单与右侧列表联动变化***函数调用
    initPTM();
  }); // $(function(){})

  // 学生列表页中的分页js部分--函数参数设置
  function initStuHclPagingBox() {
    // alert('学生列表页中的分页js部分--函数参数设置');
    $('.stu_hcl_ri_b_paging_box').pagination({
      pageCount: 98, // 总页数
      showData: '20', // 每页显示的条数
      //   // totalData   //数据总条数
      //   // current   //当前第几页****用于给后台传参数使用
      jump: true, //
      coping: true, // 是否开启首页和末页，值为boolean
      prevCls: 'prev', // 上一页class
      nextCls: 'next', // 下一页class
      mode: 'fixed', //
      count: 10, // mode为unfixed时显示当前选中页前后页数，mode为fixed显示页码总数
      // coping: 'true', // 是否开启首页和末页，值为boolean
      keepShowPN: 'true', // 是否一直显示上一页下一页
      // jumpIptCls: 'jump-ipt',
      // jumpBtnCls: 'jump-btn', // 跳转按钮class

      jumpBtn: '起跳', //
      homePage: '首页', // 首页节点内容，默认为空
      endPage: '末页', // 尾页节点内容，默认为空
      prevContent: '上页', // 上一页节点内容
      nextContent: '下页', // 下一页节点内容
      callback: function(api) {
        // 当前页数传递给页面
        // $('#getCurrent').html(api.getCurrent())
        // 总页数传递给页面
        // $('#getPageCount').html(api.getPageCount())
        // *****************
        var data = {
          page: api.getCurrent()
          // name: 'mss',
          // say: 'oh'
        };
        // 点击一次页码数据，请求对应页面的20条数据
        $.getJSON('/api/stu_popular_teaching_material_details', data, function(
          json
        ) {
          console.log(json);
          // console.log(json);
          // 将后台数据渲染到页面中***注意格式****
          // $('.data1').html(json.hot_material_data.page);
          // $('.data2').html(json.hot_material_data.total);
          // $('.data3').html(json.hot_material_data.msg);
          // $('.data4').html(json.hot_material_data.material_details[0].course_teacher
          // );
        });
      } // callback: function(api){}
    }); // $('.stu_hcl_ri_b_paging_box').pagination({})
  }
  // 详情页中的功能函数模块
  function initHotCourseLists() {
    // alert('详情页中的功能函数模块');
    // 实现手风琴效果，少了动画效果
    $('.title_nav').on('click', function() {
      $(this)
        .children('h3')
        .children('.title_nav_hid')
        .html('-');
      $(this)
        .children('ul')
        .show();
      $(this)
        .siblings('li')
        .children('ul')
        .hide();
      $(this)
        .siblings('li')
        .children('h3')
        .children('.title_nav_hid')
        .html('+');
      // console.log(
      //   $(this)
      //     .children('h3')
      //     .children('.title_nav_hid')
      //     .html()
      // );
    });
    // 实现点击添加类名效果
    // $('.title_nav').on('click', function() {
    //   $(this)
    //     .children('ul')
    //     .children('li')
    //     .addClass('active')
    //     .siblings()
    //     .removeClass('active');
    //   console.log(
    //     $(this)
    //       .children('ul')
    //       .children('li')
    //       .html()
    //   );
    // });

    // 给content_hi添加点击事件。获取文本值，并将值传递到二级导航栏最后一个位置上
    $('.content_hid').on('click', function(e) {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
      // console.log(e.target);
      // $(e.target)
      //   .toggleClass('active')
      //   .siblings()
      //   .removeClass('active');
      // console.log($(e.target).siblings());
    });
  } // function  initHotCourseLists(){
  // require(['jquery', 'student'], function($, stu) {})

  function initPTM(page, showData, categoryid) {
    page = parseInt(page);
    page = page <= 0 || isNaN(page) ? 1 : page;
    showData = parseInt(showData);
    showData = showData <= 0 || isNaN(showData) ? 10 : showData;
    $.ajax({
      url: '/api/stu_popular_teaching_material_details',
      // data: { showData: showData, page: page },
      data:
        'showData=' + showData + '&page=' + page + '&categoryid=' + categoryid,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        // 引入热门教材;
        $('.course-list').html(
          stu('stu_index/stu_Popular_teaching_material_tpl', data)
        );
      }
    });
  }
});
