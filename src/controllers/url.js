const shortid = require('shortid')
const URL = require('../models/url')

async function HandleGenrateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        CreatedBy : req.user.userId ,
    });
    return res.status(200).json({ id: shortId })

}
async function HandleGetAllGenratedUrl(req, res) {
    try {
        const userId = req.user.userId;
        const Url = await URL.find({ CreatedBy: userId });
        return res.status(200).json({ Url :Url });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
async function HandleRedirectUrl(req, res) {
    const shortId = req.params.ShortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })

    return res.redirect(entry?.redirectUrl);
}
async function HandleGetAnalytics(req, res) {
    const shortId = req.params.id;
    const results = await URL.findOne({shortId});
    return res.status(200).json({ TotalClicks : results.visitHistory.length , Analytics : results.visitHistory });
}

module.exports = {
    HandleGenrateNewShortUrl,
    HandleGetAllGenratedUrl,
    HandleRedirectUrl,
    HandleGetAnalytics
}