package org.motechproject.mobileforms.api.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

public class TestUtilities {

    public static <T> List<T[]> slice(T[] array, int index){
        List<T[]> arrayList = new ArrayList<T[]>();
        T[] slice1 = Arrays.copyOfRange(array, 0, index);
        T[] slice2 = Arrays.copyOfRange(array, index, array.length);
        arrayList.add(slice1);
        arrayList.add(slice2);
        return arrayList;
    }

    public static Byte[] toObjectByteArray(byte[] bytes){
        Byte[] bytesAsObjects = new Byte[bytes.length];
        for(int i=0; i<bytes.length; i++){
            bytesAsObjects[i] = bytes[i];
        }
        return bytesAsObjects;
    }

    public static byte[] toPrimitive(Byte[] bytes){
        byte[] bytesAsPrimitives = new byte[bytes.length];
        for(int i=0; i<bytes.length; i++){
            bytesAsPrimitives[i] = bytes[i];
        }
        return bytesAsPrimitives;
    }

    public static byte[] readFully(InputStream input) throws IOException {
        byte[] buffer = new byte[8192];
        int bytesRead;
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        while ((bytesRead = input.read(buffer)) != -1) {
            output.write(buffer, 0, bytesRead);
        }
        return output.toByteArray();
    }

    public static Properties setupProperties(String name, String value) {
        Properties properties = new Properties();
        properties.setProperty(name, value);
        return properties;
    }

}
