/**
 * @class Ext.util.MixedCollection
 * @extends Ext.util.Observable
 * A Collection class that maintains both numeric indexes and keys and exposes events.
 * @constructor
 * @param {Boolean} allowFunctions Specify <tt>true</tt> if the {@link #addAll}
 * function should add function references to the collection. Defaults to
 * <tt>false</tt>.
 * @param {Function} keyFn A function that can accept an item of the type(s) stored in this MixedCollection
 * and return the key value for that item.  This is used when available to look up the key on items that
 * were passed without an explicit key parameter to a MixedCollection method.  Passing this parameter is
 * equivalent to providing an implementation for the {@link #getKey} method.
 */
Ext.util.MixedCollection = function(allowFunctions, keyFn) {
    this.items = [];
    this.map = {};
    this.keys = [];
    this.length = 0;
    this.addEvents(
        /**
         * @event clear
         * Fires when the collection is cleared.
         */
        'clear',
        /**
         * @event add
         * Fires when an item is added to the collection.
         * @param {Number} index The index at which the item was added.
         * @param {Object} o The item added.
         * @param {String} key The key associated with the added item.
         */
        'add',
        /**
         * @event replace
         * Fires when an item is replaced in the collection.
         * @param {String} key he key associated with the new added.
         * @param {Object} old The item being replaced.
         * @param {Object} new The new item.
         */
        'replace',
        /**
         * @event remove
         * Fires when an item is removed from the collection.
         * @param {Object} o The item being removed.
         * @param {String} key (optional) The key associated with the removed item.
         */
        'remove',
        'sort'
    );
    this.allowFunctions = allowFunctions === true;
    if (keyFn) {
        this.getKey = keyFn;
    }
    Ext.util.MixedCollection.superclass.constructor.call(this);
};

