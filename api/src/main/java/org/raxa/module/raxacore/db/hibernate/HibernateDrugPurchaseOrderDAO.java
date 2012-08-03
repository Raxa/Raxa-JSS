package org.raxa.module.raxacore.db.hibernate;

/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.openmrs.EncounterType;
import org.openmrs.api.db.DAOException;

import org.raxa.module.raxacore.DrugPurchaseOrder;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.db.DrugPurchaseOrderDAO;

public class HibernateDrugPurchaseOrderDAO implements DrugPurchaseOrderDAO {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public DrugPurchaseOrder saveDrugPurchaseOrder(DrugPurchaseOrder drugPurchaseOrder) {
		
		sessionFactory.getCurrentSession().saveOrUpdate(drugPurchaseOrder);
		return drugPurchaseOrder;
	}
	
	public DrugPurchaseOrder getDrugPurchaseOrderByUuid(String uuid) {
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DrugPurchaseOrder.class);
		criteria.add(Restrictions.eq("uuid", uuid));
		System.out.println(criteria.uniqueResult());
		return (DrugPurchaseOrder) criteria.uniqueResult();
	}
	
	public List<DrugPurchaseOrder> getAllDrugPurchaseOrders() {
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DrugPurchaseOrder.class);
		return criteria.list();
	}
	
	public List<DrugPurchaseOrder> getAllDrugPurchaseOrdersNotReceived() {
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DrugPurchaseOrder.class);
		criteria.add(Restrictions.eq("received", false));
		List<DrugPurchaseOrder> drugPurchaseOrders = new ArrayList<DrugPurchaseOrder>();
		drugPurchaseOrders.addAll(criteria.list());
		return drugPurchaseOrders;
	}
	
	public DrugPurchaseOrder updateDrugPurchaseOrder(DrugPurchaseOrder drugPurchaseOrder) {
		
		sessionFactory.getCurrentSession().update(drugPurchaseOrder);
		return drugPurchaseOrder;
	}
	
	public void deleteDrugPurchaseOrder(DrugPurchaseOrder drugPurchaseOrder) {
		
		sessionFactory.getCurrentSession().delete(drugPurchaseOrder);
	}
	
	public List<DrugPurchaseOrder> getDrugPurchaseOrderByProvider(Integer providerId) {
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DrugPurchaseOrder.class);
		criteria.add(Restrictions.eq("providerId", providerId));
		List<DrugPurchaseOrder> drugPurchaseOrders = new ArrayList<DrugPurchaseOrder>();
		drugPurchaseOrders.addAll(criteria.list());
		return drugPurchaseOrders;
	}
	
}
