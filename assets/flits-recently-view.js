
if (!window.flitsApp || typeof window.flitsApp == "undefined") {
  window.flitsApp = {};
}
window.flitsApp.recently_viewed_products = function () {
  var cname = 'flits_recently_products';
  var div_id = 'flits-recently-products-ul';
  var empty_div_id = 'flits-recently-view-empty';
  var queue = [];
  var limit = 8;
  var days = 15;
  var that = this;

  this.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  this.getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  this.get_ajax_obj = function () {
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  };
  this.setProductData = function () {
    var moneyFormat = flitsAppJquery("#flits-shop-money-format").val();
    var $_ = flitsAppJquery;
    $_("[data-flits-recently-product-handle]").each(function(index,item){
      var recently_product_selector = $_(this);
      var handle = $_(this).attr('data-flits-recently-product-handle');
      $_.ajax({
        method:'get',
        url:'/products/'+handle+".json",
        success:function(data){
          var product = data.product;
          var image = 'https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif';
          if(product.image != null){
            image = product.image.src;
          }
          var extidx = image.lastIndexOf('.');
          var extension = image.substr(extidx);
          image = image.replace(extension,'_200x_crop_center' + extension);

          $_(recently_product_selector).find(".flits-product-img").css({
            'background':'url('+image+')',
            'background-size': 'contain',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-image': image
          });

          var display_variant_price = 0;
          $_.each(product.variants,function(variant_index,variant){
            var variant_price = window.flitsApp.formatMoney(Math.abs(variant.price * 100), moneyFormat).replace(/((\,00)|(\.00))$/g, '');
            var variant_title = variant.title;

            if(product.variants.length == 1 && variant_title == 'Default Title'){
              variant_title = product.title;
            }
            var option = $('<option/>');
            option.html(variant_title);
            option.attr('value',variant.id);
            option.attr('data-variant-price',variant_price);

            $_.ajax({
              method:'get',
              url:location.origin + '/products/' + product.handle + '?view=flits_product_variant_data&variant=' + variant.id,
              success:function(data){
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(data, "text/html");
                var res = JSON.parse(htmlDoc.querySelector('.flits-product-variant-data').innerHTML);

                if (res.inventory_management == "shopify" && res.inventory_policy == "deny" && res.inventory_quantity <= 0){
                  var flits_add_cart_btn = $_(recently_product_selector).find('.flits-add-to-cart');
                  var sold_out_text = flits_add_cart_btn.attr('data-flits-sold-out-text');
                  option.html(option.html() + " - " + sold_out_text);
                  var selected_variant_text = $_(recently_product_selector).find('.flits-product-variant-options option:selected').html();
                  if(selected_variant_text.indexOf(sold_out_text) != -1){                  
                    flits_add_cart_btn.addClass('flits-btn-danger')
                    .attr('disabled',true)
                    .html(sold_out_text);
                  }
                }
              },
              error:function(){

              }
            });
            if(display_variant_price <= 0){
              display_variant_price = variant_price;
            }
            $_(recently_product_selector).find('.flits-product-variant-options').append(option);
          });
          $_(recently_product_selector).find('.flits-product-variant-title').append(product.title);
          $_(recently_product_selector).find('.flits-product-variant-price').append(display_variant_price);
          $_(recently_product_selector).attr('title',product.title);
        },
        error:function(){
          $_(recently_product_selector).remove();
        }
      });
    });
  };
  this.update_div = function () {
    if(location.pathname == "/account"){
      window.flitsApp.set_recently_view_add_change_event();
      window.flitsApp.set_recently_view_add_click_event();
    }
    
    var div = document.getElementById(div_id);
    if (div == null) {
      return false;
    }
    var display_products = this.get_all_display_product();

    if(display_products.length > 0){
      flitsAppJquery('.flits-recently-view-empty').hide();
      flitsAppJquery('#'+ div_id).show();

      display_products.forEach(function (item, index) {
        var li = flitsAppJquery(".flits-recently-products-li-structure").clone();
        li.removeClass("flits-recently-products-li-structure");
        li.addClass("flits-recently-product-row");
        li.find('.flits-product-title-anchor').attr('href','/products/' + item);
        li.attr('data-flits-recently-product-handle',item);
        flitsAppJquery('#'+ div_id).append(li);
      });
      that.setProductData();
    }else{
      flitsAppJquery('.flits-recently-view-empty').show();
      flitsAppJquery('#'+ div_id).hide();
    }
  };
  this.change_position_of_elments = function () {
    var div = document.getElementById(div_id);
    for (var i = 0; i < div.children.length; i++) {
      div.children[i].setAttribute('data-position', i);
    }
    for (var i = 0; i < div.children.length; i++) {
      if (i > limit) {
        div.children[i].remove();
      }
    }
  };
  this.update_products = function () {
    var recent = this.getCookie(cname);
    queue = (recent.trim() === "") ? [] : JSON.parse(recent);
  };
  this.isFull = function () {
    return (limit == queue.length);
  };
  this.is_present = function (item) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i] == item) {
        return i;
      }
    }
    return -1;
  };
  this.remove_product = function (index) {
    if (queue.length == 1) {
      queue = [];
    } else {
      queue.splice(index, 1);
    }
    //            this.save_products();
  };
  this.remove_first_product = function () {
    if (queue.length == 0)
      return undefined;
    var item = queue[0];
    queue.splice(0, 1);
    return item;
  };
  this.save_products = function () {
    this.setCookie(cname, JSON.stringify(queue), days);
    this.update_div();
  };
  this.add_product = function (item) {
    this.update_products();
    var index = this.is_present(item);
    if (index !== -1) {
      this.remove_product(index);
    }
    if (this.isFull()) {
      this.remove_first_product();
    }
    queue.push(item);
    this.save_products();
  };
  this.get_all_product = function () {
    this.update_products();
    return queue;
  };
  this.get_all_display_product = function () {
    this.update_products();
    var queue_ = queue.slice();
    return queue_.reverse();
  };
  this.update_products();
  this.update_div();
};

