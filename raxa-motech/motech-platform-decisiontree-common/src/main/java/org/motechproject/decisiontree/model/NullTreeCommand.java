package org.motechproject.decisiontree.model;

public class NullTreeCommand implements ITreeCommand {
    @Override
    public String[] execute(Object obj) {
        return new String[0];
    }
}
