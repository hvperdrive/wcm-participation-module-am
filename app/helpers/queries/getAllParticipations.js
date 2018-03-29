"use strict";

const path = require("path");

const ContentModel = require(path.join(process.cwd(), "/app/models/content"));

const variables = require("../variables");

module.exports = () => ContentModel.find({
	"meta.deleted": false,
	"meta.published": true,
	"meta.contentType": variables.get().participationId,
}).lean().exec();
