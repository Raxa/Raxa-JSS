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
import org.raxa.module.raxacore.DrugInventory;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.db.DrugInventoryDAO;
import org.raxa.module.raxacore.db.PatientListDAO;

public class HibernateDrugInventoryDAO implements DrugInventoryDAO {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public DrugInventory saveDrugInventory(DrugInventory drugInventory) throws DAOException {
		
		sessionFactory.getCurrentSession().saveOrUpdate(drugInventory);
		return drugInventory;
	}
	
	public void deleteDrugInventory(DrugInventory drugInventory) throws DAOException {
		
		sessionFactory.getCurrentSession().delete(drugInventory);
	}
	
	public DrugInventory getDrugInventoryByUuid(String uuid) {
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DrugInventory.class);
		criteria.add(Restrictions.eq("uuid", uuid));
		System.out.println("///////"+criteria.uniqueResult());
		return (DrugInventory) criteria.uniqueResult();
	}
	
	public List<DrugInventory> getAllDrugInventories() throws DAOException {
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DrugInventory.class);
		return criteria.list();
		
	}
	
	public List<DrugInventory> getAllDrugInventoriesByStatus(String status) {
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DrugInventory.class);
		criteria.add(Restrictions.eq("status", status));
		List<DrugInventory> drugInventories = new ArrayList<DrugInventory>();
		drugInventories.addAll(criteria.list());
		return drugInventories;
		
	}
	
	public DrugInventory updateDrugInventory(DrugInventory drugInventory) {
		
		sessionFactory.getCurrentSession().update(drugInventory);
		return drugInventory;
	}
	
	public List<DrugInventory> getDrugInventoryByProvider(Integer providerId) {
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DrugInventory.class);
		criteria.add(Restrictions.eq("providerId", providerId));
		List<DrugInventory> drugInventories = new ArrayList<DrugInventory>();
		drugInventories.addAll(criteria.list());
		return drugInventories;
	}
	
}
