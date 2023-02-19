const got = require('@/utils/got');
const parser = require('@/utils/rss-parser');

module.exports = async (ctx) => {

    const keyword = ctx.query.keyword;
    var feedUrl = 'https://poc-in-github.motikan2010.net/rss/?sort=inserted_at';

    const feed = await parser.parseURL(feedUrl);

    var items = feed.items.filter((obj) => {
        return !keyword || obj.content.toLowerCase().includes(keyword.toLowerCase());
      });

      items = items.map((item) => {
        const single = {
            title: item.title,
            description: item.content,
            pubDate: item.pubDate,
            link: item.link,
            guid: item.link,
        };
        return single;
    });
    ctx.state.data = {
        title: `PoC-in-GitHub RSS`,
        link: `https://poc-in-github.motikan2010.net/`,
        description: `PoC auto collect from GitHub. Be careful Malware.`,
        allowEmpty: true,
        item: items,
    };

};
