// Override Settings
var bcSfFilterSettings = {
    general: {
        limit: bcSfFilterConfig.custom.products_per_page,
        // Optional
        loadProductFirst: true,
    },
    template: {
        loadMoreLoading: '<div id="bc-sf-filter-load-more-loading"><div class="load-more__icon" style="width: 44px; height: 44px; opacity: 1;"></div></div>',
    }
};

// Declare Templates
var bcSfFilterTemplate = {
    'saleLabelHtml': '<div class="sale_banner thumbnail_banner">' + bcSfFilterConfig.label.sale + '</div>',
    'newLabelHtml': '<div class="new_banner thumbnail_banner">' + bcSfFilterConfig.label.new + '</div>',
    'preorderLabelHtml': '<div class="new_banner thumbnail_banner">' + bcSfFilterConfig.label.pre_order + '</div>',
    'quickViewBtnHtml': '<span data-fancybox-href="#product-{{itemId}}" class="quick_shop ss-icon" data-gallery="product-{{itemId}}-gallery">&#x002B;</span>',
    'newRowHtml': '<br class="clear product_clear" />',

    // Grid Template
    'productGridItemHtml': '<div class="{{itemColumnNumberClass}} {{itemCollectionGroupThumbClass}} thumbnail {{itemCollectionGroupSmallClass}}" itemprop="itemListElement" itemscope itemtype="http://schema.org/Product"">' +
                               '<div class="product-wrap">' +
                                    '<div class="relative product_image swap-' + bcSfFilterConfig.custom.secondary_image + '">' +
                                        '<a href="{{itemUrl}}" itemprop="url">' +
                                            '{{itemImages}}' +
                                        '</a>' +
                                        '<div class="thumbnail-overlay">' +
                                            '<a href="{{itemUrl}}" itemprop="url" class="hidden-product-link">{{itemTitle}}</a>' +
                                            '<div class="info">' +
                                                '{{itemProductInfoHover}}' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="banner_holder">' +
                                          '{{itemSaleLabel}}' +
                                          '{{itemNewLabel}}' +
                                          '{{itemPreorderLabel}}' +
                                        '</div>' +
                                    '</div>' +
                                    '<a class="product-info__caption {{itemHiddenClass}}" href="{{itemUrl}}" itemprop="url">' +
                                        '{{itemProductInfo}}' +
                                    '</a>' +
                                '</div>' +
                                '{{itemColorSwatches}}' +
                            '</div>',

    // Pagination Template
    'previousHtml': '<span class="prev"><a href="{{itemUrl}}">« ' + bcSfFilterConfig.label.paginate_prev + '</a></span>',
    'nextHtml': '<span class="next"><a href="{{itemUrl}}">' + bcSfFilterConfig.label.paginate_next + ' »</a></span>',
    'pageItemHtml': '<span class="page"><a href="{{itemUrl}}">{{itemTitle}}</a></span>',
    'pageItemSelectedHtml': '<span class="page current">{{itemTitle}}</span>',
    'pageItemRemainHtml': '<span>{{itemTitle}}</span>',
    'paginateHtml': '{{previous}}{{pageItems}}{{next}}',
  
    // Sorting Template
    'sortingHtml': '{{sortingItems}}',
};

