package org.motechproject.ivr.kookoo;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.powermock.api.mockito.PowerMockito.when;

public class KooKooIVRContextTest {
    @Mock
    private HttpServletRequest request;
    @Mock
    private HttpSession session;

    @Before
    public void setUp() {
        initMocks(this);
    }

    @Test
    public void shouldAddTreeToListOfCompletedTrees(){
        when(request.getSession()).thenReturn(session);
        List<String> completedTrees = new ArrayList<String>() {{
            this.add("tree1");
        }};
        when(session.getAttribute(KooKooIVRContext.LIST_OF_COMPLETED_TREES)).thenReturn(completedTrees);
        KooKooIVRContext kooKooIVRContext = new KooKooIVRContext(null, request, null);
        kooKooIVRContext.addToListOfCompletedTrees("lastTreeName");
        verify(session).setAttribute(KooKooIVRContext.LIST_OF_COMPLETED_TREES, completedTrees);
        assertTrue(completedTrees.contains("tree1"));
        assertTrue(completedTrees.contains("lastTreeName"));
    }

    @Test
    public void shouldAddFirstTreeToListOfCompletedTrees(){
        when(request.getSession()).thenReturn(session);
        when(session.getAttribute(KooKooIVRContext.LIST_OF_COMPLETED_TREES)).thenReturn(null);
        ArgumentCaptor<ArrayList> valueCaptor = ArgumentCaptor.forClass(ArrayList.class);
        ArgumentCaptor<String> keyCaptor = ArgumentCaptor.forClass(String.class);

        KooKooIVRContext kooKooIVRContext = new KooKooIVRContext(null, request, null);
        kooKooIVRContext.addToListOfCompletedTrees("lastTreeName");

        verify(session).setAttribute(keyCaptor.capture(), valueCaptor.capture());
        assertEquals(KooKooIVRContext.LIST_OF_COMPLETED_TREES, keyCaptor.getAllValues().get(0));
        assertEquals(1, valueCaptor.getValue().size());
        assertTrue(valueCaptor.getValue().contains("lastTreeName"));
    }
}