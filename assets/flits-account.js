
if (!window.flitsApp || typeof window.flitsApp == "undefined") {
    window.flitsApp = {};
}
window.flitsApp.formatMoney = function (cents, format) {
//     if (typeof Shopify.formatMoney === 'function') {
//       return Shopify.formatMoney(cents, format);
//     }
    if (typeof cents == 'string') {
        cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || '${{amount}}';
    function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    }
    function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');
        if (isNaN(number) || number == null) {
            return 0;
        }
        number = (number / 100.0).toFixed(precision);
        var parts = number.split('.'),
                dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
                cents = parts[1] ? (decimal + parts[1]) : '';
        return dollars + cents;
    }
    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }
    return formatString.replace(placeholderRegex, value);
};
window.flitsApp.loadScript = function (url, main_callback, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                script.onreadystatechange = null;
                if (typeof callback === "function") {
                    callback(main_callback);
                }
            }
        };
    } else {  //Others
        script.onload = function () {
            if (typeof callback === "function") {
                callback(main_callback);
            }
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};
window.flitsApp.loadStyle = function (url, main_callback, callback) {
    var style = document.createElement("link")
    style.type = "text/css";
    style.rel = "stylesheet";
    style.media = "all";
    if (style.readyState) {  //IE
        style.onreadystatechange = function () {
            if (style.readyState == "loaded" ||
                    style.readyState == "complete") {
                style.onreadystatechange = null;
                callback(main_callback);
            }
        };
    } else {  //Others
        style.onload = function () {
            callback(main_callback);
        };
    }
    style.href = url;
    document.getElementsByTagName("head")[0].appendChild(style);
};
window.flitsApp.showLoading = function (text, container) {
    var loader = flitsAppJquery("<div style='text-align:center'>" + text + "</div>");
    flitsAppJquery(container).toast(loader, {
        time: null
    });
};
window.flitsApp.urls = {
    js: {
        jQuery: "//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js",
    }
};
window.flitsApp.loadJquery = function (callback) {
    var call_jquery = false;

    if (!window.jQuery) {
        call_jquery = true;
    } else {
        var arr = jQuery.fn.jquery.split(".");
        if (arr[0] >= 2 && arr[1] >= 2 && arr[2] >= 4) {
            flitsAppJquery = jQuery;
            callback(jQuery);
        } else {
            call_jquery = true;
        }
    }

    if (call_jquery) {
        window.flitsApp.loadScript(window.flitsApp.urls.js.jQuery, callback, function (callback) {
            flitsAppJquery = jQuery.noConflict(!0);
            callback(flitsAppJquery);
        });
    }
};
window.flitsApp.jQueryLoaded = function (jQuery) {
    window.flitsApp.addClickEvents();
    window.flitsApp.setupPage();
    window.flitsApp.shopifySetup();
    window.flitsApp.registerPlugins();
//    window.flitsApp.recently_viewed_products_obj = new window.flitsApp.recently_viewed_products();
    window.flitsApp.resizeEvent();
    window.flitsApp.addSubmitEvents();
    window.flitsApp.addKeyEvents();
    window.flitsApp.getData();

};
window.flitsApp.setupPage = function () {
    flitsAppJquery(".flits-profile-birthdate").attr("max", window.flitsApp.getTodayDate());
    if (typeof location.hash == "undefined" || location.hash == null || location.hash.trim() == "") {
        return false;
    }
    var page = location.hash.replace('#', '');
    flitsAppJquery("[data-href='#flits-page-" + page + "']").click();

};
window.flitsApp.getTodayDate = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    return today = yyyy + '-' + mm + '-' + dd;
};
window.flitsApp.getData = function () {
    window.flitsApp.updateCredits();
};
window.flitsApp.updateCredits = function () {
    var url = "/credit/get_credit";
    url = flitsAppJquery('#flits-customer-url').val() + url;
    flitsAppJquery.ajax({
        url: url,
        method: "get",
        data: {
            token: flitsAppJquery("#flits-token").val()
        },
        success: function (res) {
            if (res.status) {
                var customer = res.customer;
                var log = customer.credit_log;
                var moneyFormat = flitsAppJquery("#flits-shop-money-format").val();
                flitsAppJquery(".flits-earned-credits").html(window.flitsApp.formatMoney(Math.abs(customer.total_earned_credits), moneyFormat).replace(/((\,00)|(\.00))$/g, ''));
                flitsAppJquery(".flits-spent-credits").html(window.flitsApp.formatMoney(Math.abs(customer.total_spent_credits), moneyFormat).replace(/((\,00)|(\.00))$/g, ''));
                flitsAppJquery(".flits-current-credits").html(window.flitsApp.formatMoney(customer.credits, moneyFormat).replace(/((\,00)|(\.00))$/g, ''));
                if (log.length > 0) {
                    flitsAppJquery.each(log, function (index, item) {
                        var $li = flitsAppJquery('#flits-credit-log-template').clone();
                        $li.attr('id', "flits-log-" + item.id);
                        var credits = item.credits;
                        if (credits > 0) {
                            credits = window.flitsApp.multilang.earned + " " + window.flitsApp.formatMoney(Math.abs(credits), moneyFormat).replace(/((\,00)|(\.00))$/g, '');
                        } else {
                            credits = window.flitsApp.multilang.spent + " " + window.flitsApp.formatMoney(Math.abs(credits), moneyFormat).replace(/((\,00)|(\.00))$/g, '');
                        }
                        $li.find(".flits-credit-col").html(credits);
                        var comment = window.flitsApp.getCreditCommentMsg(item.comment);
                        $li.find(".flits-credit-comment-col").html(comment);
                        $li.find(".flits-credit-date-col").html(item.created_at);

                        if (typeof item.metafields != "undefined" && item.metafields.length > 0) {

                            var $dropdown_div = flitsAppJquery('.flits-credit-dropdown-svg-div').clone().removeClass('flits-credit-dropdown-svg-div');
                            $li.find(".flits-credit-col").append($dropdown_div);

                            var $outer_div = $li.find(".flits-credit-details");

                            flitsAppJquery.each(item.metafields, function (index, sub_item) {
                                var $inner_div = flitsAppJquery('.flits-credit-details-template').clone().removeClass('flits-credit-details-template');
                                var credits = sub_item.credits;
                                if (credits > 0) {
                                    credits = window.flitsApp.formatMoney(Math.abs(credits), moneyFormat).replace(/((\,00)|(\.00))$/g, '');
                                } else {
                                    credits = window.flitsApp.formatMoney(Math.abs(credits), moneyFormat).replace(/((\,00)|(\.00))$/g, '');
                                }

                                $inner_div.find(".flits-product-tag-credit").html(credits);

                                var $product_title_link = flitsAppJquery("<a href='/products/" + sub_item.product_handle + "?variant=" + sub_item.variant_id + "' target='_blank'>" + sub_item.product_title + "</a>");
                                var $product_tag_link = flitsAppJquery("<a href='/search?q=" + sub_item.tag + "' target='_blank'>" + sub_item.tag + "</a>")
                                $inner_div.find(".flits-product-title").html($product_title_link);
                                $inner_div.find(".flits-product-tag").html($product_tag_link);

                                $outer_div.append($inner_div);
                            });
                            $li.append($outer_div);
                        }

                        flitsAppJquery('.flits-credit-log').append($li);
                    });
                    flitsAppJquery('.flits-credit-history-div').removeClass('flits-hidden');
                    flitsAppJquery('.flits-credit-history-empty').addClass('flits-hidden');
                } else {
                    flitsAppJquery('.flits-credit-history-empty').removeClass('flits-hidden');
                    flitsAppJquery('.flits-credit-history-div').addClass('flits-hidden');
                }
            } else {
                flitsAppJquery('.flits-credit-history-empty').removeClass('flits-hidden');
                flitsAppJquery('.flits-credit-history-div').addClass('flits-hidden');
                flitsAppJquery(".flits-earned-credits").html(window.flitsApp.formatMoney(Math.abs(00), moneyFormat).replace(/((\,00)|(\.00))$/g, ''));
                flitsAppJquery(".flits-spent-credits").html(window.flitsApp.formatMoney(Math.abs(00), moneyFormat).replace(/((\,00)|(\.00))$/g, ''));
                flitsAppJquery(".flits-current-credits").html(window.flitsApp.formatMoney((00), moneyFormat).replace(/((\,00)|(\.00))$/g, ''));
            }
        },
        error: function (res) {
//             flitsAppJquery(".flits-container").remove();
            flitsAppJquery(".flits-code-snippet").addClass('flits-hidden');
            flitsAppJquery(".flits-code-snippet").parent().find('.flits-old-code-snippet').removeClass('flits-hidden');
            flitsAppJquery(".flits-code-snippet").parent().find('.flits-old-code-snippet').show();
            switch (res.status) {
                default:
//                    flitsAppJquery("#flits-page-profile").toast(res.statusText);
                    break;

            }
        }
    });
};

