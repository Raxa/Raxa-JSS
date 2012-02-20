package org.motechproject.outbox.api.dao.couchdb;

import org.ektorp.ComplexKey;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.support.View;
import org.ektorp.support.Views;
import org.motechproject.dao.MotechBaseRepository;
import org.motechproject.outbox.api.dao.InvalidDataException;
import org.motechproject.outbox.api.dao.OutboundVoiceMessageDao;
import org.motechproject.outbox.api.model.OutboundVoiceMessage;
import org.motechproject.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

/**
 * @author yyonkov
 *
 */
@Component
@Views({
	@View( name = "getPendingMessages", map = "function(doc) { if (doc.partyId && doc.status=='PENDING') { emit([doc.partyId, doc.expirationDate], doc._id); } }"),
	@View( name = "getSavedMessages", map = "function(doc) { if (doc.partyId && doc.status=='SAVED') { emit([doc.partyId, doc.expirationDate], doc._id); } }")
})
public class OutboundVoiceMessageDaoImpl extends
        MotechBaseRepository<OutboundVoiceMessage> implements
		OutboundVoiceMessageDao {
	@Autowired
	protected OutboundVoiceMessageDaoImpl( @Qualifier("outboxDatabase") CouchDbConnector db) {
		super(OutboundVoiceMessage.class, db);
	}
	
	private List<OutboundVoiceMessage> getMessages(String view, String partyId) {
		ComplexKey startKey = ComplexKey.of(partyId, new Date());
		ComplexKey endKey = ComplexKey.of(partyId, DateUtil.now().plusYears(1).toDate());
		ViewQuery q = createQuery(view).startKey(startKey).endKey(endKey).includeDocs(true);
		List<OutboundVoiceMessage> messages = db.queryView(q, OutboundVoiceMessage.class);
		if(messages.size()>0) {
			Collections.sort(messages, new Comparator<OutboundVoiceMessage>() {
				@Override
				public int compare(OutboundVoiceMessage m1, OutboundVoiceMessage m2) {
                    if (m1.getCreationTime() == null ) {
                         throw new InvalidDataException("Invalid object: " + m1 + " Creation time in OutboundVoiceMessage can not be null");
                    }

                    if (m2.getCreationTime() == null ) {
                         throw new InvalidDataException("Invalid object: " + m2 + " Creation time in OutboundVoiceMessage can not be null");
                    }
					int dateComp = m2.getCreationTime().compareTo(m1.getCreationTime());
					if(dateComp!=0) {
						return dateComp;
					}

                    if (m1.getVoiceMessageType() == null ) {
                         throw new InvalidDataException("Invalid object: " + m1 + " Voice Message Type in OutboundVoiceMessage can not be null");
                    }

                    if (m2.getVoiceMessageType() == null ) {
                         throw new InvalidDataException("Invalid object: " + m2 + " Voice Message Type in OutboundVoiceMessage can not be null");
                    }
					return m2.getVoiceMessageType().getPriority().compareTo(m1.getVoiceMessageType().getPriority());
				}
			});
		}
		return messages;
	}

	@Override
	public List<OutboundVoiceMessage> getPendingMessages(String partyId) {
		return getMessages("getPendingMessages", partyId);
	}

	@Override
	public List<OutboundVoiceMessage> getSavedMessages(String partyId) {
		return getMessages("getSavedMessages", partyId);
	}

	@Override
	public int getPendingMessagesCount(String partyId) {
		ComplexKey startKey = ComplexKey.of(partyId, new Date());
		ComplexKey endKey = ComplexKey.of(partyId, DateUtil.now().plusYears(1).toDate());
		ViewQuery q = createQuery("getPendingMessages").startKey(startKey).endKey(endKey);
		return db.queryView(q).getSize();
	}
}
