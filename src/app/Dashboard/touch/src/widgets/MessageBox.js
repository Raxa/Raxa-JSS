/**
 * @class Ext.MessageBox
 * @extends Ext.Sheet
 * 
 * <p>Utility class for generating different styles of message boxes. The framework provides a global singleton {@link Ext.Msg} for common usage.<p/>
 * <p>Note that the MessageBox is asynchronous.  Unlike a regular JavaScript <code>alert</code> (which will halt
 * browser execution), showing a MessageBox will not cause the code to stop.  For this reason, if you have code
 * that should only run <em>after</em> some user feedback from the MessageBox, you must use a callback function
 * (see the <code>fn</code> configuration option parameter for the {@link #show show} method for more details).</p>
 * 
 * <h2>Screenshot</h2>
 *
 * {@img Ext.MessageBox/screenshot.png Ext.MessageBox screenshot}
 * 
 * <h2>Example usage:</h2>
 * <pre><code>
// Basic alert:
Ext.Msg.alert('Title', 'The quick brown fox jumped over the lazy dog.', Ext.emptyFn);

// Prompt for user data and process the result using a callback:
Ext.Msg.prompt('Name', 'Please enter your name:', function(text) {
    // process text value and close...
});

// Confirmation alert
Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", Ext.emptyFn);
 * </code></pre>
 * @xtype messagebox
 */
