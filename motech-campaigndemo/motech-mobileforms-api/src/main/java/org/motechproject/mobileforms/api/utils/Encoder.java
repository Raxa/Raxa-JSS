package org.motechproject.mobileforms.api.utils;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Component;

@Component
public class Encoder {
    public String sha(String pass, String salt){
        return rawToHex(DigestUtils.sha(pass + salt));
    }

    // retaining the below function with bug (leading zero missing for single digit hex) to be consistent with the mobile client code
    // can be replaced with Hex.encodeHex once the mobile client code is fixed
	private String rawToHex(byte[] b) {
		if (b == null || b.length < 1)
			return "";
        StringBuilder s = new StringBuilder();
		for (int i = 0; i < b.length; i++) {
			s.append(Integer.toHexString(b[i] & 0xFF));
		}
		return s.toString();
	}
}

