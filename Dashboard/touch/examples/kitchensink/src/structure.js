sink.Structure = [
    {
        text: 'User Interface',
        cls: 'launchscreen',
        items: [
            {
                text: 'Buttons',
                card: demos.Buttons,
                source: 'src/demos/buttons.js',
                leaf: true
            },
            {
                text: 'Forms',
                card: demos.Forms,
                source: 'src/demos/forms.js',
                leaf: true
            },
            {
                text: 'List',
                card: demos.List,
                source: 'src/demos/list.js',
                leaf: true
            },
            {
                text: 'Nested List',
                card: demos.NestedList,
                source: 'src/demos/nestedlist.js',
                leaf: true
            },
            {
                text: 'Icons',
                card: demos.Icons,
                source: 'src/demos/icons.js',
                leaf: true
            },
            {
                text: 'Toolbars',
                card: demos.Toolbars,
                source: 'src/demos/toolbars.js',
                leaf: true
            },
            {
                text: 'Carousel',
                card: demos.Carousel,
                source: 'src/demos/carousel.js',
                leaf: true
            },
            {
                text: 'Tabs',
                card: demos.Tabs,
                source: 'src/demos/tabs.js',
                leaf: true
            },
            {
                text: 'Bottom Tabs',
                card: demos.BottomTabs,
                source: 'src/demos/bottomtabs.js',
                leaf: true
            },
            /*{
             text: 'Picker',
             card: demos.Picker,
             source: 'src/demos/picker.js',
             leaf: true
             },*/
            {
                text: 'Map',
                card: demos.Map,
                source: 'src/demos/map.js',
                leaf: true
            },
            {
                text: 'Overlays',
                card: demos.SheetsOverlays,
                source: 'src/demos/sheets_overlays.js',
                leaf: true
            }
        ]
    },
    {
        text: 'Animations',
        source: 'src/demos/animations.js',
        card: Ext.is.Phone ? false : demos.Animations,
        items: [
            {
                text: 'Slide',
                card: demos.Animations.slide,
                preventHide: true,
                cardSwitchAnimation: 'slide',
                leaf: true
            },
            {
                text: 'Slide (cover)',
                card: demos.Animations.slidecover,
                preventHide: true,
                cardSwitchAnimation: {
                    type: 'slide',
                    cover: true
                },
                leaf: true
            },
            {
                text: 'Slide (reveal)',
                card: demos.Animations.slidereveal,
                preventHide: true,
                cardSwitchAnimation: {
                    type: 'slide',
                    reveal: true
                },
                leaf: true
            },
            {
                text: 'Pop',
                card: demos.Animations.pop,
                preventHide: true,
                cardSwitchAnimation: {
                    type: 'pop',
                    scaleOnExit: true
                },
                leaf: true
            },
            {
                text: 'Fade',
                card: demos.Animations.fade,
                preventHide: true,
                cardSwitchAnimation: {
                    type: 'fade',
                    duration: 600
                },
                leaf: true
            },
            {
                text: 'Flip',
                card: demos.Animations.flip,
                preventHide: true,
                cardSwitchAnimation: {
                    type: 'flip',
                    duration: 400
                },
                leaf: true
            },
            {
                text: 'Cube',
                card: demos.Animations.cube,
                preventHide: true,
                cardSwitchAnimation: {
                    type: 'cube',
                    duration: 400
                },
                leaf: true
            }
        ]
    },
    {
        text: 'Touch Events',
        card: demos.Touch,
        source: 'src/demos/touch.js',
        leaf: true
    },
    {
        text: 'Data',
        items: [
            {
                text: 'Nested Loading',
                card: demos.Data.nestedLoading,
                source: 'src/demos/data/nestedLoading.js',
                leaf: true
            },
            {
                text: 'JSON P',
                card: demos.Data.jsonp,
                source: 'src/demos/data/jsonp.js',
                leaf: true
            },
            {
                text: 'YQL',
                card: demos.Data.yql,
                source: 'src/demos/data/yql.js',
                leaf: true
            },
            {
                text: 'AJAX',
                card: demos.Data.ajax,
                source: 'src/demos/data/ajax.js',
                leaf: true
            }
        ]
    },
    {
        text: 'Media',
        items: [
            {
                text: 'Video',
                card: demos.Video,
                source: 'src/demos/video.js',
                leaf: true
            },
            {
                text: 'Audio',
                card: demos.Audio,
                source: 'src/demos/audio.js',
                leaf: true
            }
        ]
    },
    {
        text: 'Themes',
        card: demos.Themes,
        source: 'src/demos/themes.js',
        leaf: true
    }
];

if (Ext.is.iOS || Ext.is.Desktop) {
    sink.Structure.push({
        text: 'Simulator',
        leaf: true,
        card: demos.Simulator,
        source: 'src/demos/simulator.js'
    });
}

Ext.regModel('Demo', {
    fields: [
        {name: 'text',        type: 'string'},
        {name: 'source',      type: 'string'},
        {name: 'preventHide', type: 'boolean'},
        {name: 'cardSwitchAnimation'},
        {name: 'card'}
    ]
});

sink.StructureStore = new Ext.data.TreeStore({
    model: 'Demo',
    root: {
        items: sink.Structure
    },
    proxy: {
        type: 'ajax',
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});
