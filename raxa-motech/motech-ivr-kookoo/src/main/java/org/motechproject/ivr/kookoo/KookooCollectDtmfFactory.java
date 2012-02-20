package org.motechproject.ivr.kookoo;

import com.ozonetel.kookoo.CollectDtmf;

public class KookooCollectDtmfFactory {
    public static CollectDtmf create() {
        return new CollectDtmf();
    }
}