window.flitsApp.getCreditCommentMsg = function (comment) {
    switch (comment) {
        case 'Loyal Customer':
            return window.flitsApp.multilang.loyal_customer;
            break;
        case 'Repeat customer':
            return window.flitsApp.multilang.repeat_customer;
            break;
        case 'Fault in product':
            return window.flitsApp.multilang.fault_in_product;
            break;
        case 'Canceled order first time by customer':
            return window.flitsApp.multilang.canceled_order_first_time_by_customer;
            break;
        case 'Delay in delivery time':
            return window.flitsApp.multilang.delay_in_delivery_time;
            break;
        case 'Registration Credit':
            return window.flitsApp.multilang.registration_credit;
            break;
        case 'Subscribe Credit':
            return window.flitsApp.multilang.subscribe_credit;
            break;
        case 'First Order Credit':
            return window.flitsApp.multilang.first_order_credit;
            break;
        default:
            if (comment && comment.includes('Spent in')) {
                var additional_comment = '';
                var is_pos_comment = false;
                if (comment.indexOf('Order through POS.') != -1) {
                  comment = comment.replace('Order through POS.', '');
                  is_pos_comment = true;
                }	
              	
                var split_by = " - ";
                if(comment.includes(split_by)){
                  var result_comment = comment.split(split_by);
                  comment = result_comment[0];
                  additional_comment = split_by + result_comment[1];
                }

                comment = comment.replace('Spent in', '');
                comment = comment.replace('Order.', '');
                var order_number = comment.trim();

                comment = window.flitsApp.multilang.spent_in_order;
                if (is_pos_comment) {
                  comment = window.flitsApp.multilang.spent_in_order_through_pos;
                }
                comment = comment.replace('-1-1', order_number);

                return comment + additional_comment;
            }
            return comment;
            break;
    }
};

