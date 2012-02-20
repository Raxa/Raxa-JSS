package org.motechproject.util;

import org.apache.commons.lang.SerializationUtils;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.Serializable;

public class SerializationUtil {
    static private BASE64Encoder encode = new BASE64Encoder();
    static private BASE64Decoder decode = new BASE64Decoder();

    public static String toString(Serializable obj) {
        if (obj == null) return null;

        byte[] bytes = SerializationUtils.serialize(obj);
        return encode.encode(bytes);
    }

    public static Object toObject(String str) {
        Object out = null;
        try {
            return SerializationUtils.deserialize(decode.decodeBuffer(str));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return out;
    }
}