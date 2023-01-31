"use strict";

const path = require("path");

const ContentModel = require(path.join(process.cwd(), "/app/models/content"));

const variables = require("../variables");

module.exports = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);

    return ContentModel.find({
        "meta.contentType": { $in: [
            variables.get().participationId,
            variables.get().activityId,
            variables.get().wedstrijdId,
        ] },
        "meta.published": true,
        "meta.deleted": false,
        $or: [
            {
                "fields.endDate": {
                    $lt: date.toISOString(),
                    $nin: [ null, "" ]
                }
            },
            {
                "fields.endDate": {
                    $exists: false
                },
                "fields.beginDate": {
                    $lt: date.toISOString(),
                }
            },
        ]
    }, { "versions": 0 })
        .lean()
        .exec()
}
