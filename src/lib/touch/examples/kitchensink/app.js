Ext.Loader.setPath({
    'Ext.data': '../../src/data',
    'Kitchensink': 'app'
});

//NOTE: This will not be necessary after beta 1 and is only present temporarily to enable built
// (non-dynamic loading) versions of the kitchen sink to work on tablet and phone devices
Ext.require([
    'Kitchensink.view.phone.Main',
    'Kitchensink.view.phone.TouchEvents',
    'Kitchensink.view.tablet.Main',
    'Kitchensink.view.tablet.TouchEvents',
    'Kitchensink.controller.phone.Main',
    'Kitchensink.controller.tablet.Main'
]);

Ext.application({
    name: 'Kitchensink',
    
    icon: 'resources/img/icon.png',
    tabletStartupScreen: 'resources/img/tablet_startup.png',
    phoneStartupScreen: 'resources/img/phone_startup.png',

    views: [
        'NestedList',
        'List',
        'SourceOverlay',
        'Buttons',
        'Forms',
        'Icons',
        'BottomTabs',
        'Themes',
        'Map',
        'Overlays',
        'Tabs',
        'Toolbars',
        'Slide',
        'Pop',
        'Fade',
        'Flip',
        'JSONP',
        'YQL',
        'Ajax',
        'Video',
        'Audio',
        'NestedLoading',
        'Carousel',
        'TouchEvents'
    ],

    stores: ['Demos'],
    profiles: ['Tablet', 'Phone']
});