require.config({
  paths: {
    template: '../../lib/arttemplate/template-web',
    jquery: 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
    pagination: '../../lib/pagination.min',
    tabsholder: '../../lib/jquery.cardtabs'
  },
  shim: {
    pagination: { deps: ['jquery'] },
    kindeditor: { deps: ['jquery'] },
    kindEditorCN: { deps: ['jquery'] },
    tabsholder: { deps: ['jquery'] }
  }
});
require(['jquery', '../../js/tmpl/footer.js', '../../js/tmpl/redactor.js', 'pagination', 'tabsholder'], function($, foot, own) {
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
    $('.r-text').html(own('textarea'));
  });
  $(function() {
    $('.tr-content').html(own('picture'));
  });
  $(function() {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $('.treebox').html(own('tree', data));
      }
    });
  });
  // $(function() {
  //   $('.choice-data').html(own('choice-data'));
  //   $(function() {
  //     $.fn.selectDate = function() {
  //       var minYear = 1900;
  //       var maxYear = (new Date()).getFullYear();
  //       var yearSel = document.getElementById('year');
  //       var monthSel = document.getElementById('month');

  //       for (var y = maxYear; y >= minYear; y--) {
  //         var yearOpt = document.createElement('option');
  //         yearOpt.value = y;
  //         yearOpt.innerHTML = y + '年';
  //         yearSel.appendChild(yearOpt);
  //       }

  //       $('#year').click(function(event) {
  //         if (!$('#year option:selected').val()) return;
  //         removeOption(monthSel);
  //         addOption(12, '月', monthSel);
  //       });

  //       function addOption(num, unit, parent) {
  //         for (var index = 1; index <= num; index++) {
  //           var opt = document.createElement('option');
  //           $(opt).attr('value', index);
  //           if (index < 10) { index = '0' + index; }
  //           $(opt).html(index + unit);
  //           $(parent).append(opt);
  //         }
  //       }

  //       function removeOption(parent) {
  //         var options = $(parent).find('option');
  //         for (var index = 1; index < options.length; index++) {
  //           parent.removeChild(options[index]);
  //         }
  //       }
  //     };
  //     $('#date').selectDate();
  //   });
  // });
  $(function() {
    $('.search').html(own('search'));
    $('.s-btn').click(function() {
      var a = document.getElementById('s-content').value;
      var b = $('.form').serialize();
      console.log(a);
      console.log(b);
      $.ajax({
        url: `/api/redactor01?msg=${a}&${b}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
        }
      });
    });
  });
  $(function() {
    $('.top').html(own('popup'));
  });

  $.ajaxSetup({
    url: '/api/redactor01?currPage=1&pageSize=3',
    type: 'GET',
    dataType: 'json'
  });
  $.ajax({
    // url: '/api/redactor01?currPage=1&pageSize=11',
    success: function(data) {
      $('.r-c').html(own('table', data));
      $('#pagination').whjPaging({
        totalPage: 18,
        isShowTotalSize: false,
        isShowTotalPage: false,
        isShowRefresh: false,
        isShowSkip: false,
        isShowPageSizeOpt: false,
        callBack: function(currPage, pageSize) {
          $.ajax({
            url: `/api/redactor01?currPage=${currPage}&pageSize=11`,
            type: 'GET',
            dataType: 'json',
            complete: function(xmlHttpRequest) {
              var a = xmlHttpRequest.getResponseHeader('Access-Control-Allow-Headers');
              console.log(a);
              var b = xmlHttpRequest.getResponseHeader('Origin');
              console.log(b);
              var c = xmlHttpRequest.getResponseHeader('X-Requested-With');
              console.log(c);
              var d = xmlHttpRequest.getResponseHeader('Accept');
              console.log(d);
              var type = xmlHttpRequest.getResponseHeader('Content-type');
              console.log('Content-type响应头字段：', type);
            },
            success: function(data, xhr) {
              $('.r-c').html(own('table', data));
            }
          });
        }
      });
    }
  });
});
