// https://github.com/ghiculescu/jekyll-table-of-contents
$(document).ready(function() {
  var no_back_to_top_links = true

  var headers = $('h1, h2, h3, h4, h5, h6').filter(function() {return this.id}), // get all headers with an ID
      output = $('.toc');

  if (!headers.length || headers.length < 3 || !output.length)
    return;

  var get_level = function(ele) { return parseInt(ele.nodeName.replace("H", ""), 10) }
  var highest_level = headers.map(function(_, ele) { return get_level(ele) }).get().sort()[0];

  var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>';

  var level = get_level(headers[0]), this_level, html = "<ul class='nav'>";

  headers.on('click', function() {
    if (!no_back_to_top_links) window.location.hash = this.id
  }).addClass('clickable-header').each(function(_, header) {
    this_level = get_level(header);

    if (!no_back_to_top_links && this_level === highest_level) {
      $(header).addClass('top-level-header').after(return_to_top)
    }

    if (this_level === level) {// same level as before; same indenting
      html += "<li><a href='#" + header.id + "'>" + header.innerHTML + "</a>";
    }

    else if (this_level < level) { // higher level than before; end parent ul

      // Get diff
      var diff = level - this_level;
      var closetags = '';

      // Close tags based on diff
      for (var i=0; i<diff; i++) {
        closetags += "</li></ul></li>";
      }

      // Render html
      html += closetags + "<li><a href='#" + header.id + "'>" + header.innerHTML + "</a>";
    }

    else if (this_level > level) { // lower level than before; expand the previous to contain a ul
      html += "<ul class='nav'><li><a href='#" + header.id + "'>" + header.innerHTML + "</a>";
    }

    level = this_level; // update for the next one
  });
  html += "</ul>";
  if (!no_back_to_top_links) {
    $(document).on('click', '.back-to-top', function() {
      $(window).scrollTop(0)
      window.location.hash = ''
    })
  }

  output.attr('data-offset', output.offset().top - 20);

  output.hide().html(html).show();
});
