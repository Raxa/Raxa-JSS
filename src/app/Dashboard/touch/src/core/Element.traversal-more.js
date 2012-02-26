/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
    /**
     * Gets the Scroller instance of the first parent that has one.
     * @return {Ext.util.Scroller/null} The first parent scroller
     */
    getScrollParent : function() {
        var parent = this.dom, scroller;
        while (parent && parent != document.body) {
            if (parent.id && (scroller = Ext.ScrollManager.get(parent.id))) {
                return scroller;
            }
            parent = parent.parentNode;
        }
        return null;
    }
});
