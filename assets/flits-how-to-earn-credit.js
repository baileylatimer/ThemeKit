
if (location.pathname == "/account") {

  !function (t, n) {
    t = t || "docReady";
    var e = [], o = !1, d = !1;
    function a() {
      if (!o) {
        o = !0;
        for (var t = 0; t < e.length; t++)
          e[t].fn.call(window, e[t].ctx);
        e = []
      }
    }
    function c() {
      "complete" === document.readyState && a()
    }
    (n = n || window)[t] = function (t, n) {
      if ("function" != typeof t)
        throw new TypeError("callback for docReady(fn) must be a function");
      o ? setTimeout(function () {
        t(n)
      }, 1) : (e.push({fn: t, ctx: n}), "complete" === document.readyState ? setTimeout(a, 1) : d || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1)) : (document.attachEvent("onreadystatechange", c), window.attachEvent("onload", a)), d = !0))
    }
  }("flits_docReady", window);
  if (!window.flitsApp || typeof window.flitsApp == "undefined") {
    window.flitsApp = {};
  }
  window.flitsApp.how_to_earn_credit = function () {
    this.that = this;
    this.get_rule_url = "/get_rule";
    this.div_code_class = "flits-credit-code-div";
    this.flits_token = "";
    this.user_url = "";


    this.appendDiv = function(){ 
      var pages_div = document.querySelector('.flits-pages');
      var div_div = document.querySelector('.flits-how-to-earn-credit-extra-data .flits-div div');
      if (div_div) {
        if (pages_div) {
          pages_div.append(div_div);
        }
      }
    };
    this.appendAnchor = function(){
      var div_anchor = document.querySelector('.flits-how-to-earn-credit-extra-data .flits-anchor a');
      var credits_nav = document.querySelector('.flits-nav a[data-href="#flits-page-credits"]');
      if (div_anchor) {
        if (credits_nav) {
          credits_nav.parentNode.insertBefore(div_anchor, credits_nav);
        } 
      }
    }

    this.openRuleTab = function(evt, rules) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("flits-earn-credit-tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("flits-earn-credit-tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" flits-active", "");
      }
      document.getElementById(rules).style.display = "block";
      evt.target.className += " flits-active";
    }

    this.init = function () {
      this.user_url = document.getElementById("flits-customer-url").value;
      this.flits_token = document.getElementById("flits-token").value;
    };
    this.init();

    this.get_ajax_obj = function () {
      if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        return new XMLHttpRequest();
      } else if (window.ActiveXObject) { // IE 6 and older
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
    };

    this.serialize = function (obj) {
      var str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          if (typeof obj[p] == "object" || typeof obj[p] == "array") {
            for (var key in obj[p]) {
              str.push(encodeURIComponent(p + "[" + key + "]") + "=" + encodeURIComponent(obj[p][key]));
            }
          } else {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }

        }
      }
      return str.join("&");
    };

    this.parseHTML = function (str) {
      if (!str) {
        return document.createElement('div');
      }
      var el = document.createElement('html');
      el.innerHTML = "<html><head><title>titleTest</title></head><body><div>" + str + "</div></body></html>";
      return el.querySelector('body div');
    };

    this.get_rules = function () {
      var that = window.flitsApp.how_to_earn_credit_obj;
      var get_rule_data_url = that.user_url + that.get_rule_url;
      var rule_data_ajax = that.get_ajax_obj();
      rule_data_ajax.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            var res = JSON.parse(this.responseText);

            var code = that.set_rules_div(res.rules);

          } else {
            if (typeof error == "function") {

            }
          }
        }
      };
      rule_data_ajax.open("POST", get_rule_data_url, true);
      rule_data_ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      var params = that.serialize({
        token: that.flits_token
      });

      rule_data_ajax.send(params);
    };

    this.set_rules_div = function (data) {
      this.appendDiv();
      var that = this;
      var all_rules = data.all_rules_data;
      var moneyFormat = flitsAppJquery("#flits-shop-money-format").val();
      var visible_div = "flits_earning_rules";
      for (var i = 0; i < all_rules.length; i++) {
        var $clone_div = flitsAppJquery(".flits-rule-meta-data").clone().removeClass('flits-rule-meta-data flits-hidden');
        var rule = all_rules[i];

        if (rule.is_default_rule) {

          var deafult_title = rule.title;
          var deafult_description = rule.description;
          var multilang_title = window.flitsApp.multilang_how_to_earn[deafult_title];
          var multilang_description = window.flitsApp.multilang_how_to_earn[deafult_description];
          var or_more = window.flitsApp.multilang_how_to_earn.or_more;
          var credits = rule.credits;
          if (rule.is_fixed) {
            credits = window.flitsApp.formatMoney(Math.abs(credits), moneyFormat).replace(/((\,00)|(\.00))$/g, '');
          }else{
            credits /= 100;
            credits += "%";
          }
          var title = multilang_title.replace('##credits##', credits).replace('##order_number##', rule.column_value);
          var description = multilang_description.replace('##credits##', credits).replace('##order_number##', rule.column_value);
          var product_tag_span = flitsAppJquery('<span/>');
          if(rule.module_on == 'product_tag'){
            flitsAppJquery(rule.avails).each(function(index,item){
              var product_tag_anchor = flitsAppJquery('<a href="/search?q='+ item +'" target="_blank">'+ item +'</a>');
              if(index > 0){
              	product_tag_span.append(',');
              }
              product_tag_span.append(product_tag_anchor);
            });
            description = description.replace('##tag##',product_tag_span.html());
          }
          if(rule.module_on == 'cart'){
            var cart_range = rule.column_value;
            var range = cart_range.split(":");

            var min_range = window.flitsApp.formatMoney(Math.abs(range[0]*100), moneyFormat).replace(/((\,00)|(\.00))$/g, '')
            var max_range = window.flitsApp.formatMoney(Math.abs(range[1]*100), moneyFormat).replace(/((\,00)|(\.00))$/g, '')

            var var_to_replace = '##max_cart_value##';
            if(range[1] == '-1'){
              var_to_replace = 'to ##max_cart_value##';
              max_range = or_more;
            }
            description = description.replace('##min_cart_value##', min_range).replace(var_to_replace, max_range);
          }
        } else {
          var title = rule.title;
          var description = rule.description;
        }

        $clone_div.find('.flits-rule-details').html(title);
        $clone_div.find('.flits-rule-credit').html(description);
        $clone_div.find('.flits-rule-image').attr('src', rule.image);
        if (rule.is_earned) {
          $clone_div.find('.flits-rule-box').addClass('flits-earned-rule flits-z-dept-1');
        }
        flitsAppJquery("." + rule.tab_to_append).attr("disabled",false);
        flitsAppJquery("." + rule.tab_to_append).attr("title",'');
        flitsAppJquery("#" + rule.tab_to_append).append($clone_div);
      }
      var page = location.hash.replace('#', '');
      if(all_rules.length > 0){
        this.appendAnchor();
        if (page == "earn-credit"){
          document.querySelector("[data-href='#flits-page-" + page + "']").click();
        }
        flitsAppJquery('.flits-earn-credit-tab').find("."+all_rules[0].tab_to_append).click();
      }else{
        if (page == "earn-credit"){
          document.querySelector("[data-href='#flits-page-orders']").click();
        }
      }
    };

  };

  flits_docReady(function () {

    window.flitsApp.how_to_earn_interval = setInterval(function(){
      if (typeof flitsAppJquery == "undefined"){

      }
      else{
        clearInterval(window.flitsApp.how_to_earn_interval);
        window.flitsApp.how_to_earn_credit_obj = new window.flitsApp.how_to_earn_credit();
        window.flitsApp.how_to_earn_credit_obj.get_rules();

        flitsAppJquery(".flits_earning_rules").click();
      }
    }, 1000);
  });

}
