function initNews() {
    console.log($('.news-item').length);
    $('.news-item').each(function(id) {
        let date = $(this).data('date')
        let author = $(this).data('author');
        let text = $(this).text();
        let infobar = $('<div></div>')
            .attr('class', 'news-infobar')
            .text('Par ' + author + ' le ' + date);
        let content = $('<div></div>')
            .attr('class', 'news-content')
            .text(text);

        $(this).empty();
        $(this).append(infobar);
        $(this).append(content);
    });
}
