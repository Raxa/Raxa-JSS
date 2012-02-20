package org.motechproject.decisiontree.model;

import org.apache.commons.lang.ArrayUtils;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.*;

/**
 *
 */
public class Node {

    private List<Action> actionsBefore;
    private List<Action> actionsAfter;
    private List<Prompt> prompts = new ArrayList<Prompt>();
    private Map<String, Transition> transitions;
    private List<ITreeCommand> treeCommands = new ArrayList<ITreeCommand>();

    public List<Action> getActionsBefore() {
        return actionsBefore == null ? Collections.<Action>emptyList() : actionsBefore;
    }

    public Node setActionsBefore(List<Action> actionsBefore) {
        this.actionsBefore = actionsBefore;
        return this;
    }

    public List<Action> getActionsAfter() {
        return actionsAfter == null ? Collections.<Action>emptyList() : actionsAfter;
    }

    public Node setActionsAfter(List<Action> actionsAfter) {
        this.actionsAfter = actionsAfter;
        return this;
    }

    public List<Prompt> getPrompts() {
        return prompts;
    }

    @JsonIgnore
    public Node setPrompts(Prompt... prompts) {
        setPrompts(Arrays.asList(prompts));
        return this;
    }

    @JsonIgnore
    public Node addPrompts(Prompt... prompts) {
        this.prompts.addAll(Arrays.asList(prompts));
        return this;
    }

    private Node setPrompts(List<Prompt> prompts) {
        this.prompts.addAll(prompts);
        return this;
    }

    public Map<String, Transition> getTransitions() {
        return transitions == null ? Collections.<String, Transition>emptyMap() : transitions;
    }

    /**
     * @param transitions an Object[][] array containing {Key,Transition} array pairs
     * @return a Builder
     */
    @JsonIgnore
    @SuppressWarnings("unchecked")
    public Node setTransitions(Object[][] transitions) {
        this.transitions = ArrayUtils.toMap(transitions);
        return this;
    }

    public Node setTransitions(Map<String, Transition> transitions) {
        this.transitions = transitions;
        return this;
    }

    @JsonIgnore
    public List<ITreeCommand> getTreeCommands() {
        return treeCommands;
    }

    public Node setTreeCommands(ITreeCommand... treeCommands) {
        for (ITreeCommand treeCommand : treeCommands) {
            this.treeCommands.add(treeCommand);
        }
        return this;
    }

    public Node addTransition(String transitionKey, Transition transition) {
        if (transitions == null) {
            transitions = new HashMap<String, Transition>();
        }
        transitions.put(transitionKey, transition);
        return this;
    }

    @JsonIgnore
    public boolean hasTransitions() {
        return transitions != null && !transitions.isEmpty();
    }

    @Override
    public String toString() {
        return "Node{" +
                "actionsBefore=" + actionsBefore +
                ", actionsAfter=" + actionsAfter +
                ", prompts=" + prompts +
                ", transitions=" + transitions +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Node node = (Node) o;

        if (actionsAfter != null ? !actionsAfter.equals(node.actionsAfter) : node.actionsAfter != null) return false;
        if (actionsBefore != null ? !actionsBefore.equals(node.actionsBefore) : node.actionsBefore != null)
            return false;
        if (prompts != null ? !prompts.equals(node.prompts) : node.prompts != null) return false;
        if (transitions != null ? !transitions.equals(node.transitions) : node.transitions != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = actionsBefore != null ? actionsBefore.hashCode() : 0;
        result = 31 * result + (actionsAfter != null ? actionsAfter.hashCode() : 0);
        result = 31 * result + (prompts != null ? prompts.hashCode() : 0);
        result = 31 * result + (transitions != null ? transitions.hashCode() : 0);
        return result;
    }
}