// Build Product Grid Item
BCSfFilter.prototype.buildProductGridItem = function (data, index) {
    /*** Prepare data ***/
    var images = data.images_info;
    // Displaying price base on the policy of Shopify, have to multiple by 100
    var soldOut = !data.available; // Check a product is out of stock
    var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
    var priceVaries = data.price_min != data.price_max; // Check a product has many prices
    // Get First Variant (selected_or_first_available_variant)
    var firstVariant = data['variants'][0];
    if (getParam('variant') !== null && getParam('variant') != '') {
        var paramVariant = data.variants.filter(function (e) {
            return e.id == getParam('variant');
        });
        if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
    } else {
        for (var i = 0; i < data['variants'].length; i++) {
            if (data['variants'][i].available) {
                firstVariant = data['variants'][i];
                break;
            }
        }
    }
    /*** End Prepare data ***/

    // Get Template
    var itemHtml = bcSfFilterTemplate.productGridItemHtml;

    var onSaleClass = onSale ? 'sale' : '';
    var soldOutClass = soldOut ? 'out_of_stock' : 'in_stock';
    var availabilityProp = soldOut ? 'http://schema.org/SoldOut' : 'http://schema.org/InStock';

    // Add custom class
    var itemColumnNumberClass = '';
    var itemCollectionGroupThumbClass = buildItemCollectionGroupThumbClass(index, bcSfFilterConfig.custom.products_per_row);
    var itemCollectionGroupLargeClass = '';
    var itemCollectionGroupMediumClass = '';
    var itemCollectionGroupSmallClass = (index - 1) % 2 == 0 ? 'even' : 'odd';

    switch (bcSfFilterConfig.custom.products_per_row) {
        case 2:
            itemColumnNumberClass = 'eight columns';
            break;
        case 3:
            itemColumnNumberClass = 'one-third column';
            break;
        case 4:
            itemColumnNumberClass = 'four columns';
            break;
        case 5:
            itemColumnNumberClass = 'one-fifth column';
            break;
        case 6:
            itemColumnNumberClass = 'one-sixth column';
            break;
        default:
            itemColumnNumberClass = 'one-seventh column';
            break;
    }

    if (bcSfFilterConfig.custom.mobile_products_per_row == 1) {
        itemColumnNumberClass += ' medium-down--one-half small-down--one-whole';
    } else {
        itemColumnNumberClass += ' medium-down--one-half small-down--one-half';    
    }

    itemHtml = itemHtml.replace(/{{itemColumnNumberClass}}/g, itemColumnNumberClass);
    itemHtml = itemHtml.replace(/{{itemCollectionGroupThumbClass}}/g, itemCollectionGroupThumbClass);
    itemHtml = itemHtml.replace(/{{itemCollectionGroupLargeClass}}/g, itemCollectionGroupLargeClass);
    itemHtml = itemHtml.replace(/{{itemCollectionGroupMediumClass}}/g, itemCollectionGroupMediumClass);
    itemHtml = itemHtml.replace(/{{itemCollectionGroupSmallClass}}/g, itemCollectionGroupSmallClass);

    // Add soldOut label
    var itemSoldOutLabel = soldOut ? bcSfFilterTemplate.soldOutLabelHtml : '';
    itemHtml = itemHtml.replace(/{{itemSoldOutLabel}}/g, itemSoldOutLabel);

    // Add onSale label
    var itemSaleLabel = bcSfFilterConfig.custom.sale_banner_enabled && onSale ? bcSfFilterTemplate.saleLabelHtml : '';
    itemHtml = itemHtml.replace(/{{itemSaleLabel}}/g, itemSaleLabel);

    // Add Label (New, Coming soon, Pre order)
    var newLabel = data.collections.filter(function (e) {
        return e.handle == 'new';
    });
    var preorderLabel = data.collections.filter(function (e) {
        return e.handle == 'pre-order';
    });
    var comingsoonLabel = data.collections.filter(function (e) {
        return e.handle == 'coming-soon';
    });
    if (data.collections) {
        var itemNewLabelHtml = typeof newLabel[0] != 'undefined' ? bcSfFilterTemplate.newLabelHtml : '';
        itemHtml = itemHtml.replace(/{{itemNewLabel}}/g, itemNewLabelHtml);

        var itemComingsoonLabelHtml = typeof comingsoonLabel[0] != 'undefined' ? bcSfFilterTemplate.comingsoonLabelHtml : '';
        itemHtml = itemHtml.replace(/{{itemComingsoonLabel}}/g, itemComingsoonLabelHtml);

        var itemPreorderLabelHtml = typeof preorderLabel[0] != 'undefined' ? bcSfFilterTemplate.preorderLabelHtml : '';
        itemHtml = itemHtml.replace(/{{itemPreorderLabel}}/g, itemPreorderLabelHtml);
    }

    var itemHiddenClass = bcSfFilterConfig.custom.thumbnail_hover_enabled ? 'hidden' : '';
    itemHtml = itemHtml.replace(/{{itemHiddenClass}}/g, itemHiddenClass);

    // Get image source
    var itemImageSrc = 'data-src="' + this.getFeaturedImage(images, '900x') + '" ';
    itemImageSrc += 'data-srcset=" ' + this.getFeaturedImage(images, '300x') + ' 300w,';
    itemImageSrc += this.getFeaturedImage(images, '400x') + ' 400w,';
    itemImageSrc += this.getFeaturedImage(images, '500x') + ' 500w,';
    itemImageSrc += this.getFeaturedImage(images, '600x') + ' 600w,';
    itemImageSrc += this.getFeaturedImage(images, '700x') + ' 700w,';
    itemImageSrc += this.getFeaturedImage(images, '800x') + ' 800w,';
    itemImageSrc += this.getFeaturedImage(images, '900x') + ' 900w"';
    // Get Thumbnail url
    var itemThumbUrl = this.getFeaturedImage(images, '100x');
    // Get Flip image url
    var itemFlipImageUrl = images.length > 1 ? this.optimizeImage(images[1]['src']) : this.getFeaturedImage(images, '900x');

    // Add Thumbnail
    var product_set_width = data.featured_image.width;
    var align_height_value = '';
    if (bcSfFilterConfig.custom.align_height) {
        if (images.length > 0) {
            var collection_height = bcSfFilterConfig.custom.collection_height;
            var product_aspect_ratio = images[0]['width'] / images[0]['height'];
            product_set_width = product_aspect_ratio * collection_height;
            if (images[0]['width'] >= images[0]['height']) {
                align_height_value = 'width: 100%; height: auto;';
            } else {
                align_height_value = 'width: 100%;';
            }
        }
    }
    var itemImagesHtml = '<div class="image__container" style="max-width: ' + product_set_width + 'px;">';
    itemImagesHtml += '<img src="' + itemThumbUrl + '"' +
        ' alt="{{itemTitle}}" ' +
        ' class="lazyload ' + bcSfFilterConfig.custom.image_loading_style + '"' +
        ' style="' + align_height_value + ' max-width: ' + data.featured_image.width + 'px;"' +
        ' data-sizes="auto" ' + itemImageSrc + '/>';
    itemImagesHtml += '</div>';
    // Add Flip Image
    if (bcSfFilterConfig.custom.secondary_image) {
        itemImagesHtml += '<div class="image__container" style="max-width:';
        if (images.length > 1) {
            itemImagesHtml += images[1]['width'] + 'px">';
        } else {
            itemImagesHtml += data.featured_image.width + 'px">';
        }
        itemImagesHtml += '<img src="' + itemFlipImageUrl + '" class="secondary lazyload" alt="{{itemTitle}}" />';
        itemImagesHtml += '</div>';
    }
    // Old version: none aspect_ratio
    // itemImagesHtml +=  '<img src="' + itemThumbUrl + '" alt="{{itemTitle}}" class="lazyload ' + bcSfFilterConfig.custom.image_loading_style + '" data-sizes="auto" ' + itemImageSrc + ' />';
    // if (bcSfFilterConfig.custom.secondary_image) {
    //     itemImagesHtml += '<img src="' + itemFlipImageUrl + '" class="secondary lazyload" />';
    // }
    itemHtml = itemHtml.replace(/{{itemImages}}/g, itemImagesHtml);

    // Build Quick shop button
    var priceAttr = typeof comingsoonLabel == 'undefined' ? bcSfFilterConfig.label.coming_soon : this.formatMoney(firstVariant.money);
    var fullDescAttr = data.description !== null ? 'data-full-description="' + this.escape(data.description.split('<!-- split -->')[0]) + '"' : 'data-full-description';
    var regularDescAttr = data.description !== null ? 'data-regular-description="' + this.escape(this.truncateByWord(data.description, bcSfFilterConfig.custom.description_words).replace('Description', '').replace('Dimensions', '').replace('Details', '').replace('Specs', '').replace('Shipping', '').replace('Size', '')) + '"' : 'data-regular-description';
    var imageAttr = '';
    for (var k in images) {
        imageAttr += images[k]['id'] + ' || ' + data.title + ' ||';
    }
    var colHandleAttr = '';
    for (var k in data.collections) {
        colHandleAttr += data['collections'][k]['handle'];
        if (k < data.collections.length - 1) {
            colHandleAttr += ',';
        }
    }
    imageAttr = imageAttr.replace(/"/g, '&#34;');
    // var quickShopBtnHtml = '<span class="quick_shop ss-icon js-quick-shop-link"' +
    //     ' data-no-instant' +
    //     ' data-remodal-target="quick-shop"' +
    //     ' data-id="{{itemId}}"' +
    //     ' data-handle="{{itemHandle}}"' +
    //     ' data-money-format="' + this.moneyFormat + '"' +
    //     ' data-formatted-price="' + priceAttr + '"' +
    //     ' data-url="{{itemUrl}}"' +
    //     ' data-title="{{itemTitle}}"' +
    //     ' data-details-text="' + this.escape(bcSfFilterConfig.label.view_detail) + '"' +
    //     ' ' + fullDescAttr +
    //     ' ' + regularDescAttr +
    //     ' data-images="' + imageAttr + '"' +
    //     ' data-collection-handles="' + colHandleAttr + '"' +
    //     '>' +
    //     bcSfFilterConfig.label.quick_shop +
    //     '</span>';

    // Build Product Info when hovering 
    var itemProductInfoHoverHtml = '';
    if (bcSfFilterConfig.custom.thumbnail_hover_enabled && bcSfFilterConfig.custom.quick_shop_enabled) {
        itemProductInfoHoverHtml += '{{itemProductInfo}}';
        // itemProductInfoHoverHtml += quickShopBtnHtml;
    } else {
        if (bcSfFilterConfig.custom.thumbnail_hover_enabled) {
            itemProductInfoHoverHtml += '{{itemProductInfo}}';
        } else if (bcSfFilterConfig.custom.quick_shop_enabled) {
            // itemProductInfoHoverHtml += quickShopBtnHtml;
        }
    }
    itemHtml = itemHtml.replace(/{{itemProductInfoHover}}/g, itemProductInfoHoverHtml);

    // Build Product Info (product-info.liquid)
    var itemProductInfoHtml = '<div class="product-details">';
    itemProductInfoHtml += '<span class="title" itemprop="name">{{itemTitle}}</span>';
    itemProductInfoHtml += '{{itemReview}}';
    itemProductInfoHtml += '{{itemVendor}}';
    itemProductInfoHtml += '{{itemPrice}}';
    itemProductInfoHtml += '</div>';
    itemHtml = itemHtml.replace(/{{itemProductInfo}}/g, itemProductInfoHtml);

    // Add Review badge
    var itemReviewHtml = '';
    if (bcSfFilterConfig.custom.enable_shopify_review_comments && bcSfFilterConfig.custom.enable_shopify_collection_badges) {
        itemReviewHtml = '<span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span>';
    }
    itemHtml = itemHtml.replace(/{{itemReview}}/g, itemReviewHtml);

    // Add Vendor
    var itemVendorHtml = '';
    if (bcSfFilterConfig.custom.vendor_enable) {
        itemVendorHtml = '<span itemprop="brand" class="brand">' + data.vendor + '</span>';
    }
    itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

    // Add Price
    var itemPriceHtml = '';
    if (typeof comingsoonLabel[0] !== 'undefined') {
        itemPriceHtml += '<span class="modal_price">' + bcSfFilterConfig.label.coming_soon + '</span>';
    } else {
        itemPriceHtml += '<span class="price ' + onSaleClass + '" itemprop="offers" itemscope itemtype="http://schema.org/Offer">';
        itemPriceHtml += '<meta itemprop="price" content="' + this.formatMoney(data.price_min, this.moneyFormat) + '" />';
        itemPriceHtml += '<meta itemprop="priceCurrency" content="' + bcSfFilterConfig.shop.currency + '" />';
        itemPriceHtml += '<meta itemprop="seller" content="' + bcSfFilterConfig.shop.name + '" />';
        itemPriceHtml += '<meta itemprop="availability" content="' + availabilityProp + '" />';
        itemPriceHtml += '<meta itemprop="itemCondition" content="New" />';
        if (!soldOut) {
            if (priceVaries && data.price_min > 0) {
                itemPriceHtml += '<small><em>' + bcSfFilterConfig.label.from_price + '</em></small> ';
            }
            if (data.price_min > 0) {
                itemPriceHtml += '<span class="money">' + this.formatMoney(data.price_min) + '</span>';
            } else {
                itemPriceHtml += bcSfFilterConfig.label.free_price;
            }
        } else {
            itemPriceHtml += '<span class="sold_out">' + bcSfFilterConfig.label.sold_out + '</span>';
        }
        if (onSale) {
            itemPriceHtml += ' <span class="was_price"><span class="money">' + this.formatMoney(data.compare_at_price_max) + '</span></span>';
        }
        itemPriceHtml += '</span>';
    }
    itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

    // Add Swatches
    var itemColorSwatchesHtml = '';
    if (bcSfFilterConfig.custom.collection_swatches) {
        for (var k in data.options) {
            var option = data['options'][k];
            var downcasedOption = option.toLowerCase();
            var colorTypes = ['color', 'colour', 'farve'];
            if (colorTypes.indexOf(downcasedOption) > -1) {
                var option_index = k;
                var values = [];
                itemColorSwatchesHtml += '<div class="collection_swatches">';
                for (var i in data.variants) {
                    var variant = data['variants'][i];
                    var value = variant['options'][option_index];
                    if (values.indexOf(value) == -1) {
                        var values = values.join(',');
                        values += ',' + value;
                        values = values.split(',');
                        var fileColorUrl = bcSfFilterConfig.general.asset_url.replace('bc-sf-filter.js', this.slugify(value) + '.png');
                        fileColorUrl = this.optimizeImage(fileColorUrl, '50x');
                        itemColorSwatchesHtml += '<a href="' + this.buildProductItemUrl(data) + '?variant=' + variant.id + '" class="swatch" data-swatch-name="meta-' + downcasedOption + '_' + (value.replace(/\s/g, '_')).toLowerCase() + '">';
                        itemColorSwatchesHtml += '<span ';
                        if (bcSfFilterConfig.custom.products_per_row == 2) {
                            itemColorSwatchesHtml += 'data-image="' + this.optimizeImage(variant.image, '600x') + '" ';
                        } else if (bcSfFilterConfig.custom.products_per_row == 2) {
                            itemColorSwatchesHtml += 'data-image="' + this.optimizeImage(variant.image, '500x') + '" ';
                        } else {
                            itemColorSwatchesHtml += 'data-image="' + this.optimizeImage(variant.image, '400x') + '" ';
                        }
                        itemColorSwatchesHtml += 'style="background-image: url(' + fileColorUrl + '); background-color: ' + this.slugify(value.split(' ').pop()) + ';">';
                        itemColorSwatchesHtml += '</span>';
                        itemColorSwatchesHtml += '</a>';
                    }
                }
                itemColorSwatchesHtml += '</div>';
            }
        }
    }
    itemHtml = itemHtml.replace(/{{itemColorSwatches}}/g, itemColorSwatchesHtml);

    // Add new row
    // var itemNewRowHtml = index % bcSfFilterConfig.custom.products_per_row == 0 ? bcSfFilterTemplate.newRowHtml : '';
    // itemHtml = itemHtml.replace(/{{itemNewRow}}/g, itemNewRowHtml);

    // Add main attribute
    itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
    itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
    itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
    itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data));

    return itemHtml;
};

