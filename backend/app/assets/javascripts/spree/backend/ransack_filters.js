jQuery(function($) {
  // Clickable ransack filters
  $(".js-add-filter").click(function() {
    var ransack_field = $(this).data("ransack-field");
    var ransack_value = $(this).data("ransack-value");

    $("#" + ransack_field).val(ransack_value);
    $("#table-filter form").submit();
  });

  $(".js-filterable").each(function(){
    if($(this).val()){
      var ransack_field = $(this).attr("id");
      var ransack_value = $(this).val();
      var filter = '<span class="js-filter label label-default" data-ransack-field="' + ransack_field + '">' + ransack_value + '<span class="icon icon-delete js-delete-filter"></span></span>';

      addFilterPanel(ransack_field, ransack_value);
      $(".js-filters").show();
      $(".js-filters").append(filter);
    }
  });
});

$(document).on("click", ".js-delete-filter", function() {
  var ransack_field = $(this).parents().data("ransack-field");

  $("#" + ransack_field).val('');
  $("#table-filter form").submit();
});

function addFilterPanel(ransack_field, ransack_value){
  if(ransack_field.indexOf("order_email") > -1){
    requestData(Spree.routes.panel_user, ransack_value, ransack_field);
  }
  if(ransack_field.indexOf("shipment_number") > -1){
    requestData(Spree.routes.panel_shipment, ransack_value, ransack_field);
  }
  if(ransack_field.indexOf("order_number") > -1){
    requestData(Spree.routes.panel_order, ransack_value, ransack_field);
  }
}

function requestData(url, ransack_value, ransack_field){
  $.ajax({
    url: url,
    data: { identifier: ransack_value, ransack_field: ransack_field },
    success: function(data){
      processData(data);
    }
  });
}

function processData(data){
  $(".js-panels").show();
  $(".js-panels").append(data);
  $(".js-table-data").removeClass("col-md-12");
  $(".js-table-data").addClass("col-md-9");
}
