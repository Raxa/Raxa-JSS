demos.Animations = new Ext.Panel({
	cls: 'card card1',
	html: 'Sencha Touch provides pre-defined, optional, animations for moving between cards &#8212; whether in a TabPanel, NestedList or have any component using a card layout.'
})

demos.Animations.slide = new Ext.Panel({
	html: 'Slides can be used in tandem with <code>direction: "up/down/left/right"</code>.',
	cls: 'card card2'
});

demos.Animations.slidecover = new Ext.Panel({
	html: 'In addition to <code>direction</code>, slide can also accept <code>cover: true</code>',
	cls: 'card card3'
});

demos.Animations.slidereveal = new Ext.Panel({
	html: 'Then there&#8217;s <code>reveal: true</code>, which is opposite to <code>cover</code>',
	cls: 'card card4'
});

demos.Animations.pop = new Ext.Panel({
	html: 'Pop is another 2d animation that should work across iPhone OS &amp; Android.',
	cls: 'card card5'
});

demos.Animations.flip = new Ext.Panel({
	html: 'This one&#8217;s 3d and can also accept <code>direction: "up/down/left/right"</code>',
	cls: 'card card1'
});

demos.Animations.cube = new Ext.Panel({
	html: 'Crazy enough, this one does every <code>direction</code>, too.',
	cls: 'card card2'
});

demos.Animations.fade = new Ext.Panel({
	html: 'This one&#8217;s pretty straight-forward.',
	cls: 'card card3'
});