// Build advanced class
function buildItemCollectionGroupThumbClass(index, productsPerRow) {
    var temp = index < productsPerRow ? index : index % productsPerRow;
    if (temp == 0) {
        return 'omega';
    } else if (temp == 1) {
        return 'alpha';
    }
    return '';
}

// Build Pagination
BCSfFilter.prototype.buildPagination = function (totalProduct) {
    // Get page info
    var currentPage = parseInt(this.queryParams.page);
    var totalPage = Math.ceil(totalProduct / this.queryParams.limit);

    // If it has only one page, clear Pagination
    if (totalPage == 1) {
        jQ(this.selector.pagination).html('');
        return false;
    }

    if (this.getSettingValue('general.paginationType') == 'default') {
        var paginationHtml = bcSfFilterTemplate.paginateHtml;

        // Build Previous
        var previousHtml = (currentPage > 1) ? bcSfFilterTemplate.previousHtml : '';
        previousHtml = previousHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage - 1));
        paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);

        // Build Next
        var nextHtml = (currentPage < totalPage) ? bcSfFilterTemplate.nextHtml : '';
        nextHtml = nextHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage + 1));
        paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);

        // Create page items array
        var beforeCurrentPageArr = [];
        for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
            beforeCurrentPageArr.unshift(iBefore);
        }
        if (currentPage - 4 > 0) {
            beforeCurrentPageArr.unshift('...');
        }
        if (currentPage - 4 >= 0) {
            beforeCurrentPageArr.unshift(1);
        }
        beforeCurrentPageArr.push(currentPage);

        var afterCurrentPageArr = [];
        for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
            afterCurrentPageArr.push(iAfter);
        }
        if (currentPage + 3 < totalPage) {
            afterCurrentPageArr.push('...');
        }
        if (currentPage + 3 <= totalPage) {
            afterCurrentPageArr.push(totalPage);
        }

        // Build page items
        var pageItemsHtml = '';
        var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
        for (var iPage = 0; iPage < pageArr.length; iPage++) {
            if (pageArr[iPage] == '...') {
                pageItemsHtml += bcSfFilterTemplate.pageItemRemainHtml;
            } else {
                pageItemsHtml += (pageArr[iPage] == currentPage) ? bcSfFilterTemplate.pageItemSelectedHtml : bcSfFilterTemplate.pageItemHtml;
            }
            pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
            pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, pageArr[iPage]));
        }
        paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);

        jQ(this.selector.pagination).html(paginationHtml);
    }
};

