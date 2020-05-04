
if (!window.flitsApp || typeof window.flitsApp == "undefined") {
    window.flitsApp = {};
}
window.flitsApp.show_social_login_loading = function () {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    var loading = document.getElementsByClassName("flits-social-login-loading");
    if (loading.length > 0) {
        loading[0].style.display = "block";
    }
};
window.flitsApp.hide_social_login_loading = function () {
    document.body.style.overflow = "initial";
    document.documentElement.style.overflow = "initial";
    var loading = document.getElementsByClassName("flits-social-login-loading");
    if (loading.length > 0) {
        loading[0].style.display = "none";
    }
};
window.flitsApp.isNull = function (x) {
    return (typeof x == "undefined" || x == null || x.trim() == "");
};
window.flitsApp.getURLParameter = function (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
};
window.flitsApp.get_ajax_obj = function () {
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 and older
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
};
window.flitsApp.submitLoginform = function (email, pass) {
    var form = document.getElementById('customer_login');
    form.elements.namedItem("customer[email]").value = email;
    form.elements.namedItem("customer[password]").value = pass;
    form.submit();
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
    var login_box_selectors = ['#customer_login', '#create_customer'];
    login_box_selectors.forEach(function (selector) {
        var els = document.querySelectorAll(selector);
        if (typeof els == "object" && els) {
            for (var i = 0; i < els.length; i++) {
                var el = els[i];
                if (typeof el.addEventListener != "function" && !(el.offsetWidth > 0 && el.offsetHeight > 0)) {
                    return;
                }
                var next_sib = el.parentElement.nextSibling;
                var child = document.getElementById('flits-social-login-div').children[0];
                (next_sib.addEventListener == "function") ? el.parentElement.insertBefore(child, next_sib) : el.parentElement.appendChild(child);
            }
        }
    })
//    document.querySelector("form[action='/cart']").addEventListener('submit',);
});
if (window.flitsApp.isNull(window.flitsApp.getURLParameter('flits_error'))) {
    var w = window.flitsApp.getURLParameter('w');
    var o = window.flitsApp.getURLParameter('o');
    var email = window.flitsApp.isNull(w) ? null : atob(w);
    var password = window.flitsApp.isNull(o) ? null : atob(o);
//    history.pushState(null, null, "login");
    if (!window.flitsApp.isNull(email) && !window.flitsApp.isNull(password)) {
        window.flitsApp.show_social_login_loading();
        var ajax = window.flitsApp.get_ajax_obj();
        var URL = "/account/login";
        var params = "customer[email]=" + email;
        params += "&customer[password]=" + password;
        ajax.onreadystatechange = function () {
//            console.log(this);
            if (this.readyState == 4 && this.status == 200) {
                var url = this.responseURL;
                if (url.includes('account/login')) {
                    var ajax_reset = window.flitsApp.get_ajax_obj();
                    var URL = document.getElementById('flits-reset-pass-url').value;
                    var params = "email=" + w;
                    params += "&token=" + document.getElementById('flits-token').value;
                    ajax_reset.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            var res = JSON.parse(this.responseText);
                            if (res.status) {
                                var o = res.o;
                                password = window.flitsApp.isNull(o) ? null : atob(o);
                                if (!window.flitsApp.isNull(password)) {
                                    window.flitsApp.submitLoginform(email, password);
                                }
                            } else {

                            }
                        }
                    };
                    ajax_reset.open("POST", URL, true);
                    ajax_reset.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    ajax_reset.send(params);
                } else {
                    window.flitsApp.submitLoginform(email, password);
                }
            }
        };
        ajax.open("POST", URL, true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(params);

    } else {

    }

} else {
    if (!window.flitsApp.isNull(window.flitsApp.getURLParameter('flits_error'))) {
        var div = document.getElementsByClassName('flits-social-login-error')[0];
        var error = parseInt(window.flitsApp.getURLParameter('flits_error'));
        var display_error = "";
        switch (error) {
            case 0:
                display_error = "Some thing went wrong please try again.";
                break;
            case 1:
                display_error = "Not verfied social login.";
                break;
            case 2:
                display_error = "Social login uninstalled contact store admin.";
                break;
            case 3:
                display_error = "Social login not installed correctly contact store admin.";
                break;
            case 4:
                display_error = "Please authorize application to login.";
                break;
            case 5:
                display_error = "Some thing went wrong please try again.";
            case 6:
                display_error = "No email provided.";
                break;
            default:
                display_error = "Some thing went wrong please try again.";
                break;
        }
        div.innerHTML = display_error;
        div.style.display = "block";
        history.pushState(null, null, "login");
    }
}

