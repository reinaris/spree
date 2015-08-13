// Make pagination work when its loaded in a ajax modal
$(document).on('click', '.js-modal-resource-index nav.pagination a', function(e) {
  e.preventDefault();
  var $index = $('.js-modal-resource-index');

  $index.html('Loading..');

  $.ajax({
    url: $(this).attr('href'),
  }).done(function(data) {
    $index.html(data);
  }).error(function(msg) {
    console.log(msg);
  });
});