Ext.MessageBox = Ext.extend(Ext.Sheet, {
    // Inherited from Ext.Sheet
    centered: true,

    // Inherited
    renderHidden: true,

    // Inherited
    ui: 'dark',

    /**
     * @cfg {String} componentCls
     * Component's Base CSS class
     */
    componentCls: 'x-msgbox',

    /**
     * @cfg {String/Mixed} enterAnimation effect when the message box is being displayed (defaults to 'pop')
     */
    enterAnimation: 'pop',

    /**
     * @cfg {String/Mixed} exitAnimation effect when the message box is being hidden (defaults to 'pop')
     */
    exitAnimation: 'pop',

    autoHeight      : true,

    /**
     * The default height in pixels of the message box's multiline textarea if displayed (defaults to 75)
     * @cfg {Number} defaultTextHeight
     */
    defaultTextHeight : 75,

    constructor : function(config) {

        config = config || {};

        var ui = config.ui || this.ui || '',
            baseCls = config.componentCls || this.componentCls;

        delete config.html;

        this.titleBar = Ext.create({
            xtype : 'toolbar',
            ui    : ui,
            dock  : 'top',
            cls   : baseCls + '-title',
            title : '&#160;'
        });

        this.buttonBar = Ext.create({
            xtype : 'toolbar',
            ui    : ui,
            dock  : 'bottom',
            layout: { pack: 'center' },
            cls   : baseCls + '-buttons'
        });

        config = Ext.apply({
                    ui  : ui,
            dockedItems : [this.titleBar, this.buttonBar],
        renderSelectors : {
                           body : '.' + baseCls + '-body',
                         iconEl : '.' + baseCls + '-icon',
                   msgContentEl : '.' + baseCls + '-content',
                          msgEl : '.' + baseCls + '-text',
                       inputsEl : '.' + baseCls + '-inputs',
                        inputEl : '.' + baseCls + '-input-single',
                    multiLineEl : '.' + baseCls + '-input-textarea'
           }
         }, config || {});

        Ext.MessageBox.superclass.constructor.call(this, config);
    },

    renderTpl: [
        '<div class="{componentCls}-body"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
            '<div class="{componentCls}-icon x-hidden-display"></div>',
            '<div class="{componentCls}-content">',
                '<div class="{componentCls}-text"></div>',
                '<div class="{componentCls}-inputs x-hidden-display">',
                    '<input type="text" class="{componentCls}-input {componentCls}-input-single" />',
                    '<textarea class="{componentCls}-input {componentCls}-input-textarea"></textarea>',
                '</div>',
            '</div>',
        '</div>'
    ],

    // @private
    onClick : function(button) {
        if (button) {
            var config = button.config || {};

            if (typeof config.fn == 'function') {
                config.fn.call(
                    config.scope || null,
                    button.itemId || button.text,
                    config.input ? config.input.dom.value : null,
                    config
                );
            }

            if (config.cls) {
                    this.el.removeCls(config.cls);
                }

            if (config.input) {
                config.input.dom.blur();
            }
        }

        this.hide();
    },

    /**
     * Displays a new message box, or reinitializes an existing message box, based on the config options
     * passed in. All display functions (e.g. prompt, alert, etc.) on MessageBox call this function internally,
     * although those calls are basic shortcuts and do not support all of the config options allowed here.
     * @param {Object} config The following config options are supported: <ul>
     * <li><b>buttons</b> : Object/Array<div class="sub-desc">A button config object or Array of the same(e.g., Ext.MessageBox.OKCANCEL or {text:'Foo',
     * itemId:'cancel'}), or false to not show any buttons (defaults to false)</div></li>
     * <li><b>cls</b> : String<div class="sub-desc">A custom CSS class to apply to the message box's container element</div></li>
     * <li><b>defaultTextHeight</b> : Number<div class="sub-desc">The default height in pixels of the message box's multiline textarea
     * if displayed (defaults to 75)</div></li>
     * <li><b>fn</b> : Function<div class="sub-desc">A callback function which is called when the dialog is dismissed
     * by clicking on the configured buttons.
     * <p>Parameters passed:<ul>
     * <li><b>buttonId</b> : String<div class="sub-desc">The itemId of the button pressed, one of:<div class="sub-desc"><ul>
     * <li><tt>ok</tt></li>
     * <li><tt>yes</tt></li>
     * <li><tt>no</tt></li>
     * <li><tt>cancel</tt></li>
     * </ul></div></div></li>
     * <li><b>value</b> : String<div class="sub-desc">Value of the input field if either <tt><a href="#show-option-prompt" ext:member="show-option-prompt" ext:cls="Ext.MessageBox">prompt</a></tt>
     * or <tt><a href="#show-option-multiLine" ext:member="show-option-multiLine" ext:cls="Ext.MessageBox">multiLine</a></tt> is true</div></li>
     * <li><b>opt</b> : Object<div class="sub-desc">The config object passed to show.</div></li>
     * </ul></p></div></li>
     * <li><b>width</b> : Number<div class="sub-desc">A fixed width for the MessageBox (defaults to 'auto')</div></li>
     * <li><b>height</b> : Number<div class="sub-desc">A fixed height for the MessageBox (defaults to 'auto')</div></li>
     * <li><b>scope</b> : Object<div class="sub-desc">The scope of the callback function</div></li>
     * <li><b>icon</b> : String<div class="sub-desc">A CSS class that provides a background image to be used as the body icon for the
     * dialog (e.g. Ext.MessageBox.WARNING or 'custom-class') (defaults to '')</div></li>
     * <li><b>modal</b> : Boolean<div class="sub-desc">False to allow user interaction with the page while the message box is
     * displayed (defaults to true)</div></li>
     * <li><b>msg</b> : String<div class="sub-desc">A string that will replace the existing message box body text (defaults to the
     * XHTML-compliant non-breaking space character '&amp;#160;')</div></li>
     * <li><a id="show-option-multiline"></a><b>multiLine</b> : Boolean<div class="sub-desc">
     * True to prompt the user to enter multi-line text (defaults to false)</div></li>
     * <li><a id="show-option-prompt"></a><b>prompt</b> : Boolean<div class="sub-desc">True to prompt the user to enter single-line text (defaults to false)</div></li>
     * <li><b>title</b> : String<div class="sub-desc">The title text</div></li>
     * <li><b>value</b> : String<div class="sub-desc">The string value to set into the active textbox element if displayed</div></li>
     * </ul>
     * Example usage:
     * <pre><code>
Ext.Msg.show({
   title: 'Address',
   msg: 'Please enter your address:',
   width: 300,
   buttons: Ext.MessageBox.OKCANCEL,
   multiLine: true,
   prompt : { maxlength : 180, autocapitalize : true },
   fn: saveAddress,
   icon: Ext.MessageBox.INFO
});
</code></pre>
     * @return {Ext.MessageBox} this
     */
    show : function(config) {
        var attrib,
            attrName,
            attribs = {
                autocomplete : 'off',
                autocapitalize : 'off',
                autocorrect : 'off',
                maxlength : 0,
                autofocus : true,
                placeholder : '',
                type : 'text'
            },
            assert = /true|on/i;

        this.rendered || this.render(document.body);

        config = Ext.applyIf(
            config || {}, {
                multiLine : false,
                prompt  : false,
                value   : '',
                modal   : true
            }
        );

        if (config.title) {
            this.titleBar.setTitle(config.title);
            this.titleBar.show();
        } else {
            this.titleBar.hide();
        }

        if (this.inputsEl && (config.multiLine || config.prompt)) {
            this.inputsEl.show();

            if (this.multiLineEl && config.multiLine) {
                this.inputEl && this.inputEl.hide();
                this.multiLineEl.show().setHeight(Ext.isNumber(config.multiLine) ? parseFloat(config.multiLine) : this.defaultTextHeight);
                config.input = this.multiLineEl;
            } else if (this.inputEl) {
                this.inputEl.show();
                this.multiLineEl && this.multiLineEl.hide();
                config.input = this.inputEl;
            }

            // Assert/default HTML5 input attributes
            if (Ext.isObject(config.prompt)) {
                Ext.apply(attribs, config.prompt);
            }

            for (attrName in attribs) {
                if (attribs.hasOwnProperty(attrName)) {
                    attrib = attribs[attrName];
                    config.input.dom.setAttribute(
                        attrName.toLowerCase(),
                        /^auto/i.test(attrName) ? (assert.test(attrib+'') ? 'on' : 'off' ) : attrib
                    );
                }
            }

        } else {
            this.inputsEl && this.inputsEl.hide();
        }

        this.setIcon(config.icon || '', false);
        this.updateText(config.msg, false);

        if (config.cls) {
            this.el.addCls(config.cls);
        }

        this.modal = !!config.modal;

        var bbar = this.buttonBar,
            bs = [];

        bbar.removeAll();

        Ext.each([].concat(config.buttons || Ext.MessageBox.OK), function(button) {
            if (button) {
                bs.push(
                    Ext.applyIf({
                        config  : config,
                        scope   : this,
                        handler : this.onClick
                    }, button)
                );
            }
        }, this);

        bbar.add(bs);

        if (bbar.rendered) {
            bbar.doLayout();
        }

        Ext.MessageBox.superclass.show.call(this, config.animate);

        if (config.input) {
            config.input.dom.value = config.value || '';
            // For browsers without 'autofocus' attribute support
            if (assert.test(attribs.autofocus+'') && !('autofocus' in config.input.dom)) {
                config.input.dom.focus();
            }
        }

        return this;
    },

     // @private
    onOrientationChange : function() {
        this.doComponentLayout();

        Ext.MessageBox.superclass.onOrientationChange.apply(this, arguments);
    },

    // @private
    adjustScale : function(){
        Ext.apply(this,{
            maxWidth : window.innerWidth,
            maxHeight : window.innerHeight,
            minWidth : window.innerWidth * .5,
            minHeight : window.innerHeight * .5
        });
    },

    // @private
    doComponentLayout : function() {
        this.adjustScale();

        return Ext.MessageBox.superclass.doComponentLayout.apply(this, arguments);
    },

    /**
     * Displays a standard read-only message box with an OK button (comparable to the basic JavaScript alert prompt).
     * If a callback function is passed it will be called after the user clicks the button, and the
     * itemId of the button that was clicked will be passed as the only parameter to the callback
     * @param {String} title The title bar text
     * @param {String} msg The message box body text
     * @param {Function} fn (optional) The callback function invoked after the message box is closed
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the callback is executed. Defaults to the browser wnidow.
     * @return {Ext.MessageBox} this
     */
    alert : function(title, msg, fn, scope) {
        return this.show({
            title : title,
            msg   : msg,
            buttons: Ext.MessageBox.OK,
            fn    : fn,
            scope : scope,
            icon  : Ext.MessageBox.INFO
        });
    },

    /**
     * Displays a confirmation message box with Yes and No buttons (comparable to JavaScript's confirm).
     * If a callback function is passed it will be called after the user clicks either button,
     * and the id of the button that was clicked will be passed as the only parameter to the callback
     * (could also be the top-right close button).
     * @param {String} title The title bar text
     * @param {String} msg The message box body text
     * @param {Function} fn (optional) The callback function invoked when user taps on the OK/Cancel button.
     * The button is passed as the first argument.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the callback is executed. Defaults to the browser wnidow.
     * @return {Ext.MessageBox} this
     */
    confirm : function(title, msg, fn, scope) {
        return this.show({
            title : title,
            msg : msg,
            buttons: Ext.MessageBox.YESNO,
            fn: function(button) {
                fn.call(scope, button);
            },
            scope : scope,
            icon: Ext.MessageBox.QUESTION
        });
     },

    /**
     * Displays a message box with OK and Cancel buttons prompting the user to enter some text (comparable to JavaScript's prompt).
     * The prompt can be a single-line or multi-line textbox.  If a callback function is passed it will be called after the user
     * clicks either button, and the id of the button that was clicked (could also be the top-right
     * close button) and the text that was entered will be passed as the two parameters to the callback.
     * @param {String} title The title bar text
     * @param {String} msg The message box body text
     * @param {Function} fn (optional) The callback function invoked when the user taps on the OK/Cancel button,
     * the button is passed as the first argument, the entered string value is passed as the second argument
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the callback is executed. Defaults to the browser wnidow.
     * @param {Boolean/Number} multiLine (optional) True to create a multiline textbox using the defaultTextHeight
     * property, or the height in pixels to create the textbox (defaults to false / single-line)
     * @param {String} value (optional) Default value of the text input element (defaults to '')
     * @param {Object} promptConfig (optional) <div class="sub-desc">(optional) A hash collection of input attribute values.<div class="sub-desc">Specified values may include:<ul>
     * <li><tt>focus</tt> : Boolean <div class="sub-desc"><tt>true</tt> to assert initial input focus (defaults to false)</div></li>
     * <li><tt>placeholder</tt> : String <div class="sub-desc">String value rendered when the input field is empty (defaults to empty string)</div></li>
     * <li><tt>autocapitalize</tt> : String/Boolean <div class="sub-desc"><tt>true/on</tt> to capitalize the first letter of each word in the input value (defaults to 'off')</div></li>
     * <li><tt>autocorrect</tt> : String/Boolean <div class="sub-desc"><tt>true/on</tt> to enable spell-checking/autocorrect features if supported by the browser (defaults to 'off')</div></li>
     * <li><tt>autocomplete</tt> : String/Boolean <div class="sub-desc"><tt>true/on</tt> to enable autoCompletion of supplied text input values if supported by the browser (defaults to 'off')</div></li>
     * <li><tt>maxlength</tt> : Number <div class="sub-desc">Maximum number of characters allowed in the input if supported by the browser (defaults to 0)</div></li>
     * <li><tt>type</tt> : String <div class="sub-desc">The type of input field. Possible values (if supported by the browser) may include (text, search, number, range, color, tel, url, email, date, month, week, time, datetime) (defaults to 'text')</div></li>
     * </ul></div></div>
     * Example usage:
     * <pre><code>
    Ext.Msg.prompt(
        'Welcome!',
        'What\'s your name going to be today?',
        function(value){
            console.log(value)
        },
        null,
        false,
        null,
        { autocapitalize : true, placeholder : 'First-name please...' }
    );
     * </code></pre>
     * @return {Ext.MessageBox} this
     */
    prompt : function(title, msg, fn, scope, multiLine, value, promptConfig) {
        return this.show({
            title : title,
            msg : msg,
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function(button, inputValue) {
                fn.call(scope, button, inputValue);
            },
            scope : scope,
            icon  : Ext.MessageBox.QUESTION,
            prompt: promptConfig || true,
            multiLine: multiLine,
            value: value
        });
    },

    /**
     * Updates the message box body text
     * @param {String} text (optional) Replaces the message box element's innerHTML with the specified string (defaults to
     * the XHTML-compliant non-breaking space character '&amp;#160;')
     * @return {Ext.MessageBox} this
     */
    updateText : function(text, doLayout) {
        if(this.msgEl) {
            this.msgEl.update(text ? String(text) : '&#160;');
            if(doLayout !== false) {
                this.doComponentLayout();
            }
        }
        return this;
    },

    /**
     * Adds the specified icon to the dialog.  By default, the class 'x-msgbox-icon' is applied for default
     * styling, and the class passed in is expected to supply the background image url. Pass in empty string ('')
     * to clear any existing icon. This method must be called before the MessageBox is shown.
     * The following built-in icon classes are supported, but you can also pass in a custom class name:
     * <pre>
Ext.MessageBox.INFO
Ext.MessageBox.WARNING
Ext.MessageBox.QUESTION
Ext.MessageBox.ERROR
     *</pre>
     * @param {String} icon A CSS classname specifying the icon's background image url, or empty string to clear the icon
     * @return {Ext.MessageBox} this
     */
    setIcon : function(icon, doLayout) {
        if (icon) {
            this.iconEl.show();
            this.iconEl.replaceCls(this.iconCls, icon);
        } else {
            this.iconEl.replaceCls(this.iconCls, 'x-hidden-display');
        }

        if (doLayout !== false) {
            this.doComponentLayout();
        }

        this.iconCls = icon;
        return this;
    }
});

(function(){
    var B = Ext.MessageBox;

    Ext.apply(B, {
        OK     : {text : 'OK',     itemId : 'ok',  ui : 'action' },
        CANCEL : {text : 'Cancel', itemId : 'cancel'},
        YES    : {text : 'Yes',    itemId : 'yes', ui : 'action' },
        NO     : {text : 'No',     itemId : 'no'},
        // Add additional(localized) button configs here

        // ICON CSS Constants
        INFO     : 'x-msgbox-info',
        WARNING  : 'x-msgbox-warning',
        QUESTION : 'x-msgbox-question',
        ERROR    : 'x-msgbox-error'
    });

    Ext.apply(B, {
        OKCANCEL    : [B.CANCEL, B.OK],
        YESNOCANCEL : [B.CANCEL, B.NO, B.YES],
        YESNO       : [B.NO, B.YES]
        // Add additional button collections here
    });

})();

Ext.reg('messagebox', Ext.MessageBox);

//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('msgbox', Ext.MessageBox);

/**
 * @class Ext.Msg
 * 
 * <p>A global shared singleton instance of the {@link Ext.MessageBox} class. See {@link Ext.MessageBox} for documentation.</p>
 * 
 * @singleton
 */
Ext.Msg = new Ext.MessageBox();