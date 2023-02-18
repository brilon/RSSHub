module.exports = function (router) {
    router.get('/cve', require('./monitor'));
};
