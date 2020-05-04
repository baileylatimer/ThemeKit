
// in old js 
// change class "applied-reduction-code__information"  to "reduction-code__text"

// updated js
// first we check that '.reduction-code__text' selector is exist or not
// if exist we use '.reduction-code__text' selector otherwise '.applied-reduction-code__information' selector. (line no 27)

if (!window.flitsApp || typeof window.flitsApp == "undefined") {
  window.flitsApp = {};
}
window.flitsApp.formatMoney=function(o,m){"string"==typeof o&&(o=o.replace(".",""));var t="",_=/\{\{\s*(\w+)\s*\}\}/,a=m||"${{amount}}";function n(o,m){return void 0===o?m:o}function r(o,m,t,_){if(m=n(m,2),t=n(t,","),_=n(_,"."),isNaN(o)||null==o)return 0;var a=(o=(o/100).toFixed(m)).split(".");return a[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+t)+(a[1]?_+a[1]:"")}switch(a.match(_)[1]){case"amount":t=r(o,2);break;case"amount_no_decimals":t=r(o,0);break;case"amount_with_comma_separator":t=r(o,2,".",",");break;case"amount_no_decimals_with_comma_separator":t=r(o,0,".",",")}return a.replace(_,t)};
window.flitsApp.credit_on_shipping_method = function () {

  var that = this;

  this.customer_id = '';
  this.customer_url = '';
  this.token = '';
  this.moneyFormat = '';
  this.checkbox_format = '';	
  this.checkbox_div = '';
  this.select_format = '';
  this.store_credit_applied = '';
  this.cart_data = {};
  this.spent_rules = {};

  this.applied_discount_code_span = '.applied-reduction-code__information';
  if(document.querySelector('.reduction-code__text')){
    this.applied_discount_code_span = '.reduction-code__text';
  }

this.get_ajax_obj = function () {
  if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    return new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE 6 and older
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
};

this.serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

this.generate_code = function(data){
  var that = this;
  var moneyFormat = that.money_format;
  var total_credits = data.total_credits;
  var rules = data.rules;
  var result = "";
  for(var i = 0; i < rules.length; i++){
    var credits = rules[i].applicable_credits;
    var rule_id = rules[i].rule.id
    var option_text = "You can use ##credits## credits out of ##total_credits##.";        
    switch(rules[i].rule.rule.column.name){
      case 'cart_value':
        option_text = that.spent_rules.credit_cart_percentage.replace('##credits##',window.flitsApp.formatMoney(Math.abs(credits),moneyFormat).replace(/((\,00)|(\.00))$/g, ''));
        option_text = option_text.replace('##total_credits##',window.flitsApp.formatMoney(Math.abs(total_credits),moneyFormat).replace(/((\,00)|(\.00))$/g, ''));            
        break;
      case 'checkout_shipping':
        option_text = that.spent_rules.free_shipping_rule;
      break;
      default :
        option_text = option_text.replace('##credits##',window.flitsApp.formatMoney(Math.abs(credits),moneyFormat).replace(/((\,00)|(\.00))$/g, ''));
        option_text = option_text.replace('##total_credits##',window.flitsApp.formatMoney(Math.abs(total_credits),moneyFormat).replace(/((\,00)|(\.00))$/g, ''));   
        break;
    }

    var opt = document.createElement('option');
    opt.value = rule_id;
    opt.innerHTML = option_text;
    if(that.select_format.querySelector('select option[value="'+rule_id+'"]')){

    }else{
      that.select_format.querySelector('select').appendChild(opt);
    }
  }
  if(rules.length <= 0){
    that.select_format.style.display = "none";
  }
};

this.add_checkbox_code = function(){
  if(document.querySelector('#flits-use-credit-div')){

  }else{
    var forms = document.querySelectorAll('form input[name="checkout[reduction_code]"]');
    for(var i = 0 ; i < forms.length; i++){
      var form = forms[i].closest('form');
      if(form){
        var checkbox_div = that.checkbox_div.cloneNode(true);
        form.parentElement.parentNode.insertBefore(checkbox_div, form.parentElement.nextSibling);
      }
    } 

  }
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

this.setCookie = function (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

this.isNull = function(x){
  return (typeof x == "undefined" || x == null || x.toString().trim() == "");
};

this.get_credit = function (args_data) {
  var that = this;
  var url = that.customer_url + '/get_credit';
  if (Shopify && Shopify.Checkout.step == that.step_name) {
    var ajax = that.get_ajax_obj();
    ajax.onreadystatechange = function () {
      if (this.readyState == 4 ) {
        if (this.status == 200) {
          var res = JSON.parse(this.responseText);

          var div = document.createElement("div");
          div.id = "flits-use-credit-div";
          div.style.marginBottom = "1.5em"
          that.generate_code(res.code);
          that.checkbox_div = div;
          that.checkbox_div.append(that.select_format);

          if(res.is_credit_on_checkout == 1){
            var old_code = that.getCookie('flits_discount_code');
            var applied_code_div = document.querySelector(that.applied_discount_code_span);
            if(that.isNull(old_code)){
              that.add_checkbox_code();
            }
            else{
              if(that.isNull(applied_code_div)){
                that.add_checkbox_code();
              }else{
                if(old_code == applied_code_div.innerHTML){

                }
                else{
                  that.add_checkbox_code();
                }
              }
            }
            if(that.isNull(args_data)){

            }
            else{
              var code_step = args_data.step;
              switch(code_step){
                case 'remove_code':
                  var checkout_code_interval = setInterval(function(){
                    var that = window.flitsApp.credit_on_shipping_obj;
//                     var applied_code_div = document.querySelector('.applied-reduction-code__information');
                    var applied_code_div = document.querySelector(that.applied_discount_code_span);
                    var old_code = that.getCookie('flits_discount_code');
                    if(that.isNull(applied_code_div)){
                      clearInterval(checkout_code_interval);
                      that.add_checkbox_code();
                    }else{
                      if(old_code == applied_code_div.innerHTML){

                      }
                      else{
                        clearInterval(checkout_code_interval);
                        that.add_checkbox_code();
                      }
                    }

                  },100);
                  break;
                case 'apply_code':


                  var checkout_code_interval = setInterval(function(){

                    var that = window.flitsApp.credit_on_shipping_obj;
                    var applied_code_div = document.querySelector(that.applied_discount_code_span);
                    var old_code = that.getCookie('flits_discount_code');
                    if(that.isNull(applied_code_div)){

                    }else{
                      clearInterval(checkout_code_interval);
                      that.add_checkbox_code();   
                    }

                  },100);
                  //                     that.add_checkbox_code();
                  break;
                default:
                  break;
              }
            }
          }else{

          }

        } else {

        }
      }
    };
    ajax.open("POST", url, true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var cart_data = that.cart_data;
    if(!that.isNull(cart_data.token)){
      Object.defineProperty(cart_data, 'cart_token',
                            Object.getOwnPropertyDescriptor(cart_data, 'token'));
      delete cart_data['token'];
    }
    
    var remove_attribute = ["featured_image","product_description","title","url","handle","product_type","product_title","discounts","variant_options","options_with_values","variant_title"];

    for (var i = 0; i < cart_data.items.length; i++) {
      for(var j = 0 ; j < remove_attribute.length; j ++){
        if(!that.isNull(cart_data.items[i][remove_attribute[j]])){
          delete cart_data.items[i][remove_attribute[j]];
        }
      }
    }

    var data = that.serialize(
      {
        token: that.token,
        cart: btoa(unescape(encodeURIComponent(JSON.stringify(cart_data)))),
        customer_id: that.customer_id,
        shipping_price: that.get_shipping_price()
      });
    ajax.send(data);
  }
};
this.get_shipping_price = function(){
    var shipping_div = document.querySelector('[data-checkout-total-shipping-target]');
    if(shipping_div){
		return shipping_div.getAttribute('data-checkout-total-shipping-target');
    }
	return 0;
};
this.getCartData = function (success, error) {
  var that = this;
  var cart_url = "/cart.json";
  var cart_ajax = that.get_ajax_obj();
  cart_ajax.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (typeof success == "function") {
          var res = JSON.parse(this.responseText);
          success(res);
        }
      } else {
        if (typeof error == "function") {
          error();
        }
      }
    }
  };
  cart_ajax.open("GET", cart_url, true);
  cart_ajax.send();
};
this.getFormData = function(form){
  var inputs =  form.querySelectorAll('[name]');
  var data = {};
  for(var i = 0; i < inputs.length; i++){
    data[inputs[i].name] = inputs[i].value;
  }
  return that.serialize(data);
}
this.applyCreditClickEvent = function(){
  document.addEventListener("click",function(event){

    var els = event.target;
    var btn = els;
    var that = window.flitsApp.credit_on_shipping_obj;
    if(els.classList.contains('apply-flits-credit')){
      var is_checkbox = false;

      var element = els.closest('#flits-use-credit-div').querySelector("#flits-want-to-use-credit");
      var spent_rule_id = -1;	
      if(element && element.tagName.toString().toLowerCase() == "select"){
        is_checkbox = false;
      }
      else{
        is_checkbox = true;
      }

      if (is_checkbox && element.checked) {
        event.preventDefault();
      }else if(!is_checkbox && element.value !== "-1"){
        spent_rule_id = element.value;
        event.preventDefault();
      } else {
        return true;
      }

      //         if (btn.tagName.toString().toLowerCase() == "input") {
      //           old_text = btn.value;
      //           btn.value = new_text;
      //         } else {
      //           old_text = btn.innerHTML;
      //           btn.innerHTML = new_text;
      //         }
      btn.setAttribute('disabled', true);
      btn.classList.add('btn--loading');

      that.getCartData(function (cart) {

        var URL = "/credit/apply_credit";
        var token = that.token;
        URL = that.customer_url + URL;
        var ajax = that.get_ajax_obj();
        ajax.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            //                             btn.classList.remove('btn--loading');
            //               if (btn.tagName.toString().toLowerCase == "input") {
            //                 btn.value = old_text;
            //                 document.getElementById("flits-use-credit-div").style.display = "none";
            //               } else {
            //                 btn.innerHTML = old_text;
            //                 document.getElementById("flits-use-credit-div").style.display = "none";
            //               }

            btn.setAttribute("disabled", false);
            if (res.status) {
              var input = document.querySelector('input[name="checkout[reduction_code]"]').cloneNode(true);
              input.type = "hidden";
              input.value = res.code;
              document.querySelector('input[name="checkout[reduction_code]"]').closest('form').appendChild(input);
              document.querySelector('input[name="checkout[reduction_code]"]').closest('form').submit();
              btn.querySelector('.btn__applied').style.display = "inline-block";
              btn.querySelector('.btn__spinner').style.display = 'none';
              btn.querySelector('.btn__content').style.display = 'none';
              that.setCookie('flits_discount_code',res.code,3);
              //                 location.href = "/checkout?discount=" + res.code;
            }
          }
        };
        ajax.open("POST", URL, true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        Object.defineProperty(cart, 'cart_token',
                              Object.getOwnPropertyDescriptor(cart, 'token'));
        delete cart['token'];

        var remove_attribute = ["featured_image","product_description","title","url","handle","product_type","product_title","discounts","variant_options","options_with_values","variant_title"];

        for (var i = 0; i < cart.items.length; i++) {
          for(var j = 0 ; j < remove_attribute.length; j ++){
            if(!that.isNull(cart.items[i][remove_attribute[j]])){
              delete cart.items[i][remove_attribute[j]];
            }
          }
        }

        var params = "token=" + token + "&data=" + btoa(unescape(encodeURIComponent(JSON.stringify(cart))))+"&spent_rule_id="+spent_rule_id+"&shipping_price="+that.get_shipping_price();
        ajax.send(params);
      }, function () {
        location.href = "/checkout";
      });

    };
  });
  document.addEventListener('submit',function(event){

    var form = event.target;
    var that = window.flitsApp.credit_on_shipping_obj;
    if(that.isNull(form.querySelector('#checkout_clear_discount'))){
    }
    else{
      that.get_credit({
        step:'remove_code'
      });
    }

    if(that.isNull(form.querySelector('#checkout_reduction_code'))){

    }else{
      that.get_credit({
        step:'apply_code'
      });
    }
    return true;
  });
};
this.addEventToGoPaymentBtn = function(){
  var that = this;

  var btn = document.querySelector('[data-trekkie-id="continue_to_payment_method_button"]');
  if(btn){
    var flits_discount_code = that.getCookie('flits_discount_code');
    var applied_code = (document.querySelector(that.applied_discount_code_span)) ? document.querySelector(that.applied_discount_code_span).innerHTML : null;
    if(flits_discount_code && applied_code && applied_code == flits_discount_code){
      if(document.querySelector('.applied-reduction-code__clear-button')){
        var form = document.querySelector('.applied-reduction-code__clear-button').closest('form');
        form.submit();
      }
    }
  }
};
this.step_name  = "payment_method";

