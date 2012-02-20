package org.motechproject.server.ruleengine;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import java.io.File;

import org.junit.Test;
import org.motechproject.server.osgi.OsgiFrameworkService;

public class FilesystemRuleLoaderTest {
	
	@Test
    public void loadTest() throws Exception {
		FilesystemRuleLoader loader = new FilesystemRuleLoader();
		OsgiFrameworkService ofs = mock(OsgiFrameworkService.class);
		KnowledgeBaseManager kbm = mock(KnowledgeBaseManager.class);
		loader.setInternalRuleFolder("/rules");
		loader.setOsgiFrameworkService(ofs);
		loader.setKnowledgeBaseManager(kbm);
		loader.load();
		verify(kbm).addOrUpdateRule(any(File.class), any(ClassLoader.class));
	}
}
