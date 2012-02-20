package org.motechproject.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

public class Cookies {
    private HttpServletRequest request;
    private HttpServletResponse response;

    public Cookies(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
    }

    public static Cookies forReading(HttpServletRequest request) {
        return new Cookies(request, null);
    }

    public void add(String name, String value) {
        request.setAttribute(name, value);
        response.addCookie(new Cookie(name, value));
    }

    private Cookie cookie(String cookieName) {
        Cookie[] cookies = getCookies();
        for (Cookie cookie : cookies) {
            if (cookieName.equals(cookie.getName())) return cookie;
        }
        return null;
    }

    private Cookie[] getCookies() {
        Cookie[] cookies = request.getCookies();
        return cookies == null ? new Cookie[0] : cookies;
    }

    public String getValue(String cookieName) {
        Cookie cookie = cookie(cookieName);
        return cookie == null ? (String) request.getAttribute(cookieName) : cookie.getValue();
    }

    public boolean hasCookie(String key) {
        return cookie(key) != null;
    }

    @Override
    public String toString() {
        StringBuilder buffer = new StringBuilder();
        buffer.append("Cookies {");
        for (Cookie cookie : getCookies()) {
            buffer.append(cookie.getName()).append(" = ").append(cookie.getValue()).append(";  ");
        }
        buffer.append("}");
        return buffer.toString();
    }
}
