package org.motechproject.decisiontree.model;



/**
 *
 */
public class URLTransition extends Transition{
	String url;

	public URLTransition() {
	}
	
	public URLTransition(String url){
		this.url = url;
	}
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
