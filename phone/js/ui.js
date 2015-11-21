$(document).on('ready', function(){
   $('.player').on('click', function(){
      $(this).addClass('logged');
      $(this).siblings().fadeOut();
      $(this).parent().parent().find('h1').fadeOut();
   });
})