/**
 * Provides functionality to select elements on the page based on a CSS selector. All selectors, attribute filters and
 * pseudos below can be combined infinitely in any order. For example "div.foo:nth-child(odd)[@foo=bar].bar:first" 
 * would be a perfectly valid selector.
 * 
 * ## Element Selectors:
 * 
 * * \* any element
 * * E an element with the tag E
 * * E F All descendent elements of E that have the tag F
 * * E > F or E/F all direct children elements of E that have the tag F
 * * E + F all elements with the tag F that are immediately preceded by an element with the tag E
 * * E ~ F all elements with the tag F that are preceded by a sibling element with the tag E
 * 
 * ## Attribute Selectors:
 * 
 * The use of @ and quotes are optional. For example, div[@foo='bar'] is also a valid attribute selector.
 * 
 * * E[foo] has an attribute "foo"
 * * E[foo=bar] has an attribute "foo" that equals "bar"
 * * E[foo^=bar] has an attribute "foo" that starts with "bar"
 * * E[foo$=bar] has an attribute "foo" that ends with "bar"
 * * E[foo*=bar] has an attribute "foo" that contains the substring "bar"
 * * E[foo%=2] has an attribute "foo" that is evenly divisible by 2
 * * E[foo!=bar] has an attribute "foo" that does not equal "bar"
 * 
 * ## Pseudo Classes:
 * 
 * * E:first-child E is the first child of its parent
 * * E:last-child E is the last child of its parent
 * * E:nth-child(n) E is the nth child of its parent (1 based as per the spec)
 * * E:nth-child(odd) E is an odd child of its parent
 * * E:nth-child(even) E is an even child of its parent
 * * E:only-child E is the only child of its parent
 * * E:checked E is an element that is has a checked attribute that is true (e.g. a radio or checkbox)
 * * E:first the first E in the resultset
 * * E:last the last E in the resultset
 * * E:nth(n) the nth E in the resultset (1 based)
 * * E:odd shortcut for :nth-child(odd)
 * * E:even shortcut for :nth-child(even)
 * * E:contains(foo) E's innerHTML contains the substring "foo"
 * * E:nodeValue(foo) E contains a textNode with a nodeValue that equals "foo"
 * * E:not(S) an E element that does not match simple selector S
 * * E:has(S) an E element that has a descendent that matches simple selector S
 * * E:next(S) an E element whose next sibling matches simple selector S
 * * E:prev(S) an E element whose previous sibling matches simple selector S
 * * E:any(S1|S2|S2) an E element which matches any of the simple selectors S1, S2 or S3//\\
 * 
 * ## CSS Value Selectors:
 * 
 * * E{display=none} css value "display" that equals "none"
 * * E{display^=none} css value "display" that starts with "none"
 * * E{display$=none} css value "display" that ends with "none"
 * * E{display*=none} css value "display" that contains the substring "none"
 * * E{display%=2} css value "display" that is evenly divisible by 2
 * * E{display!=none} css value "display" that does not equal "none"
 */
Ext.define('Ext.dom.Query', {
    extend: 'Ext.dom.AbstractQuery',
    alternateClassName: 'Ext.DomQuery'
}, function() {
    Ext.ns('Ext.core');
    Ext.core.DomQuery = Ext.DomQuery = new this();
    Ext.query = Ext.Function.alias(Ext.DomQuery, 'select');
});
