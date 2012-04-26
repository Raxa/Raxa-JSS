/**
 * This layout implements the column arrangement for {@link Ext.form.CheckboxGroup} and {@link Ext.form.RadioGroup}.
 * It groups the component's sub-items into columns based on the component's
 * {@link Ext.form.CheckboxGroup#columns columns} and {@link Ext.form.CheckboxGroup#vertical} config properties.
 */
Ext.define('Ext.layout.container.CheckboxGroup', {
    extend: 'Ext.layout.container.Container',
    alias: ['layout.checkboxgroup'],

    /**
     * @cfg {Boolean} [autoFlex=true]
     * By default,  CheckboxGroup allocates all available space to the configured columns meaning that
     * column are evenly spaced across the container.
     *
     * To have each column only be wide enough to fit the container Checkboxes (or Radios), set `autoFlex` to `false`
     */
    autoFlex: true,

    type: 'checkboxgroup',

    childEls: [
        'innerCt'
    ],

    renderTpl: [
        '<table id="{ownerId}-innerCt" role="presentation" style="{tableStyle}"><tbody><tr>',
            '<tpl for="columns">',
                '<td class="{parent.colCls}" valign="top" style="{style}">',
                    '{% this.renderColumn(out,parent,xindex-1) %}',
                '</td>',
            '</tpl>',
        '</tr></tbody></table>'
    ],

    beginLayout: function(ownerContext) {
        var me = this,
            columns,
            numCols, numChildren,
            childItems,
            i, width, cwidth,
            totalFlex = 0, flexedCols = 0,
            autoFlex = me.autoFlex,
            currGen = me.owner.items.generation,
            innerCtStyle = me.innerCt.dom.style;

        me.callParent(arguments);
        childItems = ownerContext.childItems;

        // If the child items have changed since the last layout then we need to fixup
        // the association of items to columns:
        if (me.lastChildGeneration != currGen) {
            me.lastChildGeneration = currGen;
            me.fixColumns();
        }

        // fixColumns may have updated the element cache, no need to get the columnEls
        // now...
        columns = me.columnEls;

        ownerContext.innerCtContext = ownerContext.getEl('innerCt', me);

        // The columns config may be an array of widths. Any value < 1 is taken to be a fraction:
        if (!ownerContext.widthModel.shrinkWrap) {
            numCols = columns.length;

            // If columns is an array of numeric widths
            if (me.columnsArray) {

                // first calculate total flex
                for (i = 0; i < numCols; i++) {
                    width = me.owner.columns[i];
                    if (width < 1) {
                        totalFlex += width;
                        flexedCols++;
                    }
                }

                // now apply widths
                for (i = 0; i < numCols; i++) {
                    width = me.owner.columns[i];
                    if (width < 1) {
                        cwidth = ((width / totalFlex) * 100) + '%';
                    } else {
                        cwidth = width + 'px';
                    }
                    columns[i].style.width = cwidth;
                }
            }

            // Otherwise it's the *number* of columns, so distributed the widths evenly
            else {
                for (i = 0; i < numCols; i++) {
                    // autoFlex: true will automatically calculate % widths
                    // autoFlex: false allows the table to decide (shrinkWrap, in effect)
                    // on a per-column basis
                    cwidth = autoFlex
                        ? (1 / numCols * 100) + '%'
                        : '';
                    columns[i].style.width = cwidth;
                    flexedCols++;
                }
            }

            // no flexed cols -- all widths are fixed
            if (!flexedCols) {
                innerCtStyle.tableLayout = 'fixed';
                innerCtStyle.width = '';
            // some flexed cols -- need to fix some
            } else if (flexedCols < numCols) {
                innerCtStyle.tableLayout = 'fixed';
                innerCtStyle.width = '100%';
            // let the table decide
            } else {
                innerCtStyle.tableLayout = 'auto';
                // if autoFlex, fill available space, else compact down
                if (autoFlex) {
                    innerCtStyle.width = '100%';
                } else {
                    innerCtStyle.width = '';
                }
            }

        } else {
            innerCtStyle.tableLayout = 'auto';
            innerCtStyle.width = '';
        }
    },

    cacheElements: function () {
        var me = this;

        // Grab defined childEls
        me.callParent();

        // Grab columns TDs
        me.columnEls = me.innerCt.query('td.' + me.owner.groupCls);

        // we just rendered so the items are in the correct columns:
        me.lastChildGeneration = me.owner.items.generation;
    },

    /*
     * Just wait for the child items to all lay themselves out in the width we are configured
     * to make available to them. Then we can measure our height.
     */
    calculate: function(ownerContext) {
        var me = this,
            targetContext, widthShrinkWrap, heightShrinkWrap, shrinkWrap, table, targetPadding;

        // The columnEls are widthed using their own width attributes, we just need to wait
        // for all children to have arranged themselves in that width, and then collect our height.
        if (!ownerContext.getDomProp('containerChildrenDone')) {
            me.done = false;
        } else {
            targetContext = ownerContext.innerCtContext;
            widthShrinkWrap = ownerContext.widthModel.shrinkWrap;
            heightShrinkWrap = ownerContext.heightModel.shrinkWrap;
            shrinkWrap = heightShrinkWrap || widthShrinkWrap;
            table = targetContext.el.dom;
            targetPadding = shrinkWrap && targetContext.getPaddingInfo();

            if (widthShrinkWrap) {
                ownerContext.setContentWidth(table.offsetWidth + targetPadding.width, true);
            }

            if (heightShrinkWrap) {
                ownerContext.setContentHeight(table.offsetHeight + targetPadding.height, true);
            }
        }
    },

    doRenderColumn: function (out, renderData, columnIndex) {
        // Careful! This method is bolted on to the renderTpl so all we get for context is
        // the renderData! The "this" pointer is the renderTpl instance!

        var me = renderData.$layout,
            owner = me.owner,
            columnCount = renderData.columnCount,
            items = owner.items.items,
            itemCount = items.length,
            item, itemIndex, rowCount, increment, tree;

        // Example:
        //      columnCount = 3
        //      items.length = 10

        if (owner.vertical) {
            //        0   1   2
            //      +---+---+---+
            //    0 | 0 | 4 | 8 |
            //      +---+---+---+
            //    1 | 1 | 5 | 9 |
            //      +---+---+---+
            //    2 | 2 | 6 |   |
            //      +---+---+---+
            //    3 | 3 | 7 |   |
            //      +---+---+---+

            rowCount = Math.ceil(itemCount / columnCount); // = 4
            itemIndex = columnIndex * rowCount;
            itemCount = Math.min(itemCount, itemIndex + rowCount);
            increment = 1;
        } else {
            //        0   1   2
            //      +---+---+---+
            //    0 | 0 | 1 | 2 |
            //      +---+---+---+
            //    1 | 3 | 4 | 5 |
            //      +---+---+---+
            //    2 | 6 | 7 | 8 |
            //      +---+---+---+
            //    3 | 9 |   |   |
            //      +---+---+---+

            itemIndex = columnIndex;
            increment = columnCount;
        }

        for ( ; itemIndex < itemCount; itemIndex += increment) {
            item = items[itemIndex];
            me.configureItem(item);
            tree = item.getRenderTree();
            Ext.DomHelper.generateMarkup(tree, out);
        }
    },

    // Distribute child items between column elements according to row first or
    // column first order
    fixColumns: function () {
        var me = this,
            owner = me.owner,
            cfgCols = owner.columns,
            columns = me.columnEls,
            items = owner.items.items,
            columnCount = columns.length,
            itemCount = items.length,
            columnIndex, i, rowCount, tr, td, newCount;

        // if running in 'auto' columns mode, and the number of items has increased (add call)
        // then we need to add a new td to the table
        if ((!cfgCols || cfgCols == 'auto') && (itemCount > columnCount)) {

            // add column td's for each new item added
            newCount = itemCount - columnCount;
            for (i = 0; i < newCount; i++) {
                tr = me.innerCt.down('tr');
                tr.createChild({
                    cls: owner.groupCls,
                    tag: 'td',
                    vAlign: 'top'
                });
            }
            me.cacheElements();
            columns = me.columnEls;
            columnCount = columns.length;
        }

        if (owner.vertical) {
            columnIndex = -1; // first loop will increment this to 0
            rowCount = Math.ceil(itemCount / columnCount);

            for (i = 0; i < itemCount; ++i) {
                if (i % rowCount === 0) {
                    ++columnIndex;
                }
                columns[columnIndex].appendChild(items[i].el.dom);
            }
        } else {
            for (i = 0; i < itemCount; ++i) {
                columnIndex = i % columnCount;
                columns[columnIndex].appendChild(items[i].el.dom);
            }
        }
    },

    /**
     * Returns the number of columns in the checkbox group.
     * @private
     */
    getColumnCount: function() {
        var me = this,
            owner = me.owner,
            ownerColumns = owner.columns;

        // Our columns config is an array of numeric widths.
        // Calculate our total width
        if (me.columnsArray) {
            return ownerColumns.length;
        }

        if (Ext.isNumber(ownerColumns)) {
            return ownerColumns;
        }
        return owner.items.length;
    },

    getItemSizePolicy: function (item) {
        return this.autoSizePolicy;
    },

    getRenderData: function () {
        var me = this,
            data = me.callParent(),
            owner = me.owner,
            i, columns = me.getColumnCount(),
            width, column, cwidth,
            autoFlex = me.autoFlex,
            totalFlex = 0, flexedCols = 0;

        // calculate total flex
        if (me.columnsArray) {
            for (i=0; i < columns; i++) {
                width = me.owner.columns[i];
                if (width < 1) {
                    totalFlex += width;
                    flexedCols++;
                }
            }
        }

        data.colCls = owner.groupCls;
        data.columnCount = columns;

        data.columns = [];
        for (i = 0; i < columns; i++) {
            column = (data.columns[i] = {});

            if (me.columnsArray) {
                width = me.owner.columns[i];
                if (width < 1) {
                    cwidth = ((width / totalFlex) * 100) + '%';
                } else {
                    cwidth = width + 'px';
                }
                column.style = 'width:' + cwidth;
            } else {
                column.style = 'width:' + (1 / columns * 100) + '%';
                flexedCols++;
            }
        }

        // If the columns config was an array of column widths, allow table to auto width
        data.tableStyle =
            !flexedCols ? 'table-layout:fixed;' :
            (flexedCols < columns) ? 'table-layout:fixed;width:100%' :
            (autoFlex) ? 'table-layout:auto;width:100%' : 'table-layout:auto;';

        return data;
    },

    // Overridden method from AbstractContainer.
    getRenderTarget: function() {
        return this.innerCt;
    },

    initLayout: function () {
        var me = this,
            owner = me.owner;

        me.columnsArray = Ext.isArray(owner.columns);
        me.evenColumns = Ext.isNumber(owner.columns);

        me.callParent();
    },

    // Always valid. beginLayout ensures the encapsulating elements of all children are in the correct place
    isValidParent: function() {
        return true;
    },

    setupRenderTpl: function (renderTpl) {
        this.callParent(arguments);

        renderTpl.renderColumn = this.doRenderColumn;
    }
});