/**
 * MOTECH PLATFORM OPENSOURCE LICENSE AGREEMENT
 *
 * Copyright (c) 2011 Grameen Foundation USA.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Grameen Foundation USA, nor its respective contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY GRAMEEN FOUNDATION USA AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL GRAMEEN FOUNDATION USA OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 * OF SUCH DAMAGE.
 */
package org.motechproject.server.decisiontree;

import org.motechproject.decisiontree.model.Node;
import org.motechproject.decisiontree.model.Transition;
import org.motechproject.decisiontree.model.Tree;

/**
 * Responsible for locating a tree Node by transitionPath
 * @author yyonkov
 *
 */
public class TreeNodeLocator {
	
	public static final String PATH_DELIMITER = "/";

    /**
	 * @param tree not null
	 * @param path not null
	 * @return null if node not found
	 */
	public Node findNode(Tree tree, String path) {
		if(tree==null || path==null) {
			throw new IllegalArgumentException(String.format("tree: %s path: %s", tree, path));
		}
		Node node = tree.getRootNode();
		if(node!=null) {
			String[] keys = path.split(PATH_DELIMITER);
			for(String key : keys) {
				if(key.isEmpty()) continue;
				Transition transition=node.getTransitions().get(key);
				if(transition==null) return null;
				node = transition.getDestinationNode();
				if(node==null) return null;
			}
		}
		return node;
	}
}
