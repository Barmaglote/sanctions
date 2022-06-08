module.exports.Send = (res, status, content) => {
    res.status(status);
    res.json(content);
}