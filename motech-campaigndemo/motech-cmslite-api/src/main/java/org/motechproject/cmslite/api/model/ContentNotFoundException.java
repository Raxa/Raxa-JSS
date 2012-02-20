package org.motechproject.cmslite.api.model;


public class ContentNotFoundException extends Exception{

    public ContentNotFoundException(){
        super("Content with specified Name and Language does not exist");
    }
}