// Build Sorting
BCSfFilter.prototype.buildFilterSorting = function () {
    if (bcSfFilterTemplate.hasOwnProperty('sortingHtml')) {
        jQ(this.selector.topSorting).html('');

        var sortingArr = this.getSortingList();
        if (sortingArr) {
            // Build content 
            var sortingItemsHtml = '';
            for (var k in sortingArr) {
                sortingItemsHtml += '<option value="' + k + '">' + sortingArr[k] + '</option>';
            }
            var html = bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
            jQ(this.selector.topSorting).html(html);

            // Set current value
            jQ(this.selector.topSorting).val(this.queryParams.sort);
        }
    }
};

// Build Sorting event
BCSfFilter.prototype.buildSortingEvent = function () {
    var _this = this;
    jQ(this.selector.topSorting).change(function (e) {
        onInteractWithToolbar(e, 'sort', _this.queryParams.sort, jQ(this).val());
    })
};

// Build Breadcrumb
BCSfFilter.prototype.buildBreadcrumb = function (colData, apiData) {
    if (typeof colData !== 'undefined' && colData.hasOwnProperty('collection')) {
        var colInfo = colData.collection;

        var breadcrumbHtml = '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a href="' + bcSfFilterConfig.shop.url + '" title="' + bcSfFilterConfig.shop.name + '" itemprop="item" class="breadcrumb_link"><span itemprop="name">' + bcSfFilterConfig.label.breadcrumb_home + '</span></a></span> ';
        breadcrumbHtml += '<span class="breadcrumb-divider">/</span> ' +
            '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a href="{{currentCollectionLink}}" title="{{currentCollectionTitle}}" itemprop="item" class="breadcrumb_link"><span itemprop="name">{{currentCollectionTitle}}</span></a></span> ';
        // Build Tags
        var currentTagsHtml = '';
        if (Array.isArray(bcSfFilterConfig.general.current_tags)) {
            var current_tags = bcSfFilterConfig.general.current_tags;
            for (var k in current_tags) {
                var tag = current_tags[k];
                currentTagsHtml += '<span class="breadcrumb-divider">/</span>';
                currentTagsHtml += '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a href="/collections/{{currentCollectionLink}}/' + this.slugify(tag) + '" title="' + tag + '" itemprop="item"><span itemprop="name">' + tag + '</span></a></span>';
            }
        }
        breadcrumbHtml += currentTagsHtml;
        // Build Collection Info
        breadcrumbHtml = breadcrumbHtml.replace(/{{currentCollectionLink}}/g, '/collections/' + colInfo.handle).replace(/{{currentCollectionTitle}}/g, colInfo.title);
        // Top Pagination
        // var currentPage = parseInt(this.queryParams.page);
        // var totalPage = Math.ceil(apiData.total_product / this.queryParams.limit);
        // var topPaginationHtml = '<span class="breadcrumb-divider">/</span> ' + (bcSfFilterConfig.label.breadcrumb_page).replace(/{{ current_page }}/g, this.queryParams.page).replace(/{{ pages }}/g, totalPage)
        breadcrumbHtml += ' <span id="bc-sf-filter-top-pagination"></span>';

        jQ('.breadcrumb_text').html(breadcrumbHtml);
    }
};

