module.exports = function (router) {
    router.get('/cve', require('./monitor'));
    router.get('/cve2', require('./monitor2'));
};
