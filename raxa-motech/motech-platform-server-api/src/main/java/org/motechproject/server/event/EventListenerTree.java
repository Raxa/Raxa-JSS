package org.motechproject.server.event;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
* Created by IntelliJ IDEA.
* User: rob
* Date: 4/9/11
* Time: 10:02 PM
* To change this template use File | Settings | File Templates.
*/
class EventListenerTree
{
    //private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final String SPLIT_REGEX = "\\.";

    private List<EventListenerTree> children = new ArrayList<EventListenerTree>();
    private EventListenerTree parent;

    private String pathElement;
    private Set<EventListener> listeners;
    private Set<EventListener> wildcardListeners;

    public EventListenerTree() {
        this.pathElement = null;
        this.parent = null;
    }

    public EventListenerTree(String pathElement, EventListenerTree parent) {
        this.pathElement = pathElement;
        this.parent = parent;
    }

    public String getPathElement() {
        return pathElement;
    }

    /**
     * Walk up the tree from this point building out the subject
     *
     * @return
     */
    public String getSubject() {
        if (parent == null) {
            return "";
        }

        String parentSubject = parent.getSubject();
        if ("".equals(parentSubject)) {
            return pathElement;
        } else {
            return parentSubject + "." + pathElement;
        }
    }

    /**
     * Given a full path create the tree structure to store it
     *
     * @param listener
     * @param subject
     */
    public void addListener(EventListener listener, String subject)
    {
        if (subject == null) {
            throw new IllegalArgumentException("Cannot add listener for null subject");
        }

        int asteriskLocation = subject.indexOf("*");
        if (asteriskLocation != -1 && (asteriskLocation  + 1)!= subject.length()) {
            throw new IllegalArgumentException("Wildcard must be last element of subject: " + subject);
        }

        if (subject.indexOf("..") != -1) {
            throw new IllegalArgumentException("Subject can not contain an empty path segment: " + subject);
        }

        // Split the subject into it's path components
        String[] path = subject.split(SPLIT_REGEX);

        if (path[path.length - 1].indexOf("*") != -1 && path[path.length - 1].length() > 1) {
            throw new IllegalArgumentException("Wildcard can not be mixed with characters");
        }

        EventListenerTree child = getChild(path[0]);
        if (child == null) {
            child = new EventListenerTree(path[0], this);
            addChild(child);
        }

        child.addListener(listener, path, 0);
    }

    private void addListener(EventListener listener, String[] path, int pathLevel) {
        // I've walked to the end of the path.  Assign this listener to this node
        if ((pathLevel + 1) == path.length) {
            addListener(listener);
            return;
        }

        // If the next step is the end of the path and it's a wildcard save listener here
        if ((pathLevel + 2) == path.length && "*".equals(path[path.length - 1])) {
            addWildcardListener(listener);
            return;
        }

        EventListenerTree child = getChild(path[pathLevel + 1]);
        if (child == null) {
            child = new EventListenerTree(path[pathLevel + 1], this);
            addChild(child);
        }

        child.addListener(listener, path, (pathLevel + 1));
    }

    /**
     * Given a subject path return all listeners registered for it
     *
     * @param subject
     * @return
     */
    public Set<EventListener> getListeners(String subject) {
        // Split the subject into it's path components
        String[] path = subject.split(SPLIT_REGEX);

        EventListenerTree child = getChild(path[0]);
        if (child == null) {
            return Collections.<EventListener>emptySet();
        }

        return child.getListeners(path, 0);
    }

    private Set<EventListener> getListeners(String[] path, int pathLevel) {
        Set<EventListener> ret;

        if ((pathLevel + 1) == path.length) {
            return getAllListeners();
        }

        EventListenerTree child = getChild(path[pathLevel + 1]);
        if (child == null) {
            return getWildcardListeners();
        }

        ret = child.getListeners(path, (pathLevel + 1));
        ret.addAll(getWildcardListeners());

        return ret;
    }

