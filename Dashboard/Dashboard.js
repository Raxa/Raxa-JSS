<!DOCTYPE html> 
<html> 
    <head> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
        <title>Dashboard</title> 
 
        <script src="touch/sencha-touch.js" type="text/javascript"></script> 
        <link href="touch/sencha-touch.css" rel="stylesheet" type="text/css" /> 
<script type="text/javascript"> 
     new Ext.Application({
          name: 'Dashboard',
          tabletStartupScreen: 'tablet_startup.png',
          phoneStartupScreen: 'phone_startup.png',
          icon: 'icon.png',
          glossOnIcon: false,
          useLoadMask: true,
          launch: function(){
   
  var dashboardCfg = {
        defaultCls: 'dashboardButton',
        cols: 3,
        rows: 3,
        title: 'Dashboard',
        cells: [
              { id: 'profile', label: 'Profile', icon: 'assets/icons/dashboard/profile.png' },
              { id: 'friends', label: 'Registration', icon: 'assets/icons/dashboard/friends.png' },
              { id: 'networks', label: 'Lab', icon: 'assets/icons/dashboard/networks.png' },
              { id: 'search', label: 'OPD', icon: 'assets/icons/dashboard/search.png' },
              { id: 'messages', label: 'Test', icon: 'assets/icons/dashboard/messages.png' },
              { id: 'requests', label: 'History', icon: 'assets/icons/dashboard/requests.png' },
              { id: 'map', label: 'Map', icon: 'assets/icons/dashboard/map.png' },
              { id: 'lock', label: 'Lock', icon: 'assets/icons/dashboard/lock.png' },
              { id: 'settings', label: 'Settings', icon: 'assets/icons/dashboard/settings.png' },
              { id: 'about', label: 'About', icon: 'assets/icons/dashboard/about.png' } 
        ],
        tpl: '<img src="{icon}" title="{label}" width="60" height="60" /><span><br>{label}</span>'
  };
   
  // This is a custom method for making a dashboard:
  var GridView = function(args)
  {     
        var totalItems = args.cells.length;
        var maxBtnsPerPane = args.cols * args.rows;
        var noPanes = Math.ceil(totalItems / maxBtnsPerPane);
        var panes = [];
        var cellIndex = 0;
        var showIndicator;
   
        // Create the panes:
        for(var i = 0; i < noPanes; i++)
        {
              panes[i] = new Ext.Panel({
                    title: 'Dashboard' + (i + 1),
                    layout: { type: 'vbox', align: 'stretch' },
                    pack: 'center',
                    defaults: { flex: 1 }
              });
              
              var thisCount = i + maxBtnsPerPane;
              
              // Loop through how many rows we need:
              for(var rowCount = 0; rowCount < args.rows; rowCount++)
              {
                    var thisRow = new Ext.Panel({ layout: { type: 'hbox', align: 'stretch', pack: 'center' }, id: 'row' + (rowCount + 1), defaults: { flex: 1 } });
                    
                    // Now we need to add the cells:
                    for(var colCount = 0; colCount < args.cols; colCount++)
                    {
                          var cellLabel, handlerFunc;
                          
                          (cellIndex > (totalItems - 1)) ? cellLabel = '' : cellLabel = args.cells[cellIndex].label;
                          
                          if(cellIndex < totalItems)
                          {
                               var thisCell = new Ext.Panel({
                                     title: args.cells[cellIndex].label,
                                     cls: 'dashboardButton',
                                     layout: { type: 'vbox', align: 'center', pack: 'center' },
                                     id: args.cells[cellIndex].id,
                                     items: [{ html: args.tpl.replace(/\{(\w+)\}/g, function(match, key) { return args.cells[cellIndex][key]; }) }],
                                     listeners: { tap: { element: 'el', fn: function() { rootPanel.setActiveItem(screens[this.id], { type: 'slide' } ); } } }
                               });
                          }
                          else
                               var thisCell = new Ext.Panel({ title: '' })
                          
                          thisRow.add(thisCell);
                          cellIndex++;
                    }
                    panes[i].add(thisRow);
              }
        }
        
        (noPanes == 1) ? showIndicator = false : showIndicator = true;
              
        var gridview = new Ext.Carousel({
              title: args.title,
              items: panes,
              indicator: showIndicator
        });
        
        return gridview;
  };
   
   
    var dashboard = new GridView(dashboardCfg);
   
                  Dashboard.views.startUpToolbar = new Ext.Toolbar({
                          id: 'startUpToolbar',
                          title: 'RAXA-JSS',
                    items: [
                          { xtype: 'spacer' },
                          {
                               id: 'infoButton',
                               text: 'Menu',
                               ui: 'action',
                               handler: function () {
                               Dashboard.views.viewport.setActiveItem('infoContainer', { type: 'fade', direction: 'right' });
                               }
                          }
                          ]
                  });
   
                  Dashboard.views.infoToolbar = new Ext.Toolbar({
                          id: 'infoToolbar',
                          title: 'Infos',
                          items: [
                                  {
                                          id: 'backButton',
                                          text: 'Home',
                                          ui: 'back',
                                          handler: function () {
                               Dashboard.views.viewport.setActiveItem('startUpContainer', { type: 'fade', direction: 'right' });
                               }
                                  },
                                  { xtype: 'spacer' }
                                  ]
                  });
   
              Dashboard.views.infoContainer = new Ext.Panel({
                    id: 'infoContainer',
                          layout: 'fit',
                          html: 'ProfeOfConcept',
                    dockedItems: [Dashboard.views.infoToolbar]
              });
   
              Dashboard.views.startUpContainer = new Ext.Panel({
                        id: 'startUpContainer',
                        fullscreen: true,
                        scroll: 'vertical',
                        layout: 'fit',
                        dockedItems:[
                                    Dashboard.views.startUpToolbar
                                    ],
                        items:[
                               dashboard
                              ]
                });
   
              Dashboard.views.viewport = new Ext.Panel({
                    fullscreen: 'true',          
                    layout: 'card',
                    cardAnimation: 'slide',
                    items: [
                          Dashboard.views.startUpContainer,
                          Dashboard.views.infoContainer
                          ]
              });
          }
  });
</script> 
</head> 
<body>
</body> 
</html>
