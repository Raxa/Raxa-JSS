package org.motechproject.mobileforms.api.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.mobileforms.api.utils.Encoder;
import org.motechproject.mobileforms.api.utils.TestUtilities;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class UsersServiceImplTest {

    private UsersService usersService;

    @Mock
    private Encoder passwordEncoder;

    @Before
    public void setUp() {
        initMocks(this);
        usersService = new UsersServiceImpl(TestUtilities.setupProperties("forms.user.accounts", "motech|ghs|7357658437bd298b4a48b7357489357,guyzb|daniel123|135df6eacf3e3f21866ecff10378035edbf7"), passwordEncoder);
    }

    @Test
    public void shouldReturnAllUserAccountDetails() {
        String encodedPasswordForMotech = "EncodedPasswordForMotech";
        String encodedPasswordForguyzb = "EncodedPasswordForguyzb ";

        String saltForMotech = "7357658437bd298b4a48b7357489357";
        String saltForGuyZb = "135df6eacf3e3f21866ecff10378035edbf7";

        when(passwordEncoder.sha("ghs", saltForMotech)).thenReturn(encodedPasswordForMotech);
        when(passwordEncoder.sha("daniel123", saltForGuyZb)).thenReturn(encodedPasswordForguyzb);

        List<Object[]> users = usersService.getUsers();

        assertThat(users.size(), is(equalTo(2)));
        assertThat((Integer)users.get(0)[0], is(equalTo(1)));
        assertThat((String)users.get(0)[1], is(equalTo("motech")));
        assertThat((String)users.get(0)[2], is(equalTo(encodedPasswordForMotech)));
        assertThat((String)users.get(0)[3], is(equalTo(saltForMotech)));

        assertThat((Integer)users.get(1)[0], is(equalTo(2)));
        assertThat((String)users.get(1)[1], is(equalTo("guyzb")));
        assertThat((String)users.get(1)[2], is(equalTo(encodedPasswordForguyzb)));
        assertThat((String)users.get(1)[3], is(equalTo(saltForGuyZb)));

    }
}
