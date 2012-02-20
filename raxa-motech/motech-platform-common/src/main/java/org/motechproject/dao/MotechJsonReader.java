package org.motechproject.dao;

import com.google.gson.*;
import org.apache.commons.io.IOUtils;
import org.motechproject.MotechException;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class MotechJsonReader {
    private static Map<Type, Object> standardTypeAdapters = new HashMap<Type, Object>();

    static {
        standardTypeAdapters.put(Date.class, new DateDeserializer());
    }

    public Object readFromFile(String classpathFile, Type ofType) {
        InputStream inputStream = getClass().getResourceAsStream(classpathFile);
        if (inputStream == null) {
            throw new MotechException("File not found in classpath: " + classpathFile);
        }
        try {
            String jsonText = IOUtils.toString(inputStream);
            return from(jsonText, ofType, standardTypeAdapters);
        } catch (IOException e) {
            throw new JsonIOException(e);
        }
    }

    public Object readFromString(String text, Type ofType) {
        return from(text, ofType, standardTypeAdapters);
    }

    private Object from(String text, Type ofType, Map<Type, Object> typeAdapters) {
        GsonBuilder gsonBuilder = new GsonBuilder();
        for (Map.Entry<Type, Object> entry : typeAdapters.entrySet()) {
            gsonBuilder.registerTypeAdapter(entry.getKey(), entry.getValue());
        }
        Gson gson = gsonBuilder.create();
        return gson.fromJson(text, ofType);
    }

    private static class DateDeserializer implements JsonDeserializer<Date> {
        public Date deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
            JsonPrimitive asJsonPrimitive = json.getAsJsonPrimitive();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date date = null;
            try {
                date = format.parse(asJsonPrimitive.getAsString());
            } catch (ParseException e) {
                // TODO
            }
            return date;
        }
    }
}
