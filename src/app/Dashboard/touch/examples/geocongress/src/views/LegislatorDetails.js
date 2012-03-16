/**
 * @class Geo.views.LegislatorDetails
 * @extends Ext.Panel
 *
 * This Panel displays all information about a particular legislator by
 * aggregating their Bio, Sponsored Bills and Voting History in a TabPanel.
 *
 * Also enables toggling between the billSummary card and management of a
 * shared toolbar between the tabs and bill summary.
 *
 * A single instance of this class is shared across every legislator in the
 * application to conserve memory and hence all of the toggling/resetting of
 * data/ui.
 */

Geo.views.LegislatorDetails = Ext.extend(Ext.Panel, {
    cls: 'legislator-details',
    layout: 'card',
    cacheSizes: false,
    
    initComponent: function() {
        this.bio = new Geo.views.LegislatorBio({
            title: 'Bio'
        });
        
        this.bills = new Ext.List({
            title: 'Bills',
            store: Geo.stores.Bills,
            grouped: true,
            emptyText: "No Bills Sponsored Currently",
            itemTpl: Ext.XTemplate.from('bills')
        });
        
        this.votes = new Ext.List({
            title: 'Votes',
            grouped: true,
            store: Geo.stores.Votes,
            itemTpl: Ext.XTemplate.from('votes'),
            emptyText: "No Recent Votes"
        });
        
        this.toolbar = new Ext.Toolbar({
            dock: 'top',
            items: [{
                text: 'Back',
                ui: 'back',
                handler: this.backBtn,
                scope: this
            }]
        });
        this.dockedItems = [this.toolbar];

        this.tabs = new Ext.TabPanel({
            cls: 'legislator-tabs',
            items: [this.bio, this.bills, this.votes]
        });
        this.billSummary = new Geo.views.BillSummary();
        
        this.items = [this.tabs, this.billSummary];
        
        Geo.views.LegislatorDetails.superclass.initComponent.call(this);
        this.votes.on('itemtap', this.onVoteTap, this);
        this.bills.on('itemtap', this.onBillTap, this);        

        this.billSummary.on('beforedeactivate', this.onBillSummaryDeactivate, this);
        this.on('activate', this.onPanelActivate, this);
        this.on('beforeactivate', this.onPanelBeforeActivate, this);
        
        var tabBar = this.tabs.getTabBar();
        tabBar.on('change', this.onTabChange, this);
    },
    
    onPanelBeforeActivate: function() {
        this.tabs.items.each(function(card) {
            if (card.scroller) {
                card.scroller.scrollTo({x: 0, y: 0}, false);
            }
        });
        if (this.billSummary.rendered) {
            this.billSummary.scroller.scrollTo({x: 0, y: 0}, false);
        }
        
    },
    
    updateLegislatorTitle: function(title) {
        if (title) {
            this.legislatorTitle = title;
        }
        this.toolbar.setTitle(this.legislatorTitle || '');
    },
    
    onPanelActivate: function() {
        this.updateLegislatorTitle();
    },
    
    onBillSummaryDeactivate: function() {
        this.updateLegislatorTitle();
        this.billSummary.update("Loading...");
        this.billSummary.scroller.scrollTo({x: 0, y: 0}, false);

    },
    
    onTabChange: function(tabs, tab, card) {
        // resolves condition where bio tab
        // sub-titles didn't layout their dockedItems
        if (card.doLayout) {
            card.doLayout();
        }
      //  card.scroller.scrollTo(0);
    },
    
    backBtn: function() {
        var activeItem = this.layout.activeItem,
            idx = this.items.items.indexOf(activeItem),
            ownerCt = idx === 0 ? this.ownerCt : this,
            animCfg = Ext.is.Android ? false : {type: 'slide', direction: 'right'};
            
        ownerCt.layout.prev(animCfg);
    },
    
    onVoteTap: function(dv, index, item, e) {
        var ds = dv.getStore(),
            r = ds.getAt(index);
        Geo.Util.openUrl(r.get('link'));
    },
    
    onBillTap: function(dv, index, item, e) {
        var ds = dv.getStore(),
            r = ds.getAt(index),
            bill = r.get('bill-type') + r.get('bill-number');

        this.toolbar.setTitle('Bill ' + bill);
        this.billSummary.getBill(bill);
        this.setActiveItem(this.billSummary, Geo.defaultAnim);
    },

    update: function(govtrack_id) {
        var cache = Geo.cache.Legislators,
            bills = cache.bills[govtrack_id],
            votes = cache.votes[govtrack_id];
        
        var idx = Geo.stores.Legislators.find('govtrack_id', govtrack_id),
            r = Geo.stores.Legislators.getAt(idx);
        
        this.updateLegislatorTitle(r.data.title + ' ' + r.data.lastname);
        this.bio.update(r.data);
        
        if (!bills) {
            this.bills.update("Loading...");
            Geo.CongressService.getBillsForLegislator(govtrack_id, this.onBillsUpdate, this);
        } 
        else {
            Geo.stores.Bills.loadData(bills);
        }
        
        if (!votes) {
            this.votes.update("Loading...");
            Geo.CongressService.getVotesForLegislator(govtrack_id, 35, this.onVotesUpdate, this);
        } 
        else {
            Geo.stores.Votes.loadData(votes);
        }
    },
    
    onBillsUpdate: function(bills) {
       // Geo.cache.Legislators.bills[this.bio.data.govtrack_id] = bills;
        Geo.stores.Bills.loadData(bills);
    },
    
    onVotesUpdate: function(votes) {
        //Geo.cache.Legislators.votes[this.bio.data.govtrack_id] = votes;
        Geo.stores.Votes.loadData(votes);
    }
});

Ext.reg('legislatordetails', Geo.views.LegislatorDetails);