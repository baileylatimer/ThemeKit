
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

window.flitsApp.getShipmentDetails = function () {
    var url = "/get_order_shipment";
    url = flitsAppJquery('#flits-order-shipment-url').val() + url;

    window.flitsApp.tracking_details = [];
    window.flitsApp.tracking_numbers = [];

    flitsAppJquery("a.flits-order-tracking").each(function (index, item) {
        var tracking_number = flitsAppJquery(item).attr('data-tracking-number');
        var order_id = flitsAppJquery(item).attr('data-order-id');
        var line_item_id = flitsAppJquery(item).attr('data-line-item-id');
        var order_items_row = flitsAppJquery(item).closest('.flits-order-items-row');
        var total_count_line_items = flitsAppJquery(order_items_row).children('.flits-order-item').length;
        var total_tracking_numbers = flitsAppJquery(order_items_row).find('.flits-order-tracking[data-tracking-number=' + tracking_number + ']').length;
        if (window.flitsApp.tracking_details[tracking_number] == undefined || window.flitsApp.tracking_details[tracking_number].type == "line_item") {
            window.flitsApp.tracking_numbers.push(tracking_number);
        }

        if (total_count_line_items == total_tracking_numbers) {
            flitsAppJquery('[data-append-tracking-id="' + order_id + '"]').find('.flits-order-track-content').removeClass('flits-hidden');
            window.flitsApp.tracking_details[tracking_number] = {
                type: "order",
                id: order_id
            };
        } else {
            flitsAppJquery('[data-append-tracking-id="' + order_id + '"]').addClass('flits-hidden');
            flitsAppJquery(order_items_row).find('.flits-order-item').find('.flits-order-track-content').removeClass('flits-hidden')
            window.flitsApp.tracking_details[tracking_number] = {
                type: "line_item",
                id: line_item_id
            };
        }

    });

    if (flitsAppJquery("#flits-order-tracking-paid").val() == 1 && flitsAppJquery("#flits-order-tracking-enable").val() == 1) {

        flitsAppJquery.each(window.flitsApp.tracking_numbers, function (index, tracking_number) {
            window.flitsApp.setOrderTracking({
                display: "tracking_status",
                is_paid: true,
                order_tracking_data: {
                    tracking_number: tracking_number,
                    tracking_status: "Ordered"
                },
                status: true
            }, window.flitsApp.tracking_details);
            flitsAppJquery.ajax({
                url: url,
                method: "POST",
                data: {
                    token: flitsAppJquery("#flits-token").val(),
                    tracking_number: tracking_number,
                },
                success: function (res) {
                    if (res.status) {
                        if (res.order_tracking_data != null && res.display == 'tracking_status') {
                            var result_data = res;
                            window.flitsApp.setOrderTracking(result_data, window.flitsApp.tracking_details);

                        } else if (res.display == 'tracking_button') {

                            tracking_div = window.flitsApp.setOrderTrackingButton(tracking_number);

                            window.flitsApp.appendTrackingDiv(tracking_div, tracking_number, window.flitsApp.tracking_details, true);

                            flitsAppJquery('.flits_append_tracking').addClass('flits-hidden');
                        }

                    } else {

                        var tracking_div = flitsAppJquery("<div class='flits-order-tracking-error-msg'/>").html(res.error);

                        var append_id = window.flitsApp.tracking_details[tracking_number].id;
                        if (window.flitsApp.tracking_details[tracking_number].type == 'order') {
                            flitsAppJquery('.flits_append_tracking[data-append-tracking-id=' + append_id + ']').append(tracking_div).removeClass('flits-hidden');
                        } else {
                            flitsAppJquery('.flits_append_tracking[data-append-tracking-id=' + append_id + ']').append(tracking_div).removeClass('flits-hidden');
                        }

                    }
                },
                error: function (res) {
                    switch (res.status) {
                        default:
                            break;

                    }
                }
            });
        });

    } else {

        flitsAppJquery.each(window.flitsApp.tracking_numbers, function (index, tracking_number) {

            var tracking_div = window.flitsApp.setOrderTrackingButton(tracking_number);

            window.flitsApp.appendTrackingDiv(tracking_div, tracking_number, window.flitsApp.tracking_details, true);

        });
    }

};

window.flitsApp.setOrderTracking = function (result_data, tracking_details) {

    var tracking_data = result_data.order_tracking_data;
    var tracking_number = tracking_data['tracking_number'];
    var tracking_div = '';
    var append_at_order_action_row = false;
    if (result_data.is_paid) {
        tracking_div = window.flitsApp.setOrderTrackingContent(result_data);
    } else {
        append_at_order_action_row = true;
        tracking_div = window.flitsApp.setOrderTrackingButton(tracking_number);
    }

    window.flitsApp.appendTrackingDiv(tracking_div, tracking_number, tracking_details, append_at_order_action_row);

};

window.flitsApp.setOrderTrackingContent = function (result_data) {

    var tracking_data = result_data.order_tracking_data;
    var tracking_status = tracking_data['tracking_status'];

    var $clone_div = flitsAppJquery(".flits-order-track-content.flits-template").clone().removeClass('flits-template');
    $clone_div.find('ul.flits-order-track-ul').attr('data-flits-active', tracking_status);

    return $clone_div;
};

window.flitsApp.setOrderTrackingButton = function (order_tracking_number) {

    var order_tracking_domain = flitsAppJquery("#flits-order-tracking-domain").val();

    var tracking_div = flitsAppJquery("<a/>")
            .attr('href', order_tracking_domain + '/' + order_tracking_number)
            .attr('target', '_blank')
            .addClass('flits-btn-inline flits-btn-danger flits-btn-custom flits-btn')
            .html(window.flitsApp.multilang.order_tracking.track_btn);

    return tracking_div;
};

window.flitsApp.appendTrackingDiv = function (tracking_div, tracking_number, tracking_details, append_at_order_action_row) {
    var append_id = tracking_details[tracking_number].id;
    var div = null;
    if (tracking_details[tracking_number].type == 'order') {
        if (append_at_order_action_row) {
            div = flitsAppJquery('.flits_append_tracking_btn[data-append-tracking-id=' + append_id + ']');
        } else {
            div = flitsAppJquery('.flits_append_tracking[data-append-tracking-id=' + append_id + ']');
        }

    } else {
        div = flitsAppJquery('.flits_append_tracking[data-append-tracking-id=' + append_id + ']');
    }

    if (div !== null) {
        if (flitsAppJquery(div).find('.flits-order-track-ul').length > 0) {
            var status = flitsAppJquery(tracking_div).find('.flits-order-track-ul').attr('data-flits-active');
            flitsAppJquery(div).find('.flits-order-track-ul').attr('data-flits-active', status);
            flitsAppJquery(div).removeClass('flits-hidden');
        } else {
            div.append(tracking_div).removeClass('flits-hidden');
        }

    }
};
window.flitsApp.run_after_jquery(window.flitsApp.getShipmentDetails);
