$(document).ready(function () {
  $('.delete-article').on('click', function (e) {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: `/packets/${id}`,
      success: function (reponse) {
        alert('Deleting Packet');
        window.location.href = '/';
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
