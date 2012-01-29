Ext.require(
    [
        'Ext.data.Model', 
        'Ext.data.TreeStore',
        'Ext.app.Application',
        'Ext.field.TextArea',
        'Ext.dataview.NestedList'
    ],
    function() {    
    Ext.override(Ext.dataview.NestedList, {
        getCurrentList: function(node) {
            var firstList = this.firstList,
                secondList = this.secondList,
                activeItem = this.getActiveItem(),
                currentList = activeItem === firstList ? firstList : secondList;
            
            return currentList;
        }
    });
});