// Call Theme function to Build additional elements for Product list
BCSfFilter.prototype.buildExtrasProductList = function (data) {
    var self = this;
    if (bcSfFilterConfig.custom.quick_shop_enabled) {
        // Build Quick view data
        jQ(self.getSelector('products')).find(".product_image").each(function (e) {
            var _this = this;
            if (jQ(_this).find("div.info").find(".quick_shop").length == 0) {
                var url = jQ(_this).find(" > a").eq(0).attr("href");
                jQ.ajax({
                    type: "GET",
                    url: url + '?view=bc-sf-quickview',
                    success: function (data) {
                        jQ(_this).find("div.info").append(data);
                    }
                });
            }
        });
    }
};

// Build Additional elements
BCSfFilter.prototype.buildAdditionalElements = function (data) {
    var self = this;
    /**
     * Remove InstantClick to prevent reloading page
     */
    jQ(self.getSelector('filterTree')).find('a').attr('data-no-instant', '');
    jQ(self.getSelector('filterTreeHorizontal')).find('a').attr('data-no-instant', '');

    /**
     * Add Wrapper for Product list
     */
    if (jQ(self.getSelector('products')).children().hasClass('product-list')) {
        jQ(self.getSelector('products')).children().children().unwrap();
    }

    /**
     * Build Top Pagination
     */
    var totalPage = Math.ceil(data.total_product / this.queryParams.limit);
    var topPaginationHtml = '<span class="breadcrumb-divider">/</span> ' + (bcSfFilterConfig.label.breadcrumb_page).replace(/{{ current_page }}/g, this.queryParams.page).replace(/{{ pages }}/g, totalPage);
    jQ('#bc-sf-filter-top-pagination').html(topPaginationHtml);
    jQ(".load-more__icon").remove();
    
    // Multi currency
    if (bcSfFilterConfig.custom.show_multiple_currencies && window.convertCurrencies && typeof convertCurrencies == 'function') {
        convertCurrencies();
    }
};

