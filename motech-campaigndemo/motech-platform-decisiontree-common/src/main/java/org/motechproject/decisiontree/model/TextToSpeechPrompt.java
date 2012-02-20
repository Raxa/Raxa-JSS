package org.motechproject.decisiontree.model;


/**
 *
 */
public class TextToSpeechPrompt extends Prompt {

    private String message;
    
    public String getMessage() {
        return message;
    }

    public TextToSpeechPrompt setMessage(String message) {
        this.message = message;
        return this;
    }

    @Override
    public String toString() {
        return "TextToSpeechPrompt{" +
                "message='" + message + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        TextToSpeechPrompt that = (TextToSpeechPrompt) o;

        if (message != null ? !message.equals(that.message) : that.message != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (message != null ? message.hashCode() : 0);
        return result;
    }
}
