function generateListItem(val) {
    var element = $(val);
    var title = element.text();
    var link = '#' + element.attr('id');

    var $li = $('<li />');
    var $a = $('<a/>').attr('href', link).text(title);
    $li.append($a);

    return $li;
}

function generateTableOfContents() {
    var $n = $('<nav />');
    $n.attr('role', 'navigation');
    $n.attr('table-of-contents');
    $ul = $('<ul />');
    $n.append($ul);

    // Generates items in the TOC based upon all h2 elements.
    $('h2').each(function(index, val) {
        var element = $(val);
        $li = generateListItem(val);

        $ul.append($li);
    });

    $('#table-of-contents').after($n);
}

function goToHash() {
    var hash = window.location.hash;

    if (typeof hash === 'undefined' || hash === '') {
        return;
    }

    var container = $('html'),
    scrollTo = $(hash);

    // Scrolls to the element found based upon the hash.
    container.scrollTop(
        scrollTo.offset().top -
        container.offset().top +
        container.scrollTop());
}

function attachHeadingClickCopy() {
    $('h2, h3, h4, h5, h6').on('click', function() {
        var element = $(this);

        // Generate new hash.
        var hash = '#' + element.attr('id');

        // Push into browser history.
        if(history.pushState) {
            history.pushState(null, null, hash);
        }
        else {
            location.hash = hash;
        }

        // Current URL minus the hash.
        var currentUrl = window.location.href.split('#')[0];
        var addToClipboard = currentUrl + hash;

        // Copy to clipboard.
        var $temp = $('<input>');
        $('body').append($temp);
        $temp.val(addToClipboard).select();
        document.execCommand('copy');
        $temp.remove();
    })
}

$(function() {
    // Generates the TOC.
    generateTableOfContents();

    // Goes to the hash on page load if there is on.
    goToHash();

    // Attaches an onclick event to each heading to generate a shortcut URL.
    attachHeadingClickCopy();
});