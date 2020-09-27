
// $.ajax({
//   dataType: "json",
//   url: "https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=US_MAP_DATA",
//   success:
//     function (result) {
//       console.log("Result", result);

//     },
//     error: function (error) {
//       var stringedError = JSON.stringify(error);
//       console.log(`Error ${stringedError}`)
//     }
// })
var d = new Date();
var currentDay = d.getDate();
var nonChangingDay = d.getDate();
var currentMonth = d.toLocaleString('default', { month: 'long' })
//This will be used to stop the infinite loop in and will help us cycle to the previous month. (TO DO)
var dayCounter = 0; 
getData();

function getData() {
  $.ajax({
    url: `https://data.cdc.gov/resource/9mfq-cb36.json?submission_date=2020-09-${currentDay}T00:00:00.000`,
    type: "GET",
    data: {
      "$limit": 100,
      "$$app_token": "lqGJM01HXEuZVtpGiTQg1GL3f"
    }
  }).done(function (data) {
    //alert("Retrieved " + data.length + " records from the dataset!");
    console.log(data);
    if (data.length === 0 || null) {
      currentDay = currentDay - 1;
      getData();
    } else {
      var totalCases = 0;
      var totalDeaths = 0;
      var newCases = 0;
      for (var i = 0; i < data.length; i++) {
        totalCases += Number(data[i].tot_cases);
        totalDeaths += Number(data[i].tot_death);
        newCases += Number(data[i].new_case);
        var state = "#" + data[i].state;
        var dataInfo = $(state).attr("data-info");
        try {
          $(state).attr("data-info", dataInfo + `<div>Total Cases: ${numberWithCommas(data[i].tot_cases)}</div><div>Total Deaths: ${numberWithCommas(data[i].tot_death)}</div>`)
        }
        catch(err) {
          console.log("State doesn't work", state);
        }

        // console.log("State", state);
        // console.log("DataInfo", dataInfo);
      }
      //<button type="button" class="btn btn-default btn-sm" data-toggle="popover" title="Latest Data" data-content="Data will automatically be updated with the latest information available to the public based on the CDC">Info</button>
      var info = '';
      $(".day").html("Last Updated on " + currentMonth + " " + nonChangingDay + ", 2020 " + info);
      $(".totalCases").text(numberWithCommas(totalCases));
      $(".totalDeaths").text(numberWithCommas(totalDeaths));
      $(".totalNewCases").text(numberWithCommas(newCases));
      // console.log("total cases", numberWithCommas(totalCases));
      // console.log("totalDeaths", numberWithCommas(totalDeaths));
      // console.log("newCases", numberWithCommas(newCases));
    }

  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// loadJSON("https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=US_MAP_DATA")
// $.ajax({
//   url: "https://data.ct.gov/resource/wa3g-tfvc.json",
//   type: "GET",
//   data: {
//     "$limit" : 5000,
//     "$$app_token" : "lqGJM01HXEuZVtpGiTQg1GL3f"
//   }
// }).done(function(data) {
// alert("Retrieved " + data.length + " records from the dataset!");
// console.log(data);
// });

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

$("path").click(function (e) {
console.log(e);
var id = $(this).attr('id');
console.log(id);
var stateWebSite = findStateLink(id); 
console.log(stateWebSite);
window.open(stateWebSite, '_blank');
});

function findStateLink(state) {
  var stateCovidWebsite = "";
  switch (state) {
    case "TX":
    stateCovidWebsite = "https://www.dshs.state.tx.us/";
  }
  return stateCovidWebsite; 
}
var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (ios) {
  $('a').on('click touchend', function () {
    var link = $(this).attr('href');
    window.open(link, '_blank');
    return false;
  });
}