if (Shopify && Shopify.Checkout.step == this.step_name) {
  var url = location.origin + '/?view=flits_customer_data';
  var ajax = this.get_ajax_obj();
  ajax.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {

        var data = this.responseText;
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(data, "text/html");

        var res = JSON.parse(htmlDoc.querySelector('.flits-checkout-data').innerHTML);
        var checkbox = htmlDoc.querySelector('.flits-checkout-checkbox').innerHTML;
        var select = 	htmlDoc.querySelector('.flits-checkout-select-credit-div');
        //           var customer_id = __st.cid;
        that.customer_id = res.customer_id;
        that.customer_url = res.customer_url;
        that.token = res.token;
        that.money_format = htmlDoc.querySelector('#flits-money-format').value;
        that.checkbox_format = checkbox;
        that.select_format = select;
        that.spent_rules = res.spent_rules;
        that.store_credit_applied = res.store_credit_applied;
        that.getCartData(function(cart_data){
          var that = window.flitsApp.credit_on_shipping_obj;
          that.cart_data = cart_data;
          that.get_credit();
          that.applyCreditClickEvent();
        },function(){
        });
      } else {

      }
    }
  };
  ajax.open("GET", url, true);
  ajax.send();
}
if(Shopify && Shopify.Checkout.step == "shipping_method"){
  that.addEventToGoPaymentBtn();
}

