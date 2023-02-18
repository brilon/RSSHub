const got = require('@/utils/got');
const { parseDate } = require('@/utils/parse-date');
const { art } = require('@/utils/render');
const path = require('path');


function filterObjectsByKeyword(objects, keyword) {
    // Use Array.filter to create a new array with only objects whose url contains the keyword (case-insensitive)
    var filteredObjects = objects;
    if (keyword) {
        filteredObjects = objects.filter(obj => obj.description.toLowerCase().includes(keyword.toLowerCase()));
    }

    filteredObjects = filteredObjects.map((element) => ({
        title: element.description,
        description: element.description,
        link: element.html_url,
        pubDate: parseDate(element.created_at),
        guid: element.id
    }));

    // Return the filtered array
    return filteredObjects;
}

module.exports = async (ctx) => {

    const keyword = ctx.query.keyword;

    const name_response = await got(`https://raw.githubusercontent.com/sari3l/CVE-Monitor/main/new.json`, {
        headers: {
            Referer: `https://raw.githubusercontent.com/sari3l/CVE-Monitor/main/new.json`,
        },
    });

    const data = name_response.data;

    const items = filterObjectsByKeyword(data, keyword);

    ctx.state.data = {
        title: `Github - sari3l/Poc-Monitor`,
        link: `https://github.com/sari3l/Poc-Monitor`,
        description: `Github - sari3l/Poc-Monitor`,
        allowEmpty: true,
        item: items,
    };
};