    public boolean  hasListener(String subject) {
         // Split the subject into it's path components
        String[] path = subject.split(SPLIT_REGEX);

        EventListenerTree child = getChild(path[0]);
        if (child == null) {
            return false;
        }

        return child.hasListener(path, 0);
    }

    private boolean hasListener(String[] path, int pathLevel) {
        if (hasWildcardListeners()) {
            return true;
        }

        if ((pathLevel + 1) == path.length) {
            return listeners != null && !listeners.isEmpty();
        }

        EventListenerTree child = getChild(path[pathLevel + 1]);
        if (child == null) {
            return false;
        }

        return child.hasListener(path, (pathLevel + 1));
    }

    public int getListenerCount(String subject) {
         // Split the subject into it's path components
        String[] path = subject.split(SPLIT_REGEX);

        EventListenerTree child = getChild(path[0]);
        if (child == null) {
            return 0;
        }

        return child.getListenerCount(path, 0);
    }

    private int getListenerCount(String[] path, int pathLevel) {
        int ret = 0;

        if ((pathLevel + 1) == path.length) {
            return getAllListeners().size();
        }

        EventListenerTree child = getChild(path[pathLevel + 1]);
        if (child == null) {
            return getWildcardListeners().size();
        }

        ret = getWildcardListeners().size();

        return ret + child.getListeners(path, (pathLevel + 1)).size();
    }

    private Set<EventListener> getListeners() {
        Set<EventListener> ret = new HashSet<EventListener>();

        if (listeners == null) {
            listeners = new HashSet<EventListener>();
        }

        ret.addAll(listeners);

        return ret;
    }

    private Set<EventListener> getAllListeners() {
        Set<EventListener> ret = new HashSet<EventListener>();

        if (listeners == null) {
            listeners = new HashSet<EventListener>();
        }

        if (wildcardListeners == null) {
            wildcardListeners = new HashSet<EventListener>();
        }

        ret.addAll(listeners);
        ret.addAll(wildcardListeners);

        return ret;
    }

    private Set<EventListener> getWildcardListeners() {
        Set<EventListener> ret = new HashSet<EventListener>();

        if (wildcardListeners == null) {
            wildcardListeners = new HashSet<EventListener>();
        }

        ret.addAll(wildcardListeners);

        return ret;
    }

    private void addListener(EventListener listener) {
        if (listeners == null) {
            listeners = new HashSet<EventListener>();
        }

        // Don't allow duplicate listener registrations Set will handle this for me, but then I can't log it
        if (!listeners.contains(listener)) {
            listeners.add(listener); // Add the listener to the list
        } else {
            //log.info(String.format("Ignoring second request to register listener %s for subject %s",
            //                       listener.getIdentifier(), getSubject()));
        }
    }

    private void addWildcardListener(EventListener listener) {
        if (wildcardListeners == null) {
            wildcardListeners = new HashSet<EventListener>();
        }

        // Don't allow duplicate listener registrations Set will handle this for me, but then I can't log it
        if (!wildcardListeners.contains(listener)) {
            wildcardListeners.add(listener); // Add the listener to the list
        } else {
            //log.info(String.format("Ignoring second request to register wildcardListeners %s for subject %s.*",
                                   //listener.getIdentifier(), getSubject()));
        }
    }

    private boolean hasWildcardListeners() {
        return wildcardListeners != null && !wildcardListeners.isEmpty();
    }

    private EventListenerTree getChild(String pathElement) {
        EventListenerTree ret = null;

        if (children != null) {
            for (EventListenerTree n : children) {
                if (n.getPathElement().equals(pathElement)) {
                    ret = n;
                    break;
                }
            }
        }

        return ret;
    }

    private void addChild(EventListenerTree child) {
        if (children == null) {
            children = new ArrayList<EventListenerTree>();
        }

        children.add(child);
    }

}
