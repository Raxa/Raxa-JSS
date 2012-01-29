Ext.define('Email.view.List', {
    extend: 'Ext.List',
    
    defaults: {
        disclosable: false
    },
    
    //this is the default. Setting to true would wrap each item with a div
    wrapItems: false,
    
    //equivalent:
    wrapItems: {
        cls: 'x-list-item'
    },
    
    itemTpl: [
        '<div class="message">',
            '<h2>{from}</h2>',
            '<h3>{subject}</h3>',
            '<p>{introText}</p>',
            '<span class="time">{receivedAt}</span>',
        '</div>'
    ]
});