jQuery(window).load( function () {

  setTimeout(function () {
    if ( window.self === window.top && window.innerWidth > 800 ) {
      devicebar();
      let url = new URL(window.location.href);
      let search_params = url.searchParams;
      search_params.set('tbdemo_iframe', '1');
      // change the search property of the main url
      url.search = search_params.toString();
      // the new url string
      url = url.toString();
      jQuery("body").append("<div class='tbdemo-device-layer' style='display: none'></div><iframe src='"+url+"' id='tbdemo-device-iframe'  style='display: none'></iframe>");
      jQuery('#tbdemo-device-iframe').load(function(){
        let iframe = jQuery('#tbdemo-device-iframe').contents();
        iframe.find('.menu-item a').click(function(event){
          top.window.location.href = jQuery(this).attr("href");
        });

      });
      jQuery(document).on("click", ".tbdemo-device-mobile", function() {
        if( jQuery(this).hasClass("tbdemo-device-active") ) {
          return
        }

        /* Hide main content scroll */
        jQuery(document).find("html").css("overflow-y", "hidden");
        jQuery(document).find(".tbdemo-device-layer, #tbdemo-device-iframe").show();

        /* Make device icon active */
        jQuery(document).find(".tbdemo-device-active").removeClass("tbdemo-device-active");
        jQuery(this).addClass("tbdemo-device-active");

        /* Animate mobile iframe to the center of window */
        let window_width = jQuery(window).width();
        jQuery(document).find('#tbdemo-device-iframe').animate({
          width:'360px',
          left: (window_width/2-180)+'px',
        }, 100);
      });

    }
  }, 3000);


  jQuery(document).on("click", ".tbdemo-device-laptop", function() {
    if( jQuery(this).hasClass("tbdemo-device-active") ) {
      return
    }

    jQuery(document).find(".tbdemo-device-active").removeClass("tbdemo-device-active");
    jQuery(this).addClass("tbdemo-device-active");
    jQuery(document).find('#tbdemo-device-iframe').animate({
      left: '0%',
      width:'100%'
    });
    setTimeout(function () {
      jQuery(document).find(".tbdemo-device-layer, #tbdemo-device-iframe").hide();
      jQuery(document).find("html").css("overflow-y", "auto");
    }, 100);

  });
})

jQuery(window).resize(function() {
  let window_width = jQuery(window).width();
  jQuery(document).find('#tbdemo-device-iframe').css({
    width:'360px',
    left: (window_width/2-180)+'px',
  });

  let left = document.body.offsetWidth/2-45;
  jQuery(document).find('.tbdemo-devicebar-border').css("left", left+"px");

});

function devicebar() {
  /* Need to count offsetWidth as device bar position is changing when we hide scroll from the main window */
 let left = document.body.offsetWidth/2-45;
 let devicebar = "<div class='tbdemo-devicebar-border' style='left: "+left+"px'><div class='tbdemo-devicebar'>";
  devicebar += "<i class='tbdemo-device-laptop tbdemo-device-active eicon-device-laptop'></i>";
  devicebar += "<i class='tbdemo-device-mobile eicon-device-mobile'></i>";
  devicebar += "</div></div>";
  jQuery("body").append(devicebar);

}
