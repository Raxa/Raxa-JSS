package org.motechproject.decisiontree.model;

import org.codehaus.jackson.annotate.JsonTypeInfo;
import org.codehaus.jackson.map.annotate.JsonTypeIdResolver;
import org.codehaus.jackson.map.jsontype.impl.TypeNameIdResolver;
import org.codehaus.jackson.map.type.TypeFactory;
import org.codehaus.jackson.type.JavaType;

import java.util.HashMap;


/**
 *
 */
@JsonTypeInfo(use=JsonTypeInfo.Id.NAME, include=JsonTypeInfo.As.PROPERTY, property="@type")
@JsonTypeIdResolver(Prompt.PromptResolver.class)
public abstract class Prompt {
	protected ITreeCommand command;

	public static class PromptResolver extends TypeNameIdResolver {
		static HashMap<String, String> typeToId = new HashMap<String, String>();
		static HashMap<String, JavaType> idToType = new HashMap<String, JavaType>();
		{
			typeToId.put(TextToSpeechPrompt.class.getName(), "text");
			typeToId.put(AudioPrompt.class.getName(), "audio");
			idToType.put("text", TypeFactory.fastSimpleType(TextToSpeechPrompt.class));
			idToType.put("audio", TypeFactory.fastSimpleType(AudioPrompt.class));
		}
		public PromptResolver() {
			super(TypeFactory.fastSimpleType(Prompt.class), typeToId, idToType);
		}
	}

    private String name;

    public String getName() {
        return name;
    }

    public Prompt setName(String name) {
        this.name = name;
        return this;
    }

    public ITreeCommand getCommand() {
        return command;
    }

    public Prompt setCommand(ITreeCommand command) {
        this.command = command;
        return this;
    }

    @Override
    public String toString() {
        return "Prompt{" +
                "name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Prompt prompt = (Prompt) o;

        if (name != null ? !name.equals(prompt.name) : prompt.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }
}
