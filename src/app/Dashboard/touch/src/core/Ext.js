/**
 * @class Ext
 */
Ext.apply(Ext, {
    /**
     * The version of the framework
     * @type String
     */
    version : '1.1.1',
    versionDetail : {
        major : 1,
        minor : 1,
        patch : 1
    },
    
    /**
     * Sets up a page for use on a mobile device.
     * @param {Object} config
     *
     * Valid configurations are:
     * <ul>
     *  <li>fullscreen - Boolean - Sets an appropriate meta tag for Apple devices to run in full-screen mode.</li>
     *  <li>tabletStartupScreen - String - Startup screen to be used on an iPad. The image must be 768x1004 and in portrait orientation.</li>
     *  <li>phoneStartupScreen - String - Startup screen to be used on an iPhone or iPod touch. The image must be 320x460 and in 
     *  portrait orientation.</li>
     *  <li>icon - Default icon to use. This will automatically apply to both tablets and phones. These should be 72x72.</li>
     *  <li>tabletIcon - String - An icon for only tablets. (This config supersedes icon.) These should be 72x72.</li>
     *  <li>phoneIcon - String - An icon for only phones. (This config supersedes icon.) These should be 57x57.</li>
     *  <li>glossOnIcon - Boolean - Add gloss on icon on iPhone, iPad and iPod Touch</li>
     *  <li>statusBarStyle - String - Sets the status bar style for fullscreen iPhone OS web apps. Valid options are default, black, 
     *  or black-translucent.</li>
     *  <li>onReady - Function - Function to be run when the DOM is ready.<li>
     *  <li>scope - Scope - Scope for the onReady configuraiton to be run in.</li>
     * </ul>
     */
    setup: function(config) {
        if (config && typeof config == 'object') {
            if (config.addMetaTags !== false) {
                this.addMetaTags(config);
            }

            if (Ext.isFunction(config.onReady)) {
                var me = this;

                Ext.onReady(function() {
                    var args = arguments;

                    if (config.fullscreen !== false) {
                        Ext.Viewport.init(function() {
                            config.onReady.apply(me, args);
                        });
                    }
                    else {
                        config.onReady.apply(this, args);
                    }
                }, config.scope);
            }
        }
    },
    
     /**
      * Return the dom node for the passed String (id), dom node, or Ext.Element.
      * Here are some examples:
      * <pre><code>
// gets dom node based on id
var elDom = Ext.getDom('elId');
// gets dom node based on the dom node
var elDom1 = Ext.getDom(elDom);

// If we don&#39;t know if we are working with an
// Ext.Element or a dom node use Ext.getDom
function(el){
 var dom = Ext.getDom(el);
 // do something with the dom node
}
       </code></pre>
     * <b>Note</b>: the dom node to be found actually needs to exist (be rendered, etc)
     * when this method is called to be successful.
     * @param {Mixed} el
     * @return HTMLElement
     */
    getDom : function(el) {
        if (!el || !document) {
            return null;
        }

        return el.dom ? el.dom : (typeof el == 'string' ? document.getElementById(el) : el);
    },
    
    /**
     * <p>Removes this element from the document, removes all DOM event listeners, and deletes the cache reference.
     * All DOM event listeners are removed from this element. If {@link Ext#enableNestedListenerRemoval} is
     * <code>true</code>, then DOM event listeners are also removed from all child nodes. The body node
     * will be ignored if passed in.</p>
     * @param {HTMLElement} node The node to remove
     */
    removeNode : function(node) {
        if (node && node.parentNode && node.tagName != 'BODY') {
            Ext.EventManager.removeAll(node);
            node.parentNode.removeChild(node);
            delete Ext.cache[node.id];
        }
    },
    
    /**
     * @private
     * Creates meta tags for a given config object. This is usually just called internally from Ext.setup - see
     * that method for full usage. Extracted into its own function so that Ext.Application and other classes can
     * call it without invoking all of the logic inside Ext.setup.
     * @param {Object} config The meta tag configuration object
     */
    addMetaTags: function(config) {
        if (!Ext.isObject(config)) {
            return;
        }
        
        var head = Ext.get(document.getElementsByTagName('head')[0]),
            tag, precomposed;

        /*
         * The viewport meta tag. This disables user scaling. This is supported
         * on most Android phones and all iOS devices and will probably be supported
         * on most future devices (like Blackberry, Palm etc).
         */
        if (!Ext.is.Desktop) {
            tag = Ext.get(document.createElement('meta'));
            tag.set({
                name: 'viewport',
                content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0;'
            });
            head.appendChild(tag);                    
        }
        
        /*
         * We want to check now for iOS specific meta tags. Unfortunately most
         * of these are not supported on devices other then iOS.
         */
        if (Ext.is.iOS) {
            /*
             * On iOS, if you save to home screen, you can decide if you want
             * to launch the app fullscreen (without address bar). You can also
             * change the styling of the status bar at the top of the screen.
             */                
            if (config.fullscreen !== false) {
                tag = Ext.get(document.createElement('meta'));
                tag.set({
                    name: 'apple-mobile-web-app-capable',
                    content: 'yes'
                });
                head.appendChild(tag);

                if (Ext.isString(config.statusBarStyle)) {
                    tag = Ext.get(document.createElement('meta'));
                    tag.set({
                        name: 'apple-mobile-web-app-status-bar-style',
                        content: config.statusBarStyle
                    });
                    head.appendChild(tag);
                }
            }
            
            /*
             * iOS allows you to specify a startup screen. This is displayed during
             * the startup of your app if you save to your homescreen. Since we could
             * be dealing with an iPad or iPhone/iPod, we have a tablet startup screen
             * and a phone startup screen.
             */
            if (config.tabletStartupScreen && Ext.is.iPad) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-startup-image',
                    href: config.tabletStartupScreen
                }); 
                head.appendChild(tag);                  
            }
            
            if (config.phoneStartupScreen && !Ext.is.iPad) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-startup-image',
                    href: config.phoneStartupScreen
                });
                head.appendChild(tag);
            }
            
            /*
             * On iOS you can specify the icon used when you save the app to your
             * homescreen. You can set an icon that will be used for both iPads
             * and iPhone/iPod, or you can specify specific icons for both.
             */
            if (config.icon) {
                config.phoneIcon = config.tabletIcon = config.icon;
            }
            
            precomposed = (config.glossOnIcon === false) ? '-precomposed' : '';
            if (Ext.is.iPad && Ext.isString(config.tabletIcon)) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-icon' + precomposed,
                    href: config.tabletIcon
                });
                head.appendChild(tag);
            } 
            else if (!Ext.is.iPad && Ext.isString(config.phoneIcon)) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-icon' + precomposed,
                    href: config.phoneIcon
                });
                head.appendChild(tag);
            }
        }
    }
});

//Initialize doc classes and feature detections
(function() {
    var initExt = function() {
        // find the body element
        var bd = Ext.getBody(),
            cls = [];
        if (!bd) {
            return false;
        }
        var Is = Ext.is; 
        if (Is.Phone) {
            cls.push('x-phone');
        }
        else if (Is.Tablet) {
            cls.push('x-tablet');
        }
        else if (Is.Desktop) {
            cls.push('x-desktop');
        }
        if (Is.iPad) {
            cls.push('x-ipad');
        }
        if (Is.iOS) {
            cls.push('x-ios');
        }
        if (Is.Android) {
            cls.push('x-android', 'x-android-' + Is.AndroidMajorVersion);
        }
        if (Is.Blackberry) {
            cls.push('x-bb');
        }
        if (Is.Standalone) {
            cls.push('x-standalone');
        }
        if (cls.length) {
            bd.addCls(cls);
        }
        return true;
    };

    if (!initExt()) {
        Ext.onReady(initExt);
    }
})();
