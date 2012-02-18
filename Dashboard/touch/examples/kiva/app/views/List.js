/**
 * @class kiva.views.List
 * @extends Ext.List
 * 
 * This simple Ext.List subclass is used to display the Loans that are returned from Kiva's API. The largest
 * part of this class is the XTemplate used to render each item - all other functionality is already provided
 * by Ext.List
 */
kiva.views.List = Ext.extend(Ext.List, {
    emptyText   : 'No loans matching that query.',

    ui: 'kiva',
    
    /**
     * Ext.List can take a tpl configuration, which allows us to customize the look and feel of our list. In this case
     * we've set up a simple template and added a custom function (percentFunded), which allows us to do simple view logic
     * inside the template. See the XTemplate docs for more (http://dev.sencha.com/deploy/touch/docs/?class=Ext.XTemplate)
     */
    itemTpl: new Ext.XTemplate(
            '<div class="loan">',
                '<tpl if="image">',
                    '<div class="loan_img" style="background-image: url(http://kiva.org/img/w80h80/{image.id}.jpg);"></div>',
                '</tpl>',
                '<h1>{name}</h1>',
                '<h2>{use}</h2>',
                '<div class="funded_info">',
                    '<div class="goal"> ${terms.loan_amount} </div>',
                    '<div class="funded">',
                        '<div class="progress" style="width: {[this.percentFunded(values)]}%"></div>',
                    '</div>',
                    '<div class="percent"> {[this.percentFunded(values)]}% </div>',
                '</div>',
            '</div>',
        
        {
            /**
             * Returns the percentage of the total requested amount that the loanee has received so far
             * @param {Object} data The Loan data
             * @return {Number} The funding percentage
             */
            percentFunded: function(data) {
                var funded     = data.funded_amount,
                    total      = data.terms.loan_amount,
                    fraction   = funded / total,
                    percentage = Math.round(fraction * 100);
                
                return percentage;
            }
        }
    ),
    
    /**
     * initComponent is called whenever any class is instantiated. It is normal to add some logic here to set up
     * our component - in this case we're defining a Store and adding the filter toolbar at the top.
     */
    initComponent: function() {
        Ext.applyIf(this, {
            store: new Ext.data.Store({
                model: "Loan",
                autoLoad: true,
                remoteFilter: true
            })
        });
    
        kiva.views.List.superclass.initComponent.apply(this, arguments);
        
        this.enableBubble('selectionchange');
    }
});

Ext.reg('loansList', kiva.views.List);