window.flitsApp.shopifySetup = function () {
    if (Shopify) {
        if (Shopify.CountryProvinceSelector) {
            new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
                hideElement: 'AddressProvinceContainerNew'
            });
        }
    }
};
window.flitsApp.addKeyEvents = function () {
    flitsAppJquery(document).on('change', '#flits-form-change-password input[name=password]', window.flitsApp.validatePassword);
    flitsAppJquery(document).on('keyup', '#flits-form-change-password input[name=password_confirmation]', window.flitsApp.validatePassword);
};
window.flitsApp.validatePassword = function () {
    var password = flitsAppJquery("#flits-form-change-password").find('input[name=password]')[0];
    var confirm_password = flitsAppJquery("#flits-form-change-password").find('input[name=password_confirmation]')[0];
    if (password.value !== confirm_password.value) {
        confirm_password.setCustomValidity(window.flitsApp.multilang.password_not_match);
    } else {
        confirm_password.setCustomValidity('');
    }
};
window.flitsApp.setupContainer = function () {
    if (flitsAppJquery(window).width() < 992) {
        flitsAppJquery(".flits-nav-bar").css('height', 'auto');
        flitsAppJquery(".flits-pages").parent().css('height', 'auto');
        flitsAppJquery(".flits-nav").css('min-height', 'auto');
        flitsAppJquery(".flits-pages").css('min-height', 'auto');
    } else {
        var nav_height = flitsAppJquery(".flits-nav-bar .flits-list-group").outerHeight();
        var pages_height = flitsAppJquery(".flits-pages [data-type='page']:not(.flits-hidden)").outerHeight();
        var height = Math.max(nav_height, pages_height);
        height += 20;
        flitsAppJquery(".flits-nav-bar").css('height', height);
        flitsAppJquery(".flits-pages").parent().css('height', height);
        flitsAppJquery(".flits-nav").css('min-height', height);
        flitsAppJquery(".flits-pages").css('min-height', height);
    }
};
window.flitsApp.resizeEvent = function () {
    setInterval(window.flitsApp.setupContainer, 1);
    window.flitsApp.setupContainer();
    flitsAppJquery(window).resize(window.flitsApp.setupContainer);
};
window.flitsApp.addToCart = function (data, suc_callback, error_callback) {
    var params = {
        type: 'POST',
        url: '/cart/add.js',
        data: data,
        dataType: 'json',
        success: function (line_item) {
            if (typeof suc_callback == "function") {
                suc_callback(line_item);
            }
        },
        error: function (res) {
            if (typeof error_callback == "function") {
                error_callback(res);
            }
        }
    };
    flitsAppJquery.ajax(params);
}
window.flitsApp.addSubmitEvents = function () {
    flitsAppJquery("[data-type='flits']").attr('disabled', false);
    flitsAppJquery("#flits-form-profile").submit(function (event) {
        event.preventDefault();
        var $form = flitsAppJquery(this);
        var data = $form.serializeArray();
        var url = flitsAppJquery('#flits-customer-url').val() + "/" + $form.attr('data-action');
        var method = $form.attr('method');
        data.push({name: "token", value: flitsAppJquery("#flits-token").val()});
        flitsApp.showLoading(window.flitsApp.multilang.save_details, flitsAppJquery("#flits-page-profile"));
        flitsAppJquery.ajax({
            url: url,
            method: method,
            data: data,
            success: function (res) {
                if (res.status) {
                    flitsAppJquery("#flits-page-profile").toast(window.flitsApp.multilang.saved_successfully);
                    flitsAppJquery(".flits-hide-profile-edit").each(function (index, item) {
                        flitsAppJquery(item).html(flitsAppJquery(item).next("input").val());
                    });
                    var gender = $form.find("select[name=gender] option:selected").html();
                    $form.find("select[name=gender]").closest(".flits-row").find('.flits-profile-gender-label').html(gender);
                    flitsAppJquery(".flits-profile-cancel-button").click();
                } else {
                    flitsAppJquery("#flits-page-profile").toast(window.flitsApp.multilang.something_went_wrong);
                }

            },
            error: function (res) {
                switch (res.status) {
                    default:
                        flitsAppJquery("#flits-page-profile").toast(res.statusText);
                        break;

                }
            }
        });

    });
    flitsAppJquery("#flits-form-change-password").submit(function (event) {
        event.preventDefault();
        var $form = flitsAppJquery(this);
        var data = $form.serializeArray();
        var url = flitsAppJquery('#flits-customer-url').val() + "/" + $form.attr('data-action');
        var method = $form.attr('method');
        data.push({name: "token", value: flitsAppJquery("#flits-token").val()});
        flitsApp.showLoading(window.flitsApp.multilang.updating_password, flitsAppJquery('#flits-page-security'));
        flitsAppJquery.ajax({
            url: url,
            method: method,
            data: data,
            success: function (res) {
                if (res.status) {
                    flitsAppJquery('#flits-page-security').toast(window.flitsApp.multilang.password_updated_successfully);

                    var $login_form = flitsAppJquery('<form/>');
                    $login_form.attr('action', '/account/login');
                    $login_form.attr('method', 'post');
                    $login_form.append('<input type="email" name="customer[email]" value="' + flitsAppJquery("#flits-form-profile").find("input[name=email]").val() + '">');
                    $login_form.append('<input type="hidden" name="checkout_url" value="' + location.href + '">');
                    $login_form.append('<input type="password" name="customer[password]" value="' + flitsAppJquery("#flits-form-change-password").find("input[name=password]").val() + '">');
                    flitsAppJquery('body').append($login_form);
                    $form[0].reset();
                    $login_form.submit();

//                    flitsAppJquery.ajax({
//                        url: "/account/login",
//                        method: "post",
//                        data: {
//                            customer: {
//                                email: flitsAppJquery("#flits-form-profile").find("input[name=email]").val(),
//                                password: flitsAppJquery("#flits-form-change-password").find("input[name=password]").val(),
//                            }
//                        },
//                        success: function (res) {
//                            console.log(res);
//                        },
//                        error: function (res) {
//                            console.log(res);
//                        },
//                    });
                } else {
                    flitsAppJquery('#flits-page-security').toast(res.error, {
                        time: 2000
                    });
                }

            },
            error: function (res) {
//                console.log(res);
                switch (res.status) {
                    default:
                        flitsAppJquery('#flits-page-security').toast(res.statusText);
                        break;

                }
            }
        });

    });
    flitsAppJquery(".flits-new-address-form form").submit(function (event) {
        event.preventDefault();
        var $form = flitsAppJquery(this);
        var form_type = $form.find("#form_type").val();
        var data = $form.serializeArray();
        var url = $form.attr('action');
        url = flitsAppJquery('#flits-customer-url').val() + url;
        var method = $form.attr('method');
        data.push({name: "token", value: flitsAppJquery("#flits-token").val()});
        if (form_type == "edit") {
            method = "PUT";
            data.push({name: "_method", value: "PUT"});
            flitsApp.showLoading(window.flitsApp.multilang.updating_address, flitsAppJquery('#flits-page-address'));
        } else {
            flitsApp.showLoading(window.flitsApp.multilang.adding_new_address, flitsAppJquery('#flits-page-address'));
        }

        flitsAppJquery.ajax({
            url: url,
            method: method,
            data: data,
            success: function (res) {
                if (res.status) {
                    var adrs = res.address.data;
                    var $li = flitsAppJquery("#flits-customer-address-template").clone();
                    if (form_type == "edit") {
                        $li = flitsAppJquery("li[data-id='" + adrs.id + "']");
                    }
                    if (adrs.last_name == null) {
                        adrs.last_name = "";
                    }
                    if (adrs.first_name == null) {
                        adrs.first_name = "";
                    }
                    if (adrs.address1 == null) {
                        adrs.address1 = "";
                    }
                    if (adrs.address2 == null) {
                        adrs.address2 = "";
                    }
                    if (adrs.zip == null) {
                        adrs.zip = "";
                    }
                    if (adrs.phone == null) {
                        adrs.phone = "";
                    }
                    if (adrs.city == null) {
                        adrs.city = "";
                    }
                    if (adrs.country == null) {
                        adrs.country = "";
                    }
                    if (adrs.province == null) {
                        adrs.province = "";
                    }
                    $li.attr("data-id", adrs.id);
                    $li.attr("data-first-name", adrs.first_name);
                    $li.attr("data-last-name", adrs.last_name);
                    $li.attr("data-address1", adrs.address1);
                    $li.attr("data-address2", adrs.address2);
                    $li.attr("data-company", adrs.address2);
                    $li.attr("data-zip", adrs.zip);
                    $li.attr("data-phone", adrs.phone);
                    $li.attr("data-city", adrs.city);
                    $li.attr("data-country", adrs.country);
                    $li.attr("data-province", adrs.province);
                    if (adrs.default) {
                        flitsAppJquery('.flits-addresses-ul li').attr('data-default', 'false');
                    }
                    $li.attr("data-default", ((adrs.default) ? "true" : "false"));
                    $li.find(".flits-address-name-row .flits-content")
                            .attr("title", adrs.first_name + " " + adrs.last_name)
                            .html(adrs.first_name + " " + adrs.last_name);
                    $li.find(".flits-company-row .flits-content")
                            .attr("title", adrs.company)
                            .html(adrs.company);
                    $li.find(".flits-address1-row .flits-content")
                            .attr("title", adrs.address1)
                            .html(adrs.address1);
                    $li.find(".flits-address2-row .flits-content")
                            .attr("title", adrs.address2)
                            .html(adrs.address2);
                    $li.find(".flits-city-row .flits-content")
                            .attr("title", adrs.zip + " " + adrs.city + " " + adrs.province_code)
                            .html(adrs.zip + " " + adrs.city + " " + adrs.province_code);
                    $li.find(".flits-country-row .flits-content")
                            .attr("title", adrs.country_name)
                            .html(adrs.country_name);
                    $li.find(".flits-edit-address-btn")
                            .attr("data-form-id", adrs.id);
                    $li.find(".flits-remove-address-btn")
                            .attr("data-form-id", adrs.id);
                    if (adrs.default) {
                        flitsAppJquery(".flits-addresses-ul .flits-address-default .flits-address .flits-row:first strong").html("&nbsp;");
                        $li.find(".flits-address .flits-row:first strong").html("Default");
                        $li.addClass("flits-address-default");
                        flitsAppJquery(".flits-addresses-ul").prepend($li);
                    } else {
                        if (form_type == "edit") {

                        } else {
                            flitsAppJquery(".flits-addresses-ul .flits-new-address-li").before($li);
                        }
                    }
                    if (form_type == "edit") {
                        flitsAppJquery('#flits-page-address').toast(window.flitsApp.multilang.address_updated_successfully, {
                            time: 2000
                        });
                    } else {
                        flitsAppJquery('#flits-page-address').toast(window.flitsApp.multilang.address_added_successfully, {
                            time: 2000
                        });
                    }

                    flitsAppJquery(".flits-new-address-cancel-btn").click();
                    $form[0].reset();
                } else {
                    flitsAppJquery('#flits-page-address').toast(res.error, {
                        time: 2000
                    });
                }

            },
            error: function (res) {
//                console.log(res);
                switch (res.status) {
                    default:
                        flitsAppJquery('#flits-page-address').toast(res.statusText);
                        break;

                }
            }
        });
    });
};
window.flitsApp.addClickEvents = function () {
    flitsAppJquery(document).on('click', ".flits-credit-dropdown", function (event) {
        event.preventDefault();
        var flits_credit_log_li = flitsAppJquery(this).closest("li");
        var flits_credit_details_div = flitsAppJquery(this).closest("li").find(".flits-credit-details");

        if (flits_credit_details_div.is(":visible")) {
            flitsAppJquery(this).removeClass('flits-credit-dropdown-rotate');
            flits_credit_log_li.removeClass('flits-bordered-div');
            flits_credit_log_li.find('.flits-credit-log-with-dropdown').removeClass('flits-bold-text');
        } else {
            flitsAppJquery(this).addClass('flits-credit-dropdown-rotate');
            flits_credit_log_li.addClass('flits-bordered-div');
            flits_credit_log_li.find('.flits-credit-log-with-dropdown').addClass('flits-bold-text');
        }

        flits_credit_details_div.slideToggle();

    });

    flitsAppJquery(document).on('click', ".flits-list-group-item[data-toggle='page']", function (event) {
        event.preventDefault();
        var target = flitsAppJquery(this).attr("data-href");
        flitsAppJquery('.flits-pages').find("[data-type='page']").addClass('flits-hidden');
        flitsAppJquery(target).removeClass('flits-hidden');
        location.hash = target.replace('#flits-page-', '');
        flitsAppJquery(this).parent().find(".active").removeClass("active");
        flitsAppJquery(this).addClass("active");
        flitsAppJquery(".flits-page").addClass("flits-display-content");
//        location.hash = "";
    });
    flitsAppJquery(document).on('click', ".flits-profile-edit-button", function (event) {
        flitsAppJquery(".flits-edit-button-row").addClass("flits-hidden");
        flitsAppJquery(".flits-save-button-row").removeClass("flits-hidden");
        flitsAppJquery(".flits-hide-profile-edit").addClass("flits-hidden");
        flitsAppJquery(".flits-hide-profile-cancel").removeClass("flits-hidden");
    });
    flitsAppJquery(document).on('click', ".flits-profile-cancel-button", function (event) {
        flitsAppJquery(".flits-edit-button-row").removeClass("flits-hidden");
        flitsAppJquery(".flits-save-button-row").addClass("flits-hidden");
        flitsAppJquery(".flits-hide-profile-edit").removeClass("flits-hidden");
        flitsAppJquery(".flits-hide-profile-cancel").addClass("flits-hidden");
    });
    flitsAppJquery(document).on('click', ".flits-return-to-menu", function (event) {
        flitsAppJquery(".flits-page").removeClass("flits-display-content");
    });
    flitsAppJquery(document).on('click', ".flits-new-address-btn", function (event) {
        flitsAppJquery(".flits-new-address-btn").addClass("flits-hidden");
        flitsAppJquery(".flits-new-address-btn").parent().find(".flits-new-address-cancel-btn").removeClass("flits-hidden");
        flitsAppJquery(".flits-addresses-row").addClass("flits-hidden");
        flitsAppJquery(".flits-new-address-form").removeClass("flits-hidden");
        flitsAppJquery(".flits-new-address-form form").find("#form_type").val("new");
        flitsAppJquery(".flits-new-address-form form").attr("action", "/account/addresses");
        flitsAppJquery(".flits-new-address-form form").find("button[type=submit]").html(flitsAppJquery(".flits-new-address-form form").find("button[type=submit]").attr("data-add-text"));
        flitsAppJquery(".flits-new-address-form form .flits-address-form-title").html(flitsAppJquery(".flits-new-address-form form .flits-address-form-title").attr("data-original-text"));
        flitsAppJquery(".flits-new-address-form form")[0].reset();
    });
    flitsAppJquery(document).on('click', ".flits-new-address-cancel-btn", function (event) {
        flitsAppJquery(".flits-new-address-btn").removeClass("flits-hidden");
        flitsAppJquery(".flits-new-address-btn").parent().find(".flits-new-address-cancel-btn").addClass("flits-hidden");
        flitsAppJquery(".flits-addresses-row").removeClass("flits-hidden");
        flitsAppJquery(".flits-new-address-form").addClass("flits-hidden");
        flitsAppJquery(".flits-new-address-form form")[0].reset();
    });
    flitsAppJquery(document).on('click', '.flits-remove-address-btn', function () {
        var $el = flitsAppJquery(this);
        var formId = $el.data('form-id');
        var confirmMessage = $el.data('confirm-message');

        // eslint-disable-next-line no-alert
        if (confirm(confirmMessage || window.flitsApp.multilang.delete_address)) {
            var url = '/account/addresses/' + formId;
            url = flitsAppJquery('#flits-customer-url').val() + url;
            flitsApp.showLoading(window.flitsApp.multilang.deleting_address, flitsAppJquery('#flits-page-address'));
            flitsAppJquery.ajax({
                url: url,
                method: "DELETE",
                data: {
                    token: flitsAppJquery("#flits-token").val(),
                    _mehtod: "DELETE"
                },
                success: function (res) {
                    if (res.status) {
                        $el.closest("li").remove();
                        window.flitsApp.setupContainer();
                        flitsAppJquery('#flits-page-address').toast(window.flitsApp.multilang.address_deleted_successfully, {
                            time: 2000
                        });
                    } else {
                        flitsAppJquery('#flits-page-address').toast(res.error, {
                            time: 2000
                        });
                    }

                },
                error: function (res) {
//                console.log(res);
                    switch (res.status) {
                        default:
                            flitsAppJquery('#flits-page-address').toast(res.statusText);
                            break;

                    }
                }
            });
        }
    });
    flitsAppJquery(document).on('click', '.flits-edit-address-btn', function () {
        var $li = flitsAppJquery(this).closest("li");
        var $form = flitsAppJquery(".flits-new-address-form form");
        $form.find("#AddressFirstNameNew").val($li.attr("data-first-name"));
        $form.find("#AddressLastNameNew").val($li.attr("data-last-name"));
        $form.find("#AddressAddress1New").val($li.attr("data-address1"));
        $form.find("#AddressAddress2New").val($li.attr("data-address2"));
        $form.find("#AddressCompanyNew").val($li.attr("data-company"));
        $form.find("#AddressZipNew").val($li.attr("data-zip"));
        $form.find("#AddressPhoneNew").val($li.attr("data-phone"));
        $form.find("#AddressCityNew").val($li.attr("data-city"));
        $form.find("#AddressCountryNew").val($li.attr("data-country"));
        $form.find("#AddressProvinceNew").val($li.attr("data-province"));
        $form.find("#address_default_address_new").attr("checked", ($li.attr("data-default") == "true") ? true : false);
        $form.find("#form_type").val("edit");
        $form.find(".flits-address-form-title").html(window.flitsApp.multilang.edit_address);
        $form.attr("action", "/account/addresses" + "/" + flitsAppJquery(this).attr("data-form-id"));
        $form.find("button[type=submit]").html($form.find("button[type=submit]").attr("data-update-text"));
        flitsAppJquery(".flits-new-address-btn").addClass("flits-hidden");
        flitsAppJquery(".flits-new-address-btn").parent().find(".flits-new-address-cancel-btn").removeClass("flits-hidden");
        flitsAppJquery(".flits-addresses-row").addClass("flits-hidden");
        flitsAppJquery(".flits-new-address-form").removeClass("flits-hidden");
    });
    flitsAppJquery(document).on('click', '.flits-order-details-btn', function () {
        if (flitsAppJquery(this).closest('.flits-order-row').find(".flits-order-address-details-row").is(":visible")) {
            flitsAppJquery(this).html(flitsAppJquery(this).attr('data-show-text')); //if visible then it will be going to hide
        } else {
            flitsAppJquery(this).html(flitsAppJquery(this).attr('data-hide-text')); // if hide then it will be going to show
        }
        flitsAppJquery(this).closest('.flits-order-row').find(".flits-order-address-details-row").slideToggle();
    });
    flitsAppJquery(document).on('click', '.flits-order-re-order-btn', function () {
        var items = window.flits_orders[flitsAppJquery(this).attr('data-target')];
//        var items = flitsAppJquery.parseJSON(flitsAppJquery(this).next(".flits-order-line-items").html());
        var btn = this;
        flitsAppJquery(this).closest(".flits-row").toast(window.flitsApp.multilang.adding_items_to_cart, {
            position: "bottomLeft",
            time: null
        });
        window.flitsApp.not_found_products = 0;
        window.flitsApp.addToCartSync(0, items, btn);
    });
};
window.flitsApp.addToCartSync = function (index, items, btn) {
    var item = items[index];
    var data = {
        id: item.variant_id,
        quantity: item.quantity
    };


    if (index + 1 == items.length) {
        suc_callback = function (res) {
            if (typeof res.status !== "undefined" && res.status == 404) {
                window.flitsApp.not_found_products += 1;
            }

            switch (window.flitsApp.not_found_products) {
                case 0:
                    flitsAppJquery(btn).closest(".flits-row").toast(window.flitsApp.multilang.items_added_to_cart, {
                        position: "bottomLeft",
                        time: 1000
                    });
                    location.href = "/cart";
                    break;
                case 1:
                    if (items.length == 1) {
                        flitsAppJquery(btn).closest(".flits-row").toast(window.flitsApp.multilang.product_is_deleted_from_shop, {
                            position: "bottomLeft",
                            time: 1000
                        });
                        break;
                    } else {
                        flitsAppJquery(btn).closest(".flits-row").toast(window.flitsApp.multilang.single_product_deleted, {
                            position: "bottomLeft",
                            time: 1000
                        });
                        location.href = "/cart";
                    }
                default:
                    if (items.length == window.flitsApp.not_found_products) {
                        flitsAppJquery(btn).closest(".flits-row").toast(window.flitsApp.multilang.all_products_deleted, {
                            position: "bottomLeft",
                            time: 1000
                        });
                        break;
                    } else {
                        flitsAppJquery(btn).closest(".flits-row").toast(window.flitsApp.multilang.some_products_deleted, {
                            position: "bottomLeft",
                            time: 1000
                        });
                        location.href = "/cart";
                    }
                    break
            }

        };
        window.flitsApp.addToCart(data, suc_callback, suc_callback);
    } else {
        var suc_callback = function () {
            window.flitsApp.addToCartSync(index + 1, items, btn);
        };
        var error_callback = function (res) {
            if (res.status == 404) {
                window.flitsApp.not_found_products += 1;
            }
            window.flitsApp.addToCartSync(index + 1, items, btn);
        };
        window.flitsApp.addToCart(data, suc_callback, error_callback);
    }

};
window.flitsApp.registerPlugins = function () {
    (function ($) {
        $.fn.extend({
            toast: function (message, options) {
                var defaultContainer = this;
                var defaults = {
                    position: "bottomRight",
                    className: "",
                    hideOlderMsgs: true,
                    time: 1000,
                    container: $(defaultContainer),
                    completeCallback: function () {}
                };
                options = $.extend(defaults, options);
                var position = options.position;
                var className = options.className;
                var hideOlderMsgs = options.hideOlderMsgs;
                var displayLength = options.time;
                var completeCallback = options.completeCallback;
                var msg_container = options.container;
                $(msg_container).css({
                    position: "relative"
                });
                var container = $(msg_container).find('#flits-toast-container-' + position);
                // Create toast container if it does not exist
                if (container.length <= 0) {
                    // create notification container
                    container = document.createElement('div');
                    container.id = 'flits-toast-container-' + position;
                    container.className = position;
                    $(msg_container).append(container);
                }

                // Select and append toast
                var newToast = createToast(message);
                // only append toast if message is not undefined
                if (message) {
                    if (hideOlderMsgs) {
                        $(container).html('');
                    }
                    $(container).append(newToast);
                }
                newToast.style.top = '35px';
                newToast.style.opacity = 0;
                flitsAppJquery(newToast).animate({"top": "0px", opacity: 1}, 100);
                var timeLeft = displayLength;
                var counterInterval;
                if (timeLeft != null) {
                    counterInterval = setInterval(function () {
                        if (newToast.parentNode === null)
                            window.clearInterval(counterInterval);
                        if (!newToast.classList.contains('panning')) {
                            timeLeft -= 20;
                        }

                        if (timeLeft <= 0) {
                            flitsAppJquery(newToast).animate({"opacity": 0, marginTop: '-40px'}, 100, function () {
                                if (typeof (completeCallback) === "function")
                                    completeCallback();
                                this.parentNode.removeChild(this);
                            });
                            window.clearInterval(counterInterval);
                        }
                    }, 20);
                }
                function createToast(html) {
                    var toast = document.createElement('div');
                    toast.classList.add('flits-toast');
                    if (className) {
                        var classes = className.split(' ');
                        for (var i = 0, count = classes.length; i < count; i++) {
                            toast.classList.add(classes[i]);
                        }
                    }
                    if (typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName === "string"
                            ) {
                        toast.appendChild(html);
                    } else if (html instanceof flitsAppJquery) {
                        toast.appendChild(html[0]);
                    } else {
                        toast.innerHTML = html;
                    }

                    return toast;
                }
            }
        });
    })(flitsAppJquery);
};
if (!window.jQuery && !window.flitsAppJquery) {
    window.flitsAppJquery = null;
    window.flitsApp.loadJquery(window.flitsApp.jQueryLoaded);
} else {
    if (window.flitsAppJquery) {
    } else {
        window.flitsApp.loadJquery(window.flitsApp.jQueryLoaded);
    }
}
