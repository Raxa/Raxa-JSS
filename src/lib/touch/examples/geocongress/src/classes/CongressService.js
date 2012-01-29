/**
 * @class Geo.CongressService
 * @extends Object
 *
 * The CongressService provides a centralized location for retrieving data
 * through YQL and caching it.
 * 
 * @singleton
 */
Geo.CongressServiceImpl = Ext.extend(Object, {
    apiKey: "8a341f85c657435989e75c9a83294762",

    districtQuery: new Ext.Template('SELECT * FROM sunlight.districts.getDistrictFromLatLong WHERE apikey="{apiKey}" and latitude={latitude} and longitude={longitude}'),
    legislatorQuery: new Ext.Template('SELECT * from sunlight.legislators.getList  WHERE apikey="{apiKey}" and state="{state}" and (district={number} or title="sen")'),
    committeesQuery: new Ext.Template('use "http://github.com/extjs/YQL-Tables/raw/master/geocongress/allForLegislator.xml" as allForLegislator; SELECT * from allForLegislator WHERE apikey="{apiKey}" and bioguide_id="{bioguide_id}"'),
    billsQuery: new Ext.Template('use "http://github.com/extjs/YQL-Tables/raw/master/geocongress/billSearch.xml" as billsearch; select * from billsearch where sponsor = "{sponsor}"'),
    votesQuery: new Ext.XTemplate('use "http://github.com/extjs/YQL-Tables/raw/master/geocongress/voteSearch.xml" as votessearch; select * from votessearch where person = "{person}" and fts = "On Passage" <tpl if="limit">LIMIT {limit}</tpl>'),
    billSummaryQuery: new Ext.Template('use "http://github.com/extjs/YQL-Tables/raw/master/geocongress/billSummary.xml" as billsummary; select * from billsummary where bill="{bill}" and session="{session}"'),

    // private
    // this will be wrapped by getDistrictFromCoords to exec
    // the user callback
    onDistrictFromCoords: function(result, cb, scope) {
        var district = [];
        if (result.query && result.query.results) {
            district = result.query.results.district;
            cb.call(scope || window, district);
        }
    },

    /**
     * Gets the Congress District based on latitude/longitude and passes
     * it back to the callback you've provided.
     * 
     * @param {Object} coords A coordinate object with latitude and longitude.
     * @param {Function} cb A function callback
     * @param {Object} scope The scope to execute the callback in
     */
    getDistrictFromCoords: function(coords, cb, scope) {
        var params = Ext.apply(this.getBaseParams(), coords);
        var query = this.districtQuery.applyTemplate(params);

        this.onDistrictFromCoords = Ext.createDelegate(Geo.CongressServiceImpl.prototype.onDistrictFromCoords, this || window, [cb, scope], true);
        Ext.YQL.request({
            query: query,
            callback: this.onDistrictFromCoords,
            scope: this
        });
    },

    // private
    // this will be wrapped by getLegislatorsByDistrict to exec
    // the user callback
    onLegislatorsByDistrict: function(result, cb, scope) {
        var legislators = [];
        if (result.query && result.query.results) {
            legislators = result.query.results.legislator;
        }
        cb.call(scope || window, legislators);
    },

    /**
     * Gets the Legislators for a particular district.
     *
     * @param {Object} district A district object with state and district number.
     * @param {Function} cb A function callback
     * @param {Object} scope The scope to execute the callback in
     */
    getLegislatorsByDistrict: function(district, cb, scope) {
        var params = Ext.apply(this.getBaseParams(), district),
            query = this.legislatorQuery.applyTemplate(params);

        this.onLegislatorsByDistrict = Ext.createDelegate(Geo.CongressServiceImpl.prototype.onLegislatorsByDistrict, scope || window, [cb, scope], true);
        Ext.YQL.request({
            query: query,
            callback: this.onLegislatorsByDistrict,
            scope: scope
        });
    },

    // private
    // this will be wrapped by getCommitteesForLegislator to exec
    // the user callback
    onCommitteesForLegislator: function(result, cb, scope) {
        var committees = [];
        if (result.query && result.query.results) {
            committees = result.query.results.committee;
            if (!committees.slice) {
                committees = [committees];
            }
        }
        cb.call(scope || window, committees);
    },

    /**
     * Gets the Committees for a particular Legislator by their bioGuideId.
     *
     * @param {String} bioGuideId bioGuideIds correspond to the Biographical Directory of the United States Congress.
     * @param {Function} cb A function callback
     * @param {Object} scope The scope to execute the callback in
     */
    getCommitteesForLegislator: function(bioGuideId, cb, scope) {
        var params = Ext.apply(this.getBaseParams(), {
            bioguide_id: bioGuideId
        });
        var query = this.committeesQuery.applyTemplate(params);

        this.onCommitteesForLegislator = Ext.createDelegate(Geo.CongressServiceImpl.prototype.onCommitteesForLegislator, scope || window, [cb, scope], true);
        Ext.YQL.request({
            query: query,
            callback: this.onCommitteesForLegislator,
            scope: scope
        });
    },

    // private
    // this will be wrapped by getBillsForLegislator to exec
    // the user callback
    onBillsForLegislator: function(result, cb, scope) {
        var bills = [];
        if (result.query && result.query.results) {
            bills = result.query.results.result;
        }
        cb.call(scope || window, bills);
    },

    /**
     * Gets the Bills sponsored by a particular legislator.
     *
     * @param {String} govTrackId Corresponds a legislators govTrackId on govtrack.us
     * @param {Function} cb A function callback
     * @param {Object} scope The scope to execute the callback in
     */
    getBillsForLegislator: function(govTrackId, cb, scope) {
        var params = {
            sponsor: govTrackId
        };
        var query = this.billsQuery.applyTemplate(params);

        this.onBillsForLegislator = Ext.createDelegate(Geo.CongressServiceImpl.prototype.onBillsForLegislator, scope || window, [cb, scope], true);

        Ext.YQL.request({
            query: query,
            callback: this.onBillsForLegislator,
            scope: scope
        });
    },

    // private
    // this will be wrapped by getVotesForLegislator to exec
    // the user callback
    onVotesForLegislator: function(result, cb, scope) {
        var votes = [];
        if (result.query) {
            votes = result.query.results.vote;
        }
        cb.call(scope || window, votes);
    },

    /**
     * Gets recent votes for a particular legislator.
     *
     * @param {String} govTrackId Corresponds a legislators govTrackId on govtrack.us
     * @param {Number/Boolean} limit Passing a number here will limit the results to that number. Passing false will retrieve ALL results.
     * @param {Function} cb A function callback
     * @param {Object} scope The scope to execute the callback in
     */
    getVotesForLegislator: function(govTrackId, limit, cb, scope) {
        var params = {
            person: govTrackId,
            limit: limit
        };
        var query = this.votesQuery.applyTemplate(params);

        this.onVotesForLegislator = Ext.createDelegate(Geo.CongressServiceImpl.prototype.onVotesForLegislator, scope || window, [cb, scope], true);

        Ext.YQL.request({
            query: query,
            callback: this.onVotesForLegislator,
            scope: scope
        });
    },

    // private
    // this will be wrapped by getBillSummary to exec
    // the user callback
    onBillSummary: function(result, cb, scope) {
        if (result.query) {
            var summary = result.query.results.summary || {};
            for (var i = 0, ln = summary.Paragraph.length; i < ln; i++) {
                if (typeof summary.Paragraph[i] == 'object') {
                    delete summary.Paragraph[i];
                }
            }
            cb.call(scope || window, summary);
        }
    },

    /**
     * Gets the summary of a bill
     *
     * @param {Object} params An object bill and session 
     * @param {Function} cb A function callback
     * @param {Object} scope The scope to execute the callback in
     */
    getBillSummary: function(params, cb, scope) {
        var query = this.billSummaryQuery.applyTemplate(params);

        this.onBillSummary = Ext.createDelegate(Geo.CongressServiceImpl.prototype.onBillSummary, scope || window, [cb, scope], true);
        Ext.YQL.request({
            query: query,
            callback: this.onBillSummary,
            scope: scope
        });
    },

    /**
     * Gets a set of baseParams to be passed to most of the YQL Queries.
     * For now this is just an apiKey.
     */
    getBaseParams: function() {
        return {
            apiKey: this.apiKey
        };
    }
});

Geo.CongressService = new Geo.CongressServiceImpl();