package org.motechproject.ivr.kookoo.domain;

import org.motechproject.decisiontree.model.*;
import org.motechproject.ivr.kookoo.KookooIVRResponseBuilder;

import java.util.List;

public class DecisionTreeBasedResponseBuilder {
    public KookooIVRResponseBuilder ivrResponse(Node node, Object customData, KookooIVRResponseBuilder ivrResponseBuilder, boolean retryOnIncorrectUserAction) {
        List<Prompt> prompts = node.getPrompts();
        for (Prompt prompt : prompts) {
            boolean isAudioPrompt = prompt.getClass().equals(AudioPrompt.class);
            boolean shouldNotBuildPrompt = retryOnIncorrectUserAction && isAudioPrompt;
            if (shouldNotBuildPrompt) continue;
            ITreeCommand command = prompt.getCommand();
            boolean isAudioPromptOrMenuAudioPrompt = prompt instanceof AudioPrompt;
            boolean isDialPrompt = prompt instanceof TextToSpeechPrompt;
            buildPrompts(ivrResponseBuilder, isAudioPromptOrMenuAudioPrompt, isDialPrompt, command == null ? new String[]{prompt.getName()} : command.execute(customData));
        }
        if (node.hasTransitions()) {
            ivrResponseBuilder.collectDtmfLength(maxLenOfTransitionOptions(node));
        }
        return ivrResponseBuilder;
    }

    private int maxLenOfTransitionOptions(Node node) {
        int maxLen = 0;
        for (String key : node.getTransitions().keySet()) {
            if (maxLen < key.length()) maxLen = key.length();
        }
        return maxLen;
    }

    private void buildPrompts(KookooIVRResponseBuilder ivrResponseBuilder, boolean isAudioPrompt, boolean isTextToSpeechPrompt, String... promptNames) {
        if (isAudioPrompt) ivrResponseBuilder.withPlayAudios(promptNames);
        else if(isTextToSpeechPrompt) ivrResponseBuilder.withPlayTexts(promptNames);
    }
}
