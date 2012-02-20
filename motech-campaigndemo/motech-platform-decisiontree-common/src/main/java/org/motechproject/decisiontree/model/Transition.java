package org.motechproject.decisiontree.model;


import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 *
 */
public class Transition {

    private String name;
    private Node destinationNode;
    private List<Action> actions;

    public String getName() {
        return name;
    }

    public Transition setName(String name) {
        this.name = name;
        return this;
    }

    public Node getDestinationNode() {
        return destinationNode;
    }

    public Transition setDestinationNode(Node destinationNode) {
        this.destinationNode = destinationNode;
        return this;
    }

    public List<Action> getActions() {
        return actions == null ? Collections.<Action>emptyList() : actions;
    }

    public Transition setActions(Action... actions) {
        this.actions = Arrays.asList(actions);
        return this;
    }

    @Override
    public String toString() {
        return "Transition{" +
                "name='" + name + '\'' +
                ", destinationNode=" + destinationNode +
                ", actions=" + actions +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Transition that = (Transition) o;

        if (actions != null ? !actions.equals(that.actions) : that.actions != null) return false;
        if (destinationNode != null ? !destinationNode.equals(that.destinationNode) : that.destinationNode != null)
            return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (destinationNode != null ? destinationNode.hashCode() : 0);
        result = 31 * result + (actions != null ? actions.hashCode() : 0);
        return result;
    }
}
