/**
 * IndexBar is a component used to display a list of data (primarily an alphabet) which can then be used to quickly
 * navigate through a list (see {@link Ext.List}) of data. When a user taps on an item in the {@link Ext.IndexBar},
 * it will fire the {@link #index} event.
 *
 * # Example:
 *
 * Here is an example of the usage in a {@link Ext.List}:
 *
 *     @example phone portrait preview
 *     Ext.regModel('Contact', {
 *        fields: ['firstName', 'lastName']
 *     });
 *
 *     var store = new Ext.data.JsonStore({
 *        model: 'Contact',
 *        sorters: 'lastName',
 *
 *        getGroupString: function(record) {
 *            return record.get('lastName')[0];
 *        },
 *
 *        data: [
 *            {firstName: 'Tommy',   lastName: 'Maintz'},
 *            {firstName: 'Rob',     lastName: 'Dougan'},
 *            {firstName: 'Ed',      lastName: 'Spencer'},
 *            {firstName: 'Jamie',   lastName: 'Avins'},
 *            {firstName: 'Aaron',   lastName: 'Conran'},
 *            {firstName: 'Dave',    lastName: 'Kaneda'},
 *            {firstName: 'Jacky',   lastName: 'Nguyen'},
 *            {firstName: 'Abraham', lastName: 'Elias'},
 *            {firstName: 'Jay',     lastName: 'Robinson'},
 *            {firstName: 'Nigel',   lastName: 'White'},
 *            {firstName: 'Don',     lastName: 'Griffin'},
 *            {firstName: 'Nico',    lastName: 'Ferrero'},
 *            {firstName: 'Nicolas', lastName: 'Belmonte'},
 *            {firstName: 'Jason',   lastName: 'Johnston'}
 *        ]
 *     });
 *
 *     var list = new Ext.List({
 *        fullscreen: true,
 *        itemTpl: '<div class="contact">{firstName} <strong>{lastName}</strong></div>',
 *
 *        grouped     : true,
 *        indexBar    : true,
 *        store: store,
 *        hideOnMaskTap: false
 *     });
 *
 * Alternatively you can initate the {@link Ext.IndexBar} component manually in a custom component by using something
 * similar to the following example:
 *
 *     var indexBar = new Ext.dataview.IndexBar({
 *        docked: 'right',
 *        overlay: true,
 *        alphabet: true
 *     });
 *
*/
Ext.define('Ext.dataview.IndexBar', {
    extend: 'Ext.Component',
    alternateClassName: 'Ext.IndexBar',

    /**
     * @event index
     * Fires when an item in the index bar display has been tapped.
     * @param {Ext.dataview.IndexBar} this The IndexBar instance
     * @param {String} html The HTML inside the tapped node.
     * @param {Ext.dom.Element} target The node on the indexbar that has been tapped.
     */

    config: {
        baseCls: Ext.baseCSSPrefix + 'indexbar',

        /**
         * @private
         * @cfg {String} direction
         * Layout direction, can be either 'vertical' or 'horizontal'
         * @accessor
         */
        direction: 'vertical',

        /**
         * @cfg {Array} letters
         * The letters to show on the index bar.
         * @accessor
         */
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

        ui: 'alphabet',

        /**
         * @cfg {String} listPrefix
         * The prefix string to be appended at the beginning of the list.
         * E.g: useful to add a "#" prefix before numbers.
         * @accessor
         */
        listPrefix: null
    },

    // @private
    itemCls: Ext.baseCSSPrefix + '',

    updateDirection: function(newDirection, oldDirection) {
        var baseCls = this.getBaseCls();

        this.element.replaceCls(baseCls + '-' + oldDirection, baseCls + '-' + newDirection);
    },

    getElementConfig: function() {
        return {
            reference: 'wrapper',
            classList: ['x-centered', 'x-indexbar-wrapper'],
            children: [this.callParent()]
        };
    },

    updateLetters: function(letters) {
        this.innerElement.setHtml('');

        if (letters) {
            var ln = letters.length,
                i;

            for (i = 0; i < ln; i++) {
                this.innerElement.createChild({
                    html: letters[i]
                });
            }
        }
    },

    updateListPrefix: function(listPrefix) {
        if (listPrefix && listPrefix.length) {
            this.innerElement.createChild({
                html: listPrefix
            }, 0);
        }
    },

    // @private
    initialize: function() {
        this.callParent();

        this.innerElement.on({
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            touchmove: this.onTouchMove,
            scope: this
        });
    },

    // @private
    onTouchStart: function(e, t) {
        e.stopPropagation();
        this.innerElement.addCls(this.getBaseCls() + '-pressed');
        this.pageBox = this.innerElement.getPageBox();
        this.onTouchMove(e);
    },

    // @private
    onTouchEnd: function(e, t) {
        this.innerElement.removeCls(this.getBaseCls() + '-pressed');
    },

    // @private
    onTouchMove: function(e) {
        var point = Ext.util.Point.fromEvent(e),
            target,
            pageBox = this.pageBox;

        if (!pageBox) {
            pageBox = this.pageBox = this.el.getPageBox();
        }

        if (this.getDirection() === 'vertical') {
            if (point.y > pageBox.bottom || point.y < pageBox.top) {
                return;
            }
            target = Ext.Element.fromPoint(pageBox.left + (pageBox.width / 2), point.y);
        }
        else {
            if (point.x > pageBox.right || point.x < pageBox.left) {
                return;
            }
            target = Ext.Element.fromPoint(point.x, pageBox.top + (pageBox.height / 2));
        }

        if (target) {
            this.fireEvent('index', this, target.dom.innerHTML, target);
        }
    },

    destroy: function() {
        var me = this,
            elements = Array.prototype.slice.call(me.innerElement.dom.childNodes),
            ln = elements.length,
            i = 0;

        for (; i < ln; i++) {
            Ext.removeNode(elements[i]);
        }
        this.callParent();
    }
});