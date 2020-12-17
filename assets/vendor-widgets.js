$(document).onload(function() {
  $('iframe').contents().find('button').addClass('color','red');
  $('#sms-opt-in').contents().find('button').css('opacity','.2');
  console.log('🎨  Added styles to Tone SMS iframe')
});