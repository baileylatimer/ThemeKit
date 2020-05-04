
if (!window.flitsApp || typeof window.flitsApp == "undefined") {
  window.flitsApp = {};
}

/* flits tingle modal plugin start */ 
!function(t,o){"function"==typeof define&&define.amd?define(o):"object"==typeof exports?module.exports=o():t.flits_tingle=o()}(this,function(){function t(t){var o={onClose:null,onOpen:null,beforeOpen:null,beforeClose:null,stickyFooter:!1,footer:!1,cssClass:[],closeLabel:"Close",closeMethods:["overlay","button","escape"]};this.opts=r({},o,t),this.init()}function o(){this.modalBoxFooter&&(this.modalBoxFooter.style.width=this.modalBox.clientWidth+"px",this.modalBoxFooter.style.left=this.modalBox.offsetLeft+"px")}function e(){this.modal=document.createElement("div"),this.modal.classList.add("flits-tingle-modal"),(0===this.opts.closeMethods.length||-1===this.opts.closeMethods.indexOf("overlay"))&&this.modal.classList.add("flits-tingle-modal--noOverlayClose"),this.modal.style.display="none",this.opts.cssClass.forEach(function(t){"string"==typeof t&&this.modal.classList.add(t)},this),-1!==this.opts.closeMethods.indexOf("button")&&(this.modalCloseBtn=document.createElement("button"),this.modalCloseBtn.classList.add("flits-tingle-modal__close"),this.modalCloseBtnIcon=document.createElement("span"),this.modalCloseBtnIcon.classList.add("flits-tingle-modal__closeIcon"),this.modalCloseBtnIcon.innerHTML="×",this.modalCloseBtnLabel=document.createElement("span"),this.modalCloseBtnLabel.classList.add("flits-tingle-modal__closeLabel"),this.modalCloseBtnLabel.innerHTML=this.opts.closeLabel,this.modalCloseBtn.appendChild(this.modalCloseBtnIcon),this.modalCloseBtn.appendChild(this.modalCloseBtnLabel)),this.modalBox=document.createElement("div"),this.modalBox.classList.add("flits-tingle-modal-box"),-1!==this.opts.closeMethods.indexOf("button")&&this.modalBox.appendChild(this.modalCloseBtn),this.modalBoxContent=document.createElement("div"),this.modalBoxContent.classList.add("flits-tingle-modal-box__content"),this.modalBox.appendChild(this.modalBoxContent),this.modal.appendChild(this.modalBox)}function s(){this.modalBoxFooter=document.createElement("div"),this.modalBoxFooter.classList.add("flits-tingle-modal-box__footer"),this.modalBox.appendChild(this.modalBoxFooter)}function i(){this._events={clickCloseBtn:this.close.bind(this),clickOverlay:l.bind(this),resize:this.checkOverflow.bind(this),keyboardNav:n.bind(this)},-1!==this.opts.closeMethods.indexOf("button")&&this.modalCloseBtn.addEventListener("click",this._events.clickCloseBtn),this.modal.addEventListener("mousedown",this._events.clickOverlay),window.addEventListener("resize",this._events.resize),document.addEventListener("keydown",this._events.keyboardNav)}function n(t){-1!==this.opts.closeMethods.indexOf("escape")&&27===t.which&&this.isOpen()&&this.close()}function l(t){-1!==this.opts.closeMethods.indexOf("overlay")&&!d(t.target,"tingle-modal")&&t.clientX<this.modal.clientWidth&&this.close()}function d(t,o){for(;(t=t.parentElement)&&!t.classList.contains(o););return t}function a(){-1!==this.opts.closeMethods.indexOf("button")&&this.modalCloseBtn.removeEventListener("click",this._events.clickCloseBtn),this.modal.removeEventListener("mousedown",this._events.clickOverlay),window.removeEventListener("resize",this._events.resize),document.removeEventListener("keydown",this._events.keyboardNav)}function r(){for(var t=1;t<arguments.length;t++)for(var o in arguments[t])arguments[t].hasOwnProperty(o)&&(arguments[0][o]=arguments[t][o]);return arguments[0]}var h=function(){var t,o=document.createElement("flits-tingle-test-transition"),e={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in e)if(void 0!==o.style[t])return e[t]}();return t.prototype.init=function(){this.modal||(e.call(this),i.call(this),document.body.insertBefore(this.modal,document.body.firstChild),this.opts.footer&&this.addFooter())},t.prototype.destroy=function(){null!==this.modal&&(a.call(this),this.modal.parentNode.removeChild(this.modal),this.modal=null)},t.prototype.open=function(){var t=this;"function"==typeof t.opts.beforeOpen&&t.opts.beforeOpen(),this.modal.style.removeProperty?this.modal.style.removeProperty("display"):this.modal.style.removeAttribute("display"),document.body.classList.add("flits-tingle-enabled"),this.setStickyFooter(this.opts.stickyFooter),this.modal.classList.add("flits-tingle-modal--visible"),h?this.modal.addEventListener(h,function o(){"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),t.modal.removeEventListener(h,o,!1)},!1):"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),this.checkOverflow()},t.prototype.isOpen=function(){return!!this.modal.classList.contains("flits-tingle-modal--visible")},t.prototype.close=function(){if("function"!=typeof this.opts.beforeClose||this.opts.beforeClose.call(this)){document.body.classList.remove("flits-tingle-enabled"),this.modal.classList.remove("flits-tingle-modal--visible");var t=this;h?this.modal.addEventListener(h,function o(){t.modal.removeEventListener(h,o,!1),t.modal.style.display="none","function"==typeof t.opts.onClose&&t.opts.onClose.call(this)},!1):(t.modal.style.display="none","function"==typeof t.opts.onClose&&t.opts.onClose.call(this))}},t.prototype.setContent=function(t){"string"==typeof t?this.modalBoxContent.innerHTML=t:(this.modalBoxContent.innerHTML="",this.modalBoxContent.appendChild(t))},t.prototype.getContent=function(){return this.modalBoxContent},t.prototype.addFooter=function(){s.call(this)},t.prototype.setFooterContent=function(t){this.modalBoxFooter.innerHTML=t},t.prototype.getFooterContent=function(){return this.modalBoxFooter},t.prototype.setStickyFooter=function(t){this.isOverflow()||(t=!1),t?this.modalBox.contains(this.modalBoxFooter)&&(this.modalBox.removeChild(this.modalBoxFooter),this.modal.appendChild(this.modalBoxFooter),this.modalBoxFooter.classList.add("flits-tingle-modal-box__footer--sticky"),o.call(this),this.modalBoxContent.style["padding-bottom"]=this.modalBoxFooter.clientHeight+20+"px"):this.modalBoxFooter&&(this.modalBox.contains(this.modalBoxFooter)||(this.modal.removeChild(this.modalBoxFooter),this.modalBox.appendChild(this.modalBoxFooter),this.modalBoxFooter.style.width="auto",this.modalBoxFooter.style.left="",this.modalBoxContent.style["padding-bottom"]="",this.modalBoxFooter.classList.remove("flits-tingle-modal-box__footer--sticky")))},t.prototype.addFooterBtn=function(t,o,e){var s=document.createElement("button");return s.innerHTML=t,s.addEventListener("click",e),"string"==typeof o&&o.length&&o.split(" ").forEach(function(t){s.classList.add(t)}),this.modalBoxFooter.appendChild(s),s},t.prototype.resize=function(){console.warn("Resize is deprecated and will be removed in version 1.0")},t.prototype.isOverflow=function(){var t=window.innerHeight;return this.modalBox.clientHeight>=t},t.prototype.checkOverflow=function(){this.modal.classList.contains("flits-tingle-modal--visible")&&(this.isOverflow()?this.modal.classList.add("flits-tingle-modal--overflow"):this.modal.classList.remove("flits-tingle-modal--overflow"),!this.isOverflow()&&this.opts.stickyFooter?this.setStickyFooter(!1):this.isOverflow()&&this.opts.stickyFooter&&(o.call(this),this.setStickyFooter(!0)))},{modal:t}});
/* flits tingle modal plugin end */

window.flitsApp.wishlist_products = function () {
  var cemail = 'flits_customer_email';
  var chandle = 'flits_products_handle';
  var add_to_wsl_btn_class = 'flits-add-to-wsl-btn';
  var remove_from_wsl_btn_class = 'flits-remove-from-wsl-btn';
  var add_wsl_url = '/add_to_wishlist';
  var remove_wsl_url = '/remove_from_wishlist';
  var clicked_add_button = "";
  var clicked_remove_button = "";
  var that = this;

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

  this.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  var modal = new flits_tingle.modal({
    footer: false,
    stickyFooter: false,
    getContent: true,
    closeMethods: ['button'],
    closeLabel: "Close",
    beforeClose: function () {
      return true;
      return false;
    }
  });

  var modal_content = document.getElementById("flits-wsl-guest-modal").innerHTML;
  modal.setContent(modal_content);
  document.getElementById('flits-wsl-guest-modal').remove();
  document.getElementById("flits-guest-wsl-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var flits_customer_email = document.getElementById("flits_email_id").value;
    if (typeof flits_customer_email == 'undefined' || flits_customer_email == null || flits_customer_email == '') {
      return false;
    }
    that.setCookie(cemail, flits_customer_email, 15);
    document.getElementById("flits-guest-wsl-form").style.display = 'none';
    var email_text = document.getElementById("flits-guest-email").innerHTML;
    document.getElementById("flits-guest-email").innerHTML = email_text.replace("##customer_email##", '<strong>' + flits_customer_email + '</strong>');
    document.getElementById("flits-wsl-msg-modal").style.display = 'block';
    clicked_add_button.click();
  });

  this.get_ajax_obj = function () {
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  };

  this.wsl_pagination = function (e) {
    this.reset_pagination();
    var prev = document.querySelectorAll('.flits-wsl-pagination-prev');
    var next = document.querySelectorAll('.flits-wsl-pagination-next');
    var that = this;
    this.setPaginationClickEvent();
    prev.forEach(function (item, index) {
      if (typeof item.addEventListener != "function") {
        return;
      }
      item.addEventListener('click', function (e) {
        var page_number = document.getElementById("flits-wishlist-current-page").value;
        if (page_number <= 1) {
          return false;
        }
        page_number = parseInt(page_number) - 1;
        that.change_page(page_number);
      });
    });

    next.forEach(function (item, index) {
      if (typeof item.addEventListener != "function") {
        return;
      }
      item.addEventListener('click', function (e) {
        var page_number = document.getElementById("flits-wishlist-current-page").value;
        if (page_number >= document.getElementById("flits-wishlist-total-page").value) {
          return false;
        }
        page_number = parseInt(page_number) + 1;
        that.change_page(page_number);
      });

    });

    var p = this.getUrlParamVal('p');
    this.change_page(p);
  };

  this.change_variant_price = function (e) {
    var variant_option = document.querySelectorAll('.product-variant-options');
    var that = this;
    variant_option.forEach(function (item, index) {
      if (typeof item.addEventListener != "function") {
        return;
      }
      item.addEventListener('change', function (e) {
        var variant_price = this.options[this.selectedIndex].getAttribute('data-flits-variant-price');
        this.closest(".flits-row").parentNode.querySelector('.flits-variant-price').innerHTML = variant_price;
      });
    });
  };

  this.setPaginationClickEvent = function () {
    var wsl_page = document.querySelectorAll('.flits-wsl-pagination-page');
    wsl_page.forEach(function (item, index) {
      if (typeof item.addEventListener != "function") {
        return;
      }
      item.addEventListener('click', function (e) {
        e.stopPropagation();
        var page_number = this.getAttribute('data-page');
        that.change_page(page_number);
      });
    });
  };

  this.getUrlParamVal = function (str) {
    var v = window.location.search.match(new RegExp('(?:[\?\&]' + str + '=)([^&]+)'));
    return v ? v[1] : null;
  };

  this.reset_pagination = function () {
    var total_data = parseInt(document.getElementById('flits-wishlist-size').value);
    var limit = parseInt(document.getElementById('flits-wishlist-limit').value);
    var total_pages = parseInt(document.getElementById("flits-wishlist-total-page").value);
    var current_page = parseInt(document.getElementById('flits-wishlist-current-page').value);
    var org_total_data = document.querySelectorAll(".flits-wsl-product-row");
    org_total_data.forEach(function (item, index) {
      var current_page = (parseInt(index / limit)) + 1;
      item.setAttribute('data-page', current_page);
    });
    total_pages = Math.ceil(org_total_data.length / limit);
    document.querySelectorAll('.flits-wsl-pagination-page').forEach(function (node, index) {
      node.parentNode.removeChild(node);
    });
    var next_btn = document.querySelector('.flits-wsl-pagination-next');
    var next_btn_parent = next_btn.parentNode;
    for (var i = 1; i <= total_pages; i++) {
      var a = document.createElement('a');
      a.href = "javascript:void(0)";
      a.classList.add('flits-wsl-pagination-page');
      a.setAttribute('data-page', i);
      a.innerHTML = i;
      if (i == current_page) {
        a.classList.add('active');
      }
      next_btn_parent.insertBefore(a, next_btn);
    }
    this.setPaginationClickEvent();
    if (total_pages < current_page) {
      current_page = total_pages;
    }
    document.getElementById("flits-wishlist-total-page").value = total_pages;
    document.getElementById("flits-wishlist-current-page").value = current_page;
    this.change_page(current_page);
    if (total_pages <= 1) {
      document.getElementById('flits-page-wishlist').querySelector('.flits-pagination-div').style.display = "none";
    } else {
      document.getElementById('flits-page-wishlist').querySelector('.flits-pagination-div').style.display = "block";
    }
  };

  this.change_page = function (page_number) {
    document.querySelectorAll(".flits-wsl-product-row").forEach(function (item) {
      item.style.display = 'none';
    });
    var show = document.querySelectorAll(".flits-wsl-product-row[data-page='" + page_number + "']");
    show.forEach(function (item) {
      item.style.display = 'inline-block';
    });
    document.getElementById('flits-wishlist-current-page').value = page_number;
    if (document.querySelector('.flits-wsl-pagination-page.active')) {
      document.querySelector('.flits-wsl-pagination-page.active').classList.remove('active');
    }
    if (document.querySelector('.flits-wsl-pagination-page[data-page="' + page_number + '"]')) {
      document.querySelector('.flits-wsl-pagination-page[data-page="' + page_number + '"]').classList.add("active");
    }
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?p=' + page_number + location.hash;
    window.history.pushState({path: newurl}, '', newurl);
  };

  this.add_product = function () {
    var that = this;
    var a = document.querySelectorAll('.' + add_to_wsl_btn_class);
    a.forEach(function (item, index) {
      if (typeof item.addEventListener != "function") {
        return;
      }
      item.addEventListener('click', function (e) {
        var addwsl = this;
        clicked_add_button = addwsl;
        var customer_id = addwsl.getAttribute("data-flits-customer-id");
        var customer_email = addwsl.getAttribute("data-flits-customer-email");
        var product_id = addwsl.getAttribute("data-flits-product-id");
        var product_handle = addwsl.getAttribute("data-flits-product-handle");
        var product_title = addwsl.getAttribute("data-flits-product-title");
        var product_image = addwsl.getAttribute("data-flits-product-image");
        var page = addwsl.getAttribute("data-page");
        var token = document.getElementById("flits-wsl-token").value;
        var url = document.getElementById("flits-wsl-url").value + add_wsl_url;
        if (that.isNull(customer_email))
        {
          var customer_email_cookie = that.getCookie(cemail);
          if (that.isNull(customer_email_cookie)) {
            modal.open();
            return false;
          } else {
            customer_email = customer_email_cookie;
          }
        }
        clicked_add_button.disabled = true;
        var wsl_btn = addwsl.parentNode;
        var count = 0;
        var wsl_product_count = 0;
        switch (page) {
          case "product-page":
          case "collection-page":
            wsl_btn.getElementsByClassName("flits-add-to-wsl-btn")[0].style.display = "none";
            wsl_btn.getElementsByClassName("flits-remove-from-wsl-btn")[0].style.display = "inline-block";
            if (wsl_btn.parentNode.getElementsByClassName('flits-wsl-product-count')[0]) {
              count = parseInt(wsl_btn.parentNode.getElementsByClassName('flits-wsl-product-count')[0].innerHTML);
              wsl_product_count = parseInt(count) + 1;
              wsl_btn.parentNode.getElementsByClassName("flits-wsl-product-count")[0].innerHTML = wsl_product_count;
            }
            break;
        }
        var ajax = that.get_ajax_obj();
        ajax.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              clicked_add_button.disabled = false;
              var res = JSON.parse(this.responseText);
              that.setCookie(chandle, res.products_handle, 15);
              switch (page) {
                case "product-page":
                case "collection-page":
                  wsl_btn.getElementsByClassName("flits-add-to-wsl-btn")[0].style.display = "none";
                  wsl_btn.getElementsByClassName("flits-remove-from-wsl-btn")[0].style.display = "inline-block";
                  if (wsl_btn.parentNode.getElementsByClassName('flits-wsl-product-count')[0]) {
                    wsl_btn.parentNode.getElementsByClassName("flits-wsl-product-count")[0].innerHTML = wsl_product_count;
                  }
                  break;
              }
            } else {

            }
          }
        };
        ajax.open("POST", url, true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var data = that.serialize(
          {
            token: token,
            customer_id: customer_id,
            customer_email: customer_email,
            product_id: product_id,
            product_handle: product_handle,
            product_title: product_title,
            product_image: product_image,
            wsl_product_count: wsl_product_count
          });
        ajax.send(data);
      });
    })
  };

  this.remove_product = function () {
    var that = this;
    var a = document.querySelectorAll('.' + remove_from_wsl_btn_class);
    a.forEach(function (item, index) {
      if (typeof item.addEventListener != "function") {
        return;
      }
      item.addEventListener('click', function (e) {
        var removewsl = this;
        clicked_remove_button = removewsl;
        var customer_id = removewsl.getAttribute("data-flits-customer-id");
        var customer_email = removewsl.getAttribute("data-flits-customer-email");
        var product_id = removewsl.getAttribute("data-flits-product-id");
        var product_handle = removewsl.getAttribute("data-flits-product-handle");
        var product_title = removewsl.getAttribute("data-flits-product-title");
        var product_image = removewsl.getAttribute("data-flits-product-image");
        var page = removewsl.getAttribute("data-page");
        var token = document.getElementById("flits-wsl-token").value;
        var url = document.getElementById("flits-wsl-url").value + remove_wsl_url;
        if (that.isNull(customer_email))
        {
          var customer_email = that.getCookie(cemail);
        }
        clicked_remove_button.disabled = true;
        var wsl_btn = removewsl.parentNode;
        var count = 0;
        var wsl_product_count = 0;
        switch (page) {
          case "product-page":
          case "collection-page":
            wsl_btn.getElementsByClassName("flits-remove-from-wsl-btn")[0].style.display = "none";
            wsl_btn.getElementsByClassName("flits-add-to-wsl-btn")[0].style.display = "inline-block";
            if (wsl_btn.parentNode.getElementsByClassName('flits-wsl-product-count')[0]) {
              count = parseInt(wsl_btn.parentNode.getElementsByClassName('flits-wsl-product-count')[0].innerHTML);
              wsl_product_count = parseInt(count) - 1;
              if (wsl_product_count <= 0) {
                wsl_product_count = 0;
              }
              wsl_btn.parentNode.getElementsByClassName("flits-wsl-product-count")[0].innerHTML = wsl_product_count;
            }
            break;
          case "account-wsl-page":
            if (document.querySelector(".flits-remove-from-wsl-btn[data-flits-product-id='" + product_id + "']")) {
              document.querySelector(".flits-remove-from-wsl-btn[data-flits-product-id='" + product_id + "']").closest("div .flits-wsl-product-row").remove();
              var removewsl = document.querySelectorAll(".flits-wsl-product-row");
              if (removewsl.length < 1) {
                document.querySelector('.flits-wishlist-ul').classList.add("flits-hidden");
                document.querySelector('.flits-wsl-view-empty').classList.remove("flits-hidden");
              }
            }
            that.reset_pagination();
            break;
        }
        var ajax = that.get_ajax_obj();
        ajax.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              clicked_remove_button.disabled = false;
              var res = JSON.parse(this.responseText);
              that.setCookie(chandle, res.products_handle, 15);
              switch (page) {
                case "product-page":
                case "collection-page":
                  wsl_btn.getElementsByClassName("flits-remove-from-wsl-btn")[0].style.display = "none";
                  wsl_btn.getElementsByClassName("flits-add-to-wsl-btn")[0].style.display = "inline-block";
                  if (wsl_btn.parentNode.getElementsByClassName('flits-wsl-product-count')[0]) {
                    wsl_btn.parentNode.getElementsByClassName("flits-wsl-product-count")[0].innerHTML = wsl_product_count;
                  }
                  break;
                case "account-wsl-page":
                  if (document.querySelector(".flits-remove-from-wsl-btn[data-flits-product-id='" + product_id + "']")) {
                    document.querySelector(".flits-remove-from-wsl-btn[data-flits-product-id='" + product_id + "']").closest("div .flits-wsl-product-row").remove();
                    var removewsl = document.querySelectorAll(".flits-wsl-product-row");
                    if (removewsl.length < 1) {
                      document.querySelector('.flits-wishlist-ul').classList.add("flits-hidden");
                      document.querySelector('.flits-wsl-view-empty').classList.remove("flits-hidden");
                    }
                  }
                  that.reset_pagination();
                  break;
              }
            } else {

            }
          }
        };
        ajax.open("DELETE", url, true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var data = that.serialize(
          {
            token: token,
            customer_id: customer_id,
            customer_email: customer_email,
            product_id: product_id,
            product_handle: product_handle,
            product_title: product_title,
            product_image: product_image,
            wsl_product_count: wsl_product_count
          });
        ajax.send(data);
      });
    });
  };

  this.serialize = function (obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };

  this.isNull = function (t) {
    return (typeof t == "undefined" || t == null || t.trim() == "");
  };

  this.flits_wsl_guest_login = function () {
    var flits_handel_cookie = that.getCookie(chandle);
    var flits_handel_array = flits_handel_cookie.split(',');
    for (var i = 0; i < flits_handel_array.length; i++) {
      var s = document.querySelectorAll("*[data-flits-product-handle='" + flits_handel_array[i] + "']");
      if (s.length > 0)
      {
        s[0].parentElement.querySelectorAll('.flits-add-to-wsl-btn')[0].style.display = 'none';
        s[0].parentElement.querySelectorAll('.flits-remove-from-wsl-btn')[0].style.display = 'inline-block';
      }
    }
  };

  this.add_to_cart_event = function () {
    var add_cart = document.querySelectorAll('.flits-wsl-add-to-cart');
    var that = this;
    add_cart.forEach(function (item, index) {
      if (typeof item.addEventListener != "function") {
        return;
      }
      item.addEventListener('click', function (e) {
        var quantity = this.closest('li').querySelector('.flits-wsl-product-variant-quantity').value;
        var select = this.closest('li').querySelector('.product-variant-options');
        var id = select.options[select.selectedIndex].value;
        var data = "id=" + id + "&quantity=" + quantity;
        that.addToCart(data, function (line_item) {
          location.href = "/cart";
        }, function () {});
      });
    });
  };

  this.addToCart = function (data, suc_callback, error_callback) {
    var that = this;
    //     var params = {
    //       type: 'POST',
    //       url: '/cart/add.js',
    //       data: data,
    //       dataType: 'json',
    //       success: function (line_item) {
    //         if (typeof suc_callback == "function") {
    //           suc_callback(line_item);
    //         }
    //       },
    //       error: function (res) {
    //         if (typeof error_callback == "function") {
    //           error_callback(res);
    //         }
    //       }
    //     };
    //     flitsAppJquery.ajax(params);

    var ajax = that.get_ajax_obj();
    ajax.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var line_item = JSON.parse(this.responseText);
          if (typeof suc_callback == "function") {
            suc_callback(line_item);
          }
        } else {
          if (typeof error_callback == "function") {
            error_callback(res);
          }
        }
      }
    };
    ajax.open("POST", '/cart/add.js', true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(data);
  }

  this.add_product();
  this.remove_product();

  if (location.pathname != "/account") {
    this.flits_wsl_guest_login();
  }

  if (location.pathname == "/account") {
    this.wsl_pagination();
    this.change_variant_price();
    this.add_to_cart_event();
  }

};

