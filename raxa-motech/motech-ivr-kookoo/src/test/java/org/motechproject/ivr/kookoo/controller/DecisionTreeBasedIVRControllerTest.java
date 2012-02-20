package org.motechproject.ivr.kookoo.controller;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.decisiontree.model.*;
import org.motechproject.ivr.kookoo.KooKooIVRContextForTest;
import org.motechproject.ivr.kookoo.extensions.CallFlowController;
import org.motechproject.ivr.kookoo.service.KookooCallDetailRecordsService;
import org.motechproject.ivr.message.IVRMessage;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class DecisionTreeBasedIVRControllerTest {
    @Mock
    private IVRMessage ivrMessage;
    @Mock
    private CallFlowController callFlowController;
    @Mock
    private KookooCallDetailRecordsService callDetailRecordsService;
    @Mock
    private StandardResponseController standardResponseController;

    KooKooIVRContextForTest ivrContext;
    private DecisionTreeBasedIVRController controller;
    private DecisionTreeBasedIVRControllerTest.CommandForTamaIvrActionTest commandForTamaIvrActionTest;

    @Before
    public void setup() {
        initMocks(this);
        ivrContext = new KooKooIVRContextForTest();
        String treeName = "TestTree";
        ivrContext.treeName(treeName);
        ivrContext.callId("12312");
        commandForTamaIvrActionTest = new CommandForTamaIvrActionTest();

        when(callFlowController.getTree(treeName, ivrContext)).thenReturn(new TestTreeForTamaIvrActionTest().getTree());
        controller = new DecisionTreeBasedIVRController(callFlowController, ivrMessage, callDetailRecordsService, standardResponseController);
    }

    @Test
    public void shouldExecuteCommandIfNextNodeIsNotNull() {
        controller.gotDTMF(ivrContext);
        assertTrue(commandForTamaIvrActionTest.isCalled());
    }

    @Test
    public void shouldExecuteSameCommandIfTransitionIsInvalid() {
        controller.gotDTMF(ivrContext);
        ivrContext.userInput("4");
        controller.gotDTMF(ivrContext);
        commandForTamaIvrActionTest.setCalled(false);
        assertFalse(commandForTamaIvrActionTest.isCalled());
    }

    @Test
    public void shouldChangeCurrentNodePath() {
        ivrContext.userInput("1");
        controller.gotDTMF(ivrContext);
        assertEquals("/1", ivrContext.currentTreePosition());
    }

    @Test
    public void shouldNotChangeCurrentTreePositionWhenUserInputIsInvalid() {
        ivrContext.userInput("56").currentDecisionTreePath("/1");
        controller.gotDTMF(ivrContext);
        assertEquals("/1", ivrContext.currentTreePosition());
    }

    @Test
    public void shouldNotExecuteCommandIfThereIsNoUserInput() {
        ivrContext.currentDecisionTreePath("/");
        controller.gotDTMF(ivrContext);
        assertFalse(commandForTamaIvrActionTest.isCalled());
    }

    class TestTreeForTamaIvrActionTest {
        protected Node createRootNode() {
            return new Node()
                    .setPrompts(new AudioPrompt().setName("foo"))
                    .setTreeCommands(commandForTamaIvrActionTest)
                    .setTransitions(
                            new Object[][]{
                                    {
                                            "1",
                                            new Transition().setDestinationNode(
                                                    new Node().setPrompts(new MenuAudioPrompt().setName("bar"))
                                                            .setTransitions(
                                                                    new Object[][]{
                                                                            {
                                                                                    "1",
                                                                                    new Transition().setDestinationNode(
                                                                                            new Node().setPrompts(new AudioPrompt().setName("bar")))},
                                                                            {
                                                                                    "2",
                                                                                    new Transition().setDestinationNode(
                                                                                            new Node().setPrompts(new AudioPrompt().setName("baz")))}}))},
                                    {
                                            "2",
                                            new Transition().setDestinationNode(
                                                    new Node().setPrompts(new AudioPrompt().setName("baz")))
                                    }});
        }

        public Tree getTree() {
            return new Tree()
                    .setName(this.getClass().getName())
                    .setRootNode(createRootNode());
        }
    }

    class CommandForTamaIvrActionTest implements ITreeCommand {
        private boolean called;

        @Override
        public String[] execute(Object o) {
            called = true;
            return new String[0];
        }

        public boolean isCalled() {
            return called;
        }

        public void setCalled(boolean called) {
            this.called = called;
        }
    }
}
