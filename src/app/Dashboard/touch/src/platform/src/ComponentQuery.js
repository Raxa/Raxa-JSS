/**
 * @class Ext.ComponentQuery
 * @extends Object
 *
 * Provides searching of Components within Ext.ComponentMgr (globally) or a specific
 * Ext.Container on the document with a similar syntax to a CSS selector.
 *
 * Xtypes can be retrieved by their name with an optional . prefix
<ul>
    <li>component or .component</li>
    <li>gridpanel or .gridpanel</li>
</ul>
 *
 * An itemId or id must be prefixed with a #.
<ul>
    <li>#myContainer</li>
</ul>
 *
 *
 * Attributes must be wrapped in brackets
<ul>
    <li>component[autoScroll]</li>
    <li>panel[title="Test"]</li>
</ul>
 *
 * Member expressions from candidate Components may be tested. If the expression returns a <i>truthy</i> value,
 * the candidate Component will be included in the query:<pre><code>
var disabledFields = myFormPanel.query("{isDisabled()}");
</code></pre>
 *
 * Pseudo classes may be used to filter results in the same way as in {@link Ext.DomQuery DomQuery}:<code><pre>
// Function receives array and returns a filtered array.
Ext.ComponentQuery.pseudos.invalid = function(items) {
    var i = 0, l = items.length, c, result = [];
    for (; i < l; i++) {
        if (!(c = items[i]).isValid()) {
            result.push(c);
        }
    }
    return result;
};

var invalidFields = myFormPanel.query('field:invalid');
if (invalidFields.length) {
    invalidFields[0].getEl().scrollIntoView(myFormPanel.body);
    for (var i = 0, l = invalidFields.length; i < l; i++) {
        invalidFields[i].getEl().frame("red");
    }
}
</pre></code>
 *
 * Queries return an array of components.
 * Here are some example queries.
<pre><code>
    // retrieve all Ext.Panel's on the document by xtype
    var panelsArray = Ext.ComponentQuery.query('.panel');

    // retrieve all Ext.Panels within the container with an id myCt
    var panelsWithinmyCt = Ext.ComponentQuery.query('#myCt .panel');

    // retrieve all direct children which are Ext.Panels within myCt
    var directChildPanel = Ext.ComponentQuery.query('#myCt > .panel');

    // retrieve all gridpanels and listviews
    var gridsAndLists = Ext.ComponentQuery.query('gridpanel, listview');
</code></pre>
 * @singleton
 */
