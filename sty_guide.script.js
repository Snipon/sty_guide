$(function(){
  $("#navbar a").click(function(event){
      event.preventDefault();
      var full_url = this.href;
      console.log(full_url);
      var parts = full_url.split("#");
      var trgt = parts[1];
      var target_offset = $("#"+trgt).offset();
      var target_top = target_offset.top;
      $('html, body').animate({scrollTop:target_top}, 500, 'swing');
  });

  $('#navbar').scrollspy();

  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh')
  });
  console.log('woot');
});