package org.motechproject.decisiontree.model;

public class NodeInfo {
    private String path;
    private Node node;

    public NodeInfo(String path, Node node) {
        this.path = path;
        this.node = node;
    }

    public String path() {
        return path;
    }

    public Node node() {
        return node;
    }
}
