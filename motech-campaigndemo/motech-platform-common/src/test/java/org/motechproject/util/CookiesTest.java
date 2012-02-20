package org.motechproject.util;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.Mock;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static junit.framework.Assert.assertEquals;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.mockito.Mockito.*;

public class CookiesTest {
    @Mock
    private HttpServletRequest request;
    @Mock
    private HttpServletResponse response;
    private Cookies cookies;

    @Before
    public void setUp() {
        initMocks(this);
        cookies = new Cookies(request, response);
    }

    @Test
    public void addCookie() {
        Cookie cookie = new Cookie("foo", "bar");
        cookies.add(cookie.getName(), cookie.getValue());
        verify(response).addCookie(any(Cookie.class));
    }

    @Test
    public void getCookieValueWhenInTheSameRequest() {
        Cookie cookie = new Cookie("foo", "bar");
        when(request.getAttribute("foo")).thenReturn("bar");
        cookies.add(cookie.getName(), cookie.getValue());
        assertEquals(cookie.getValue(), cookies.getValue(cookie.getName()));
    }

    @Test
    public void getCookieValueButTheValueNotSet() {
        when(request.getAttribute("foo")).thenReturn(null);
        assertEquals(null, cookies.getValue("foo"));
    }
}
