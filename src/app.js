require.config({
  paths: {
    template: './lib/arttemplate/template-web',
    index: './js/index',
    jquery: 'https://cdn.bootcss.com/jquery/1.12.4/jquery.min',
    teacher: './js/tmpl/teacher',
    tcourse: './js/tmpl/t-course'
  }
});

require(['index']);
