require([
  'template',
  'jquery',
  'teacher',
  'tcourse'
], function(template, $, teacher, tcourse) {
  $.ajax({
    type: 'GET',
    url: '/api/list',
    success: function(data) {
      $(function() {
        $('.footer').html('Copyright &copy; 2004-2016 哈尔滨工业大学出版社 版权所有 京ICP备11017824号-7');
        $('#teachings').html(tcourse('t-course', {
          list: data.imagelist
        }));
      });
    }
  });

  $.ajax({
    type: 'GET',
    url: '/api/index',
    success: function(data) {
      $('#books').html(teacher('tindexclass', {
        arr: data.material
      }));
    }
  });
});
