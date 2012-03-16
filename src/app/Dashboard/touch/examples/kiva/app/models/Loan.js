/**
 * @class Loan
 * @extends Ext.data.Model
 * The Loan model is the only model we need in this simple application. We're using a custom Proxy for
 * this application to enable us to consume Kiva's JSON api. See lib/KivaProxy.js to see how this is done
 */
Ext.regModel("Loan", {
    fields: [
        {name: "id",             type: "int"},
        {name: "name",           type: "string"},
        {name: "status",         type: "string"},
        {name: "loan_amount",    type: "int"},
        {name: "percentfunded",  type: "int"},
        {name: "funded_amount",  type: "int"},
        {name: "basket_amount",  type: "int"},
        {name: "borrower_count", type: "int"},
        {name: "activity",       type: "string"},
        {name: "sector",         type: "string"},
        {name: "use",            type: "string"},
        {name: "partner_id",     type: "int"},
        'terms', 'image', 'location', 'description'
    ],
    
    proxy: {
        type: 'kiva',
        
        reader: {
            type: 'json',
            root: 'query.results.loans'
        }
    }
});