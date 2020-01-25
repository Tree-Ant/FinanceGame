const KEY = "NXTIDUYQ1XCJ4EN9";

var track = [];
var price = [];

function stockOPEN() {
  var STOCK = $(".SYMBOL").val();
  var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=" + STOCK + "&apikey=" + KEY + "&datatype=csv";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (daily) {
    let track = [];
    let price = [];
    let count = [];
    const enter = daily.split(',');

    // for (var k = 1; k < 53; k++) {
    //   count.push(k);
    // }

    for (var i = 6; i < 265; i = i + 5) {
      track.unshift(parseFloat(enter[i]));
      price.push($(".price").val());
    }

    let j = -1;
    let currPrice = [];

    $(".today").html("Today: $ " + track[0]);

    let o = 0;
    let score = 0;
    let score2 = 0;

    $(".next").on("click", function (event) {
      var s = document.getElementById("SELECT").value;
      var c = document.getElementById("COMP").value;

      var COMPselect = $("#COMP").val(Math.floor(Math.random() * 10));

      if (j < track.length - 2) {
        j++;
        o++;
        count.push(j);
        $(".today").html("Today: $ " + track[j]);
        currPrice.push(track[j]);
        $(".COMP").html(COMPselect)

        new Chart(document.getElementById("line-chart"), {
          type: 'line',
          data: {
            labels: count,
            datasets: [
              //   { data: track, label: "Africa", borderColor: "#3e95cd", fill: false },
              {
                data: currPrice,
                label: "Today",
                borderColor: "#c45850",
                fill: true
              }
              // ,
              // { 
              //   data: price,
              //   label: "EST",
              //   borderColor: "#0000FF",
              //   fill: false
              // }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'Dingle Berries'
            }
          }
        });

        if (s === "BUY") {
          var round = (track[o - 2] - track[o - 1]) * -1;
          if (isNaN(round) === false) {
            score += round
            $(".bank").html("MyBank: " + score.toFixed(2) + "(" + round.toFixed(2) + ")");
          } else {
            console.log("FUCK");
          }

        } else {
          var round = (track[o - 2] - track[o - 1]);
          if (isNaN(round) === false) {
            score += round
            $(".bank").html("MyBank: " + score.toFixed(2) + "(" + round.toFixed(2) + ")");
          } else {
            console.log("FUCK");
          }
        }

        if (c >= 5) {
          var round = (track[o - 2] - track[o - 1]) * -1;
          if (isNaN(round) === false) {
            score2 += round
            $(".Cbank").html("CompBank: " + score2.toFixed(2) + "(" + round.toFixed(2) + ")");
          } else {
            console.log("compFUck");
          }
        } else {
          var round = (track[o - 2] - track[o - 1]);
          if (isNaN(round) === false) {
            score2 += round
            $(".Cbank").html("CompBank: " + score2.toFixed(2) + "(" + round.toFixed(2) + ")");
          } else {
            console.log("compFUck");
          }
        }

        new Chart(document.getElementById("bar-chart"), {
          type: 'bar',
          data: {
            labels: ["Player 1", "COMP"],
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [score, score2]
              }
            ]
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Predicted world population (millions) in 2050'
            }
          }
        });

      } else {
        $(".reset").html(`    <button type="button" class="reset">reset</button>`);
        if (score > score2) {
          alert("YOU WIN!!!");
        } else {
          alert("you Suck");
        }
      }
    });
  });
}



$(".start").on("click", function () {

  stockOPEN();
});

$(".reset").on("click", function () {
  location.reload();
});


function tester() {
  var num = "h";


}




$(".tester").on("click", function () {

  tester();
});