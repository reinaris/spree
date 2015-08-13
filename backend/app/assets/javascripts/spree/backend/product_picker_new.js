$(document).ready(function() {
  function performProductPickerSearch() {
    var QUERY = $('.js-product-picker-search input').val();
    $('.js-product-picker-index').html('Loading..');

    $.ajax({
      type: 'GET',
      url: '/admin/products',
      data: {
        q: {
          name_cont: QUERY
        },
      },
    }).done(function(data) {
      $('.js-product-picker-index').html(data);
    }).error(function(msg) {
      console.log(msg);
    });
  }

  $('.js-product-picker-search-form').submit(function() {
    performProductPickerSearch();
    return false;
  });

  $('.js-product-picker-search .btn').click(function() {
    performProductPickerSearch();
  });
});

function productPickerCollectionRow(id, name) {
  return '<tr class="success">' +
           '<td>' + id + '</td>' +
           '<td>' + name + '</td>' +
           '<td>' +
             '<a class="btn btn-danger btn-sm js-delete-from-product-picker-target icon-link with-tip action-delete no-text" data-id="' + id + '" title="" href="javascript:;" data-original-title="Delete"><span class="icon icon-delete"></span></a>' +
           '</td>' +
         '</tr>';
}

$(document).on('click', '.js-product-picker-index tbody td a', function(e) {
  e.preventDefault();

  var PRODUCT_ID = $(this).data('id');
  var PRODUCT_NAME = $(this).data('name');
  var CURRENT_PRODUCT_IDS = valuesAsCleanArray($('.js-product-picker-target').val());
  var ALLREADY_EXIST = CURRENT_PRODUCT_IDS.indexOf(('' + PRODUCT_ID)); /* Product ID as a string */

  if (ALLREADY_EXIST == -1) {
    /* only add when it's not yet in the array */
    CURRENT_PRODUCT_IDS.push(PRODUCT_ID);
    $('.js-product-picker-target').val(CURRENT_PRODUCT_IDS);

    /* add the new product as a readable label, and be able to remove it again */
    $('.js-product-picker-collection tbody').prepend(productPickerCollectionRow(PRODUCT_ID, PRODUCT_NAME));

    $('#productPicker').modal('hide');
  } else {
    /* no award winner error but better then nothing */
    alert('This product is allready selected');
  }
});

$(document).on('click', '.js-delete-from-product-picker-target', function(e) {
  e.preventDefault();

  var PRODUCT_ID = $(this).data('id');
  var PRODUCT_NAME = $(this).data('name');
  var CURRENT_PRODUCT_IDS = valuesAsCleanArray($('.js-product-picker-target').val());

  CURRENT_PRODUCT_IDS = jQuery.grep(CURRENT_PRODUCT_IDS, function(value) {
    return value != PRODUCT_ID;
  });

  $('.js-product-picker-target').val(CURRENT_PRODUCT_IDS);

  $(this).parents('tr').remove();
});
