'use strict';
const test = require('tape');
const header = require('../templates/header');
const strings = require('../content/strings.json');
const path = '';
const expected = `<header>
            <div class="container">
                <a href="/"><h1><img src="${path}public/img/managers-table-logo.png" alt="Manager's Table" class="logo"></h1></a>
                <div class="bottom">
                    <ul class="feeds">
                        <li><a href="${strings.urls[0].itunes}"><img src="${path}public/img/podcast.svg" alt="Subscripe to iTunes Podcast"></a></li>
                        <li><a href="${strings.urls[0].rss}"><img src="${path}public/img/rss.svg" alt="Subscripe to RSS feed"></a></li>
                        <li><a href="${strings.urls[0].twitter}"><img src="${path}public/img/twitter.svg" alt="Follow us on Twitter"></a></li>
                    </ul>
                </div>
            </div>
        </header>`;

test('Test header template', function (t) {
  t.equal(header(), expected, 'header template is correct');
  t.end();
});
