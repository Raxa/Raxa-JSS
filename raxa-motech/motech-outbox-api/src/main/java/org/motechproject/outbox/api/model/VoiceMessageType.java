package org.motechproject.outbox.api.model;


/**
 *
 */
public class VoiceMessageType {
    private String voiceMessageTypeName;
    private MessagePriority priority;
    private String templateName;
    private boolean canBeSaved; // indicates if this type of messages allowed to be saved by patients in they voice outbox
    private boolean canBeReplayed; // indicates if this type of messages allowed to be replayed by a patient request after been played once

    public String getVoiceMessageTypeName() {
        return voiceMessageTypeName;
    }

    public void setVoiceMessageTypeName(String voiceMessageTypeName) {
        this.voiceMessageTypeName = voiceMessageTypeName;
    }

    public MessagePriority getPriority() {
        return priority;
    }

    public void setPriority(MessagePriority priority) {
        this.priority = priority;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public boolean isCanBeSaved() {
        return canBeSaved;
    }

    public void setCanBeSaved(boolean canBeSaved) {
        this.canBeSaved = canBeSaved;
    }

    public boolean isCanBeReplayed() {
        return canBeReplayed;
    }

    public void setCanBeReplayed(boolean canBeReplayed) {
        this.canBeReplayed = canBeReplayed;
    }


    @Override
    public String toString() {
        return "VoiceMessageType{" +
                "voiceMessageTypeName='" + voiceMessageTypeName + '\'' +
                ", priority=" + priority +
                ", templateName='" + templateName + '\'' +
                ", canBeSaved=" + canBeSaved +
                ", canBeReplayed=" + canBeReplayed +
                '}';
    }


}
