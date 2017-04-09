var input = $("input");
var search = $("#search");
var clearSearch = $("#clear-search");
var $wikiElem = $('#wikipedia-links');
var random = $("#random");

clearSearch.hide();

search.click(function() {

  function wikiResults(results) {
    console.log(results);
  }

  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
  url += input.val(); 
  url += "&prop=images&imlimit=10&format=json";
  $.ajax(url, {
    dataType: "jsonp",
    success: function(data) {
      console.log(data);
      var listOfWiki = "";
      for (var i = 0; i < data[1].length; i++) {
        listOfWiki += '<a href="';
        listOfWiki += data[3][i];
        listOfWiki += '" target="_blank"><li><h2>';
        listOfWiki += data[1][i];
        listOfWiki += '</h2><p>';
        listOfWiki += data[2][i];
        listOfWiki += "</p></li></a>";
      }
    search.hide();
    random.hide();
    input.hide();
    clearSearch.show();
    $wikiElem.append(listOfWiki);
    }
  });
});

clearSearch.click(function() {
  $wikiElem.empty();
  search.show();
  random.show();
  input.show();
  clearSearch.hide();
  input.val("");
});

input.keypress(function(e){
  if(e.which == 13){
    search.click();//Trigger search button click event
  }
});