if(Shopify){
  var flits_discount_code = that.getCookie('flits_discount_code');
  var applied_code = (document.querySelector(that.applied_discount_code_span)) ? document.querySelector(that.applied_discount_code_span).innerHTML : null;
  if(flits_discount_code && applied_code && applied_code == flits_discount_code){
    var append_parent = document.querySelector('.total-line-table ' + that.applied_discount_code_span).parentNode;
    var span = document.createElement('span');
    span.innerHTML = 'Store Credit Applied';
    span.className = "flits-store-credit-information";
    append_parent.appendChild(span);
    document.querySelector('.total-line-table ' + that.applied_discount_code_span).style.display = "none";
    var url = location.origin + '/?view=flits_customer_data';
    var ajax = this.get_ajax_obj();
    ajax.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var data = this.responseText;
          var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(data, "text/html");
          var res = JSON.parse(htmlDoc.querySelector('.flits-checkout-data').innerHTML);
          
          span.innerHTML = res.store_credit_applied;
          var flits_code_change_interval = setInterval(function(){
            if(flits_discount_code && applied_code && applied_code == flits_discount_code){
              
              if(document.querySelector('.total-line-table ' + that.applied_discount_code_span)){
                var append_parent = document.querySelector('.total-line-table ' + that.applied_discount_code_span).parentNode;
                if(!append_parent.querySelector('.flits-store-credit-information')){
                  var span = document.createElement('span');
                  span.innerHTML = res.store_credit_applied;
                  span.className = "flits-store-credit-information";
                  append_parent.appendChild(span);
                  document.querySelector('.total-line-table ' + that.applied_discount_code_span).style.display = "none";
                  //                 clearInterval(flits_code_change_interval);
                }
              }
            }
          },100);
          
        } else {

        }
      }
    };
    ajax.open("GET", url, true);
    ajax.send();
  }
}
//   var applied_code_information = document.querySelector(".applied-reduction-code__information");
//   if(applied_code_information){
//   	var applied_discount_code = 
//   }
};

window.flitsApp.credit_on_shipping_obj = new window.flitsApp.credit_on_shipping_method();
