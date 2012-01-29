Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    requires: [
        'Ext.carousel.Carousel',
        'Ext.Img'
    ],
    onReady: function() {
        var categories = ['Food', 'Animals', 'Cars', 'Architecture'],
            itemsCountPerCategory = 10,
            horizontalCarousels = [],
            verticalCarousel,
            items, i, j, ln, category;

        for (i = 0,ln = categories.length; i < ln; i++) {
            items = [];
            category = categories[i];

            for (j = 1; j <= itemsCountPerCategory; j++) {
                items.push({
                    xtype: 'image',
                    cls: 'my-carousel-item-img',
                    src: 'images/' + category + '/' + j + '.jpg'
                });
            }

            horizontalCarousels.push({
                xtype: 'carousel',
                direction: 'horizontal',
                directionLock: true,
                items: items,
                itemConfig: {
                    cls: 'my-carousel-item'
                }
            });
        }

        verticalCarousel = Ext.Viewport.add({
            xtype: 'carousel',
            direction: 'vertical',
            items: horizontalCarousels
        });

//        function updateImageState(domNode) {
//            var rotation = domNode.currentRotation || 0,
//                scale = domNode.currentScale || 1,
//                translation = domNode.currentTranslation || { x: 0, y: 0 },
//                transformStyle;
//
//            if (Ext.os.is.iOS) {
//                transformStyle = 'translate3d('+translation.x+'px, '+translation.y+'px, 0) ' +
//                                 'rotate('+rotation+'deg) scale('+scale+')';
//            }
//            else {
//                transformStyle = 'translate('+translation.x+'px, '+translation.y+'px) scale('+scale+')';
//            }
//
//            domNode.style.webkitTransform = transformStyle;
//
//            Ext.get(domNode).addCls('detached');
//        }
//
//        verticalCarousel.element.on({
//            delegate: '.my-carousel-item-img',
//
//            rotate: function(e, domNode) {
//                var rotation = e.rotation;
//
//                rotation += domNode.lastRotation || 0;
//                domNode.currentRotation = rotation;
//                domNode.currentTranslation = null;
//
//                updateImageState(domNode);
//            },
//
//            rotateend: function(e, domNode) {
//                domNode.lastRotation = domNode.currentRotation;
//            },
//
//            pinch: function(e, domNode) {
//                var scale = e.scale;
//
//                scale *= domNode.lastScale || 1;
//                domNode.currentScale = scale;
//                domNode.currentTranslation = null;
//
//                updateImageState(domNode);
//            },
//
//            pinchend: function(e, domNode) {
//                var scale = Math.max(Math.min(domNode.currentScale, 3), 0.5);
//                domNode.lastScale = domNode.currentScale = scale;
//                updateImageState(domNode);
//            },
//
//            doubletap: function(e, domNode) {
//                var point = e.touch.point,
//                    scale = domNode.currentScale || 1,
//                    size = Ext.Viewport.getSize(),
//                    width = size.width,
//                    height = size.height;
//
//                if (scale === 1) {
//                    domNode.currentTranslation = {
//                        x: Math.min(Math.max(-width/2, -(point.x - width/2) * 2), width/2),
//                        y: Math.min(Math.max(-height/2, -(point.y - height/2) * 2), height/2)
//                    };
//                    scale = 2;
//                }
//                else {
//                    domNode.currentTranslation = null;
//                    scale = 1;
//                }
//
//                domNode.currentScale = domNode.lastScale = scale;
//                updateImageState(domNode);
//            }
//        });
    }
});
