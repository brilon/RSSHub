const got = require('@/utils/got');
const { parseDate } = require('@/utils/parse-date');
const { art } = require('@/utils/render');
const path = require('path');

module.exports = async (ctx) => {
    const name_response = await got(`https://raw.githubusercontent.com/sari3l/CVE-Monitor/main/new.json`, {
        headers: {
            Referer: `https://raw.githubusercontent.com/sari3l/CVE-Monitor/main/new.json`,
        },
    });

    const data = name_response.data;

    const items = [];
    data.forEach(element => items.push({
        title: element.description,
        description: element.description,
        link: element.html_url,
        pubDate: parseDate(element.created_at),
        guid: element.id
    }));


    ctx.state.data = {
        title: `Github - sari3l/Poc-Monitor`,
        link: `https://github.com/sari3l/Poc-Monitor`,
        description: `Github - sari3l/Poc-Monitor`,
        allowEmpty: true,
        item: items,
    };
};
