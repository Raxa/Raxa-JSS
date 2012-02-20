package org.motechproject.decisiontree.model;

public class AudioPrompt extends Prompt {

    private String audioFileUrl;
    private String altMessage; //Text To Speech Alternate if audio file not available

    public String getAudioFileUrl() {
        return audioFileUrl;
    }

    public AudioPrompt setAudioFileUrl(String audioFileUrl) {
        this.audioFileUrl = audioFileUrl;
        return this;
    }

    public String getAltMessage() {
        return altMessage;
    }

    public AudioPrompt setAltMessage(String altMessage) {
        this.altMessage = altMessage;
        return this;
    }

    @Override
    public String toString() {
        return "AudioPrompt{" +
                "audioFileUrl='" + audioFileUrl + '\'' +
                ", altMessage='" + altMessage + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        AudioPrompt that = (AudioPrompt) o;

        if (altMessage != null ? !altMessage.equals(that.altMessage) : that.altMessage != null) return false;
        if (audioFileUrl != null ? !audioFileUrl.equals(that.audioFileUrl) : that.audioFileUrl != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (audioFileUrl != null ? audioFileUrl.hashCode() : 0);
        result = 31 * result + (altMessage != null ? altMessage.hashCode() : 0);
        return result;
    }
}