// Build Default layout
BCSfFilter.prototype.buildDefaultElements=function(){var isiOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,isSafari=/Safari/.test(navigator.userAgent),isBackButton=window.performance&&window.performance.navigation&&2==window.performance.navigation.type;if(!(isiOS&&isSafari&&isBackButton)){var self=this,url=window.location.href.split("?")[0],searchQuery=self.isSearchPage()&&self.queryParams.hasOwnProperty("q")?"&q="+self.queryParams.q:"";window.location.replace(url+"?view=bc-original"+searchQuery)}};

function customizeJsonProductData(data) {for (var i = 0; i < data.variants.length; i++) {var variant = data.variants[i];var featureImage = data.images.filter(function(e) {return e.src == variant.image;});if (featureImage.length > 0) {variant.featured_image = {"id": featureImage[0]['id'],"product_id": data.id,"position": featureImage[0]['position'],"created_at": "","updated_at": "","alt": null,"width": featureImage[0]['width'], "height": featureImage[0]['height'], "src": featureImage[0]['src'], "variant_ids": [variant.id]}} else {variant.featured_image = '';};};var self = bcsffilter;var itemJson = {"id": data.id,"title": data.title,"handle": data.handle,"vendor": data.vendor,"variants": data.variants,"url": self.buildProductItemUrl(data),"options_with_values": data.options_with_values,"images": data.images,"images_info": data.images_info,"available": data.available,"price_min": data.price_min,"price_max": data.price_max,"compare_at_price_min": data.compare_at_price_min,"compare_at_price_max": data.compare_at_price_max};return itemJson;};
BCSfFilter.prototype.prepareProductData = function(data) {var countData = data.length;for (var k = 0; k < countData; k++) {data[k]['images'] = data[k]['images_info'];if (data[k]['images'].length > 0) {data[k]['featured_image'] = data[k]['images'][0]} else {data[k]['featured_image'] = {src: bcSfFilterConfig.general.no_image_url,width: '',height: '',aspect_ratio: 0}}data[k]['url'] = '/products/' + data[k].handle;var optionsArr = [];var countOptionsWithValues = data[k]['options_with_values'].length;for (var i = 0; i < countOptionsWithValues; i++) {optionsArr.push(data[k]['options_with_values'][i]['name'])}data[k]['options'] = optionsArr;if (typeof bcSfFilterConfig.general.currencies != 'undefined' && bcSfFilterConfig.general.currencies.length > 1) {var currentCurrency = bcSfFilterConfig.general.current_currency.toLowerCase().trim();function updateMultiCurrencyPrice(oldPrice, newPrice) {if (typeof newPrice != 'undefined') {return newPrice;}return oldPrice;}data[k].price_min = updateMultiCurrencyPrice(data[k].price_min, data[k]['price_min_' + currentCurrency]);data[k].price_max = updateMultiCurrencyPrice(data[k].price_max, data[k]['price_max_' + currentCurrency]);data[k].compare_at_price_min = updateMultiCurrencyPrice(data[k].compare_at_price_min, data[k]['compare_at_price_min_' + currentCurrency]);data[k].compare_at_price_max = updateMultiCurrencyPrice(data[k].compare_at_price_max, data[k]['compare_at_price_max_' + currentCurrency]);}data[k]['price_min'] *= 100, data[k]['price_max'] *= 100, data[k]['compare_at_price_min'] *= 100, data[k]['compare_at_price_max'] *= 100;data[k]['price'] = data[k]['price_min'];data[k]['compare_at_price'] = data[k]['compare_at_price_min'];data[k]['price_varies'] = data[k]['price_min'] != data[k]['price_max'];var firstVariant = data[k]['variants'][0];if (getParam('variant') !== null && getParam('variant') != '') {var paramVariant = data[k]['variants'].filter(function(e) {return e.id == getParam('variant')});if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0]} else {var countVariants = data[k]['variants'].length;for (var i = 0; i < countVariants; i++) {if (data[k]['variants'][i].available) {firstVariant = data[k]['variants'][i];break}}}data[k]['selected_or_first_available_variant'] = firstVariant;var countVariants = data[k]['variants'].length;for (var i = 0; i < countVariants; i++) {var variantOptionArr = [];var count = 1;var variant = data[k]['variants'][i];var variantOptions = variant['merged_options'];if (Array.isArray(variantOptions)) {var countVariantOptions = variantOptions.length;for (var j = 0; j < countVariantOptions; j++) {var temp = variantOptions[j].split(':');data[k]['variants'][i]['option' + (parseInt(j) + 1)] = temp[1];data[k]['variants'][i]['option_' + temp[0]] = temp[1];variantOptionArr.push(temp[1])}data[k]['variants'][i]['options'] = variantOptionArr}data[k]['variants'][i]['compare_at_price'] = parseFloat(data[k]['variants'][i]['compare_at_price']) * 100;data[k]['variants'][i]['price'] = parseFloat(data[k]['variants'][i]['price']) * 100}data[k]['description'] = data[k]['content'] = data[k]['body_html'];if (data[k].hasOwnProperty('original_tags') && data[k]['original_tags'].length > 0) {data[k]['tags'] = data[k]['original_tags'].slice(0);}data[k]['json'] = customizeJsonProductData(data[k]);}return data;};

