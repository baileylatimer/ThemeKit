// See https://customfields.zendesk.com/hc/en-us/articles/360000622771
jQuery(document).ready(function(){

  jQuery('ul.tabs li').click(function(){
  var tab_id = $(this).attr('data-tab');

  jQuery('ul.tabs li').removeClass('current');
  jQuery('.tab-content').removeClass('current');

  jQuery(this).addClass('current');
  jQuery("#"+tab_id).addClass('current');
  })

});