(function (funcName, baseObj) {
  funcName = funcName || "docReady";
  baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;
  function ready() {
    if (!readyFired) {
      readyFired = true;
      for (var i = 0; i < readyList.length; i++) {
        readyList[i].fn.call(window, readyList[i].ctx);
      }
      readyList = [];
    }
  }
  function readyStateChange() {
    if (document.readyState === "complete") {
      ready();
    }
  }
  baseObj[funcName] = function (callback, context) {
    if (typeof callback !== "function") {
      throw new TypeError("callback for docReady(fn) must be a function");
    }
    if (readyFired) {
      setTimeout(function () {
        callback(context);
      }, 1);
      return;
    } else {
      readyList.push({fn: callback, ctx: context});
    }
    if (document.readyState === "complete") {
      setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
        window.addEventListener("load", ready, false);
      } else {
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }
      readyEventHandlersInstalled = true;
    }
  };
})("flits_docReady", window);

flits_docReady(function () {
  var is_wishlist_automatic = document.getElementById('flits-is-wishlist-automatic').value;
  var addtocart_selectors = ["button[name='add']"];
  addtocart_selectors.forEach(function (selector) {
    var els = document.querySelectorAll(selector);
    if (typeof els == "object" && els) {
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (typeof el.addEventListener != "function") {
          return;
        }
        if (is_wishlist_automatic == 1) {
          el.parentElement.after(document.getElementById('flits-wishlist-automatic-code').children[0], el.parentElement.firstChild)
        }
      }
    }
  })
});

