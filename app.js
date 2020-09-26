
$.get("https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=US_MAP_DATA", 
function (data, status) {
  console.log("Data", data);
  console.log("Status", status);
})

$("path, circle").hover(function (e) {
  $('#info-box').css('display', 'block');
  $('#info-box').html($(this).data('info'));
});

$("path, circle").mouseleave(function (e) {
  $('#info-box').css('display', 'none');
});

$(document).mousemove(function (e) {
  $('#info-box').css('top', e.pageY - $('#info-box').height() - 30);
  $('#info-box').css('left', e.pageX - ($('#info-box').width()) / 2);
}).mouseover();

$(document).click(function (e) {

});

var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (ios) {
  $('a').on('click touchend', function () {
    var link = $(this).attr('href');
    window.open(link, '_blank');
    return false;
  });
}
