var d = new Date();
var currentDay = d.getDate();
var nonChangingDay = d.getDate();
var currentMonth = d.toLocaleString('default', { month: 'long' })
var currentMonthVal = d.getMonth() + 1;
//This will be used to stop the infinite loop in and will help us cycle to the previous month. (TO DO)
var dayCounter = 0;
getData();

function getData() {
  $.ajax({
    url: `https://data.cdc.gov/resource/9mfq-cb36.json?submission_date=2020-${currentMonthVal}-${currentDay}T00:00:00.000`,
    type: "GET",
    data: {
      "$limit": 100,
      "$$app_token": "lqGJM01HXEuZVtpGiTQg1GL3f"
    }
  }).done(function (data) {
    //alert("Retrieved " + data.length + " records from the dataset!");
    //console.log(data);
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
        catch (err) {
          console.log("State doesn't work", state);
        }

        //console.log("State", state);
        //console.log("DataInfo", dataInfo);
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
      break;
    case "CO":
      stateCovidWebsite = "https://www.colorado.gov/cdphe";
      break;
    case "FL":
      stateCovidWebsite = "http://www.floridahealth.gov/";
      break;
    case "AZ":
      stateCovidWebsite = "https://www.azdhs.gov/";
      break;
    case "SC":
      stateCovidWebsite = "https://scdhec.gov/";
      break;
    case "CT":
      stateCovidWebsite = "https://portal.ct.gov/dph";
      break;
    case "NE":
      stateCovidWebsite = "http://dhhs.ne.gov/Pages/default.aspx";
      break;
    case "IA":
      stateCovidWebsite = "https://idph.iowa.gov/";
      break;
    case "NM":
      stateCovidWebsite = "https://www.nmhealth.org/";
      break;
    case "KY":
      stateCovidWebsite = "https://chfs.ky.gov/agencies/dph/Pages/default.aspx";
      break;
    case "WY":
      stateCovidWebsite = "https://health.wyo.gov/";
      break;
    case "ND":
      stateCovidWebsite = "https://www.health.nd.gov/";
      break;
    case "WA":
      stateCovidWebsite = "https://www.doh.wa.gov/";
      break;
    case "TN":
      stateCovidWebsite = "https://www.tn.gov/health.html";
      break;
    case "MA":
      stateCovidWebsite = "https://www.mass.gov/orgs/department-of-public-health";
      break;
    case "PA":
      stateCovidWebsite = "https://www.health.pa.gov/Pages/default.aspx";
      break;
    case "NYC":
      stateCovidWebsite = "https://www.health.ny.gov/";
      break;
    case "OH":
      stateCovidWebsite = "https://odh.ohio.gov/wps/portal/gov/odh/home";
      break;
    case "AL":
      stateCovidWebsite = "https://www.alabamapublichealth.gov/index.html";
      break;
    case "MI":
      stateCovidWebsite = "https://www.michigan.gov/mdhhs";
      break;
    case "VA":
      stateCovidWebsite = "https://www.vdh.virginia.gov/";
      break;
    case "CA":
      stateCovidWebsite = "https://www.cdph.ca.gov/";
      break;
    case "MS":
      stateCovidWebsite = "https://msdh.ms.gov/";
      break;
    case "NJ":
      stateCovidWebsite = "https://www.state.nj.us/health/";
      break;
    case "IL":
      stateCovidWebsite = "http://www.idph.state.il.us/";
      break;
    case "LA":
      stateCovidWebsite = "https://ldh.la.gov/";
      break;
    case "WI":
      stateCovidWebsite = "https://www.dhs.wisconsin.gov/";
      break;
    case "GA":
      stateCovidWebsite = "https://dph.georgia.gov/";
      break;
    case "NV":
      stateCovidWebsite = "http://dpbh.nv.gov/";
      break;
    case "IN":
      stateCovidWebsite = "https://www.in.gov/isdh/";
      break;
    case "OR":
      stateCovidWebsite = "https://www.oregon.gov/oha/ph/pages/index.aspx";
      break;
    case "MD":
      stateCovidWebsite = "https://health.maryland.gov/Pages/Index.aspx";
      break;
    case "OK":
      stateCovidWebsite = "https://www.ok.gov/health/";
      break;
    case "NY":
      stateCovidWebsite = "https://www.health.ny.gov/";
      break;
    case "NC":
      stateCovidWebsite = "https://www.ncdhhs.gov/";
      break;
    case "ID":
      stateCovidWebsite = "https://healthandwelfare.idaho.gov/";
      break;
    case "UT":
      stateCovidWebsite = "https://health.utah.gov/";
      break;
    case "AR":
      stateCovidWebsite = "https://www.healthy.arkansas.gov/";
      break;
    case "MO":
      stateCovidWebsite = "https://health.mo.gov/index.php";
      break;
    case "DE":
      stateCovidWebsite = "https://www.dhss.delaware.gov/dhss/dph/index.html";
      break;
    case "MN":
      stateCovidWebsite = "https://www.health.state.mn.us/";
      break;
    case "WV":
      stateCovidWebsite = "http://dhhr.wv.gov/bph/Pages/default.aspx";
      break;
    case "RI":
      stateCovidWebsite = "https://health.ri.gov/";
      break;
    case "SD":
      stateCovidWebsite = "http://doh.sd.gov/";
      break;
    case "ME":
      stateCovidWebsite = "http://www.maine.gov/dhhs/index.shtml";
      break;
    case "KS":
      stateCovidWebsite = "https://www.kdheks.gov/";
      break;
    case "NH":
      stateCovidWebsite = "https://www.dhhs.nh.gov/";
      break;
    case "MT":
      stateCovidWebsite = "https://dphhs.mt.gov/";
      break;
    case "HI":
      stateCovidWebsite = "https://health.hawaii.gov/";
      break;
    case "AK":
      stateCovidWebsite = "http://dhss.alaska.gov/Pages/default.aspx";
      break;
    case "VT":
      stateCovidWebsite = "https://www.healthvermont.gov/";
      break;
    default:
      stateCovidWebsite = "https://covid.cdc.gov/covid-data-tracker/#cases_casesinlast7days";
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
