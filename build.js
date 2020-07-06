'use strict';
const mkdirp = require('mkdirp');
const episodes = require('./content/episodes.json');
const panelists = require('./content/panelists.json');
const write = require('./lib/write');
const createUrl = require('./lib/create-url');
const ellipsize = require('ellipsize');
const panelistPage = require('./lib/panelists');
const epList = require('./lib/episode-json');

// Templates
const main = require('./templates/main');
const episodeList = require('./templates/episode-list');
const episodePage = require('./templates/episode-page');
const episodeGuests = require('./templates/episode-guests');
const episodePanel = require('./templates/episode-panel');
const contentPage = require('./templates/content-page');

// store the output of HTML markup
let mainOutput = '';

let panel;
episodes.reverse();
for(let i = episodes.length - 1; i >= 0; i--) {
  const epTitle = episodes[i].title;
  panel = episodes[i].panel;
  const epDate = episodes[i].published;
  const epDesc = episodes[i].description;
  const link = createUrl(epTitle);
  const id = episodes[i].id;
  const links = episodes[i].links;
  const guests = episodes[i].guests;
  const shortDesc = ellipsize(epDesc, 240);
  const transcript = episodes[i].transcribed;
  const episodeNum = episodes[i].episode;

  // create episode list for homepage
  mainOutput += episodeList(link, epTitle, epDate, shortDesc);

  // build episode output
  let episodeOutput = '';

  // add episode content info
  episodeOutput += episodePage(epDate, id, epDesc);

  // if a guest exists add heading and guest info
  if(guests.length !== 0) {
    // add episode guests
    episodeOutput += episodeGuests(guests);
  }

  // create panel list
  episodeOutput += episodePanel(panelists, panel);

  // transcript
  if(transcript === true) {
    const transcriptContent = require('./transcripts/' + episodeNum)();
    episodeOutput += '<div class="transcript"><h3>Episode transcript</h3>';
    episodeOutput += transcriptContent;
    episodeOutput += '</div>';
  }

  // create a directory for each episode
  mkdirp.sync(`./episodes/${link}`);

  // create index.html for each episode
  write(`./episodes/${link}/index.html`, main('episode', episodeOutput, epTitle, epDesc));
}

// output slimmed down version of main episode JSON
epList();

// update index.html
write('index.html', main('home', mainOutput));

// create paenlist pages
panelistPage();
