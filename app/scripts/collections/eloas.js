define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "models/event_attendee"
], function ($, _, Backbone, config, EventAttendee) {

    return Backbone.Collection.extend({
        settings: {
            limit: 15
        },
        initialize: function (models, options) {
            options = options || {};
            this.filter = options.filter || false;
            this.skip = 0;
        },
        url: function () {
            var url = config.apiHost + "/eloas";
            if (this.skip) url += "?skip=" + this.skip;
            return url;
        },
        nextPage: function () {
            this.skip += this.settings.limit;
            return this;
        },
        parse: function (response, options) {
            this.more = parseInt(response.count, 10) > parseInt(response.skip, 10) + response.eloas.length;
            return response.eloas || [];
        }
    });
});