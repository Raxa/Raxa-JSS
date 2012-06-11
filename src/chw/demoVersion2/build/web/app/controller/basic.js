Ext.define('demoVersion2.controller.basic', {
    
    extend: 'Ext.app.Controller',
    // requires: 'myApp.model.Deck',
    // model: 'myApp.model.Deck',
    
    config: {
        refs: {
            loginOkay : '#loginOkay',
            loginCancel : '#loginCancel',
            connectionOkay : '#connectionOkay',
            connectionCancel : '#connectionCancel',
            selectStudy : '#selectStudy',
            selectForms : '#selectForms',
            downloadButton : '#downloadButton',
            uploadButton : '#uploadButton',
            settingsButton : '#settingsButton',
            logoutButton : '#logoutButton',
            registerOkay : '#registerOkay',
            registerCancel : '#registerCancel',
            enrollOkay : '#enrollOkay',
            enrollCancel : '#enrollCancel',
            encounterOkay : '#encounterOkay',
            encounterCancel : '#encounterCancel',
            settingsConnection : '#settingsConnection',
            settingsCancel : '#settingsCancel',
            studyOkay : '#studyOkay',
            studyCancel : '#studyCancel'
        },
        control: {
            loginOkay : {tap : function () {this.doLogin(true);}},
            loginCancel : {tap : function () {this.doLogin(false);}},
            connectionOkay : {tap : function () {this.doConnect(true);}},
            connectionCancel : {tap : function () {this.doConnect(false);}},
            selectStudy : {tap : function () {this.doStudy('start')}},
            selectForms : {tap : function () {this.doForms('start',true)}},
            downloadButton : {tap : function () {this.doDownload('start')}},
            uploadButton : {tap : function () {this.doUpload('start')}},
            settingsButton : {tap : function () {this.doSettings('start')}},
            logoutButton : {tap : function () {this.doLogout('start')}},
            /*selectStudy : {tap : 'doStudy'},
            selectForms : {tap : 'doForms'},
            downloadButton : {tap : 'doDownload'},
            uploadButton : {tap : 'doUpload'},
            settingsButton : {tap : 'doSettings'},
            logoutButton : {tap : 'doLogout'}*/
            registerOkay : {tap : function () {this.doForms('register',true)}},
            registerCancel : {tap : function () {this.doForms('register',false)}},
            enrollOkay : {tap : function () {this.doForms('enroll',true)}},
            enrollCancel : {tap : function () {this.doForms('enroll',false)}},
            encounterOkay : {tap : function () {this.doForms('encounter',true)}},
            encounterCancel : {tap : function () {this.doForms('encounter',false)}},
            settingsConnection : {tap : function () {this.doSettings('connection')}},
            settingsCancel : {tap : function () {this.doSettings('cancel')}},
            studyOkay : {tap : function () {this.doStudy('okay')}},
            studyCancel : {tap : function () {this.doStudy('cancel')}}
        }     
    },
    
    launch: function () {
        Ext.create('Ext.Container', {
            id: 'viewPort',
            fullscreen: true,
            layout: 'card',
            items: [
                // { xclass : 'demoVersion2.view.optionsPanel'},
                { xclass: 'demoVersion2.view.loginScreen' },
                { xclass : 'demoVersion2.view.connectionSettings'},
                { xclass : 'demoVersion2.view.optionsScreen' },
                { xclass : 'demoVersion2.view.patientOptions'},
                { xclass : 'demoVersion2.view.settingsScreen'},
                { xclass : 'demoVersion2.view.studyScreen'}
            ]
        });
    },
    
    /* BUTTON LOGIC */
    
    // when clicking the login button
    doLogin : function (arg) {
        
        if (arg)
        {
            // check login credentials

            // store session id

            // continue to next page
            Ext.getCmp('viewPort').setActiveItem(1);
        }
        else
        {
            // exit the program
            Ext.getCmp('viewPort').setActiveItem(0)
        }
        
        
    },
    
    // when completing the connection settings
    doConnect : function (arg) {
        
        if (arg)
        {
            // check connections

            //continue to the next page 
            Ext.getCmp('viewPort').setActiveItem(2);
        }
        else
        {
            // exit the program
            // BUG : if you navigate here through settings, you don't want to just exit the program
            // You want to just return to the previous page
            Ext.getCmp('viewPort').setActiveItem(0)
        }
        
    },
    
    // when selecting a study
    doStudy : function (arg) {
        
        if (arg == 'start') {
            Ext.getCmp('viewPort').setActiveItem(5)
        }
        
        else if (arg == 'okay') {
            Ext.Msg.confirm('Confirm', 'Are you sure you want to change to $study?', function () {
                Ext.getCmp('viewPort').setActiveItem(2);
                // store study value in memory
            });
            
        }
        
        else if (arg == 'cancel') {
            Ext.getCmp('viewPort').setActiveItem(2)
        }
        
    },
    
    // when selecting a form
    doForms : function (step,value) {

        
        if (value)
        {
            if (step == 'start')
            {
                // continue to the next page
                Ext.getCmp('viewPort').setActiveItem(3); 
            }
            else 
            {
               
               Ext.Msg.confirm('Confirm','Are you sure you want to proceed?', function () {
                   
                   if (step == 'register') {
                       // register patient
                   }
                   else if (step == 'enroll') {
                       // enroll patient
                   }
                   else if (step == 'encounter') {
                       // register encounter
                   }
                   
                   Ext.getCmp('viewPort').setActiveItem(2)
                   
               })
               
            }
        }
        else
        {
            Ext.getCmp('viewPort').setActiveItem(2);
        }
        
    },
    
    // when downloading information
    doDownload : function (arg) {
        
        // shows actionsheet
        // BUG: doesn't let you click download button later if already clicked
        // Is there a way to reset which buttons have been clicked?
        
        if (!this.actions) {
            this.actions = Ext.Viewport.add({
                xtype : 'actionsheet',
                items : [
                    {
                        text : 'Download studies',
                        scope : this,
                        handler : function () {
                            Ext.Msg.confirm('Confirm','Are you sure you want to download all studies?');
                            this.actions.hide();
                        }
                    },
                    {
                        text : 'Download forms',
                        scope : this,
                        handler : function () {
                            Ext.Msg.confirm('Confirm','Are you sure you want to download the forms in $study?');
                            this.actions.hide();
                        }
                    },
                    {
                        text : 'Cancel',
                        scope : this,
                        ui : 'decline',
                        handler : function () {
                            this.actions.hide();
                        }
                    }
                ]
            })
        }
    },
    
    // when uploading information
    doUpload : function (arg) {
        
        Ext.Msg.confirm('Confirm', 'Are you sure you want to upload your data?', function () {
            // upload the data
            Ext.getCmp('viewPort').setActiveItem(2);
        })
        // need function to allow uploading of data
    },
    
    // when dealing with settings
    doSettings : function (args) {
        
        if (args == 'start') {
            Ext.getCmp('viewPort').setActiveItem(4);
        }
        else if (args == 'connection') {
            Ext.getCmp('viewPort').setActiveItem(1);
        }
        else if (args == 'cancel') {
            Ext.getCmp('viewPort').setActiveItem(2)
        }
        
        
    },
    
    // when logging out
    doLogout : function (arg) {
        
        Ext.Msg.confirm('Confirm', 'Are you sure you want to logout?', function () {
            
            // make sure everything is uploaded
            // delete information stored
            // close application
            Ext.getCmp('viewPort').setActiveItem(0)
        })
        
        
    }
});