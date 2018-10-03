$(document).ready(function(){
  $(".discogs-loading").show();
  $("#get-new-rekkid").hide();
  
  var perPage = 100
  var pages = 8
  var apiCall = `https://api.discogs.com/users/phebus/collection/folders/0/releases?callback=&sort=artist&sort_order=asc&per_page=${perPage}`
  var urls = []

  for (var i = 1; i < pages; i++) {
    urls.push(`${apiCall}&page=${i}`)
  }

  let rekkids = []
  var jxhr = urls.map(function(url) {
    return $.getJSON(url, function(page) {
      rekkids = rekkids.concat(page.releases)
    })
  });
  
    
  $.when.apply($, jxhr).done(function() {
    $(".discogs-loading").hide();
    $("#get-new-rekkid").show();
    
    rekkids = rekkids.sort(function(r1, r2) {
      var textA = r1.basic_information.artists[0].name.toUpperCase();
      var textB = r2.basic_information.artists[0].name.toUpperCase();
      
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    
    $.each(rekkids, function(i,release){
      var info = release.basic_information
      var content = '<tr class="discogs-link" data-href="http://www.discogs.com/release/'+info.id+'"><td valign="center">'+info.artists[0].name+'</td><td>'+info.title+'</td><td>';
      $(content).appendTo("#discogs-collection");
    });
    $(".discogs-link").click(function() {
      window.open($(this).data("href"));
    });
  
    
    let random_rekkid = rekkids[Math.floor(Math.random()*rekkids.length)].basic_information;
    let random_content = `<b>${random_rekkid.title} by ${random_rekkid.artists[0].name}</b>`;
    $("#random-rekkid").html(random_content);
    
                      
    $("#get-new-rekkid").click(function () { 
      random_rekkid = rekkids[Math.floor(Math.random()*rekkids.length)].basic_information;
      random_content = `<b>${random_rekkid.title} by ${random_rekkid.artists[0].name}</b>`;
      $("#random-rekkid").html(random_content);
    });
  });
});