// Fix image url issue of swatch option
function getFilePath(fileName, ext, version) {
    var self = bcsffilter;
    var ext = typeof ext !== 'undefined' ? ext : 'png';
    var version = typeof version !== 'undefined' ? version : '1';
    var prIndex = self.fileUrl.lastIndexOf('?');
    if (prIndex > 0) {
        var filePath = self.fileUrl.substring(0, prIndex);
    } else {
        var filePath = self.fileUrl;
    }
    filePath += fileName + '.' + ext + '?v=' + version;
    return filePath;
}

BCSfFilter.prototype.getFilterData=function(eventType,errorCount){function BCSend(eventType,errorCount){var self=bcsffilter;var errorCount=typeof errorCount!=="undefined"?errorCount:0;self.showLoading();if(typeof self.buildPlaceholderProductList=="function"){self.buildPlaceholderProductList(eventType)}self.beforeGetFilterData(eventType);self.prepareRequestParams(eventType);self.queryParams["callback"]="BCSfFilterCallback";self.queryParams["event_type"]=eventType;var url=self.isSearchPage()?self.getApiUrl("search"):self.getApiUrl("filter");var script=document.createElement("script");script.type="text/javascript";var timestamp=(new Date).getTime();script.src=url+"?t="+timestamp+"&"+jQ.param(self.queryParams);script.id="bc-sf-filter-script";script.async=true;var resendAPITimer,resendAPIDuration;resendAPIDuration=2e3;script.addEventListener("error",function(e){if(typeof document.getElementById(script.id).remove=="function"){document.getElementById(script.id).remove()}else{document.getElementById(script.id).outerHTML=""}if(errorCount<3){errorCount++;if(resendAPITimer){clearTimeout(resendAPITimer)}resendAPITimer=setTimeout(self.getFilterData("resend",errorCount),resendAPIDuration)}else{self.buildDefaultElements(eventType)}});document.getElementsByTagName("head")[0].appendChild(script);script.onload=function(){if(typeof document.getElementById(script.id).remove=="function"){document.getElementById(script.id).remove()}else{document.getElementById(script.id).outerHTML=""}}}this.requestFilter(BCSend,eventType,errorCount)};BCSfFilter.prototype.requestFilter=function(sendFunc,eventType,errorCount){sendFunc(eventType,errorCount)};