Ext.extend(Ext.util.MixedCollection, Ext.util.Observable, {

    /**
     * @cfg {Boolean} allowFunctions Specify <tt>true</tt> if the {@link #addAll}
     * function should add function references to the collection. Defaults to
     * <tt>false</tt>.
     */
    allowFunctions : false,

    /**
     * Adds an item to the collection. Fires the {@link #add} event when complete.
     * @param {String} key <p>The key to associate with the item, or the new item.</p>
     * <p>If a {@link #getKey} implementation was specified for this MixedCollection,
     * or if the key of the stored items is in a property called <tt><b>id</b></tt>,
     * the MixedCollection will be able to <i>derive</i> the key for the new item.
     * In this case just pass the new item in this parameter.</p>
     * @param {Object} o The item to add.
     * @return {Object} The item added.
     */
    add : function(key, obj){
        var myObj = obj, myKey = key;
        if(arguments.length == 1){
            myObj = myKey;
            myKey = this.getKey(myObj);
        }
        if(typeof myKey != 'undefined' && myKey !== null){
            var old = this.map[myKey];
            if(typeof old != 'undefined'){
                return this.replace(myKey, myObj);
            }
            this.map[myKey] = myObj;
        }
        this.length++;
        this.items.push(myObj);
        this.keys.push(myKey);
        this.fireEvent('add', this.length-1, myObj, myKey);
        return myObj;
    },

    /**
      * MixedCollection has a generic way to fetch keys if you implement getKey.  The default implementation
      * simply returns <b><code>item.id</code></b> but you can provide your own implementation
      * to return a different value as in the following examples:<pre><code>
// normal way
var mc = new Ext.util.MixedCollection();
mc.add(someEl.dom.id, someEl);
mc.add(otherEl.dom.id, otherEl);
//and so on

// using getKey
var mc = new Ext.util.MixedCollection();
mc.getKey = function(el){
   return el.dom.id;
};
mc.add(someEl);
mc.add(otherEl);

// or via the constructor
var mc = new Ext.util.MixedCollection(false, function(el){
   return el.dom.id;
});
mc.add(someEl);
mc.add(otherEl);
     * </code></pre>
     * @param {Object} item The item for which to find the key.
     * @return {Object} The key for the passed item.
     */
    getKey : function(o){
         return o.id;
    },

    /**
     * Replaces an item in the collection. Fires the {@link #replace} event when complete.
     * @param {String} key <p>The key associated with the item to replace, or the replacement item.</p>
     * <p>If you supplied a {@link #getKey} implementation for this MixedCollection, or if the key
     * of your stored items is in a property called <tt><b>id</b></tt>, then the MixedCollection
     * will be able to <i>derive</i> the key of the replacement item. If you want to replace an item
     * with one having the same key value, then just pass the replacement item in this parameter.</p>
     * @param o {Object} o (optional) If the first parameter passed was a key, the item to associate
     * with that key.
     * @return {Object}  The new item.
     */
    replace : function(key, o){
        if(arguments.length == 1){
            o = arguments[0];
            key = this.getKey(o);
        }
        var old = this.map[key];
        if(typeof key == 'undefined' || key === null || typeof old == 'undefined'){
             return this.add(key, o);
        }
        var index = this.indexOfKey(key);
        this.items[index] = o;
        this.map[key] = o;
        this.fireEvent('replace', key, old, o);
        return o;
    },

    /**
     * Adds all elements of an Array or an Object to the collection.
     * @param {Object/Array} objs An Object containing properties which will be added
     * to the collection, or an Array of values, each of which are added to the collection.
     * Functions references will be added to the collection if <code>{@link #allowFunctions}</code>
     * has been set to <tt>true</tt>.
     */
    addAll : function(objs){
        if(arguments.length > 1 || Ext.isArray(objs)){
            var args = arguments.length > 1 ? arguments : objs;
            for(var i = 0, len = args.length; i < len; i++){
                this.add(args[i]);
            }
        }else{
            for(var key in objs){
                if (!objs.hasOwnProperty(key)) {
                    continue;
                }
                if(this.allowFunctions || typeof objs[key] != 'function'){
                    this.add(key, objs[key]);
                }
            }
        }
    },

    /**
     * Executes the specified function once for every item in the collection, passing the following arguments:
     * <div class="mdetail-params"><ul>
     * <li><b>item</b> : Mixed<p class="sub-desc">The collection item</p></li>
     * <li><b>index</b> : Number<p class="sub-desc">The item's index</p></li>
     * <li><b>length</b> : Number<p class="sub-desc">The total number of items in the collection</p></li>
     * </ul></div>
     * The function should return a boolean value. Returning false from the function will stop the iteration.
     * @param {Function} fn The function to execute for each item.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the current item in the iteration.
     */
    each : function(fn, scope){
        var items = [].concat(this.items); // each safe for removal
        for(var i = 0, len = items.length; i < len; i++){
            if(fn.call(scope || items[i], items[i], i, len) === false){
                break;
            }
        }
    },

    /**
     * Executes the specified function once for every key in the collection, passing each
     * key, and its associated item as the first two parameters.
     * @param {Function} fn The function to execute for each item.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the browser window.
     */
    eachKey : function(fn, scope){
        for(var i = 0, len = this.keys.length; i < len; i++){
            fn.call(scope || window, this.keys[i], this.items[i], i, len);
        }
    },

    /**
     * Returns the first item in the collection which elicits a true return value from the
     * passed selection function.
     * @param {Function} fn The selection function to execute for each item.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the browser window.
     * @return {Object} The first item in the collection which returned true from the selection function.
     */
    findBy : function(fn, scope) {
        for(var i = 0, len = this.items.length; i < len; i++){
            if(fn.call(scope || window, this.items[i], this.keys[i])){
                return this.items[i];
            }
        }
        return null;
    },
    
    //<deprecated since="0.99">
    find : function() {
        throw new Error("[Ext.util.MixedCollection] Stateful: find has been deprecated. Please use findBy.");
    },
    //</deprecated>

    /**
     * Inserts an item at the specified index in the collection. Fires the {@link #add} event when complete.
     * @param {Number} index The index to insert the item at.
     * @param {String} key The key to associate with the new item, or the item itself.
     * @param {Object} o (optional) If the second parameter was a key, the new item.
     * @return {Object} The item inserted.
     */
    insert : function(index, key, obj){
        var myKey = key, myObj = obj;
        if(arguments.length == 2){
            myObj = myKey;
            myKey = this.getKey(myObj);
        }
        if(this.containsKey(myKey)){
            this.suspendEvents();
            this.removeByKey(myKey);
            this.resumeEvents();
        }
        if(index >= this.length){
            return this.add(myKey, myObj);
        }
        this.length++;
        this.items.splice(index, 0, myObj);
        if(typeof myKey != 'undefined' && myKey !== null){
            this.map[myKey] = myObj;
        }
        this.keys.splice(index, 0, myKey);
        this.fireEvent('add', index, myObj, myKey);
        return myObj;
    },

    /**
     * Remove an item from the collection.
     * @param {Object} o The item to remove.
     * @return {Object} The item removed or false if no item was removed.
     */
    remove : function(o){
        return this.removeAt(this.indexOf(o));
    },

    /**
     * Remove all items in the passed array from the collection.
     * @param {Array} items An array of items to be removed.
     * @return {Ext.util.MixedCollection} this object
     */
    removeAll : function(items){
        Ext.each(items || [], function(item) {
            this.remove(item);
        }, this);

        return this;
    },

    /**
     * Remove an item from a specified index in the collection. Fires the {@link #remove} event when complete.
     * @param {Number} index The index within the collection of the item to remove.
     * @return {Object} The item removed or false if no item was removed.
     */
    removeAt : function(index){
        if(index < this.length && index >= 0){
            this.length--;
            var o = this.items[index];
            this.items.splice(index, 1);
            var key = this.keys[index];
            if(typeof key != 'undefined'){
                delete this.map[key];
            }
            this.keys.splice(index, 1);
            this.fireEvent('remove', o, key);
            return o;
        }
        return false;
    },

    /**
     * Removed an item associated with the passed key fom the collection.
     * @param {String} key The key of the item to remove.
     * @return {Object} The item removed or false if no item was removed.
     */
    removeByKey : function(key){
        return this.removeAt(this.indexOfKey(key));
    },
    
    //<debug>
    removeKey : function() {
        console.warn('MixedCollection: removeKey has been deprecated. Please use removeByKey.');
        return this.removeByKey.apply(this, arguments);
    },
    //</debug>

    /**
     * Returns the number of items in the collection.
     * @return {Number} the number of items in the collection.
     */
    getCount : function(){
        return this.length;
    },

    /**
     * Returns index within the collection of the passed Object.
     * @param {Object} o The item to find the index of.
     * @return {Number} index of the item. Returns -1 if not found.
     */
    indexOf : function(o){
        return this.items.indexOf(o);
    },

    /**
     * Returns index within the collection of the passed key.
     * @param {String} key The key to find the index of.
     * @return {Number} index of the key.
     */
    indexOfKey : function(key){
        return this.keys.indexOf(key);
    },

    /**
     * Returns the item associated with the passed key OR index.
     * Key has priority over index.  This is the equivalent
     * of calling {@link #key} first, then if nothing matched calling {@link #getAt}.
     * @param {String/Number} key The key or index of the item.
     * @return {Object} If the item is found, returns the item.  If the item was not found, returns <tt>undefined</tt>.
     * If an item was found, but is a Class, returns <tt>null</tt>.
     */
    get : function(key) {
        var mk = this.map[key],
            item = mk !== undefined ? mk : (typeof key == 'number') ? this.items[key] : undefined;
        return typeof item != 'function' || this.allowFunctions ? item : null; // for prototype!
    },
    
    //<debug>
    item : function() {
        console.warn('MixedCollection: item has been deprecated. Please use get.');
        return this.get.apply(this, arguments);
    },
    //</debug>

    /**
     * Returns the item at the specified index.
     * @param {Number} index The index of the item.
     * @return {Object} The item at the specified index.
     */
    getAt : function(index) {
        return this.items[index];
    },

    //<debug>
    itemAt : function() {
        console.warn('MixedCollection: itemAt has been deprecated. Please use getAt.');
        return this.getAt.apply(this, arguments);
    },
    //</debug>
    
    /**
     * Returns the item associated with the passed key.
     * @param {String/Number} key The key of the item.
     * @return {Object} The item associated with the passed key.
     */
    getByKey : function(key) {
        return this.map[key];
    },

    //<debug>
    key : function() {
        console.warn('MixedCollection: key has been deprecated. Please use getByKey.');
        return this.getByKey.apply(this, arguments);
    },
    //</debug>
    
    /**
     * Returns true if the collection contains the passed Object as an item.
     * @param {Object} o  The Object to look for in the collection.
     * @return {Boolean} True if the collection contains the Object as an item.
     */
    contains : function(o){
        return this.indexOf(o) != -1;
    },

    /**
     * Returns true if the collection contains the passed Object as a key.
     * @param {String} key The key to look for in the collection.
     * @return {Boolean} True if the collection contains the Object as a key.
     */
    containsKey : function(key){
        return typeof this.map[key] != 'undefined';
    },

    /**
     * Removes all items from the collection.  Fires the {@link #clear} event when complete.
     */
    clear : function(){
        this.length = 0;
        this.items = [];
        this.keys = [];
        this.map = {};
        this.fireEvent('clear');
    },

    /**
     * Returns the first item in the collection.
     * @return {Object} the first item in the collection..
     */
    first : function() {
        return this.items[0];
    },

    /**
     * Returns the last item in the collection.
     * @return {Object} the last item in the collection..
     */
    last : function() {
        return this.items[this.length-1];
    },

    /**
     * @private
     * Performs the actual sorting based on a direction and a sorting function. Internally,
     * this creates a temporary array of all items in the MixedCollection, sorts it and then writes
     * the sorted array data back into this.items and this.keys
     * @param {String} property Property to sort by ('key', 'value', or 'index')
     * @param {String} dir (optional) Direction to sort 'ASC' or 'DESC'. Defaults to 'ASC'.
     * @param {Function} fn (optional) Comparison function that defines the sort order.
     * Defaults to sorting by numeric value.
     */
    _sort : function(property, dir, fn){
        var i, len,
            dsc   = String(dir).toUpperCase() == 'DESC' ? -1 : 1,

            //this is a temporary array used to apply the sorting function
            c     = [],
            keys  = this.keys,
            items = this.items;

        //default to a simple sorter function if one is not provided
        fn = fn || function(a, b) {
            return a - b;
        };

        //copy all the items into a temporary array, which we will sort
        for(i = 0, len = items.length; i < len; i++){
            c[c.length] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }

        //sort the temporary array
        c.sort(function(a, b){
            var v = fn(a[property], b[property]) * dsc;
            if(v === 0){
                v = (a.index < b.index ? -1 : 1);
            }
            return v;
        });

        //copy the temporary array back into the main this.items and this.keys objects
        for(i = 0, len = c.length; i < len; i++){
            items[i] = c[i].value;
            keys[i]  = c[i].key;
        }

        this.fireEvent('sort', this);
    },

    /**
     * Sorts this collection by <b>item</b> value with the passed comparison function.
     * @param {Array/String} property Set of {@link Ext.util.Sorter} objects to sort by, or a property of each item
     * in the collection to sort on if using the 2 argument form
     * @param {String} direction Optional direction (used in the 2 argument signature of this method). Defaults to "ASC"
     */
    sort : function(property, direction) {
        //in case we were passed an array of sorters
        var sorters = property;
        
        //support for the simple case of sorting by property/direction
        if (Ext.isString(property)) {
            sorters = [new Ext.util.Sorter({
                property : property,
                direction: direction || "ASC"
            })];
        } else if (property instanceof Ext.util.Sorter) {
            sorters = [property];
        } else if (Ext.isObject(property)) {
            sorters = [new Ext.util.Sorter(property)];
        }
        
        var length = sorters.length;
        
        if (length == 0) {
            return;
        }
                
        //construct an amalgamated sorter function which combines all of the Sorters passed
        var sorterFn = function(r1, r2) {
            var result = sorters[0].sort(r1, r2),
                length = sorters.length,
                i;
            
                //if we have more than one sorter, OR any additional sorter functions together
                for (i = 1; i < length; i++) {
                    result = result || sorters[i].sort.call(this, r1, r2);
                }                
           
            return result;
        };
        
        this.sortBy(sorterFn);
    },
    
    /**
     * Sorts the collection by a single sorter function
     * @param {Function} sorterFn The function to sort by
     */
    sortBy: function(sorterFn) {
        var items  = this.items,
            keys   = this.keys,
            length = items.length,
            temp   = [],
            i;
        
        //first we create a copy of the items array so that we can sort it
        for (i = 0; i < length; i++) {
            temp[i] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }
        
        temp.sort(function(a, b) {
            var v = sorterFn(a.value, b.value);
            if (v === 0) {
                v = (a.index < b.index ? -1 : 1);
            }
            
            return v;
        });
        
        //copy the temporary array back into the main this.items and this.keys objects
        for (i = 0; i < length; i++) {
            items[i] = temp[i].value;
            keys[i]  = temp[i].key;
        }
        
        this.fireEvent('sort', this);
    },

    /**
     * Reorders each of the items based on a mapping from old index to new index. Internally this
     * just translates into a sort. The 'sort' event is fired whenever reordering has occured.
     * @param {Object} mapping Mapping from old item index to new item index
     */
    reorder: function(mapping) {
        this.suspendEvents();

        var items = this.items,
            index = 0,
            length = items.length,
            order = [],
            remaining = [],
            oldIndex;

        //object of {oldPosition: newPosition} reversed to {newPosition: oldPosition}
        for (oldIndex in mapping) {
            order[mapping[oldIndex]] = items[oldIndex];
        }

        for (index = 0; index < length; index++) {
            if (mapping[index] == undefined) {
                remaining.push(items[index]);
            }
        }

        for (index = 0; index < length; index++) {
            if (order[index] == undefined) {
                order[index] = remaining.shift();
            }
        }

        this.clear();
        this.addAll(order);

        this.resumeEvents();
        this.fireEvent('sort', this);
    },

    /**
     * Sorts this collection by <b>key</b>s.
     * @param {String} direction (optional) 'ASC' or 'DESC'. Defaults to 'ASC'.
     * @param {Function} fn (optional) Comparison function that defines the sort order.
     * Defaults to sorting by case insensitive string.
     */
    sortByKey : function(dir, fn){
        this._sort('key', dir, fn || function(a, b){
            var v1 = String(a).toUpperCase(), v2 = String(b).toUpperCase();
            return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
        });
    },
    
    //<debug>
    keySort : function() {
        console.warn('MixedCollection: keySort has been deprecated. Please use sortByKey.');
        return this.sortByKey.apply(this, arguments);
    },
    //</debug>
    

    /**
     * Returns a range of items in this collection
     * @param {Number} startIndex (optional) The starting index. Defaults to 0.
     * @param {Number} endIndex (optional) The ending index. Defaults to the last item.
     * @return {Array} An array of items
     */
    getRange : function(start, end){
        var items = this.items;
        if(items.length < 1){
            return [];
        }
        start = start || 0;
        end = Math.min(typeof end == 'undefined' ? this.length-1 : end, this.length-1);
        var i, r = [];
        if(start <= end){
            for(i = start; i <= end; i++) {
                r[r.length] = items[i];
            }
        }else{
            for(i = start; i >= end; i--) {
                r[r.length] = items[i];
            }
        }
        return r;
    },

    /**
     * <p>Filters the objects in this collection by a set of {@link Ext.util.Filter Filter}s, or by a single
     * property/value pair with optional parameters for substring matching and case sensitivity. See
     * {@link Ext.util.Filter Filter} for an example of using Filter objects (preferred). Alternatively, 
     * MixedCollection can be easily filtered by property like this:</p>
<pre><code>
//create a simple store with a few people defined
var people = new Ext.util.MixedCollection();
people.addAll([
    {id: 1, age: 25, name: 'Ed'},
    {id: 2, age: 24, name: 'Tommy'},
    {id: 3, age: 24, name: 'Arne'},
    {id: 4, age: 26, name: 'Aaron'}
]);

//a new MixedCollection containing only the items where age == 24
var middleAged = people.filter('age', 24);
</code></pre>
     * 
     * 
     * @param {Array/String} property A property on your objects, or an array of {@link Ext.util.Filter Filter} objects
     * @param {String/RegExp} value Either string that the property values
     * should start with or a RegExp to test against the property
     * @param {Boolean} anyMatch (optional) True to match any part of the string, not just the beginning
     * @param {Boolean} caseSensitive (optional) True for case sensitive comparison (defaults to False).
     * @return {MixedCollection} The new filtered collection
     */
    filter : function(property, value, anyMatch, caseSensitive) {
        var filters = [];
        
        //support for the simple case of filtering by property/value
        if (Ext.isString(property)) {
            filters.push(new Ext.util.Filter({
                property     : property,
                value        : value,
                anyMatch     : anyMatch,
                caseSensitive: caseSensitive
            }));
        } else if (Ext.isArray(property) || property instanceof Ext.util.Filter) {
            filters = filters.concat(property);
        }
        
        //at this point we have an array of zero or more Ext.util.Filter objects to filter with,
        //so here we construct a function that combines these filters by ANDing them together
        var filterFn = function(record) {
            var isMatch = true,
                length = filters.length,
                i;

            for (i = 0; i < length; i++) {
                var filter = filters[i],
                    fn     = filter.filterFn,
                    scope  = filter.scope;

                isMatch = isMatch && fn.call(scope, record);
            }

            return isMatch;
        };
        
        return this.filterBy(filterFn);
    },

    /**
     * Filter by a function. Returns a <i>new</i> collection that has been filtered.
     * The passed function will be called with each object in the collection.
     * If the function returns true, the value is included otherwise it is filtered.
     * @param {Function} fn The function to be called, it will receive the args o (the object), k (the key)
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this MixedCollection.
     * @return {MixedCollection} The new filtered collection
     */
    filterBy : function(fn, scope) {
        var newMC  = new Ext.util.MixedCollection(),
            keys   = this.keys, 
            items  = this.items,
            length = items.length,
            i;
            
        newMC.getKey = this.getKey;
        
        for (i = 0; i < length; i++) {
            if (fn.call(scope||this, items[i], keys[i])) {
                newMC.add(keys[i], items[i]);
            }
        }
        
        return newMC;
    },

    /**
     * Finds the index of the first matching object in this collection by a specific property/value.
     * @param {String} property The name of a property on your objects.
     * @param {String/RegExp} value A string that the property values
     * should start with or a RegExp to test against the property.
     * @param {Number} start (optional) The index to start searching at (defaults to 0).
     * @param {Boolean} anyMatch (optional) True to match any part of the string, not just the beginning.
     * @param {Boolean} caseSensitive (optional) True for case sensitive comparison.
     * @return {Number} The matched index or -1
     */
    findIndex : function(property, value, start, anyMatch, caseSensitive){
        if(Ext.isEmpty(value, false)){
            return -1;
        }
        value = this.createValueMatcher(value, anyMatch, caseSensitive);
        return this.findIndexBy(function(o){
            return o && value.test(o[property]);
        }, null, start);
    },

    /**
     * Find the index of the first matching object in this collection by a function.
     * If the function returns <i>true</i> it is considered a match.
     * @param {Function} fn The function to be called, it will receive the args o (the object), k (the key).
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this MixedCollection.
     * @param {Number} start (optional) The index to start searching at (defaults to 0).
     * @return {Number} The matched index or -1
     */
    findIndexBy : function(fn, scope, start){
        var k = this.keys, it = this.items;
        for(var i = (start||0), len = it.length; i < len; i++){
            if(fn.call(scope||this, it[i], k[i])){
                return i;
            }
        }
        return -1;
    },

    /**
     * Returns a regular expression based on the given value and matching options. This is used internally for finding and filtering,
     * and by Ext.data.Store#filter
     * @private
     * @param {String} value The value to create the regex for. This is escaped using Ext.escapeRe
     * @param {Boolean} anyMatch True to allow any match - no regex start/end line anchors will be added. Defaults to false
     * @param {Boolean} caseSensitive True to make the regex case sensitive (adds 'i' switch to regex). Defaults to false.
     * @param {Boolean} exactMatch True to force exact match (^ and $ characters added to the regex). Defaults to false. Ignored if anyMatch is true.
     */
    createValueMatcher : function(value, anyMatch, caseSensitive, exactMatch) {
        if (!value.exec) { // not a regex
            var er = Ext.util.Format.escapeRegex;
            value = String(value);

            if (anyMatch === true) {
                value = er(value);
            } else {
                value = '^' + er(value);
                if (exactMatch === true) {
                    value += '$';
                }
            }
            value = new RegExp(value, caseSensitive ? '' : 'i');
         }
         return value;
    },

    /**
     * Creates a shallow copy of this collection
     * @return {MixedCollection}
     */
    clone : function(){
        var r = new Ext.util.MixedCollection();
        var k = this.keys, it = this.items;
        for(var i = 0, len = it.length; i < len; i++){
            r.add(k[i], it[i]);
        }
        r.getKey = this.getKey;
        return r;
    }
});
/*
 * This method calls {@link #item item()}.
 * Returns the item associated with the passed key OR index. Key has priority
 * over index.  This is the equivalent of calling {@link #key} first, then if
 * nothing matched calling {@link #getAt}.
 * @param {String/Number} key The key or index of the item.
 * @return {Object} If the item is found, returns the item.  If the item was
 * not found, returns <tt>undefined</tt>. If an item was found, but is a Class,
 * returns <tt>null</tt>.
 */
// Ext.util.MixedCollection.prototype.get = Ext.util.MixedCollection.prototype.item;
