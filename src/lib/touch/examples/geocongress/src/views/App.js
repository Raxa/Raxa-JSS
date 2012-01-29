/**
 * @class Geo.App
 * @extends Ext.Panel
 *
 * This is the top level (fullscreen) class of the GeoCongress application.
 * It uses a card layout and has two cards one which displays the initial splash
 * screen and the other which displays all of the legislator details.
 *
<pre>
`-- Geo.App
    |-- LegislatorDetails
    |   |-- BillSummary
    |   `-- tabs
    |       |-- LegislatorBio
    |       |-- bills
    |       `-- votes
    `-- StartScreen
        |-- DistrictInfo (form to toggle between districts)
        `-- main         (main screen)
</pre>
 *
 */

Geo.defaultAnim = Ext.is.Android ? false : 'slide';
Geo.App = Ext.extend(Ext.Panel, {
    cls: 'app',
    fullscreen: true,
    layout: 'card',
    activeItem: 0,
    
    initComponent: function() {        
        this.startScreen = new Geo.views.StartScreen({
            flex: 1
        });
        this.header = new Ext.Component({
            height: 115,
            cls: 'splash'
        })
        this.splash = new Ext.Container({
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'end'
            },
            listeners: {
                deactivate: this.onSplashDeactivate,
                scope: this
            },
            items: [this.header, this.startScreen]
        });
        this.detail = new Geo.views.LegislatorDetails();
        
        this.items = [this.splash, this.detail];
        Geo.App.superclass.initComponent.call(this);
        
        this.startScreen.on('legislatorselect', this.onLegislatorSelect, this);
    },
    
    afterRender: function() {
        Geo.App.superclass.afterRender.apply(this, arguments);
        Ext.getBody().on(Ext.isChrome ? 'click' : 'tap', this.onLinkTap, this, {delegate: 'a.goOutside'});
    },
    
    onLinkTap: function(e, t) {        
        e.stopEvent();
        Geo.Util.openUrl(t.href);
    },
    
    
    onSplashDeactivate: function() {
        this.startScreen.list.getSelectionModel().deselectAll();
    },
    
    onLegislatorSelect: function(govtrack_id) {
        this.setActiveItem(this.detail, Geo.defaultAnim);
        this.detail.update(govtrack_id);
    }
});