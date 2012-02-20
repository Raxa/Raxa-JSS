package org.motechproject.context;

import org.ektorp.CouchDbInstance;
import org.motechproject.server.event.EventListenerRegistry;
import org.motechproject.gateway.MotechSchedulerGateway;
import org.motechproject.metrics.MetricsAgent;
import org.motechproject.server.ruleengine.KnowledgeBaseManager;
import org.motechproject.ivr.service.IVRService;
import org.springframework.beans.factory.annotation.Autowired;

public class Context {
	
	@Autowired
	private EventListenerRegistry eventListenerRegistry;
	
	@Autowired(required=false)
	private KnowledgeBaseManager knowledgeBaseManager;
	
	@Autowired(required=false)
	private MotechSchedulerGateway motechSchedulerGateway;
	
	@Autowired(required = false)
	private CouchDbInstance couchDbInstance;

    @Autowired(required=false)
    private MetricsAgent metricsAgent;

    @Autowired(required=false)
    private IVRService ivrService;

    public IVRService getIvrService()
    {
        return ivrService;
    }

    public void setIvrService(IVRService ivrService)
    {
        this.ivrService = ivrService;
    }

    public MetricsAgent getMetricsAgent() {
        return metricsAgent;
    }

    public void setMetricsAgent(MetricsAgent metricsAgent) {
        this.metricsAgent = metricsAgent;
    }

	public CouchDbInstance getCouchDbInstance(){
		return couchDbInstance;
	}

	public void setCouchDbInstance(CouchDbInstance couchDbInstance) {
		this.couchDbInstance = couchDbInstance;
	}

	public MotechSchedulerGateway getMotechSchedulerGateway() {
		return motechSchedulerGateway;
	}

	public void setMotechSchedulerGateway(
			MotechSchedulerGateway motechSchedulerGateway) {
		this.motechSchedulerGateway = motechSchedulerGateway;
	}

	public KnowledgeBaseManager getKnowledgeBaseManager() {
		return knowledgeBaseManager;
	}

	public void setKnowledgeBaseManager(KnowledgeBaseManager knowledgeBaseManager) {
		this.knowledgeBaseManager = knowledgeBaseManager;
	}

	public EventListenerRegistry getEventListenerRegistry() {
		return eventListenerRegistry;
	}

	public void setEventListenerRegistry(EventListenerRegistry eventListenerRegistry) {
		this.eventListenerRegistry = eventListenerRegistry;
	}

	public static Context getInstance(){
		return instance;
	}
	
	private static Context instance = new Context();
	
	private Context(){}

	
}
