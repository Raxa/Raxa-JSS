package org.motechproject.openmrs.services;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.openmrs.Concept;
import org.openmrs.api.ConceptService;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.mock;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.springframework.test.util.ReflectionTestUtils.setField;

public class OpenMRSConceptAdapterTest {

    @Mock
    ConceptService conceptService;

    OpenMRSConceptAdapter adapter;

    @Before
    public void setUp() {
        initMocks(this);
        adapter = new OpenMRSConceptAdapter();
        setField(adapter, "conceptService", conceptService);
    }
    
    @Test
    public void shouldFetchConceptByName() {

        String concept = "concept1";
        Concept openMRSConcept = mock(Concept.class);
        when(conceptService.getConcept(concept)).thenReturn(openMRSConcept);
        assertThat(adapter.getConceptByName(concept), is(openMRSConcept));
    }
}
