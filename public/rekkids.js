$(document).ready(function(){
  $(".discogs-loading").show();
  $("#get-new-rekkid").hide();
  
  var user = 'dummy'
  var apiCall = `https://api.discogs.com/users/${user}/collection/folders/0/releases?callback=&sort=artist&sort_order=asc&per_page=500`
  var urls = []

  for (var i = 1; i < 3; i++) {
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
      var content = '<tr class="discogs-link" data-href="http://www.discogs.com/release/'+release.basic_information.id+'"><td>'+release.basic_information.artists[0].name+'</td><td>'+release.basic_information.title+'</td><td>';
      $(content).appendTo("#discogs-collection");
    });
    $(".discogs-link").click(function() {
      window.open($(this).data("href"));
    });
  
    
    let random_rekkid = rekkids[Math.floor(Math.random()*rekkids.length)].basic_information;
    let random_content = `<b>${random_rekkid.title} by ${random_rekkid.artists[0].name}</b>`;
    console.log(`before picking random content ${rekkids.length}`)
    $("#random-rekkid").html(random_content);
    
                      
    $("#get-new-rekkid").click(function () { 
      console.log(`in button click ${rekkids.length}`)
      random_rekkid = rekkids[Math.floor(Math.random()*rekkids.length)].basic_information;
      random_content = `<b>${random_rekkid.title} by ${random_rekkid.artists[0].name}</b>`;
      $("#random-rekkid").html(random_content);
    });
  });
});