Ext.ComponentQuery = new function() {
    var cq = this,

        // A function source code pattern with a placeholder which accepts an expression which yields a truth value when applied
        // as a member on each item in the passed array.
        filterFnPattern = [
            'var r = [],',
                'i = 0,',
                'it = arguments[0],',
                'l = it.length,',
                'c;',
            'for (; i < l; i++) {',
                'c = it[i].{0};',
                'if (c) {',
                   'r.push(c);',
                '}',
            '}',
            'return r;'
        ].join(''),

        filterItems = function(items, operation) {
            // Argument list for the operation is [ itemsArray, operationArg1, operationArg2...]
            // The operation's method loops over each item in the candidate array and
            // returns an array of items which match its criteria
            return operation.method.apply(this, [ items ].concat(operation.args));
        },

        getItems = function(items, mode) {
            var result = [],
                i,
                ln = items.length,
                candidate,
                deep = mode != '>';
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if (candidate.getRefItems) {
                    result = result.concat(candidate.getRefItems(deep));
                }
            }
            return result;
        },

        getAncestors = function(items) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                while (!!(candidate = candidate.ownerCt)) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which match the passed xtype
        filterByXType = function(items, xtype, shallow) {
            if (xtype == '*') {
                return items.slice();
            }
            else {
                var result = [],
                    i,
                    ln = items.length,
                    candidate;
                for (i = 0; i < ln; i++) {
                    candidate = items[i];
                    if (candidate.isXType(xtype, shallow)) {
                        result.push(candidate);
                    }
                }
                return result;
            }
        },

        // Filters the passed candidate array and returns only items which have the passed className
        filterByClassName = function(items, className) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if (candidate.el ? candidate.el.hasCls(className) : candidate.initCls().contains(className)) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which have the specified property match
        filterByAttribute = function(items, property, operator, value) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if ((value === undefined) ? !!candidate[property] : (candidate[property] == value)) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which have the specified itemId or id
        filterById = function(items, id) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if (candidate.getItemId() == id) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which the named pseudo class matcher filters in
        filterByPseudo = function(items, name, value) {
            return cq.pseudos[name](items, value);
        },

        // Determines leading mode
        // > for direct child, and ^ to switch to ownerCt axis
        modeRe = /^(\s?([>\^])\s?|\s|$)/,

        // Matches a token with possibly (true|false) appended for the "shallow" parameter
        // or {memberExpression}
        tokenRe = /^(?:(#)?([\w-]+|\*)(?:\((true|false)\))?)|(?:\{([^\}]+)\})/,

        matchers = [{
            // Checks for .xtype with possibly (true|false) appended for the "shallow" parameter
            re: /^\.([\w-]+)(?:\((true|false)\))?/,
            method: filterByXType
        },{
            // checks for [attribute=value]
            re: /^(?:[\[\{](?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
            method: filterByAttribute
        }, {
            // checks for #cmpItemId
            re: /^#([\w-]+)/,
            method: filterById
        }, {
            re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
            method: filterByPseudo
        }];

    /**
     * @class Ext.ComponentQuery.Query
     * @extends Object
     * @private
     */
    cq.Query = Ext.extend(Object, {
        constructor: function(cfg) {
            cfg = cfg || {};
            Ext.apply(this, cfg);
        },

        execute : function(root) {
            var operations = this.operations,
                ln = operations.length,
                operation, i,
                workingItems;

            // no root, use all Components in the document
            if (!root) {
		workingItems = Ext.ComponentMgr.all.getArray();
            }

            // We are going to loop over our operations and take care of them
            // one by one.
            for (i = 0; i < ln; i++) {
                operation = operations[i];

                // The mode operation requires some custom handling.
                // All other operations essentially filter down our current
                // working items, while mode replaces our current working
                // items by getting children from each one of our current
                // working items. The type of mode determines the type of
                // children we get. (e.g. > only gets direct children)
                if (operation.mode == '^') {
                    workingItems = getAncestors(workingItems || [root]);
                }
                else if (operation.mode) {
                    workingItems = getItems(workingItems || [root], operation.mode);
                }
                else {
                    workingItems = filterItems(workingItems || getItems([root]), operation);
                }

                // If this is the last operation, it means our current working
                // items are the final matched items. Thus return them!
                if (i == ln -1) {
                    return workingItems;
                }
            }
            return [];
        },

        is: function(component) {
            var operations = this.operations,
                ln = operations.length,
                i,
                workingItems = Ext.isArray(component) ? component : [ component ];

            // Filter the Component array by each operation in turn.
            // Quit immediately if the results are ever filtered to zero length
            for (i = 0; i < ln && workingItems.length; i++) {
                workingItems = filterItems(workingItems, operations[i]);
            }
            return workingItems.length != 0;
        }
    });

    Ext.apply(this, {

        // private cache of selectors and matching ComponentQuery.Query objects
        cache: {},

        // private cache of pseudo class filter functions
        pseudos: {},

        /**
         * <p>Returns an array of matched Components from within the passed root Container.</p>
         * <p>This method filters returned Components in a similar way to how CSS selector based DOM
         * queries work using a textual selector string.</p>
         * <p>See class summary for details.</p>
         * @param selector The selector string to filter returned Components
         * @param root The Container within which to perform the query. If omitted, all Components
         * within the document are included in the search.
         * @returns {Array} The matched Components.
         */
        query: function(selector, root) {
            var selectors = selector.split(','),
                ln = selectors.length,
                i, query, results = [],
                noDupResults = [], dupMatcher = {}, resultsLn, cmp;

            for (i = 0; i < ln; i++) {
                selector = Ext.util.Format.trim(selectors[i]);
                query = this.cache[selector];
                if (!query) {
                    this.cache[selector] = query = this.parse(selector);
                }
                results = results.concat(query.execute(root));
            }

            // multiple selectors, potential to find duplicates
            // lets filter them out.
            if (ln > 1) {
                resultsLn = results.length;
                for (i = 0; i < resultsLn; i++) {
                    cmp = results[i];
                    if (!dupMatcher[cmp.id]) {
                        noDupResults.push(cmp);
                        dupMatcher[cmp.id] = true;
                    }
                }
                results = noDupResults;
            }
            return results;
        },

        /**
         * Tests whether the passed Component matches the selector string.
         * @param component The Components to test
         * @param selector The selector string to test against.
         * @returns {Boolean} True if the Component matches the selector.
         */
        is: function(component, selector) {
            if (!selector) {
                return true;
            }
            var query = this.cache[selector];
            if (!query) {
                this.cache[selector] = query = this.parse(selector);
            }
            return query.is(component);
        },

        parse: function(selector) {
            var operations = [],
                ln = matchers.length,
                lastSelector,
                tokenMatch,
                matchedChar,
                modeMatch,
                selectorMatch,
                args,
                i, matcher;

            // We are going to parse the beginning of the selector over and
            // over again, slicing off the selector any portions we converted into an
            // operation, until it is an empty string.
            while (selector && lastSelector != selector) {
                lastSelector = selector;

                // First we check if we are dealing with a token like #, * or an xtype
                tokenMatch = selector.match(tokenRe);

                if (tokenMatch) {
                    matchedChar = tokenMatch[1];

                    // If the token is prefixed with a # we push a filterById operation to our stack
                    if (matchedChar == '#') {
                        operations.push({
                            method: filterById,
                            args: [Ext.util.Format.trim(tokenMatch[2])]
                        });
                    }
                    // If the token is prefixed with a . we push a filterByClassName operation to our stack
                    // Not enabled yet. just needs \. adding to the tokenRe prefix
                    else if (matchedChar == '.') {
                        operations.push({
                            method: filterByClassName,
                            args: [Ext.util.Format.trim(tokenMatch[2])]
                        });
                    }
                    // If the token is an expression, eg {isHidden()} we push a generated function operation to our stack
                    else if (tokenMatch[4]) {
                        operations.push({
                            method: new Function(Ext.util.Format.format(filterFnPattern, tokenMatch[4])),
                            args: []
                        });
                    }
                    // If the token is a * or an xtype string, we push a filterByXType
                    // operation to the stack.
                    else {
                        operations.push({
                            method: filterByXType,
                            args: [Ext.util.Format.trim(tokenMatch[2]), Boolean(tokenMatch[3])]
                        });
                    }

                    // Now we slice of the part we just converted into an operation
                    selector = selector.replace(tokenMatch[0], '');
                }

                // If the next part of the query is not a space or > or ^, it means we
                // are going to check for more things that our current selection
                // has to comply to.
                while (!(modeMatch = selector.match(modeRe))) {
                    // Lets loop over each type of matcher and execute it
                    // on our current selector.
                    for (i = 0; selector && i < ln; i++) {
                        matcher = matchers[i];
                        selectorMatch = selector.match(matcher.re);

                        // If we have a match, add an operation with the method
                        // associated with this matcher, and pass the regular
                        // expression matches are arguments to the operation.
                        if (selectorMatch) {
                            operations.push({
                                method: matcher.method,
                                args: selectorMatch.splice(1)
                            });
                            selector = selector.replace(selectorMatch[0], '');
                            break; // Break on match
                        }
                        // Exhausted all matches: It's an error
                        if (i == (ln - 1)) {
                            throw "Invalid ComponentQuery selector: \"" + arguments[0] + "\"";
                        }
                    }
                }

                // Now we are going to check for a mode change. This means a space
                // or a > to determine if we are going to select all the children
                // of the currently matched items, or a ^ if we are going to use the
                // ownerCt axis as the candidate source.
                if (modeMatch[1]) { // Assignment, and test for truthiness!
                    operations.push({
                        mode: modeMatch[2]||modeMatch[1]
                    });
                    selector = selector.replace(modeMatch[0], '');
                }
            }

            //  Now that we have all our operations in an array, we are going
            // to create a new Query using these operations.
            return new cq.Query({
                operations: operations
            });
        }
    });
};
