/**
 * @author Ed Spencer
 * @class Ext.data.RestProxy
 * @extends Ext.data.AjaxProxy
 * 
 * <p>RestProxy is a specialization of the {@link Ext.data.AjaxProxy AjaxProxy} which simply maps the four actions 
 * (create, read, update and destroy) to RESTful HTTP verbs. For example, let's set up a {@link Ext.data.Model Model}
 * with an inline RestProxy</p>
 * 
<pre><code>
Ext.regModel('User', {
    fields: ['id', 'name', 'email'],

    proxy: {
        type: 'rest',
        url : '/users'
    }
});
</code></pre>
 * 
 * <p>Now we can create a new User instance and save it via the RestProxy. Doing this will cause the Proxy to send a
 * POST request to '/users':
 * 
<pre><code>
var user = Ext.ModelMgr.create({name: 'Ed Spencer', email: 'ed@sencha.com'}, 'User');

user.save(); //POST /users
</code></pre>
 * 
 * <p>Let's expand this a little and provide a callback for the {@link Ext.data.Model#save} call to update the Model
 * once it has been created. We'll assume the creation went successfully and that the server gave this user an ID of 
 * 123:</p>
 * 
<pre><code>
user.save({
    success: function(user) {
        user.set('name', 'Khan Noonien Singh');

        user.save(); //PUT /users/123
    }
});
</code></pre>
 * 
 * <p>Now that we're no longer creating a new Model instance, the request method is changed to an HTTP PUT, targeting
 * the relevant url for that user. Now let's delete this user, which will use the DELETE method:</p>
 * 
<pre><code>
    user.destroy(); //DELETE /users/123
</code></pre>
 * 
 * <p>Finally, when we perform a load of a Model or Store, RestProxy will use the GET method:</p>
 * 
<pre><code>
//1. Load via Store

//the Store automatically picks up the Proxy from the User model
var store = new Ext.data.Store({
    model: 'User'
});

store.load(); //GET /users

//2. Load directly from the Model

//GET /users/123
Ext.ModelMgr.getModel('User').load(123, {
    success: function(user) {
        console.log(user.getId()); //outputs 123
    }
});
</code></pre>
 * 
 * <p><u>Url generation</u></p>
 * 
 * <p>RestProxy is able to automatically generate the urls above based on two configuration options - {@link #appendId}
 * and {@link #format}. If appendId is true (it is by default) then RestProxy will automatically append the ID of the 
 * Model instance in question to the configured url, resulting in the '/users/123' that we saw above.</p>
 * 
 * <p>If the request is not for a specific Model instance (e.g. loading a Store), the url is not appended with an id. 
 * RestProxy will automatically insert a '/' before the ID if one is not already present.</p>
 * 
<pre><code>
new Ext.data.RestProxy({
    url: '/users',
    appendId: true //default
});

// Collection url: /users
// Instance url  : /users/123
</code></pre>
 * 
 * <p>RestProxy can also optionally append a format string to the end of any generated url:</p>
 * 
<pre><code>
new Ext.data.RestProxy({
    url: '/users',
    format: 'json'
});

// Collection url: /users.json
// Instance url  : /users/123.json
</code></pre>
 * 
 * <p>If further customization is needed, simply implement the {@link #buildUrl} method and add your custom generated
 * url onto the {@link Ext.data.Request Request} object that is passed to buildUrl. See 
 * <a href="source/RestProxy.html#method-Ext.data.RestProxy-buildUrl">RestProxy's implementation</a> for an example of
 * how to achieve this.</p>
 * 
 * <p>Note that RestProxy inherits from {@link Ext.data.AjaxProxy AjaxProxy}, which already injects all of the sorter,
 * filter, group and paging options into the generated url. See the {@link Ext.data.AjaxProxy AjaxProxy docs} for more
 * details.</p>
 */
Ext.data.RestProxy = Ext.extend(Ext.data.AjaxProxy, {
    /**
     * @cfg {Boolean} appendId True to automatically append the ID of a Model instance when performing a request based
     * on that single instance. See RestProxy intro docs for more details. Defaults to true.
     */
    appendId: true,
    
    /**
     * @cfg {String} format Optional data format to send to the server when making any request (e.g. 'json'). See the
     * RestProxy intro docs for full details. Defaults to undefined.
     */
    
    /**
     * Mapping of action name to HTTP request method. These default to RESTful conventions for the 'create', 'read',
     * 'update' and 'destroy' actions (which map to 'POST', 'GET', 'PUT' and 'DELETE' respectively). This object should
     * not be changed except globally via {@link Ext.override} - the {@link #getMethod} function can be overridden instead.
     * @property actionMethods
     * @type Object
     */
    actionMethods: {
        create : 'POST',
        read   : 'GET',
        update : 'PUT',
        destroy: 'DELETE'
    },
    
    api: {
        create : 'create',
        read   : 'read',
        update : 'update',
        destroy: 'destroy'
    },
    
    /**
     * Specialized version of buildUrl that incorporates the {@link #appendId} and {@link #format} options into the
     * generated url. Override this to provide further customizations, but remember to call the superclass buildUrl
     * so that additional parameters like the cache buster string are appended
     */
    buildUrl: function(request) {
        var records = request.operation.records || [],
            record  = records[0],
            format  = this.format,
            url     = request.url || this.url;
        
        if (this.appendId && record) {
            if (!url.match(/\/$/)) {
                url += '/';
            }
            
            url += record.getId();
        }
        
        if (format) {
            if (!url.match(/\.$/)) {
                url += '.';
            }
            
            url += format;
        }
        
        request.url = url;
        
        return Ext.data.RestProxy.superclass.buildUrl.apply(this, arguments);
    }
});

Ext.data.ProxyMgr.registerType('rest', Ext.data.RestProxy);