window.flitsApp.set_recently_view_add_change_event = function(){ 
  // For change event of select box
  flitsAppJquery(document).on('change','.flits-recently-product-row .flits-product-variant-options',function(ev){
    var variant_price = this.options[this.selectedIndex].getAttribute('data-variant-price');
    var flits_product_variant_price_div = this.closest(".flits-row").parentNode.querySelector('.flits-product-variant-price');
    flits_product_variant_price_div.innerHTML = variant_price;

    var flits_add_cart_btn_text = '';
    var flits_add_cart_btn = this.closest(".flits-row").parentNode.querySelector('.flits-add-to-cart');
    var selected_product_variant_text = this.options[this.selectedIndex].innerHTML;
    
    var flits_sold_out_text = flits_add_cart_btn.getAttribute('data-flits-sold-out-text');
    
    if(selected_product_variant_text.indexOf(flits_sold_out_text) != -1){
      flits_add_cart_btn_text = flits_add_cart_btn.getAttribute('data-flits-sold-out-text');
      flits_add_cart_btn.disabled = true;
      flits_add_cart_btn.classList.add("flits-btn-danger");
    }
    else{
      flits_add_cart_btn_text = flits_add_cart_btn.getAttribute('data-flits-add-to-cart-text');
      flits_add_cart_btn.disabled = false;
      flits_add_cart_btn.classList.remove("flits-btn-danger");
    }
    flits_add_cart_btn.innerHTML = flits_add_cart_btn_text;
  });
};

window.flitsApp.set_recently_view_add_click_event = function(){ 
  // For click event of quantity adjuster
  flitsAppJquery(document).on('click','.flits-recently-product-row .flits-product-quantity-adjuster',function(ev){
    var el = this;
    var flits_quantity_selector = el.parentNode.querySelector('.flits-product-quantity-num');
    var qty = parseInt(flits_quantity_selector.value);

    qty = flits_validate_quantity(qty);
    qtyMin = 1;

    // Add or subtract from the current quantity
    if (el.classList.contains('flits-product-quantity-add')) {
      qty = qty + 1;
    } else {
      qty = qty <= qtyMin ? qtyMin : qty - 1;
    }

    // Update the input's number
    flits_quantity_selector.value = qty;
  });

  flits_validate_quantity = function (qty) {
    if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
      // We have a valid number!
      return qty;
    } else {
      // Not a number. Default to 1.
      return 1;
    }
  };
};

window.flitsApp.recently_view_products_interval = setInterval(function(){  // add it to if(account page)
  if (typeof flitsAppJquery == "undefined"){

  }
  else{
    clearInterval(window.flitsApp.recently_view_products_interval);
    window.flitsApp.recently_viewed_products();
  }
}, 1000);
