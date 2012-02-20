package org.motechproject.decisiontree.model;


public class Action {
    private String eventId;

    public static class Builder {
    	private Action obj;
		public Builder() {
			obj = new Action();
		} 
		public Action build() {
			return obj;
		}
	    public Builder setEventId(String eventId) {
	    	obj.eventId = eventId;
	    	return this;
	    }
    }
    public static Builder newBuilder() {
    	return new Builder();
    }
    
    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    @Override
    public String toString() {
        return "Action{" +
                "eventId='" + eventId + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Action action = (Action) o;

        if (eventId != null ? !eventId.equals(action.eventId) : action.eventId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return eventId != null ? eventId.hashCode() : 0;
    }
}
