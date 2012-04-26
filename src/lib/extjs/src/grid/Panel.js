/**
 * @author Aaron Conran
 * @docauthor Ed Spencer
 *
 * Grids are an excellent way of showing large amounts of tabular data on the client side. Essentially a supercharged
 * `<table>`, GridPanel makes it easy to fetch, sort and filter large amounts of data.
 *
 * Grids are composed of two main pieces - a {@link Ext.data.Store Store} full of data and a set of columns to render.
 *
 * ## Basic GridPanel
 *
 *     @example
 *     Ext.create('Ext.data.Store', {
 *         storeId:'simpsonsStore',
 *         fields:['name', 'email', 'phone'],
 *         data:{'items':[
 *             { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
 *             { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
 *             { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
 *             { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
 *         ]},
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 root: 'items'
 *             }
 *         }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: Ext.data.StoreManager.lookup('simpsonsStore'),
 *         columns: [
 *             { header: 'Name',  dataIndex: 'name' },
 *             { header: 'Email', dataIndex: 'email', flex: 1 },
 *             { header: 'Phone', dataIndex: 'phone' }
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 *
 * The code above produces a simple grid with three columns. We specified a Store which will load JSON data inline.
 * In most apps we would be placing the grid inside another container and wouldn't need to use the
 * {@link #height}, {@link #width} and {@link #renderTo} configurations but they are included here to make it easy to get
 * up and running.
 *
 * The grid we created above will contain a header bar with a title ('Simpsons'), a row of column headers directly underneath
 * and finally the grid rows under the headers.
 *
 * ## Configuring columns
 *
 * By default, each column is sortable and will toggle between ASC and DESC sorting when you click on its header. Each
 * column header is also reorderable by default, and each gains a drop-down menu with options to hide and show columns.
 * It's easy to configure each column - here we use the same example as above and just modify the columns config:
 *
 *     columns: [
 *         {
 *             header: 'Name',
 *             dataIndex: 'name',
 *             sortable: false,
 *             hideable: false,
 *             flex: 1
 *         },
 *         {
 *             header: 'Email',
 *             dataIndex: 'email',
 *             hidden: true
 *         },
 *         {
 *             header: 'Phone',
 *             dataIndex: 'phone',
 *             width: 100
 *         }
 *     ]
 *
 * We turned off sorting and hiding on the 'Name' column so clicking its header now has no effect. We also made the Email
 * column hidden by default (it can be shown again by using the menu on any other column). We also set the Phone column to
 * a fixed with of 100px and flexed the Name column, which means it takes up all remaining width after the other columns
 * have been accounted for. See the {@link Ext.grid.column.Column column docs} for more details.
 *
 * ## Renderers
 *
 * As well as customizing columns, it's easy to alter the rendering of individual cells using renderers. A renderer is
 * tied to a particular column and is passed the value that would be rendered into each cell in that column. For example,
 * we could define a renderer function for the email column to turn each email address into a mailto link:
 *
 *     columns: [
 *         {
 *             header: 'Email',
 *             dataIndex: 'email',
 *             renderer: function(value) {
 *                 return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
 *             }
 *         }
 *     ]
 *
 * See the {@link Ext.grid.column.Column column docs} for more information on renderers.
 *
 * ## Selection Models
 *
 * Sometimes all you want is to render data onto the screen for viewing, but usually it's necessary to interact with or
 * update that data. Grids use a concept called a Selection Model, which is simply a mechanism for selecting some part of
 * the data in the grid. The two main types of Selection Model are RowSelectionModel, where entire rows are selected, and
 * CellSelectionModel, where individual cells are selected.
 *
 * Grids use a Row Selection Model by default, but this is easy to customise like so:
 *
 *     Ext.create('Ext.grid.Panel', {
 *         selType: 'cellmodel',
 *         store: ...
 *     });
 *
 * Specifying the `cellmodel` changes a couple of things. Firstly, clicking on a cell now
 * selects just that cell (using a {@link Ext.selection.RowModel rowmodel} will select the entire row), and secondly the
 * keyboard navigation will walk from cell to cell instead of row to row. Cell-based selection models are usually used in
 * conjunction with editing.
 *
 * ## Editing
 *
 * Grid has built-in support for in-line editing. There are two chief editing modes - cell editing and row editing. Cell
 * editing is easy to add to your existing column setup - here we'll just modify the example above to include an editor
 * on both the name and the email columns:
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: Ext.data.StoreManager.lookup('simpsonsStore'),
 *         columns: [
 *             { header: 'Name',  dataIndex: 'name', field: 'textfield' },
 *             { header: 'Email', dataIndex: 'email', flex: 1,
 *                 field: {
 *                     xtype: 'textfield',
 *                     allowBlank: false
 *                 }
 *             },
 *             { header: 'Phone', dataIndex: 'phone' }
 *         ],
 *         selType: 'cellmodel',
 *         plugins: [
 *             Ext.create('Ext.grid.plugin.CellEditing', {
 *                 clicksToEdit: 1
 *             })
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 *
 * This requires a little explanation. We're passing in {@link #store store} and {@link #columns columns} as normal, but
 * this time we've also specified a {@link Ext.grid.column.Column#field field} on two of our columns. For the Name column
 * we just want a default textfield to edit the value, so we specify 'textfield'. For the Email column we customized the
 * editor slightly by passing allowBlank: false, which will provide inline validation.
 *
 * To support cell editing, we also specified that the grid should use the 'cellmodel' {@link #selType}, and created an
 * instance of the {@link Ext.grid.plugin.CellEditing CellEditing plugin}, which we configured to activate each editor after a
 * single click.
 *
 * ## Row Editing
 *
 * The other type of editing is row-based editing, using the RowEditor component. This enables you to edit an entire row
 * at a time, rather than editing cell by cell. Row Editing works in exactly the same way as cell editing, all we need to
 * do is change the plugin type to {@link Ext.grid.plugin.RowEditing}, and set the selType to 'rowmodel':
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: Ext.data.StoreManager.lookup('simpsonsStore'),
 *         columns: [
 *             { header: 'Name',  dataIndex: 'name', field: 'textfield' },
 *             { header: 'Email', dataIndex: 'email', flex:1,
 *                 field: {
 *                     xtype: 'textfield',
 *                     allowBlank: false
 *                 }
 *             },
 *             { header: 'Phone', dataIndex: 'phone' }
 *         ],
 *         selType: 'rowmodel',
 *         plugins: [
 *             Ext.create('Ext.grid.plugin.RowEditing', {
 *                 clicksToEdit: 1
 *             })
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 *
 * Again we passed some configuration to our {@link Ext.grid.plugin.RowEditing} plugin, and now when we click each row a row
 * editor will appear and enable us to edit each of the columns we have specified an editor for.
 *
 * ## Sorting & Filtering
 *
 * Every grid is attached to a {@link Ext.data.Store Store}, which provides multi-sort and filtering capabilities. It's
 * easy to set up a grid to be sorted from the start:
 *
 *     var myGrid = Ext.create('Ext.grid.Panel', {
 *         store: {
 *             fields: ['name', 'email', 'phone'],
 *             sorters: ['name', 'phone']
 *         },
 *         columns: [
 *             { text: 'Name',  dataIndex: 'name' },
 *             { text: 'Email', dataIndex: 'email' }
 *         ]
 *     });
 *
 * Sorting at run time is easily accomplished by simply clicking each column header. If you need to perform sorting on
 * more than one field at run time it's easy to do so by adding new sorters to the store:
 *
 *     myGrid.store.sort([
 *         { property: 'name',  direction: 'ASC' },
 *         { property: 'email', direction: 'DESC' }
 *     ]);
 *
 * See {@link Ext.data.Store} for examples of filtering.
 *
 * ## Grouping
 *
 * Grid supports the grouping of rows by any field. For example if we had a set of employee records, we might want to
 * group by the department that each employee works in. Here's how we might set that up:
 *
 *     @example
 *     var store = Ext.create('Ext.data.Store', {
 *         storeId:'employeeStore',
 *         fields:['name', 'seniority', 'department'],
 *         groupField: 'department',
 *         data: {'employees':[
 *             { "name": "Michael Scott",  "seniority": 7, "department": "Management" },
 *             { "name": "Dwight Schrute", "seniority": 2, "department": "Sales" },
 *             { "name": "Jim Halpert",    "seniority": 3, "department": "Sales" },
 *             { "name": "Kevin Malone",   "seniority": 4, "department": "Accounting" },
 *             { "name": "Angela Martin",  "seniority": 5, "department": "Accounting" }
 *         ]},
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 root: 'employees'
 *             }
 *         }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Employees',
 *         store: Ext.data.StoreManager.lookup('employeeStore'),
 *         columns: [
 *             { header: 'Name',     dataIndex: 'name' },
 *             { header: 'Seniority', dataIndex: 'seniority' }
 *         ],
 *         features: [{ftype:'grouping'}],
 *         width: 200,
 *         height: 275,
 *         renderTo: Ext.getBody()
 *     });
 *
 * ## Infinite Scrolling
 *
 * Grid supports infinite scrolling as an alternative to using a paging toolbar. Your users can scroll through thousands
 * of records without the performance penalties of renderering all the records on screen at once. The grid should be bound
 * to a *buffered* store with a pageSize specified.
 *
 * The number of rows rendered outside the visible area, and the buffering of pages of data from the remote server for
 * immediate rendering upon scroll can be controlled by configuring the {@link Ext.grid.PagingScroller #verticalScroller}.
 *
 * You can tell it to create a larger table to provide more scrolling before a refresh is needed, and also to keep more pages
 * of records in memory for faster refreshing when scrolling.
 *
 *     var myStore = Ext.create('Ext.data.Store', {
 *         // ...
 *         buffered: true,
 *         pageSize: 100,
 *         // ...
 *     });
 *
 *     var grid = Ext.create('Ext.grid.Panel', {
 *         // ...
 *         autoLoad: true,
 *         verticalScroller: {
 *             trailingBufferZone: 200,  // Keep 200 records buffered in memory behind scroll
 *             leadingBufferZone: 5000   // Keep 5000 records buffered in memory ahead of scroll
 *         },
 *         // ...
 *     });
 *
 * ## Paging
 *
 * Grid supports paging through large sets of data via a PagingToolbar or PagingGridScroller (see the Infinite Scrolling section above).
 * To leverage paging via a toolbar or scroller, you need to set a pageSize configuration on the Store.
 *
 *     @example
 *     var itemsPerPage = 2;   // set the number of items you want per page
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         id:'simpsonsStore',
 *         autoLoad: false,
 *         fields:['name', 'email', 'phone'],
 *         pageSize: itemsPerPage, // items per page
 *         proxy: {
 *             type: 'ajax',
 *             url: 'pagingstore.js',  // url that will load data with respect to start and limit params
 *             reader: {
 *                 type: 'json',
 *                 root: 'items',
 *                 totalProperty: 'total'
 *             }
 *         }
 *     });
 *
 *     // specify the page you want to load
 *     store.loadPage(1);
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: store,
 *         columns: [
 *             {header: 'Name',  dataIndex: 'name'},
 *             {header: 'Email', dataIndex: 'email', flex:1},
 *             {header: 'Phone', dataIndex: 'phone'}
 *         ],
 *         width: 400,
 *         height: 125,
 *         dockedItems: [{
 *             xtype: 'pagingtoolbar',
 *             store: store,   // same store GridPanel is using
 *             dock: 'bottom',
 *             displayInfo: true
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 *     
 * ## State saving
 * 
 * When configured {@link #stateful}, grids save their column state (order and width) encapsulated within the default
 * Panel state of changed width and height and collapsed/expanded state.
 *
 * Each {@link @columns column} of the grid may be configured with a {@link Ext.grid.column.Column#stateId stateId} which
 * identifies that column locally within the grid.
 */
