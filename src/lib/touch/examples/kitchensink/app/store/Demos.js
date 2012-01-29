(function() {
    var animations = {
        text  : 'Animations',
        card  : false,
        id: 'animations',
        items: [{
            text: 'Slide',
            id: 'Slide',
            card: false,
            preventHide: true,
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 300
            },
            leaf: true
        }]
    //                    {
    //                        text: 'SlideCover',
    //                        card: false,
    //                        preventHide: true,
    //                        cardSwitchAnimation: {
    //                            type: 'slide',
    //                            cover: true
    //                        },
    //                        leaf: true
    //                    },
    //                    {
    //                        text: 'SlideReveal',
    //                        card: false,
    //                        preventHide: true,
    //                        cardSwitchAnimation: {
    //                            type: 'slide',
    //                            reveal: true
    //                        },
    //                        leaf: true
    //                    },
    //                    {
    //                        text: 'Cube',
    //                        card: false,
    //                        preventHide: true,
    //                        animation: {
    //                            type: 'cube',
    //                            easing: 'ease-out'
    //                        },
    //                        leaf: true
    //                    }
    };

    if (Ext.os.deviceType == 'Desktop' || Ext.os.name == 'iOS') {
        animations.items.push({
            text: 'Pop',
            id: 'Pop',
            card: false,
            preventHide: true,
            animation: {
                type: 'pop',
                duration: 300,
                scaleOnExit: true
            },
            leaf: true
        }, {
            text: 'Fade',
            id: 'Fade',
            card: false,
            preventHide: true,
            animation: {
                type: 'fade',
                duration: 300
            },
            leaf: true
        });
    }

    var root = {
        id: 'root',
        text: 'Kitchen Sink',
        items: [{
            text : 'User Interface',
            id: 'ui',
            cls  : 'launchscreen',
            items: [{
                text  : 'Buttons',
                leaf  : true,
                id: 'buttons'
            }, {
                text  : 'Forms',
                leaf  : true,
                id: 'forms'
            }, {
                text  : 'List',
                leaf  : true,
                id: 'list'
            }, {
                text  : 'Nested List',
                view  : 'NestedList',
                leaf  : true,
                id: 'nestedlist'
            }, {
                text  : 'Icons',
                leaf  : true,
                id: 'icons'
            }, {
                text  : 'Toolbars',
                leaf  : true,
                id: 'toolbars'
            }, {
                text  : 'Carousel',
                leaf  : true,
                id: 'carousel'
            }, {
                text  : 'Tabs',
                leaf  : true,
                id: 'tabs'
            }, {
                text  : 'Bottom Tabs',
                view  : 'BottomTabs',
                leaf  : true,
                id: 'bottom-tabs'
            }, {
                text  : 'Map',
                view  : 'Map',
                leaf  : true,
                id: 'map'
            }, {
                text  : 'Overlays',
                leaf  : true,
                id: 'overlays'
            }
            ]
        }]
    };

    //Ext.Array.each(animations, function(anim) {
    //    root.items.push(anim);
    //});

    root.items.push(animations, {
            text  : 'Touch Events',
            id    : 'touchevents',
            view  : 'TouchEvents',
            leaf  : true
        }, {
            text: 'Data',
            id: 'data',
            items: [{
                text  : 'Nested Loading',
                view  : 'NestedLoading',
                leaf  : true,
                id: 'nestedloading'
            }, {
                text  : 'JSONP',
                leaf  : true,
                id: 'jsonp'
            }, {
                text  : 'YQL',
                leaf  : true,
                id: 'yql'
            }, {
                text  : 'Ajax',
                leaf  : true,
                id: 'ajax'
            }]
        }, {
            text: 'Media',
            id: 'media',
            items: [{
                text  : 'Video',
                leaf  : true,
                id: 'video'
            }, {
                text  : 'Audio',
                leaf  : true,
                id: 'audio'
            }]
        }, {
            text: 'Themes',
            id: 'themes',
            leaf  : true
        });

    Ext.define('Kitchensink.store.Demos', {
        alias: 'store.Demos',
        extend  : 'Ext.data.TreeStore',
        requires: ['Kitchensink.model.Demo'],

        config: {
            model   : 'Kitchensink.model.Demo',
            root: root,
            defaultRootProperty: 'items'
        }
    });
})();
