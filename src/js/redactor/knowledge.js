require.config({
  paths: {
    template: '../../lib/arttemplate/template-web',
    jquery: 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min'
  }
});
require(['jquery', '../../js/tmpl/footer.js', '../../js/tmpl/redactor.js'], function($, foot, own) {
  $(function() {
    $('.footer').html(foot('footer', { value: 'Copyright &copy; 2004-2016 哈尔滨工业大学出版社 版权所有 京ICP备11017824号-7' }));
  });
  $(function() {
    $('.stu_header_cla').html(own('head'));
  });
  $(function() {
    $('.r-nav').html(own('nav'));
  });
  $(function() {
    $('.top').html(own('knowledge'));
  });
});
require(['jquery', '../../js/tmpl/redactor.js'], function($, b) {
  $.ajax({
    url: '/api/redactor02',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      $(function() {
        $('.r-c').html(b('table', data));
      });
    }
  });
});
