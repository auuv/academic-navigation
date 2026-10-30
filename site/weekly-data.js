(function(root,data){if(typeof module==="object"&&module.exports)module.exports=data;else root.WeeklyData=data;})(typeof globalThis==="object"?globalThis:this,{
  "schemaVersion": 1,
  "updatedAt": "2026-10-30T01:49:30.886Z",
  "lastAttemptAt": "2026-10-30T01:49:30.886Z",
  "sources": [
    {
      "id": "bbc",
      "title": "BBC World",
      "kind": "news",
      "url": "https://www.bbc.com/",
      "state": "completed",
      "received": 28,
      "retained": 7,
      "skipped": {
        "routine": 17,
        "lowImportance": 4
      },
      "attempts": [
        {
          "url": "https://feeds.bbci.co.uk/news/world/rss.xml",
          "type": "feed",
          "state": "completed",
          "received": 28
        }
      ],
      "method": "RSS / Atom 订阅",
      "entryUrl": "https://feeds.bbci.co.uk/news/world/rss.xml"
    },
    {
      "id": "ecfr",
      "title": "ECFR",
      "kind": "report",
      "url": "https://ecfr.eu/",
      "state": "failed",
      "received": 0,
      "retained": 0,
      "skipped": {},
      "attempts": [
        {
          "url": "https://ecfr.eu/feed/",
          "type": "feed",
          "state": "failed",
          "error": "robots.txt 返回 HTTP 403，无法确认抓取许可"
        }
      ],
      "error": "robots.txt 返回 HTTP 403，无法确认抓取许可"
    },
    {
      "id": "guardian",
      "title": "The Guardian · World",
      "kind": "news",
      "url": "https://www.theguardian.com/",
      "state": "completed",
      "received": 45,
      "retained": 7,
      "skipped": {
        "routine": 12,
        "lowImportance": 26
      },
      "attempts": [
        {
          "url": "https://www.theguardian.com/world/rss",
          "type": "feed",
          "state": "completed",
          "received": 45
        }
      ],
      "method": "RSS / Atom 订阅",
      "entryUrl": "https://www.theguardian.com/world/rss"
    },
    {
      "id": "csis",
      "title": "CSIS",
      "kind": "report",
      "url": "https://www.csis.org/",
      "state": "completed",
      "received": 9,
      "retained": 8,
      "skipped": {
        "routine": 1
      },
      "attempts": [
        {
          "url": "https://www.csis.org/analysis",
          "type": "listing",
          "state": "completed",
          "received": 9
        }
      ],
      "method": "官方文章列表",
      "entryUrl": "https://www.csis.org/analysis"
    },
    {
      "id": "cna",
      "title": "CNA 亚洲新闻",
      "kind": "news",
      "url": "https://www.channelnewsasia.com/",
      "state": "completed",
      "received": 20,
      "retained": 6,
      "skipped": {
        "lowImportance": 8,
        "routine": 6
      },
      "attempts": [
        {
          "url": "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511",
          "type": "feed",
          "state": "completed",
          "received": 20
        }
      ],
      "method": "RSS / Atom 订阅",
      "entryUrl": "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511"
    },
    {
      "id": "fulcrum",
      "title": "ISEAS · Fulcrum",
      "kind": "report",
      "url": "https://fulcrum.sg/",
      "state": "completed",
      "received": 10,
      "retained": 9,
      "skipped": {
        "routine": 1
      },
      "attempts": [
        {
          "url": "https://fulcrum.sg/feed/",
          "type": "feed",
          "state": "completed",
          "received": 10
        }
      ],
      "method": "RSS / Atom 订阅",
      "entryUrl": "https://fulcrum.sg/feed/"
    },
    {
      "id": "dw",
      "title": "Deutsche Welle",
      "kind": "news",
      "url": "https://www.dw.com/en/top-stories/s-9097",
      "state": "completed",
      "received": 122,
      "retained": 19,
      "skipped": {
        "lowImportance": 36,
        "routine": 67
      },
      "attempts": [
        {
          "url": "https://rss.dw.com/rdf/rss-en-all",
          "type": "feed",
          "state": "completed",
          "received": 122
        }
      ],
      "method": "RSS / Atom 订阅",
      "entryUrl": "https://rss.dw.com/rdf/rss-en-all"
    },
    {
      "id": "bruegel",
      "title": "Bruegel",
      "kind": "report",
      "url": "https://www.bruegel.org/",
      "state": "completed",
      "received": 15,
      "retained": 4,
      "skipped": {
        "outsideWindow": 10,
        "routine": 1
      },
      "attempts": [
        {
          "url": "https://www.bruegel.org/rss.xml",
          "type": "feed",
          "state": "completed",
          "received": 10,
          "warning": "该入口没有近八周条目，继续检查备用入口"
        },
        {
          "url": "https://www.bruegel.org/publications",
          "type": "listing",
          "state": "completed",
          "received": 5
        }
      ],
      "method": "官方文章列表",
      "entryUrl": "https://www.bruegel.org/publications"
    },
    {
      "id": "aljazeera",
      "title": "Al Jazeera",
      "kind": "news",
      "url": "https://www.aljazeera.com/",
      "state": "completed",
      "received": 25,
      "retained": 7,
      "skipped": {
        "lowImportance": 5,
        "routine": 13
      },
      "attempts": [
        {
          "url": "https://www.aljazeera.com/xml/rss/all.xml",
          "type": "feed",
          "state": "completed",
          "received": 25
        }
      ],
      "method": "RSS / Atom 订阅",
      "entryUrl": "https://www.aljazeera.com/xml/rss/all.xml"
    },
    {
      "id": "cfr",
      "title": "Council on Foreign Relations",
      "kind": "report",
      "url": "https://www.cfr.org/",
      "state": "completed",
      "received": 35,
      "retained": 22,
      "skipped": {
        "routine": 9,
        "outsideWindow": 4
      },
      "attempts": [
        {
          "url": "https://www.cfr.org/",
          "type": "listing",
          "state": "completed",
          "received": 35
        }
      ],
      "method": "官方文章列表",
      "entryUrl": "https://www.cfr.org/"
    },
    {
      "id": "vnexpress",
      "title": "VnExpress International",
      "kind": "news",
      "url": "https://e.vnexpress.net/",
      "state": "completed",
      "received": 60,
      "retained": 2,
      "skipped": {
        "routine": 49,
        "lowImportance": 9
      },
      "attempts": [
        {
          "url": "https://e.vnexpress.net/rss/news.rss",
          "type": "feed",
          "state": "completed",
          "received": 60
        }
      ],
      "method": "RSS / Atom 订阅",
      "entryUrl": "https://e.vnexpress.net/rss/news.rss"
    },
    {
      "id": "lowy",
      "title": "Lowy Institute · Interpreter",
      "kind": "report",
      "url": "https://www.lowyinstitute.org/",
      "state": "completed",
      "received": 50,
      "retained": 30,
      "skipped": {
        "routine": 20
      },
      "attempts": [
        {
          "url": "https://www.lowyinstitute.org/the-interpreter/feed",
          "type": "feed",
          "state": "completed",
          "received": 50
        }
      ],
      "method": "RSS / Atom 订阅",
      "entryUrl": "https://www.lowyinstitute.org/the-interpreter/rss.xml"
    },
    {
      "id": "brookings",
      "title": "Brookings Institution",
      "kind": "report",
      "url": "https://www.brookings.edu/",
      "state": "completed",
      "received": 5,
      "retained": 2,
      "skipped": {
        "routine": 3
      },
      "attempts": [
        {
          "url": "https://www.brookings.edu/",
          "type": "listing",
          "state": "completed",
          "received": 5
        }
      ],
      "method": "官方文章列表",
      "entryUrl": "https://www.brookings.edu/"
    },
    {
      "id": "iseas",
      "title": "ISEAS Perspective",
      "kind": "report",
      "url": "https://www.iseas.edu.sg/",
      "state": "completed",
      "received": 3,
      "retained": 2,
      "skipped": {
        "routine": 1
      },
      "attempts": [
        {
          "url": "https://www.iseas.edu.sg/",
          "type": "listing",
          "state": "completed",
          "received": 3
        }
      ],
      "method": "官方文章列表",
      "entryUrl": "https://www.iseas.edu.sg/"
    }
  ],
  "items": [
    {
      "id": "https://www.aljazeera.com/news/2026/10/30/trump-administration-renews-bid-to-block-alaska-election-results?traffic_source=rss",
      "title": "Trump administration renews bid to block Alaska election results",
      "url": "https://www.aljazeera.com/news/2026/10/30/trump-administration-renews-bid-to-block-alaska-election-results?traffic_source=rss",
      "publishedAt": "2026-10-30T01:30:30.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "aljazeera",
      "sourceTitle": "Al Jazeera",
      "sourceUrl": "https://www.aljazeera.com/",
      "publisherId": "aljazeera.com",
      "excerpt": "The updated lawsuit cites a new report that Democratic operatives recruited a competitor to confuse voters.",
      "regions": [
        "全球议题"
      ],
      "score": 40,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.aljazeera.com/video/newsfeed/2026/10/30/armenian-parliament-turns-into-a-boxing-ring-third-time-in-a-month?traffic_source=rss",
      "title": "Armenian parliament turns into a boxing ring, third time in a month",
      "url": "https://www.aljazeera.com/video/newsfeed/2026/10/30/armenian-parliament-turns-into-a-boxing-ring-third-time-in-a-month?traffic_source=rss",
      "publishedAt": "2026-10-30T00:36:03.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "aljazeera",
      "sourceTitle": "Al Jazeera",
      "sourceUrl": "https://www.aljazeera.com/",
      "publisherId": "aljazeera.com",
      "excerpt": "Armenia’s parliament descended into fisticuffs after a ruling-party MP mocked the opposition leader’s family.",
      "regions": [
        "全球议题"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.aljazeera.com/news/liveblog/2026/10/30/iran-war-live-irgc-says-four-tankers-struck-mines-in-strait-of-hormuz?traffic_source=rss",
      "title": "Iran war live: IRGC says four tankers struck mines in Strait of Hormuz",
      "url": "https://www.aljazeera.com/news/liveblog/2026/10/30/iran-war-live-irgc-says-four-tankers-struck-mines-in-strait-of-hormuz?traffic_source=rss",
      "publishedAt": "2026-10-30T00:00:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "aljazeera",
      "sourceTitle": "Al Jazeera",
      "sourceUrl": "https://www.aljazeera.com/",
      "publisherId": "aljazeera.com",
      "excerpt": "Iran's IRGC says four tankers have struck naval mines after using \"unauthorised\" Strait of Hormuz routes.",
      "regions": [
        "中东"
      ],
      "score": 26,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.theguardian.com/world/2026/oct/29/polymarket-temporarily-suspends-trading-security-incident",
      "title": "Polymarket temporarily suspends trading on international platform due to security incident",
      "url": "https://www.theguardian.com/world/2026/oct/29/polymarket-temporarily-suspends-trading-security-incident",
      "publishedAt": "2026-10-29T23:20:16.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "regions": [
        "全球议题"
      ],
      "score": 7,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/israeli-election-netanyahu-main-rival-fall-short-of-majority-after-all-votes-counted/live-79713839?maca=en-rss-en-all-1573-rdf",
      "title": "Israeli election: Netanyahu, main rival fall short of majority after all votes counted",
      "url": "https://www.dw.com/en/israeli-election-netanyahu-main-rival-fall-short-of-majority-after-all-votes-counted/live-79713839?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-29T23:10:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "With all the votes counted, the pro-Netanyahu bloc finished ahead of Gadi Eisenkot's anti-Netanyahu bloc. But as neither grouping won a majority, tough coalition talks are ahead. Follow DW.",
      "regions": [
        "中东"
      ],
      "score": 40,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.theguardian.com/law/2026/oct/30/victorian-lawyers-ai-clients-fees",
      "title": "More than half of Victorian lawyers use AI – but only a quarter have cut client fees as a result",
      "url": "https://www.theguardian.com/law/2026/oct/30/victorian-lawyers-ai-clients-fees",
      "publishedAt": "2026-10-29T23:00:37.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "regions": [
        "全球议题"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/india-a-middle-power-more-or-less",
      "title": "India: a middle power, more or less?",
      "url": "https://www.lowyinstitute.org/the-interpreter/india-a-middle-power-more-or-less",
      "publishedAt": "2026-10-29T23:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "A definitional debate can’t mask that the country’s economy and diplomacy still run on middle-power coalitions.",
      "regions": [
        "南亚"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.channelnewsasia.com/asia/melaka-state-election-political-alliances-barisan-nasional-pakatan-harapan-perikatan-nasional-bersatu-6502711",
      "title": "Melaka polls talks expose fault lines in Malaysia's shifting political alliances",
      "url": "https://www.channelnewsasia.com/asia/melaka-state-election-political-alliances-barisan-nasional-pakatan-harapan-perikatan-nasional-bersatu-6502711",
      "publishedAt": "2026-10-29T22:00:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "cna",
      "sourceTitle": "CNA 亚洲新闻",
      "sourceUrl": "https://www.channelnewsasia.com/",
      "publisherId": "channelnewsasia.com",
      "excerpt": "Seat negotiations for the Melaka polls have exposed tensions within the BN-PN and PH-Bersatu partnerships, raising questions about their durability ahead of the next general election.",
      "regions": [
        "东南亚"
      ],
      "score": 25,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/for-midterm-voters-foreign-policy-is-a-pocketbook-issue",
      "title": "For Midterm Voters, Foreign Policy Is a Pocketbook Issue",
      "url": "https://www.cfr.org/articles/for-midterm-voters-foreign-policy-is-a-pocketbook-issue",
      "publishedAt": "2026-10-29T21:53:07.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.aljazeera.com/video/inside-story/2026/10/29/does-russia-offer-african-countries-an-equal-partnership?traffic_source=rss",
      "title": "Does Russia offer African countries an equal partnership?",
      "url": "https://www.aljazeera.com/video/inside-story/2026/10/29/does-russia-offer-african-countries-an-equal-partnership?traffic_source=rss",
      "publishedAt": "2026-10-29T20:34:28.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "aljazeera",
      "sourceTitle": "Al Jazeera",
      "sourceUrl": "https://www.aljazeera.com/",
      "publisherId": "aljazeera.com",
      "excerpt": "President Vladimir Putin hosts African leaders at a summit in Moscow.",
      "regions": [
        "俄罗斯与中亚",
        "非洲"
      ],
      "score": 21,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.aljazeera.com/news/2026/10/29/israel-election-result-shows-no-overall-majority-as-vote-count-complete?traffic_source=rss",
      "title": "Israel election result shows no overall majority as vote count complete",
      "url": "https://www.aljazeera.com/news/2026/10/29/israel-election-result-shows-no-overall-majority-as-vote-count-complete?traffic_source=rss",
      "publishedAt": "2026-10-29T20:22:04.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "aljazeera",
      "sourceTitle": "Al Jazeera",
      "sourceUrl": "https://www.aljazeera.com/",
      "publisherId": "aljazeera.com",
      "excerpt": "Opposition explores options to form coalition as no party secures the 61 seats required for parliamentary majority.",
      "regions": [
        "中东"
      ],
      "score": 40,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.bbc.co.uk/news/articles/ckdd8qdl9e0eo?at_medium=RSS&at_campaign=rss",
      "title": "Israeli opposition accuses Netanyahu of trying to 'delegitimise' election",
      "url": "https://www.bbc.co.uk/news/articles/ckdd8qdl9e0eo?at_medium=RSS&at_campaign=rss",
      "publishedAt": "2026-10-29T20:21:54.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "bbc",
      "sourceTitle": "BBC World",
      "sourceUrl": "https://www.bbc.com/",
      "publisherId": "bbc.com",
      "excerpt": "The PM's Likud party has alleged foreign interference and said Arab-led parties \"stole\" the election after his coalition lost its majority.",
      "regions": [
        "中东"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/from-the-iran-war-to-gas-prices-how-foreign-policy-is-driving-the-2026-midterms",
      "title": "How War, Tariffs, and Other Foreign Policy Issues Could Affect the U.S. Midterms",
      "url": "https://www.cfr.org/articles/from-the-iran-war-to-gas-prices-how-foreign-policy-is-driving-the-2026-midterms",
      "publishedAt": "2026-10-29T19:33:03.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "北美"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.theguardian.com/world/2026/oct/29/jd-vance-letter-may-offer-last-chance-to-avert-fresh-conflict-between-us-and-iran",
      "title": "JD Vance letter may offer last chance to avert fresh conflict between US and Iran",
      "url": "https://www.theguardian.com/world/2026/oct/29/jd-vance-letter-may-offer-last-chance-to-avert-fresh-conflict-between-us-and-iran",
      "publishedAt": "2026-10-29T19:32:24.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "regions": [
        "中东",
        "北美"
      ],
      "score": 13,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.aljazeera.com/news/2026/10/29/trump-says-wont-take-sides-in-brazil-election-but-calls-it-a-disgrace?traffic_source=rss",
      "title": "Trump says won’t ‘take sides’ in Brazil election, but calls it a ‘disgrace’",
      "url": "https://www.aljazeera.com/news/2026/10/29/trump-says-wont-take-sides-in-brazil-election-but-calls-it-a-disgrace?traffic_source=rss",
      "publishedAt": "2026-10-29T19:21:19.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "aljazeera",
      "sourceTitle": "Al Jazeera",
      "sourceUrl": "https://www.aljazeera.com/",
      "publisherId": "aljazeera.com",
      "excerpt": "Comments come after Trump ally Flavio Bolsonaro fled to Miami in US and claimed, without evidence, that vote was stolen.",
      "regions": [
        "拉美与加勒比"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/eu-seeks-highest-level-ties-with-canada-in-montreal-summit/a-79800299?maca=en-rss-en-all-1573-rdf",
      "title": "EU seeks 'highest level' ties with Canada in Montreal summit",
      "url": "https://www.dw.com/en/eu-seeks-highest-level-ties-with-canada-in-montreal-summit/a-79800299?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-29T18:50:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "European Commission President Ursula von der Leyen said EU seeks \"association without accession\" for Canada, after EU members snub \"associate member\" designation.",
      "regions": [
        "欧洲",
        "北美"
      ],
      "score": 34,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.aljazeera.com/news/2026/10/29/texas-republican-group-seeks-to-block-certification-of-states-election?traffic_source=rss",
      "title": "Texas Republican group seeks to block certification of state’s election",
      "url": "https://www.aljazeera.com/news/2026/10/29/texas-republican-group-seeks-to-block-certification-of-states-election?traffic_source=rss",
      "publishedAt": "2026-10-29T18:40:01.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "aljazeera",
      "sourceTitle": "Al Jazeera",
      "sourceUrl": "https://www.aljazeera.com/",
      "publisherId": "aljazeera.com",
      "excerpt": "Republicans in a Texas county have filed a lawsuit asking for ballots in the state's midterm races to be hand-counted.",
      "regions": [
        "全球议题"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.theguardian.com/world/2026/oct/29/hong-kong-john-lee-apologises-wang-fuk-court-fire-killed-168-people",
      "title": "Hong Kong’s leader apologises for residential fire that killed 168 people",
      "url": "https://www.theguardian.com/world/2026/oct/29/hong-kong-john-lee-apologises-wang-fuk-court-fire-killed-168-people",
      "publishedAt": "2026-10-29T18:14:21.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "publisherId": "theguardian.com",
      "excerpt": "Blaze was world’s deadliest residential fire since 1980, but some survivors and bereaved families say justice has yet to be servedHong Kong’s leader has apologised for government shortcomings that contributed to a fire that killed 168 people in the city last year, a rare sign of public contrition that nevertheless failed to impress some victims’ families.The chief executive, John Lee, and seven other officials bowed in apology at the release of a report that pointed to “decades of failure” by government bodies. Continue reading...",
      "regions": [
        "全球议题"
      ],
      "score": 36,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.aljazeera.com/news/2026/10/29/albanian-opposition-storms-parliament-sets-off-flares-and-smoke-bombs?traffic_source=rss",
      "title": "Albanian opposition storms parliament, sets off flares and smoke bombs",
      "url": "https://www.aljazeera.com/news/2026/10/29/albanian-opposition-storms-parliament-sets-off-flares-and-smoke-bombs?traffic_source=rss",
      "publishedAt": "2026-10-29T18:11:46.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "aljazeera",
      "sourceTitle": "Al Jazeera",
      "sourceUrl": "https://www.aljazeera.com/",
      "regions": [
        "全球议题"
      ],
      "score": 7,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.theguardian.com/world/live/2026/oct/29/israel-election-results-live-updates-poll-netanyahu-eisenkot-bloc-coalition-latest-news",
      "title": "Israel election results: Qatar says accusations of election interference in Israel ‘ridiculous and dangerous’ – as it happened",
      "url": "https://www.theguardian.com/world/live/2026/oct/29/israel-election-results-live-updates-poll-netanyahu-eisenkot-bloc-coalition-latest-news",
      "publishedAt": "2026-10-29T17:49:57.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "publisherId": "theguardian.com",
      "excerpt": "Netanyahu’s claim of interference in election also dismissed by Israeli police and opposition partiesIsrael’s choice: Netanyahu remaining in power or a Palestinian-backed coalitionGadi Eisenkot, leader of the Yashar party and Benjamin Netanyahu’s main rival, has warned political opponents against exploiting allegations of foreign interference in Israel’s election to delay the swearing-in of the next Knesset.In remarks posted on X, Eisenkot said:Israel must safeguard the integrity of the elections against any attempt at interference, spin and manipulation, and examine every complaint thoroughly. On the other hand, political actors must not be allowed to exploit the situation and affect the swearing-in date of the 26th Knesset.”",
      "regions": [
        "中东"
      ],
      "score": 40,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/israel-election-authorities-dispute-netanyahu-s-fraud-claims/a-79799574?maca=en-rss-en-all-1573-rdf",
      "title": "Israel election: Authorities dispute Netanyahu’s fraud claims",
      "url": "https://www.dw.com/en/israel-election-authorities-dispute-netanyahu-s-fraud-claims/a-79799574?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-29T17:32:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "Benjamin Netanyahu's Likud claims large-scale foreign involvement in the elections led by Qatar and Turkey, with Israel’s authorities so far refuting the claims.",
      "regions": [
        "中东"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.bbc.co.uk/news/articles/cq8ezj7jylrzo?at_medium=RSS&at_campaign=rss",
      "title": "EU chief lays out vision for new Canada partnership at Montreal summit",
      "url": "https://www.bbc.co.uk/news/articles/cq8ezj7jylrzo?at_medium=RSS&at_campaign=rss",
      "publishedAt": "2026-10-29T17:02:59.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "bbc",
      "sourceTitle": "BBC World",
      "sourceUrl": "https://www.bbc.com/",
      "publisherId": "bbc.com",
      "excerpt": "Ursula von der Leyen continued to use the term \"associate member\" for Canada despite some opposition of the bloc's members, including Germany.",
      "regions": [
        "欧洲",
        "北美"
      ],
      "score": 34,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/india-increases-growth-forecast-for-fiscal-year/a-79798971?maca=en-rss-en-all-1573-rdf",
      "title": "India increases growth forecast for fiscal year",
      "url": "https://www.dw.com/en/india-increases-growth-forecast-for-fiscal-year/a-79798971?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-29T16:30:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "India's Ministry of Finance has increased its growth forecasts for the current fiscal year. But it also warned about inflation, particularly for fuel and energy, amid continued instability in the Middle East.",
      "regions": [
        "南亚"
      ],
      "score": 38,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/the-aid-system-is-doing-less-with-less-yet-grading-itself-far-too-kindly",
      "title": "The aid system is doing less with less, yet grading itself far too kindly",
      "url": "https://www.lowyinstitute.org/the-interpreter/the-aid-system-is-doing-less-with-less-yet-grading-itself-far-too-kindly",
      "publishedAt": "2026-10-29T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Humanitarian aid is failing more cheaply, not more efficiently.",
      "regions": [
        "全球议题"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.bbc.co.uk/news/articles/c3x2w4109pj8o?at_medium=RSS&at_campaign=rss",
      "title": "Flávio Bolsonaro calls himself 'leader of Brazil' after election loss",
      "url": "https://www.bbc.co.uk/news/articles/c3x2w4109pj8o?at_medium=RSS&at_campaign=rss",
      "publishedAt": "2026-10-29T14:58:28.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "bbc",
      "sourceTitle": "BBC World",
      "sourceUrl": "https://www.bbc.com/",
      "publisherId": "bbc.com",
      "excerpt": "The defeated presidential candidate says he will lead the opposition from the US.",
      "regions": [
        "拉美与加勒比"
      ],
      "score": 40,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/soviet-tactical-nuclear-weapons-in-cuba-cuban-missile-crisis-a-coda",
      "title": "Soviet Tactical Nuclear Weapons in Cuba—Cuban Missile Crisis, a Coda",
      "url": "https://www.cfr.org/articles/soviet-tactical-nuclear-weapons-in-cuba-cuban-missile-crisis-a-coda",
      "publishedAt": "2026-10-29T14:50:44.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "拉美与加勒比"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/human-trafficking-victims-stranded-in-guinea-bissau/a-79785558?maca=en-rss-en-all-1573-rdf",
      "title": "Human trafficking victims stranded in Guinea-Bissau",
      "url": "https://www.dw.com/en/human-trafficking-victims-stranded-in-guinea-bissau/a-79785558?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-29T14:20:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "欧洲",
        "非洲"
      ],
      "score": 10,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.bbc.co.uk/news/articles/cq5ynw94k7kzo?at_medium=RSS&at_campaign=rss",
      "title": "Record number of purges as Xi emphasises 'party discipline' at China political gathering",
      "url": "https://www.bbc.co.uk/news/articles/cq5ynw94k7kzo?at_medium=RSS&at_campaign=rss",
      "publishedAt": "2026-10-29T12:49:17.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "bbc",
      "sourceTitle": "BBC World",
      "sourceUrl": "https://www.bbc.com/",
      "regions": [
        "东亚"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/us-moves-to-lift-sanctions-on-russia-s-shadow-fleet-could-undermine-western-pressure-on-moscow-and-help-fund-its-war-in-ukraine/a-79787035?maca=en-rss-en-all-1573-rdf",
      "title": "US moves to lift sanctions on Russia's shadow fleet could undermine Western pressure on Moscow and help fund its war in Ukraine.",
      "url": "https://www.dw.com/en/us-moves-to-lift-sanctions-on-russia-s-shadow-fleet-could-undermine-western-pressure-on-moscow-and-help-fund-its-war-in-ukraine/a-79787035?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-29T12:01:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "The US is reportedly considering ways to convert \"dark tankers\" into legitimate vessels, allowing them to transport crude oil that is not subject to sanctions.",
      "regions": [
        "欧洲",
        "俄罗斯与中亚",
        "北美"
      ],
      "score": 32,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://e.vnexpress.net/photo/traffic/ho-chi-minh-city-unveils-tower-design-for-multi-level-interchange-linking-roads-to-seaports-long-thanh-airport-5138372.html",
      "title": "Ho Chi Minh City unveils tower design for multi-level interchange linking roads to seaports, Long Thanh airport",
      "url": "https://e.vnexpress.net/photo/traffic/ho-chi-minh-city-unveils-tower-design-for-multi-level-interchange-linking-roads-to-seaports-long-thanh-airport-5138372.html",
      "publishedAt": "2026-10-29T12:00:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "regions": [
        "东南亚"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.bbc.co.uk/news/articles/cm87zw51qw0jo?at_medium=RSS&at_campaign=rss",
      "title": "US sanctions Rwanda's defence ministry over DR Congo conflict",
      "url": "https://www.bbc.co.uk/news/articles/cm87zw51qw0jo?at_medium=RSS&at_campaign=rss",
      "publishedAt": "2026-10-29T11:25:16.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "bbc",
      "sourceTitle": "BBC World",
      "sourceUrl": "https://www.bbc.com/",
      "publisherId": "bbc.com",
      "excerpt": "Congo accuses Rwanda of backing M23 rebels and plundering minerals in its conflict hit East",
      "regions": [
        "北美",
        "非洲"
      ],
      "score": 40,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/israel-the-excellent-election-that-settled-nothing",
      "title": "Israel: The Excellent Election That Settled Nothing",
      "url": "https://www.cfr.org/articles/israel-the-excellent-election-that-settled-nothing",
      "publishedAt": "2026-10-29T11:09:25.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "中东"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/ship-reported-on-fire-off-oman-as-iran-escalation-fears-mount/a-79792733?maca=en-rss-en-all-1573-rdf",
      "title": "Ship reported on fire off Oman as Iran escalation fears mount",
      "url": "https://www.dw.com/en/ship-reported-on-fire-off-oman-as-iran-escalation-fears-mount/a-79792733?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-29T10:04:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "A ship in the Strait of Hormuz is reported to be on fire, a British maritime agency says. Iran has meanwhile said it has shot down another US drone as military tensions with Washington continue.",
      "regions": [
        "中东"
      ],
      "score": 17,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.channelnewsasia.com/east-asia/has-china-ai-bubble-burst-global-tech-boom-6502616",
      "title": "Has China’s AI bubble burst? What this means for the global tech boom",
      "url": "https://www.channelnewsasia.com/east-asia/has-china-ai-bubble-burst-global-tech-boom-6502616",
      "publishedAt": "2026-10-29T09:53:40.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "cna",
      "sourceTitle": "CNA 亚洲新闻",
      "sourceUrl": "https://www.channelnewsasia.com/",
      "regions": [
        "全球议题",
        "东亚"
      ],
      "score": 10,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://e.vnexpress.net/news/news/education/dartmouth-provost-resigns-over-ai-use-in-published-articles-5138431.html",
      "title": "Dartmouth provost resigns over AI use in published articles",
      "url": "https://e.vnexpress.net/news/news/education/dartmouth-provost-resigns-over-ai-use-in-published-articles-5138431.html",
      "publishedAt": "2026-10-29T09:15:41.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "regions": [
        "东南亚"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.bbc.co.uk/news/articles/cm62y46d97wwo?at_medium=RSS&at_campaign=rss",
      "title": "How could Israel break election deadlock? Here are four scenarios",
      "url": "https://www.bbc.co.uk/news/articles/cm62y46d97wwo?at_medium=RSS&at_campaign=rss",
      "publishedAt": "2026-10-29T09:06:48.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "bbc",
      "sourceTitle": "BBC World",
      "sourceUrl": "https://www.bbc.com/",
      "publisherId": "bbc.com",
      "excerpt": "With more than 90% of votes counted, all signs point to an impasse. The most likely outcome may be new elections.",
      "regions": [
        "中东"
      ],
      "score": 32,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.bbc.co.uk/news/articles/cw78prj801pvo?at_medium=RSS&at_campaign=rss",
      "title": "Ethiopia acquires Russian fighter jets and air defence systems amid war in Tigray",
      "url": "https://www.bbc.co.uk/news/articles/cw78prj801pvo?at_medium=RSS&at_campaign=rss",
      "publishedAt": "2026-10-29T08:23:31.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "bbc",
      "sourceTitle": "BBC World",
      "sourceUrl": "https://www.bbc.com/",
      "publisherId": "bbc.com",
      "excerpt": "The acquisition of the warplanes comes amid ongoing fighting in northern Tigray region that started last month.",
      "regions": [
        "俄罗斯与中亚",
        "非洲"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.channelnewsasia.com/asia/myanmar-local-aid-groups-help-vulnerable-communites-humanitarian-crisis-6499266",
      "title": "Local aid groups in Myanmar step up to help vulnerable communities amid worsening humanitarian crisis",
      "url": "https://www.channelnewsasia.com/asia/myanmar-local-aid-groups-help-vulnerable-communites-humanitarian-crisis-6499266",
      "publishedAt": "2026-10-29T08:19:09.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "cna",
      "sourceTitle": "CNA 亚洲新闻",
      "sourceUrl": "https://www.channelnewsasia.com/",
      "publisherId": "channelnewsasia.com",
      "excerpt": "With some 16.2 million people in Myanmar needing humanitarian aid in 2026, local organisations are helping bridge gaps by providing essential supplies and skills training.",
      "regions": [
        "东南亚"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.channelnewsasia.com/east-asia/moscow-pyongyang-workers-factories-6501861",
      "title": "Moscow, Pyongyang back network sending workers to Russian factories: Report",
      "url": "https://www.channelnewsasia.com/east-asia/moscow-pyongyang-workers-factories-6501861",
      "publishedAt": "2026-10-29T06:03:37.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "cna",
      "sourceTitle": "CNA 亚洲新闻",
      "sourceUrl": "https://www.channelnewsasia.com/",
      "publisherId": "channelnewsasia.com",
      "excerpt": "The neighbours have boosted military and political ties dramatically since pledging renewed cooperation at a 2023 summit of their leaders.",
      "regions": [
        "俄罗斯与中亚"
      ],
      "score": 21,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.theguardian.com/world/2026/oct/29/cambodian-police-scam-compounds-amnesty-international",
      "title": "Cambodian police and soldiers helped guard abusive scam compounds, Amnesty alleges",
      "url": "https://www.theguardian.com/world/2026/oct/29/cambodian-police-scam-compounds-amnesty-international",
      "publishedAt": "2026-10-29T06:00:26.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "publisherId": "theguardian.com",
      "excerpt": "Survivors tell rights group that serving officers who worked as guards administered electric shocks and beatingsCambodian police and military officers worked as private security guards in scam compounds where thousands were forced to work in the online fraud industry, according to a report by Amnesty International.The global rights group alleged they worked for security companies as part of a system that enabled slavery and rape in the compounds, with some guards using electric batons to keep people trapped. Continue reading...",
      "regions": [
        "东南亚"
      ],
      "score": 17,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://fulcrum.sg/article/commentaries/the-malay-unity-narrative-a-bridge-too-far/",
      "title": "The ‘Malay Unity’ Narrative: A Bridge Too Far?”",
      "url": "https://fulcrum.sg/article/commentaries/the-malay-unity-narrative-a-bridge-too-far/",
      "publishedAt": "2026-10-29T06:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "fulcrum",
      "sourceTitle": "ISEAS · Fulcrum",
      "sourceUrl": "https://fulcrum.sg/",
      "publisherId": "iseas",
      "excerpt": "Some Malays are warming to the idea of re-establishing Malay-Islamic unity to retain the privileged position of the race in Malaysia. Given political rivalries among Malay political parties, this might be a bridge too far.",
      "regions": [
        "东南亚"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://e.vnexpress.net/news/news/malaysia-intercepts-30-ai-chip-servers-bound-for-undisclosed-asian-country-5138009.html",
      "title": "Malaysia intercepts 30 AI chip servers bound for undisclosed Asian country",
      "url": "https://e.vnexpress.net/news/news/malaysia-intercepts-30-ai-chip-servers-bound-for-undisclosed-asian-country-5138009.html",
      "publishedAt": "2026-10-29T03:44:12.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "regions": [
        "东南亚",
        "北美"
      ],
      "score": 10,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.bbc.co.uk/news/articles/cj1dw9znd1q1o?at_medium=RSS&at_campaign=rss",
      "title": "'Like cutting up a Picasso': AI microdrama edit of Neighbours worries actors and crew",
      "url": "https://www.bbc.co.uk/news/articles/cj1dw9znd1q1o?at_medium=RSS&at_campaign=rss",
      "publishedAt": "2026-10-29T03:15:35.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "bbc",
      "sourceTitle": "BBC World",
      "sourceUrl": "https://www.bbc.com/",
      "regions": [
        "大洋洲"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.channelnewsasia.com/east-asia/china-lao-gan-ma-denies-layoffs-ai-6502126",
      "title": "China’s Lao Gan Ma denies mass layoffs linked to AI amid public backlash",
      "url": "https://www.channelnewsasia.com/east-asia/china-lao-gan-ma-denies-layoffs-ai-6502126",
      "publishedAt": "2026-10-29T03:12:03.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "cna",
      "sourceTitle": "CNA 亚洲新闻",
      "sourceUrl": "https://www.channelnewsasia.com/",
      "regions": [
        "东亚"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://e.vnexpress.net/news/news/politics/us-to-showcase-modern-military-equipment-at-vietnam-defense-expo-5138203.html",
      "title": "US to showcase modern military equipment at Vietnam defense expo",
      "url": "https://e.vnexpress.net/news/news/politics/us-to-showcase-modern-military-equipment-at-vietnam-defense-expo-5138203.html",
      "publishedAt": "2026-10-29T03:11:12.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "regions": [
        "东南亚",
        "北美"
      ],
      "score": 10,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/colombo-port-a-chinese-exit-gives-australia-a-renewed-chance",
      "title": "Colombo Port: A Chinese exit gives Australia a renewed chance",
      "url": "https://www.lowyinstitute.org/the-interpreter/colombo-port-a-chinese-exit-gives-australia-a-renewed-chance",
      "publishedAt": "2026-10-29T03:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东亚",
        "大洋洲",
        "南亚"
      ],
      "score": 4,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.channelnewsasia.com/asia/china-military-buildup-creates-pressure-southeast-asia-australia-6502011",
      "title": "Australian defence chief says China military buildup creating 'pressure' in Southeast Asia",
      "url": "https://www.channelnewsasia.com/asia/china-military-buildup-creates-pressure-southeast-asia-australia-6502011",
      "publishedAt": "2026-10-29T02:38:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "cna",
      "sourceTitle": "CNA 亚洲新闻",
      "sourceUrl": "https://www.channelnewsasia.com/",
      "publisherId": "channelnewsasia.com",
      "excerpt": "\"Now is a time to double down on friends and to double down on neighbours and to be working more closely together to provide for our collective security,\" said Australian Defence Minister Richard Marles.",
      "regions": [
        "东亚",
        "东南亚",
        "大洋洲"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.iseas.edu.sg/articles-commentaries/iseas-perspective/2026-77-nationalism-and-militarisation-in-thai-cambodian-border-conflict-2025-26-by-puangthong-pawakapan/",
      "title": "2026/77 “Nationalism and Militarisation in Thai-Cambodian Border Conflict 2025-26” by Puangthong Pawakapan",
      "url": "https://www.iseas.edu.sg/articles-commentaries/iseas-perspective/2026-77-nationalism-and-militarisation-in-thai-cambodian-border-conflict-2025-26-by-puangthong-pawakapan/",
      "publishedAt": "2026-10-29T02:26:05.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "iseas",
      "sourceTitle": "ISEAS Perspective",
      "sourceUrl": "https://www.iseas.edu.sg/",
      "publisherId": "iseas",
      "excerpt": "",
      "regions": [
        "东南亚"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://fulcrum.sg/article/commentaries/malaysias-budget-2027-the-growing-divide-in-federal-state-fiscal-transfers/",
      "title": "Malaysia’s Budget 2027: The Growing Divide in Federal-State Fiscal Transfers",
      "url": "https://fulcrum.sg/article/commentaries/malaysias-budget-2027-the-growing-divide-in-federal-state-fiscal-transfers/",
      "publishedAt": "2026-10-29T02:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "fulcrum",
      "sourceTitle": "ISEAS · Fulcrum",
      "sourceUrl": "https://fulcrum.sg/",
      "publisherId": "iseas",
      "excerpt": "There are clear reasons for allocating bigger grants to Sabah and Sarawak in Malaysia’s latest budget. But there is also a need to establish a more transparent and rules-based formula for distribution to the country’s various states.",
      "regions": [
        "东南亚"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/rubio-s-visits-are-not-enough-to-reset-india-us-relations",
      "title": "Rubio’s visits are not enough to reset India–US relations",
      "url": "https://www.lowyinstitute.org/the-interpreter/rubio-s-visits-are-not-enough-to-reset-india-us-relations",
      "publishedAt": "2026-10-29T01:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Structural ties endure, but Trump’s flip-flopping on energy policy has done lasting damage to Washington’s relationship with New Delhi.",
      "regions": [
        "南亚",
        "北美"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.bbc.co.uk/news/articles/c574pj3zljvjo?at_medium=RSS&at_campaign=rss",
      "title": "Building boom puts 300,000 people in the path of potential Himalayan disasters",
      "url": "https://www.bbc.co.uk/news/articles/c574pj3zljvjo?at_medium=RSS&at_campaign=rss",
      "publishedAt": "2026-10-28T23:11:59.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "bbc",
      "sourceTitle": "BBC World",
      "sourceUrl": "https://www.bbc.com/",
      "publisherId": "bbc.com",
      "excerpt": "The construction of tourism facilities, housing, and infrastructure has surged in parts of Nepal and India's Uttarakhand.",
      "regions": [
        "南亚"
      ],
      "score": 32,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/opcon-washington-wants-flexibility-seoul-wants-control",
      "title": "OPCON: Washington wants flexibility, Seoul wants control",
      "url": "https://www.lowyinstitute.org/the-interpreter/opcon-washington-wants-flexibility-seoul-wants-control",
      "publishedAt": "2026-10-28T23:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东亚",
        "北美"
      ],
      "score": 4,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.theguardian.com/world/2026/oct/28/european-union-canada",
      "title": "EU backs away from offer to Canada to start ‘associate member’ talks",
      "url": "https://www.theguardian.com/world/2026/oct/28/european-union-canada",
      "publishedAt": "2026-10-28T21:27:33.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "publisherId": "theguardian.com",
      "excerpt": "Watered-down version of statement to be issued at end of Montreal summit instead offers ‘ever closer association’The EU has backed away from its offer to Canada to start talks on becoming an “associate member” after disagreements between member states just as an EU-Canada summit was set to begin in Montreal.A draft of a joint statement to be issued after the end of the summit, which runs Thursday and Friday, showed a watered-down version offering “an ever closer association of Canada to the EU, short of full membership itself”. Continue reading...",
      "regions": [
        "欧洲",
        "北美"
      ],
      "score": 21,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/canada-shows-the-limits-of-trumps-hardball-trade-tactics",
      "title": "Canada Shows the Limits of Trump’s Hardball Trade Tactics",
      "url": "https://www.cfr.org/articles/canada-shows-the-limits-of-trumps-hardball-trade-tactics",
      "publishedAt": "2026-10-28T20:18:01.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "北美"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/australia-s-usd30-billion-base-boom-needs-scrutiny-too",
      "title": "Australia’s $30 billion base boom needs scrutiny too",
      "url": "https://www.lowyinstitute.org/the-interpreter/australia-s-usd30-billion-base-boom-needs-scrutiny-too",
      "publishedAt": "2026-10-28T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "大洋洲"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.bruegel.org/policy-brief/opportunity-stocktake-and-strengthen-governance-and-policies-european-central-bank",
      "title": "An opportunity to stocktake and strengthen the governance and policies of the European Central Bank",
      "url": "https://www.bruegel.org/policy-brief/opportunity-stocktake-and-strengthen-governance-and-policies-european-central-bank",
      "publishedAt": "2026-10-28T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "bruegel",
      "sourceTitle": "Bruegel",
      "sourceUrl": "https://www.bruegel.org/",
      "publisherId": "bruegel.org",
      "excerpt": "Imminent ECB Executive Board turnover is a chance to prioritise expertise in appointments, restore staggered terms and rethink policy communication",
      "regions": [
        "欧洲"
      ],
      "score": 31,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.channelnewsasia.com/asia/indonesia-jakarta-student-protest-prices-forest-fires-6499771",
      "title": "Indonesian students protest rising prices, government’s handling of forest fires",
      "url": "https://www.channelnewsasia.com/asia/indonesia-jakarta-student-protest-prices-forest-fires-6499771",
      "publishedAt": "2026-10-28T11:48:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "cna",
      "sourceTitle": "CNA 亚洲新闻",
      "sourceUrl": "https://www.channelnewsasia.com/",
      "publisherId": "channelnewsasia.com",
      "excerpt": "Protesters flocked to two of Jakarta’s busiest thoroughfares, carrying banners critical of President Prabowo Subianto’s policies.",
      "regions": [
        "东南亚"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.channelnewsasia.com/business/analysis-iran-war-drags-airlines-pull-back-fuel-hedges-and-warn-fares-6499631",
      "title": "Analysis: As Iran war drags on, airlines pull back on fuel hedges and warn on fares",
      "url": "https://www.channelnewsasia.com/business/analysis-iran-war-drags-airlines-pull-back-fuel-hedges-and-warn-fares-6499631",
      "publishedAt": "2026-10-28T10:54:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "cna",
      "sourceTitle": "CNA 亚洲新闻",
      "sourceUrl": "https://www.channelnewsasia.com/",
      "publisherId": "channelnewsasia.com",
      "excerpt": "Airlines that hedge at current elevated prices risk being locked into expensive fuel if geopolitical tensions ease and prices retreat.",
      "regions": [
        "中东"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.channelnewsasia.com/singapore/rts-link-train-fire-cross-border-exercise-6498921",
      "title": "Singapore, Malaysia test emergency response to simulated fire on stranded RTS Link train",
      "url": "https://www.channelnewsasia.com/singapore/rts-link-train-fire-cross-border-exercise-6498921",
      "publishedAt": "2026-10-28T08:31:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "cna",
      "sourceTitle": "CNA 亚洲新闻",
      "sourceUrl": "https://www.channelnewsasia.com/",
      "regions": [
        "东南亚"
      ],
      "score": 7,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://fulcrum.sg/article/commentaries/the-appeal-and-the-limits-of-dayakism-why-sarawak-first-still-wins/",
      "title": "The Appeal and the Limits of “Dayakism”: Why “Sarawak First” Still Wins",
      "url": "https://fulcrum.sg/article/commentaries/the-appeal-and-the-limits-of-dayakism-why-sarawak-first-still-wins/",
      "publishedAt": "2026-10-28T06:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "fulcrum",
      "sourceTitle": "ISEAS · Fulcrum",
      "sourceUrl": "https://fulcrum.sg/",
      "regions": [
        "东南亚"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://e.vnexpress.net/news/news/education/over-40-studies-explore-digital-and-green-transformation-at-buv-international-conference-5137452.html",
      "title": "Over 40 studies explore digital and green transformation at BUV international conference",
      "url": "https://e.vnexpress.net/news/news/education/over-40-studies-explore-digital-and-green-transformation-at-buv-international-conference-5137452.html",
      "publishedAt": "2026-10-28T06:00:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "regions": [
        "东南亚",
        "欧洲"
      ],
      "score": 10,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/eu-australia-fta-the-threat-to-ratification-runs-both-ways",
      "title": "EU–Australia FTA: the threat to ratification runs both ways",
      "url": "https://www.lowyinstitute.org/the-interpreter/eu-australia-fta-the-threat-to-ratification-runs-both-ways",
      "publishedAt": "2026-10-28T03:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "The hardest part of this trade agreement isn’t negotiating it, but winning approval.",
      "regions": [
        "欧洲",
        "大洋洲"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/serbia-election-marks-the-end-of-an-era",
      "title": "Serbia Election Marks the End of an Era",
      "url": "https://www.cfr.org/articles/serbia-election-marks-the-end-of-an-era",
      "publishedAt": "2026-10-28T02:20:42.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://fulcrum.sg/article/commentaries/malaysia-will-budget-2027-brighten-anwar-ibrahims-electoral-prospects/",
      "title": "Malaysia: Will Budget 2027 Brighten Anwar Ibrahim’s Electoral Prospects?",
      "url": "https://fulcrum.sg/article/commentaries/malaysia-will-budget-2027-brighten-anwar-ibrahims-electoral-prospects/",
      "publishedAt": "2026-10-28T02:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "fulcrum",
      "sourceTitle": "ISEAS · Fulcrum",
      "sourceUrl": "https://fulcrum.sg/",
      "publisherId": "iseas",
      "excerpt": "The Malaysian government’s latest budget contains several goodies for prospective voters. However, where the governing coalition’s general election performance is concerned, timing will be everything.",
      "regions": [
        "东南亚"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/australian-rifles-private-guns-and-png-s-2027-election",
      "title": "Australian rifles, private guns and PNG’s 2027 election",
      "url": "https://www.lowyinstitute.org/the-interpreter/australian-rifles-private-guns-and-png-s-2027-election",
      "publishedAt": "2026-10-28T01:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Security firms are armed up leading into polling season, but who do they answer to?",
      "regions": [
        "大洋洲"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/lula-limits-trump-s-latin-american-ambition",
      "title": "Lula limits Trump’s Latin American ambition",
      "url": "https://www.lowyinstitute.org/the-interpreter/lula-limits-trump-s-latin-american-ambition",
      "publishedAt": "2026-10-27T22:26:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Brazil’s election outcome tests whether a renewed Monroe Doctrine can survive Lula’s active non-alignment.",
      "regions": [
        "北美",
        "拉美与加勒比"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/latin-american-politics-are-shifting-to-the-right-whats-driving-this-trend",
      "title": "Understanding Latin America’s Rightward Political Shift",
      "url": "https://www.cfr.org/articles/latin-american-politics-are-shifting-to-the-right-whats-driving-this-trend",
      "publishedAt": "2026-10-27T20:40:24.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "拉美与加勒比"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/greater-sunrise-the-questions-woodside-s-exit-leaves-unanswered",
      "title": "Greater Sunrise: the questions Woodside’s exit leaves unanswered",
      "url": "https://www.lowyinstitute.org/the-interpreter/greater-sunrise-the-questions-woodside-s-exit-leaves-unanswered",
      "publishedAt": "2026-10-27T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东南亚"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.csis.org/analysis/decoding-right-repair-debate",
      "title": "Decoding the Right-to-Repair Debate",
      "url": "https://www.csis.org/analysis/decoding-right-repair-debate",
      "publishedAt": "2026-10-27T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "csis",
      "sourceTitle": "CSIS",
      "sourceUrl": "https://www.csis.org/",
      "publisherId": "csis.org",
      "excerpt": "The right-to-repair debate, concerning who controls U.S. defense IP, has become a contentious issue in defense acquisition policy. Lawmakers need to balance the military’s push for greater access to technical data and industry’s fear of losing revenue and IP control.",
      "regions": [
        "北美"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.csis.org/analysis/fy-2027-defense-funding-potential-post-midterm-outcomes",
      "title": "FY 2027 Defense Funding: Potential Post-Midterm Outcomes",
      "url": "https://www.csis.org/analysis/fy-2027-defense-funding-potential-post-midterm-outcomes",
      "publishedAt": "2026-10-27T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "csis",
      "sourceTitle": "CSIS",
      "sourceUrl": "https://www.csis.org/",
      "publisherId": "csis.org",
      "excerpt": "Congress has a full post-midterm agenda, with action needed to fund the Department of Defense and federal government and reconciliation legislation to consider. Seamus Daniels lays out the factors that will shape FY 2027 defense funding decisions after the midterms.",
      "regions": [
        "全球议题"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.brookings.edu/articles/how-dirty-tricks-harm-and-institutional-safeguards-protect-the-integrity-of-us-elections/",
      "title": "How dirty tricks harm, and institutional safeguards protect, the integrity of US elections",
      "url": "https://www.brookings.edu/articles/how-dirty-tricks-harm-and-institutional-safeguards-protect-the-integrity-of-us-elections/",
      "publishedAt": "2026-10-27T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "brookings",
      "sourceTitle": "Brookings Institution",
      "sourceUrl": "https://www.brookings.edu/",
      "publisherId": "brookings.edu",
      "excerpt": "",
      "regions": [
        "北美"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/how-do-americans-view-foreign-policy-ahead-of-the-midterms",
      "title": "How Americans View Foreign Policy Ahead of the Midterms",
      "url": "https://www.cfr.org/articles/how-do-americans-view-foreign-policy-ahead-of-the-midterms",
      "publishedAt": "2026-10-27T14:38:17.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "北美"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://e.vnexpress.net/photo/environment/ho-chi-minh-city-commuters-wade-through-floodwater-as-tide-exceeds-highest-alert-level-5137606.html",
      "title": "Ho Chi Minh City commuters wade through floodwater as tide exceeds highest alert level",
      "url": "https://e.vnexpress.net/photo/environment/ho-chi-minh-city-commuters-wade-through-floodwater-as-tide-exceeds-highest-alert-level-5137606.html",
      "publishedAt": "2026-10-27T13:14:46.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "regions": [
        "东南亚"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/germany-s-merz-says-erosion-of-global-order-means-middle-powers-in-europe-and-asia-must-be-more-assertive/live-79772992?maca=en-rss-en-all-1573-rdf",
      "title": "Germany's Merz says erosion of global order means middle powers in Europe and Asia must be more assertive",
      "url": "https://www.dw.com/en/germany-s-merz-says-erosion-of-global-order-means-middle-powers-in-europe-and-asia-must-be-more-assertive/live-79772992?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-27T09:49:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "During a visit to Singapore, German Chancellor Friedrich Merz said Europe and Germany want to increase free trade with open competition, reliability and a rules-based order.",
      "regions": [
        "全球议题",
        "欧洲"
      ],
      "score": 22,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://fulcrum.sg/article/commentaries/if-ai-rules-must-wait-southeast-asia-should-set-the-terms/",
      "title": "If AI Rules Must Wait, Southeast Asia Should Set the Terms",
      "url": "https://fulcrum.sg/article/commentaries/if-ai-rules-must-wait-southeast-asia-should-set-the-terms/",
      "publishedAt": "2026-10-27T04:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "fulcrum",
      "sourceTitle": "ISEAS · Fulcrum",
      "sourceUrl": "https://fulcrum.sg/",
      "publisherId": "iseas",
      "excerpt": "Giving companies time to comply with AI laws can be reasonable. The transition should clarify which records the institutions using these systems hold, what suppliers disclose, and who responds when a model changes or fails.",
      "regions": [
        "东南亚"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/takaichi-s-yasukuni-half-measure-satisfies-no-one",
      "title": "Takaichi’s Yasukuni half-measure satisfies no one",
      "url": "https://www.lowyinstitute.org/the-interpreter/takaichi-s-yasukuni-half-measure-satisfies-no-one",
      "publishedAt": "2026-10-27T03:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东亚"
      ],
      "score": 1,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/australia-should-do-more-to-back-japan-and-the-icc-in-the-face-of-us-sanctions",
      "title": "Australia should do more to back Japan and the ICC in the face of US sanctions",
      "url": "https://www.lowyinstitute.org/the-interpreter/australia-should-do-more-to-back-japan-and-the-icc-in-the-face-of-us-sanctions",
      "publishedAt": "2026-10-27T01:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "The US is sanctioning the ICC and its Japanese president – and Australia has offered little beyond private words.",
      "regions": [
        "东亚",
        "北美",
        "大洋洲"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/the-ai-enthusiasm-gap-is-a-dangerous-misnomer",
      "title": "The AI “enthusiasm” gap is a dangerous misnomer",
      "url": "https://www.lowyinstitute.org/the-interpreter/the-ai-enthusiasm-gap-is-a-dangerous-misnomer",
      "publishedAt": "2026-10-26T23:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Framing China’s public support for AI as an advantage nudges Americans to surrender debate, with costs for democracy.",
      "regions": [
        "东亚",
        "北美"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/asia-s-forced-labour-bans-should-fix-abuses-not-just-block-goods",
      "title": "Asia’s forced labour bans should fix abuses, not just block goods",
      "url": "https://www.lowyinstitute.org/the-interpreter/asia-s-forced-labour-bans-should-fix-abuses-not-just-block-goods",
      "publishedAt": "2026-10-26T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Import restrictions can pressure suppliers to clean up their act, but only if there is a clear route back to compliance.",
      "regions": [
        "全球议题"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.csis.org/analysis/business-support-human-rights-defenders-era-government-retrenchment",
      "title": "Business Support for Human Rights Defenders in an Era of Government Retrenchment",
      "url": "https://www.csis.org/analysis/business-support-human-rights-defenders-era-government-retrenchment",
      "publishedAt": "2026-10-26T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "csis",
      "sourceTitle": "CSIS",
      "sourceUrl": "https://www.csis.org/",
      "publisherId": "csis.org",
      "excerpt": "Human rights defenders are vital partners for businesses operating around the globe. Civic space and the business operating environment are fundamentally intertwined. Businesses should, can, and have supported HRDs in their important work, and such support is more needed than ever.",
      "regions": [
        "全球议题"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.csis.org/analysis/ant-and-grasshopper-revised-version",
      "title": "The Ant and the Grasshopper—Revised Version",
      "url": "https://www.csis.org/analysis/ant-and-grasshopper-revised-version",
      "publishedAt": "2026-10-26T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "csis",
      "sourceTitle": "CSIS",
      "sourceUrl": "https://www.csis.org/",
      "publisherId": "csis.org",
      "excerpt": "In this week’s column, Bill Reinsch discusses the administration’s challenges in implementing some elements of its trade policies.",
      "regions": [
        "全球议题"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.csis.org/analysis/book-event-lifeline-john-donnelly",
      "title": "Book Event: Lifeline by John Donnelly",
      "url": "https://www.csis.org/analysis/book-event-lifeline-john-donnelly",
      "publishedAt": "2026-10-26T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "csis",
      "sourceTitle": "CSIS",
      "sourceUrl": "https://www.csis.org/",
      "publisherId": "csis.org",
      "excerpt": "The CSIS Bipartisan Alliance for Global Health Security and CSIS Africa Program hosted John Donnelly for a discussion of his recently published book, Lifeline: The Story of PEPFAR, the Greatest Humanitarian Initiative of Our Time.",
      "regions": [
        "全球议题",
        "非洲"
      ],
      "score": 21,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.bruegel.org/analysis/why-ai-goes-rogue-and-what-can-be-done-about-it",
      "title": "Why AI goes rogue and what can be done about it",
      "url": "https://www.bruegel.org/analysis/why-ai-goes-rogue-and-what-can-be-done-about-it",
      "publishedAt": "2026-10-26T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "bruegel",
      "sourceTitle": "Bruegel",
      "sourceUrl": "https://www.bruegel.org/",
      "publisherId": "bruegel.org",
      "excerpt": "There are technical, political and behavioural responses to rogue AI, but risks cannot be fully eradicated",
      "regions": [
        "全球议题"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.theguardian.com/global-development/2026/oct/26/uk-sanctions-sudanese-military-leaders-implicated-in-el-fasher-campaign-of",
      "title": "UK sanctions Sudanese military leaders implicated in El Fasher ‘campaign of rape’",
      "url": "https://www.theguardian.com/global-development/2026/oct/26/uk-sanctions-sudanese-military-leaders-implicated-in-el-fasher-campaign-of",
      "publishedAt": "2026-10-26T15:07:23.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "publisherId": "theguardian.com",
      "excerpt": "Commanders suspected of sexual violence during the largest and fastest slaughter of civilians in more than 30 years have been subjected to travel ban and asset freezeSenior Sudanese commanders implicated in a “campaign of rape” have been targeted by the UK on the first anniversary of a mass atrocity that saw tens of thousands of civilians killed over several days.A year after the fall of El Fasher, the British government said it had sanctioned military leaders from both sides in the country’s ongoing conflict whom it suspected of sexual violence during the siege of the city.",
      "regions": [
        "欧洲",
        "非洲"
      ],
      "score": 40,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/how-i-got-my-career-in-foreign-policy-rebecca-bill-chavez",
      "title": "How I Got My Career in Foreign Policy: Rebecca Bill Chavez",
      "url": "https://www.cfr.org/articles/how-i-got-my-career-in-foreign-policy-rebecca-bill-chavez",
      "publishedAt": "2026-10-26T13:59:10.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.theguardian.com/global-development/2026/oct/26/us-forces-accused-of-weaponising-somalia-flood-el-nino",
      "title": "US forces accused of ‘weaponising’ Somalia’s floods by trapping women and children in the path of El Niño",
      "url": "https://www.theguardian.com/global-development/2026/oct/26/us-forces-accused-of-weaponising-somalia-flood-el-nino",
      "publishedAt": "2026-10-26T11:00:40.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "regions": [
        "北美",
        "非洲"
      ],
      "score": 11,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://e.vnexpress.net/news/news/education/rmit-partners-convene-over-550-experts-to-discuss-youth-wellbeing-5135461.html",
      "title": "RMIT, partners convene over 550 experts to discuss youth wellbeing",
      "url": "https://e.vnexpress.net/news/news/education/rmit-partners-convene-over-550-experts-to-discuss-youth-wellbeing-5135461.html",
      "publishedAt": "2026-10-26T10:00:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "publisherId": "e.vnexpress.net",
      "excerpt": "More than 550 educators, mental health professionals, social workers and medical practitioners from Vietnam and abroad gathered at the Vietnam Wellbeing & Safeguarding Summit 2026 to discuss support for children and young people.",
      "regions": [
        "东南亚"
      ],
      "score": 21,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.theguardian.com/world/2026/oct/26/sudan-paramilitary-drone-strikes-rapid-support-forces-power-cuts-eastern-states",
      "title": "Sudan paramilitary drone strikes cause mass power cuts in eastern states",
      "url": "https://www.theguardian.com/world/2026/oct/26/sudan-paramilitary-drone-strikes-rapid-support-forces-power-cuts-eastern-states",
      "publishedAt": "2026-10-26T09:59:27.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "publisherId": "theguardian.com",
      "excerpt": "Rapid Support Forces strike five power stations in three states controlled by Sudanese armySudan’s paramilitary Rapid Support Forces have launched a coordinated drone attack against five power stations, causing mass power outages across the country’s east, a government official said.The drones hit two power stations each in the states of Al-Jazira and Gedaref and one in White Nile state, “resulting in power outages across large parts of these three states”, the official said on condition of anonymity. Continue reading...",
      "regions": [
        "非洲"
      ],
      "score": 42,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://e.vnexpress.net/news/news/politics/vietnam-poland-establish-strategic-partnership-set-6b-trade-target-5137060.html",
      "title": "Vietnam, Poland establish strategic partnership, set $6B trade target",
      "url": "https://e.vnexpress.net/news/news/politics/vietnam-poland-establish-strategic-partnership-set-6b-trade-target-5137060.html",
      "publishedAt": "2026-10-26T08:35:06.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "publisherId": "e.vnexpress.net",
      "excerpt": "Vietnam and Poland established a strategic partnership on Oct. 26, setting a US$6 billion two-way trade target for 2030 and agreeing to deepen defense and security ties.",
      "regions": [
        "东南亚",
        "欧洲"
      ],
      "score": 44,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/from-rotten-food-to-political-opponents-researchers-explore-how-disgust-relates-to-our-beliefs-and-why-the-connection-is-complicated/a-79734659?maca=en-rss-en-all-1573-rdf",
      "title": "From rotten food to political opponents: Researchers explore how disgust relates to our beliefs, and why the connection is complicated",
      "url": "https://www.dw.com/en/from-rotten-food-to-political-opponents-researchers-explore-how-disgust-relates-to-our-beliefs-and-why-the-connection-is-complicated/a-79734659?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-26T08:13:00.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "北美"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://e.vnexpress.net/news/news/environment/thailand-s-tourist-hotspot-phuket-paralyzed-by-flash-floods-mudslides-5137021.html",
      "title": "Thailand's tourist hotspot Phuket paralyzed by flash floods, mudslides",
      "url": "https://e.vnexpress.net/news/news/environment/thailand-s-tourist-hotspot-phuket-paralyzed-by-flash-floods-mudslides-5137021.html",
      "publishedAt": "2026-10-26T07:41:29.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "regions": [
        "东南亚"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://e.vnexpress.net/news/news/crime/40-000-vietnamese-duped-into-16m-money-making-scam-on-ai-livestream-platform-5136944.html",
      "title": "40,000 Vietnamese duped into $16M money-making scam on AI livestream platform",
      "url": "https://e.vnexpress.net/news/news/crime/40-000-vietnamese-duped-into-16m-money-making-scam-on-ai-livestream-platform-5136944.html",
      "publishedAt": "2026-10-26T06:16:12.000Z",
      "week": "2026-10-26",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "regions": [
        "东南亚",
        "北美"
      ],
      "score": 10,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://fulcrum.sg/article/commentaries/transparency-needed-as-southeast-asia-pushes-ahead-on-ai/",
      "title": "Transparency Needed as Southeast Asia Pushes Ahead on AI",
      "url": "https://fulcrum.sg/article/commentaries/transparency-needed-as-southeast-asia-pushes-ahead-on-ai/",
      "publishedAt": "2026-10-26T04:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "fulcrum",
      "sourceTitle": "ISEAS · Fulcrum",
      "sourceUrl": "https://fulcrum.sg/",
      "publisherId": "iseas",
      "excerpt": "Southeast Asians are divided over whether Artificial Intelligence (AI) helps or harms the environment. Regional governments should push data centres to be more transparent about how their operations impact the environment.",
      "regions": [
        "东南亚"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.csis.org/analysis/new-zealands-two-track-china-policy",
      "title": "New Zealand’s Two-Track China Policy",
      "url": "https://www.csis.org/analysis/new-zealands-two-track-china-policy",
      "publishedAt": "2026-10-25T16:00:00.000Z",
      "week": "2026-10-26",
      "kind": "report",
      "sourceId": "csis",
      "sourceTitle": "CSIS",
      "sourceUrl": "https://www.csis.org/",
      "publisherId": "csis.org",
      "excerpt": "New Zealand is hardening its stance toward China as security concerns mount, but deep economic dependence on Beijing limits how far Wellington can realign with its Western partners.",
      "regions": [
        "东亚",
        "大洋洲"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/australia-s-green-iron-gamble-needs-more-ambition-to-convince-asia",
      "title": "Australia’s green iron gamble needs more ambition to convince Asia",
      "url": "https://www.lowyinstitute.org/the-interpreter/australia-s-green-iron-gamble-needs-more-ambition-to-convince-asia",
      "publishedAt": "2026-10-25T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "大洋洲"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/pacific-women-are-already-doing-the-work-cop31-must-back-them",
      "title": "Pacific women are already doing the work. COP31 must back them",
      "url": "https://www.lowyinstitute.org/the-interpreter/pacific-women-are-already-doing-the-work-cop31-must-back-them",
      "publishedAt": "2026-10-25T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "全球议题"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/drones-are-breaking-the-deal-that-once-kept-aid-workers-safe",
      "title": "Drones are breaking the deal that once kept aid workers safe",
      "url": "https://www.lowyinstitute.org/the-interpreter/drones-are-breaking-the-deal-that-once-kept-aid-workers-safe",
      "publishedAt": "2026-10-25T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "A record number of aid workers are now being killed or hurt by drones, and old NGO security practice cannot keep up.",
      "regions": [
        "全球议题"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/asean-haze-the-tech-is-ready-the-enforcement-isn-t",
      "title": "ASEAN haze: the tech is ready, the enforcement isn’t",
      "url": "https://www.lowyinstitute.org/the-interpreter/asean-haze-the-tech-is-ready-the-enforcement-isn-t",
      "publishedAt": "2026-10-25T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Satellite and AI capability is outpacing the institutions built to act on it.",
      "regions": [
        "东南亚"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/france-hundreds-arrested-after-nationwide-protests/live-79748223?maca=en-rss-en-all-1573-rdf",
      "title": "France: Hundreds arrested after nationwide protests",
      "url": "https://www.dw.com/en/france-hundreds-arrested-after-nationwide-protests/live-79748223?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-25T12:05:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "The French government says more than 1,000 people were arrested following nationwide protests on Saturday. Police and elite security forces were out in force across the country as clashes broke out.",
      "regions": [
        "欧洲"
      ],
      "score": 24,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/in-bulgaria-record-low-voter-turnout-triggers-a-november-1-presidential-run-off-in-a-poll-colored-by-divisions-over-ukraine-war/a-79753496?maca=en-rss-en-all-1573-rdf",
      "title": "In Bulgaria, record low voter turnout triggers a November 1 presidential run-off in a poll colored by divisions over Ukraine war",
      "url": "https://www.dw.com/en/in-bulgaria-record-low-voter-turnout-triggers-a-november-1-presidential-run-off-in-a-poll-colored-by-divisions-over-ukraine-war/a-79753496?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-25T07:19:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "Low voter turnout has triggered a run-off for the Bulgarian presidency. The vote was colored by strong divisions over Russia's war in Ukraine, and Sofia's relations with the Kremlin.",
      "regions": [
        "欧洲"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/turkey-s-new-deal-on-mediterranean-maritime-boundaries-with-libya-is-exacerbating-issues-with-greece-and-the-eu/a-79745971?maca=en-rss-en-all-1573-rdf",
      "title": "Turkey's new deal on Mediterranean maritime boundaries with Libya is exacerbating issues with Greece and the EU",
      "url": "https://www.dw.com/en/turkey-s-new-deal-on-mediterranean-maritime-boundaries-with-libya-is-exacerbating-issues-with-greece-and-the-eu/a-79745971?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-24T14:09:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "中东",
        "欧洲",
        "非洲"
      ],
      "score": 11,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://e.vnexpress.net/news/news/ai-trained-on-40-million-face-images-can-estimate-biological-age-and-cancer-survival-odds-from-just-one-photo-5136167.html",
      "title": "AI trained on 40 million face images can estimate biological age and cancer survival odds from just one photo",
      "url": "https://e.vnexpress.net/news/news/ai-trained-on-40-million-face-images-can-estimate-biological-age-and-cancer-survival-odds-from-just-one-photo-5136167.html",
      "publishedAt": "2026-10-24T08:00:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "vnexpress",
      "sourceTitle": "VnExpress International",
      "sourceUrl": "https://e.vnexpress.net/",
      "regions": [
        "东南亚"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/serbia-hope-tension-and-apprehension-as-voters-prepare-to-elect-new-parliament/a-79738102?maca=en-rss-en-all-1573-rdf",
      "title": "Serbia: Hope, tension and apprehension as voters prepare to elect new parliament",
      "url": "https://www.dw.com/en/serbia-hope-tension-and-apprehension-as-voters-prepare-to-elect-new-parliament/a-79738102?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-23T11:43:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "After two years of protests, Serbia faces a pivotal election on Sunday, with a student-led challenge to Aleksandar Vucic's lengthy rule. Allegations of electoral irregularities and fears of a post-election crisis abound.",
      "regions": [
        "全球议题"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.theguardian.com/global-development/2026/oct/23/india-cuts-cost-cancer-drugs",
      "title": "India slashes cost of cancer drugs after court rules mark-ups are ‘extortion’",
      "url": "https://www.theguardian.com/global-development/2026/oct/23/india-cuts-cost-cancer-drugs",
      "publishedAt": "2026-10-23T07:00:03.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "guardian",
      "sourceTitle": "The Guardian · World",
      "sourceUrl": "https://www.theguardian.com/",
      "publisherId": "theguardian.com",
      "excerpt": "Case filed in 2022 by patient unable to afford medicine leads to cap on drug prices for millions who face ruin if diagnosedThe Indian government has moved to reduce the price of cancer drugs after a retired bank clerk took her case to the supreme court.From next month, 137 cancer drugs in India will be cheaper as the government tries to tackle the tragedy of poorer patients either forgoing treatment, selling land or falling into debt to meet the high cost of some medicines, which are making large profits for hospitals and pharmacists. Continue reading...",
      "regions": [
        "南亚"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://fulcrum.sg/article/aseanfocus/countering-misinformation-where-asean-can-make-a-difference/",
      "title": "Countering Misinformation: Where ASEAN Can Make a Difference",
      "url": "https://fulcrum.sg/article/aseanfocus/countering-misinformation-where-asean-can-make-a-difference/",
      "publishedAt": "2026-10-23T06:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "fulcrum",
      "sourceTitle": "ISEAS · Fulcrum",
      "sourceUrl": "https://fulcrum.sg/",
      "publisherId": "iseas",
      "excerpt": "Dien Nguyen An Luong suggests that Singapore’s 2027 ASEAN Chairmanship could strengthen regional cooperation on countering misinformation by helping member states identify links between seemingly isolated incidents and investigate coordinated cross-border networks.",
      "regions": [
        "东南亚"
      ],
      "score": 17,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/serbia-tens-of-thousands-rally-ahead-of-elections/a-79738420?maca=en-rss-en-all-1573-rdf",
      "title": "Serbia: Tens of thousands rally ahead of elections",
      "url": "https://www.dw.com/en/serbia-tens-of-thousands-rally-ahead-of-elections/a-79738420?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-23T03:15:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "After two years of student-led protests, Serbia will soon vote in what observers describe as a referendum-like snap election pitting strongman Aleksandar Vucic against the student movement.",
      "regions": [
        "全球议题"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://fulcrum.sg/article/long-reads/who-can-actually-stop-the-machine-the-institutional-test-for-ai-governance-in-southeast-asia/",
      "title": "Who Can Actually Stop the Machine? The Institutional Test for AI Governance in Southeast Asia",
      "url": "https://fulcrum.sg/article/long-reads/who-can-actually-stop-the-machine-the-institutional-test-for-ai-governance-in-southeast-asia/",
      "publishedAt": "2026-10-23T02:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "fulcrum",
      "sourceTitle": "ISEAS · Fulcrum",
      "sourceUrl": "https://fulcrum.sg/",
      "publisherId": "iseas",
      "excerpt": "The credibility of AI governance in Southeast Asia will be decided not by the volume of frameworks that exist, but by whether some identifiable institution has the authority to stop a deployment, the independence to use it, and the technical capacity to justify it, and whether its decisions can be reconstructed afterwards.",
      "regions": [
        "东南亚"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/israels-election-whos-who-and-whats-at-stake",
      "title": "Israel’s Election: Understanding Who’s Who and What’s at Stake",
      "url": "https://www.cfr.org/articles/israels-election-whos-who-and-whats-at-stake",
      "publishedAt": "2026-10-22T20:14:59.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "中东"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.csis.org/analysis/did-united-states-and-russia-just-agree-collaborate-data-centers",
      "title": "Did the United States and Russia Just Agree to Collaborate on Data Centers?",
      "url": "https://www.csis.org/analysis/did-united-states-and-russia-just-agree-collaborate-data-centers",
      "publishedAt": "2026-10-22T16:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "csis",
      "sourceTitle": "CSIS",
      "sourceUrl": "https://www.csis.org/",
      "publisherId": "csis.org",
      "excerpt": "A joint data center proposed as part of broader negotiations between the United States and Russia poses a substantive threat to U.S. national security. Congress should play a vital role in scrutinizing the idea before it becomes a reality.",
      "regions": [
        "俄罗斯与中亚",
        "北美"
      ],
      "score": 25,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.csis.org/analysis/ukraine-and-south-koreas-diplomatic-dispute-deepens-state-play",
      "title": "Ukraine and South Korea’s Diplomatic Dispute Deepens | State of Play",
      "url": "https://www.csis.org/analysis/ukraine-and-south-koreas-diplomatic-dispute-deepens-state-play",
      "publishedAt": "2026-10-22T16:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "csis",
      "sourceTitle": "CSIS",
      "sourceUrl": "https://www.csis.org/",
      "publisherId": "csis.org",
      "excerpt": "Victor Cha explains why the diplomatic dispute between South Korea and Ukraine over President Volodymyr Zelensky’s public disclosure that Kyiv had transferred two North Korean prisoners of war to Seoul has deepened, and what both sides may want out of it.",
      "regions": [
        "东亚",
        "欧洲"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/singapore-s-job-as-asean-chair-fixing-how-the-grouping-decides",
      "title": "Singapore’s job as ASEAN chair: fixing how the grouping decides",
      "url": "https://www.lowyinstitute.org/the-interpreter/singapore-s-job-as-asean-chair-fixing-how-the-grouping-decides",
      "publishedAt": "2026-10-22T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Its most enduring achievement would be a rule on who may act when consensus cannot be reached in time.",
      "regions": [
        "东南亚"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/ukraine-perils-for-kyiv-in-revived-peace-talks",
      "title": "Ukraine: Perils for Kyiv in revived peace talks",
      "url": "https://www.lowyinstitute.org/the-interpreter/ukraine-perils-for-kyiv-in-revived-peace-talks",
      "publishedAt": "2026-10-22T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "A flurry of diplomacy over Ukraine looks like progress, but the terms on the table so far favour Moscow.",
      "regions": [
        "欧洲"
      ],
      "score": 34,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/the-threat-below-the-waterline-in-cambodia-and-thailand-s-truce",
      "title": "The threat below the waterline in Cambodia and Thailand’s truce",
      "url": "https://www.lowyinstitute.org/the-interpreter/the-threat-below-the-waterline-in-cambodia-and-thailand-s-truce",
      "publishedAt": "2026-10-22T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东南亚"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/irkutsk-and-the-plague-a-death-exposes-how-much-global-health-runs-on-trust",
      "title": "Irkutsk and the plague: A death exposes how much global health runs on trust",
      "url": "https://www.lowyinstitute.org/the-interpreter/irkutsk-and-the-plague-a-death-exposes-how-much-global-health-runs-on-trust",
      "publishedAt": "2026-10-22T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "全球议题",
        "俄罗斯与中亚"
      ],
      "score": 4,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/can-germany-revive-its-economy-before-the-far-right-afd-gains-ground/a-79696102?maca=en-rss-en-all-1573-rdf",
      "title": "Can Germany revive its economy before the far-right AfD gains ground?",
      "url": "https://www.dw.com/en/can-germany-revive-its-economy-before-the-far-right-afd-gains-ground/a-79696102?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-22T09:10:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "欧洲",
        "东亚"
      ],
      "score": 11,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/bulgaria-concerns-about-security-in-the-black-sea-dominate-presidential-election-campaign/a-79729094?maca=en-rss-en-all-1573-rdf",
      "title": "Bulgaria: Concerns about security in the Black Sea dominate presidential election campaign",
      "url": "https://www.dw.com/en/bulgaria-concerns-about-security-in-the-black-sea-dominate-presidential-election-campaign/a-79729094?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-22T08:31:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "Bulgaria's presidential election campaign has been shaped by recent drone attacks on ships in the Black Sea and the government's reduced support for Ukraine, making foreign policy a key factor in the first round.",
      "regions": [
        "欧洲"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://fulcrum.sg/article/commentaries/mary-jane-veloso-and-transnational-crime-lessons-for-asean/",
      "title": "Mary Jane Veloso and Transnational Crime: Lessons for ASEAN",
      "url": "https://fulcrum.sg/article/commentaries/mary-jane-veloso-and-transnational-crime-lessons-for-asean/",
      "publishedAt": "2026-10-22T06:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "fulcrum",
      "sourceTitle": "ISEAS · Fulcrum",
      "sourceUrl": "https://fulcrum.sg/",
      "publisherId": "iseas",
      "excerpt": "Mary Jane Veloso was treated as a criminal before she was recognised as a victim. Her case shows why victims of forced criminality need an integrated regional response, not just a national one.",
      "regions": [
        "东南亚"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://fulcrum.sg/article/commentaries/us-midterm-elections-serve-as-bellwether-for-southeast-asia/",
      "title": "US Midterm Elections Serve as Bellwether for Southeast Asia",
      "url": "https://fulcrum.sg/article/commentaries/us-midterm-elections-serve-as-bellwether-for-southeast-asia/",
      "publishedAt": "2026-10-22T02:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "fulcrum",
      "sourceTitle": "ISEAS · Fulcrum",
      "sourceUrl": "https://fulcrum.sg/",
      "publisherId": "iseas",
      "excerpt": "The Democrats are poised to gain control of the two houses of Congress in the upcoming midterm elections. If this happens, there could be a glimmer of hope for Southeast Asian countries dependent on exporting to the vast US market.",
      "regions": [
        "东南亚",
        "北美"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.iseas.edu.sg/articles-commentaries/iseas-perspective/2026-75-myanmars-new-power-configuration-in-naypyidaw-how-military-rule-is-being-reorganised-around-the-presidency-by-su-mon-thazin-aung/",
      "title": "2026/75 “Myanmar’s “New” Power Configuration in Naypyidaw: How Military Rule Is Being Reorganised Around the Presidency” By Su Mon Thazin Aung*",
      "url": "https://www.iseas.edu.sg/articles-commentaries/iseas-perspective/2026-75-myanmars-new-power-configuration-in-naypyidaw-how-military-rule-is-being-reorganised-around-the-presidency-by-su-mon-thazin-aung/",
      "publishedAt": "2026-10-22T01:05:11.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "iseas",
      "sourceTitle": "ISEAS Perspective",
      "sourceUrl": "https://www.iseas.edu.sg/",
      "publisherId": "iseas",
      "excerpt": "",
      "regions": [
        "东南亚"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/raids-at-far-right-group-s-offices-at-european-parliament/a-79724631?maca=en-rss-en-all-1573-rdf",
      "title": "Raids at far-right group's offices at European Parliament",
      "url": "https://www.dw.com/en/raids-at-far-right-group-s-offices-at-european-parliament/a-79724631?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-21T16:14:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "Authorities searched the Patriots for Europe's European Parliament offices in a long-running funding inquiry. The group says the charges pertain to its predecessor and there is \"no legal continuity\" between the two.",
      "regions": [
        "欧洲"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.bruegel.org/policy-brief/fragmented-procurement-european-defence-market",
      "title": "From fragmented procurement to a European defence market",
      "url": "https://www.bruegel.org/policy-brief/fragmented-procurement-european-defence-market",
      "publishedAt": "2026-10-21T16:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "bruegel",
      "sourceTitle": "Bruegel",
      "sourceUrl": "https://www.bruegel.org/",
      "publisherId": "bruegel.org",
      "excerpt": "European defence procurement remains fragmented as no initiative yet pairs a large pooled order book with binding reciprocal market access",
      "regions": [
        "欧洲"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.brookings.edu/articles/the-midterm-effect-what-the-2026-election-could-mean-for-public-policy/",
      "title": "The midterm effect: What the 2026 election could mean for public policy",
      "url": "https://www.brookings.edu/articles/the-midterm-effect-what-the-2026-election-could-mean-for-public-policy/",
      "publishedAt": "2026-10-21T16:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "brookings",
      "sourceTitle": "Brookings Institution",
      "sourceUrl": "https://www.brookings.edu/",
      "publisherId": "brookings.edu",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/cutting-migration-risks-australia-s-middle-power-clout",
      "title": "Cutting migration risks Australia’s middle-power clout",
      "url": "https://www.lowyinstitute.org/the-interpreter/cutting-migration-risks-australia-s-middle-power-clout",
      "publishedAt": "2026-10-21T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "A shrinking economy and less weight will leave the country lower in the global pecking order.",
      "regions": [
        "大洋洲"
      ],
      "score": 17,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/xi-s-delhi-visit-china-s-new-tone-old-assumptions-about-india",
      "title": "Xi’s Delhi visit: China’s new tone, old assumptions about India",
      "url": "https://www.lowyinstitute.org/the-interpreter/xi-s-delhi-visit-china-s-new-tone-old-assumptions-about-india",
      "publishedAt": "2026-10-21T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东亚",
        "南亚"
      ],
      "score": 5,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/the-united-states-has-a-new-template-for-blocking-global-health-consensus",
      "title": "The United States has a new template for blocking global health consensus",
      "url": "https://www.lowyinstitute.org/the-interpreter/the-united-states-has-a-new-template-for-blocking-global-health-consensus",
      "publishedAt": "2026-10-21T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "A near-unanimous UN vote on pandemics masks a deeper fight over what counts as consensus in global health diplomacy.",
      "regions": [
        "全球议题",
        "北美"
      ],
      "score": 26,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/china-s-start-ups-want-to-offer-a-satellite-repair-service-in-space",
      "title": "China’s start-ups want to offer a satellite repair service in space",
      "url": "https://www.lowyinstitute.org/the-interpreter/china-s-start-ups-want-to-offer-a-satellite-repair-service-in-space",
      "publishedAt": "2026-10-21T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东亚"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/us-sanctions-target-iran-s-rail-sector-as-tehran-shifts-cargo-from-sea-routes-to-overland-corridors/a-79681413?maca=en-rss-en-all-1573-rdf",
      "title": "US sanctions target Iran's rail sector as Tehran shifts cargo from sea routes to overland corridors",
      "url": "https://www.dw.com/en/us-sanctions-target-iran-s-rail-sector-as-tehran-shifts-cargo-from-sea-routes-to-overland-corridors/a-79681413?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-21T08:30:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "As US sanctions expand to Iran's rail sector, Tehran is relying more heavily on overland links with China and Central Asia. But capacity constraints, delays and costs limit rail's ability to replace maritime trade.",
      "regions": [
        "中东",
        "北美"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/rising-emissions-and-temperatures-the-cost-of-trump-s-climate-retreat-is-now-clear/a-79714915?maca=en-rss-en-all-1573-rdf",
      "title": "Rising emissions and temperatures: The cost of Trump's climate retreat is now clear",
      "url": "https://www.dw.com/en/rising-emissions-and-temperatures-the-cost-of-trump-s-climate-retreat-is-now-clear/a-79714915?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-21T05:00:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "北美"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/germany-news-hackers-release-afd-party-emails/live-79709090?maca=en-rss-en-all-1573-rdf",
      "title": "Germany news: Hackers release AfD party emails",
      "url": "https://www.dw.com/en/germany-news-hackers-release-afd-party-emails/live-79709090?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-20T15:41:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "Germany's far-right AfD has launched an inquiry after the release of thousands of emails following a cyberattack. Also, investors pledged billions for Germany at a major summit in Berlin. DW has more news from Germany.",
      "regions": [
        "欧洲"
      ],
      "score": 21,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/is-tourism-heading-for-its-own-great-reset",
      "title": "Is tourism heading for its own “Great Reset”?",
      "url": "https://www.lowyinstitute.org/the-interpreter/is-tourism-heading-for-its-own-great-reset",
      "publishedAt": "2026-10-20T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "War-driven disruption is reshaping travel, but a recent industry summit points to AI, biometrics and digital IDs to ease pressures.",
      "regions": [
        "全球议题"
      ],
      "score": 25,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/balancing-power-is-no-job-for-kitchen-scales",
      "title": "Balancing power is no job for kitchen scales",
      "url": "https://www.lowyinstitute.org/the-interpreter/balancing-power-is-no-job-for-kitchen-scales",
      "publishedAt": "2026-10-20T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "全球议题"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/the-made-in-europe-label-is-wearing-thin-while-asia-does-the-stitching",
      "title": "The “Made in Europe” label is wearing thin while Asia does the stitching",
      "url": "https://www.lowyinstitute.org/the-interpreter/the-made-in-europe-label-is-wearing-thin-while-asia-does-the-stitching",
      "publishedAt": "2026-10-20T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "欧洲"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/indonesia-is-dodging-the-dollar-in-trade-not-in-debt",
      "title": "Indonesia is dodging the dollar in trade – not in debt",
      "url": "https://www.lowyinstitute.org/the-interpreter/indonesia-is-dodging-the-dollar-in-trade-not-in-debt",
      "publishedAt": "2026-10-20T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Indonesia is settling more trade in local currencies, having learnt the hard way in 1997–98 that foreign currency borrowing can turn a falling rupiah into a crisis.",
      "regions": [
        "东南亚"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/germany-news-emergency-at-leipzig-airport-sparked-by-novice-driver/live-79695354?maca=en-rss-en-all-1573-rdf",
      "title": "Germany news: Emergency at Leipzig airport sparked by novice driver",
      "url": "https://www.dw.com/en/germany-news-emergency-at-leipzig-airport-sparked-by-novice-driver/live-79695354?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-19T17:26:00.000Z",
      "week": "2026-10-19",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "欧洲"
      ],
      "score": 7,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.bruegel.org/analysis/chinas-outbound-ai-strategy-starts-models-and-governance-and-ends-chips",
      "title": "China’s outbound AI strategy starts with models and governance and ends with chips",
      "url": "https://www.bruegel.org/analysis/chinas-outbound-ai-strategy-starts-models-and-governance-and-ends-chips",
      "publishedAt": "2026-10-19T16:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "bruegel",
      "sourceTitle": "Bruegel",
      "sourceUrl": "https://www.bruegel.org/",
      "publisherId": "bruegel.org",
      "excerpt": "Beijing is strategically planning to export AI rules and models before its chips; how should Europe engage?",
      "regions": [
        "东亚"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/russia-s-war-is-connecting-europe-and-the-indo-pacific",
      "title": "Russia’s war is connecting Europe and the Indo-Pacific",
      "url": "https://www.lowyinstitute.org/the-interpreter/russia-s-war-is-connecting-europe-and-the-indo-pacific",
      "publishedAt": "2026-10-19T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "A Seoul–Kyiv row over North Korean POWs shows how Sino-Russian alignment is bridging geopolitical theatres.",
      "regions": [
        "欧洲",
        "俄罗斯与中亚"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/words-as-weapons-in-the-west-philippine-sea",
      "title": "Words as weapons in the West Philippine Sea",
      "url": "https://www.lowyinstitute.org/the-interpreter/words-as-weapons-in-the-west-philippine-sea",
      "publishedAt": "2026-10-19T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东南亚",
        "东亚"
      ],
      "score": 4,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/southeast-asia-who-gets-to-call-haze-a-disaster",
      "title": "Southeast Asia: Who gets to call haze a disaster?",
      "url": "https://www.lowyinstitute.org/the-interpreter/southeast-asia-who-gets-to-call-haze-a-disaster",
      "publishedAt": "2026-10-19T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "ASEAN’s haze treaty looks toothless, but the real fault is a rule that leaves the call to whichever nation is burning.",
      "regions": [
        "东南亚"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/china-s-invitation-to-us-students-could-be-a-way-to-rewrite-relations",
      "title": "China’s invitation to US students will not rewrite their structural competition",
      "url": "https://www.lowyinstitute.org/the-interpreter/china-s-invitation-to-us-students-could-be-a-way-to-rewrite-relations",
      "publishedAt": "2026-10-19T13:00:00.000Z",
      "week": "2026-10-19",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东亚",
        "北美"
      ],
      "score": 4,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/east-african-oil-could-loosen-asia-s-grip-on-australia-s-fuel-supply",
      "title": "East African oil could loosen Asia’s grip on Australia’s fuel supply",
      "url": "https://www.lowyinstitute.org/the-interpreter/east-african-oil-could-loosen-asia-s-grip-on-australia-s-fuel-supply",
      "publishedAt": "2026-10-18T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "非洲",
        "大洋洲"
      ],
      "score": 4,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/governance-not-geopolitics-will-make-or-break-pacpol",
      "title": "Governance, not geopolitics, will make or break PACPOL",
      "url": "https://www.lowyinstitute.org/the-interpreter/governance-not-geopolitics-will-make-or-break-pacpol",
      "publishedAt": "2026-10-18T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "The new regional policing bloc will be judged on everyday cooperation, not on its usefulness against Beijing.",
      "regions": [
        "东亚"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/a-pipe-under-the-taiwan-strait-outlasts-the-politics-above-it",
      "title": "A pipe under the Taiwan Strait outlasts the politics above it",
      "url": "https://www.lowyinstitute.org/the-interpreter/a-pipe-under-the-taiwan-strait-outlasts-the-politics-above-it",
      "publishedAt": "2026-10-18T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Kinmen’s water now comes mostly from Fujian – a dependence neither Taiwan or China calls political, but neither can easily undo.",
      "regions": [
        "东亚"
      ],
      "score": 22,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/across-the-yalu-beijing-pours-concrete-over-north-korean-sanctions",
      "title": "Across the Yalu, Beijing pours concrete over North Korean sanctions",
      "url": "https://www.lowyinstitute.org/the-interpreter/across-the-yalu-beijing-pours-concrete-over-north-korean-sanctions",
      "publishedAt": "2026-10-18T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "A 12-year monument to mistrust, the China–North Korea bridge is open – locking in Beijing’s edge over Moscow and Washington.",
      "regions": [
        "东亚"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/the-victory-of-asymmetry-in-the-iran-war",
      "title": "The Victory of Asymmetry in the Iran War",
      "url": "https://www.cfr.org/articles/the-victory-of-asymmetry-in-the-iran-war",
      "publishedAt": "2026-10-16T16:56:08.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "中东"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/eu-promotes-sovereign-trusted-ai-as-it-struggles-to-catch-us-and-china/a-79667770?maca=en-rss-en-all-1573-rdf",
      "title": "EU promotes sovereign, trusted AI as it struggles to catch US and China",
      "url": "https://www.dw.com/en/eu-promotes-sovereign-trusted-ai-as-it-struggles-to-catch-us-and-china/a-79667770?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-16T09:07:00.000Z",
      "week": "2026-10-12",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "At an international AI summit in Dublin, EU leaders promoted trusted and independent artificial intelligence. Critics question whether the bloc can close the gap with the US and China while maintaining strict regulation.",
      "regions": [
        "东亚",
        "欧洲",
        "北美"
      ],
      "score": 21,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/ai-assisted-dying-doris-d%C3%B6rrie-s-new-film-addresses-prospect-of-care-robots/a-79659715?maca=en-rss-en-all-1573-rdf",
      "title": "AI-assisted dying? Doris Dörrie's new film addresses prospect of care robots",
      "url": "https://www.dw.com/en/ai-assisted-dying-doris-d%C3%B6rrie-s-new-film-addresses-prospect-of-care-robots/a-79659715?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-15T13:24:00.000Z",
      "week": "2026-10-12",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "全球议题"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/money-not-china-s-new-base-is-vietnam-s-real-worry-in-laos",
      "title": "Money, not China’s new base, is Vietnam’s real worry in Laos",
      "url": "https://www.lowyinstitute.org/the-interpreter/money-not-china-s-new-base-is-vietnam-s-real-worry-in-laos",
      "publishedAt": "2026-10-15T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "A Chinese facility and a reshuffle in Vientiane are testing old loyalties – Hanoi must now compete on economics, not history.",
      "regions": [
        "东亚",
        "东南亚"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/the-houthi-threat-that-saudi-arabia-couldn-t-end",
      "title": "The Houthi threat that Saudi Arabia couldn’t end",
      "url": "https://www.lowyinstitute.org/the-interpreter/the-houthi-threat-that-saudi-arabia-couldn-t-end",
      "publishedAt": "2026-10-15T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "A battlefield defeat has not weakened the Houthis’ grip on the Red Sea chokepoints that matter to Australian fuel security.",
      "regions": [
        "中东"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/the-last-chance-for-a-trump-kim-summit",
      "title": "The last chance for a Trump–Kim summit?",
      "url": "https://www.lowyinstitute.org/the-interpreter/the-last-chance-for-a-trump-kim-summit",
      "publishedAt": "2026-10-15T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "A Shenzhen meeting on the sidelines of APEC might amount to little – reopening contact, not resolving the nuclear question.",
      "regions": [
        "全球议题"
      ],
      "score": 38,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/a-smaller-australia-won-t-be-a-stronger-one",
      "title": "A smaller Australia won’t be a stronger one",
      "url": "https://www.lowyinstitute.org/the-interpreter/a-smaller-australia-won-t-be-a-stronger-one",
      "publishedAt": "2026-10-15T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Underinvestment, not migration, is squeezing housing and services – shrinking the intake will only cost Australia more.",
      "regions": [
        "大洋洲"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/brazil-s-elections-matter-for-the-planet-this-is-why/a-79659928?maca=en-rss-en-all-1573-rdf",
      "title": "Brazil's elections matter for the planet. This is why",
      "url": "https://www.dw.com/en/brazil-s-elections-matter-for-the-planet-this-is-why/a-79659928?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-15T09:52:00.000Z",
      "week": "2026-10-12",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "Brazil is heading back to the polls, but the impact could be felt worldwide. With the Amazon vital to the health of the planet, the election could help shape its future.",
      "regions": [
        "拉美与加勒比"
      ],
      "score": 17,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/manchester-city-the-uae-and-the-uk-s-om-in-a-political-tangle/a-79664729?maca=en-rss-en-all-1573-rdf",
      "title": "Manchester City, the UAE and the UK's OM in a political tangle",
      "url": "https://www.dw.com/en/manchester-city-the-uae-and-the-uk-s-om-in-a-political-tangle/a-79664729?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-15T08:13:00.000Z",
      "week": "2026-10-12",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "中东",
        "欧洲"
      ],
      "score": 11,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/nord-stream-trial-opens-in-germany-defense-seeks-dismissal/a-79662942?maca=en-rss-en-all-1573-rdf",
      "title": "Nord Stream trial opens in Germany, defense seeks dismissal",
      "url": "https://www.dw.com/en/nord-stream-trial-opens-in-germany-defense-seeks-dismissal/a-79662942?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-14T18:00:00.000Z",
      "week": "2026-10-12",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "Serhii Kuznietsov is accused of attacking civilian infrastructure in the 2022 sabotage of the Russian gas pipeline to Germany. His lawyers called Nord Stream a military target, and said their client is sworn to secrecy.",
      "regions": [
        "欧洲"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/ebola-doesn-t-stop-at-a-border",
      "title": "Ebola doesn’t stop at a border",
      "url": "https://www.lowyinstitute.org/the-interpreter/ebola-doesn-t-stop-at-a-border",
      "publishedAt": "2026-10-14T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Kenya caught its first case after a journey from Congo through Uganda – cooperation to catch the next one is wearing thin.",
      "regions": [
        "非洲"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/rearming-the-world-is-squeezing-out-women-s-safety",
      "title": "Rearming the world is squeezing out women’s safety",
      "url": "https://www.lowyinstitute.org/the-interpreter/rearming-the-world-is-squeezing-out-women-s-safety",
      "publishedAt": "2026-10-14T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "As military spending surges and women’s rights retreat, Australia has an opportunity to redefine what security means.",
      "regions": [
        "大洋洲"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/could-the-taliban-s-new-road-to-china-drive-negotiating-power",
      "title": "Could the Taliban’s new road to China drive negotiating power?",
      "url": "https://www.lowyinstitute.org/the-interpreter/could-the-taliban-s-new-road-to-china-drive-negotiating-power",
      "publishedAt": "2026-10-14T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东亚",
        "南亚"
      ],
      "score": 4,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/south-china-sea-hanoi-and-manila-s-strategies-share-one-weakness",
      "title": "South China Sea: Hanoi and Manila’s strategies share one weakness",
      "url": "https://www.lowyinstitute.org/the-interpreter/south-china-sea-hanoi-and-manila-s-strategies-share-one-weakness",
      "publishedAt": "2026-10-14T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "Vietnam’s quiet diplomacy and loud protests from the Philippines mask the same reliance on Chinese clean energy.",
      "regions": [
        "东亚",
        "东南亚"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/west-philippine-sea-transparency-alone-won-t-deter-china",
      "title": "West Philippine Sea: Transparency alone won’t deter China",
      "url": "https://www.lowyinstitute.org/the-interpreter/west-philippine-sea-transparency-alone-won-t-deter-china",
      "publishedAt": "2026-10-13T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "东亚",
        "东南亚"
      ],
      "score": 4,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/how-40-years-of-failed-intelligence-reform-finally-succeeded",
      "title": "How 40 years of failed intelligence reform finally succeeded",
      "url": "https://www.lowyinstitute.org/the-interpreter/how-40-years-of-failed-intelligence-reform-finally-succeeded",
      "publishedAt": "2026-10-13T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "全球议题"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/south-korea-s-dispute-with-kyiv-is-about-more-than-two-pows",
      "title": "South Korea’s dispute with Kyiv is about more than two POWs",
      "url": "https://www.lowyinstitute.org/the-interpreter/south-korea-s-dispute-with-kyiv-is-about-more-than-two-pows",
      "publishedAt": "2026-10-13T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "publisherId": "lowyinstitute.org",
      "excerpt": "The row over two prisoners exposes Seoul’s reluctance to arm Ukraine, provoke Pyongyang, or risk its Russia trade.",
      "regions": [
        "东亚"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.lowyinstitute.org/the-interpreter/fibre-sensing-how-undersea-cables-learned-to-listen",
      "title": "Fibre sensing: how undersea cables learned to listen",
      "url": "https://www.lowyinstitute.org/the-interpreter/fibre-sensing-how-undersea-cables-learned-to-listen",
      "publishedAt": "2026-10-13T13:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "lowy",
      "sourceTitle": "Lowy Institute · Interpreter",
      "sourceUrl": "https://www.lowyinstitute.org/",
      "regions": [
        "全球议题"
      ],
      "score": 0,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/germany-s-china-calculation-shifts-as-import-pressures-eclipse-export-benefits/a-79571852?maca=en-rss-en-all-1573-rdf",
      "title": "Germany's China calculation shifts as import pressures eclipse export benefits",
      "url": "https://www.dw.com/en/germany-s-china-calculation-shifts-as-import-pressures-eclipse-export-benefits/a-79571852?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-13T08:47:00.000Z",
      "week": "2026-10-12",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "东亚",
        "欧洲"
      ],
      "score": 11,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.cfr.org/articles/how-i-got-my-career-in-foreign-policy-rebecca-blumenstein",
      "title": "How I Got My Career in Foreign Policy: Rebecca Blumenstein",
      "url": "https://www.cfr.org/articles/how-i-got-my-career-in-foreign-policy-rebecca-blumenstein",
      "publishedAt": "2026-10-12T12:00:00.000Z",
      "week": "2026-10-12",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/author-or-artificial-intelligence-literature-in-crisis/a-79618610?maca=en-rss-en-all-1573-rdf",
      "title": "Author or artificial intelligence? Literature in crisis",
      "url": "https://www.dw.com/en/author-or-artificial-intelligence-literature-in-crisis/a-79618610?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-09T15:04:00.000Z",
      "week": "2026-10-05",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "全球议题"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.cfr.org/articles/five-ways-to-make-the-new-ai-task-force-a-success",
      "title": "Five Ways to Make the New AI Task Force a Success",
      "url": "https://www.cfr.org/articles/five-ways-to-make-the-new-ai-task-force-a-success",
      "publishedAt": "2026-10-07T16:07:30.000Z",
      "week": "2026-10-05",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/at-october-7-anniversary-israelis-face-an-election-and-an-unfinished-reckoning",
      "title": "At October 7 Anniversary, Israelis Face an Election and an Unfinished Reckoning",
      "url": "https://www.cfr.org/articles/at-october-7-anniversary-israelis-face-an-election-and-an-unfinished-reckoning",
      "publishedAt": "2026-10-07T09:30:00.000Z",
      "week": "2026-10-05",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "中东"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/emerging-economies-are-embracing-solar-power-and-skipping-fossil-fuels-much-faster-than-europe-or-the-us/a-79474847?maca=en-rss-en-all-1573-rdf",
      "title": "Emerging economies are embracing solar power and skipping fossil fuels much faster than Europe or the US",
      "url": "https://www.dw.com/en/emerging-economies-are-embracing-solar-power-and-skipping-fossil-fuels-much-faster-than-europe-or-the-us/a-79474847?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-07T07:48:00.000Z",
      "week": "2026-10-05",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "欧洲",
        "北美"
      ],
      "score": 11,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/ai-models-keep-hacking-real-systems-during-tests-what-does-this-mean/a-79471943?maca=en-rss-en-all-1573-rdf",
      "title": "AI models keep hacking real systems during tests. What does this mean?",
      "url": "https://www.dw.com/en/ai-models-keep-hacking-real-systems-during-tests-what-does-this-mean/a-79471943?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-06T10:05:00.000Z",
      "week": "2026-10-05",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "全球议题"
      ],
      "score": 8,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/merz-macron-seek-tougher-eu-measures-against-unfair-trade/a-79554905?maca=en-rss-en-all-1573-rdf",
      "title": "Merz, Macron seek tougher EU measures against unfair trade",
      "url": "https://www.dw.com/en/merz-macron-seek-tougher-eu-measures-against-unfair-trade/a-79554905?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-05T17:23:00.000Z",
      "week": "2026-10-05",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "欧洲",
        "东亚",
        "北美"
      ],
      "score": 10,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.cfr.org/articles/more-oil-same-war-why-increased-exports-arent-a-sign-of-irans-collapse",
      "title": "More Oil, Same War: Why Increased Exports Aren’t a Sign of Iran’s Imminent Defeat",
      "url": "https://www.cfr.org/articles/more-oil-same-war-why-increased-exports-arent-a-sign-of-irans-collapse",
      "publishedAt": "2026-10-05T09:30:00.000Z",
      "week": "2026-10-05",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "中东"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/naza-israeli-military-issues-statement-on-film/a-79520483?maca=en-rss-en-all-1573-rdf",
      "title": "\"NAZA\": Israeli military issues statement on film",
      "url": "https://www.dw.com/en/naza-israeli-military-issues-statement-on-film/a-79520483?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-02T15:55:00.000Z",
      "week": "2026-09-28",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "publisherId": "dw.com",
      "excerpt": "The award-winning documentary \"NAZA\" continues to spark controversy in Israel. The Israeli military has now published a multi-page statement calling the film's portrayal \"distorted.\"",
      "regions": [
        "中东"
      ],
      "score": 16,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.dw.com/en/germany-s-franz-reindl-elected-new-iihf-president/a-79521799?maca=en-rss-en-all-1573-rdf",
      "title": "Germany's Franz Reindl elected new IIHF president",
      "url": "https://www.dw.com/en/germany-s-franz-reindl-elected-new-iihf-president/a-79521799?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-02T14:29:00.000Z",
      "week": "2026-09-28",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "欧洲"
      ],
      "score": 6,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.dw.com/en/climate-leaders-called-for-solar-energy-for-everyone-everywhere-by-2030-but-with-three-years-to-go-is-that-goal-attainable/a-79517056?maca=en-rss-en-all-1573-rdf",
      "title": "Climate leaders called for solar energy for 'everyone, everywhere' by 2030, but with three years to go, is that goal attainable?",
      "url": "https://www.dw.com/en/climate-leaders-called-for-solar-energy-for-everyone-everywhere-by-2030-but-with-three-years-to-go-is-that-goal-attainable/a-79517056?maca=en-rss-en-all-1573-rdf",
      "publishedAt": "2026-10-02T13:48:00.000Z",
      "week": "2026-09-28",
      "kind": "news",
      "sourceId": "dw",
      "sourceTitle": "Deutsche Welle",
      "sourceUrl": "https://www.dw.com/en/top-stories/s-9097",
      "regions": [
        "全球议题"
      ],
      "score": 13,
      "selectedBy": "policy-importance-rules"
    },
    {
      "id": "https://www.cfr.org/articles/trumps-ai-safety-pact-is-toothless-but-there-is-a-path-forward",
      "title": "Trump’s AI Safety Pact Is Toothless. But There Is a Path Forward.",
      "url": "https://www.cfr.org/articles/trumps-ai-safety-pact-is-toothless-but-there-is-a-path-forward",
      "publishedAt": "2026-10-01T21:05:54.000Z",
      "week": "2026-09-28",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/how-i-got-my-career-in-foreign-policy-edward-fishman",
      "title": "How I Got My Career in Foreign Policy: Edward Fishman",
      "url": "https://www.cfr.org/articles/how-i-got-my-career-in-foreign-policy-edward-fishman",
      "publishedAt": "2026-09-28T12:00:00.000Z",
      "week": "2026-09-28",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/its-deja-vu-all-over-again-the-parallels-of-ai-and-globalization",
      "title": "It’s Déjà Vu All Over Again: The Parallels of AI and Globalization",
      "url": "https://www.cfr.org/articles/its-deja-vu-all-over-again-the-parallels-of-ai-and-globalization",
      "publishedAt": "2026-09-18T16:33:11.000Z",
      "week": "2026-09-14",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/why-ais-biggest-rivals-are-suddenly-calling-for-restraint",
      "title": "Why AI’s Biggest Rivals Are Suddenly Calling for Restraint",
      "url": "https://www.cfr.org/articles/why-ais-biggest-rivals-are-suddenly-calling-for-restraint",
      "publishedAt": "2026-09-15T20:47:15.000Z",
      "week": "2026-09-14",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/building-trust-in-ai-is-critical-to-the-frontiers-future",
      "title": "Building Trust in AI Is Critical to the Frontier’s Future",
      "url": "https://www.cfr.org/articles/building-trust-in-ai-is-critical-to-the-frontiers-future",
      "publishedAt": "2026-09-14T21:38:38.000Z",
      "week": "2026-09-14",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 12,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/on-the-ground-in-haiti-the-growing-war-zone-facing-u-s-deportees",
      "title": "On the Ground in Haiti: The Growing War Zone Facing U.S. Deportees",
      "url": "https://www.cfr.org/articles/on-the-ground-in-haiti-the-growing-war-zone-facing-u-s-deportees",
      "publishedAt": "2026-09-14T16:13:59.000Z",
      "week": "2026-09-14",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "北美",
        "拉美与加勒比"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    },
    {
      "id": "https://www.cfr.org/articles/how-i-got-my-career-in-foreign-policy-tjada-doyen-mckenna",
      "title": "How I Got My Career in Foreign Policy: Tjada D’Oyen McKenna",
      "url": "https://www.cfr.org/articles/how-i-got-my-career-in-foreign-policy-tjada-doyen-mckenna",
      "publishedAt": "2026-09-14T12:00:00.000Z",
      "week": "2026-09-14",
      "kind": "report",
      "sourceId": "cfr",
      "sourceTitle": "Council on Foreign Relations",
      "sourceUrl": "https://www.cfr.org/",
      "publisherId": "cfr.org",
      "excerpt": "",
      "regions": [
        "全球议题"
      ],
      "score": 20,
      "selectionVersion": 2,
      "selectedBy": "policy-impact-and-event-diversity"
    }
  ]
});
