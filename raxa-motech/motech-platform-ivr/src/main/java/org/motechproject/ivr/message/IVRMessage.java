package org.motechproject.ivr.message;

public interface IVRMessage {

	public String getText(String key);

	public String getWav(String key, String preferredLangCode);
}