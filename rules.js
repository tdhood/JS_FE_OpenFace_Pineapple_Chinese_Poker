'use strict';

let $rules = $('#rules-menu')

function showRules(evt) {
    evt.preventDefault();
    console.log('showRules');
    $rules.css({"visibility": "visible"})
}

function hideRules(evt) {
    evt.preventDefault();
    console.log('hideRules');
    $rules.css({"visibility": "hidden"})
}

$('#show-rules').on('click', showRules)
$('#hide-rules').on('click', hideRules)