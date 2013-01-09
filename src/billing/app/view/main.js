Ext.define('RaxaEmr.billing.view.main', {
    extend: 'Ext.form.Panel',
    alias: 'widget.main',

    //height: 484,
    //width: 759,
    title: 'RAXA',

        fullscreen: true,
        id: 'halo',
         style: { 
       borderColor: '#ffffff',
       borderStyle: 'solid',
       borderWidth: '1px'
   },
        
        
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    height: 84
                },
                {
                    xtype: 'container',
                    height: 896,
                    fullscreen :true,
                    autoScroll: true,
                    layout: {
                        type: 'table'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 728,
                            width: 429
                        },
                        {
                            xtype: 'container',
                            height: 734,
                            width: 381,
                            items: [
                                {
                                    xtype: 'form',
                                    
                                    height: 189,
                                    layout: {
                                        align: 'stretch',
                                        type: 'vbox'
                                    },
                                    bodyPadding: 10,
                                    title: 'Find Patient',
                                   
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Patient Id ',
                                            id :'pid'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'First Name '
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Last Name '
                                        },
                                        {
                                            xtype: 'button',
                                            margin: 20,
                                            text: 'Find',
                                            action: 'findPatient'
                                           
                                          /* handler: function() {
                                                               
                                                                    Ext.Ajax.request({
                                                                        url: HOST + '/ws/rest/v1/raxacore/billing/abc',
                                                                         headers: Util.getBasicAuthHeaders(), 
                                                                       // dataType: 'jsonp',
                                                                       // jsonp: 'jsonp_callback',
                                                                        scriptTag: true,
                                                                        success: function(e) {
                                                                            console.log('success');
                                                                            var obj = Ext.decode(e.responseText);
                                                                            var msg = obj;
                                                                             console.log(msg);
                                                                            //var html = tpl.apply(msg);
                                                                            //resultPanel.update(html);
                                                                        }
                                                                    });
}
                                       */    
                                        }
 
 ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 185,
                            width: 214
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
