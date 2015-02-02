jQuery(function($) {
  var active_filters = [];
  $(".js-filterable").each(function(index){
    if($(this).val()){
      var ransack_field = $(this).attr("id");
      var ransack_value = $(this).val();
      active_filters.push([ransack_field, ransack_value]);
    }
  });

  console.log(active_filters);

  // Clickable ransack filters
  $(".js-add-filter").click(function() {
    var ransack_field = $(this).data("ransack-field");
    var ransack_value = $(this).data("ransack-value");

    $("#" + ransack_field).val(ransack_value);
    $("#table-filter form").submit();
  });

  jQuery.each(active_filters, function(index, val){
    var ransack_field = val[0];
    var ransack_value = val[1];
    var filter = filterHTML(ransack_field, ransack_value);

    addFilterPanel(ransack_field, ransack_value, index);
    $(".js-filters").show();
    $(".js-filters").append(filter);
  });

  if($(".js-filters .js-filter").length > 1){
    var remove_all_filters = '<a class="js-remove-all-filters label label-error">Delete all</a>';
    $(".js-filters").append(remove_all_filters);
  }

  $(".js-remove-all-filters").click(function() {
    jQuery.each(active_filters, function(index, val){
      var ransack_field = val[0];
      $("#" + ransack_field).val('');
    });
    $("#table-filter form").submit();
  });
});

$(document).on("click", ".js-delete-filter", function() {
  var ransack_field = $(this).parents().data("ransack-field");

  $("#" + ransack_field).val('');
  $("#table-filter form").submit();
});

function addFilterPanel(ransack_field, ransack_value, index){
  if(ransack_field.indexOf("order_email") > -1){
    requestData(Spree.routes.panel_user, ransack_value, ransack_field, index);
  }
  if(ransack_field.indexOf("shipment_number") > -1){
    requestData(Spree.routes.panel_shipment, ransack_value, ransack_field, index);
  }
  if(ransack_field.indexOf("order_number") > -1){
    requestData(Spree.routes.panel_order, ransack_value, ransack_field, index);
  }
}

function requestData(url, ransack_value, ransack_field, index){
  $.ajax({
    url: url,
    data: { identifier: ransack_value, ransack_field: ransack_field, index: index },
    success: function(data){
      processData(data);
    }
  });
}

function processData(data){
  if(!$(".js-panels").length){
    $("#main-part").removeClass("col-sm-9 col-md-10");
    $("#main-part").addClass("col-sm-7 col-md-7");
    $('<div class="col-sm-2 col-md-3"><div class="panel-group js-panels" id="accordion" role="tablist" aria-multiselectable="true"></div></div>').insertAfter("#main-part");
  }
  $(".js-panels").append(data);
  $(".js-table-data").removeClass("col-md-12");
  $(".js-table-data").addClass("col-md-9");
}

function filterHTML(field, value){
  return '<span class="js-filter label label-default" data-ransack-field="' + field + '">' + value + '<span class="icon icon-delete js-delete-filter"></span></span>';
}
