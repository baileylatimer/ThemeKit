
if (!window.flitsApp || typeof window.flitsApp == "undefined") {
    window.flitsApp = {};
}

window.flitsApp.run_after_jquery = function (callback) {
    var callback_interval = setInterval(function () {
        if (typeof flitsAppJquery == "undefined") {

        } else {
            clearInterval(callback_interval);
            if (typeof callback == "function") {
                callback();
            }
        }
    }, 1000)
};

window.flitsApp.referFriend = function () {
    var that = this;
    this.getReferralData = function () {
        //     flitsApp.showLoading(window.flitsApp.multilang_refer_friend.refer_page_getting_details, flitsAppJquery("#flits-page-refer-friend"));
        var get_referral_data_url = "/refer_friend/get_referral_data";
        get_referral_data_url = flitsAppJquery('#flits-customer-url').val() + get_referral_data_url;

        flitsAppJquery.ajax({
            url: get_referral_data_url,
            method: "get",
            data: {
                token: flitsAppJquery("#flits-token").val()
            },
            success: function (res) {
                if (res.status) {
                    flitsAppJquery('.flits-loading-div').hide();
                    flitsAppJquery('.flits-refer-friend-content').show();
                    //           flitsAppJquery("#flits-page-refer-friend").toast(window.flitsApp.multilang_refer_friend.refer_page_details_successfully_get);
                    var moneyFormat = flitsAppJquery("#flits-shop-money-format").val();
                    var customer = res.customer;
                    var credit_log = res.customer.credit_log;

                    if (customer.referral_code != '') {
                        //             flitsAppJquery('.flits-referrer-code').val(customer.referral_code);
                        flitsAppJquery('.flits-refferal-code-div').html(customer.referral_code);
                    } else {
                        flitsAppJquery('.flits-referrer-code').val(window.flitsApp.multilang_refer_friend.referral_code_not_available);
                        flitsAppJquery('.flits-referrer-code-copy-btn-div').addClass('flits-hidden');
                    }
                    if (res.refer_by != '') {
                        flitsAppJquery('.flits-referee-inner-div').addClass('flits-hidden');
                        flitsAppJquery('.flits-refer-by').removeClass('flits-hidden');
                        flitsAppJquery('.flits-refer-by-text').html(window.flitsApp.multilang_refer_friend.you_are_referred_by + " " + res.refer_by);
                    }

                    var total_earned_credits = 0;
                    if (credit_log.length > 0) {
                        flitsAppJquery.each(credit_log, function (index, item) {

                            var $li = flitsAppJquery('#flits-refer-program-credit-log-template').clone();
                            $li.attr('id', "flits-log-" + item.id);

                            var credits = item.credits;
                            total_earned_credits += credits
                            credits = window.flitsApp.multilang.earned + " " + window.flitsApp.formatMoney(Math.abs(credits), moneyFormat).replace(/((\,00)|(\.00))$/g, '');

                            $li.find(".flits-referral-customer-credit-col").html(credits);

                            var referrer_name = window.flitsApp.multilang_refer_friend.customer_deleted;
                            var referrer_email = '--';
                            if (item['referrer_customer'] != null) {
                                referrer_name = item['referrer_customer'].name;
                                referrer_email = item['referrer_customer'].email;
                            }
                            $li.find(".flits-referral-customer-name-col").html(referrer_name);
                            $li.find(".flits-referral-customer-email-col").html(referrer_email).attr("title", referrer_email);
                            $li.find(".flits-referral-customer-credit-date-col").html(item.created_at);

                            flitsAppJquery('.flits-refer-program-credit-log').append($li);
                        });
                        flitsAppJquery('.flits-refer-program-credit-history-div').removeClass('flits-hidden');
                        flitsAppJquery('.flits-refer-program-credit-history-empty').addClass('flits-hidden');
                    } else {
                        flitsAppJquery('.flits-refer-program-credit-history-empty').removeClass('flits-hidden');
                        flitsAppJquery('.flits-refer-program-credit-history-div').addClass('flits-hidden');
                    }
                    total_earned_credits = window.flitsApp.formatMoney(Math.abs(total_earned_credits), moneyFormat).replace(/((\,00)|(\.00))$/g, '');
                    flitsAppJquery(".flits-refer-program-total-credits").html(total_earned_credits);
                } else {
                    var error = '';
                    switch (res.error_code) {
                        case 2:
                        case 3:
                            flitsAppJquery('.flits-refer-friend-content').hide();
                            flitsAppJquery('.flits-loading-div').show();
                            error = window.flitsApp.multilang_refer_friend.loading_message;
                            flitsAppJquery('.flits-loading-message').html(error);
                            setTimeout(function () {
                                that.getReferralData();
                            }, 2000);
                            break;
                        default:
                            flitsAppJquery('.flits-nav a[data-href="#flits-page-refer-friend"]').remove();
                            flitsAppJquery('#flits-page-refer-friend').remove();
                            break;
                    }
                }
            },
            error: function (res) {
                switch (res.status) {
                    default:
                        flitsAppJquery("#flits-page-refer-friend").toast(res.statusText);
                        break;
                }
            }
        });
    };
    this.copyReferrerCode = function () {
        flitsAppJquery(".flits-referrer-div").toast(window.flitsApp.multilang_refer_friend.referral_code_copied);
        var referrer_message_text = flitsAppJquery(".flits-referral-program-invitation-message-text").text();
        var referrer_code = flitsAppJquery(".flits-refferal-code-div").html();
        referrer_message_text = flitsAppJquery.trim(referrer_message_text.replace("##referral_code##", referrer_code).replace("##signup_url##", window.flitsApp.multilang_refer_friend.signup_url));
        var $temp = flitsAppJquery("<input>");
        flitsAppJquery("body").append($temp);
        $temp.val(referrer_message_text).select();
        document.execCommand("copy");
        $temp.remove();
    };
    this.sendReferRequest = function () {
        flitsApp.showLoading(window.flitsApp.multilang_refer_friend.refer_friend_loading, flitsAppJquery(".flits-referee-div"));
        flitsAppJquery(".flits-refer-friend-error-div").addClass('flits-hidden');
        flitsAppJquery(".flits-refer-loader").removeClass('flits-hidden');
        var refer_friend_code = flitsAppJquery("#flits-refer-friend-code").val();
        if (refer_friend_code != '') {
            var refer_request_url = "/refer_friend/send_refer_request";
            refer_request_url = flitsAppJquery('#flits-customer-url').val() + refer_request_url;
            flitsAppJquery.ajax({
                url: refer_request_url,
                method: "POST",
                data: {
                    token: flitsAppJquery("#flits-token").val(),
                    refer_friend_code: refer_friend_code,
                },
                success: function (res) {
                    flitsAppJquery(".flits-refer-loader").addClass('flits-hidden');
                    if (res.status) {
                        flitsAppJquery(".flits-referee-div").toast(window.flitsApp.multilang_refer_friend.successfully_refer_friend);
                        var refer_by = res.data.inviter.name;
                        if (refer_by != -1) {
                            flitsAppJquery('.flits-enter-referral-code-label').addClass('flits-hidden');
                            flitsAppJquery('.flits-referee-inner-div').addClass('flits-hidden');
                            flitsAppJquery('.flits-refer-by').removeClass('flits-hidden');
                            flitsAppJquery('.flits-refer-by-text').html(window.flitsApp.multilang_refer_friend.you_are_referred_by + " " + refer_by);
                        }
                    } else {
                        flitsAppJquery(".flits-refer-friend-error-div").removeClass('flits-hidden');
                        var error = '';
                        switch (res.error_code) {
                            case 1:
                                error = window.flitsApp.multilang_refer_friend.you_can_not_referred_yourself;
                                break;
                            case 2:
                                error = window.flitsApp.multilang_refer_friend.something_went_wrong;
                                break;
                            case 3:
                                error = window.flitsApp.multilang_refer_friend.invalid_referral_code;
                                break;
                            case 4:
                                error = window.flitsApp.multilang_refer_friend.refer_program_not_active;
                                break;
                            default:
                                error = window.flitsApp.multilang_refer_friend.something_went_wrong;
                                break;
                        }
                        flitsAppJquery(".flits-referee-div").toast(error);
                    }
                },
                error: function (res) {
                    switch (res.status) {
                        default:
                            //               flitsAppJquery("#flits-page-refer-friend").toast(res.statusText);
                            break;
                    }
                }
            });

        } else {
            flitsAppJquery(".flits-referee-div").toast(window.flitsApp.multilang_refer_friend.referral_code_is_required);
            flitsAppJquery(".flits-refer-loader").addClass('flits-hidden');
            flitsAppJquery(".flits-refer-friend-error-div").removeClass('flits-hidden');
        }

    };
    this.getReferralData();
    flitsAppJquery(document).on('click', ".flits-send-refer-request-btn", function (event) {
        that.sendReferRequest();
    });
    flitsAppJquery(document).on('click', ".flits-copy-referral-code-btn", function (event) {
        that.copyReferrerCode();
    });
};

window.flitsApp.append_anchor_div = function (appent_at) {
    if (location.pathname == "/account") {
        var pages_div = document.querySelector('.flits-pages');

        var div_anchor = document.querySelector('.flits-refer-friend .flits-anchor a');
        var div_div = document.querySelector('.flits-refer-friend .flits-div div');

        if (div_anchor) {

            var list_group_length = document.querySelector('.flits-list-group').children.length;
            var list_group = document.querySelector('.flits-list-group');

            if (appent_at >= list_group_length)
            {
                list_group.insertBefore(div_anchor, list_group.children[list_group_length]);
            } else {
                list_group.insertBefore(div_anchor, list_group.children[appent_at]);
            }
        }
        if (div_div) {
            if (pages_div) {
                pages_div.append(div_div);
            }
        }
    }
    window.flitsApp.run_after_jquery(window.flitsApp.referFriend);
};

if (window.flitsApp.multilang_refer_friend.refer_friend_rule_on && window.flitsApp.multilang_refer_friend.refer_friend_rule_on == 1) {
    window.flitsApp.append_anchor_div(4);
    //   window.flitsApp.run_after_jquery(window.flitsApp.referFriend);
}