Ext.define('Ext.grid.Panel', {
    extend: 'Ext.panel.Table',
    requires: ['Ext.grid.View'],
    alias: ['widget.gridpanel', 'widget.grid'],
    alternateClassName: ['Ext.list.ListView', 'Ext.ListView', 'Ext.grid.GridPanel'],
    viewType: 'gridview',

    lockable: false,

    // Required for the Lockable Mixin. These are the configurations which will be copied to the
    // normal and locked sub tablepanels
    bothCfgCopy: [
        'invalidateScrollerOnRefresh',
        'hideHeaders',
        'enableColumnHide',
        'enableColumnMove',
        'enableColumnResize',
        'sortableColumns'
    ],
    normalCfgCopy: [ 
        'verticalScroller', 
        'verticalScrollDock', 
        'verticalScrollerType', 
        'scroll'
    ],
    lockedCfgCopy: [],

    /**
     * @cfg {Boolean} rowLines False to remove row line styling
     */
    rowLines: true

    // Columns config is required in Grid
    /**
     * @cfg {Ext.grid.column.Column[]/Object} columns (required)
     * @inheritdoc
     */

    /**
     * @event reconfigure
     * Fires after a reconfigure.
     * @param {Ext.grid.Panel} this
     * @param {Ext.data.Store} store The store that was passed to the {@link #method-reconfigure} method
     * @param {Object[]} columns The column configs that were passed to the {@link #method-reconfigure} method
     */

    /**
     * @method reconfigure
     * Reconfigures the grid with a new store/columns. Either the store or the columns can be omitted if you don't wish
     * to change them.
     * @param {Ext.data.Store} store (Optional) The new store.
     * @param {Object[]} columns (Optional) An array of column configs
     */
});