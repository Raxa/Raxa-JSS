# Using Lists in Sencha Touch 2

List is a component that renders a {@link Ext.data.Store Store} as a list of items on the page. It's a subclass of {@link Ext.dataview.DataView DataView}, which gives it most of its capabilities ([see DataView guide](#/guide/dataview)). List adds a few capabilities of its own though:

* Grouping of items, optional index bar, pinned headers
* Optional disclosure icons on each item
* Optional icons and labels for each item

## Creating a simple List

You can render a List simply with static items like this:

	Ext.create('Ext.List', {
		store: {
			fields: ['name'],
			data: [
				{name: 'Cowper'},
				{name: 'Everett'},
				{name: 'University'},
				{name: 'Forest'}
			]
		},

		itemConfig: {
			tpl: '{name}'
		}
	});

This will just render one {@link Ext.dataview.component.DataItem DataItem} for each item in the {@link Ext.data.Store Store}. You can also attach listeners to events on the List,

	Ext.create('Ext.List', {
		listeners: {
			select: function() {
				alert('tapped on ' + )
			}
		},

		//store and itemConfig as before
	});

## Loading a List over AJAX

It's pretty common to want to make a list out of some data from a web service.






