if(location.pathname == "/account"){

  window.flitsApp.get_wishlist_products_using_ajax = function () {
    // this function will call ajax request and get wishlisted products
    // call this function from instead of set_wishlist_products_using_ajax
    var url = flitsAppJquery("#flits-wsl-url").val();
    var customer_id = flitsAppJquery("#flits-wsl-customer-id").val();
    var token = flitsAppJquery("#flits-wsl-token").val();
    flitsAppJquery.ajax({
      method: "get",
      url: url,
      data: {
        customer_id: customer_id,
        token: token
      },
      success: function (data) {
        var count = data.count;
        var products = data.data;
        var status = data.status;
        if (status && count > 0) {
          flitsAppJquery.each(products, function (index, product) {
            var li = flitsAppJquery(".flits-wsl-li-structure").clone();
            li.removeClass("flits-wsl-li-structure");
            li.addClass("flits-wsl-product-row");
            li.find('.flits-product-title-anchor').attr('href', '/products/' + product.product_handle);
            li.attr('data-flits-wishlist-product-handle', product.product_handle);
            flitsAppJquery('.flits-wishlist-ul').append(li);
          });
          flitsAppJquery('#flits-wishlist-size').val(count);
          flitsAppJquery('#flits-wishlist-limit').val(8);
          flitsAppJquery('#flits-wishlist-total-page').val(Math.ceil(count / 8));
          flitsAppJquery('.flits-wsl-view-empty').addClass('flits-hidden');
          flitsAppJquery('.flits-wishlist-ul').removeClass('flits-hidden');
          document.getElementById("flits-wishlist-current-page").value = 1;
          window.flitsApp.wishlist_products_obj.reset_pagination();
          window.flitsApp.set_wishlist_products_using_ajax();
          window.flitsApp.wishlist_products_obj.remove_product();
        } else {
          flitsAppJquery('.flits-wsl-view-empty').removeClass('flits-hidden');
          flitsAppJquery('.flits-wishlist-ul').addClass('flits-hidden');
        }
      },
      error: function () {
        flitsAppJquery('.flits-wsl-view-empty').removeClass('flits-hidden');
        flitsAppJquery('.flits-wishlist-ul').addClass('flits-hidden');
      }
    });
  };

  window.flitsApp.set_wishlist_products_using_ajax = function () {
    window.flitsApp.set_wishlist_add_change_event();
    window.flitsApp.set_wishlist_add_click_event();
    // for gettting and setting product
    var moneyFormat = flitsAppJquery("#flits-shop-money-format").val();
    var $_ = flitsAppJquery;
    $_("[data-flits-wishlist-product-handle]").each(function (index, item) {
      var wishlist_product_selector = $_(this);
      var handle = $_(this).attr('data-flits-wishlist-product-handle');
      $_.ajax({
        method: 'get',
        url: '/products/' + handle + ".json",
        success: function (data) {
          var product = data.product;
          var image = 'https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif';
          if(product.image != null){
            image = product.image.src;
          }
          var extidx = image.lastIndexOf('.');
          var extension = image.substr(extidx);
          image = image.replace(extension, '_200x_crop_center' + extension);
          $_(wishlist_product_selector).find(".flits-product-img").css({
            'background': 'url(' + image + ')',
            'background-size': 'contain',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-image': image
          });
          var display_variant_price = 0;
          $_.each(product.variants, function (variant_index, variant) {
            var variant_price = window.flitsApp.formatMoney(Math.abs(variant.price * 100), moneyFormat).replace(/((\,00)|(\.00))$/g, '');
            var variant_title = variant.title;
            if (product.variants.length == 1 && variant_title == 'Default Title') {
              variant_title = product.title;
            }
            var option = $_('<option/>');
            option.html(variant_title);
            option.attr('value', variant.id);
            option.attr('data-flits-variant-price', variant_price);
            $_.ajax({
              method: 'get',
              url: location.origin + '/products/' + product.handle + '?view=flits_product_variant_data&variant=' + variant.id,
              success: function (data) {
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(data, "text/html");
                var res = JSON.parse(htmlDoc.querySelector('.flits-product-variant-data').innerHTML);
                if (res.inventory_management == "shopify" && res.inventory_policy == "deny" && res.inventory_quantity <= 0){
                  option.html(option.html() + " - Sold Out");
                  var flits_add_cart_btn = $_(wishlist_product_selector).find('.flits-add-to-cart');
                  var selected_variant_text = $_(wishlist_product_selector).find('.flits-product-variant-options option:selected').html();
                  if (selected_variant_text.indexOf('Sold Out') != -1) {
                    var sold_out_text = flits_add_cart_btn.attr('data-flits-sold-out-text');
                    flits_add_cart_btn.addClass('flits-btn-danger')
                    .attr('disabled', true)
                    .html(sold_out_text);
                  }
                }
              },
              error: function () {

              }
            });
            if (display_variant_price <= 0) {
              display_variant_price = variant_price;
            }
            $_(wishlist_product_selector).find('.flits-product-variant-options').append(option);
          });
          $_(wishlist_product_selector).find('.flits-product-variant-title').append(product.title);
          $_(wishlist_product_selector).find('.flits-product-variant-price').append(display_variant_price);
          $_(wishlist_product_selector).find('.flits-wsl-product-remove').attr('data-flits-product-id', product.id);
          $_(wishlist_product_selector).find('.flits-wsl-product-remove').attr('data-flits-product-title', product.title);
          $_(wishlist_product_selector).find('.flits-wsl-product-remove').attr('data-flits-product-handle', product.handle);
          $_(wishlist_product_selector).attr('title', product.title);
          window.flitsApp.wishlist_products_obj.reset_pagination();
        },
        error: function () {
          $_(wishlist_product_selector).remove();
          window.flitsApp.wishlist_products_obj.reset_pagination();
        }
      });
    });
  };

  window.flitsApp.set_wishlist_add_change_event = function () {
    // For change event of select box
    flitsAppJquery(document).on('change', '.flits-wsl-product-row .flits-product-variant-options', function (ev) {
      var variant_price = this.options[this.selectedIndex].getAttribute('data-flits-variant-price');
      var flits_product_variant_price_div = this.closest(".flits-row").parentNode.querySelector('.flits-product-variant-price');
      flits_product_variant_price_div.innerHTML = variant_price;
      var flits_add_cart_btn_text = '';
      var flits_add_cart_btn = this.closest(".flits-row").parentNode.querySelector('.flits-add-to-cart');
      var selected_product_variant_text = this.options[this.selectedIndex].innerHTML;
      if (selected_product_variant_text.indexOf('Sold Out') != -1) {
        flits_add_cart_btn_text = flits_add_cart_btn.getAttribute('data-flits-sold-out-text');
        flits_add_cart_btn.disabled = true;
        flits_add_cart_btn.classList.add("flits-btn-danger");
      } else {
        flits_add_cart_btn_text = flits_add_cart_btn.getAttribute('data-flits-add-to-cart-text');
        flits_add_cart_btn.disabled = false;
        flits_add_cart_btn.classList.remove("flits-btn-danger");
      }
      flits_add_cart_btn.innerHTML = flits_add_cart_btn_text;
    });
  };

  window.flitsApp.set_wishlist_add_click_event = function () {
    // For click event of quantity adjuster
    flitsAppJquery(document).on('click', '.flits-wsl-product-row .flits-product-quantity-adjuster', function (ev) {
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
      if ((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
        // We have a valid number!
        return qty;
      } else {
        // Not a number. Default to 1.
        return 1;
      }
    };
  };

  window.flitsApp.run_after_jquery = function (callback) {
    var callback_interval = setInterval(function () {
      if (typeof flitsAppJquery == "undefined") {

      } else {
        clearInterval(callback_interval);
        if (typeof callback == "function") {
          callback();
        }
      }
    }, 1000);
  };

  window.flitsApp.append_anchor_div = function (appent_at) {
    var pages_div = document.querySelector('.flits-pages');
    var div_anchor = document.querySelector('.flits-wishlist-extra-data .flits-anchor a');
    var div_div = document.querySelector('.flits-wishlist-extra-data .flits-div div');

    if(div_anchor){
      var list_group_length = document.querySelector('.flits-list-group').children.length;
      var list_group = document.querySelector('.flits-list-group');
      if(appent_at >= list_group_length){
        list_group.insertBefore(div_anchor, list_group.children[list_group_length]);
      }else{
        list_group.insertBefore(div_anchor, list_group.children[appent_at]);
      }
    }
    if(div_div){
      if(pages_div){
        pages_div.append(div_div);
      } 
    }
    window.flitsApp.run_after_jquery(window.flitsApp.get_wishlist_products_using_ajax);
  };

  window.flitsApp.append_anchor_div(3);
}
