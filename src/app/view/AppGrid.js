/*
 * This view contains a grid of buttons that allow the user to choose a module
 * The module icons are located at src/resources/img/*.png
 */
Ext.define('RaxaEmr.view.Dashboard', {
			extend : 'Ext.Panel',
			// id: 'appGrid',
			config : {
				layout : 'fit',
				items : [{
					xtype : 'panel',
					id : 'appGrid',
					centered : true,
					
					//addModules takes in a string array of the modules for the current user
					addModules : function(args) {
						var appRows = [];
						for (var i = 0; i < args.length / 3; i++) {
							appRows[i] = Ext.create('Ext.Container', {
										layout : 'hbox',
										align : 'center'
										,
									});
						}
						for (var j = 0; j < args.length; j++) {

							var cell = Ext.create('Ext.Panel', {
										layout : 'vbox',
										items : [{
											xtype : 'button',
											id : args[j],
											icon : 'resources/img/' + args[j]
													+ 'Logo.png',
											width : '200px',
											height : '150px',
											text : args[j]
											,
										}]
									});
							appRows[Math.floor(j / 3)].add(cell);
						}
						for (var i = 0; i < args.length / 3; i++) {
							this.add(appRows[i]);
						}
					}

				}]
			},
			initialize : function(args) {
				this.callParent();
			}
		});
