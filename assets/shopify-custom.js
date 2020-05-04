	//On Scroll Functionality - Desktop
	$(window).scroll( () => {
		var windowTop = $(window).scrollTop();
		windowTop > 70 ? $('.main_nav_wrapper').css({
      'position' : 'fixed',
      'margin-top' : '-40px'
    }) :
    $('.main_nav_wrapper').css({
      'position' : 'relative',
      'margin-top' : '0px'
    })
	});



