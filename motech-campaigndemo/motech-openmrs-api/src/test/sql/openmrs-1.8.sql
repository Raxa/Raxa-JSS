-- MySQL dump 10.13  Distrib 5.1.56, for apple-darwin10.7.0 (i386)
--
-- Host: localhost    Database: openmrs_api_test
-- ------------------------------------------------------
-- Server version	5.1.56

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `active_list`
--

DROP TABLE IF EXISTS `active_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `active_list` (
  `active_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `active_list_type_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `concept_id` int(11) NOT NULL,
  `start_obs_id` int(11) DEFAULT NULL,
  `stop_obs_id` int(11) DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `creator` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`active_list_id`),
  KEY `user_who_voided_active_list` (`voided_by`),
  KEY `user_who_created_active_list` (`creator`),
  KEY `active_list_type_of_active_list` (`active_list_type_id`),
  KEY `person_of_active_list` (`person_id`),
  KEY `concept_active_list` (`concept_id`),
  KEY `start_obs_active_list` (`start_obs_id`),
  KEY `stop_obs_active_list` (`stop_obs_id`),
  CONSTRAINT `stop_obs_active_list` FOREIGN KEY (`stop_obs_id`) REFERENCES `obs` (`obs_id`),
  CONSTRAINT `active_list_type_of_active_list` FOREIGN KEY (`active_list_type_id`) REFERENCES `active_list_type` (`active_list_type_id`),
  CONSTRAINT `concept_active_list` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `person_of_active_list` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`),
  CONSTRAINT `start_obs_active_list` FOREIGN KEY (`start_obs_id`) REFERENCES `obs` (`obs_id`),
  CONSTRAINT `user_who_created_active_list` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_voided_active_list` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_list`
--

LOCK TABLES `active_list` WRITE;
/*!40000 ALTER TABLE `active_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `active_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `active_list_allergy`
--

DROP TABLE IF EXISTS `active_list_allergy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `active_list_allergy` (
  `active_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `allergy_type` varchar(50) DEFAULT NULL,
  `reaction_concept_id` int(11) DEFAULT NULL,
  `severity` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`active_list_id`),
  KEY `reaction_allergy` (`reaction_concept_id`),
  CONSTRAINT `reaction_allergy` FOREIGN KEY (`reaction_concept_id`) REFERENCES `concept` (`concept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_list_allergy`
--

LOCK TABLES `active_list_allergy` WRITE;
/*!40000 ALTER TABLE `active_list_allergy` DISABLE KEYS */;
/*!40000 ALTER TABLE `active_list_allergy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `active_list_problem`
--

DROP TABLE IF EXISTS `active_list_problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `active_list_problem` (
  `active_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(50) DEFAULT NULL,
  `sort_weight` double DEFAULT NULL,
  PRIMARY KEY (`active_list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_list_problem`
--

LOCK TABLES `active_list_problem` WRITE;
/*!40000 ALTER TABLE `active_list_problem` DISABLE KEYS */;
/*!40000 ALTER TABLE `active_list_problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `active_list_type`
--

DROP TABLE IF EXISTS `active_list_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `active_list_type` (
  `active_list_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `creator` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`active_list_type_id`),
  KEY `user_who_retired_active_list_type` (`retired_by`),
  KEY `user_who_created_active_list_type` (`creator`),
  CONSTRAINT `user_who_created_active_list_type` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_active_list_type` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_list_type`
--

LOCK TABLES `active_list_type` WRITE;
/*!40000 ALTER TABLE `active_list_type` DISABLE KEYS */;
INSERT INTO `active_list_type` VALUES (1,'Allergy','An Allergy the Patient may have',1,'2010-05-28 00:00:00',0,NULL,NULL,NULL,'96f4f603-6a99-11df-a648-37a07f9c90fb'),(2,'Problem','A Problem the Patient may have',1,'2010-05-28 00:00:00',0,NULL,NULL,NULL,'a0c7422b-6a99-11df-a648-37a07f9c90fb');
/*!40000 ALTER TABLE `active_list_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cohort`
--

DROP TABLE IF EXISTS `cohort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cohort` (
  `cohort_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `creator` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`cohort_id`),
  UNIQUE KEY `cohort_uuid_index` (`uuid`),
  KEY `user_who_changed_cohort` (`changed_by`),
  KEY `cohort_creator` (`creator`),
  KEY `user_who_voided_cohort` (`voided_by`),
  CONSTRAINT `cohort_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_changed_cohort` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_voided_cohort` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cohort`
--

LOCK TABLES `cohort` WRITE;
/*!40000 ALTER TABLE `cohort` DISABLE KEYS */;
/*!40000 ALTER TABLE `cohort` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cohort_member`
--

DROP TABLE IF EXISTS `cohort_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cohort_member` (
  `cohort_id` int(11) NOT NULL DEFAULT '0',
  `patient_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cohort_id`,`patient_id`),
  KEY `member_patient` (`patient_id`),
  CONSTRAINT `member_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON UPDATE CASCADE,
  CONSTRAINT `parent_cohort` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cohort_member`
--

LOCK TABLES `cohort_member` WRITE;
/*!40000 ALTER TABLE `cohort_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `cohort_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept`
--

DROP TABLE IF EXISTS `concept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept` (
  `concept_id` int(11) NOT NULL AUTO_INCREMENT,
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `short_name` varchar(255) DEFAULT NULL,
  `description` text,
  `form_text` text,
  `datatype_id` int(11) NOT NULL DEFAULT '0',
  `class_id` int(11) NOT NULL DEFAULT '0',
  `is_set` smallint(6) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `version` varchar(50) DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`concept_id`),
  UNIQUE KEY `concept_uuid_index` (`uuid`),
  KEY `user_who_changed_concept` (`changed_by`),
  KEY `concept_classes` (`class_id`),
  KEY `concept_creator` (`creator`),
  KEY `concept_datatypes` (`datatype_id`),
  KEY `user_who_retired_concept` (`retired_by`),
  CONSTRAINT `concept_classes` FOREIGN KEY (`class_id`) REFERENCES `concept_class` (`concept_class_id`),
  CONSTRAINT `concept_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `concept_datatypes` FOREIGN KEY (`datatype_id`) REFERENCES `concept_datatype` (`concept_datatype_id`),
  CONSTRAINT `user_who_changed_concept` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_concept` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6165 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept`
--

LOCK TABLES `concept` WRITE;
/*!40000 ALTER TABLE `concept` DISABLE KEYS */;
INSERT INTO `concept` VALUES (21,0,NULL,NULL,NULL,1,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa08376-e8ec-11e0-8e86-a9cbfc8ed377'),(36,0,NULL,NULL,NULL,4,3,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa07868-e8ec-11e0-8e86-a9cbfc8ed377'),(44,0,NULL,NULL,NULL,4,4,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa0799e-e8ec-11e0-8e86-a9cbfc8ed377'),(299,0,NULL,NULL,NULL,2,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa07386-e8ec-11e0-8e86-a9cbfc8ed377'),(664,0,NULL,NULL,NULL,4,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa07250-e8ec-11e0-8e86-a9cbfc8ed377'),(703,0,NULL,NULL,NULL,4,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa07124-e8ec-11e0-8e86-a9cbfc8ed377'),(886,0,NULL,NULL,NULL,3,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa07728-e8ec-11e0-8e86-a9cbfc8ed377'),(984,0,NULL,NULL,NULL,2,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa074b2-e8ec-11e0-8e86-a9cbfc8ed377'),(1053,0,NULL,NULL,NULL,1,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa07e94-e8ec-11e0-8e86-a9cbfc8ed377'),(1228,0,NULL,NULL,NULL,4,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa06b52-e8ec-11e0-8e86-a9cbfc8ed377'),(1229,0,NULL,NULL,NULL,4,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa06fc6-e8ec-11e0-8e86-a9cbfc8ed377'),(5085,0,NULL,NULL,NULL,1,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa08236-e8ec-11e0-8e86-a9cbfc8ed377'),(5086,0,NULL,NULL,NULL,1,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa0810a-e8ec-11e0-8e86-a9cbfc8ed377'),(5088,0,NULL,NULL,NULL,1,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa08e2a-e8ec-11e0-8e86-a9cbfc8ed377'),(5089,0,NULL,NULL,NULL,1,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa08cea-e8ec-11e0-8e86-a9cbfc8ed377'),(5090,0,NULL,NULL,NULL,1,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa084a2-e8ec-11e0-8e86-a9cbfc8ed377'),(5242,0,NULL,NULL,NULL,1,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa07fca-e8ec-11e0-8e86-a9cbfc8ed377'),(5272,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa07ad4-e8ec-11e0-8e86-a9cbfc8ed377'),(5596,0,NULL,NULL,NULL,8,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa07c14-e8ec-11e0-8e86-a9cbfc8ed377'),(5624,0,NULL,NULL,NULL,1,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa07d54-e8ec-11e0-8e86-a9cbfc8ed377'),(5864,0,NULL,NULL,NULL,4,3,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fa075e8-e8ec-11e0-8e86-a9cbfc8ed377'),(6100,0,NULL,NULL,NULL,1,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fac9b8e-e8ec-11e0-8e86-a9cbfc8ed377'),(6101,0,NULL,NULL,NULL,1,3,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fac9fee-e8ec-11e0-8e86-a9cbfc8ed377'),(6102,0,NULL,NULL,NULL,1,3,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faca156-e8ec-11e0-8e86-a9cbfc8ed377'),(6103,0,NULL,NULL,NULL,3,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faca2b4-e8ec-11e0-8e86-a9cbfc8ed377'),(6104,0,NULL,NULL,NULL,1,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faca408-e8ec-11e0-8e86-a9cbfc8ed377'),(6105,0,NULL,NULL,NULL,1,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faca552-e8ec-11e0-8e86-a9cbfc8ed377'),(6106,0,NULL,NULL,NULL,1,3,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faca688-e8ec-11e0-8e86-a9cbfc8ed377'),(6107,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faca7be-e8ec-11e0-8e86-a9cbfc8ed377'),(6108,0,NULL,NULL,NULL,1,3,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faca8f4-e8ec-11e0-8e86-a9cbfc8ed377'),(6109,0,NULL,NULL,NULL,1,3,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facaa2a-e8ec-11e0-8e86-a9cbfc8ed377'),(6110,0,NULL,NULL,NULL,4,3,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facab60-e8ec-11e0-8e86-a9cbfc8ed377'),(6111,0,NULL,NULL,NULL,4,3,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facac96-e8ec-11e0-8e86-a9cbfc8ed377'),(6112,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facade0-e8ec-11e0-8e86-a9cbfc8ed377'),(6113,0,NULL,NULL,NULL,8,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facaf20-e8ec-11e0-8e86-a9cbfc8ed377'),(6114,0,NULL,NULL,NULL,3,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facb060-e8ec-11e0-8e86-a9cbfc8ed377'),(6115,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facb196-e8ec-11e0-8e86-a9cbfc8ed377'),(6116,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facb2d6-e8ec-11e0-8e86-a9cbfc8ed377'),(6117,0,NULL,NULL,NULL,1,4,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facb40c-e8ec-11e0-8e86-a9cbfc8ed377'),(6118,0,NULL,NULL,NULL,1,4,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facc0a0-e8ec-11e0-8e86-a9cbfc8ed377'),(6119,0,NULL,NULL,NULL,1,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facc1ea-e8ec-11e0-8e86-a9cbfc8ed377'),(6120,0,NULL,NULL,NULL,1,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facc348-e8ec-11e0-8e86-a9cbfc8ed377'),(6121,0,NULL,NULL,NULL,1,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facc46a-e8ec-11e0-8e86-a9cbfc8ed377'),(6122,0,NULL,NULL,NULL,1,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facc582-e8ec-11e0-8e86-a9cbfc8ed377'),(6123,0,NULL,NULL,NULL,3,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facc6a4-e8ec-11e0-8e86-a9cbfc8ed377'),(6124,0,NULL,NULL,NULL,2,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facc7c6-e8ec-11e0-8e86-a9cbfc8ed377'),(6125,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facc8e8-e8ec-11e0-8e86-a9cbfc8ed377'),(6126,0,NULL,NULL,NULL,2,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facca50-e8ec-11e0-8e86-a9cbfc8ed377'),(6127,0,NULL,NULL,NULL,2,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faccb72-e8ec-11e0-8e86-a9cbfc8ed377'),(6128,0,NULL,NULL,NULL,1,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faccc94-e8ec-11e0-8e86-a9cbfc8ed377'),(6129,0,NULL,NULL,NULL,1,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faccdca-e8ec-11e0-8e86-a9cbfc8ed377'),(6130,0,NULL,NULL,NULL,1,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facceec-e8ec-11e0-8e86-a9cbfc8ed377'),(6131,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facd004-e8ec-11e0-8e86-a9cbfc8ed377'),(6132,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facd126-e8ec-11e0-8e86-a9cbfc8ed377'),(6133,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facd252-e8ec-11e0-8e86-a9cbfc8ed377'),(6134,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facd36a-e8ec-11e0-8e86-a9cbfc8ed377'),(6135,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facd48c-e8ec-11e0-8e86-a9cbfc8ed377'),(6136,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facd5ae-e8ec-11e0-8e86-a9cbfc8ed377'),(6137,0,NULL,NULL,NULL,1,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facd6d0-e8ec-11e0-8e86-a9cbfc8ed377'),(6138,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facd7e8-e8ec-11e0-8e86-a9cbfc8ed377'),(6139,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3face71a-e8ec-11e0-8e86-a9cbfc8ed377'),(6140,0,NULL,NULL,NULL,2,1,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3face878-e8ec-11e0-8e86-a9cbfc8ed377'),(6141,0,NULL,NULL,NULL,1,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3face9b8-e8ec-11e0-8e86-a9cbfc8ed377'),(6142,0,NULL,NULL,NULL,10,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faceaf8-e8ec-11e0-8e86-a9cbfc8ed377'),(6143,0,NULL,NULL,NULL,1,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facec38-e8ec-11e0-8e86-a9cbfc8ed377'),(6144,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faced78-e8ec-11e0-8e86-a9cbfc8ed377'),(6145,0,NULL,NULL,NULL,1,2,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3faceeb8-e8ec-11e0-8e86-a9cbfc8ed377'),(6146,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facefee-e8ec-11e0-8e86-a9cbfc8ed377'),(6147,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facf138-e8ec-11e0-8e86-a9cbfc8ed377'),(6148,0,NULL,NULL,NULL,8,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facf278-e8ec-11e0-8e86-a9cbfc8ed377'),(6149,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facf3ae-e8ec-11e0-8e86-a9cbfc8ed377'),(6150,0,NULL,NULL,NULL,3,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facf4e4-e8ec-11e0-8e86-a9cbfc8ed377'),(6151,0,NULL,NULL,NULL,3,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facf624-e8ec-11e0-8e86-a9cbfc8ed377'),(6152,0,NULL,NULL,NULL,1,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facf764-e8ec-11e0-8e86-a9cbfc8ed377'),(6153,0,NULL,NULL,NULL,1,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facf8a4-e8ec-11e0-8e86-a9cbfc8ed377'),(6154,0,NULL,NULL,NULL,3,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facf9e4-e8ec-11e0-8e86-a9cbfc8ed377'),(6155,0,NULL,NULL,NULL,3,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facfb24-e8ec-11e0-8e86-a9cbfc8ed377'),(6156,0,NULL,NULL,NULL,3,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facfc64-e8ec-11e0-8e86-a9cbfc8ed377'),(6157,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facfd90-e8ec-11e0-8e86-a9cbfc8ed377'),(6158,0,NULL,NULL,NULL,10,5,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3facfed0-e8ec-11e0-8e86-a9cbfc8ed377'),(6159,0,NULL,NULL,NULL,4,11,0,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,NULL,'3fad0010-e8ec-11e0-8e86-a9cbfc8ed377'),(6161,0,NULL,NULL,NULL,10,7,0,1,'2011-09-27 15:07:02',NULL,NULL,NULL,NULL,NULL,NULL,'413157ec-e8ec-11e0-8e86-a9cbfc8ed377'),(6162,0,NULL,NULL,NULL,1,3,0,1,'2011-09-27 15:07:03',NULL,NULL,NULL,NULL,NULL,NULL,'4187f570-e8ec-11e0-8e86-a9cbfc8ed377'),(6163,0,'','',NULL,4,11,0,1,'2011-10-03 17:07:54',NULL,NULL,NULL,NULL,NULL,NULL,'5249923c-27cf-4474-8ddc-de012010cb30'),(6164,0,'','',NULL,4,11,0,1,'2011-10-03 17:07:54',NULL,NULL,NULL,NULL,NULL,NULL,'170dbf1a-904c-464b-86b1-407802794faf');
/*!40000 ALTER TABLE `concept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_answer`
--

DROP TABLE IF EXISTS `concept_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_answer` (
  `concept_answer_id` int(11) NOT NULL AUTO_INCREMENT,
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `answer_concept` int(11) DEFAULT NULL,
  `answer_drug` int(11) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `uuid` char(38) NOT NULL,
  `sort_weight` double DEFAULT NULL,
  PRIMARY KEY (`concept_answer_id`),
  UNIQUE KEY `concept_answer_uuid_index` (`uuid`),
  KEY `answer` (`answer_concept`),
  KEY `answers_for_concept` (`concept_id`),
  KEY `answer_creator` (`creator`),
  CONSTRAINT `answer` FOREIGN KEY (`answer_concept`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `answers_for_concept` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `answer_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_answer`
--

LOCK TABLES `concept_answer` WRITE;
/*!40000 ALTER TABLE `concept_answer` DISABLE KEYS */;
INSERT INTO `concept_answer` VALUES (1,299,1228,NULL,1,'2011-09-27 15:06:59','3fa11c0a-e8ec-11e0-8e86-a9cbfc8ed377',1),(2,299,1229,NULL,1,'2011-09-27 15:06:59','3fa1201a-e8ec-11e0-8e86-a9cbfc8ed377',2),(3,984,886,NULL,1,'2011-09-27 15:06:59','3fa12128-e8ec-11e0-8e86-a9cbfc8ed377',3),(4,984,36,NULL,1,'2011-09-27 15:06:59','3fa12222-e8ec-11e0-8e86-a9cbfc8ed377',4),(5,984,5864,NULL,1,'2011-09-27 15:06:59','3fadb42e-e8ec-11e0-8e86-a9cbfc8ed377',5),(6,984,6111,NULL,1,'2011-09-27 15:06:59','3fadb7da-e8ec-11e0-8e86-a9cbfc8ed377',6),(7,984,6110,NULL,1,'2011-09-27 15:06:59','3fadb8e8-e8ec-11e0-8e86-a9cbfc8ed377',7),(8,6124,664,NULL,1,'2011-09-27 15:06:59','3fadb9ce-e8ec-11e0-8e86-a9cbfc8ed377',8),(9,6124,703,NULL,1,'2011-09-27 15:06:59','3fadbad2-e8ec-11e0-8e86-a9cbfc8ed377',9),(10,6126,664,NULL,1,'2011-09-27 15:06:59','3fadbbb8-e8ec-11e0-8e86-a9cbfc8ed377',10),(11,6126,703,NULL,1,'2011-09-27 15:06:59','3fadbca8-e8ec-11e0-8e86-a9cbfc8ed377',11),(12,6127,664,NULL,1,'2011-09-27 15:06:59','3fadbd8e-e8ec-11e0-8e86-a9cbfc8ed377',12),(13,6127,703,NULL,1,'2011-09-27 15:06:59','3fadbe88-e8ec-11e0-8e86-a9cbfc8ed377',13),(14,6140,1229,NULL,1,'2011-09-27 15:06:59','3fadbf78-e8ec-11e0-8e86-a9cbfc8ed377',14),(15,6140,1228,NULL,1,'2011-09-27 15:06:59','3fadc068-e8ec-11e0-8e86-a9cbfc8ed377',15),(16,6126,6159,NULL,1,'2011-09-27 15:06:59','3fadc14e-e8ec-11e0-8e86-a9cbfc8ed377',16),(17,6127,6159,NULL,1,'2011-09-27 15:06:59','3fadc252-e8ec-11e0-8e86-a9cbfc8ed377',17);
/*!40000 ALTER TABLE `concept_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_class`
--

DROP TABLE IF EXISTS `concept_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_class` (
  `concept_class_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`concept_class_id`),
  UNIQUE KEY `concept_class_uuid_index` (`uuid`),
  KEY `concept_class_retired_status` (`retired`),
  KEY `concept_class_creator` (`creator`),
  KEY `user_who_retired_concept_class` (`retired_by`),
  CONSTRAINT `concept_class_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_concept_class` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_class`
--

LOCK TABLES `concept_class` WRITE;
/*!40000 ALTER TABLE `concept_class` DISABLE KEYS */;
INSERT INTO `concept_class` VALUES (1,'Test','Acq. during patient encounter (vitals, labs, etc.)',1,'2004-02-02 00:00:00',0,NULL,NULL,NULL,'8d4907b2-c2cc-11de-8d13-0010c6dffd0f'),(2,'Procedure','Describes a clinical procedure',1,'2004-03-02 00:00:00',0,NULL,NULL,NULL,'8d490bf4-c2cc-11de-8d13-0010c6dffd0f'),(3,'Drug','Drug',1,'2004-02-02 00:00:00',0,NULL,NULL,NULL,'8d490dfc-c2cc-11de-8d13-0010c6dffd0f'),(4,'Diagnosis','Conclusion drawn through findings',1,'2004-02-02 00:00:00',0,NULL,NULL,NULL,'8d4918b0-c2cc-11de-8d13-0010c6dffd0f'),(5,'Finding','Practitioner observation/finding',1,'2004-03-02 00:00:00',0,NULL,NULL,NULL,'8d491a9a-c2cc-11de-8d13-0010c6dffd0f'),(6,'Anatomy','Anatomic sites / descriptors',1,'2004-03-02 00:00:00',0,NULL,NULL,NULL,'8d491c7a-c2cc-11de-8d13-0010c6dffd0f'),(7,'Question','Question (eg, patient history, SF36 items)',1,'2004-03-02 00:00:00',0,NULL,NULL,NULL,'8d491e50-c2cc-11de-8d13-0010c6dffd0f'),(8,'LabSet','Term to describe laboratory sets',1,'2004-03-02 00:00:00',0,NULL,NULL,NULL,'8d492026-c2cc-11de-8d13-0010c6dffd0f'),(9,'MedSet','Term to describe medication sets',1,'2004-02-02 00:00:00',0,NULL,NULL,NULL,'8d4923b4-c2cc-11de-8d13-0010c6dffd0f'),(10,'ConvSet','Term to describe convenience sets',1,'2004-03-02 00:00:00',0,NULL,NULL,NULL,'8d492594-c2cc-11de-8d13-0010c6dffd0f'),(11,'Misc','Terms which don\'t fit other categories',1,'2004-03-02 00:00:00',0,NULL,NULL,NULL,'8d492774-c2cc-11de-8d13-0010c6dffd0f'),(12,'Symptom','Patient-reported observation',1,'2004-10-04 00:00:00',0,NULL,NULL,NULL,'8d492954-c2cc-11de-8d13-0010c6dffd0f'),(13,'Symptom/Finding','Observation that can be reported from patient or found on exam',1,'2004-10-04 00:00:00',0,NULL,NULL,NULL,'8d492b2a-c2cc-11de-8d13-0010c6dffd0f'),(14,'Specimen','Body or fluid specimen',1,'2004-12-02 00:00:00',0,NULL,NULL,NULL,'8d492d0a-c2cc-11de-8d13-0010c6dffd0f'),(15,'Misc Order','Orderable items which aren\'t tests or drugs',1,'2005-02-17 00:00:00',0,NULL,NULL,NULL,'8d492ee0-c2cc-11de-8d13-0010c6dffd0f');
/*!40000 ALTER TABLE `concept_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_complex`
--

DROP TABLE IF EXISTS `concept_complex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_complex` (
  `concept_id` int(11) NOT NULL,
  `handler` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`concept_id`),
  CONSTRAINT `concept_attributes` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_complex`
--

LOCK TABLES `concept_complex` WRITE;
/*!40000 ALTER TABLE `concept_complex` DISABLE KEYS */;
/*!40000 ALTER TABLE `concept_complex` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_datatype`
--

DROP TABLE IF EXISTS `concept_datatype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_datatype` (
  `concept_datatype_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `hl7_abbreviation` varchar(3) DEFAULT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`concept_datatype_id`),
  UNIQUE KEY `concept_datatype_uuid_index` (`uuid`),
  KEY `concept_datatype_retired_status` (`retired`),
  KEY `concept_datatype_creator` (`creator`),
  KEY `user_who_retired_concept_datatype` (`retired_by`),
  CONSTRAINT `concept_datatype_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_concept_datatype` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_datatype`
--

LOCK TABLES `concept_datatype` WRITE;
/*!40000 ALTER TABLE `concept_datatype` DISABLE KEYS */;
INSERT INTO `concept_datatype` VALUES (1,'Numeric','NM','Numeric value, including integer or float (e.g., creatinine, weight)',1,'2004-02-02 00:00:00',0,NULL,NULL,NULL,'8d4a4488-c2cc-11de-8d13-0010c6dffd0f'),(2,'Coded','CWE','Value determined by term dictionary lookup (i.e., term identifier)',1,'2004-02-02 00:00:00',0,NULL,NULL,NULL,'8d4a48b6-c2cc-11de-8d13-0010c6dffd0f'),(3,'Text','ST','Free text',1,'2004-02-02 00:00:00',0,NULL,NULL,NULL,'8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f'),(4,'N/A','ZZ','Not associated with a datatype (e.g., term answers, sets)',1,'2004-02-02 00:00:00',0,NULL,NULL,NULL,'8d4a4c94-c2cc-11de-8d13-0010c6dffd0f'),(5,'Document','RP','Pointer to a binary or text-based document (e.g., clinical document, RTF, XML, EKG, image, etc.) stored in complex_obs table',1,'2004-04-15 00:00:00',0,NULL,NULL,NULL,'8d4a4e74-c2cc-11de-8d13-0010c6dffd0f'),(6,'Date','DT','Absolute date',1,'2004-07-22 00:00:00',0,NULL,NULL,NULL,'8d4a505e-c2cc-11de-8d13-0010c6dffd0f'),(7,'Time','TM','Absolute time of day',1,'2004-07-22 00:00:00',0,NULL,NULL,NULL,'8d4a591e-c2cc-11de-8d13-0010c6dffd0f'),(8,'Datetime','TS','Absolute date and time',1,'2004-07-22 00:00:00',0,NULL,NULL,NULL,'8d4a5af4-c2cc-11de-8d13-0010c6dffd0f'),(10,'Boolean','BIT','Boolean value (yes/no, true/false)',1,'2004-08-26 00:00:00',0,NULL,NULL,NULL,'8d4a5cca-c2cc-11de-8d13-0010c6dffd0f'),(11,'Rule','ZZ','Value derived from other data',1,'2006-09-11 00:00:00',0,NULL,NULL,NULL,'8d4a5e96-c2cc-11de-8d13-0010c6dffd0f'),(12,'Structured Numeric','SN','Complex numeric values possible (ie, <5, 1-10, etc.)',1,'2005-08-06 00:00:00',0,NULL,NULL,NULL,'8d4a606c-c2cc-11de-8d13-0010c6dffd0f'),(13,'Complex','ED','Complex value.  Analogous to HL7 Embedded Datatype',1,'2008-05-28 12:25:34',0,NULL,NULL,NULL,'8d4a6242-c2cc-11de-8d13-0010c6dffd0f');
/*!40000 ALTER TABLE `concept_datatype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_description`
--

DROP TABLE IF EXISTS `concept_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_description` (
  `concept_description_id` int(11) NOT NULL AUTO_INCREMENT,
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `locale` varchar(50) NOT NULL DEFAULT '',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`concept_description_id`),
  UNIQUE KEY `concept_description_uuid_index` (`uuid`),
  KEY `user_who_changed_description` (`changed_by`),
  KEY `description_for_concept` (`concept_id`),
  KEY `user_who_created_description` (`creator`),
  CONSTRAINT `description_for_concept` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `user_who_changed_description` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_created_description` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_description`
--

LOCK TABLES `concept_description` WRITE;
/*!40000 ALTER TABLE `concept_description` DISABLE KEYS */;
INSERT INTO `concept_description` VALUES (1,21,'The iron-containing respiratory pigment in red blood cells of vertebrates,consisting of about 6 percent\n            heme and 94 percent globin.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6d136-e8ec-11e0-8e86-a9cbfc8ed377'),(2,36,'Vaccination against measles (IM).','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6d49c-e8ec-11e0-8e86-a9cbfc8ed377'),(3,44,'The period from conception to birth when a woman carries a developing fetus in her\n            uterus.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6d5a0-e8ec-11e0-8e86-a9cbfc8ed377'),(4,299,'A flocculation test for syphilis employing cardiolipin in combination with lecithin and\n            cholesterol.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6d690-e8ec-11e0-8e86-a9cbfc8ed377'),(5,664,'Response to a finding or test result.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6d7a8-e8ec-11e0-8e86-a9cbfc8ed377'),(6,703,'General finding of a positive result.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6d92e-e8ec-11e0-8e86-a9cbfc8ed377'),(7,886,'Deactivated tuberculous agent as basis for tuberculosis vaccination.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6da96-e8ec-11e0-8e86-a9cbfc8ed377'),(8,984,'Information gathered from the pediatric return visit form. Captures basic information about\n            immunizations administered during a visit.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6db9a-e8ec-11e0-8e86-a9cbfc8ed377'),(9,1053,'The number of children a woman has delivered.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6dc8a-e8ec-11e0-8e86-a9cbfc8ed377'),(10,1228,'General descriptive term,often used to describe positive test findings.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6dd70-e8ec-11e0-8e86-a9cbfc8ed377'),(11,1229,'General descriptive answer,often used in tests to describe a negative result.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6de56-e8ec-11e0-8e86-a9cbfc8ed377'),(12,5085,'A patient\'s systolic blood pressure measurement (taken with a manual cuff in either a sitting or\n            standing position)','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6df3c-e8ec-11e0-8e86-a9cbfc8ed377'),(13,5086,'A patient\'s diastolic blood pressure measurement (taken with a manual cuff in either a sitting or\n            standing position)','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6e022-e8ec-11e0-8e86-a9cbfc8ed377'),(14,5088,'Patient\'s temperature in degrees centigrade.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6e108-e8ec-11e0-8e86-a9cbfc8ed377'),(15,5089,'Patient\'s weight in kilograms.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6e1e4-e8ec-11e0-8e86-a9cbfc8ed377'),(16,5090,'Patient\'s height in centimeters.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6e2c0-e8ec-11e0-8e86-a9cbfc8ed377'),(17,5242,'Measured respiratory rate in breaths per minute','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6e3a6-e8ec-11e0-8e86-a9cbfc8ed377'),(18,5272,'Question on encounter form: \"Is the patient pregnant?\"','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6e48c-e8ec-11e0-8e86-a9cbfc8ed377'),(19,5596,'An estimation of the date in which a mother will give birth to her child.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6e572-e8ec-11e0-8e86-a9cbfc8ed377'),(20,5624,'The number of times a woman has been pregnant','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6eb58-e8ec-11e0-8e86-a9cbfc8ed377'),(21,5864,'Vaccine given for Yellow Fever.','en',1,'2011-09-27 15:06:59',NULL,NULL,'3fa6ec52-e8ec-11e0-8e86-a9cbfc8ed377'),(22,6100,'Visit Number','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd0b54-e8ec-11e0-8e86-a9cbfc8ed377'),(23,6101,'Dose Number for Tetanus Toxoid Vaccination','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd0f0a-e8ec-11e0-8e86-a9cbfc8ed377'),(24,6102,'Dose Number for Malaria Treatment','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd0ff0-e8ec-11e0-8e86-a9cbfc8ed377'),(25,6103,'Question: \"What is the patient\'s text coded HIV test result?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd10d6-e8ec-11e0-8e86-a9cbfc8ed377'),(26,6104,'Numeric coded pregnancy termination reason','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd119e-e8ec-11e0-8e86-a9cbfc8ed377'),(27,6105,'Numeric coded pregnancy termination complication','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd1266-e8ec-11e0-8e86-a9cbfc8ed377'),(28,6106,'Dose Number for infant Malaria treatment.','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd132e-e8ec-11e0-8e86-a9cbfc8ed377'),(29,6107,'Question on encounter form: \"Does the patient use insecticide-treated nets?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd13f6-e8ec-11e0-8e86-a9cbfc8ed377'),(30,6108,'Dose Number for child Oral Polio vaccination.','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd14be-e8ec-11e0-8e86-a9cbfc8ed377'),(31,6109,'Dose Number for child Penta vaccination.','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd1586-e8ec-11e0-8e86-a9cbfc8ed377'),(32,6110,'Vaccination against Cerebro-Spinal Meningitis.','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd164e-e8ec-11e0-8e86-a9cbfc8ed377'),(33,6111,'Supplement for Vitamin A.','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd1716-e8ec-11e0-8e86-a9cbfc8ed377'),(34,6112,'Question: \"Is the pregnancy due date confirmed by the CHW?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd17de-e8ec-11e0-8e86-a9cbfc8ed377'),(35,6113,'Reference Date for Message Program Enrollment','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd18ba-e8ec-11e0-8e86-a9cbfc8ed377'),(36,6114,'Patient register serial number','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd198c-e8ec-11e0-8e86-a9cbfc8ed377'),(37,6115,'Question: \"Is this a new case?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd1a5e-e8ec-11e0-8e86-a9cbfc8ed377'),(38,6116,'Question: \"Was patient referred?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd1b1c-e8ec-11e0-8e86-a9cbfc8ed377'),(39,6117,'Numeric coded primary diagnosis','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd1bee-e8ec-11e0-8e86-a9cbfc8ed377'),(40,6118,'Numeric coded secondary diagnosis','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd23e6-e8ec-11e0-8e86-a9cbfc8ed377'),(41,6119,'Numeric coded mode of delivery','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd24cc-e8ec-11e0-8e86-a9cbfc8ed377'),(42,6120,'Numeric coded place of delivery','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd2594-e8ec-11e0-8e86-a9cbfc8ed377'),(43,6121,'Numeric coded who performed delivery','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd2666-e8ec-11e0-8e86-a9cbfc8ed377'),(44,6122,'Numeric coded outcome of delivery','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd272e-e8ec-11e0-8e86-a9cbfc8ed377'),(45,6123,'Text coded birth outcome','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd2832-e8ec-11e0-8e86-a9cbfc8ed377'),(46,6124,'Rapid diagnostic test for malaria','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd290e-e8ec-11e0-8e86-a9cbfc8ed377'),(47,6125,'Question on encounter form: \"Was the patient given treatment for syphilis?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd29f4-e8ec-11e0-8e86-a9cbfc8ed377'),(48,6126,'Test for protein in urine','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd2ad0-e8ec-11e0-8e86-a9cbfc8ed377'),(49,6127,'Test for glucose in urine','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd2bac-e8ec-11e0-8e86-a9cbfc8ed377'),(50,6128,'Fetal heart rate (in bpm)','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd2c92-e8ec-11e0-8e86-a9cbfc8ed377'),(51,6129,'Measurement of uterus (in cm)','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd2d6e-e8ec-11e0-8e86-a9cbfc8ed377'),(52,6130,'Numeric coded value for Vesico Vaginal Fistula (VVF) repair','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd2e54-e8ec-11e0-8e86-a9cbfc8ed377'),(53,6131,'Question on encounter form: \"Was dewormer given to patient?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd2f30-e8ec-11e0-8e86-a9cbfc8ed377'),(54,6132,'Preventing Mother-to-Child Transmission (PMTCT) of HIV','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd3016-e8ec-11e0-8e86-a9cbfc8ed377'),(55,6133,'Question on encounter form: \"Was PMTCT HIV treatment given to patient?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd30fc-e8ec-11e0-8e86-a9cbfc8ed377'),(56,6134,'Question on encounter form: \"Was Artemisinin-based Combination Therapy (ACT) for Malaria given to\n            patient?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd31d8-e8ec-11e0-8e86-a9cbfc8ed377'),(57,6135,'Question on encounter form: \"Was counseling done before HIV test?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd32be-e8ec-11e0-8e86-a9cbfc8ed377'),(58,6136,'Question on encounter form: \"Was counseling done after HIV test?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd33a4-e8ec-11e0-8e86-a9cbfc8ed377'),(59,6137,'Numeric coded value for delivery or post-partum complication','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd3480-e8ec-11e0-8e86-a9cbfc8ed377'),(60,6138,'Question on encounter form: \"Was family planning counseling done after\n            abortion?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd3566-e8ec-11e0-8e86-a9cbfc8ed377'),(61,6139,'Question on encounter form: \"Did the patient accept family planning after\n            abortion?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd40ba-e8ec-11e0-8e86-a9cbfc8ed377'),(62,6140,'Intermittent Preventive Treatment (IPT) with Sulphadoxine-Pyrimethamine (SP)','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd41aa-e8ec-11e0-8e86-a9cbfc8ed377'),(63,6141,'Numeric coded colour of post-partum vaginal discharge','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd4286-e8ec-11e0-8e86-a9cbfc8ed377'),(64,6142,'Is amount of post-partum vaginal discharge in excess?','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd4362-e8ec-11e0-8e86-a9cbfc8ed377'),(65,6143,'Circumference of Middle Upper Arm (MUAC) in cm','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd4448-e8ec-11e0-8e86-a9cbfc8ed377'),(66,6144,'Question on encounter form: \"Death of patient during delivery or abortion\n            procedure?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd452e-e8ec-11e0-8e86-a9cbfc8ed377'),(67,6145,'Numeric coded procedure used to terminate pregnancy','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd460a-e8ec-11e0-8e86-a9cbfc8ed377'),(68,6146,'Question on encounter form: \"Is the condition of the umbilical cord normal?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd46f0-e8ec-11e0-8e86-a9cbfc8ed377'),(69,6147,'Question on encounter form: \"Is the condition of the baby good?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd483a-e8ec-11e0-8e86-a9cbfc8ed377'),(70,6148,'Question on encounter form: \"What is the date of the next antenatal care visit for the\n            patient?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd49b6-e8ec-11e0-8e86-a9cbfc8ed377'),(71,6149,'Question on encounter form: \"Was the male household member involved in patient\'s\n            care?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd4b46-e8ec-11e0-8e86-a9cbfc8ed377'),(72,6150,'Community details on the location of care','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd4cb8-e8ec-11e0-8e86-a9cbfc8ed377'),(73,6151,'House details on the facility of care','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd4e70-e8ec-11e0-8e86-a9cbfc8ed377'),(74,6152,'Numeric coded location of ANC or PNC care','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd4f6a-e8ec-11e0-8e86-a9cbfc8ed377'),(75,6153,'Numeric coded location of CWC care','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd5046-e8ec-11e0-8e86-a9cbfc8ed377'),(76,6154,'Comments','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd5122-e8ec-11e0-8e86-a9cbfc8ed377'),(77,6155,'Ghana ANC Registration Number','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd5208-e8ec-11e0-8e86-a9cbfc8ed377'),(78,6156,'Ghana CWC Registration Number','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd52ee-e8ec-11e0-8e86-a9cbfc8ed377'),(79,6157,'Question on encounter form: \"Is patient currently insured?\"','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd53ca-e8ec-11e0-8e86-a9cbfc8ed377'),(80,6158,'Is smell of post-partum vaginal discharge foul?','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd54a6-e8ec-11e0-8e86-a9cbfc8ed377'),(81,6159,'General finding of a trace positive result.','en',1,'2011-09-27 15:07:00',NULL,NULL,'3fbd5596-e8ec-11e0-8e86-a9cbfc8ed377'),(82,6161,'Question: \"Is this a new patient?\"','en',1,'2011-09-27 15:07:02',NULL,NULL,'4133ba50-e8ec-11e0-8e86-a9cbfc8ed377'),(83,6162,'Question: \"Why no history?\"','en',1,'2011-09-27 15:07:03',NULL,NULL,'418a0dc4-e8ec-11e0-8e86-a9cbfc8ed377');
/*!40000 ALTER TABLE `concept_description` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_map`
--

DROP TABLE IF EXISTS `concept_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_map` (
  `concept_map_id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) DEFAULT NULL,
  `source_code` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`concept_map_id`),
  UNIQUE KEY `concept_map_uuid_index` (`uuid`),
  KEY `map_for_concept` (`concept_id`),
  KEY `map_creator` (`creator`),
  KEY `map_source` (`source`),
  CONSTRAINT `map_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `map_for_concept` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `map_source` FOREIGN KEY (`source`) REFERENCES `concept_source` (`concept_source_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_map`
--

LOCK TABLES `concept_map` WRITE;
/*!40000 ALTER TABLE `concept_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `concept_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_name`
--

DROP TABLE IF EXISTS `concept_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_name` (
  `concept_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `locale` varchar(50) NOT NULL DEFAULT '',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `concept_name_id` int(11) NOT NULL AUTO_INCREMENT,
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  `concept_name_type` varchar(50) DEFAULT NULL,
  `locale_preferred` smallint(6) DEFAULT '0',
  PRIMARY KEY (`concept_name_id`),
  UNIQUE KEY `concept_name_uuid_index` (`uuid`),
  KEY `name_of_concept` (`name`),
  KEY `name_for_concept` (`concept_id`),
  KEY `user_who_created_name` (`creator`),
  KEY `user_who_voided_this_name` (`voided_by`),
  CONSTRAINT `name_for_concept` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `user_who_created_name` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_voided_this_name` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6183 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_name`
--

LOCK TABLES `concept_name` WRITE;
/*!40000 ALTER TABLE `concept_name` DISABLE KEYS */;
INSERT INTO `concept_name` VALUES (21,'HEMOGLOBIN','en',1,'2011-09-27 15:06:59',21,0,NULL,NULL,NULL,'3fa3043e-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(36,'MEASLES VACCINATION','en',1,'2011-09-27 15:06:59',36,0,NULL,NULL,NULL,'3fa2faca-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(44,'PREGNANCY','en',1,'2011-09-27 15:06:59',44,0,NULL,NULL,NULL,'3fa2fbd8-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(299,'VDRL','en',1,'2011-09-27 15:06:59',299,0,NULL,NULL,NULL,'3fa2f674-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(664,'NEGATIVE','en',1,'2011-09-27 15:06:59',664,0,NULL,NULL,NULL,'3fa2f570-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(703,'POSITIVE','en',1,'2011-09-27 15:06:59',703,0,NULL,NULL,NULL,'3fa2f462-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(886,'BACILLE CAMILE-GUERIN VACCINATION','en',1,'2011-09-27 15:06:59',886,0,NULL,NULL,NULL,'3fa2f9a8-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(984,'IMMUNIZATIONS ORDERED','en',1,'2011-09-27 15:06:59',984,0,NULL,NULL,NULL,'3fa2f782-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(1053,'PARITY','en',1,'2011-09-27 15:06:59',1053,0,NULL,NULL,NULL,'3fa30024-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(1228,'REACTIVE','en',1,'2011-09-27 15:06:59',1228,0,NULL,NULL,NULL,'3fa2ef3a-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(1229,'NON-REACTIVE','en',1,'2011-09-27 15:06:59',1229,0,NULL,NULL,NULL,'3fa2f336-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(5085,'SYSTOLIC BLOOD PRESSURE','en',1,'2011-09-27 15:06:59',5085,0,NULL,NULL,NULL,'3fa3033a-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(5086,'DIASTOLIC BLOOD PRESSURE','en',1,'2011-09-27 15:06:59',5086,0,NULL,NULL,NULL,'3fa3024a-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(5088,'TEMPERATURE (C)','en',1,'2011-09-27 15:06:59',5088,0,NULL,NULL,NULL,'3fa30cf4-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(5089,'WEIGHT (KG)','en',1,'2011-09-27 15:06:59',5089,0,NULL,NULL,NULL,'3fa30be6-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(5090,'HEIGHT (CM)','en',1,'2011-09-27 15:06:59',5090,0,NULL,NULL,NULL,'3fa30538-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(5242,'RESPIRATORY RATE','en',1,'2011-09-27 15:06:59',5242,0,NULL,NULL,NULL,'3fa30146-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(5272,'PREGNANCY STATUS','en',1,'2011-09-27 15:06:59',5272,0,NULL,NULL,NULL,'3fa2fce6-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(5596,'ESTIMATED DATE OF CONFINEMENT','en',1,'2011-09-27 15:06:59',5596,0,NULL,NULL,NULL,'3fa2fdf4-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(5624,'GRAVIDA','en',1,'2011-09-27 15:06:59',5624,0,NULL,NULL,NULL,'3fa2ff0c-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(5864,'YELLOW FEVER VACCINATION','en',1,'2011-09-27 15:06:59',5864,0,NULL,NULL,NULL,'3fa2f886-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6100,'VISIT NUMBER','en',1,'2011-09-27 15:06:59',6100,0,NULL,NULL,NULL,'3fb0a698-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6101,'TETANUS TOXOID DOSE','en',1,'2011-09-27 15:06:59',6101,0,NULL,NULL,NULL,'3fb0aaee-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6102,'INTERMITTENT PREVENTATIVE TREATMENT DOSE','en',1,'2011-09-27 15:06:59',6102,0,NULL,NULL,NULL,'3fb0ac1a-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6103,'HIV TEST RESULT','en',1,'2011-09-27 15:06:59',6103,0,NULL,NULL,NULL,'3fb0ad3c-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6104,'TERMINATION TYPE','en',1,'2011-09-27 15:06:59',6104,0,NULL,NULL,NULL,'3fb0ae68-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6105,'TERMINATION COMPLICATION','en',1,'2011-09-27 15:06:59',6105,0,NULL,NULL,NULL,'3fb0af80-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6106,'INTERMITTENT PREVENTATIVE TREATMENT INFANTS DOSE','en',1,'2011-09-27 15:06:59',6106,0,NULL,NULL,NULL,'3fb0b08e-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6107,'INSECTICIDE TREATED NET USAGE','en',1,'2011-09-27 15:06:59',6107,0,NULL,NULL,NULL,'3fb0b19c-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6108,'ORAL POLIO VACCINATION DOSE','en',1,'2011-09-27 15:06:59',6108,0,NULL,NULL,NULL,'3fb0b2aa-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6109,'PENTA VACCINATION DOSE','en',1,'2011-09-27 15:06:59',6109,0,NULL,NULL,NULL,'3fb0b3b8-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6110,'CEREBRO-SPINAL MENINGITIS VACCINATION','en',1,'2011-09-27 15:06:59',6110,0,NULL,NULL,NULL,'3fb0b4bc-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6111,'VITAMIN A','en',1,'2011-09-27 15:06:59',6111,0,NULL,NULL,NULL,'3fb0b5ca-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6112,'DATE OF CONFINEMENT CONFIRMED','en',1,'2011-09-27 15:06:59',6112,0,NULL,NULL,NULL,'3fb0b6d8-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6113,'MESSAGE PROGRAM ENROLLMENT REFERENCE DATE','en',1,'2011-09-27 15:06:59',6113,0,NULL,NULL,NULL,'3fb0b7f0-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6114,'SERIAL NUMBER','en',1,'2011-09-27 15:06:59',6114,0,NULL,NULL,NULL,'3fb0b8f4-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6115,'NEW CASE','en',1,'2011-09-27 15:06:59',6115,0,NULL,NULL,NULL,'3fb0ba02-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6116,'REFERRED','en',1,'2011-09-27 15:06:59',6116,0,NULL,NULL,NULL,'3fb0bb10-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6117,'PRIMARY DIAGNOSIS ','en',1,'2011-09-27 15:06:59',6117,0,NULL,NULL,NULL,'3fb0bc1e-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6118,'SECONDARY DIAGNOSIS','en',1,'2011-09-27 15:06:59',6118,0,NULL,NULL,NULL,'3fb0c722-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6119,'DELIVERY MODE','en',1,'2011-09-27 15:06:59',6119,0,NULL,NULL,NULL,'3fb0c844-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6120,'DELIVERY LOCATION','en',1,'2011-09-27 15:06:59',6120,0,NULL,NULL,NULL,'3fb0c952-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6121,'DELIVERED BY','en',1,'2011-09-27 15:06:59',6121,0,NULL,NULL,NULL,'3fb0ca60-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6122,'DELIVERY OUTCOME','en',1,'2011-09-27 15:06:59',6122,0,NULL,NULL,NULL,'3fb0cb6e-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6123,'BIRTH OUTCOME','en',1,'2011-09-27 15:06:59',6123,0,NULL,NULL,NULL,'3fb0cc7c-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6124,'MALARIA RAPID TEST','en',1,'2011-09-27 15:06:59',6124,0,NULL,NULL,NULL,'3fb0cd80-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6125,'VDRL TREATMENT','en',1,'2011-09-27 15:06:59',6125,0,NULL,NULL,NULL,'3fb0ce8e-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6126,'URINE PROTEIN TEST','en',1,'2011-09-27 15:06:59',6126,0,NULL,NULL,NULL,'3fb0cf9c-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6127,'URINE GLUCOSE TEST','en',1,'2011-09-27 15:06:59',6127,0,NULL,NULL,NULL,'3fb0d0a0-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6128,'FETAL HEART RATE','en',1,'2011-09-27 15:06:59',6128,0,NULL,NULL,NULL,'3fb0d1b8-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6129,'FUNDAL HEIGHT','en',1,'2011-09-27 15:06:59',6129,0,NULL,NULL,NULL,'3fb0d2c6-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6130,'VVF REPAIR','en',1,'2011-09-27 15:06:59',6130,0,NULL,NULL,NULL,'3fb0d3d4-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6131,'DEWORMER','en',1,'2011-09-27 15:06:59',6131,0,NULL,NULL,NULL,'3fb0d4e2-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6132,'PMTCT','en',1,'2011-09-27 15:06:59',6132,0,NULL,NULL,NULL,'3fb0d5fa-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6133,'PMTCT TREATMENT','en',1,'2011-09-27 15:06:59',6133,0,NULL,NULL,NULL,'3fb0d708-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6134,'ACT TREATMENT','en',1,'2011-09-27 15:06:59',6134,0,NULL,NULL,NULL,'3fb0d816-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6135,'HIV PRE-TEST COUNSELING','en',1,'2011-09-27 15:06:59',6135,0,NULL,NULL,NULL,'3fb0d924-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6136,'HIV POST-TEST COUNSELING','en',1,'2011-09-27 15:06:59',6136,0,NULL,NULL,NULL,'3fb0da32-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6137,'DELIVERY COMPLICATION','en',1,'2011-09-27 15:06:59',6137,0,NULL,NULL,NULL,'3fb0db40-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6138,'POST-ABORTION FP COUNSELING','en',1,'2011-09-27 15:06:59',6138,0,NULL,NULL,NULL,'3fb0dc4e-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6139,'POST-ABORTION FP ACCEPTED','en',1,'2011-09-27 15:06:59',6139,0,NULL,NULL,NULL,'3fb0ea2c-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6140,'IPT REACTION','en',1,'2011-09-27 15:06:59',6140,0,NULL,NULL,NULL,'3fb0ebc6-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6141,'LOCHIA COLOUR','en',1,'2011-09-27 15:06:59',6141,0,NULL,NULL,NULL,'3fb0ecde-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6142,'LOCHIA EXCESS AMOUNT','en',1,'2011-09-27 15:06:59',6142,0,NULL,NULL,NULL,'3fb0edec-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6143,'MIDDLE UPPER ARM CIRCUMFERENCE','en',1,'2011-09-27 15:06:59',6143,0,NULL,NULL,NULL,'3fb0ef04-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6144,'MATERNAL DEATH','en',1,'2011-09-27 15:06:59',6144,0,NULL,NULL,NULL,'3fb0f012-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6145,'PREGNANCY,TERMINATION PROCEDURE','en',1,'2011-09-27 15:06:59',6145,0,NULL,NULL,NULL,'3fb0f13e-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6146,'CORD CONDITION ','en',1,'2011-09-27 15:06:59',6146,0,NULL,NULL,NULL,'3fb0f238-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6147,'CONDITION OF BABY','en',1,'2011-09-27 15:06:59',6147,0,NULL,NULL,NULL,'3fb0f332-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6148,'NEXT ANC DATE','en',1,'2011-09-27 15:06:59',6148,0,NULL,NULL,NULL,'3fb0f42c-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6149,'MALE INVOLVEMENT','en',1,'2011-09-27 15:06:59',6149,0,NULL,NULL,NULL,'3fb0f526-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6150,'COMMUNITY','en',1,'2011-09-27 15:06:59',6150,0,NULL,NULL,NULL,'3fb0f620-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6151,'HOUSE','en',1,'2011-09-27 15:06:59',6151,0,NULL,NULL,NULL,'3fb0f71a-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6152,'ANC PNC LOCATION','en',1,'2011-09-27 15:06:59',6152,0,NULL,NULL,NULL,'3fb0f814-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6153,'CWC LOCATION','en',1,'2011-09-27 15:06:59',6153,0,NULL,NULL,NULL,'3fb0f90e-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6154,'COMMENTS','en',1,'2011-09-27 15:06:59',6154,0,NULL,NULL,NULL,'3fb0fa08-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6155,'ANC REGISTRATION NUMBER','en',1,'2011-09-27 15:06:59',6155,0,NULL,NULL,NULL,'3fb0fb02-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6156,'CWC REGISTRATION NUMBER','en',1,'2011-09-27 15:06:59',6156,0,NULL,NULL,NULL,'3fb0fbf2-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6157,'INSURED','en',1,'2011-09-27 15:06:59',6157,0,NULL,NULL,NULL,'3fb0fcf6-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6158,'LOCHIA FOUL ODOUR','en',1,'2011-09-27 15:06:59',6158,0,NULL,NULL,NULL,'3fb0fec2-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6159,'TRACE','en',1,'2011-09-27 15:06:59',6159,0,NULL,NULL,NULL,'3fb0ffc6-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6161,'NEW PATIENT','en',1,'2011-09-27 15:07:02',6161,0,NULL,NULL,NULL,'4131d1e0-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6162,'WHY NO HISTORY','en',1,'2011-09-27 15:07:03',6162,0,NULL,NULL,NULL,'41888c7e-e8ec-11e0-8e86-a9cbfc8ed377','FULLY_SPECIFIED',0),(6163,'Vero','it',1,'2011-10-03 17:07:54',6163,0,NULL,NULL,NULL,'5b442e70-abff-4d76-bf70-77e548f03fe7',NULL,0),(6163,'Sì','it',1,'2011-10-03 17:07:54',6164,0,NULL,NULL,NULL,'399ccc17-225c-4790-9e0f-4b419b683b6a',NULL,0),(6163,'Verdadeiro','pt',1,'2011-10-03 17:07:54',6165,0,NULL,NULL,NULL,'456ad723-57f6-4afb-8718-c0895835766a',NULL,0),(6163,'Sim','pt',1,'2011-10-03 17:07:54',6166,0,NULL,NULL,NULL,'be766995-10ba-40b7-8fcf-31ac9611b6ab',NULL,0),(6163,'Vrai','fr',1,'2011-10-03 17:07:54',6167,0,NULL,NULL,NULL,'a65d9999-7712-4652-9a68-b20d0f3537ff',NULL,0),(6163,'Oui','fr',1,'2011-10-03 17:07:54',6168,0,NULL,NULL,NULL,'41842ddc-bd88-46bb-bbac-e9ec13f03b9d',NULL,0),(6163,'True','en',1,'2011-10-03 17:07:54',6169,0,NULL,NULL,NULL,'31b29dd6-fa5f-4273-ae35-fb937827f5c4','FULLY_SPECIFIED',0),(6163,'Yes','en',1,'2011-10-03 17:07:54',6170,0,NULL,NULL,NULL,'b909d4af-935c-4d03-86d0-50259a691604',NULL,0),(6163,'Verdadero','es',1,'2011-10-03 17:07:54',6171,0,NULL,NULL,NULL,'214a6cff-aaa8-4054-89c6-3b135eb4ec7c',NULL,0),(6163,'Sí','es',1,'2011-10-03 17:07:54',6172,0,NULL,NULL,NULL,'ddd4fb46-ab0c-456d-b6c3-7ab556004f57',NULL,0),(6164,'Falso','it',1,'2011-10-03 17:07:54',6173,0,NULL,NULL,NULL,'1da4e92f-e468-4772-9cda-88513ff35673',NULL,0),(6164,'No','it',1,'2011-10-03 17:07:54',6174,0,NULL,NULL,NULL,'e377c888-e866-42b5-9738-59a0a4375d24',NULL,0),(6164,'Falso','pt',1,'2011-10-03 17:07:54',6175,0,NULL,NULL,NULL,'4677bcbe-5d92-4a41-94d7-e5b6f98f0427',NULL,0),(6164,'Não','pt',1,'2011-10-03 17:07:54',6176,0,NULL,NULL,NULL,'435ba533-20b6-4730-a560-ce9249e284aa',NULL,0),(6164,'Faux','fr',1,'2011-10-03 17:07:54',6177,0,NULL,NULL,NULL,'8475e514-1fca-48a7-9e98-92959c2ac4b9',NULL,0),(6164,'Non','fr',1,'2011-10-03 17:07:54',6178,0,NULL,NULL,NULL,'5c3c1529-6e5a-4a24-8d17-414490042db4',NULL,0),(6164,'False','en',1,'2011-10-03 17:07:54',6179,0,NULL,NULL,NULL,'88606095-b9b8-422c-8f88-1e69c9a1aa86','FULLY_SPECIFIED',0),(6164,'No','en',1,'2011-10-03 17:07:54',6180,0,NULL,NULL,NULL,'5884a3df-8ab3-4578-b47a-3c1140c19f51',NULL,0),(6164,'Falso','es',1,'2011-10-03 17:07:54',6181,0,NULL,NULL,NULL,'bfdcff7d-e814-4048-a27c-680908056a68',NULL,0),(6164,'No','es',1,'2011-10-03 17:07:54',6182,0,NULL,NULL,NULL,'00e058b8-db25-41ed-86e5-460c0b1d1574',NULL,0);
/*!40000 ALTER TABLE `concept_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_name_tag`
--

DROP TABLE IF EXISTS `concept_name_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_name_tag` (
  `concept_name_tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`concept_name_tag_id`),
  UNIQUE KEY `concept_name_tag_unique_tags` (`tag`),
  UNIQUE KEY `concept_name_tag_uuid_index` (`uuid`),
  KEY `user_who_created_name_tag` (`creator`),
  KEY `user_who_voided_name_tag` (`voided_by`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_name_tag`
--

LOCK TABLES `concept_name_tag` WRITE;
/*!40000 ALTER TABLE `concept_name_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `concept_name_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_name_tag_map`
--

DROP TABLE IF EXISTS `concept_name_tag_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_name_tag_map` (
  `concept_name_id` int(11) NOT NULL,
  `concept_name_tag_id` int(11) NOT NULL,
  KEY `mapped_concept_name` (`concept_name_id`),
  KEY `mapped_concept_name_tag` (`concept_name_tag_id`),
  CONSTRAINT `mapped_concept_name_tag` FOREIGN KEY (`concept_name_tag_id`) REFERENCES `concept_name_tag` (`concept_name_tag_id`),
  CONSTRAINT `mapped_concept_name` FOREIGN KEY (`concept_name_id`) REFERENCES `concept_name` (`concept_name_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_name_tag_map`
--

LOCK TABLES `concept_name_tag_map` WRITE;
/*!40000 ALTER TABLE `concept_name_tag_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `concept_name_tag_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_numeric`
--

DROP TABLE IF EXISTS `concept_numeric`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_numeric` (
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `hi_absolute` double DEFAULT NULL,
  `hi_critical` double DEFAULT NULL,
  `hi_normal` double DEFAULT NULL,
  `low_absolute` double DEFAULT NULL,
  `low_critical` double DEFAULT NULL,
  `low_normal` double DEFAULT NULL,
  `units` varchar(50) DEFAULT NULL,
  `precise` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`concept_id`),
  CONSTRAINT `numeric_attributes` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_numeric`
--

LOCK TABLES `concept_numeric` WRITE;
/*!40000 ALTER TABLE `concept_numeric` DISABLE KEYS */;
INSERT INTO `concept_numeric` VALUES (21,NULL,NULL,17.8,NULL,7,10.4,'g/dL',1),(1053,NULL,NULL,NULL,NULL,NULL,NULL,'# children',0),(5085,250,NULL,NULL,0,NULL,NULL,'mmHg',0),(5086,150,NULL,NULL,0,NULL,NULL,'mmHg',0),(5088,43,NULL,NULL,25,NULL,NULL,'DEG C',1),(5089,250,NULL,NULL,0,NULL,NULL,'kg',1),(5090,228,NULL,NULL,10,NULL,NULL,'cm',1),(5242,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(5624,NULL,NULL,NULL,NULL,NULL,NULL,'# pregnancies',0);
/*!40000 ALTER TABLE `concept_numeric` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_proposal`
--

DROP TABLE IF EXISTS `concept_proposal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_proposal` (
  `concept_proposal_id` int(11) NOT NULL AUTO_INCREMENT,
  `concept_id` int(11) DEFAULT NULL,
  `encounter_id` int(11) DEFAULT NULL,
  `original_text` varchar(255) NOT NULL DEFAULT '',
  `final_text` varchar(255) DEFAULT NULL,
  `obs_id` int(11) DEFAULT NULL,
  `obs_concept_id` int(11) DEFAULT NULL,
  `state` varchar(32) NOT NULL DEFAULT 'UNMAPPED',
  `comments` varchar(255) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `locale` varchar(50) NOT NULL DEFAULT '',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`concept_proposal_id`),
  UNIQUE KEY `concept_proposal_uuid_index` (`uuid`),
  KEY `user_who_changed_proposal` (`changed_by`),
  KEY `concept_for_proposal` (`concept_id`),
  KEY `user_who_created_proposal` (`creator`),
  KEY `encounter_for_proposal` (`encounter_id`),
  KEY `proposal_obs_concept_id` (`obs_concept_id`),
  KEY `proposal_obs_id` (`obs_id`),
  CONSTRAINT `concept_for_proposal` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `encounter_for_proposal` FOREIGN KEY (`encounter_id`) REFERENCES `encounter` (`encounter_id`),
  CONSTRAINT `proposal_obs_concept_id` FOREIGN KEY (`obs_concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `proposal_obs_id` FOREIGN KEY (`obs_id`) REFERENCES `obs` (`obs_id`),
  CONSTRAINT `user_who_changed_proposal` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_created_proposal` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_proposal`
--

LOCK TABLES `concept_proposal` WRITE;
/*!40000 ALTER TABLE `concept_proposal` DISABLE KEYS */;
/*!40000 ALTER TABLE `concept_proposal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_proposal_tag_map`
--

DROP TABLE IF EXISTS `concept_proposal_tag_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_proposal_tag_map` (
  `concept_proposal_id` int(11) NOT NULL,
  `concept_name_tag_id` int(11) NOT NULL,
  KEY `mapped_concept_proposal_tag` (`concept_name_tag_id`),
  KEY `mapped_concept_proposal` (`concept_proposal_id`),
  CONSTRAINT `mapped_concept_proposal` FOREIGN KEY (`concept_proposal_id`) REFERENCES `concept_proposal` (`concept_proposal_id`),
  CONSTRAINT `mapped_concept_proposal_tag` FOREIGN KEY (`concept_name_tag_id`) REFERENCES `concept_name_tag` (`concept_name_tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_proposal_tag_map`
--

LOCK TABLES `concept_proposal_tag_map` WRITE;
/*!40000 ALTER TABLE `concept_proposal_tag_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `concept_proposal_tag_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_set`
--

DROP TABLE IF EXISTS `concept_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_set` (
  `concept_set_id` int(11) NOT NULL AUTO_INCREMENT,
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `concept_set` int(11) NOT NULL DEFAULT '0',
  `sort_weight` double DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`concept_set_id`),
  UNIQUE KEY `concept_set_uuid_index` (`uuid`),
  KEY `has_a` (`concept_set`),
  KEY `user_who_created` (`creator`),
  KEY `idx_concept_set_concept` (`concept_id`),
  CONSTRAINT `is_a` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `has_a` FOREIGN KEY (`concept_set`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `user_who_created` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_set`
--

LOCK TABLES `concept_set` WRITE;
/*!40000 ALTER TABLE `concept_set` DISABLE KEYS */;
/*!40000 ALTER TABLE `concept_set` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_set_derived`
--

DROP TABLE IF EXISTS `concept_set_derived`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_set_derived` (
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `concept_set` int(11) NOT NULL DEFAULT '0',
  `sort_weight` double DEFAULT NULL,
  PRIMARY KEY (`concept_id`,`concept_set`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_set_derived`
--

LOCK TABLES `concept_set_derived` WRITE;
/*!40000 ALTER TABLE `concept_set_derived` DISABLE KEYS */;
/*!40000 ALTER TABLE `concept_set_derived` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_source`
--

DROP TABLE IF EXISTS `concept_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_source` (
  `concept_source_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `hl7_code` varchar(50) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `retired` tinyint(1) NOT NULL,
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`concept_source_id`),
  UNIQUE KEY `concept_source_uuid_index` (`uuid`),
  KEY `unique_hl7_code` (`hl7_code`,`retired`),
  KEY `concept_source_creator` (`creator`),
  KEY `user_who_voided_concept_source` (`retired_by`),
  CONSTRAINT `concept_source_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_concept_source` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_source`
--

LOCK TABLES `concept_source` WRITE;
/*!40000 ALTER TABLE `concept_source` DISABLE KEYS */;
/*!40000 ALTER TABLE `concept_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_state_conversion`
--

DROP TABLE IF EXISTS `concept_state_conversion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_state_conversion` (
  `concept_state_conversion_id` int(11) NOT NULL AUTO_INCREMENT,
  `concept_id` int(11) DEFAULT '0',
  `program_workflow_id` int(11) DEFAULT '0',
  `program_workflow_state_id` int(11) DEFAULT '0',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`concept_state_conversion_id`),
  UNIQUE KEY `concept_state_conversion_uuid_index` (`uuid`),
  UNIQUE KEY `unique_workflow_concept_in_conversion` (`program_workflow_id`,`concept_id`),
  KEY `concept_triggers_conversion` (`concept_id`),
  KEY `conversion_to_state` (`program_workflow_state_id`),
  CONSTRAINT `concept_triggers_conversion` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `conversion_involves_workflow` FOREIGN KEY (`program_workflow_id`) REFERENCES `program_workflow` (`program_workflow_id`),
  CONSTRAINT `conversion_to_state` FOREIGN KEY (`program_workflow_state_id`) REFERENCES `program_workflow_state` (`program_workflow_state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_state_conversion`
--

LOCK TABLES `concept_state_conversion` WRITE;
/*!40000 ALTER TABLE `concept_state_conversion` DISABLE KEYS */;
/*!40000 ALTER TABLE `concept_state_conversion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concept_word`
--

DROP TABLE IF EXISTS `concept_word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concept_word` (
  `concept_word_id` int(11) NOT NULL AUTO_INCREMENT,
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `word` varchar(50) NOT NULL DEFAULT '',
  `locale` varchar(20) NOT NULL DEFAULT '',
  `concept_name_id` int(11) NOT NULL,
  `weight` double DEFAULT '1',
  PRIMARY KEY (`concept_word_id`),
  KEY `word_in_concept_name` (`word`),
  KEY `concept_word_concept_idx` (`concept_id`),
  KEY `word_for_name` (`concept_name_id`),
  KEY `concept_word_weight_index` (`weight`),
  CONSTRAINT `word_for` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `word_for_name` FOREIGN KEY (`concept_name_id`) REFERENCES `concept_name` (`concept_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept_word`
--

LOCK TABLES `concept_word` WRITE;
/*!40000 ALTER TABLE `concept_word` DISABLE KEYS */;
INSERT INTO `concept_word` VALUES (1,1228,'REACTIVE','en',1228,1),(2,1229,'NON','en',1229,1),(3,1229,'REACTIVE','en',1229,1),(4,703,'POSITIVE','en',703,1),(5,664,'NEGATIVE','en',664,1),(6,299,'VDRL','en',299,1),(7,984,'ORDERED','en',984,1),(8,984,'IMMUNIZATIONS','en',984,1),(9,5864,'FEVER','en',5864,1),(10,5864,'VACCINATION','en',5864,1),(11,5864,'YELLOW','en',5864,1),(12,886,'BACILLE','en',886,1),(13,886,'CAMILE','en',886,1),(14,886,'GUERIN','en',886,1),(15,886,'VACCINATION','en',886,1),(16,36,'MEASLES','en',36,1),(17,36,'VACCINATION','en',36,1),(18,44,'PREGNANCY','en',44,1),(19,5272,'PREGNANCY','en',5272,1),(20,5272,'STATUS','en',5272,1),(21,5596,'CONFINEMENT','en',5596,1),(22,5596,'DATE','en',5596,1),(23,5596,'ESTIMATED','en',5596,1),(24,5624,'GRAVIDA','en',5624,1),(25,1053,'PARITY','en',1053,1),(26,5242,'RATE','en',5242,1),(27,5242,'RESPIRATORY','en',5242,1),(28,5086,'BLOOD','en',5086,1),(29,5086,'DIASTOLIC','en',5086,1),(30,5086,'PRESSURE','en',5086,1),(31,5085,'BLOOD','en',5085,1),(32,5085,'PRESSURE','en',5085,1),(33,5085,'SYSTOLIC','en',5085,1),(34,21,'HEMOGLOBIN','en',21,1),(35,5090,'CM','en',5090,1),(36,5090,'HEIGHT','en',5090,1),(37,5089,'KG','en',5089,1),(38,5089,'WEIGHT','en',5089,1),(39,5088,'C','en',5088,1),(40,5088,'TEMPERATURE','en',5088,1),(41,6100,'VISIT','en',6100,1),(42,6100,'NUMBER','en',6100,1),(43,6101,'TETANUS','en',6101,1),(44,6101,'DOSE','en',6101,1),(45,6101,'TOXOID','en',6101,1),(46,6102,'TREATMENT','en',6102,1),(47,6102,'PREVENTATIVE','en',6102,1),(48,6102,'INTERMITTENT','en',6102,1),(49,6102,'DOSE','en',6102,1),(50,6103,'RESULT','en',6103,1),(51,6103,'TEST','en',6103,1),(52,6103,'HIV','en',6103,1),(53,6104,'TYPE','en',6104,1),(54,6104,'TERMINATION','en',6104,1),(55,6105,'TERMINATION','en',6105,1),(56,6105,'COMPLICATION','en',6105,1),(57,6106,'INFANTS','en',6106,1),(58,6106,'INTERMITTENT','en',6106,1),(59,6106,'TREATMENT','en',6106,1),(60,6106,'PREVENTATIVE','en',6106,1),(61,6106,'DOSE','en',6106,1),(62,6107,'NET','en',6107,1),(63,6107,'USAGE','en',6107,1),(64,6107,'TREATED','en',6107,1),(65,6107,'INSECTICIDE','en',6107,1),(66,6108,'VACCINATION','en',6108,1),(67,6108,'DOSE','en',6108,1),(68,6108,'POLIO','en',6108,1),(69,6108,'ORAL','en',6108,1),(70,6109,'VACCINATION','en',6109,1),(71,6109,'PENTA','en',6109,1),(72,6109,'DOSE','en',6109,1),(73,6110,'CEREBRO','en',6110,1),(74,6110,'SPINAL','en',6110,1),(75,6110,'VACCINATION','en',6110,1),(76,6110,'MENINGITIS','en',6110,1),(77,6111,'VITAMIN','en',6111,1),(78,6112,'CONFIRMED','en',6112,1),(79,6112,'CONFINEMENT','en',6112,1),(80,6112,'DATE','en',6112,1),(81,6113,'MESSAGE','en',6113,1),(82,6113,'REFERENCE','en',6113,1),(83,6113,'PROGRAM','en',6113,1),(84,6113,'ENROLLMENT','en',6113,1),(85,6113,'DATE','en',6113,1),(86,6114,'SERIAL','en',6114,1),(87,6114,'NUMBER','en',6114,1),(88,6115,'NEW','en',6115,1),(89,6115,'CASE','en',6115,1),(90,6116,'REFERRED','en',6116,1),(91,6117,'DIAGNOSIS','en',6117,1),(92,6117,'PRIMARY','en',6117,1),(93,6118,'DIAGNOSIS','en',6118,1),(94,6118,'SECONDARY','en',6118,1),(95,6119,'DELIVERY','en',6119,1),(96,6119,'MODE','en',6119,1),(97,6120,'DELIVERY','en',6120,1),(98,6120,'LOCATION','en',6120,1),(99,6121,'DELIVERED','en',6121,1),(100,6122,'OUTCOME','en',6122,1),(101,6122,'DELIVERY','en',6122,1),(102,6123,'OUTCOME','en',6123,1),(103,6123,'BIRTH','en',6123,1),(104,6124,'MALARIA','en',6124,1),(105,6124,'TEST','en',6124,1),(106,6124,'RAPID','en',6124,1),(107,6125,'TREATMENT','en',6125,1),(108,6125,'VDRL','en',6125,1),(109,6126,'URINE','en',6126,1),(110,6126,'TEST','en',6126,1),(111,6126,'PROTEIN','en',6126,1),(112,6127,'TEST','en',6127,1),(113,6127,'GLUCOSE','en',6127,1),(114,6127,'URINE','en',6127,1),(115,6128,'HEART','en',6128,1),(116,6128,'FETAL','en',6128,1),(117,6128,'RATE','en',6128,1),(118,6129,'HEIGHT','en',6129,1),(119,6129,'FUNDAL','en',6129,1),(120,6130,'REPAIR','en',6130,1),(121,6130,'VVF','en',6130,1),(122,6131,'DEWORMER','en',6131,1),(123,6132,'PMTCT','en',6132,1),(124,6133,'PMTCT','en',6133,1),(125,6133,'TREATMENT','en',6133,1),(126,6134,'TREATMENT','en',6134,1),(127,6134,'ACT','en',6134,1),(128,6135,'COUNSELING','en',6135,1),(129,6135,'HIV','en',6135,1),(130,6135,'TEST','en',6135,1),(131,6135,'PRE','en',6135,1),(132,6136,'COUNSELING','en',6136,1),(133,6136,'POST','en',6136,1),(134,6136,'HIV','en',6136,1),(135,6136,'TEST','en',6136,1),(136,6137,'DELIVERY','en',6137,1),(137,6137,'COMPLICATION','en',6137,1),(138,6138,'ABORTION','en',6138,1),(139,6138,'FP','en',6138,1),(140,6138,'POST','en',6138,1),(141,6138,'COUNSELING','en',6138,1),(142,6139,'ACCEPTED','en',6139,1),(143,6139,'POST','en',6139,1),(144,6139,'FP','en',6139,1),(145,6139,'ABORTION','en',6139,1),(146,6140,'REACTION','en',6140,1),(147,6140,'IPT','en',6140,1),(148,6141,'LOCHIA','en',6141,1),(149,6141,'COLOUR','en',6141,1),(150,6142,'LOCHIA','en',6142,1),(151,6142,'EXCESS','en',6142,1),(152,6142,'AMOUNT','en',6142,1),(153,6143,'UPPER','en',6143,1),(154,6143,'MIDDLE','en',6143,1),(155,6143,'CIRCUMFERENCE','en',6143,1),(156,6143,'ARM','en',6143,1),(157,6144,'MATERNAL','en',6144,1),(158,6144,'DEATH','en',6144,1),(159,6145,'TERMINATION','en',6145,1),(160,6145,'PROCEDURE','en',6145,1),(161,6145,'PREGNANCY','en',6145,1),(162,6146,'CONDITION','en',6146,1),(163,6146,'CORD','en',6146,1),(164,6147,'CONDITION','en',6147,1),(165,6147,'BABY','en',6147,1),(166,6148,'DATE','en',6148,1),(167,6148,'NEXT','en',6148,1),(168,6148,'ANC','en',6148,1),(169,6149,'MALE','en',6149,1),(170,6149,'INVOLVEMENT','en',6149,1),(171,6150,'COMMUNITY','en',6150,1),(172,6151,'HOUSE','en',6151,1),(173,6152,'LOCATION','en',6152,1),(174,6152,'ANC','en',6152,1),(175,6152,'PNC','en',6152,1),(176,6153,'CWC','en',6153,1),(177,6153,'LOCATION','en',6153,1),(178,6154,'COMMENTS','en',6154,1),(179,6155,'ANC','en',6155,1),(180,6155,'NUMBER','en',6155,1),(181,6155,'REGISTRATION','en',6155,1),(182,6156,'NUMBER','en',6156,1),(183,6156,'REGISTRATION','en',6156,1),(184,6156,'CWC','en',6156,1),(185,6157,'INSURED','en',6157,1),(186,6158,'ODOUR','en',6158,1),(187,6158,'FOUL','en',6158,1),(188,6158,'LOCHIA','en',6158,1),(189,6159,'TRACE','en',6159,1),(190,6161,'NEW','en',6161,1),(191,6161,'PATIENT','en',6161,1),(192,6162,'WHY','en',6162,1),(193,6162,'NO','en',6162,1),(194,6162,'HISTORY','en',6162,1),(195,6163,'Vero','it',6163,1),(196,6163,'Sì','it',6164,1),(197,6163,'Verdadeiro','pt',6165,1),(198,6163,'Sim','pt',6166,1),(199,6163,'Vrai','fr',6167,1),(200,6163,'Oui','fr',6168,1),(201,6163,'True','en',6169,1),(202,6163,'Yes','en',6170,1),(203,6163,'Verdadero','es',6171,1),(204,6163,'Sí','es',6172,1),(205,6164,'Falso','it',6173,1),(206,6164,'No','it',6174,1),(207,6164,'Falso','pt',6175,1),(208,6164,'Não','pt',6176,1),(209,6164,'Faux','fr',6177,1),(210,6164,'Non','fr',6178,1),(211,6164,'False','en',6179,1),(212,6164,'No','en',6180,1),(213,6164,'Falso','es',6181,1),(214,6164,'No','es',6182,1);
/*!40000 ALTER TABLE `concept_word` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug`
--

DROP TABLE IF EXISTS `drug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drug` (
  `drug_id` int(11) NOT NULL AUTO_INCREMENT,
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(50) DEFAULT NULL,
  `combination` smallint(6) NOT NULL DEFAULT '0',
  `dosage_form` int(11) DEFAULT NULL,
  `dose_strength` double DEFAULT NULL,
  `maximum_daily_dose` double DEFAULT NULL,
  `minimum_daily_dose` double DEFAULT NULL,
  `route` int(11) DEFAULT NULL,
  `units` varchar(50) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`drug_id`),
  UNIQUE KEY `drug_uuid_index` (`uuid`),
  KEY `primary_drug_concept` (`concept_id`),
  KEY `drug_creator` (`creator`),
  KEY `dosage_form_concept` (`dosage_form`),
  KEY `drug_retired_by` (`retired_by`),
  KEY `route_concept` (`route`),
  CONSTRAINT `dosage_form_concept` FOREIGN KEY (`dosage_form`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `drug_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `drug_retired_by` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `primary_drug_concept` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `route_concept` FOREIGN KEY (`route`) REFERENCES `concept` (`concept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug`
--

LOCK TABLES `drug` WRITE;
/*!40000 ALTER TABLE `drug` DISABLE KEYS */;
/*!40000 ALTER TABLE `drug` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug_ingredient`
--

DROP TABLE IF EXISTS `drug_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drug_ingredient` (
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `ingredient_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ingredient_id`,`concept_id`),
  KEY `combination_drug` (`concept_id`),
  CONSTRAINT `ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `combination_drug` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug_ingredient`
--

LOCK TABLES `drug_ingredient` WRITE;
/*!40000 ALTER TABLE `drug_ingredient` DISABLE KEYS */;
/*!40000 ALTER TABLE `drug_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drug_order`
--

DROP TABLE IF EXISTS `drug_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drug_order` (
  `order_id` int(11) NOT NULL DEFAULT '0',
  `drug_inventory_id` int(11) DEFAULT '0',
  `dose` double DEFAULT NULL,
  `equivalent_daily_dose` double DEFAULT NULL,
  `units` varchar(255) DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL,
  `prn` smallint(6) NOT NULL DEFAULT '0',
  `complex` smallint(6) NOT NULL DEFAULT '0',
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `inventory_item` (`drug_inventory_id`),
  CONSTRAINT `extends_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `inventory_item` FOREIGN KEY (`drug_inventory_id`) REFERENCES `drug` (`drug_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drug_order`
--

LOCK TABLES `drug_order` WRITE;
/*!40000 ALTER TABLE `drug_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `drug_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encounter`
--

DROP TABLE IF EXISTS `encounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encounter` (
  `encounter_id` int(11) NOT NULL AUTO_INCREMENT,
  `encounter_type` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL DEFAULT '0',
  `provider_id` int(11) NOT NULL DEFAULT '0',
  `location_id` int(11) DEFAULT NULL,
  `form_id` int(11) DEFAULT NULL,
  `encounter_datetime` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  PRIMARY KEY (`encounter_id`),
  UNIQUE KEY `encounter_uuid_index` (`uuid`),
  KEY `encounter_ibfk_1` (`creator`),
  KEY `encounter_type_id` (`encounter_type`),
  KEY `encounter_form` (`form_id`),
  KEY `encounter_location` (`location_id`),
  KEY `encounter_patient` (`patient_id`),
  KEY `encounter_provider` (`provider_id`),
  KEY `user_who_voided_encounter` (`voided_by`),
  KEY `encounter_changed_by` (`changed_by`),
  KEY `encounter_datetime_idx` (`encounter_datetime`),
  CONSTRAINT `encounter_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `encounter_form` FOREIGN KEY (`form_id`) REFERENCES `form` (`form_id`),
  CONSTRAINT `encounter_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `encounter_location` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`),
  CONSTRAINT `encounter_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON UPDATE CASCADE,
  CONSTRAINT `encounter_provider` FOREIGN KEY (`provider_id`) REFERENCES `person` (`person_id`),
  CONSTRAINT `encounter_type_id` FOREIGN KEY (`encounter_type`) REFERENCES `encounter_type` (`encounter_type_id`),
  CONSTRAINT `user_who_voided_encounter` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encounter`
--

LOCK TABLES `encounter` WRITE;
/*!40000 ALTER TABLE `encounter` DISABLE KEYS */;
/*!40000 ALTER TABLE `encounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encounter_type`
--

DROP TABLE IF EXISTS `encounter_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encounter_type` (
  `encounter_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `description` text,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`encounter_type_id`),
  UNIQUE KEY `encounter_type_uuid_index` (`uuid`),
  KEY `retired_status` (`retired`),
  KEY `user_who_created_type` (`creator`),
  KEY `user_who_retired_encounter_type` (`retired_by`),
  CONSTRAINT `user_who_created_type` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_encounter_type` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encounter_type`
--

LOCK TABLES `encounter_type` WRITE;
/*!40000 ALTER TABLE `encounter_type` DISABLE KEYS */;
INSERT INTO `encounter_type` VALUES (1,'ADULTINITIAL','Outpatient Adult Initial Visit',1,'2005-02-24 00:00:00',0,NULL,NULL,NULL,'8d5b27bc-c2cc-11de-8d13-0010c6dffd0f'),(2,'ADULTRETURN','Outpatient Adult Return Visit',1,'2005-02-24 00:00:00',0,NULL,NULL,NULL,'8d5b2be0-c2cc-11de-8d13-0010c6dffd0f'),(3,'PEDSINITIAL','Outpatient Pediatric Initial Visit',1,'2005-02-24 00:00:00',0,NULL,NULL,NULL,'8d5b2dde-c2cc-11de-8d13-0010c6dffd0f'),(4,'PEDSRETURN','Outpatient Pediatric Return Visit',1,'2005-02-24 00:00:00',0,NULL,NULL,NULL,'8d5b3108-c2cc-11de-8d13-0010c6dffd0f'),(5,'ANCVISIT','Ghana Antenatal Care (ANC) Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9c94a-e8ec-11e0-8e86-a9cbfc8ed377'),(6,'PREGREGVISIT','Ghana Pregnancy Registration Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9cc60-e8ec-11e0-8e86-a9cbfc8ed377'),(7,'PREGTERMVISIT','Ghana Pregnancy Termination Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9cd46-e8ec-11e0-8e86-a9cbfc8ed377'),(8,'PREGDELVISIT','Ghana Pregnancy Delivery Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9ce04-e8ec-11e0-8e86-a9cbfc8ed377'),(9,'OUTPATIENTVISIT','Ghana Outpatient Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9cee0-e8ec-11e0-8e86-a9cbfc8ed377'),(10,'TTVISIT','Ghana Tetanus outside Pregnancy Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9cf9e-e8ec-11e0-8e86-a9cbfc8ed377'),(11,'CWCVISIT','Ghana Child Immunization Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9d066-e8ec-11e0-8e86-a9cbfc8ed377'),(12,'PNCMOTHERVISIT','Ghana Mother Postnatal Care (PNC) Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9d12e-e8ec-11e0-8e86-a9cbfc8ed377'),(13,'PNCCHILDVISIT','Ghana Child Postnatal Care (PNC) Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9d1f6-e8ec-11e0-8e86-a9cbfc8ed377'),(14,'PREGDELNOTIFYVISIT','Ghana Pregnancy Delivery Notification',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9d2b4-e8ec-11e0-8e86-a9cbfc8ed377'),(15,'ANCREGVISIT','Ghana Antental Care (ANC) Registration',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9d372-e8ec-11e0-8e86-a9cbfc8ed377'),(16,'CWCREGVISIT','Ghana Child Immunization Registration',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9d430-e8ec-11e0-8e86-a9cbfc8ed377'),(17,'BIRTHVISIT','Ghana Child Birth Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9d4ee-e8ec-11e0-8e86-a9cbfc8ed377'),(18,'PATIENTREGVISIT','Ghana Patient Registration Visit',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9d5b6-e8ec-11e0-8e86-a9cbfc8ed377'),(19,'PATIENTHISTORY','Ghana Patient History',1,'2011-09-27 15:06:59',0,NULL,NULL,NULL,'3fa9d674-e8ec-11e0-8e86-a9cbfc8ed377'),(20,'DELIVERY','Ghana Expected Delivery Date (EDD) Notification',1,'2011-09-27 15:07:07',0,NULL,NULL,NULL,'446627c6-e8ec-11e0-8e86-a9cbfc8ed377');
/*!40000 ALTER TABLE `encounter_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field`
--

DROP TABLE IF EXISTS `field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `field` (
  `field_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `field_type` int(11) DEFAULT NULL,
  `concept_id` int(11) DEFAULT NULL,
  `table_name` varchar(50) DEFAULT NULL,
  `attribute_name` varchar(50) DEFAULT NULL,
  `default_value` text,
  `select_multiple` smallint(6) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE KEY `field_uuid_index` (`uuid`),
  KEY `field_retired_status` (`retired`),
  KEY `user_who_changed_field` (`changed_by`),
  KEY `concept_for_field` (`concept_id`),
  KEY `user_who_created_field` (`creator`),
  KEY `type_of_field` (`field_type`),
  KEY `user_who_retired_field` (`retired_by`),
  CONSTRAINT `concept_for_field` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `type_of_field` FOREIGN KEY (`field_type`) REFERENCES `field_type` (`field_type_id`),
  CONSTRAINT `user_who_changed_field` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_created_field` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_field` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
/*!40000 ALTER TABLE `field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field_answer`
--

DROP TABLE IF EXISTS `field_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `field_answer` (
  `field_id` int(11) NOT NULL DEFAULT '0',
  `answer_id` int(11) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`field_id`,`answer_id`),
  UNIQUE KEY `field_answer_uuid_index` (`uuid`),
  KEY `field_answer_concept` (`answer_id`),
  KEY `user_who_created_field_answer` (`creator`),
  CONSTRAINT `answers_for_field` FOREIGN KEY (`field_id`) REFERENCES `field` (`field_id`),
  CONSTRAINT `field_answer_concept` FOREIGN KEY (`answer_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `user_who_created_field_answer` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field_answer`
--

LOCK TABLES `field_answer` WRITE;
/*!40000 ALTER TABLE `field_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `field_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field_type`
--

DROP TABLE IF EXISTS `field_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `field_type` (
  `field_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` longtext,
  `is_set` smallint(6) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`field_type_id`),
  UNIQUE KEY `field_type_uuid_index` (`uuid`),
  KEY `user_who_created_field_type` (`creator`),
  CONSTRAINT `user_who_created_field_type` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field_type`
--

LOCK TABLES `field_type` WRITE;
/*!40000 ALTER TABLE `field_type` DISABLE KEYS */;
INSERT INTO `field_type` VALUES (1,'Concept','',0,1,'2005-02-22 00:00:00','8d5e7d7c-c2cc-11de-8d13-0010c6dffd0f'),(2,'Database element','',0,1,'2005-02-22 00:00:00','8d5e8196-c2cc-11de-8d13-0010c6dffd0f'),(3,'Set of Concepts','',1,1,'2005-02-22 00:00:00','8d5e836c-c2cc-11de-8d13-0010c6dffd0f'),(4,'Miscellaneous Set','',1,1,'2005-02-22 00:00:00','8d5e852e-c2cc-11de-8d13-0010c6dffd0f'),(5,'Section','',1,1,'2005-02-22 00:00:00','8d5e86fa-c2cc-11de-8d13-0010c6dffd0f');
/*!40000 ALTER TABLE `field_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form`
--

DROP TABLE IF EXISTS `form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form` (
  `form_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `version` varchar(50) NOT NULL DEFAULT '',
  `build` int(11) DEFAULT NULL,
  `published` smallint(6) NOT NULL DEFAULT '0',
  `description` text,
  `encounter_type` int(11) DEFAULT NULL,
  `template` mediumtext,
  `xslt` mediumtext,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retired_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`form_id`),
  UNIQUE KEY `form_uuid_index` (`uuid`),
  KEY `user_who_last_changed_form` (`changed_by`),
  KEY `user_who_created_form` (`creator`),
  KEY `form_encounter_type` (`encounter_type`),
  KEY `user_who_retired_form` (`retired_by`),
  KEY `form_published_index` (`published`),
  KEY `form_retired_index` (`retired`),
  KEY `form_published_and_retired_index` (`published`,`retired`),
  CONSTRAINT `form_encounter_type` FOREIGN KEY (`encounter_type`) REFERENCES `encounter_type` (`encounter_type_id`),
  CONSTRAINT `user_who_created_form` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_last_changed_form` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_form` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form`
--

LOCK TABLES `form` WRITE;
/*!40000 ALTER TABLE `form` DISABLE KEYS */;
/*!40000 ALTER TABLE `form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_field`
--

DROP TABLE IF EXISTS `form_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form_field` (
  `form_field_id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) NOT NULL DEFAULT '0',
  `field_id` int(11) NOT NULL DEFAULT '0',
  `field_number` int(11) DEFAULT NULL,
  `field_part` varchar(5) DEFAULT NULL,
  `page_number` int(11) DEFAULT NULL,
  `parent_form_field` int(11) DEFAULT NULL,
  `min_occurs` int(11) DEFAULT NULL,
  `max_occurs` int(11) DEFAULT NULL,
  `required` smallint(6) NOT NULL DEFAULT '0',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `sort_weight` float(11,5) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`form_field_id`),
  UNIQUE KEY `form_field_uuid_index` (`uuid`),
  KEY `user_who_last_changed_form_field` (`changed_by`),
  KEY `user_who_created_form_field` (`creator`),
  KEY `field_within_form` (`field_id`),
  KEY `form_containing_field` (`form_id`),
  KEY `form_field_hierarchy` (`parent_form_field`),
  CONSTRAINT `field_within_form` FOREIGN KEY (`field_id`) REFERENCES `field` (`field_id`),
  CONSTRAINT `form_containing_field` FOREIGN KEY (`form_id`) REFERENCES `form` (`form_id`),
  CONSTRAINT `form_field_hierarchy` FOREIGN KEY (`parent_form_field`) REFERENCES `form_field` (`form_field_id`),
  CONSTRAINT `user_who_created_form_field` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_last_changed_form_field` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_field`
--

LOCK TABLES `form_field` WRITE;
/*!40000 ALTER TABLE `form_field` DISABLE KEYS */;
/*!40000 ALTER TABLE `form_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `global_property`
--

DROP TABLE IF EXISTS `global_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `global_property` (
  `property` varbinary(255) NOT NULL DEFAULT '',
  `property_value` mediumtext,
  `description` text,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`property`),
  UNIQUE KEY `global_property_uuid_index` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `global_property`
--

LOCK TABLES `global_property` WRITE;
/*!40000 ALTER TABLE `global_property` DISABLE KEYS */;
INSERT INTO `global_property` VALUES ('FormEntry.enableDashboardTab','true','true/false whether or not to show a Form Entry tab on the patient dashboard','424190df-8705-4996-8e90-97e936b11e8b'),('FormEntry.enableOnEncounterTab','false','true/false whether or not to show a Enter Form button on the encounters tab of the patient dashboard','6db042a2-53f9-4a08-a192-aa03018e178c'),('concept.causeOfDeath','5002','Concept id of the concept defining the CAUSE OF DEATH concept','e5e9d94e-b437-4a11-9912-85894f55282b'),('concept.cd4_count','5497','Concept id of the concept defining the CD4 count concept','b16f9f8e-8858-4148-9476-e9b54f5481b1'),('concept.false','6164','Concept id of the concept defining the FALSE boolean concept','3b0a61f0-8031-4d34-b7fe-9f6068ded6d7'),('concept.height','5090','Concept id of the concept defining the HEIGHT concept','906e594c-8354-406c-ab69-0bc7aec572c2'),('concept.medicalRecordObservations','1238','The concept id of the MEDICAL_RECORD_OBSERVATIONS concept.  This concept_id is presumed to be the generic grouping (obr) concept in hl7 messages.  An obs_group row is not created for this concept.','d43ac189-0a9b-4dd0-aa3e-be25f6d62bef'),('concept.none','1107','Concept id of the concept defining the NONE concept','9133cc4f-9711-449d-b3af-10202668aef4'),('concept.otherNonCoded','5622','Concept id of the concept defining the OTHER NON-CODED concept','077580c9-102c-493b-bb46-8ac56ff175de'),('concept.patientDied','1742','Concept id of the concept defining the PATIENT DIED concept','843770a7-4789-4d54-82f2-2ed8f5dc53e9'),('concept.problemList','1284','The concept id of the PROBLEM LIST concept.  This concept_id is presumed to be the generic grouping (obr) concept in hl7 messages.  An obs_group row is not created for this concept.','51631e92-7031-4773-a6f9-6af13d9e63a5'),('concept.reasonExitedCare','1811','Concept id of the concept defining the REASON EXITED CARE concept','2bb6ff65-6a19-41b5-b2d2-9df9638336d1'),('concept.reasonOrderStopped','1812','Concept id of the concept defining the REASON ORDER STOPPED concept','d58ab83b-47fe-48e1-b6b7-4c8bc3a4b9f9'),('concept.true','6163','Concept id of the concept defining the TRUE boolean concept','5417ab17-d069-4abe-a736-976ab91e8d17'),('concept.weight','5089','Concept id of the concept defining the WEIGHT concept','825f71e5-735b-41c5-8c76-105ab46c8a4d'),('concepts.locked','false','true/false whether or not concepts can be edited in this database.','efeb98ce-5378-43d6-9612-a75b2bd11589'),('dashboard.encounters.showEditLink','true','true/false whether or not to show the \'Edit Encounter\' link on the patient dashboard','f7561efa-b1d9-41db-b43e-ad7e6c3be99d'),('dashboard.encounters.showEmptyFields','true','true/false whether or not to show empty fields on the \'View Encounter\' window','fe8010a2-366c-4151-b98b-e2477f7a1e8c'),('dashboard.encounters.showViewLink','true','true/false whether or not to show the \'View Encounter\' link on the patient dashboard','bc180d22-4a89-465b-a9ce-f86eab1aa5b6'),('dashboard.encounters.usePages','smart','true/false/smart on how to show the pages on the \'View Encounter\' window.  \'smart\' means that if > 50% of the fields have page numbers defined, show data in pages','18c8a7aa-306f-4a32-92cd-e3cde2770196'),('dashboard.header.programs_to_show','','List of programs to show Enrollment details of in the patient header. (Should be an ordered comma-separated list of program_ids or names.)','f8ba7a26-a2d1-4690-a573-0b31880088c2'),('dashboard.header.workflows_to_show','','List of programs to show Enrollment details of in the patient header. List of workflows to show current status of in the patient header. These will only be displayed if they belong to a program listed above. (Should be a comma-separated list of program_workflow_ids.)','c1ba23e8-01fe-4c22-9172-02da2a530bfd'),('dashboard.overview.showConcepts','','Comma delimited list of concepts ids to show on the patient dashboard overview tab','78865210-ba6c-4a21-a37d-a454e39b98cd'),('dashboard.regimen.displayDrugSetIds','ANTIRETROVIRAL DRUGS,TUBERCULOSIS TREATMENT DRUGS','Drug sets that appear on the Patient Dashboard Regimen tab. Comma separated list of name of concepts that are defined as drug sets.','103803c3-eddb-401b-82f1-c2fed2982569'),('dashboard.regimen.displayFrequencies','7 days/week,6 days/week,5 days/week,4 days/week,3 days/week,2 days/week,1 days/week','Frequency of a drug order that appear on the Patient Dashboard. Comma separated list of name of concepts that are defined as drug frequencies.','a34522a0-55fd-4dad-a21b-7604fad32fab'),('dashboard.regimen.standardRegimens','<list>  <regimenSuggestion>    <drugComponents>      <drugSuggestion>        <drugId>2</drugId>        <dose>1</dose>        <units>tab(s)</units>        <frequency>2/day x 7 days/week</frequency>        <instructions></instructions>      </drugSuggestion>    </drugComponents>    <displayName>3TC + d4T(30) + NVP (Triomune-30)</displayName>    <codeName>standardTri30</codeName>    <canReplace>ANTIRETROVIRAL DRUGS</canReplace>  </regimenSuggestion>  <regimenSuggestion>    <drugComponents>      <drugSuggestion>        <drugId>3</drugId>        <dose>1</dose>        <units>tab(s)</units>        <frequency>2/day x 7 days/week</frequency>        <instructions></instructions>      </drugSuggestion>    </drugComponents>    <displayName>3TC + d4T(40) + NVP (Triomune-40)</displayName>    <codeName>standardTri40</codeName>    <canReplace>ANTIRETROVIRAL DRUGS</canReplace>  </regimenSuggestion>  <regimenSuggestion>    <drugComponents>      <drugSuggestion>        <drugId>39</drugId>        <dose>1</dose>        <units>tab(s)</units>        <frequency>2/day x 7 days/week</frequency>        <instructions></instructions>      </drugSuggestion>      <drugSuggestion>        <drugId>22</drugId>        <dose>200</dose>        <units>mg</units>        <frequency>2/day x 7 days/week</frequency>        <instructions></instructions>      </drugSuggestion>    </drugComponents>    <displayName>AZT + 3TC + NVP</displayName>    <codeName>standardAztNvp</codeName>    <canReplace>ANTIRETROVIRAL DRUGS</canReplace>  </regimenSuggestion>  <regimenSuggestion>    <drugComponents>      <drugSuggestion reference=\"../../../regimenSuggestion[3]/drugComponents/drugSuggestion\"/>      <drugSuggestion>        <drugId>11</drugId>        <dose>600</dose>        <units>mg</units>        <frequency>1/day x 7 days/week</frequency>        <instructions></instructions>      </drugSuggestion>    </drugComponents>    <displayName>AZT + 3TC + EFV(600)</displayName>    <codeName>standardAztEfv</codeName>    <canReplace>ANTIRETROVIRAL DRUGS</canReplace>  </regimenSuggestion>  <regimenSuggestion>    <drugComponents>      <drugSuggestion>        <drugId>5</drugId>        <dose>30</dose>        <units>mg</units>        <frequency>2/day x 7 days/week</frequency>        <instructions></instructions>      </drugSuggestion>      <drugSuggestion>        <drugId>42</drugId>        <dose>150</dose>        		<units>mg</units>        <frequency>2/day x 7 days/week</frequency>        <instructions></instructions>      </drugSuggestion>      <drugSuggestion reference=\"../../../regimenSuggestion[4]/drugComponents/drugSuggestion[2]\"/>    </drugComponents>    <displayName>d4T(30) + 3TC + EFV(600)</displayName>    <codeName>standardD4t30Efv</codeName>    <canReplace>ANTIRETROVIRAL DRUGS</canReplace>  </regimenSuggestion>  <regimenSuggestion>    <drugComponents>      <drugSuggestion>        <drugId>6</drugId>        <dose>40</dose>        <units>mg</units>        <frequency>2/day x 7 days/week</frequency>        <instructions></instructions>      </drugSuggestion>      <drugSuggestion reference=\"../../../regimenSuggestion[5]/drugComponents/drugSuggestion[2]\"/>      <drugSuggestion reference=\"../../../regimenSuggestion[4]/drugComponents/drugSuggestion[2]\"/>    </drugComponents>    <displayName>d4T(40) + 3TC + EFV(600)</displayName>    <codeName>standardD4t40Efv</codeName>    <canReplace>ANTIRETROVIRAL DRUGS</canReplace>  </regimenSuggestion></list>','XML description of standard drug regimens, to be shown as shortcuts on the dashboard regimen entry tab','956efd58-1a42-4cae-b735-f65ff717ce02'),('dashboard.relationships.show_types','','Types of relationships separated by commas.  Doctor/Patient,Parent/Child','5f1f18ce-1477-4781-96b0-000baa5d043f'),('dashboard.showPatientName','false','Whether or not to display the patient name in the patient dashboard title. Note that enabling this could be security risk if multiple users operate on the same computer.','fbbbc513-489a-47b8-a4d0-b4f8d53277a5'),('default_locale','en_GB','Specifies the default locale. You can specify both the language code(ISO-639) and the country code(ISO-3166), e.g. \'en_GB\' or just country: e.g. \'en\'','204d262e-c7d1-441f-bdc0-f82a83add0e8'),('default_location','Unknown Location','The name of the location to use as a system default','2b88fd63-f402-4f72-8f99-14a4ffe0d434'),('default_theme','','Default theme for users.  OpenMRS ships with themes of \'green\', \'orange\', \'purple\', and \'legacy\'','f6efa7ae-2ac5-41da-8eb0-189390128340'),('encounterForm.obsSortOrder','number','The sort order for the obs listed on the encounter edit form.  \'number\' sorts on the associated numbering from the form schema.  \'weight\' sorts on the order displayed in the form schema.','a6813d3c-95f4-4a02-8c68-659750dec755'),('graph.color.absolute','rgb(20,20,20)','Color of the \'invalid\' section of numeric graphs on the patient dashboard.','a60ba8ac-378c-4fda-8b84-5af9694a535f'),('graph.color.critical','rgb(200,0,0)','Color of the \'critical\' section of numeric graphs on the patient dashboard.','b1c28d6c-1dc0-4ac2-af35-ae31ff975e97'),('graph.color.normal','rgb(255,126,0)','Color of the \'normal\' section of numeric graphs on the patient dashboard.','89ede16d-a319-4260-b8f1-b284b617b732'),('gzip.enabled','false','Set to \'true\' to turn on OpenMRS\'s gzip filter, and have the webapp compress data before sending it to any client that supports it. Generally use this if you are running Tomcat standalone. If you are running Tomcat behind Apache, then you\'d want to use Apache to do gzip compression.','c4fb4e14-3868-4e14-a79f-8fc7ded77243'),('hl7_archive.dir','hl7_archives','The default name or absolute path for the folder where to write the hl7_in_archives.','0056d22a-5de6-49cb-872f-7ae016c31898'),('hl7_processor.ignore_missing_patient_non_local','false','If true, hl7 messages for patients that are not found and are non-local will silently be dropped/ignored','5ddddfff-6f15-4a80-80a1-7b17e7c34176'),('htmlformentry.database_version','1.0.0','DO NOT MODIFY.  Current database version number for the htmlformentry module.','2f905b3e-b998-4ebf-81ed-9ea79573bc1f'),('htmlformentry.started','true','DO NOT MODIFY. true/false whether or not the htmlformentry module has been started.  This is used to make sure modules that were running  prior to a restart are started again','79a48650-b4d2-4e95-9e0c-224ec5af9549'),('idgen.database_version','1.5.1','DO NOT MODIFY.  Current database version number for the idgen module.','14d91226-06b4-416d-a105-cd455358b92b'),('idgen.started','true','DO NOT MODIFY. true/false whether or not the idgen module has been started.  This is used to make sure modules that were running  prior to a restart are started again','daaf29fc-4a83-4b6b-a794-ecb081a4ac9f'),('layout.address.format','general','Format in which to display the person addresses.  Valid values are general, kenya, rwanda, usa, and lesotho','57cf90f0-3c3e-46e0-beb6-31d4c3b1314b'),('layout.name.format','short','Format in which to display the person names.  Valid values are short, long','d8ad95c2-c379-4421-b9cb-2d1bdf2aa9eb'),('locale.allowed.list','en, es, fr, it, pt','Comma delimited list of locales allowed for use on system','e057a422-12db-49e1-a2c2-845ed975fa2b'),('location.field.style','default','Type of widget to use for location fields','9cc9c03d-44ab-48ad-a395-4142cdbded02'),('log.level.openmrs','info','log level used by the logger \'org.openmrs\'. This value will override the log4j.xml value. Valid values are trace, debug, info, warn, error or fatal','50c93021-bd5d-40ba-9c99-d131ef80249f'),('logic.database_version','1.4','DO NOT MODIFY.  Current database version number for the logic module.','639532b4-96f5-46e2-9210-5153460b0e1e'),('logic.default.ruleClassDirectory','logic/class','Default folder where compiled rule will be stored','031ac657-59d6-4967-81e4-589448ab6ef6'),('logic.default.ruleJavaDirectory','logic/sources','Default folder where rule\'s java file will be stored','3b9019ff-b4f0-40e8-abce-a171eba4904a'),('logic.defaultTokens.conceptClasses','','When registering default tokens for logic, if you specify a comma-separated list of concept class names here, only concepts of those classes will have tokens registered. If you leave this blank, all classes will have tokens registered for their concepts.','57bfcb7b-fd38-4292-a7d0-28581bb8cbe4'),('logic.mandatory','false','true/false whether or not the logic module MUST start when openmrs starts.  This is used to make sure that mission critical modules are always running if openmrs is running.','35650dd5-ce86-47aa-aec4-0bcdcc23e813'),('logic.started','true','DO NOT MODIFY. true/false whether or not the logic module has been started.  This is used to make sure modules that were running  prior to a restart are started again','e4b733b1-1f2e-4937-a4a4-c77df34e97c8'),('mail.debug','false','true/false whether to print debugging information during mailing','add19d10-f477-4cf2-a7ad-39b7fc27e8be'),('mail.default_content_type','text/plain','Content type to append to the mail messages','cae79bf7-6aab-4684-9a41-76d12adfb385'),('mail.from','info@openmrs.org','Email address to use as the default from address','27a4af4a-94c9-4063-9306-272866669d1b'),('mail.password','test','Password for the SMTP user (if smtp_auth is enabled)','9164a259-44f4-40f6-9468-c86a708b3fbc'),('mail.smtp_auth','false','true/false whether the smtp host requires authentication','8e90105b-4182-4cc8-92ca-3df49c0178c6'),('mail.smtp_host','localhost','SMTP host name','f134376a-c294-4c07-a8ea-45e20650091c'),('mail.smtp_port','25','SMTP port','70e1ecf8-b562-49d8-aa80-f82f242d1d73'),('mail.transport_protocol','smtp','Transport protocol for the messaging engine. Valid values: smtp','2c40dcaf-af92-4c99-99bc-0e344662d07e'),('mail.user','test','Username of the SMTP user (if smtp_auth is enabled)','5a70bfd9-d143-4564-9f9e-152407028c16'),('minSearchCharacters','3','Number of characters user must input before searching is started.','d3c7ff74-0f85-4f65-ab9a-30bb43124d61'),('module_repository_folder','modules','Name of the folder in which to store the modules','dd349e69-ca1a-4ff9-ad9c-6ed557733279'),('motechmodule.database_version','6.0','DO NOT MODIFY.  Current database version number for the motechmodule module.','3f203bca-dbb0-47b6-89c4-8ff1a53b3042'),('motechmodule.max_query_results','50','Maximum number of results returned to users','b3a111e0-9187-4566-ac54-16b25890da28'),('motechmodule.patient_care_reminders','3','Maximum number of reminders for a specific care to send to a patient','73387f1b-16b4-4772-b1b5-d449b2e90ee3'),('motechmodule.patient_message_delivery_day_of_week','MONDAY','Default day of week to send messages to a patient','389ddfb0-c7f8-43a8-9794-e6f947ff7d32'),('motechmodule.patient_message_delivery_time_of_day','18:00','Default time of day to send messages to a patient','c1d84814-47f3-4133-9117-ea255a50ef60'),('motechmodule.started','true','DO NOT MODIFY. true/false whether or not the motechmodule module has been started.  This is used to make sure modules that were running  prior to a restart are started again','4e0e57df-7344-43fb-a8b3-1ea3b36d9147'),('motechmodule.support_case_mail_from','no-reply@grameenfoundation.org','email id from which support cases are sent','4539b294-e8ec-11e0-8e86-a9cbfc8ed377'),('motechmodule.support_case_mail_to','motechsupport@grameenfoundation.org','email id to which support cases are sent','453929e6-e8ec-11e0-8e86-a9cbfc8ed377'),('motechmodule.troubled_phone_failures','4','Number of sending failures when phone is considered troubled','63b9b6da-a719-4fe9-a7ee-63e8e7ea5f3b'),('newPatientForm.relationships','','Comma separated list of the RelationshipTypes to show on the new/short patient form.  The list is defined like \'3a, 4b, 7a\'.  The number is the RelationshipTypeId and the \'a\' vs \'b\' part is which side of the relationship is filled in by the user.','81104863-105f-492a-831a-f22b78ffb2c9'),('new_patient_form.showRelationships','false','true/false whether or not to show the relationship editor on the addPatient.htm screen','fe8b0e0d-3bd5-45a9-919b-969eb384afcf'),('obs.complex_obs_dir','complex_obs','Default directory for storing complex obs.','f38778a1-f23f-4329-b037-18db6d4d96c8'),('patient.defaultPatientIdentifierValidator','org.openmrs.patient.impl.LuhnIdentifierValidator','This property sets the default patient identifier validator.  The default validator is only used in a handful of (mostly legacy) instances.  For example, it\'s used to generate the isValidCheckDigit calculated column and to append the string \"(default)\" to the name of the default validator on the editPatientIdentifierType form.','f032ba86-654f-484c-bb04-ab38772eee40'),('patient.headerAttributeTypes','','A comma delimited list of PersonAttributeType names that will be shown on the patient dashboard','8dd24dff-1fb5-47ed-98fc-0532a2ebe2f6'),('patient.identifierPrefix','','This property is only used if patient.identifierRegex is empty.  The string here is prepended to the sql indentifier search string.  The sql becomes \"... where identifier like \'<PREFIX><QUERY STRING><SUFFIX>\';\".  Typically this value is either a percent sign (%) or empty.','a96b39ca-1346-4d69-abd2-97dcee1234e8'),('patient.identifierRegex','','A MySQL regular expression for the patient identifier search strings.  The @SEARCH@ string is replaced at runtime with the user\'s search string.  An empty regex will cause a simply \'like\' sql search to be used','41791d4b-60ae-40ab-9c50-fe72c27924ed'),('patient.identifierSearchPattern','','If this is empty, the regex or suffix/prefix search is used.  Comma separated list of identifiers to check.  Allows for faster searching of multiple options rather than the slow regex. e.g. @SEARCH@,0@SEARCH@,@SEARCH-1@-@CHECKDIGIT@,0@SEARCH-1@-@CHECKDIGIT@ would turn a request for \"4127\" into a search for \"in (\'4127\',\'04127\',\'412-7\',\'0412-7\')\"','c2a419d1-9add-440f-91fc-889a1e90d085'),('patient.identifierSuffix','','This property is only used if patient.identifierRegex is empty.  The string here is prepended to the sql indentifier search string.  The sql becomes \"... where identifier like \'<PREFIX><QUERY STRING><SUFFIX>\';\".  Typically this value is either a percent sign (%) or empty.','bde57fdc-46b4-4dbd-880e-b2b699b71981'),('patient.listingAttributeTypes','','A comma delimited list of PersonAttributeType names that should be displayed for patients in _lists_','8dbd6ecf-a970-4c3b-9190-a41137657135'),('patient.viewingAttributeTypes','','A comma delimited list of PersonAttributeType names that should be displayed for patients when _viewing individually_','3d8babf7-aaa0-4655-92b6-2b0da5f6742c'),('patient_identifier.importantTypes','','A comma delimited list of PatientIdentifier names : PatientIdentifier locations that will be displayed on the patient dashboard.  E.g.: TRACnet ID:Rwanda,ELDID:Kenya','f90ddce2-17d2-4104-ba68-0f0097bc3e97'),('person.searchMaxResults','1000','The maximum number of results returned by patient searches','d6665f66-d604-4123-ac41-aaf8e61cbefc'),('report.xmlMacros','','Macros that will be applied to Report Schema XMLs when they are interpreted. This should be java.util.properties format.','7da8e5b9-e9b4-41c3-b02b-447f6e21acc3'),('reportProblem.url','http://errors.openmrs.org/scrap','The openmrs url where to submit bug reports','5c821a46-fed3-45ba-9112-c3b46b4f2962'),('scheduler.password','test','Password for the OpenMRS user that will perform the scheduler activities','cce8d3bb-5bcf-477b-a493-8d865c76800e'),('scheduler.username','admin','Username for the OpenMRS user that will perform the scheduler activities','8746d940-bf0c-4644-98ce-8b771be00833'),('searchWidget.batchSize','200','The maximum number of search results that are returned by an ajax call','7565ce24-2860-47ab-b42e-118af049a56d'),('searchWidget.runInSerialMode','false','Specifes whether the search widgets should make ajax requests in serial or parallel order, a value of true is appropriate for implementations running on a slow network connection and vice versa','1a52af64-e044-4088-9fca-fada09d321e7'),('searchWidget.searchDelayInterval','400','Specifies time interval in milliseconds when searching, between keyboard keyup event and triggering the search off, should be higher if most users are slow when typing so as to minimise the load on the server','c9346848-85f3-4c8c-95bf-71ce15423abd'),('security.passwordCannotMatchUsername','true','Configure whether passwords must not match user\'s username or system id','d4e29c3a-590c-4e51-af88-547d1e6e98bd'),('security.passwordCustomRegex','','Configure a custom regular expression that a password must match','78558d50-993f-4ec0-8b07-4b53c7293d0b'),('security.passwordMinimumLength','8','Configure the minimum length required of all passwords','9e5bca42-bc4a-4370-8ed4-2e56fac5b8ae'),('security.passwordRequiresDigit','true','Configure whether passwords must contain at least one digit','5c0d3bcf-5500-406d-bb4c-068066ce920b'),('security.passwordRequiresNonDigit','true','Configure whether passwords must contain at least one non-digit','260e1eb4-2336-4159-a809-839651d4f655'),('security.passwordRequiresUpperAndLowerCase','true','Configure whether passwords must contain both upper and lower case characters','28d07d26-c3cb-4c00-a90b-fc187e3fcac6'),('use_patient_attribute.healthCenter','false','Indicates whether or not the \'health center\' attribute is shown when viewing/searching for patients','79ec365a-cd3b-470b-8962-c1b472458919'),('use_patient_attribute.mothersName','false','Indicates whether or not mother\'s name is able to be added/viewed for a patient','ee2d192c-fccd-41c6-bca2-c5cc1caf2166'),('user.headerAttributeTypes','','A comma delimited list of PersonAttributeType names that will be shown on the user dashboard. (not used in v1.5)','9a70a92d-0868-408a-8f85-21c4c743f9d1'),('user.listingAttributeTypes','','A comma delimited list of PersonAttributeType names that should be displayed for users in _lists_','9a51c159-6433-4c9a-a805-61474c46e22e'),('user.viewingAttributeTypes','','A comma delimited list of PersonAttributeType names that should be displayed for users when _viewing individually_','9aceecdb-879e-4346-976f-ca8080ec84e1');
/*!40000 ALTER TABLE `global_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hl7_in_archive`
--

DROP TABLE IF EXISTS `hl7_in_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hl7_in_archive` (
  `hl7_in_archive_id` int(11) NOT NULL AUTO_INCREMENT,
  `hl7_source` int(11) NOT NULL DEFAULT '0',
  `hl7_source_key` varchar(255) DEFAULT NULL,
  `hl7_data` mediumtext NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `message_state` int(1) DEFAULT '2',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`hl7_in_archive_id`),
  UNIQUE KEY `hl7_in_archive_uuid_index` (`uuid`),
  KEY `hl7_in_archive_message_state_idx` (`message_state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hl7_in_archive`
--

LOCK TABLES `hl7_in_archive` WRITE;
/*!40000 ALTER TABLE `hl7_in_archive` DISABLE KEYS */;
/*!40000 ALTER TABLE `hl7_in_archive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hl7_in_error`
--

DROP TABLE IF EXISTS `hl7_in_error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hl7_in_error` (
  `hl7_in_error_id` int(11) NOT NULL AUTO_INCREMENT,
  `hl7_source` int(11) NOT NULL DEFAULT '0',
  `hl7_source_key` text,
  `hl7_data` mediumtext NOT NULL,
  `error` varchar(255) NOT NULL DEFAULT '',
  `error_details` mediumtext,
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`hl7_in_error_id`),
  UNIQUE KEY `hl7_in_error_uuid_index` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hl7_in_error`
--

LOCK TABLES `hl7_in_error` WRITE;
/*!40000 ALTER TABLE `hl7_in_error` DISABLE KEYS */;
/*!40000 ALTER TABLE `hl7_in_error` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hl7_in_queue`
--

DROP TABLE IF EXISTS `hl7_in_queue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hl7_in_queue` (
  `hl7_in_queue_id` int(11) NOT NULL AUTO_INCREMENT,
  `hl7_source` int(11) NOT NULL DEFAULT '0',
  `hl7_source_key` text,
  `hl7_data` mediumtext NOT NULL,
  `message_state` int(1) NOT NULL DEFAULT '0',
  `date_processed` datetime DEFAULT NULL,
  `error_msg` text,
  `date_created` datetime DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`hl7_in_queue_id`),
  UNIQUE KEY `hl7_in_queue_uuid_index` (`uuid`),
  KEY `hl7_source` (`hl7_source`),
  CONSTRAINT `hl7_source` FOREIGN KEY (`hl7_source`) REFERENCES `hl7_source` (`hl7_source_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hl7_in_queue`
--

LOCK TABLES `hl7_in_queue` WRITE;
/*!40000 ALTER TABLE `hl7_in_queue` DISABLE KEYS */;
/*!40000 ALTER TABLE `hl7_in_queue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hl7_source`
--

DROP TABLE IF EXISTS `hl7_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hl7_source` (
  `hl7_source_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`hl7_source_id`),
  UNIQUE KEY `hl7_source_uuid_index` (`uuid`),
  KEY `creator` (`creator`),
  CONSTRAINT `creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hl7_source`
--

LOCK TABLES `hl7_source` WRITE;
/*!40000 ALTER TABLE `hl7_source` DISABLE KEYS */;
INSERT INTO `hl7_source` VALUES (1,'LOCAL','',1,'2006-09-01 00:00:00','8d6b8bb6-c2cc-11de-8d13-0010c6dffd0f');
/*!40000 ALTER TABLE `hl7_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `htmlformentry_html_form`
--

DROP TABLE IF EXISTS `htmlformentry_html_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `htmlformentry_html_form` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `xml_data` mediumtext NOT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `retired` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `User who created htmlformentry_htmlform` (`creator`),
  KEY `Form with which this htmlform is related` (`form_id`),
  KEY `User who changed htmlformentry_htmlform` (`changed_by`),
  CONSTRAINT `User who created htmlformentry_htmlform` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `Form with which this htmlform is related` FOREIGN KEY (`form_id`) REFERENCES `form` (`form_id`),
  CONSTRAINT `User who changed htmlformentry_htmlform` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `htmlformentry_html_form`
--

LOCK TABLES `htmlformentry_html_form` WRITE;
/*!40000 ALTER TABLE `htmlformentry_html_form` DISABLE KEYS */;
/*!40000 ALTER TABLE `htmlformentry_html_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idgen_auto_generation_option`
--

DROP TABLE IF EXISTS `idgen_auto_generation_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `idgen_auto_generation_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier_type` int(11) NOT NULL,
  `source` int(11) NOT NULL,
  `manual_entry_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `automatic_generation_enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `identifier_type` (`identifier_type`),
  KEY `source for idgen_auto_generation_option` (`source`),
  CONSTRAINT `identifier_type for idgen_auto_generation_option` FOREIGN KEY (`identifier_type`) REFERENCES `patient_identifier_type` (`patient_identifier_type_id`),
  CONSTRAINT `source for idgen_auto_generation_option` FOREIGN KEY (`source`) REFERENCES `idgen_identifier_source` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idgen_auto_generation_option`
--

LOCK TABLES `idgen_auto_generation_option` WRITE;
/*!40000 ALTER TABLE `idgen_auto_generation_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `idgen_auto_generation_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idgen_id_pool`
--

DROP TABLE IF EXISTS `idgen_id_pool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `idgen_id_pool` (
  `id` int(11) NOT NULL,
  `source` int(11) DEFAULT NULL,
  `batch_size` int(11) DEFAULT NULL,
  `min_pool_size` int(11) DEFAULT NULL,
  `sequential` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `source for idgen_id_pool` (`source`),
  CONSTRAINT `id for idgen_id_pool` FOREIGN KEY (`id`) REFERENCES `idgen_identifier_source` (`id`),
  CONSTRAINT `source for idgen_id_pool` FOREIGN KEY (`source`) REFERENCES `idgen_identifier_source` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idgen_id_pool`
--

LOCK TABLES `idgen_id_pool` WRITE;
/*!40000 ALTER TABLE `idgen_id_pool` DISABLE KEYS */;
/*!40000 ALTER TABLE `idgen_id_pool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idgen_identifier_source`
--

DROP TABLE IF EXISTS `idgen_identifier_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `idgen_identifier_source` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` char(38) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `identifier_type` int(11) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `retired` tinyint(1) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id for idgen_identifier_source` (`id`),
  KEY `identifier_type for idgen_identifier_source` (`identifier_type`),
  KEY `creator for idgen_identifier_source` (`creator`),
  KEY `changed_by for idgen_identifier_source` (`changed_by`),
  KEY `retired_by for idgen_identifier_source` (`retired_by`),
  CONSTRAINT `identifier_type for idgen_identifier_source` FOREIGN KEY (`identifier_type`) REFERENCES `patient_identifier_type` (`patient_identifier_type_id`),
  CONSTRAINT `creator for idgen_identifier_source` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `changed_by for idgen_identifier_source` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `retired_by for idgen_identifier_source` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idgen_identifier_source`
--

LOCK TABLES `idgen_identifier_source` WRITE;
/*!40000 ALTER TABLE `idgen_identifier_source` DISABLE KEYS */;
INSERT INTO `idgen_identifier_source` VALUES (1,'40fc6a64-e8ec-11e0-8e86-a9cbfc8ed377','MoTeCH ID Generator',NULL,3,1,'2011-09-27 15:07:02',NULL,NULL,0,NULL,NULL,NULL),(2,'40fc6e6a-e8ec-11e0-8e86-a9cbfc8ed377','MoTeCH Staff ID Generator',NULL,4,1,'2011-09-27 15:07:02',NULL,NULL,0,NULL,NULL,NULL),(3,'40fc707c-e8ec-11e0-8e86-a9cbfc8ed377','MoTeCH Facility ID Generator',NULL,5,1,'2011-09-27 15:07:02',NULL,NULL,0,NULL,NULL,NULL),(4,'4123372a-e8ec-11e0-8e86-a9cbfc8ed377','MoTeCH Community ID Generator',NULL,6,1,'2011-09-27 15:07:02',NULL,NULL,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `idgen_identifier_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idgen_log_entry`
--

DROP TABLE IF EXISTS `idgen_log_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `idgen_log_entry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `identifier` varchar(50) NOT NULL,
  `date_generated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `generated_by` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id for idgen_log` (`id`),
  KEY `source for idgen_log` (`source`),
  KEY `generated_by for idgen_log` (`generated_by`),
  CONSTRAINT `source for idgen_log` FOREIGN KEY (`source`) REFERENCES `idgen_identifier_source` (`id`),
  CONSTRAINT `generated_by for idgen_log` FOREIGN KEY (`generated_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idgen_log_entry`
--

LOCK TABLES `idgen_log_entry` WRITE;
/*!40000 ALTER TABLE `idgen_log_entry` DISABLE KEYS */;
/*!40000 ALTER TABLE `idgen_log_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idgen_pooled_identifier`
--

DROP TABLE IF EXISTS `idgen_pooled_identifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `idgen_pooled_identifier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` char(38) NOT NULL,
  `pool_id` int(11) NOT NULL,
  `identifier` varchar(50) NOT NULL,
  `date_used` datetime DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pool_id for idgen_pooled_identifier` (`pool_id`),
  CONSTRAINT `pool_id for idgen_pooled_identifier` FOREIGN KEY (`pool_id`) REFERENCES `idgen_id_pool` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idgen_pooled_identifier`
--

LOCK TABLES `idgen_pooled_identifier` WRITE;
/*!40000 ALTER TABLE `idgen_pooled_identifier` DISABLE KEYS */;
/*!40000 ALTER TABLE `idgen_pooled_identifier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idgen_remote_source`
--

DROP TABLE IF EXISTS `idgen_remote_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `idgen_remote_source` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id for idgen_remote_source` FOREIGN KEY (`id`) REFERENCES `idgen_identifier_source` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idgen_remote_source`
--

LOCK TABLES `idgen_remote_source` WRITE;
/*!40000 ALTER TABLE `idgen_remote_source` DISABLE KEYS */;
/*!40000 ALTER TABLE `idgen_remote_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idgen_seq_id_gen`
--

DROP TABLE IF EXISTS `idgen_seq_id_gen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `idgen_seq_id_gen` (
  `id` int(11) NOT NULL,
  `next_sequence_value` int(11) NOT NULL DEFAULT '-1',
  `base_character_set` varchar(255) NOT NULL,
  `first_identifier_base` varchar(50) NOT NULL,
  `prefix` varchar(20) DEFAULT NULL,
  `suffix` varchar(20) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id for idgen_seq_id_gen` FOREIGN KEY (`id`) REFERENCES `idgen_identifier_source` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idgen_seq_id_gen`
--

LOCK TABLES `idgen_seq_id_gen` WRITE;
/*!40000 ALTER TABLE `idgen_seq_id_gen` DISABLE KEYS */;
INSERT INTO `idgen_seq_id_gen` VALUES (1,-1,'0123456789','123456',NULL,NULL,7),(2,-1,'0123456789','46',NULL,NULL,NULL),(3,-1,'0123456789','1311',NULL,NULL,NULL),(4,-1,'0123456789','130000',NULL,NULL,NULL);
/*!40000 ALTER TABLE `idgen_seq_id_gen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liquibasechangelog`
--

DROP TABLE IF EXISTS `liquibasechangelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `liquibasechangelog` (
  `ID` varchar(63) NOT NULL,
  `AUTHOR` varchar(63) NOT NULL,
  `FILENAME` varchar(200) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `MD5SUM` varchar(32) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`,`AUTHOR`,`FILENAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liquibasechangelog`
--

LOCK TABLES `liquibasechangelog` WRITE;
/*!40000 ALTER TABLE `liquibasechangelog` DISABLE KEYS */;
INSERT INTO `liquibasechangelog` VALUES ('0','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:40','112fa925e7ce223f9dfc1c841176b4c','Custom Change','Run the old sqldiff file to get database up to the 1.4.0.20 version if needed. (Requires \'mysql\' to be on the PATH)',NULL,'1.9.4'),('02232009-1141','nribeka','liquibase-update-to-latest.xml','2011-09-27 15:03:50','aa7af8d8a609c61fd504e6121b8feda','Modify Column','Modify the password column to fit the output of SHA-512 function',NULL,'1.9.4'),('1','upul','liquibase-update-to-latest.xml','2011-09-27 15:03:40','aeb2c081fe662e3375a02ea34696492','Add Column','Add the column to person_attribute type to connect each type to a privilege',NULL,'1.9.4'),('1226348923233-12','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','1ef82a3a056d8fe77c51789ee3e270','Insert Row (x11)','',NULL,'1.9.4'),('1226348923233-13','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','1fbe86152e13998b4e9dfa64f8f99e1','Insert Row (x2)','',NULL,'1.9.4'),('1226348923233-14','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','37d7a09a3680241c2cd870bf875f7679','Insert Row (x4)','',NULL,'1.9.4'),('1226348923233-15','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','6f5fdf6fe4573d335b764e8c3f6dec9','Insert Row (x15)','',NULL,'1.9.4'),('1226348923233-16','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','e3fb7531421d36297f9b551aa14eed3','Insert Row','',NULL,'1.9.4'),('1226348923233-17','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','2c3a40aea75302fa5eda34e68f0b5a8','Insert Row (x2)','',NULL,'1.9.4'),('1226348923233-18','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','a077f3e88c77b1bcfd024568ce97a57','Insert Row (x2)','',NULL,'1.9.4'),('1226348923233-2','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','17915c6b808f125502a8832f191896a','Insert Row (x5)','',NULL,'1.9.4'),('1226348923233-20','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','74d4c95919a87ad385f4678c05befeb','Insert Row','',NULL,'1.9.4'),('1226348923233-21','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','cad8f9efce142229ad5030139ae2ee62','Insert Row','',NULL,'1.9.4'),('1226348923233-22','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','98e8afcf7f83f1f2fe6ae566ae71b','Insert Row','',NULL,'1.9.4'),('1226348923233-23','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','877ae775e48051291b94467caebdbf9','Insert Row','',NULL,'1.9.4'),('1226348923233-5','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','e69c9cbc8e906c10b7b19ce95c6fbb','Insert Row','',NULL,'1.9.4'),('1226348923233-6','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','afbc17f0c1c778754be371db868719f','Insert Row (x14)','',NULL,'1.9.4'),('1226348923233-8','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','52afbf2cc39cde1fed9c97b8886ef','Insert Row (x7)','',NULL,'1.9.4'),('1226348923233-9','ben (generated)','liquibase-core-data.xml','2011-09-27 15:03:39','f8de838176dd923fe06ff3346fd2e9c7','Insert Row (x4)','',NULL,'1.9.4'),('1227303685425-1','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:57','4b1d6f6458503aad8cf53c8583648d1','Create Table','',NULL,'1.9.4'),('1227303685425-10','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:58','1ca890687d9198679930117b437bdcb8','Create Table','',NULL,'1.9.4'),('1227303685425-100','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:11','c4f0efe639c65a0ca719a7672c9ae99','Create Index','',NULL,'1.9.4'),('1227303685425-101','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:11','ec489290e24b9bc8e7cefa4cb193a5','Create Index','',NULL,'1.9.4'),('1227303685425-102','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:11','3fffc270441f9846be7f6f15b9186fe','Create Index','',NULL,'1.9.4'),('1227303685425-103','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:11','5bca419b6ce805277a7f1e853492965','Create Index','',NULL,'1.9.4'),('1227303685425-104','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:12','f5921bfce0567fad9dbebf4a464b7b8','Create Index','',NULL,'1.9.4'),('1227303685425-105','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:12','a8e830de2d9b5b30b5cee4f96e3d4f','Create Index','',NULL,'1.9.4'),('1227303685425-106','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:12','7e434b23ab45109451cc494fc7b66831','Create Index','',NULL,'1.9.4'),('1227303685425-107','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:12','347132fbd16c8712058e1f95765ce26','Create Index','',NULL,'1.9.4'),('1227303685425-108','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:12','5b4184878459e4fc9341a43b4be64ef','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-109','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:12','c2bfb4e612aa1973f1c365ad7118f342','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-11','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:58','fa7989647192649dc172d64046eb90','Create Table','',NULL,'1.9.4'),('1227303685425-110','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:12','d6659d52c5bcac8b59fb8ba1a37f86','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-111','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:12','f995cd7d34245c41d575977cf271ccc6','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-112','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:13','83c9df4fa7c9a7d84cdd930ff59776','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-113','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:13','581e495dd2e0605b389c1d497388786f','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-114','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:13','833048d0b4aae48cec412ca39b7b742','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-115','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:13','a08b4c2b2cced32d89b1d4b31b97458','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-116','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:13','eeec2cd3e6dddfebf775011fb81bd94','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-117','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:13','9f80b1cfa564da653099bec7178a435','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-118','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:13','1e5f598cefabaaa8ef2b1bec0b95597','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-119','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:13','698c2d5e06fb51de417d1ed586129','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-12','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:58','9375592183aa2b5d4ad11a937595d9','Create Table','',NULL,'1.9.4'),('1227303685425-120','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:14','d05ee670738deebde0131d30112ec4ae','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-121','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:14','b248338c8498759a3ea4de4e3b667793','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-122','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:14','f2636dd6c2704c55fb9747b3b8a2a','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-123','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:14','307598cfdfdae399ad1ce3e7c4a8467','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-124','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:14','ce9674c37a991460aed032ad5cb7d89','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-125','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:14','dface46a9bf5a1250d143e868208865','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-126','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:14','de1299f5403e3360e1c2c53390a8b29c','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-127','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:14','5e7f8e3b6bf0fc792f3f302d7cb2b3','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-128','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:15','2d81a031cf75efab818d6e71fd344c24','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-129','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:15','ad7b4d0e76518df21fff420664ea52','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-13','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:58','8a81103ce3bf6f96ae9a3cd5ea11da4','Create Table','',NULL,'1.9.4'),('1227303685425-130','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:15','ca1a1a1be5462940b223815c43d43ee','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-131','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:15','1e994b0469d1759c69824fa79bb47e','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-132','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:15','71079c961b9b64fc0642ed69b944bef','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-133','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:15','b7f75569bbf9932631edb2ded9a412','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-134','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:15','bfdf173f27999984c8fef82bb496c880','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-135','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:15','fceb5cc5466c89f54fab47951181ead','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-136','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:16','05f6a40bc30fe272b4bd740ad7709f','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-137','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:16','e4d42fbfe1248f205c9221b884c8e71','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-138','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:16','9ebf8d9bb9541ceba5a7ed25d55978','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-139','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:16','4ab8e4364cdb9f61f512845b537a5e33','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-14','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:58','2b11cd2e016b3967d4806872727ec7','Create Table','',NULL,'1.9.4'),('1227303685425-140','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:16','48d01547623e48d3b4d11d547c28c28','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-141','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:16','1f2917f6f1523ca240c9dfd44ccdfa66','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-142','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:16','d826371493865456e85a06649e83a9d','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-143','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:16','669e47429cecc0ebe20c9e4724ad1b','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-144','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:17','fc622179fac4171f122cdbb217a5332','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-145','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:17','3ab7a04513262a248a1584ea9eb6342','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-146','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:17','9c9b88b77c842272ab95b913d2c45f1','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-147','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:17','6d2f3c8fd1a6fd222cd9e64626ec2414','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-148','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:17','7f99bbffa5152188ccd74e889cc69344','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-149','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:17','2971495b795edfbc771618d9d178179','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-15','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:58','2b1462a7269e8d188326f9439ec1a0','Create Table','',NULL,'1.9.4'),('1227303685425-150','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:17','7453c6b2dc234075444921641f038cf','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-151','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:18','62bfd65133eb8649823b76e28f749ae4','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-152','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:18','41f97398c21bcc4f3bbfa57ac36167','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-153','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:18','34a3388e508254798882f090113b91e9','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-154','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:18','cd1c528d9bbd8cd521f55f51507f2448','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-155','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:18','59169212323db3843f2d240afaab688','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-156','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:18','cb904d9071798e490aaf1a894777b','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-157','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:18','ec5e335c2d6ef840ba839d2d7cab26bf','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-158','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:19','edba928f8f3af2b720d1ae52c3da29','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-159','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:19','1d631d1b5585f307b5bba3e94104897','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-16','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:59','4a97582b5459ea8f1d718cc7044517b','Create Table','',NULL,'1.9.4'),('1227303685425-160','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:19','5af7bfc7acbef7db5684ff3e662d7b1','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-161','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:19','d65716f46e431b417677fb5754f631cf','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-162','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:19','a823cf39649373bf762fc2ddc9a3b4','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-163','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:19','8efed95ebdac55227fd711cb18c652a','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-164','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:19','f7cb86e864d7b259bb63c73cb4cf1e8','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-165','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:20','5da4fd35f568ae85de6274f6fb179dd','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-166','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:20','d6a910cfe97bc6aed5e54ec1cadd89b','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-167','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:20','adf31a2b3145f38cfc94632966dc0cf','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-168','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:20','d3984f9f372ff0df21db96aeae982cab','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-169','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:20','296119308b945663ddbd5b4b719e53','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-17','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:59','88a9a422647683aedba68c299823683d','Create Table','',NULL,'1.9.4'),('1227303685425-170','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:20','be7a3bc89baac1b0b2e0fe51991bd015','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-171','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:20','ca59f633dbae6e045d58b4cca6cc7c5','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-172','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:21','6325d6535f7cf928fa84a37a72605dfb','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-173','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:21','351518f028727083f95bc8d54c295c2a','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-174','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:21','3e888947a28e23f88510af9514767590','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-175','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:21','5fef7a2498f6d631e1228efc2bdef6c','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-176','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:21','2bd625c243b7583c86a9bffd3215a741','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-177','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:21','426c4bccb537fb3f4c3d3e26fff73018','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-178','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:21','fc3d34e4c7f55660abad9d79fa9f19','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-179','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:21','41071cc7cfeec957e73ede6cec85063','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-18','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:59','44be2c894ba65ba6dff11859325ee1e7','Create Table','',NULL,'1.9.4'),('1227303685425-180','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:22','17f13d77392855ff797b2ee5938150b','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-181','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:22','1e87e405f78834da8449c3dd538ea69','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-182','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:22','7e5895b2826c9b539643c2a52db136bd','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-183','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:22','1ed87f73bb22c85a678e7486ce316e4','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-184','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:22','dd523eb3c0d47022fd3ccde778a7b21','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-185','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:22','bf22dffeb46511b2c54caa2edde81cf','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-186','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:22','bcd25ca2c2592b19d299b434d4e2b855','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-187','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:23','c552885fe12d78ad9d9e902e85c2e','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-188','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:23','1be8a7c821c27ac5f24f37ea72dde4','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-189','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:23','5ebe66c9ad8928b9dd571fbf2e684342','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-19','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:59','8fea50c3c68aa5e3caa8a29ac1ed2bc2','Create Table','',NULL,'1.9.4'),('1227303685425-190','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:23','765abd819360e17b449b349e3c6fb4','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-191','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:23','eefbf72ce449dfa6d87903b9d48fc14','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-192','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:23','c49e3e3ef4748a6d227822ba9d9db75','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-193','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:23','8734c3bf33d23c5167926fde1c2497b1','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-194','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:23','acf63f4166b9efbeec94a33b9873b6','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-195','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:24','a6893ed94b1c673064e64f31e76922e3','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-196','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:24','4d10fc7df1588142908dfe1ecab77983','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-197','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:24','77df8c771bcafcdc69e0f036fa297e56','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-198','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:24','37bb62897883da1e2833a1ab2088edb','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-199','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:24','4dc522cef2d9e8f6679f1ad05d5e971e','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-2','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:57','484d95d2ffed12fa0ee8aee8974b567','Create Table','',NULL,'1.9.4'),('1227303685425-20','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:59','7faf5302b18d5ce205b723bca1542c','Create Table','',NULL,'1.9.4'),('1227303685425-200','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:24','939ac86f57297fc01f80b129247630f5','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-201','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:25','9bf8c421b14fa2c8e5784f89c3d8d65','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-202','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:25','309ecd6871c152c8c2f87a80f520a68a','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-203','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:25','c8ac825ea236dd980f088849eb6e974','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-204','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:25','3094b038b0f828dbe7d0296b28eb3f73','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-205','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:25','5a12d2856974981835ba499d73ac1','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-206','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:25','c1abccf6ee7c67d4471cc292fa878aa','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-207','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:25','ef6b7d9cb53938c0e8682daeb5af97e','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-208','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:25','a8a7f2b6ac8fa17b814ab859b4532fd','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-209','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:26','137480e6ed47c390e98547b0551d39f4','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-21','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:59','ea3ef386b2dfb64cb9df5c1fbc6378','Create Table','',NULL,'1.9.4'),('1227303685425-210','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:26','fa37aa2bf95f6b24806ad4fab3b16e26','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-211','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:26','e3cfdbbc639a13bb42471dbecdc2d88','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-212','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:26','6eee35721da53ff117ababbae33bd5','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-213','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:26','c591a16e2a8fcc25ef4aa858692dfef','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-214','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:27','56c3ba4cfa55218d3aa0238ec2275f0','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-215','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:27','48563ec0b8762dce6bf94e068b27cb5','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-216','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:27','396121d768871a53120935cf19420d7','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-217','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:27','ebfbd07cd866453255b3532893163562','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-218','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:27','1530c85467d1b6d6980c794dbfd33f','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-219','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:27','5061bae5afea383d93b6f8b118253d','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-22','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:00','4b9fbcceb5de1c20b8338e96328198','Create Table','',NULL,'1.9.4'),('1227303685425-220','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:27','e4ccb7132533b42c47f77abf5ef26','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-221','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:27','ff49796922743ca6aec19ec3a4ee2d8','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-222','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:28','b6a54d3e4d64fd39ef72efb98dfc936','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-223','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:28','a4de4db8a76fd815c83b53fd5f67fee1','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-224','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:28','22ea56d2224297e8252864e90466c','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-225','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:28','dfccc3b975a9f5b8ec5b27164c2d6d','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-226','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:28','e34f2fe84f1222d6aa5eb652f8d17f44','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-227','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:28','6bf6811bac713b4761afbba7756e1a61','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-228','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:28','4732be71b8c8fbf39bc1df446af78751','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-229','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:28','73d11a5ae7bf33aa516119311cbc16f6','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-23','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:00','88e233ad3125c41ed528a721cfe2345f','Create Table','',NULL,'1.9.4'),('1227303685425-230','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:29','ee2e35bc91b5e1b01f2048c987caf6c4','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-231','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:29','63bbb76e789fcad6b69bd4c64f5950','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-232','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:29','76be79df3e103cc45f4ee148555e4','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-233','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:29','e7b3a215c88f4d892fa76882e5159f64','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-234','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:29','8c28fb289889fdd53acda37d11112ce2','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-235','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:29','6cdeded260bdceb9e1826d4ffbf5a375','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-236','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:30','28e4b2fa85d59877ad9fa54c6d2b031','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-237','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:30','a1ffd0638df4322f16f8726f98b4f2','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-238','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:30','41aa312b273ec9ebf460faaa6e6b299c','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-239','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:30','20d4b6e95fcfb79a613a24cf75e86c6','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-24','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:00','b2efc086868b3c3274b7d68014b6ea93','Create Table','',NULL,'1.9.4'),('1227303685425-240','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:30','589dcc4157bfcf62a427f2ce7e4e1c29','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-241','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:30','52bde811efcc8b60f64bc0317ee6045','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-242','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:30','c58692cfa01f856a60b98215ba62e5a7','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-243','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:30','6d44d317d139438e24ff60424ea7df8d','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-244','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:31','e6e61db0f6b2f486a52797219e8545f','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-245','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:31','f5403a8a515082dd136af948e6bf4c97','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-246','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:31','fa4d4b30d92fa994ee2977a353a726f1','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-247','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:31','67b39f2b2132f427ff2a6fcf4a79bdeb','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-248','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:31','e67632f4fa63536017f3bcecb073de71','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-249','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:31','4c81272b8d3d7e4bd95a8cf8e9a91e6a','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-25','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:00','add581f3645d35c6ef17892ea196362','Create Table','',NULL,'1.9.4'),('1227303685425-250','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:31','54fb2e3a25332da06e38a9d2b43badfd','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-251','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:31','fb1a29f3188a43c1501e142ba09fd778','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-252','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:32','e5c417adb79757dd942b194ad59cd2e3','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-253','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:32','412115fd6d7bedbba0d3439617328693','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-254','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:32','e76b81d6b51f58983432c296f319e48','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-255','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:32','80703c6fd0656cf832f32f75ad64f3','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-256','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:32','88b295bfc4d05f928c8d7cbf36c84d','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-257','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:33','853fb4af8c20137ecf9d858713cff6','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-258','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:33','c33b2874e3d38ddef784a0ccb03e3f74','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-259','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:33','bb18dfa78fe1322413ff4f0871712a','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-26','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:00','d11eef4b608b5de1be8c24f4cef73a1','Create Table','',NULL,'1.9.4'),('1227303685425-260','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:33','f0953d50abcef615f855b6d6ef0bbd3','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-261','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:33','2e24f8fdf2b3dfb9abb02ccaeee87f4','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-262','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:33','28d3165b5789d4ccb62ac271c8d86bdd','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-263','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:33','7f93b659cc1a2a66c8666f7ab5793b','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-264','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:33','c51f76c76ca7945eeb2423b56fd754ff','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-265','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:34','46b310f19ea8c0da3afd50c7f2717f2','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-266','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:34','aa7981765d72e6c22281f91c71602ce2','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-267','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:34','b2bc8373ebb491233bea3b6403e2fea','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-268','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:34','f4882dfee1f2ffac3be37258a8ec4c43','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-269','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:34','4c9212f9fa9f24ef868c7fd5851b7e8f','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-27','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:00','98d1653ea222665c66abb33ccd18853f','Create Table','',NULL,'1.9.4'),('1227303685425-270','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:34','aaf31e19b19f9e4b840d08ea730d1','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-271','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:34','47c543135499fdcd7f1ea1a4a71e495d','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-272','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:34','7df76774c3f25483e4b9612eee98d8','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-273','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:35','6cbef8ca7253e9b6941625756e3ead12','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-274','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:35','99c026624d5987f4a39b124c473da2','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-275','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:35','bab45b77299235943c469ca9e0396cff','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-276','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:35','c50376c85bff6bdf26a4ca97e2bfe','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-277','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:35','e7e8229acc4533fd3fca7534e531063','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-278','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:35','aed02dbce85e293159b787d270e57d63','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-279','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:35','93ce9101c3bc7214721f3163b11c33','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-28','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:00','a185fd8a442e66a329161f429e8c10f5','Create Table','',NULL,'1.9.4'),('1227303685425-280','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:35','cef4a9e68e71659662adddd67c976','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-281','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:36','929d293722d1d652834da0ceefa9c841','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-282','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:36','7a2834f44349838fcfbcb61648bc8a0','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-283','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:36','dd19eeb1b52497428e644a84f0653c8e','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-284','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:36','8bc32e874e45a6cdd60184e9c92d6c4','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-285','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:36','66af85da9d747cf7b13b19c358fd93c','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-286','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:36','14ac9a98a545c5b172c021486d1d36','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-287','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:36','7c4e227cf011839ef78fb4a83ed59d6','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-288','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:37','ab73c07b88fcfd7fffcd2bd41e05ec8','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-289','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:37','ffb7495ff05d83cf97d9986f895efe0','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-29','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:01','3524a06b47e415769fd22f9bd6442d6','Create Table','',NULL,'1.9.4'),('1227303685425-290','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:37','fd25f4e5377a68bc11f6927ec4ba1dc','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-291','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:37','fbdd163ca23861baa2f84dce077b6c','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-292','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:37','d0eebd47c26dc07764741ee4b1ac72','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-293','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:37','28b8cd9a32fb115c9c746712afa223','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-294','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:37','ada81a1d3e575780a54bbe79643db8fc','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-295','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:37','93e944816ec2dc7b31984a9e4932f3bb','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-296','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:38','54d71bd27cb66b9eb12716bdce3c7c','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-297','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:38','a9429cc74fb131d5d50899a402b21f','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-298','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:38','e38bd6437d3ce8274e16d02e73e976a8','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-299','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:38','2dcda62270603cbfa1581d1339b0a18e','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-3','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:57','1eeb9f4467c832c61b2cadf8da592ba9','Create Table','',NULL,'1.9.4'),('1227303685425-30','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:01','b9cbeed525ae08c4f696bda851227be','Create Table','',NULL,'1.9.4'),('1227303685425-300','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:38','c861c2e3e1fcbae170b5fe8c161ba7c9','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-301','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:38','0444230b26f283b1b4b4c3583ca6a2','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-302','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:38','3ae36b982c1a4dc32b623ed7eab649','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-303','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:38','dabab8dcefdde7eefee9d8cc177725','Add Foreign Key Constraint','',NULL,'1.9.4'),('1227303685425-31','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:01','3242cd7de7211c9d3331dfb854afdabf','Create Table','',NULL,'1.9.4'),('1227303685425-32','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:01','8149ef2df786f5e2f7965547ac66d1','Create Table','',NULL,'1.9.4'),('1227303685425-33','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:01','59b63eeddd85b6e75834d5ce529622','Create Table','',NULL,'1.9.4'),('1227303685425-34','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:01','7363eda0ec9d3d747381124a9984be0','Create Table','',NULL,'1.9.4'),('1227303685425-35','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:01','88c2f1f647e779f89929826a776fddc6','Create Table','',NULL,'1.9.4'),('1227303685425-36','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:02','a822d3f8bdcdb8ba93d164244d681f19','Create Table','',NULL,'1.9.4'),('1227303685425-37','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:02','ad9c5348bed3c5416789fe87923b60','Create Table','',NULL,'1.9.4'),('1227303685425-38','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:02','25c5c2d1727636891151ad31d1e70cd','Create Table','',NULL,'1.9.4'),('1227303685425-39','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:02','67727fb610365d2da6efb233d77f5ada','Create Table','',NULL,'1.9.4'),('1227303685425-4','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:57','9046b645b2dff85ac97ddf1ad6f3074','Create Table','',NULL,'1.9.4'),('1227303685425-40','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:03','c136d2cb06570483dcf5f585ff754f','Create Table','',NULL,'1.9.4'),('1227303685425-41','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:03','f0f7a7a4bf316add1449b49698647ef1','Create Table','',NULL,'1.9.4'),('1227303685425-42','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:03','9678d659e5e8b86b3645dfb5e1cddea0','Create Table','',NULL,'1.9.4'),('1227303685425-43','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:03','40d07fbd79ec3ef39901dc110b4fd75','Create Table','',NULL,'1.9.4'),('1227303685425-44','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:03','637177ae6888cf72e917824068f9a3be','Create Table','',NULL,'1.9.4'),('1227303685425-45','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:03','f32f6038a35c9261a179c3f1dd96bc','Create Table','',NULL,'1.9.4'),('1227303685425-46','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:03','a7b96f4406744ac11bb6a878868e04d','Create Table','',NULL,'1.9.4'),('1227303685425-47','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:04','f5221be8e26cd0f59670598766464641','Create Table','',NULL,'1.9.4'),('1227303685425-48','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:04','11aa9575b3c9f149db94168be6fd324','Create Table','',NULL,'1.9.4'),('1227303685425-49','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:04','13665b264c197c7b30604f0a8a564e4','Create Table','',NULL,'1.9.4'),('1227303685425-5','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:57','38c61d5d99b0ab3c444fe36d95181e1','Create Table','',NULL,'1.9.4'),('1227303685425-50','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:04','98ee82b9722f705320cabb8fc8d9d284','Create Table','',NULL,'1.9.4'),('1227303685425-51','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:04','fe724c66d29e156281396c9d1b29d227','Create Table','',NULL,'1.9.4'),('1227303685425-52','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:04','3654e6f75973aa49246dbd741c726743','Create Table','',NULL,'1.9.4'),('1227303685425-53','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:04','eb398720a35d58159d92e721e66ae6d','Create Table','',NULL,'1.9.4'),('1227303685425-54','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:04','c9ed5a341cef1cbe862b1523b7ce2a5','Create Table','',NULL,'1.9.4'),('1227303685425-55','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:05','d441e31ef661e4402141d14ac5734c1','Create Table','',NULL,'1.9.4'),('1227303685425-56','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:05','aaaef34153e53d2adcc71d90a0955','Create Table','',NULL,'1.9.4'),('1227303685425-57','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:05','d3acd4c3442938508976801dddfee866','Create Table','',NULL,'1.9.4'),('1227303685425-58','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:05','b0c0fd9674f39661e6bff6c78e65fcd3','Create Table','',NULL,'1.9.4'),('1227303685425-59','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:05','6f7e652ad837a378845fa9eb9757b99','Create Table','',NULL,'1.9.4'),('1227303685425-6','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:57','7f540998f53dc2bb2d19de05a14f2','Create Table','',NULL,'1.9.4'),('1227303685425-60','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:05','622543a591c2bab1f089cac341d9ce2','Create Table','',NULL,'1.9.4'),('1227303685425-61','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:06','fe5acec38c81bfb3277e193dd0dcc7','Create Table','',NULL,'1.9.4'),('1227303685425-62','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:06','c4b0da30561adf7d40fcd7da77c574','Create Table','',NULL,'1.9.4'),('1227303685425-63','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:06','45fd4df9a91aaaea2f515dbb8bbaae0','Create Table','',NULL,'1.9.4'),('1227303685425-64','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:06','99138560e6e73c3bf6f54fb792552cf','Create Table','',NULL,'1.9.4'),('1227303685425-65','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:06','4e33e6a7cf3bd773f126612bf0b9','Create Table','',NULL,'1.9.4'),('1227303685425-66','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:06','c223439be520db74976e1c6399b591b0','Create Table','',NULL,'1.9.4'),('1227303685425-67','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:06','6a136f60cfeb7ed87b27fd71825a8','Create Table','',NULL,'1.9.4'),('1227303685425-68','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:07','6744cea65ee820c9addf59d78b446ce8','Create Table','',NULL,'1.9.4'),('1227303685425-69','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:07','c1ee0d08f2c8238f17125d4a58263','Create Table','',NULL,'1.9.4'),('1227303685425-7','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:58','b816bb1dbeecf547611bcd37d29ccd27','Create Table','',NULL,'1.9.4'),('1227303685425-70','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:07','88c072335290bda8394acf5344b5be','Create Table','',NULL,'1.9.4'),('1227303685425-71','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:07','5887deaf859b231a28fca6cd8f53985f','Create Table','',NULL,'1.9.4'),('1227303685425-72','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:07','6e889f9922853419f736de152bab863','Create Table','',NULL,'1.9.4'),('1227303685425-73','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:07','db75ceff7fabd137f5ffde95c02ab814','Add Primary Key','',NULL,'1.9.4'),('1227303685425-74','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:07','d7d5d089c54468ac2cfd638f66fcb4','Add Primary Key','',NULL,'1.9.4'),('1227303685425-75','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:08','39dd463941e952d670a5c44194bfe578','Add Primary Key','',NULL,'1.9.4'),('1227303685425-76','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:08','dc6155351d7db68e99ff6e95bbc87be','Add Primary Key','',NULL,'1.9.4'),('1227303685425-77','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:08','4fee106cf921289c298f9c67fc87c7c5','Add Primary Key','',NULL,'1.9.4'),('1227303685425-78','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:08','3a3de23a22ae9c344b47a4d939e6ff70','Add Primary Key','',NULL,'1.9.4'),('1227303685425-79','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:08','88ab4066e17d3a326dc54e5837c09f41','Add Primary Key','',NULL,'1.9.4'),('1227303685425-8','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:58','e55f3abe82ce4b674bcdc1b4996b8b9','Create Table','',NULL,'1.9.4'),('1227303685425-80','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:08','940c1a878d7788f304e14cf4c3394c7','Add Primary Key','',NULL,'1.9.4'),('1227303685425-81','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:08','219f4f94772b86a6785a1168655d630','Add Primary Key','',NULL,'1.9.4'),('1227303685425-82','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:08','4e2676797833eba977cbcae8806c05f','Add Primary Key','',NULL,'1.9.4'),('1227303685425-83','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:09','587abb7e972b9dbae4711c9da4e55b','Add Primary Key','',NULL,'1.9.4'),('1227303685425-84','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:09','9435c219edb4e839af13de48a94f765c','Add Primary Key','',NULL,'1.9.4'),('1227303685425-85','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:09','1bf11ad88f6aeb16115e53aec0aa1fc9','Create Index','',NULL,'1.9.4'),('1227303685425-86','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:09','1e8c4a47a221a275929253c81814e3','Create Index','',NULL,'1.9.4'),('1227303685425-87','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:09','d7aa9fb9b259691ef965935112690c6','Create Index','',NULL,'1.9.4'),('1227303685425-88','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:09','8637a8777e63c352c513c78c60a435fb','Create Index','',NULL,'1.9.4'),('1227303685425-89','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:09','8124613e1c06fe7dbdd82ec7d77b513','Create Index','',NULL,'1.9.4'),('1227303685425-9','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:02:58','ee733a5ef91bcfc5b5a366e4d672c6d4','Create Table','',NULL,'1.9.4'),('1227303685425-90','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:10','ce32a6b73bddd39523fd702837d5e0ac','Create Index','',NULL,'1.9.4'),('1227303685425-91','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:10','8b88d2f395eb2b5c7a48a2691527335a','Create Index','',NULL,'1.9.4'),('1227303685425-92','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:10','9935e165ac0c994c840f0b6ad7e6ea9','Create Index','',NULL,'1.9.4'),('1227303685425-93','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:10','1d54748d2664161ec2a4ec4761dfcbe','Create Index','',NULL,'1.9.4'),('1227303685425-94','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:10','e4cbe444f931f7892fe1ff2cc8ef9','Create Index','',NULL,'1.9.4'),('1227303685425-95','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:10','8e83cb5c20116c3bafc2afcec67fbbcd','Create Index','',NULL,'1.9.4'),('1227303685425-96','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:10','844a9c8a5e4772bb4383d22c1b7c4f','Create Index','',NULL,'1.9.4'),('1227303685425-97','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:11','50c460b4b15dbe1c357c9637d29fba2e','Create Index','',NULL,'1.9.4'),('1227303685425-98','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:11','ebc8c01af6a50d966426a572a317d1','Create Index','',NULL,'1.9.4'),('1227303685425-99','ben (generated)','liquibase-schema-only.xml','2011-09-27 15:03:11','82c523688fbc57714736dfa7aafb48','Create Index','',NULL,'1.9.4'),('2','upul','liquibase-update-to-latest.xml','2011-09-27 15:03:43','271913afcc5e1fc2a96a6b12705e60a4','Add Foreign Key Constraint','Create the foreign key from the privilege required for to edit\n			a person attribute type and the privilege.privilege column',NULL,'1.9.4'),('200805281223','bmckown','liquibase-update-to-latest.xml','2011-09-27 15:03:45','ca38d15c388fd3987ee8e997f48bcb43','Create Table, Add Foreign Key Constraint','Create the concept_complex table',NULL,'1.9.4'),('200805281224','bmckown','liquibase-update-to-latest.xml','2011-09-27 15:03:45','ca898c6096d952b57e28c5edc2a957','Add Column','Adding the value_complex column to obs.  This may take a long time if you have a large number of observations.',NULL,'1.9.4'),('200805281225','bmckown','liquibase-update-to-latest.xml','2011-09-27 15:03:45','c951352b0c976e84b83acf3cfcbb9e','Insert Row','Adding a \'complex\' Concept Datatype',NULL,'1.9.4'),('200805281226','bmckown','liquibase-update-to-latest.xml','2011-09-27 15:03:47','b8b85f33a0d9fde9f478d77b1b868c80','Drop Table (x2)','Dropping the mimetype and complex_obs tables as they aren\'t needed in the new complex obs setup',NULL,'1.9.4'),('200809191226','smbugua','liquibase-update-to-latest.xml','2011-09-27 15:03:47','99ca2b5ae282ba5ff1df9c48f5f2e97','Add Column','Adding the hl7 archive message_state column so that archives can be tracked\n			\n			(preCondition database_version check in place because this change was in the old format in trunk for a while)',NULL,'1.9.4'),('200809191927','smbugua','liquibase-update-to-latest.xml','2011-09-27 15:03:47','8acc3bbd9bb21da496f4dbcaacfe16','Rename Column, Modify Column','Adding the hl7 archive message_state column so that archives can be tracked',NULL,'1.9.4'),('200811261102','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:43','7ce199737ad5ea72959eb52ece15ab8','Update Data','Fix field property for new Tribe person attribute',NULL,'1.9.4'),('200901101524','Knoll_Frank','liquibase-update-to-latest.xml','2011-09-27 15:03:47','8b599959a0ae994041db885337fd94e','Modify Column','Changing datatype of drug.retire_reason from DATETIME to varchar(255)',NULL,'1.9.4'),('200901130950','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:47','add260b86fbdfe8ddfd15480f7c12530','Delete Data (x2)','Remove Manage Tribes and View Tribes privileges from all roles',NULL,'1.9.4'),('200901130951','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:47','51eaa74d22ee244cc0cbde5ef4758e1c','Delete Data (x2)','Remove Manage Mime Types, View Mime Types, and Purge Mime Types privilege',NULL,'1.9.4'),('200901161126','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:47','478dceabf15112ad9eccee255df8b','Delete Data','Removed the database_version global property',NULL,'1.9.4'),('20090121-0949','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:47','a38a30d48634ab7268204167761db86c','Custom SQL','Switched the default xslt to use PV1-19 instead of PV1-1',NULL,'1.9.4'),('20090122-0853','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:48','5ef0554257579cb649fe4414efd233e0','Custom SQL, Add Lookup Table, Drop Foreign Key Constraint, Delete Data (x2), Drop Table','Remove duplicate concept name tags',NULL,'1.9.4'),('20090123-0305','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:48','fc5153a938b4ce0aa455ca9fea7ad9','Add Unique Constraint','Add unique constraint to the tags table',NULL,'1.9.4'),('20090214-2246','isherman','liquibase-update-to-latest.xml','2011-09-27 15:03:50','6c77a79fc9913830755829adaa983227','Custom SQL','Add weight and cd4 to patientGraphConcepts user property (mysql specific)',NULL,'1.9.4'),('20090214-2247','isherman','liquibase-update-to-latest.xml','2011-09-27 15:03:50','664dee9bed7b178ea62e8de7a8824045','Custom SQL','Add weight and cd4 to patientGraphConcepts user property (using standard sql)',NULL,'1.9.4'),('20090214-2248','isherman','liquibase-update-to-latest.xml','2011-09-27 15:03:50','489fc62a7b3196ba3887b8a2ddc8d93c','Custom SQL','Add weight and cd4 to patientGraphConcepts user property (mssql specific)',NULL,'1.9.4'),('200902142212','ewolodzko','liquibase-update-to-latest.xml','2011-10-03 17:06:59','ca3341c589781757f7b5f3e73a2b8f5','Add Column','Add a sortWeight field to PersonAttributeType',NULL,'1.9.4'),('200902142213','ewolodzko','liquibase-update-to-latest.xml','2011-10-03 17:06:59','918476ca54d9c1e77076be12012841','Update Data','Add default sortWeights to all current PersonAttributeTypes',NULL,'1.9.4'),('20090224-1229','Keelhaul+bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:48','2112b4bd53e438fc2ac4dc2e60213440','Create Table, Add Foreign Key Constraint (x2)','Add location tags table',NULL,'1.9.4'),('20090224-1250','Keelhaul+bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:49','ae593490311f38ee69962330e3788938','Create Table, Add Foreign Key Constraint (x2), Add Primary Key','Add location tag map table',NULL,'1.9.4'),('20090224-1256','Keelhaul+bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:49','27add85e296c1f22deb2fa17d77a542f','Add Column, Add Foreign Key Constraint','Add parent_location column to location table',NULL,'1.9.4'),('20090225-1551','dthomas','liquibase-update-to-latest.xml','2011-09-27 15:03:50','c490c377e78a9740a765e19aacf076','Rename Column (x2)','Change location_tag.name to location_tag.tag and location_tag.retired_reason to location_tag.retire_reason',NULL,'1.9.4'),('20090301-1259','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:03:50','88d88f5cc99c93c264e6976feef8eecc','Update Data (x2)','Fixes the description for name layout global property',NULL,'1.9.4'),('20090316-1008','vanand','liquibase-update-to-latest.xml','2011-09-27 15:03:58','fcdde237e04473db1e6fd16f56bf80e9','Modify Column (x7), Update Data, Modify Column (x18), Update Data, Modify Column (x11)','Change column types of all boolean columns to smallint. The columns used to be either tinyint(4) or MySQL\'s BIT.\n			(This may take a while on large patient or obs tables)',NULL,'1.9.4'),('200903210905','mseaton','liquibase-update-to-latest.xml','2011-09-27 15:04:00','a13f5939f4ce2a6a9a21c1847d3ab6d','Create Table, Add Foreign Key Constraint (x3)','Add a table to enable generic storage of serialized objects',NULL,'1.9.4'),('20090402-1515-38-cohort','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:01','e5d01ebcda1a2b4ef993a3c859933947','Add Column','Adding \"uuid\" column to cohort table',NULL,'1.9.4'),('20090402-1515-38-concept','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:01','575aaf2321f320331ba877f49a44b8','Add Column','Adding \"uuid\" column to concept table',NULL,'1.9.4'),('20090402-1515-38-concept_answer','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:01','57377447c4be5152c5bb18fdceec2312','Add Column','Adding \"uuid\" column to concept_answer table',NULL,'1.9.4'),('20090402-1515-38-concept_class','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:01','4510924e4fc34a5b4f4786af54a6e9d6','Add Column','Adding \"uuid\" column to concept_class table',NULL,'1.9.4'),('20090402-1515-38-concept_datatype','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:01','ffa6230eb5d1021556b2c106176b081','Add Column','Adding \"uuid\" column to concept_datatype table',NULL,'1.9.4'),('20090402-1515-38-concept_description','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:01','a864b52fe66664a95bb25d08ca0fae4','Add Column','Adding \"uuid\" column to concept_description table',NULL,'1.9.4'),('20090402-1515-38-concept_map','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:01','70db4397c48f719f6b6db9b228a5940','Add Column','Adding \"uuid\" column to concept_map table',NULL,'1.9.4'),('20090402-1515-38-concept_name','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:01','6a5bf2fb43b89825adbab42e32f8c95','Add Column','Adding \"uuid\" column to concept_name table',NULL,'1.9.4'),('20090402-1515-38-concept_name_tag','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:02','e5175d7effbbe1f327f6765c8563de','Add Column','Adding \"uuid\" column to concept_name_tag table',NULL,'1.9.4'),('20090402-1515-38-concept_proposal','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:02','d812c01d4487ee3afd8408d322ae6e9','Add Column','Adding \"uuid\" column to concept_proposal table',NULL,'1.9.4'),('20090402-1515-38-concept_set','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:02','a76a7ad772591c707d1470bfb8e96ebe','Add Column','Adding \"uuid\" column to concept_set table',NULL,'1.9.4'),('20090402-1515-38-concept_source','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:02','82f9e9817631b23dd768d92c451a4b','Add Column','Adding \"uuid\" column to concept_source table',NULL,'1.9.4'),('20090402-1515-38-concept_state_conversion','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:02','da7523634d5355b5bb2dc7ba3b544682','Add Column','Adding \"uuid\" column to concept_state_conversion table',NULL,'1.9.4'),('20090402-1515-38-drug','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:02','867c42ea0b5a864beccff584fa963ff','Add Column','Adding \"uuid\" column to drug table',NULL,'1.9.4'),('20090402-1515-38-encounter','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:03','53d8465949124bc6247b28a4a58121','Add Column','Adding \"uuid\" column to encounter table',NULL,'1.9.4'),('20090402-1515-38-encounter_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:03','ee9b948fa08ad55c3ecd75c32df82d5','Add Column','Adding \"uuid\" column to encounter_type table',NULL,'1.9.4'),('20090402-1515-38-field','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:03','e24dae16c5a010a575c9c1ac84d8eb','Add Column','Adding \"uuid\" column to field table',NULL,'1.9.4'),('20090402-1515-38-field_answer','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:03','7bbeeb1abdc5389f5a7488ee35498b','Add Column','Adding \"uuid\" column to field_answer table',NULL,'1.9.4'),('20090402-1515-38-field_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:04','6271df216ece46cecde2c5f642e84a','Add Column','Adding \"uuid\" column to field_type table',NULL,'1.9.4'),('20090402-1515-38-form','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:04','2569936cbd22e8029253d4e6034f738','Add Column','Adding \"uuid\" column to form table',NULL,'1.9.4'),('20090402-1515-38-form_field','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:04','e237246d492a5d9046edba679c2ef7b4','Add Column','Adding \"uuid\" column to form_field table',NULL,'1.9.4'),('20090402-1515-38-global_property','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:04','77d9d563a6b488dde8856cd8e44e74','Add Column','Adding \"uuid\" column to global_property table',NULL,'1.9.4'),('20090402-1515-38-hl7_in_archive','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:04','cc8aa360f98aedcc8399a46edb48ca7e','Add Column','Adding \"uuid\" column to hl7_in_archive table',NULL,'1.9.4'),('20090402-1515-38-hl7_in_error','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:04','4857a237f2d29901dc2721861b13aa1','Add Column','Adding \"uuid\" column to hl7_in_error table',NULL,'1.9.4'),('20090402-1515-38-hl7_in_queue','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:05','3e0bedc6f28626d1ed8feba9b12744','Add Column','Adding \"uuid\" column to hl7_in_queue table',NULL,'1.9.4'),('20090402-1515-38-hl7_source','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:05','0c1637fe4ec912bdf75f4ec338f42','Add Column','Adding \"uuid\" column to hl7_source table',NULL,'1.9.4'),('20090402-1515-38-location','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:05','2fc3aaf750476ed2df71b6689d941546','Add Column','Adding \"uuid\" column to location table',NULL,'1.9.4'),('20090402-1515-38-location_tag','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:05','b8c3ac793659918dfb140d94207d5d','Add Column','Adding \"uuid\" column to location_tag table',NULL,'1.9.4'),('20090402-1515-38-note','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:05','c4722e59a9be1c47d0569216e92ad63','Add Column','Adding \"uuid\" column to note table',NULL,'1.9.4'),('20090402-1515-38-notification_alert','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:05','7a66a648529a78d215e17023cdf5d5','Add Column','Adding \"uuid\" column to notification_alert table',NULL,'1.9.4'),('20090402-1515-38-notification_template','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:06','739a3826ba3226875d8f944140e1c188','Add Column','Adding \"uuid\" column to notification_template table',NULL,'1.9.4'),('20090402-1515-38-obs','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:06','75c1752f21de4b95569c7ac66e826e2f','Add Column','Adding \"uuid\" column to obs table',NULL,'1.9.4'),('20090402-1515-38-orders','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:06','f19f5e991569bc1341e9dd31a412da43','Add Column','Adding \"uuid\" column to orders table',NULL,'1.9.4'),('20090402-1515-38-order_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:06','f2c93b646d83d969bf8ba09d11d36edd','Add Column','Adding \"uuid\" column to order_type table',NULL,'1.9.4'),('20090402-1515-38-patient_identifier','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:07','dd97565c4ff6c410838a5feb41975d0','Add Column','Adding \"uuid\" column to patient_identifier table',NULL,'1.9.4'),('20090402-1515-38-patient_identifier_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:07','613f3c8d0226c305678d461a89db238','Add Column','Adding \"uuid\" column to patient_identifier_type table',NULL,'1.9.4'),('20090402-1515-38-patient_program','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:07','a2c23c3ef77d8ea9a2406c428e207244','Add Column','Adding \"uuid\" column to patient_program table',NULL,'1.9.4'),('20090402-1515-38-patient_state','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:07','57563194b5fa551f129a9cce1b38e8e7','Add Column','Adding \"uuid\" column to patient_state table',NULL,'1.9.4'),('20090402-1515-38-person','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:07','e8a138182c0ba1053131888f8cf8b4','Add Column','Adding \"uuid\" column to person table',NULL,'1.9.4'),('20090402-1515-38-person_address','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:07','2617c04da91ecda5fd2b45237f5ddd','Add Column','Adding \"uuid\" column to person_address table',NULL,'1.9.4'),('20090402-1515-38-person_attribute','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:07','ae559b7cc39a175062126e4815d762','Add Column','Adding \"uuid\" column to person_attribute table',NULL,'1.9.4'),('20090402-1515-38-person_attribute_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:08','68f914b55c3b3fb7dc2a77fd8d933d2','Add Column','Adding \"uuid\" column to person_attribute_type table',NULL,'1.9.4'),('20090402-1515-38-person_name','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:08','1b8be5c78ca558b45a25d5eaefbbed7','Add Column','Adding \"uuid\" column to person_name table',NULL,'1.9.4'),('20090402-1515-38-privilege','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:08','13d0d85bf5609b955b128fd6f6bc5c6d','Add Column','Adding \"uuid\" column to privilege table',NULL,'1.9.4'),('20090402-1515-38-program','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:08','39a4f7c8c86791b166d280d9b22ae','Add Column','Adding \"uuid\" column to program table',NULL,'1.9.4'),('20090402-1515-38-program_workflow','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:08','70877f3fdcfd50bea8d8d0c19fb115ac','Add Column','Adding \"uuid\" column to program_workflow table',NULL,'1.9.4'),('20090402-1515-38-program_workflow_state','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:08','116efa4fd75f61e034c33a2d4e4c75e2','Add Column','Adding \"uuid\" column to program_workflow_state table',NULL,'1.9.4'),('20090402-1515-38-relationship','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:09','945c9c8a51c2ddfd75195df74b01c37','Add Column','Adding \"uuid\" column to relationship table',NULL,'1.9.4'),('20090402-1515-38-relationship_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:09','09c5c28357a6999636569c43bf1d4a','Add Column','Adding \"uuid\" column to relationship_type table',NULL,'1.9.4'),('20090402-1515-38-report_object','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:09','4bf73bf794f3b6ec1b5dff44e23679','Add Column','Adding \"uuid\" column to report_object table',NULL,'1.9.4'),('20090402-1515-38-report_schema_xml','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:09','2b7354fdbf3a45a725ad7392f73c1d2c','Add Column','Adding \"uuid\" column to report_schema_xml table',NULL,'1.9.4'),('20090402-1515-38-role','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:09','2955291013b5657ffa9eeeb526d5563','Add Column','Adding \"uuid\" column to role table',NULL,'1.9.4'),('20090402-1515-38-serialized_object','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','bbb72e88cde2dd2f44f72c175a75f10','Add Column','Adding \"uuid\" column to serialized_object table',NULL,'1.9.4'),('20090402-1516-cohort','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','c916ab788583392ea698441818ca8b','Update Data','Generating UUIDs for all rows in cohort table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','5cd0f78948d656fbe03411c3872b8d3d','Update Data','Generating UUIDs for all rows in concept table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_answer','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','76742a2d89cdf9216b23ff1cc43f7e2b','Update Data','Generating UUIDs for all rows in concept_answer table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_class','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','b036159e7e6a62be355ab2da84dc6d6','Update Data','Generating UUIDs for all rows in concept_class table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_datatype','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','ffd8b9d259bb98779a6a444a3c597','Update Data','Generating UUIDs for all rows in concept_datatype table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_description','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','471858eb414dd416787873d59ce92d','Update Data','Generating UUIDs for all rows in concept_description table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_map','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','fd1e26504b7b5e227de9a6265cdfaf6a','Update Data','Generating UUIDs for all rows in concept_map table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_name','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','af235654349acd661ecadde2b2c9d29','Update Data','Generating UUIDs for all rows in concept_name table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_name_tag','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','bddb56793bee7cbb59a749557e601b','Update Data','Generating UUIDs for all rows in concept_name_tag table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_proposal','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','d35f42aea2acad9d3eb98a0aa68d','Update Data','Generating UUIDs for all rows in concept_proposal table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_set','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','131a6e5d0c39e32443f72d07f14f86','Update Data','Generating UUIDs for all rows in concept_set table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_source','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','3376f58bc68455beaeca7723e8dfdc','Update Data','Generating UUIDs for all rows in concept_source table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-concept_state_conversion','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','2daca61a968dc1d71dd012c2a770a9a5','Update Data','Generating UUIDs for all rows in concept_state_conversion table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-drug','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','60428b7567bee56397d3ad9c3c74da2','Update Data','Generating UUIDs for all rows in drug table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-encounter','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','855a3866a99360f46dcb54965341a8e','Update Data','Generating UUIDs for all rows in encounter table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-encounter_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','2694d23adc4fec35aabf472b737fc36e','Update Data','Generating UUIDs for all rows in encounter_type table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-field','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','5e406b6bd57710696766bc498b9dc0','Update Data','Generating UUIDs for all rows in field table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-field_answer','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','1b547411666d85b4ee383c2feef3ce','Update Data','Generating UUIDs for all rows in field_answer table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-field_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','b5cd4a815ecfcae3e7a0e16539c469b1','Update Data','Generating UUIDs for all rows in field_type table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-form','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','867b94d343b1f0347371ec9fa8e3e','Update Data','Generating UUIDs for all rows in form table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-form_field','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','ea6c2b047b7c59190cd637547dbd3dd','Update Data','Generating UUIDs for all rows in form_field table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-global_property','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','c743637b2a65526c09996236e9967b2','Update Data','Generating UUIDs for all rows in global_property table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-hl7_in_archive','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','b1df4ba911718e7987ad3ff8f36fa2b','Update Data','Generating UUIDs for all rows in hl7_in_archive table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-hl7_in_error','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','a5fbc93dd5decad5f1c254acabd0fa47','Update Data','Generating UUIDs for all rows in hl7_in_error table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-hl7_in_queue','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','9319f535948f73e3fa77872421e21c28','Update Data','Generating UUIDs for all rows in hl7_in_queue table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-hl7_source','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','de74537c46e71afe35c4e3da63da98c','Update Data','Generating UUIDs for all rows in hl7_source table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-location','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','ba24775d1c4e3a5224a88d4f9fd53a1','Update Data','Generating UUIDs for all rows in location table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-location_tag','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','19627ee1543bc0b639f935921a5ef2a','Update Data','Generating UUIDs for all rows in location_tag table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-note','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','dc91bee3824a094b728628b5d74aa7','Update Data','Generating UUIDs for all rows in note table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-notification_alert','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','d9fccf1943822a79503c7f15837316','Update Data','Generating UUIDs for all rows in notification_alert table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-notification_template','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','ff8dd4c09bcb33e9a6b1cba9275646b','Update Data','Generating UUIDs for all rows in notification_template table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-obs','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','77f2862ce7ca7192a4043a35c06673','Update Data','Generating UUIDs for all rows in obs table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-orders','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','967a61314dfd1114c81afbe4dd52ae67','Update Data','Generating UUIDs for all rows in orders table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-order_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','f460eb4ea5f07d87cce18e84ba65e12','Update Data','Generating UUIDs for all rows in order_type table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-patient_identifier','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','7539b5d6c2a704d95dc5f56e6e12d73','Update Data','Generating UUIDs for all rows in patient_identifier table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-patient_identifier_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','79f11da93475eb7467b9297dfbd7c79','Update Data','Generating UUIDs for all rows in patient_identifier_type table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-patient_program','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','1e53eb71d25b1d1eda33fe22d66133','Update Data','Generating UUIDs for all rows in patient_program table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-patient_state','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','a0ebd331c38f5296e92c72b96b801d4c','Update Data','Generating UUIDs for all rows in patient_state table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-person','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','cf951b6a27951e66a9a0889eb4fd6f15','Update Data','Generating UUIDs for all rows in person table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-person_address','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','c630f59a4c330969255165c34377d1d','Update Data','Generating UUIDs for all rows in person_address table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-person_attribute','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','608a4c703f42a7269e5d7c39a1d86de','Update Data','Generating UUIDs for all rows in person_attribute table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-person_attribute_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','d04f6cc7bfd235bca17e6d1d10505c3','Update Data','Generating UUIDs for all rows in person_attribute_type table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-person_name','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','e22e8f89ef24732458581cc697d55f','Update Data','Generating UUIDs for all rows in person_name table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-privilege','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','e3eed777bb7727aa1c80e55e5b307c','Update Data','Generating UUIDs for all rows in privilege table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-program','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','7af9569b516c59b71147a7c8bea93d63','Update Data','Generating UUIDs for all rows in program table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-program_workflow','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','56214fa359f3e3bc39104d37fc996538','Update Data','Generating UUIDs for all rows in program_workflow table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-program_workflow_state','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','4fc3046f6f1a9eee5da901fdaacae34','Update Data','Generating UUIDs for all rows in program_workflow_state table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-relationship','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','76db1fe2b15c4e35c0cc6accb385ca','Update Data','Generating UUIDs for all rows in relationship table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-relationship_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','716f58764be9b098e3af891951c','Update Data','Generating UUIDs for all rows in relationship_type table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-report_object','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','acf4b4d7f2f06953fae294bfad74e5b9','Update Data','Generating UUIDs for all rows in report_object table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-report_schema_xml','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','9be2c79cdb24345c90a55ecf9786d1','Update Data','Generating UUIDs for all rows in report_schema_xml table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-role','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','7516c06f5ac23efd21394154e4f157d2','Update Data','Generating UUIDs for all rows in role table via built in uuid function.',NULL,'1.9.4'),('20090402-1516-serialized_object','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','e872c1f23acaea7d2953ab948d3a4b81','Update Data','Generating UUIDs for all rows in serialized_object table via built in uuid function.',NULL,'1.9.4'),('20090402-1517','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:10','89cc7a14b0582f157ea2dbb9de092fd','Custom Change','Adding UUIDs to all rows in all columns via a java class. (This will take a long time on large databases)',NULL,'1.9.4'),('20090402-1518','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:18','dfaf705d7776613e619dedf3e06d7640','Add Not-Null Constraint (x52)','Now that UUID generation is done, set the uuid columns to not \"NOT NULL\"',NULL,'1.9.4'),('20090402-1519-cohort','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:18','24d3119128e95cb2e5a1a76bfdc54','Create Index','Creating unique index on cohort.uuid column',NULL,'1.9.4'),('20090402-1519-concept','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:19','52b46db1629e2ba9581d2ff5569238f','Create Index','Creating unique index on concept.uuid column',NULL,'1.9.4'),('20090402-1519-concept_answer','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:19','fda1ed7f30fa23da5a9013529bbf1c3b','Create Index','Creating unique index on concept_answer.uuid column',NULL,'1.9.4'),('20090402-1519-concept_class','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:19','1451a7423139d4a59245f5754cd63dac','Create Index','Creating unique index on concept_class.uuid column',NULL,'1.9.4'),('20090402-1519-concept_datatype','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:19','7d6afd51a3308f3d7619676eb55e4be6','Create Index','Creating unique index on concept_datatype.uuid column',NULL,'1.9.4'),('20090402-1519-concept_description','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:19','2546c2e71f8999d46d31c112507ebf87','Create Index','Creating unique index on concept_description.uuid column',NULL,'1.9.4'),('20090402-1519-concept_map','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:19','61c1fac89a8e525494df82743285432','Create Index','Creating unique index on concept_map.uuid column',NULL,'1.9.4'),('20090402-1519-concept_name','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:20','3be74640f8f2d5993afb193b3fe3075','Create Index','Creating unique index on concept_name.uuid column',NULL,'1.9.4'),('20090402-1519-concept_name_tag','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:20','f58b6b51d744b015862e9835369c14f6','Create Index','Creating unique index on concept_name_tag.uuid column',NULL,'1.9.4'),('20090402-1519-concept_proposal','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:20','b7c251ed66288c2486d39b2e8e5056','Create Index','Creating unique index on concept_proposal.uuid column',NULL,'1.9.4'),('20090402-1519-concept_set','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:20','c99542d48ce96e6f351cc158a814ed0','Create Index','Creating unique index on concept_set.uuid column',NULL,'1.9.4'),('20090402-1519-concept_source','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:20','7ca56bc86099e23ed197af71e423b44b','Create Index','Creating unique index on concept_source.uuid column',NULL,'1.9.4'),('20090402-1519-concept_state_conversion','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:20','311f46b442c5740393c13b924cf4d2','Create Index','Creating unique index on concept_state_conversion.uuid column',NULL,'1.9.4'),('20090402-1519-drug','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:20','b4867846580078e85629b9554c9845','Create Index','Creating unique index on drug.uuid column',NULL,'1.9.4'),('20090402-1519-encounter','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:21','b0a5fc73f82532e4f2b392e95a9d1e9d','Create Index','Creating unique index on encounter.uuid column',NULL,'1.9.4'),('20090402-1519-encounter_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:21','5ed4dbb39ded5667d9897849eb609162','Create Index','Creating unique index on encounter_type.uuid column',NULL,'1.9.4'),('20090402-1519-field','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:21','f1bb647f7e95324ccdf6a8f644a36d47','Create Index','Creating unique index on field.uuid column',NULL,'1.9.4'),('20090402-1519-field_answer','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:21','d3dde65374ee7222c83b6487f936a4f','Create Index','Creating unique index on field_answer.uuid column',NULL,'1.9.4'),('20090402-1519-field_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:21','559a6a362f1de933a495f7c281bd28','Create Index','Creating unique index on field_type.uuid column',NULL,'1.9.4'),('20090402-1519-form','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:22','854ea11fedf3e622cec570e54de222','Create Index','Creating unique index on form.uuid column',NULL,'1.9.4'),('20090402-1519-form_field','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:22','243c552b3a5c3011b214d261bd32c5e','Create Index','Creating unique index on form_field.uuid column',NULL,'1.9.4'),('20090402-1519-global_property','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:22','edf3a71ce9d58b7b5c86889cdee84e','Create Index','Creating unique index on global_property.uuid column',NULL,'1.9.4'),('20090402-1519-hl7_in_archive','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:22','e3e811242f2c8ef055756866aafaed70','Create Index','Creating unique index on hl7_in_archive.uuid column',NULL,'1.9.4'),('20090402-1519-hl7_in_error','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:22','d4b3b34289fe9a4b7c609f495cdf20','Create Index','Creating unique index on hl7_in_error.uuid column',NULL,'1.9.4'),('20090402-1519-hl7_in_queue','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:22','21b688a853a9f43c5ad24a53df7fd8c','Create Index','Creating unique index on hl7_in_queue.uuid column',NULL,'1.9.4'),('20090402-1519-hl7_source','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:23','b5457643d13df39dac482d34fc884','Create Index','Creating unique index on hl7_source.uuid column',NULL,'1.9.4'),('20090402-1519-location','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:23','a6c5a18e65815abaa42ee07e792f1a','Create Index','Creating unique index on location.uuid column',NULL,'1.9.4'),('20090402-1519-location_tag','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:23','abf99b851bdc38952843b2635104cfc','Create Index','Creating unique index on location_tag.uuid column',NULL,'1.9.4'),('20090402-1519-note','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:23','526b32a1d8d77223bd45a722746d246','Create Index','Creating unique index on note.uuid column',NULL,'1.9.4'),('20090402-1519-notification_alert','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:23','f87f2b6d5f5074c33245321cfbb5878','Create Index','Creating unique index on notification_alert.uuid column',NULL,'1.9.4'),('20090402-1519-notification_template','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:24','add9db68c554fbc2b4360e69438d3a8','Create Index','Creating unique index on notification_template.uuid column',NULL,'1.9.4'),('20090402-1519-obs','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:24','7a584580843bfd1a170c061c65413c1','Create Index','Creating unique index on obs.uuid column',NULL,'1.9.4'),('20090402-1519-orders','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:24','8ffafd6886f4a5fc1515783eabec738','Create Index','Creating unique index on orders.uuid column',NULL,'1.9.4'),('20090402-1519-order_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:24','ae9ea28f147e50c959610dafa5ec25c','Create Index','Creating unique index on order_type.uuid column',NULL,'1.9.4'),('20090402-1519-patient_identifier','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:24','4b5861f5669e0f29087d617d27513f1','Create Index','Creating unique index on patient_identifier.uuid column',NULL,'1.9.4'),('20090402-1519-patient_identifier_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:24','73da1d5f87d0397bb396a9b3b2ee4ea','Create Index','Creating unique index on patient_identifier_type.uuid column',NULL,'1.9.4'),('20090402-1519-patient_program','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:25','34b7b01f4a362b637b239209f2a4820','Create Index','Creating unique index on patient_program.uuid column',NULL,'1.9.4'),('20090402-1519-patient_state','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:25','efc7e9ba6fc3626ad4afe9c9c41fc0','Create Index','Creating unique index on patient_state.uuid column',NULL,'1.9.4'),('20090402-1519-person','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:25','2a77bcf4862d901d292c5877dfce4f58','Create Index','Creating unique index on person.uuid column',NULL,'1.9.4'),('20090402-1519-person_address','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:25','3672c61c62cd26ef3a726613517f6234','Create Index','Creating unique index on person_address.uuid column',NULL,'1.9.4'),('20090402-1519-person_attribute','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:25','d77b26d4596f149a38d65f2be9fa6b51','Create Index','Creating unique index on person_attribute.uuid column',NULL,'1.9.4'),('20090402-1519-person_attribute_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:25','7affacc59b57fabf36578609cbc481c','Create Index','Creating unique index on person_attribute_type.uuid column',NULL,'1.9.4'),('20090402-1519-person_name','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:26','f98a895de49abac9dc5483f4de705adf','Create Index','Creating unique index on person_name.uuid column',NULL,'1.9.4'),('20090402-1519-privilege','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:26','e9406113927e90f14d8ea3aee7b265e1','Create Index','Creating unique index on privilege.uuid column',NULL,'1.9.4'),('20090402-1519-program','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:26','f34ba0c98814f03cff165d4b1c391312','Create Index','Creating unique index on program.uuid column',NULL,'1.9.4'),('20090402-1519-program_workflow','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:26','d537382486f2a3a870983bc2a7e72a4c','Create Index','Creating unique index on program_workflow.uuid column',NULL,'1.9.4'),('20090402-1519-program_workflow_state','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:26','8020f25b8e995b846d1c3c11e4232399','Create Index','Creating unique index on program_workflow_state.uuid column',NULL,'1.9.4'),('20090402-1519-relationship','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:26','e56ca578a8411decdfee74a91184d4f','Create Index','Creating unique index on relationship.uuid column',NULL,'1.9.4'),('20090402-1519-relationship_type','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:27','179c86d0bf953e67eac2c7cd235a11c','Create Index','Creating unique index on relationship_type.uuid column',NULL,'1.9.4'),('20090402-1519-report_object','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:27','7f15947ec522a8fe38517251fdcb4f27','Create Index','Creating unique index on report_object.uuid column',NULL,'1.9.4'),('20090402-1519-report_schema_xml','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:27','f1f2922dead3177b121670e26e2be414','Create Index','Creating unique index on report_schema_xml.uuid column',NULL,'1.9.4'),('20090402-1519-role','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:27','48679931cd75ae76824f0a194d011b8','Create Index','Creating unique index on role.uuid column',NULL,'1.9.4'),('20090402-1519-serialized_object','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:27','3457ded29450bcb294aea6848e244a1','Create Index','Creating unique index on serialized_object.uuid column',NULL,'1.9.4'),('20090408-1298','Cory McCarthy','liquibase-update-to-latest.xml','2011-09-27 15:04:00','a675aa3da8651979b233d4c4b8d7f1','Modify Column','Changed the datatype for encounter_type to \'text\' instead of just 50 chars',NULL,'1.9.4'),('200904091023','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:00','a1ee9e6f174e2d8e5ee076126135b7','Delete Data (x4)','Remove Manage Tribes and View Tribes privileges from the privilege table and role_privilege table.\n			The privileges will be recreated by the Tribe module if it is installed.',NULL,'1.9.4'),('20090414-0804','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:29','b5e187a86493a19ff33881d5c5adb61','Drop Foreign Key Constraint','Dropping foreign key on concept_set.concept_id table',NULL,'1.9.4'),('20090414-0805','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:30','afa3399786d9a6695173727b496ba2','Drop Primary Key','Dropping primary key on concept set table',NULL,'1.9.4'),('20090414-0806','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:30','3c192287a93261df2ef571d55d91a5e','Add Column','Adding new integer primary key to concept set table',NULL,'1.9.4'),('20090414-0807','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:30','548ba564f1cf1a5e4353bade7d0a71f','Create Index, Add Foreign Key Constraint','Adding index and foreign key to concept_set.concept_id column',NULL,'1.9.4'),('20090414-0808a','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:32','13cd2c97df1b7163cb18296c328110','Drop Foreign Key Constraint','Dropping foreign key on patient_identifier.patient_id column',NULL,'1.9.4'),('20090414-0808b','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:32','4a69eb4dc87ad51da7497646b55e09','Drop Primary Key','Dropping non-integer primary key on patient identifier table before adding a new integer primary key',NULL,'1.9.4'),('20090414-0809','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:32','912731dafcb26634d6737b05d1f428d','Add Column','Adding new integer primary key to patient identifier table',NULL,'1.9.4'),('20090414-0810','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:33','8ba5e84d1f85707b4a248a21cf7afe16','Create Index, Add Foreign Key Constraint','Adding index and foreign key on patient_identifier.patient_id column',NULL,'1.9.4'),('20090414-0811a','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:34','3b73a595618cc7d4279899c189aeab','Drop Foreign Key Constraint','Dropping foreign key on concept_word.concept_id column',NULL,'1.9.4'),('20090414-0811b','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:35','be823f8a9d48f3df0c83cbafaf803','Drop Primary Key','Dropping non-integer primary key on concept word table before adding new integer one',NULL,'1.9.4'),('20090414-0812','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:35','98a31beac32af7be584e5f35125ebe77','Add Column','Adding integer primary key to concept word table',NULL,'1.9.4'),('20090414-0812b','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:35','fa3df9294b026b6375cde2993bc936c','Add Foreign Key Constraint','Re-adding foreign key for concept_word.concept_name_id',NULL,'1.9.4'),('200904271042','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:37','1b8214c28c262ca31bb67549c2e29e3','Drop Column','Remove the now unused synonym column',NULL,'1.9.4'),('20090428-0811aa','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:35','8d1cd3bc4fbeb36c55125e68426804d','Drop Foreign Key Constraint','Removing concept_word.concept_name_id foreign key so that primary key can be changed to concept_word_id',NULL,'1.9.4'),('20090428-0854','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:37','9124601e6dc67a603d950617bd17cea','Add Foreign Key Constraint','Adding foreign key for concept_word.concept_id column',NULL,'1.9.4'),('200905071626','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:00','d2873b168b82edab25ab1080304772c9','Create Index','Add an index to the concept_word.concept_id column (This update may fail if it already exists)',NULL,'1.9.4'),('200905150814','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:00','52a64aaf6ac8af65b8023c0ea96162d','Delete Data','Deleting invalid concept words',NULL,'1.9.4'),('200905150821','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:37','d6dedef195a69f62fd1c73adcfd93146','Custom SQL','Deleting duplicate concept word keys',NULL,'1.9.4'),('200906301606','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:06:59','e0a8f2578ba4e6cbaf9a7f41465bd1b','Modify Column','Change person_attribute_type.sort_weight from an integer to a float',NULL,'1.9.4'),('200907161638-1','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:38','98edf5727177ea045dff438d7fca27','Modify Column','Change obs.value_numeric from a double(22,0) to a double',NULL,'1.9.4'),('200907161638-2','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:38','cd8d3abc418a18ff786b14f27798389','Modify Column','Change concept_numeric columns from a double(22,0) type to a double',NULL,'1.9.4'),('200907161638-3','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:38','8f30dc389272e5f94c34286683ba2c1','Modify Column','Change concept_set.sort_weight from a double(22,0) to a double',NULL,'1.9.4'),('200907161638-4','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:39','7875dcee562bcd9bb5ad49cddcd9241','Modify Column','Change concept_set_derived.sort_weight from a double(22,0) to a double',NULL,'1.9.4'),('200907161638-5','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:39','1b4a410e183ef30ba9d7b7ae965e2a1','Modify Column','Change drug table columns from a double(22,0) to a double',NULL,'1.9.4'),('200907161638-6','bwolfe','liquibase-update-to-latest.xml','2011-09-27 15:04:40','8e5c737f5d65e25f73354f4cd26523','Modify Column','Change drug_order.dose from a double(22,0) to a double',NULL,'1.9.4'),('200908291938-1','dthomas','liquibase-update-to-latest.xml','2011-10-03 17:07:06','5658a0964596d66e70804ddaa48bd77c','Modify Column','set hl7_code in ConceptSource to nullable column',NULL,'1.9.4'),('200908291938-2a','dthomas','liquibase-update-to-latest.xml','2011-10-03 17:07:06','4fff1cee1a3f13ccc2a13c5448f9b1c','Modify Column','set retired in ConceptSource to tinyint(1) not null',NULL,'1.9.4'),('20090831-1039-38-scheduler_task_config','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:06:59','612afca3f7f1697d93248951bc8c7','Add Column','Adding \"uuid\" column to scheduler_task_config table',NULL,'1.9.4'),('20090831-1040-scheduler_task_config','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:06:59','baf8889ac5cfe2670e6b9c4bb58a47a','Update Data','Generating UUIDs for all rows in scheduler_task_config table via built in uuid function.',NULL,'1.9.4'),('20090831-1041-scheduler_task_config','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:06:59','b3e5e26774a54c2cb3397196bedee570','Custom Change','Adding UUIDs to all rows in scheduler_task_config table via a java class for non mysql/oracle/mssql databases.',NULL,'1.9.4'),('20090831-1042-scheduler_task_config','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:00','11fe3a4afc8e8997caab8e71781e5b10','Add Not-Null Constraint','Now that UUID generation is done for scheduler_task_config, set the uuid column to not \"NOT NULL\"',NULL,'1.9.4'),('20090831-1043-scheduler_task_config','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:00','b8165a4b9f7ea28a6084d74aadbb9432','Create Index','Creating unique index on scheduler_task_config.uuid column',NULL,'1.9.4'),('20090907-1','Knoll_Frank','liquibase-update-to-latest.xml','2011-10-03 17:07:00','542a60e1a743881571dd1c86ed1c4','Rename Column','Rename the concept_source.date_voided column to date_retired',NULL,'1.9.4'),('20090907-2a','Knoll_Frank','liquibase-update-to-latest.xml','2011-10-03 17:07:05','eba5ce8a7d9634e6f528627a82d6b1','Drop Foreign Key Constraint','Remove the concept_source.voided_by foreign key constraint',NULL,'1.9.4'),('20090907-2b','Knoll_Frank','liquibase-update-to-latest.xml','2011-10-03 17:07:05','8412909f334c2221611ce07acfcb5a6','Rename Column, Add Foreign Key Constraint','Rename the concept_source.voided_by column to retired_by',NULL,'1.9.4'),('20090907-3','Knoll_Frank','liquibase-update-to-latest.xml','2011-10-03 17:07:06','627e3e7cc7d9a2aece268fa93bf88','Rename Column','Rename the concept_source.voided column to retired',NULL,'1.9.4'),('20090907-4','Knoll_Frank','liquibase-update-to-latest.xml','2011-10-03 17:07:06','74ad3e52598dfc9af0785c753ba818ac','Rename Column','Rename the concept_source.void_reason column to retire_reason',NULL,'1.9.4'),('200909281005-1','nribeka','liquibase-update-to-latest.xml','2011-10-03 17:07:10','6e728239bd76fa58671bdb4d03ec346','Create Table','Create logic token table to store all registered token',NULL,'1.9.4'),('200909281005-2','nribeka','liquibase-update-to-latest.xml','2011-10-03 17:07:14','c516c1b552f2fdace76762d81bb3bae6','Create Table','Create logic token tag table to store all tag associated with a token',NULL,'1.9.4'),('200909281005-3','nribeka','liquibase-update-to-latest.xml','2011-10-03 17:07:17','5a8f5825e1de3fcbc5ed48f0b8cd3e77','Add Foreign Key Constraint','Adding foreign key for primary key of logic_rule_token_tag',NULL,'1.9.4'),('200909281005-4a','nribeka','liquibase-update-to-latest.xml','2011-10-03 17:07:21','c1bd29bc82b2d227f9eb47f6676f28d','Drop Foreign Key Constraint','Removing bad foreign key for logic_rule_token.creator',NULL,'1.9.4'),('200909281005-4aa','nribeka','liquibase-update-to-latest.xml','2011-10-03 17:07:24','bbc452fd8fa3ff3eaab4c5fbb2ac2fe2','Drop Foreign Key Constraint','Removing bad foreign key for logic_rule_token.creator',NULL,'1.9.4'),('200909281005-4b','nribeka','liquibase-update-to-latest.xml','2011-10-03 17:07:28','ee57b86d35016d4a26116a195908d4d','Add Foreign Key Constraint','Adding correct foreign key for logic_rule_token.creator',NULL,'1.9.4'),('200909281005-5a','nribeka','liquibase-update-to-latest.xml','2011-10-03 17:07:32','9d6119b183383447fe37c9494767927','Add Foreign Key Constraint','Adding foreign key for logic_rule_token.changed_by',NULL,'1.9.4'),('20091001-1023','rcrichton','liquibase-update-to-latest.xml','2011-10-03 17:07:45','6c5b675ed15654c61ad28b7794180c0','Add Column','add retired column to relationship_type table',NULL,'1.9.4'),('20091001-1024','rcrichton','liquibase-update-to-latest.xml','2011-10-03 17:07:45','cdee114b801e2fd29f1f906d3fa553c4','Add Column','add retired_by column to relationship_type table',NULL,'1.9.4'),('20091001-1025','rcrichton','liquibase-update-to-latest.xml','2011-10-03 17:07:49','ded86a7b7ba57a447fdb14ee12804','Add Foreign Key Constraint','Create the foreign key from the relationship.retired_by to users.user_id.',NULL,'1.9.4'),('20091001-1026','rcrichton','liquibase-update-to-latest.xml','2011-10-03 17:07:49','56da622349984de2d9d35dfe4f8c592b','Add Column','add date_retired column to relationship_type table',NULL,'1.9.4'),('20091001-1027','rcrichton','liquibase-update-to-latest.xml','2011-10-03 17:07:49','5c3441c4d4df1305e22a76a58b9e4','Add Column','add retire_reason column to relationship_type table',NULL,'1.9.4'),('200910271049-1','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:32','fe74f276e13dc72ddac24b3d5bfe7b73','Update Data (x5)','Setting core field types to have standard UUIDs',NULL,'1.9.4'),('200910271049-10','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:32','4990b358a988f5eb594e95f205e66','Update Data (x4)','Setting core roles to have standard UUIDs',NULL,'1.9.4'),('200910271049-2','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:32','537a62703f986d8a2db83317a3ac17bb','Update Data (x7)','Setting core person attribute types to have standard UUIDs',NULL,'1.9.4'),('200910271049-3','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:32','c2d6cd47499de2eaaad2bad5c11f9e1','Update Data (x4)','Setting core encounter types to have standard UUIDs',NULL,'1.9.4'),('200910271049-4','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:32','cbf2dfb5f6fec73a9efe9a591803a9c','Update Data (x12)','Setting core concept datatypes to have standard UUIDs',NULL,'1.9.4'),('200910271049-5','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:32','5c2629fbf1258fbb9bcd46e8327ee142','Update Data (x4)','Setting core relationship types to have standard UUIDs',NULL,'1.9.4'),('200910271049-6','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:32','c0dade1ffd2723e8441b6145f83346','Update Data (x15)','Setting core concept classes to have standard UUIDs',NULL,'1.9.4'),('200910271049-7','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:32','e768dab8025d6612bb581c86d95638a','Update Data (x2)','Setting core patient identifier types to have standard UUIDs',NULL,'1.9.4'),('200910271049-8','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:32','7d43ef855a73b2321b4fdb97190f7cb','Update Data','Setting core location to have standard UUIDs',NULL,'1.9.4'),('200910271049-9','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:32','9d61613fa6c3ad43f79f765d5a73e9','Update Data','Setting core hl7 source to have standard UUIDs',NULL,'1.9.4'),('200912031842','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:33','de4dd06c279ad749cb5f1de3ed45586','Drop Foreign Key Constraint, Add Foreign Key Constraint','Changing encounter.provider_id to reference person instead of users',NULL,'1.9.4'),('200912031846-1','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:37','3aff267520eec4d52e81ef7614b2da3','Add Column, Update Data','Adding person_id column to users table (if needed)',NULL,'1.9.4'),('200912031846-2','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:37','334f8c5891f058959155f2ed31da386b','Update Data, Add Not-Null Constraint','Populating users.person_id',NULL,'1.9.4'),('200912031846-3','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:42','f0ebbfbf2d223694de49da385ee203b','Add Foreign Key Constraint, Set Column as Auto-Increment','Restoring foreign key constraint on users.person_id',NULL,'1.9.4'),('200912071501-1','arthurs','liquibase-update-to-latest.xml','2011-10-03 17:07:32','38fc7314599265a8ac635daa063bc32','Update Data','Change name for patient.searchMaxResults global property to person.searchMaxResults',NULL,'1.9.4'),('200912091819','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:43','48846a9c134bd1da5b3234b4e1e041eb','Add Column, Add Foreign Key Constraint','Adding retired metadata columns to users table',NULL,'1.9.4'),('200912091820','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:43','3b8f7d29adb4b8ffdb9b4cd29877af1','Update Data','Migrating voided metadata to retired metadata for users table',NULL,'1.9.4'),('200912091821','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:44','fe9bd963d283aca8d01329a1b3595af1','Drop Foreign Key Constraint, Drop Column (x4)','Dropping voided metadata columns from users table',NULL,'1.9.4'),('200912140038','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:44','b2dc51da6fdb4a6d25763dccbd795dc0','Add Column','Adding \"uuid\" column to users table',NULL,'1.9.4'),('200912140039','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:44','28215abe10dd981bcd46c9d74e4cefe','Update Data','Generating UUIDs for all rows in users table via built in uuid function.',NULL,'1.9.4'),('200912140040','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:44','e45561523e219fe6c21194e37b9a9de6','Custom Change','Adding UUIDs to users table via a java class. (This will take a long time on large databases)',NULL,'1.9.4'),('200912141552','madanmohan','liquibase-update-to-latest.xml','2011-10-03 17:07:32','8e2978ddf67343ed80a18f7e92799bc','Add Column, Add Foreign Key Constraint','Add changed_by column to encounter table',NULL,'1.9.4'),('200912141553','madanmohan','liquibase-update-to-latest.xml','2011-10-03 17:07:32','c3f6cfc84f19785b1d7ecdd2ccf492','Add Column','Add date_changed column to encounter table',NULL,'1.9.4'),('20091215-0208','sunbiz','liquibase-update-to-latest.xml','2011-10-03 17:07:49','da9945f3554e8dd667c4790276eb5ad','Custom SQL','Prune concepts rows orphaned in concept_numeric tables',NULL,'1.9.4'),('20091215-0209','jmiranda','liquibase-update-to-latest.xml','2011-10-03 17:07:49','2feb74f1ca3fc1f8bb9b7986c321feed','Custom SQL','Prune concepts rows orphaned in concept_complex tables',NULL,'1.9.4'),('20091215-0210','jmiranda','liquibase-update-to-latest.xml','2011-10-03 17:07:49','15cd4ca5b736a89f932456fc17494293','Custom SQL','Prune concepts rows orphaned in concept_derived tables',NULL,'1.9.4'),('200912151032','n.nehete','liquibase-update-to-latest.xml','2011-10-03 17:07:44','fb31da7c25d166f7564bd77926dd286','Add Not-Null Constraint','Encounter Type should not be null when saving an Encounter',NULL,'1.9.4'),('200912211118','nribeka','liquibase-update-to-latest.xml','2011-10-03 17:07:33','2bb03ed55ad1af379452fd18d9b46f74','Add Column','Adding language column to concept_derived table',NULL,'1.9.4'),('201001072007','upul','liquibase-update-to-latest.xml','2011-10-03 17:07:44','afee6c716d0435895c0c98a98099e4','Add Column','Add last execution time column to scheduler_task_config table',NULL,'1.9.4'),('20100128-1','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:06:59','5bf382cc41fbfa92bb13abdadba3e15','Insert Row','Adding \'System Developer\' role again (see ticket #1499)',NULL,'1.9.4'),('20100128-2','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:06:59','b351df1ec993c3906d66ebe5db67d120','Update Data','Switching users back from \'Administrator\' to \'System Developer\' (see ticket #1499)',NULL,'1.9.4'),('20100128-3','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:06:59','6e35b6f3bf99975e6bc5ad988280ef','Delete Data','Deleting \'Administrator\' role (see ticket #1499)',NULL,'1.9.4'),('20100306-095513a','thilini.hg','liquibase-update-to-latest.xml','2011-10-03 17:07:53','2adf32b4543c0bc7c99a9528da09afe','Drop Foreign Key Constraint','Dropping unused foreign key from notification alert table',NULL,'1.9.4'),('20100306-095513b','thilini.hg','liquibase-update-to-latest.xml','2011-10-03 17:07:53','fd3940c7dfe3195055dd6be9381e8863','Drop Column','Dropping unused user_id column from notification alert table',NULL,'1.9.4'),('20100322-0908','syhaas','liquibase-update-to-latest.xml','2011-10-03 17:07:53','1e3b87e49b62a358b5289ce470ea0dc','Add Column, Update Data','Adding sort_weight column to concept_answers table and initially sets the sort_weight to the concept_answer_id',NULL,'1.9.4'),('20100323-192043','ricardosbarbosa','liquibase-update-to-latest.xml','2011-10-03 17:07:55','97bc5f19e765d66665f5478147716aa6','Update Data, Delete Data (x2)','Removing the duplicate privilege \'Add Concept Proposal\' in favor of \'Add Concept Proposals\'',NULL,'1.9.4'),('20100330-190413','ricardosbarbosa','liquibase-update-to-latest.xml','2011-10-03 17:07:55','2b508e1e4546813dcc3425e09e863be','Update Data, Delete Data (x2)','Removing the duplicate privilege \'Edit Concept Proposal\' in favor of \'Edit Concept Proposals\'',NULL,'1.9.4'),('20100412-2217','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:53','6ccd335bb8f1e3dfe5c9b62d018fb27','Add Column','Adding \"uuid\" column to notification_alert_recipient table',NULL,'1.9.4'),('20100412-2218','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:53','b04eb51018a426202057341c4430d851','Update Data','Generating UUIDs for all rows in notification_alert_recipient table via built in uuid function.',NULL,'1.9.4'),('20100412-2219','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:53','13e8f84e2a3ac2eb060e68376dbc19','Custom Change','Adding UUIDs to notification_alert_recipient table via a java class (if needed).',NULL,'1.9.4'),('20100412-2220','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:53','4df07eb79086636f8498cac5a168be2','Add Not-Null Constraint','Now that UUID generation is done, set the notification_alert_recipient.uuid column to not \"NOT NULL\"',NULL,'1.9.4'),('20100413-1509','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:53','f27227d57b9372076542621df1b23','Rename Column','Change location_tag.tag to location_tag.name',NULL,'1.9.4'),('20100415-forgotten-from-before','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:44','48ac37f91a13c53c558923d11c9cee','Add Not-Null Constraint','Adding not null constraint to users.uuid',NULL,'1.9.4'),('20100423-1402','slorenz','liquibase-update-to-latest.xml','2011-10-03 17:07:54','4a1427b91614d7b982182c47b347c834','Create Index','Add an index to the encounter.encounter_datetime column to speed up statistical\n			analysis.',NULL,'1.9.4'),('20100423-1406','slorenz','liquibase-update-to-latest.xml','2011-10-03 17:07:54','1df152ca6d1cace9092a2b04f4d3bd3','Create Index','Add an index to the obs.obs_datetime column to speed up statistical analysis.',NULL,'1.9.4'),('20100426-1947','syhaas','liquibase-update-to-latest.xml','2011-10-03 17:07:54','873ce8452d8fffff16df292347215ce8','Insert Row','Adding daemon user to users table',NULL,'1.9.4'),('20100427-1334','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:53','4a22228b56866b7412bf56bf53d4876','Modify Column','Changing the datatype of global_property.property for mysql databases',NULL,'1.9.4'),('20100512-1400','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:54','c068ace9c7909db24b354c7db191a3b3','Insert Row','Create core order_type for drug orders',NULL,'1.9.4'),('20100513-1947','syhaas','liquibase-update-to-latest.xml','2011-10-03 17:07:54','bd3c85b35c0c189d17a4edfb69479a','Delete Data (x2)','Removing scheduler.username and scheduler.password global properties',NULL,'1.9.4'),('20100517-1545','wyclif and djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:07:54','a4a006cfd7d2f3777c35a47c729a','Custom Change','Switch boolean concepts/observations to be stored as coded',NULL,'1.9.4'),('20100525-818-1','syhaas','liquibase-update-to-latest.xml','2011-10-03 17:07:59','ae19ea64c1936cc692aab61c895d6cf','Create Table, Add Foreign Key Constraint (x2)','Create active list type table.',NULL,'1.9.4'),('20100525-818-2','syhaas','liquibase-update-to-latest.xml','2011-10-03 17:08:04','681391d216a593f59201dfe225d7288','Create Table, Add Foreign Key Constraint (x7)','Create active list table',NULL,'1.9.4'),('20100525-818-3','syhaas','liquibase-update-to-latest.xml','2011-10-03 17:08:09','85178ccb515c9892c5cf4826c2778f73','Create Table, Add Foreign Key Constraint','Create allergen table',NULL,'1.9.4'),('20100525-818-4','syhaas','liquibase-update-to-latest.xml','2011-10-03 17:08:12','11996601ce66087a69ce6fba3938c63','Create Table','Create problem table',NULL,'1.9.4'),('20100525-818-5','syhaas','liquibase-update-to-latest.xml','2011-10-03 17:08:12','f67090e0c159e3c39418cb5d3ae3e82','Insert Row (x2)','Inserting default active list types',NULL,'1.9.4'),('20100526-1025','Harsha.cse','liquibase-update-to-latest.xml','2011-10-03 17:07:54','16f132945063bedfb4288b9f934f656e','Drop Not-Null Constraint (x2)','Drop Not-Null constraint from location column in Encounter and Obs table',NULL,'1.9.4'),('20100604-0933a','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:07:55','b61fce30223b9b7cc2766f60b3abfa49','Add Default Value','Changing the default value to 2 for \'message_state\' column in \'hl7_in_archive\' table',NULL,'1.9.4'),('20100604-0933b','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:07:55','45a4732916ca8fd35d3df9e320b2a333','Update Data','Converting 0 and 1 to 2 for \'message_state\' column in \'hl7_in_archive\' table',NULL,'1.9.4'),('20100607-1550a','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:13','d7635997e5f8fb833c733f7597ed203b','Add Column','Adding \'concept_name_type\' column to concept_name table',NULL,'1.9.4'),('20100607-1550b','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:13','4b3d935771a1703eeaf268dfbbb16da8','Add Column','Adding \'locale_preferred\' column to concept_name table',NULL,'1.9.4'),('20100607-1550c','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:17','f151486ccbf8cec7d2327d4cd674b9','Drop Foreign Key Constraint','Dropping foreign key constraint on concept_name_tag_map.concept_name_tag_id',NULL,'1.9.4'),('20100607-1550d','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:17','f9567368a5999517843d7b3f1fd03bce','Update Data, Delete Data (x2)','Setting the concept name type for short names',NULL,'1.9.4'),('20100607-1550e','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:17','e7ba70b44259f915524358042f5996','Update Data, Delete Data (x2)','Converting preferred names to FULLY_SPECIFIED names',NULL,'1.9.4'),('20100607-1550f','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:17','5ac0213d1b2a2d50d5a0e5e5e45eb10','Update Data, Delete Data (x2)','Converting concept names with country specific concept name tags to preferred names',NULL,'1.9.4'),('20100607-1550g','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:17','69da22ab528eb6dbc68c7eaaafa898','Delete Data (x2)','Deleting \'default\' and \'synonym\' concept name tags',NULL,'1.9.4'),('20100607-1550h','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:17','dadd4e593c3ed4ec37119a933c7e81c','Custom Change','Validating and attempting to fix invalid concepts and ConceptNames',NULL,'1.9.4'),('20100607-1550i','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:21','3133835f91f89b1d1b383ec21dad78fa','Add Foreign Key Constraint','Restoring foreign key constraint on concept_name_tag_map.concept_name_tag_id',NULL,'1.9.4'),('20100621-1443','jkeiper','liquibase-update-to-latest.xml','2011-10-03 17:08:21','5fc85cf41532f6ec8658f25954ee7d2d','Modify Column','Modify the error_details column of hl7_in_error to hold\n			stacktraces',NULL,'1.9.4'),('201008021047','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:08:22','89abf79d12ba23f8388a78f1f12bf2','Create Index','Add an index to the person_name.family_name2 to speed up patient and person searches',NULL,'1.9.4'),('201008201345','mseaton','liquibase-update-to-latest.xml','2011-10-03 17:08:22','7167c287f456287faab9b382c0caecc6','Custom Change','Validates Program Workflow States for possible configuration problems and reports warnings',NULL,'1.9.4'),('201008242121','misha680','liquibase-update-to-latest.xml','2011-10-03 17:08:22','4a3e4ae561a3e9a1b1131dcdbad2b313','Modify Column','Make person_name.person_id not NULLable',NULL,'1.9.4'),('20100924-1110','mseaton','liquibase-update-to-latest.xml','2011-10-03 17:08:22','deb3d45e5d143178be45776152517d3e','Add Column, Add Foreign Key Constraint','Add location_id column to patient_program table',NULL,'1.9.4'),('201009281047','misha680','liquibase-update-to-latest.xml','2011-10-03 17:08:22','fa4e5cc66ba97ec1d9ad37156591ff','Drop Column','Remove the now unused default_charge column',NULL,'1.9.4'),('201010051745','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:22','c401e7afbba90c8db5a422f994cb8d0','Update Data','Setting the global property \'patient.identifierRegex\' to an empty string',NULL,'1.9.4'),('201010051746','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:22','4535b642c1591f7114c3e02d9d7a37','Update Data','Setting the global property \'patient.identifierSuffix\' to an empty string',NULL,'1.9.4'),('201010151054','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:08:23','eb939ccae537abf05cfdb05c43b675e7','Create Index','Adding index to form.published column',NULL,'1.9.4'),('201010151055','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:08:23','861d3c98ab90a3c9a197343fce7ee11','Create Index','Adding index to form.retired column',NULL,'1.9.4'),('201010151056','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:08:23','51346ab9b4b6780c2c8ff8dc193b18f','Create Index','Adding multi column index on form.published and form.retired columns',NULL,'1.9.4'),('201010261143','crecabarren','liquibase-update-to-latest.xml','2011-10-03 17:08:24','b2fcb0991f6dfc4f79ee53e94798c2','Rename Column','Rename neighborhood_cell column to address3 and increase the size to 255 characters',NULL,'1.9.4'),('201010261145','crecabarren','liquibase-update-to-latest.xml','2011-10-03 17:08:24','6519b246e2343453ec336836c65d1','Rename Column','Rename township_division column to address4 and increase the size to 255 characters',NULL,'1.9.4'),('201010261147','crecabarren','liquibase-update-to-latest.xml','2011-10-03 17:08:24','3a39cf4d967d8670bd22c596d34859','Rename Column','Rename subregion column to address5 and increase the size to 255 characters',NULL,'1.9.4'),('201010261149','crecabarren','liquibase-update-to-latest.xml','2011-10-03 17:08:24','1a80befba2d24244ef24a171562ac82','Rename Column','Rename region column to address6 and increase the size to 255 characters',NULL,'1.9.4'),('201010261151','crecabarren','liquibase-update-to-latest.xml','2011-10-03 17:08:24','db73f1b9acdb7af277badc584754df','Rename Column','Rename neighborhood_cell column to address3 and increase the size to 255 characters',NULL,'1.9.4'),('201010261153','crecabarren','liquibase-update-to-latest.xml','2011-10-03 17:08:24','1c22a65ce145618429c7b57d9ee294b','Rename Column','Rename township_division column to address4 and increase the size to 255 characters',NULL,'1.9.4'),('201010261156','crecabarren','liquibase-update-to-latest.xml','2011-10-03 17:08:24','194dac315b5cb6964177d121659dd1d9','Rename Column','Rename subregion column to address5 and increase the size to 255 characters',NULL,'1.9.4'),('201010261159','crecabarren','liquibase-update-to-latest.xml','2011-10-03 17:08:25','db75c1bc82161f47b7831296871cb7','Rename Column','Rename region column to address6 and increase the size to 255 characters',NULL,'1.9.4'),('201011011600','jkeiper','liquibase-update-to-latest.xml','2011-10-03 17:08:26','c7c0354954e8e131a0e2f0aa692725b8','Create Index','Adding index to message_state column in HL7 archive table',NULL,'1.9.4'),('201011011605','jkeiper','liquibase-update-to-latest.xml','2011-10-03 17:08:26','15296bed5f5b94a941bf273ae6ecd3a','Custom Change','Moving \"deleted\" HL7s from HL7 archive table to queue table',NULL,'1.9.4'),('201012081716','nribeka','liquibase-update-to-latest.xml','2011-10-03 17:08:31','eecf7bd9435b6f1b4a08318e22e96','Delete Data','Removing concept that are concept derived and the datatype',NULL,'1.9.4'),('201012081717','nribeka','liquibase-update-to-latest.xml','2011-10-03 17:08:35','842f7086de77f6b31d8f06d56cf56','Drop Table','Removing concept derived tables',NULL,'1.9.4'),('20101209-1721','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:27','6519d6c9a8c6f2f31c4a8784ac9c42a','Add Column','Add \'weight\' column to concept_word table',NULL,'1.9.4'),('20101209-1722','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:27','f8ea5691d93b71f1e9b0b3b823ac2f9a','Create Index','Adding index to concept_word.weight column',NULL,'1.9.4'),('20101209-1723','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:27','4d67c48557f5665a8c2be7e87e22913','Insert Row','Insert a row into the schedule_task_config table for the ConceptIndexUpdateTask',NULL,'1.9.4'),('20101209-1731','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:27','40dc15b89fa71ae2559d02d5a6b82f','Update Data','Setting the value of \'start_on_startup\' to trigger off conceptIndexUpdateTask on startup',NULL,'1.9.4'),('201012092009','djazayeri','liquibase-update-to-latest.xml','2011-10-03 17:08:26','435261f5d18756dba65d55f42528a4','Modify Column (x10)','Increasing length of address fields in person_address and location to 255',NULL,'1.9.4'),('201102280948','bwolfe','liquibase-update-to-latest.xml','2011-10-03 17:07:37','7248f6f988e3a1b5fd864a433b61aae','Drop Foreign Key Constraint','Removing the foreign key from users.user_id to person.person_id if it still exists',NULL,'1.9.4'),('20110329-2317','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:39','1cf77131c583d513d7513b604b8f3940','Delete Data','Removing \'View Encounters\' privilege from Anonymous user',NULL,'1.9.4'),('20110329-2318','wyclif','liquibase-update-to-latest.xml','2011-10-03 17:08:42','ca9b59cdedd44918453315a89962579e','Delete Data','Removing \'View Observations\' privilege from Anonymous user',NULL,'1.9.4'),('disable-foreign-key-checks','ben','liquibase-core-data.xml','2011-09-27 15:03:39','a5f57b3b22b63b75f613458ff51746e2','Custom SQL','',NULL,'1.9.4');
/*!40000 ALTER TABLE `liquibasechangelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liquibasechangeloglock`
--

DROP TABLE IF EXISTS `liquibasechangeloglock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `liquibasechangeloglock` (
  `ID` int(11) NOT NULL,
  `LOCKED` tinyint(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liquibasechangeloglock`
--

LOCK TABLES `liquibasechangeloglock` WRITE;
/*!40000 ALTER TABLE `liquibasechangeloglock` DISABLE KEYS */;
INSERT INTO `liquibasechangeloglock` VALUES (1,0,NULL,NULL);
/*!40000 ALTER TABLE `liquibasechangeloglock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city_village` varchar(255) DEFAULT NULL,
  `state_province` varchar(255) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `county_district` varchar(255) DEFAULT NULL,
  `address3` varchar(255) DEFAULT NULL,
  `address6` varchar(255) DEFAULT NULL,
  `address5` varchar(255) DEFAULT NULL,
  `address4` varchar(255) DEFAULT NULL,
  `retired` tinyint(4) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `parent_location` int(11) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE KEY `location_uuid_index` (`uuid`),
  KEY `name_of_location` (`name`),
  KEY `retired_status` (`retired`),
  KEY `user_who_created_location` (`creator`),
  KEY `user_who_retired_location` (`retired_by`),
  KEY `parent_location` (`parent_location`),
  CONSTRAINT `parent_location` FOREIGN KEY (`parent_location`) REFERENCES `location` (`location_id`),
  CONSTRAINT `user_who_created_location` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_location` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Unknown Location',NULL,'','','','','','',NULL,NULL,1,'2005-09-22 00:00:00',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'8d6c993e-c2cc-11de-8d13-0010c6dffd0f'),(2,'Ghana','Republic of Ghana, Country, Root in hierarchy',NULL,NULL,NULL,NULL,NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:06:59',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa91ef0-e8ec-11e0-8e86-a9cbfc8ed377'),(3,'Navio CHPS',NULL,NULL,NULL,NULL,'Navio',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Navio CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8e0b2-e8ec-11e0-8e86-a9cbfc8ed377'),(4,'Nakong CHPS',NULL,NULL,NULL,NULL,'Katiu-Nakong',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Nakong CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8e4ae-e8ec-11e0-8e86-a9cbfc8ed377'),(5,'Katiu CHPS',NULL,NULL,NULL,NULL,'Katiu-Nakong',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Katiu CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8e602-e8ec-11e0-8e86-a9cbfc8ed377'),(6,'Kayoro CHPS',NULL,NULL,NULL,NULL,'Kayoro',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Kayoro CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8e72e-e8ec-11e0-8e86-a9cbfc8ed377'),(7,'Nyangania CHPS',NULL,NULL,NULL,NULL,'Chiana',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Nyangania CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8e85a-e8ec-11e0-8e86-a9cbfc8ed377'),(8,'Kanania CHPS',NULL,NULL,NULL,NULL,'Chiana',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Kanania CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8e97c-e8ec-11e0-8e86-a9cbfc8ed377'),(9,'Kalvio CHPS',NULL,NULL,NULL,NULL,'Chiana',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Kalvio CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8eaa8-e8ec-11e0-8e86-a9cbfc8ed377'),(10,'Chiana HC',NULL,NULL,NULL,NULL,'Chiana',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Chiana HC','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8ebca-e8ec-11e0-8e86-a9cbfc8ed377'),(11,'Kurugu CHPS',NULL,NULL,NULL,NULL,'Kandiga-Kurugu',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Kurugu CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8ece2-e8ec-11e0-8e86-a9cbfc8ed377'),(12,'Kandiga HC',NULL,NULL,NULL,NULL,'Kandiga-Kurugu',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Kandiga HC','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8edfa-e8ec-11e0-8e86-a9cbfc8ed377'),(13,'Bugsongo CHPS',NULL,NULL,NULL,NULL,'Sirigu',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Bugsongo CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8ef26-e8ec-11e0-8e86-a9cbfc8ed377'),(14,'Sirigu HC',NULL,NULL,NULL,NULL,'Sirigu',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Sirigu HC','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8f048-e8ec-11e0-8e86-a9cbfc8ed377'),(15,'Kajelo CHPS',NULL,NULL,NULL,NULL,'Paga Central',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Kajelo CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8f160-e8ec-11e0-8e86-a9cbfc8ed377'),(16,'Paga HC',NULL,NULL,NULL,NULL,'Paga Central',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Paga HC','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8f278-e8ec-11e0-8e86-a9cbfc8ed377'),(17,'Mirigu CHPS',NULL,NULL,NULL,NULL,'Mirigu',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana West','Mirigu CHPS','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8f3a4-e8ec-11e0-8e86-a9cbfc8ed377'),(18,'Yua',NULL,NULL,NULL,NULL,'Central North East',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Yua','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8f4da-e8ec-11e0-8e86-a9cbfc8ed377'),(19,'Natugnia',NULL,NULL,NULL,NULL,'Central North East',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Natugnia','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8f5fc-e8ec-11e0-8e86-a9cbfc8ed377'),(20,'Manyoro',NULL,NULL,NULL,NULL,'Central North East',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Manyoro','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8f714-e8ec-11e0-8e86-a9cbfc8ed377'),(21,'Wuru',NULL,NULL,NULL,NULL,'Central West',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Wuru','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d8fffc-e8ec-11e0-8e86-a9cbfc8ed377'),(22,'Gia',NULL,NULL,NULL,NULL,'Central West',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Gia','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d90132-e8ec-11e0-8e86-a9cbfc8ed377'),(23,'Vunania',NULL,NULL,NULL,NULL,'Central West',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Vunania','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d90254-e8ec-11e0-8e86-a9cbfc8ed377'),(24,'Pindaa',NULL,NULL,NULL,NULL,'Central West',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Pindaa','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d9036c-e8ec-11e0-8e86-a9cbfc8ed377'),(25,'Nayagnia',NULL,NULL,NULL,NULL,'Central East',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Nayagnia','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d9048e-e8ec-11e0-8e86-a9cbfc8ed377'),(26,'Kassena Nankana',NULL,NULL,NULL,NULL,'Central East',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Kassena Nankana','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d905a6-e8ec-11e0-8e86-a9cbfc8ed377'),(27,'Doba',NULL,NULL,NULL,NULL,'Central East',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Doba','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d906c8-e8ec-11e0-8e86-a9cbfc8ed377'),(28,'Naaga',NULL,NULL,NULL,NULL,'Central South',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Naaga','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d907e0-e8ec-11e0-8e86-a9cbfc8ed377'),(29,'Biu',NULL,NULL,NULL,NULL,'Central South',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Biu','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d90902-e8ec-11e0-8e86-a9cbfc8ed377'),(30,'Gongnia',NULL,NULL,NULL,NULL,'Central Navrongo',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Gongnia','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d90a2e-e8ec-11e0-8e86-a9cbfc8ed377'),(31,'Pungu South',NULL,NULL,NULL,NULL,'Central North',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Pungu South','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d90b32-e8ec-11e0-8e86-a9cbfc8ed377'),(32,'Pungu North',NULL,NULL,NULL,NULL,'Central North',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Kassena-Nankana','Pungu North','Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d90c2c-e8ec-11e0-8e86-a9cbfc8ed377'),(33,'Field Agent',NULL,NULL,NULL,NULL,'Field Agent',NULL,'Ghana',NULL,NULL,1,'0002-11-30 00:00:00','Field Agent','Field Agent','Field Agent',NULL,NULL,0,NULL,NULL,NULL,NULL,'40d90d3a-e8ec-11e0-8e86-a9cbfc8ed377'),(34,'Gonum CHPS',NULL,NULL,NULL,NULL,'Mirigu',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Kassena-Nankana West',NULL,'Upper East',NULL,NULL,0,NULL,NULL,NULL,NULL,'43c31f72-e8ec-11e0-8e86-a9cbfc8ed377'),(35,'Okwampa CHPS',NULL,NULL,NULL,NULL,'Bawjiase',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43c3f9a6-e8ec-11e0-8e86-a9cbfc8ed377'),(36,'Akrabong CHPS',NULL,NULL,NULL,NULL,'Bontrase',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43c4b3d2-e8ec-11e0-8e86-a9cbfc8ed377'),(37,'TawiaKwe CHPS',NULL,NULL,NULL,NULL,'Bawjiase',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43c57c40-e8ec-11e0-8e86-a9cbfc8ed377'),(38,'Ahentia CHPS',NULL,NULL,NULL,NULL,'Awutu',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43c629a6-e8ec-11e0-8e86-a9cbfc8ed377'),(39,'Adawunkwao CHPS',NULL,NULL,NULL,NULL,'Bawjiase',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43c6d2ac-e8ec-11e0-8e86-a9cbfc8ed377'),(40,'Awutu HC',NULL,NULL,NULL,NULL,'Awutu',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43c7b262-e8ec-11e0-8e86-a9cbfc8ed377'),(41,'Bontrase HC',NULL,NULL,NULL,NULL,'Bontrase',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43c87012-e8ec-11e0-8e86-a9cbfc8ed377'),(42,'Senya HC',NULL,NULL,NULL,NULL,'Senya',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43c92da4-e8ec-11e0-8e86-a9cbfc8ed377'),(43,'Opeikuma CHPS',NULL,NULL,NULL,NULL,'Kasoa',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43c9f3e2-e8ec-11e0-8e86-a9cbfc8ed377'),(44,'Papaase CHPS',NULL,NULL,NULL,NULL,'Kasoa',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43caad96-e8ec-11e0-8e86-a9cbfc8ed377'),(45,'Mayanda CHPS',NULL,NULL,NULL,NULL,'Bawjiase',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43cb64b6-e8ec-11e0-8e86-a9cbfc8ed377'),(46,'Ofadaa CHPS',NULL,NULL,NULL,NULL,'Bawjiase',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43cc0b00-e8ec-11e0-8e86-a9cbfc8ed377'),(47,'Bawjiase HC',NULL,NULL,NULL,NULL,'Bawjiase',NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:06','Awutu Senya',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'43d22756-e8ec-11e0-8e86-a9cbfc8ed377'),(48,'Ashanti',NULL,NULL,NULL,NULL,NULL,NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:07',NULL,NULL,'Ashanti',NULL,NULL,0,NULL,NULL,NULL,NULL,'4405a52c-e8ec-11e0-8e86-a9cbfc8ed377'),(49,'Brong Ahafo',NULL,NULL,NULL,NULL,NULL,NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:07',NULL,NULL,'Brong Ahafo',NULL,NULL,0,NULL,NULL,NULL,NULL,'440644a0-e8ec-11e0-8e86-a9cbfc8ed377'),(50,'Eastern',NULL,NULL,NULL,NULL,NULL,NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:07',NULL,NULL,'Eastern',NULL,NULL,0,NULL,NULL,NULL,NULL,'4406b5b6-e8ec-11e0-8e86-a9cbfc8ed377'),(51,'Greater Accra',NULL,NULL,NULL,NULL,NULL,NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:07',NULL,NULL,'Greater Accra',NULL,NULL,0,NULL,NULL,NULL,NULL,'44073b3a-e8ec-11e0-8e86-a9cbfc8ed377'),(52,'Northern',NULL,NULL,NULL,NULL,NULL,NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:07',NULL,NULL,'Northern',NULL,NULL,0,NULL,NULL,NULL,NULL,'4407a386-e8ec-11e0-8e86-a9cbfc8ed377'),(53,'Upper West',NULL,NULL,NULL,NULL,NULL,NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:07',NULL,NULL,'Upper West',NULL,NULL,0,NULL,NULL,NULL,NULL,'440811ea-e8ec-11e0-8e86-a9cbfc8ed377'),(54,'Western',NULL,NULL,NULL,NULL,NULL,NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:07',NULL,NULL,'Western',NULL,NULL,0,NULL,NULL,NULL,NULL,'44089b74-e8ec-11e0-8e86-a9cbfc8ed377'),(55,'Volta',NULL,NULL,NULL,NULL,NULL,NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:07',NULL,NULL,'Volta',NULL,NULL,0,NULL,NULL,NULL,NULL,'44090410-e8ec-11e0-8e86-a9cbfc8ed377'),(56,'Other',NULL,NULL,NULL,NULL,NULL,NULL,'Ghana',NULL,NULL,1,'2011-09-27 15:07:07','Other',NULL,'Central Region',NULL,NULL,0,NULL,NULL,NULL,NULL,'44631022-e8ec-11e0-8e86-a9cbfc8ed377');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_tag`
--

DROP TABLE IF EXISTS `location_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_tag` (
  `location_tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `creator` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`location_tag_id`),
  UNIQUE KEY `location_tag_uuid_index` (`uuid`),
  KEY `location_tag_creator` (`creator`),
  KEY `location_tag_retired_by` (`retired_by`),
  CONSTRAINT `location_tag_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `location_tag_retired_by` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_tag`
--

LOCK TABLES `location_tag` WRITE;
/*!40000 ALTER TABLE `location_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `location_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_tag_map`
--

DROP TABLE IF EXISTS `location_tag_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_tag_map` (
  `location_id` int(11) NOT NULL,
  `location_tag_id` int(11) NOT NULL,
  PRIMARY KEY (`location_id`,`location_tag_id`),
  KEY `location_tag_map_tag` (`location_tag_id`),
  CONSTRAINT `location_tag_map_location` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`),
  CONSTRAINT `location_tag_map_tag` FOREIGN KEY (`location_tag_id`) REFERENCES `location_tag` (`location_tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_tag_map`
--

LOCK TABLES `location_tag_map` WRITE;
/*!40000 ALTER TABLE `location_tag_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `location_tag_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logic_rule_definition`
--

DROP TABLE IF EXISTS `logic_rule_definition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logic_rule_definition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` char(38) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `rule_content` varchar(2048) NOT NULL,
  `language` varchar(255) NOT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `retired` tinyint(1) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `creator for rule_definition` (`creator`),
  KEY `changed_by for rule_definition` (`changed_by`),
  KEY `retired_by for rule_definition` (`retired_by`),
  CONSTRAINT `creator for rule_definition` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `changed_by for rule_definition` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `retired_by for rule_definition` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logic_rule_definition`
--

LOCK TABLES `logic_rule_definition` WRITE;
/*!40000 ALTER TABLE `logic_rule_definition` DISABLE KEYS */;
/*!40000 ALTER TABLE `logic_rule_definition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logic_rule_token`
--

DROP TABLE IF EXISTS `logic_rule_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logic_rule_token` (
  `logic_rule_token_id` int(11) NOT NULL AUTO_INCREMENT,
  `creator` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `token` varchar(512) NOT NULL,
  `class_name` varchar(512) NOT NULL,
  `state` varchar(512) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`logic_rule_token_id`),
  UNIQUE KEY `logic_rule_token_uuid` (`uuid`),
  KEY `token_creator` (`creator`),
  KEY `token_changed_by` (`changed_by`),
  CONSTRAINT `token_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `person` (`person_id`),
  CONSTRAINT `token_creator` FOREIGN KEY (`creator`) REFERENCES `person` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logic_rule_token`
--

LOCK TABLES `logic_rule_token` WRITE;
/*!40000 ALTER TABLE `logic_rule_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `logic_rule_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logic_rule_token_tag`
--

DROP TABLE IF EXISTS `logic_rule_token_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logic_rule_token_tag` (
  `logic_rule_token_id` int(11) NOT NULL,
  `tag` varchar(512) NOT NULL,
  KEY `token_tag` (`logic_rule_token_id`),
  CONSTRAINT `token_tag` FOREIGN KEY (`logic_rule_token_id`) REFERENCES `logic_rule_token` (`logic_rule_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logic_rule_token_tag`
--

LOCK TABLES `logic_rule_token_tag` WRITE;
/*!40000 ALTER TABLE `logic_rule_token_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `logic_rule_token_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logic_token_registration`
--

DROP TABLE IF EXISTS `logic_token_registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logic_token_registration` (
  `token_registration_id` int(11) NOT NULL AUTO_INCREMENT,
  `creator` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `token` varchar(512) NOT NULL,
  `provider_class_name` varchar(512) NOT NULL,
  `provider_token` varchar(512) NOT NULL,
  `configuration` varchar(2000) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`token_registration_id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `token_registration_creator` (`creator`),
  KEY `token_registration_changed_by` (`changed_by`),
  CONSTRAINT `token_registration_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `token_registration_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logic_token_registration`
--

LOCK TABLES `logic_token_registration` WRITE;
/*!40000 ALTER TABLE `logic_token_registration` DISABLE KEYS */;
/*!40000 ALTER TABLE `logic_token_registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logic_token_registration_tag`
--

DROP TABLE IF EXISTS `logic_token_registration_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logic_token_registration_tag` (
  `token_registration_id` int(11) NOT NULL,
  `tag` varchar(512) NOT NULL,
  KEY `token_registration_tag` (`token_registration_id`),
  CONSTRAINT `token_registration_tag` FOREIGN KEY (`token_registration_id`) REFERENCES `logic_token_registration` (`token_registration_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logic_token_registration_tag`
--

LOCK TABLES `logic_token_registration_tag` WRITE;
/*!40000 ALTER TABLE `logic_token_registration_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `logic_token_registration_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_blackout`
--

DROP TABLE IF EXISTS `motechmodule_blackout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_blackout` (
  `motechmodule_blackout_id` int(11) NOT NULL AUTO_INCREMENT,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`motechmodule_blackout_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_blackout`
--

LOCK TABLES `motechmodule_blackout` WRITE;
/*!40000 ALTER TABLE `motechmodule_blackout` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_blackout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_care_configuration`
--

DROP TABLE IF EXISTS `motechmodule_care_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_care_configuration` (
  `care_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `care_name` varchar(50) NOT NULL,
  `max_alerts` int(4) DEFAULT '1',
  PRIMARY KEY (`care_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_care_configuration`
--

LOCK TABLES `motechmodule_care_configuration` WRITE;
/*!40000 ALTER TABLE `motechmodule_care_configuration` DISABLE KEYS */;
INSERT INTO `motechmodule_care_configuration` VALUES (1,'ANC',3),(2,'PNC1',3),(3,'PNC2',3),(4,'PNC3',3),(5,'IPT1',3),(6,'IPT2',3),(7,'IPT3',3),(8,'TT1',3),(9,'TT2',3),(10,'TT3',3),(11,'TT4',3),(12,'TT5',3),(13,'IPTI1',3),(14,'IPTI2',3),(15,'IPTI3',3),(16,'OPV0',3),(17,'OPV1',3),(18,'OPV2',3),(19,'OPV3',3),(20,'VitaA1',3),(21,'VitaA2',3),(22,'VitaA3',3),(23,'VitaA4',3),(24,'VitaA5',3),(25,'VitaA6',3),(26,'VitaA7',3),(27,'VitaA8',3),(28,'VitaA9',3),(29,'Measles',3),(30,'YellowFever',3),(31,'BCG',3),(32,'Penta1',3),(33,'Penta3',3),(34,'Penta2',3),(35,'EDD',3);
/*!40000 ALTER TABLE `motechmodule_care_configuration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_community`
--

DROP TABLE IF EXISTS `motechmodule_community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_community` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `community_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `facility_id` bigint(20) DEFAULT NULL,
  `retired` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `community_id` (`community_id`),
  KEY `facility_of_community` (`facility_id`),
  CONSTRAINT `facility_of_community` FOREIGN KEY (`facility_id`) REFERENCES `motechmodule_facility` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_community`
--

LOCK TABLES `motechmodule_community` WRITE;
/*!40000 ALTER TABLE `motechmodule_community` DISABLE KEYS */;
INSERT INTO `motechmodule_community` VALUES (1,11111,'Badonu',1,0),(2,11112,'Sakaa',1,0),(3,11113,'Sawuni',1,0),(4,11114,'Kasili',1,0),(5,11115,'Kazugu',1,0),(6,11116,'Tazika',1,0),(7,11117,'Bagtua',1,0),(8,11118,'Tigakuri',1,0),(9,11211,'New Nakong',2,0),(10,11212,'Kawenia/Saboro',2,0),(11,11213,'Awenia',2,0),(12,11214,'Atinia',2,0),(13,11215,'Fulani settlement 1',2,0),(14,11216,'Fulani settlement 2',2,0),(15,11221,'Adabania',3,0),(16,11222,'Asasong',3,0),(17,11223,'Afania',3,0),(18,11224,'Katiu-Saboro',3,0),(19,11225,'Saa-Bayao',3,0),(20,11226,'Saa-Bonania',3,0),(21,11227,'Sazona',3,0),(22,11311,'Wombeo',4,0),(23,11312,'Kadania/Agwongo',4,0),(24,11313,'Kumbulu',4,0),(25,11314,'Kayoro-Saboro',4,0),(26,11315,'Akania/Bunyiu',4,0),(27,11316,'Aneo/Adungu',4,0),(28,11317,'Akaa/Achasong',4,0),(29,11318,'Kabaa/Kachela',4,0),(30,11411,'Gwenia/Vonia',5,0),(31,11412,'Vonia',5,1),(32,11421,'Old Kanania',6,1),(33,11422,'New Kanania',6,1),(34,11431,'Aboenia',7,0),(35,11432,'Gugoro',7,0),(36,11433,'Nayerinia',7,0),(37,11434,'Achonia',7,0),(38,11435,'Awenia',7,0),(39,11511,'Kurugu',9,0),(40,11512,'Kaasi',9,0),(41,11513,'Atiyorum',9,0),(42,11514,'Akamo',9,0),(43,11515,'Agandaa',9,0),(44,11516,'Azeaduma',9,0),(45,11517,'Azuridone',9,0),(46,11611,'Bugsongo',11,0),(47,11612,'Nyangonligo',11,0),(48,11613,'Basengo-moo',11,0),(49,11614,'Amutanga',11,0),(50,11615,'Wogingo',11,0),(51,11711,'Kajelo',13,0),(52,11712,'Nabio/Batiu',13,0),(53,11713,'Kayilo/Baloo',13,0),(54,11811,'Aburewasa',15,0),(55,11812,'Alembila',15,0),(56,11813,'Apia-Gomongo',15,0),(57,11814,'Azinzoka',15,0),(58,11815,'Abugizedone',15,0),(59,11816,'Chengo',15,0),(60,11817,'Dosun',15,0),(61,11818,'Gayingo',15,0),(62,11819,'Gonum A',15,0),(63,118110,'Gonum B',15,0),(64,118111,'Kansam',15,0),(65,118112,'Kasalingo',15,0),(66,118113,'Kumbusingo',15,0),(67,118114,'Mirigu-Nayire',15,0),(68,118115,'Nyongo',15,0),(69,118116,'Pingo',15,0),(70,118117,'Pumbisi',15,0),(71,118118,'Tikongo',15,0),(72,118119,'Waligu',15,0),(73,118120,'Zampengo',15,0),(74,12111,'Atigizi Bifi',16,0),(75,12112,'Tarebieri',16,0),(76,12113,'Barigabisi',16,0),(77,12114,'Aforibisi',16,0),(78,12115,'Gingerrringo Tinoringo',16,0),(79,12121,'Akumbisi',17,0),(80,12122,'Gerebifi',17,0),(81,12123,'Dazongo',17,0),(82,12124,'Fabisi',17,0),(83,12125,'Nyogsi',17,0),(84,12131,'Gware',18,0),(85,12132,'Chilla',18,0),(86,12133,'Dansesi',18,0),(87,12134,'Wura',18,0),(88,12135,'Kupella',18,0),(89,12136,'Benyim',18,0),(90,12137,'Saforo',18,0),(91,12138,'Sakunia',18,0),(92,12139,'Wanjagnia',18,0),(93,121310,'Deadaa',18,0),(94,121311,'Gumongo',18,0),(95,12211,'Wuru',19,0),(96,12212,'Yogbaniat Yiswania',19,0),(97,12213,'Bonia',19,0),(98,12214,'Nangalikinia',19,0),(99,12215,'Nawognia',19,0),(100,12216,'Korania',19,0),(101,12221,'Kwosongo',20,0),(102,12222,'Nangwoa',20,0),(103,12223,'Jamaga',20,0),(104,12224,'Bagania',20,0),(105,12231,'Janania',21,0),(106,12232,'Gaani',21,0),(107,12233,'Vunania',21,0),(108,12241,'Pindaa',22,0),(109,12242,'Pinda gua 1',22,0),(110,12243,'Pinda gua 2',22,0),(111,12311,'Badania',23,0),(112,12312,'Karama / Yibanabia',23,0),(113,12313,'Yitunia',23,0),(114,12314,'Kungwania',23,0),(115,12315,'Tankuna',23,0),(116,12321,'Abempingu A',24,0),(117,12322,'Abempingu B',24,0),(118,12323,'Akanrugh Daboo',24,0),(119,12324,'Akukonguro',24,0),(120,12325,'Akuka',24,0),(121,12331,'Korugh Kandaa',25,0),(122,12332,'Anyayadoanii',25,0),(123,12333,'Gayingo',25,0),(124,12334,'Akannaluw',25,0),(125,12335,'Gindigadinia',25,0),(126,12411,'Thoo',26,0),(127,12412,'Nyanbifi',26,0),(128,12413,'Tikrongo',26,0),(129,12414,'Chaaba',26,0),(130,12415,'Kungongo',26,0),(131,12416,'Tindana',26,0),(132,12421,'Kodene',27,0),(133,12422,'Tapolia',27,0),(134,12423,'Kapania',27,0),(135,12424,'Dofimdosinbema',27,0),(136,12425,'Sensa',27,0),(137,12426,'Consa',27,0),(138,12427,'Kondalsa',27,0),(139,12428,'Jaagu',27,0),(140,12511,'Gongnia',28,0),(141,12512,'Bodenia',28,0),(142,12513,'Nagalikinia',28,0),(143,12611,'Demsasenia',29,0),(144,12612,'Lower Telania',29,0),(145,12613,'Punyoro 1',29,0),(146,12614,'Punyoro 2',29,0),(147,12615,'Bavugnia',29,0),(148,12616,'Manchoro',29,0),(149,12617,'Tekuru',29,0),(150,12621,'Wasonguru',30,0),(151,12622,'Bavugnia',30,0),(152,12623,'Nyangua',30,0),(153,12624,'Bawiu',30,0),(154,12625,'Upper Telania',30,0),(155,12626,'Kwania',30,0),(156,11423,'Abulu',6,0),(157,11413,'Nyangania',5,0),(158,11436,'Kalvio',7,0),(159,11424,'Kanania',6,0),(160,11425,'Kabanga',6,0),(161,11426,'Korania',6,0),(162,11518,'Longo',9,0),(163,11519,'Azaasi',9,0),(164,115110,'Anisore',9,0),(165,11228,'Katiu',3,0),(166,11229,'Kawurania/Atiasong',3,0),(167,112210,'Achinia',3,0),(168,11217,'Nakong',2,0),(169,11319,'Wura',4,0),(170,113110,'Baliu',4,0),(171,113111,'Kayoro',4,0),(172,118121,'Nabango',15,0),(173,118122,'Apibisi',15,0),(174,11119,'Bayono',1,0),(175,111110,'Navio',1,0),(176,11714,'Aliabolo',13,0),(179,1300217,'Pinkwalakwaga',8,0),(180,1300229,'Adognia',8,0),(181,1300238,'Chiana-Saboro',8,0),(182,1300240,'Asunia',8,0),(183,1300255,'Kafania',8,0),(184,1300264,'Yidania',8,0),(185,1300272,'Adasong',8,0),(186,1300286,'Bembisi',10,0),(187,1300293,'Longo',10,0),(188,1300303,'Azeaduma',10,0),(189,1300319,'Azaasi',10,0),(190,1300326,'Agandaa',10,0),(191,1300335,'Anisore',10,0),(192,1300342,'Nindongo',10,0),(193,1300357,'Tindongo',10,0),(194,1300361,'Nabango',10,0),(195,1300008,'Abillatae',12,0),(196,1300012,'Dazongo',12,0),(197,1300020,'Wugingo',12,0),(198,1300031,'Basengo',12,0),(199,1300049,'Tangasia',12,0),(200,1300054,'Tindongo',12,0),(201,1300065,'Gunwoko',12,0),(202,1300077,'Puwelingo',12,0),(203,1300083,'Azugzingo',12,0),(204,1300096,'Tutumbisi',12,0),(205,1300106,'Chania',14,0),(206,1300110,'Border',14,0),(207,1300123,'Gwaru',14,0),(208,1300134,'Nania',14,0),(209,1300147,'Zenga',14,0),(210,1300152,'Kakungu',14,0),(211,1300168,'Bisau',14,0),(212,1300175,'Nyania',14,0),(213,1300181,'Kanponga',14,0),(214,1300199,'Babile',14,0);
/*!40000 ALTER TABLE `motechmodule_community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_community_patient`
--

DROP TABLE IF EXISTS `motechmodule_community_patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_community_patient` (
  `community_id` bigint(20) NOT NULL,
  `patient_id` int(11) NOT NULL,
  UNIQUE KEY `patient_id` (`patient_id`),
  KEY `com_pat_rel_community` (`community_id`),
  CONSTRAINT `com_pat_rel_community` FOREIGN KEY (`community_id`) REFERENCES `motechmodule_community` (`id`),
  CONSTRAINT `com_pat_rel_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_community_patient`
--

LOCK TABLES `motechmodule_community_patient` WRITE;
/*!40000 ALTER TABLE `motechmodule_community_patient` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_community_patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_configuration`
--

DROP TABLE IF EXISTS `motechmodule_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_configuration` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `value` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_configuration`
--

LOCK TABLES `motechmodule_configuration` WRITE;
/*!40000 ALTER TABLE `motechmodule_configuration` DISABLE KEYS */;
INSERT INTO `motechmodule_configuration` VALUES (1,'valid.child.registration.date','19-04-2011','Child patients registered after this date have proper care histories');
/*!40000 ALTER TABLE `motechmodule_configuration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_defaulted_expected_encounter_alert`
--

DROP TABLE IF EXISTS `motechmodule_defaulted_expected_encounter_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_defaulted_expected_encounter_alert` (
  `expected_encounter_alert_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `expected_encounter_id` bigint(20) NOT NULL,
  `alerts_delivered` int(4) DEFAULT '0',
  `care_id` bigint(20) DEFAULT NULL,
  `alert_attempts` int(4) DEFAULT '0',
  `last_attempted` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_delivered` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`expected_encounter_alert_id`),
  KEY `fk_defaulted_expected_encounter` (`expected_encounter_id`),
  KEY `fk_care_configuration_encounter` (`care_id`),
  CONSTRAINT `fk_care_configuration_encounter` FOREIGN KEY (`care_id`) REFERENCES `motechmodule_care_configuration` (`care_id`),
  CONSTRAINT `fk_defaulted_expected_encounter` FOREIGN KEY (`expected_encounter_id`) REFERENCES `motechmodule_expected_encounter` (`motechmodule_expected_encounter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_defaulted_expected_encounter_alert`
--

LOCK TABLES `motechmodule_defaulted_expected_encounter_alert` WRITE;
/*!40000 ALTER TABLE `motechmodule_defaulted_expected_encounter_alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_defaulted_expected_encounter_alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_defaulted_expected_obs_alert`
--

DROP TABLE IF EXISTS `motechmodule_defaulted_expected_obs_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_defaulted_expected_obs_alert` (
  `expected_obs_alert_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `expected_obs_id` bigint(20) NOT NULL,
  `alerts_delivered` int(4) DEFAULT '0',
  `care_id` bigint(20) DEFAULT NULL,
  `alert_attempts` int(4) DEFAULT '0',
  `last_attempted` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `last_delivered` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`expected_obs_alert_id`),
  KEY `fk_defaulted_expected_obs` (`expected_obs_id`),
  KEY `fk_care_configuration_obs` (`care_id`),
  CONSTRAINT `fk_care_configuration_obs` FOREIGN KEY (`care_id`) REFERENCES `motechmodule_care_configuration` (`care_id`),
  CONSTRAINT `fk_defaulted_expected_obs` FOREIGN KEY (`expected_obs_id`) REFERENCES `motechmodule_expected_obs` (`motechmodule_expected_obs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_defaulted_expected_obs_alert`
--

LOCK TABLES `motechmodule_defaulted_expected_obs_alert` WRITE;
/*!40000 ALTER TABLE `motechmodule_defaulted_expected_obs_alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_defaulted_expected_obs_alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_enrollment`
--

DROP TABLE IF EXISTS `motechmodule_enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_enrollment` (
  `motechmodule_enrollment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `program_name` varchar(200) NOT NULL,
  `obs_id` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`motechmodule_enrollment_id`),
  KEY `person_id_for_person` (`person_id`),
  KEY `obs_id_for_obs` (`obs_id`),
  CONSTRAINT `person_id_for_person` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`),
  CONSTRAINT `obs_id_for_obs` FOREIGN KEY (`obs_id`) REFERENCES `obs` (`obs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_enrollment`
--

LOCK TABLES `motechmodule_enrollment` WRITE;
/*!40000 ALTER TABLE `motechmodule_enrollment` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_expected_care_message_detail`
--

DROP TABLE IF EXISTS `motechmodule_expected_care_message_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_expected_care_message_detail` (
  `expected_care_message_detail_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `upcoming_message_key` varchar(20) DEFAULT NULL,
  `overdue_message_key` varchar(20) DEFAULT NULL,
  `time_period` varchar(10) DEFAULT NULL,
  `time_value` int(10) DEFAULT NULL,
  `user_preference_based` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`expected_care_message_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_expected_care_message_detail`
--

LOCK TABLES `motechmodule_expected_care_message_detail` WRITE;
/*!40000 ALTER TABLE `motechmodule_expected_care_message_detail` DISABLE KEYS */;
INSERT INTO `motechmodule_expected_care_message_detail` VALUES (1,'TT','tt.upcoming','tt.overdue','week',1,1),(2,'IPT','ipt.upcoming','ipt.overdue','week',1,1),(3,'ANC','anc.upcoming','anc.overdue','week',1,1),(4,'PNC(mother)','pnc.mother.upcoming','pnc.mother.overdue','hour',24,1),(5,'PNC(baby)','pnc.baby.upcoming','pnc.baby.overdue','hour',24,1),(6,'BCG','bcg.upcoming','bcg.overdue','week',1,1),(7,'OPV','opv.upcoming','opv.overdue','week',1,1),(8,'Penta','penta.upcoming','penta.overdue','week',1,1),(9,'IPTI','ipti.upcoming','ipti.overdue','week',1,1),(10,'YellowFever','yellowfever.upcoming','yellowfever.overdue','week',1,1),(11,'Measles','measles.upcoming','measles.overdue','week',1,1),(12,'VitaA','vitamina.upcoming','vitamina.overdue','week',1,1);
/*!40000 ALTER TABLE `motechmodule_expected_care_message_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_expected_care_message_detail_attribute`
--

DROP TABLE IF EXISTS `motechmodule_expected_care_message_detail_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_expected_care_message_detail_attribute` (
  `expected_care_message_detail_attribute_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `expected_care_message_detail_id` bigint(20) DEFAULT NULL,
  `attribute_name` varchar(20) NOT NULL,
  `attribute_value_numeric` int(11) DEFAULT NULL,
  PRIMARY KEY (`expected_care_message_detail_attribute_id`),
  KEY `fk_expected_care_message_attribute` (`expected_care_message_detail_id`),
  CONSTRAINT `fk_expected_care_message_attribute` FOREIGN KEY (`expected_care_message_detail_id`) REFERENCES `motechmodule_expected_care_message_detail` (`expected_care_message_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_expected_care_message_detail_attribute`
--

LOCK TABLES `motechmodule_expected_care_message_detail_attribute` WRITE;
/*!40000 ALTER TABLE `motechmodule_expected_care_message_detail_attribute` DISABLE KEYS */;
INSERT INTO `motechmodule_expected_care_message_detail_attribute` VALUES (1,4,'PNC1',6),(2,4,'PNC2',24),(3,4,'PNC3',24),(4,5,'PNC1',6),(5,5,'PNC2',24),(6,5,'PNC3',24);
/*!40000 ALTER TABLE `motechmodule_expected_care_message_detail_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_expected_encounter`
--

DROP TABLE IF EXISTS `motechmodule_expected_encounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_expected_encounter` (
  `motechmodule_expected_encounter_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) NOT NULL,
  `encounter_type` int(11) NOT NULL,
  `min_datetime` datetime DEFAULT NULL,
  `due_datetime` datetime NOT NULL,
  `late_datetime` datetime NOT NULL,
  `max_datetime` datetime DEFAULT NULL,
  `encounter_id` int(11) DEFAULT NULL,
  `care_name` varchar(50) NOT NULL,
  `group_name` varchar(50) NOT NULL,
  `voided` tinyint(1) NOT NULL,
  PRIMARY KEY (`motechmodule_expected_encounter_id`),
  KEY `patient_of_encounter` (`patient_id`),
  KEY `type_of_encounter` (`encounter_type`),
  KEY `actual_encounter` (`encounter_id`),
  CONSTRAINT `patient_of_encounter` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `type_of_encounter` FOREIGN KEY (`encounter_type`) REFERENCES `encounter_type` (`encounter_type_id`),
  CONSTRAINT `actual_encounter` FOREIGN KEY (`encounter_id`) REFERENCES `encounter` (`encounter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_expected_encounter`
--

LOCK TABLES `motechmodule_expected_encounter` WRITE;
/*!40000 ALTER TABLE `motechmodule_expected_encounter` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_expected_encounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_expected_obs`
--

DROP TABLE IF EXISTS `motechmodule_expected_obs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_expected_obs` (
  `motechmodule_expected_obs_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) NOT NULL,
  `concept_id` int(11) NOT NULL,
  `value_coded` int(11) DEFAULT NULL,
  `value_numeric` double DEFAULT NULL,
  `min_datetime` datetime DEFAULT NULL,
  `due_datetime` datetime NOT NULL,
  `late_datetime` datetime NOT NULL,
  `max_datetime` datetime DEFAULT NULL,
  `obs_id` int(11) DEFAULT NULL,
  `care_name` varchar(50) NOT NULL,
  `group_name` varchar(50) NOT NULL,
  `voided` tinyint(1) NOT NULL,
  PRIMARY KEY (`motechmodule_expected_obs_id`),
  KEY `patient_of_obs` (`patient_id`),
  KEY `concept_of_obs` (`concept_id`),
  KEY `value_concept_of_obs` (`value_coded`),
  KEY `actual_obs` (`obs_id`),
  CONSTRAINT `patient_of_obs` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `concept_of_obs` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `value_concept_of_obs` FOREIGN KEY (`value_coded`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `actual_obs` FOREIGN KEY (`obs_id`) REFERENCES `obs` (`obs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_expected_obs`
--

LOCK TABLES `motechmodule_expected_obs` WRITE;
/*!40000 ALTER TABLE `motechmodule_expected_obs` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_expected_obs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_facility`
--

DROP TABLE IF EXISTS `motechmodule_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_facility` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `facility_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `additional_phone_number1` varchar(50) DEFAULT NULL,
  `additional_phone_number2` varchar(50) DEFAULT NULL,
  `additional_phone_number3` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `facility_id` (`facility_id`),
  UNIQUE KEY `location_id` (`location_id`),
  CONSTRAINT `location_of_facility` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_facility`
--

LOCK TABLES `motechmodule_facility` WRITE;
/*!40000 ALTER TABLE `motechmodule_facility` DISABLE KEYS */;
INSERT INTO `motechmodule_facility` VALUES (1,11117,3,NULL,NULL,NULL,NULL),(2,11210,4,NULL,NULL,NULL,NULL),(3,11223,5,NULL,NULL,NULL,NULL),(4,11313,6,NULL,NULL,NULL,NULL),(5,11418,7,NULL,NULL,NULL,NULL),(6,11425,8,NULL,NULL,NULL,NULL),(7,11439,9,NULL,NULL,NULL,NULL),(8,11441,10,NULL,NULL,NULL,NULL),(9,11516,11,NULL,NULL,NULL,NULL),(10,11528,12,NULL,NULL,NULL,NULL),(11,11619,13,NULL,NULL,NULL,NULL),(12,11626,14,NULL,NULL,NULL,NULL),(13,11711,15,NULL,NULL,NULL,NULL),(14,11724,16,NULL,NULL,NULL,NULL),(15,11814,17,NULL,NULL,NULL,NULL),(16,12113,18,NULL,NULL,NULL,NULL),(17,12121,19,NULL,NULL,NULL,NULL),(18,12132,20,NULL,NULL,NULL,NULL),(19,12215,21,NULL,NULL,NULL,NULL),(20,12227,22,NULL,NULL,NULL,NULL),(21,12236,23,NULL,NULL,NULL,NULL),(22,12243,24,NULL,NULL,NULL,NULL),(23,12317,25,NULL,NULL,NULL,NULL),(24,12329,26,NULL,NULL,NULL,NULL),(25,12338,27,NULL,NULL,NULL,NULL),(26,12412,28,NULL,NULL,NULL,NULL),(27,12420,29,NULL,NULL,NULL,NULL),(28,12514,30,NULL,NULL,NULL,NULL),(29,12611,31,NULL,NULL,NULL,NULL),(30,12624,32,NULL,NULL,NULL,NULL),(31,99998,33,NULL,NULL,NULL,NULL),(32,99999,1,NULL,NULL,NULL,NULL),(34,13119,34,'547952068',NULL,NULL,NULL),(35,13126,35,'243780877',NULL,NULL,NULL),(36,13135,36,'242511233',NULL,NULL,NULL),(37,13142,37,'266409711',NULL,NULL,NULL),(38,13157,38,'546522757',NULL,NULL,NULL),(39,13161,39,'245316977',NULL,NULL,NULL),(40,13174,40,'244592889',NULL,NULL,NULL),(41,13188,41,'244569654',NULL,NULL,NULL),(42,13190,42,'208623304',NULL,NULL,NULL),(43,13208,43,'208350038',NULL,NULL,NULL),(44,13212,44,'207211620',NULL,NULL,NULL),(45,13220,45,'249449640',NULL,NULL,NULL),(46,13231,46,'209426461',NULL,NULL,NULL),(47,13249,47,NULL,NULL,NULL,NULL),(48,13254,48,NULL,NULL,NULL,NULL),(49,13265,49,NULL,NULL,NULL,NULL),(50,13277,50,NULL,NULL,NULL,NULL),(51,13283,51,NULL,NULL,NULL,NULL),(52,13296,52,NULL,NULL,NULL,NULL),(53,13306,53,NULL,NULL,NULL,NULL),(54,13310,54,NULL,NULL,NULL,NULL),(55,13323,55,NULL,NULL,NULL,NULL),(56,13334,56,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `motechmodule_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_facility_patient`
--

DROP TABLE IF EXISTS `motechmodule_facility_patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_facility_patient` (
  `facility_id` bigint(20) NOT NULL,
  `patient_id` int(11) NOT NULL,
  UNIQUE KEY `patient_id` (`patient_id`),
  KEY `patient_rel_facility` (`facility_id`),
  CONSTRAINT `fk_fac_patient_map_to_facility` FOREIGN KEY (`facility_id`) REFERENCES `motechmodule_facility` (`id`),
  CONSTRAINT `fk_fac_patient_map_to_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_facility_patient`
--

LOCK TABLES `motechmodule_facility_patient` WRITE;
/*!40000 ALTER TABLE `motechmodule_facility_patient` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_facility_patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_generaloutpatientencounter`
--

DROP TABLE IF EXISTS `motechmodule_generaloutpatientencounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_generaloutpatientencounter` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `visit_date` date NOT NULL,
  `staff_id` int(11) NOT NULL,
  `facility_id` int(11) NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `sex` varchar(6) NOT NULL,
  `birthdate` date NOT NULL,
  `insured` tinyint(1) NOT NULL,
  `newcase` tinyint(1) NOT NULL,
  `newpatient` tinyint(1) DEFAULT NULL,
  `diagnosis` int(11) NOT NULL,
  `secondary_diagnosis` int(11) DEFAULT NULL,
  `referred` tinyint(1) NOT NULL,
  `rdt_given` tinyint(1) DEFAULT NULL,
  `rdt_positive` tinyint(1) DEFAULT NULL,
  `act_treated` tinyint(1) DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_generaloutpatientencounter`
--

LOCK TABLES `motechmodule_generaloutpatientencounter` WRITE;
/*!40000 ALTER TABLE `motechmodule_generaloutpatientencounter` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_generaloutpatientencounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_incoming_message`
--

DROP TABLE IF EXISTS `motechmodule_incoming_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_incoming_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message_key` varchar(20) DEFAULT NULL,
  `message` mediumtext,
  `code` varchar(10) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `sent_on` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_incoming_message`
--

LOCK TABLES `motechmodule_incoming_message` WRITE;
/*!40000 ALTER TABLE `motechmodule_incoming_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_incoming_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_message`
--

DROP TABLE IF EXISTS `motechmodule_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_message` (
  `motechmodule_message_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `public_id` varchar(36) NOT NULL,
  `schedule_id` bigint(20) NOT NULL,
  `attempt_date` datetime DEFAULT NULL,
  `attempt_status` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`motechmodule_message_id`),
  UNIQUE KEY `public_id` (`public_id`),
  KEY `scheduledmessage_of_message` (`schedule_id`),
  CONSTRAINT `scheduledmessage_of_message` FOREIGN KEY (`schedule_id`) REFERENCES `motechmodule_scheduledmessage` (`motechmodule_scheduledmessage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_message`
--

LOCK TABLES `motechmodule_message` WRITE;
/*!40000 ALTER TABLE `motechmodule_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_message_language`
--

DROP TABLE IF EXISTS `motechmodule_message_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_message_language` (
  `language_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_message_language`
--

LOCK TABLES `motechmodule_message_language` WRITE;
/*!40000 ALTER TABLE `motechmodule_message_language` DISABLE KEYS */;
INSERT INTO `motechmodule_message_language` VALUES (1,'en','English'),(2,'kas','Kassim'),(3,'nan','Nankam'),(4,'fan','Fante');
/*!40000 ALTER TABLE `motechmodule_message_language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_message_program`
--

DROP TABLE IF EXISTS `motechmodule_message_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_message_program` (
  `motechmodule_message_program_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `start_state` bigint(20) DEFAULT NULL,
  `end_state` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`motechmodule_message_program_id`),
  KEY `fk_message_start_state` (`start_state`),
  KEY `fk_message_end_state` (`end_state`),
  CONSTRAINT `fk_message_start_state` FOREIGN KEY (`start_state`) REFERENCES `motechmodule_message_program_state` (`motechmodule_message_program_state_id`),
  CONSTRAINT `fk_message_end_state` FOREIGN KEY (`end_state`) REFERENCES `motechmodule_message_program_state` (`motechmodule_message_program_state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_message_program`
--

LOCK TABLES `motechmodule_message_program` WRITE;
/*!40000 ALTER TABLE `motechmodule_message_program` DISABLE KEYS */;
INSERT INTO `motechmodule_message_program` VALUES (1,'Weekly Info Child Message Program',88,140),(2,'Weekly Pregnancy Message Program',42,41),(3,'Weekly Info Pregnancy Message Program',83,82);
/*!40000 ALTER TABLE `motechmodule_message_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_message_program_state`
--

DROP TABLE IF EXISTS `motechmodule_message_program_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_message_program_state` (
  `motechmodule_message_program_state_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `time_value` int(10) DEFAULT NULL,
  `time_period` varchar(20) DEFAULT NULL,
  `time_reference` varchar(50) DEFAULT NULL,
  `concept_name` varchar(20) DEFAULT NULL,
  `concept_value` varchar(30) DEFAULT NULL,
  `message_key` varchar(30) DEFAULT NULL,
  `message_key_a` varchar(30) DEFAULT NULL,
  `message_key_b` varchar(30) DEFAULT NULL,
  `message_key_c` varchar(30) DEFAULT NULL,
  `next_state` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`motechmodule_message_program_state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_message_program_state`
--

LOCK TABLES `motechmodule_message_program_state` WRITE;
/*!40000 ALTER TABLE `motechmodule_message_program_state` DISABLE KEYS */;
INSERT INTO `motechmodule_message_program_state` VALUES (6,'Pregnancy State Week 10',-30,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.10','pregnancy.week.10.a','pregnancy.week.10.b','pregnancy.week.10.c',7),(7,'Pregnancy State Week 11',-29,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.11','pregnancy.week.11.a','pregnancy.week.11.b','pregnancy.week.11.c',8),(8,'Pregnancy State Week 12',-28,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.12','pregnancy.week.12.a','pregnancy.week.12.b','pregnancy.week.12.c',9),(9,'Pregnancy State Week 13',-27,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.13','pregnancy.week.13.a','pregnancy.week.13.b','pregnancy.week.13.c',10),(10,'Pregnancy State Week 14',-26,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.14','pregnancy.week.14.a','pregnancy.week.14.b','pregnancy.week.14.c',11),(11,'Pregnancy State Week 15',-25,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.15','pregnancy.week.15.a','pregnancy.week.15.b','pregnancy.week.15.c',12),(12,'Pregnancy State Week 16',-24,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.16','pregnancy.week.16.a','pregnancy.week.16.b','pregnancy.week.16.c',13),(13,'Pregnancy State Week 17',-23,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.17','pregnancy.week.17.a','pregnancy.week.17.b','pregnancy.week.17.c',14),(14,'Pregnancy State Week 18',-22,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.18','pregnancy.week.18.a','pregnancy.week.18.b','pregnancy.week.18.c',15),(15,'Pregnancy State Week 19',-21,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.19','pregnancy.week.19.a','pregnancy.week.19.b','pregnancy.week.19.c',16),(16,'Pregnancy State Week 20',-20,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.20','pregnancy.week.20.a','pregnancy.week.20.b','pregnancy.week.20.c',17),(17,'Pregnancy State Week 21',-19,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.21','pregnancy.week.21.a','pregnancy.week.21.b','pregnancy.week.21.c',18),(18,'Pregnancy State Week 22',-18,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.22','pregnancy.week.22.a','pregnancy.week.22.b','pregnancy.week.22.c',19),(19,'Pregnancy State Week 23',-17,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.23','pregnancy.week.23.a','pregnancy.week.23.b','pregnancy.week.23.c',20),(20,'Pregnancy State Week 24',-16,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.24','pregnancy.week.24.a','pregnancy.week.24.b','pregnancy.week.24.c',21),(21,'Pregnancy State Week 25',-15,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.25','pregnancy.week.25.a','pregnancy.week.25.b','pregnancy.week.25.c',22),(22,'Pregnancy State Week 26',-14,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.26','pregnancy.week.26.a','pregnancy.week.26.b','pregnancy.week.26.c',23),(23,'Pregnancy State Week 27',-13,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.27','pregnancy.week.27.a','pregnancy.week.27.b','pregnancy.week.27.c',24),(24,'Pregnancy State Week 28',-12,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.28','pregnancy.week.28.a','pregnancy.week.28.b','pregnancy.week.28.c',25),(25,'Pregnancy State Week 29',-11,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.29','pregnancy.week.29.a','pregnancy.week.29.b','pregnancy.week.29.c',26),(26,'Pregnancy State Week 30',-10,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.30','pregnancy.week.30.a','pregnancy.week.30.b','pregnancy.week.30.c',27),(27,'Pregnancy State Week 31',-9,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.31','pregnancy.week.31.a','pregnancy.week.31.b','pregnancy.week.31.c',28),(28,'Pregnancy State Week 32',-8,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.32','pregnancy.week.32.a','pregnancy.week.32.b','pregnancy.week.32.c',29),(29,'Pregnancy State Week 33',-7,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.33','pregnancy.week.33.a','pregnancy.week.33.b','pregnancy.week.33.c',30),(30,'Pregnancy State Week 34',-6,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.34','pregnancy.week.34.a','pregnancy.week.34.b','pregnancy.week.34.c',31),(31,'Pregnancy State Week 35',-5,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.35','pregnancy.week.35.a','pregnancy.week.35.b','pregnancy.week.35.c',32),(32,'Pregnancy State Week 36',-4,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.36','pregnancy.week.36.a','pregnancy.week.36.b','pregnancy.week.36.c',33),(33,'Pregnancy State Week 37',-3,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.37','pregnancy.week.37.a','pregnancy.week.37.b','pregnancy.week.37.c',34),(34,'Pregnancy State Week 38',-2,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.38','pregnancy.week.38.a','pregnancy.week.38.b','pregnancy.week.38.c',35),(35,'Pregnancy State Week 39',-1,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.39','pregnancy.week.39.a','pregnancy.week.39.b','pregnancy.week.39.c',36),(36,'Pregnancy State Week 40',0,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.40','pregnancy.week.40.a','pregnancy.week.40.b','pregnancy.week.40.c',37),(37,'Pregnancy State Week 41',1,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.1','child.week.1.a','child.week.1.b','child.week.1.c',38),(38,'Pregnancy State Week 42',2,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.2','child.week.2.a','child.week.2.b','child.week.2.c',39),(39,'Pregnancy State Week 43',3,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.3','child.week.3.a','child.week.3.b','child.week.3.c',40),(40,'Pregnancy State Week 44',4,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.4','child.week.4.a','child.week.4.b','child.week.4.c',41),(41,'End Pregnancy State Week 45',5,'week','enrollment_obs_datevalue',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(42,'Pregnancy State Week 5',-35,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.5','pregnancy.week.5.a','pregnancy.week.5.b','pregnancy.week.5.c',43),(43,'Pregnancy State Week 6',-34,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.6','pregnancy.week.6.a','pregnancy.week.6.b','pregnancy.week.6.c',44),(44,'Pregnancy State Week 7',-33,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.7','pregnancy.week.7.a','pregnancy.week.7.b','pregnancy.week.7.c',45),(45,'Pregnancy State Week 8',-32,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.8','pregnancy.week.8.a','pregnancy.week.8.b','pregnancy.week.8.c',46),(46,'Pregnancy State Week 9',-31,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.9','pregnancy.week.9.a','pregnancy.week.9.b','pregnancy.week.9.c',6),(47,'Pregnancy State Week 10',10,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.10','pregnancy.week.10.a','pregnancy.week.10.b','pregnancy.week.10.c',48),(48,'Pregnancy State Week 11',11,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.11','pregnancy.week.11.a','pregnancy.week.11.b','pregnancy.week.11.c',49),(49,'Pregnancy State Week 12',12,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.12','pregnancy.week.12.a','pregnancy.week.12.b','pregnancy.week.12.c',50),(50,'Pregnancy State Week 13',13,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.13','pregnancy.week.13.a','pregnancy.week.13.b','pregnancy.week.13.c',51),(51,'Pregnancy State Week 14',14,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.14','pregnancy.week.14.a','pregnancy.week.14.b','pregnancy.week.14.c',52),(52,'Pregnancy State Week 15',15,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.15','pregnancy.week.15.a','pregnancy.week.15.b','pregnancy.week.15.c',53),(53,'Pregnancy State Week 16',16,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.16','pregnancy.week.16.a','pregnancy.week.16.b','pregnancy.week.16.c',54),(54,'Pregnancy State Week 17',17,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.17','pregnancy.week.17.a','pregnancy.week.17.b','pregnancy.week.17.c',55),(55,'Pregnancy State Week 18',18,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.18','pregnancy.week.18.a','pregnancy.week.18.b','pregnancy.week.18.c',56),(56,'Pregnancy State Week 19',19,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.19','pregnancy.week.19.a','pregnancy.week.19.b','pregnancy.week.19.c',57),(57,'Pregnancy State Week 20',20,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.20','pregnancy.week.20.a','pregnancy.week.20.b','pregnancy.week.20.c',58),(58,'Pregnancy State Week 21',21,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.21','pregnancy.week.21.a','pregnancy.week.21.b','pregnancy.week.21.c',59),(59,'Pregnancy State Week 22',22,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.22','pregnancy.week.22.a','pregnancy.week.22.b','pregnancy.week.22.c',60),(60,'Pregnancy State Week 23',23,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.23','pregnancy.week.23.a','pregnancy.week.23.b','pregnancy.week.23.c',61),(61,'Pregnancy State Week 24',24,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.24','pregnancy.week.24.a','pregnancy.week.24.b','pregnancy.week.24.c',62),(62,'Pregnancy State Week 25',25,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.25','pregnancy.week.25.a','pregnancy.week.25.b','pregnancy.week.25.c',63),(63,'Pregnancy State Week 26',26,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.26','pregnancy.week.26.a','pregnancy.week.26.b','pregnancy.week.26.c',64),(64,'Pregnancy State Week 27',27,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.27','pregnancy.week.27.a','pregnancy.week.27.b','pregnancy.week.27.c',65),(65,'Pregnancy State Week 28',28,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.28','pregnancy.week.28.a','pregnancy.week.28.b','pregnancy.week.28.c',66),(66,'Pregnancy State Week 29',29,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.29','pregnancy.week.29.a','pregnancy.week.29.b','pregnancy.week.29.c',67),(67,'Pregnancy State Week 30',30,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.30','pregnancy.week.30.a','pregnancy.week.30.b','pregnancy.week.30.c',68),(68,'Pregnancy State Week 31',31,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.31','pregnancy.week.31.a','pregnancy.week.31.b','pregnancy.week.31.c',69),(69,'Pregnancy State Week 32',32,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.32','pregnancy.week.32.a','pregnancy.week.32.b','pregnancy.week.32.c',70),(70,'Pregnancy State Week 33',33,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.33','pregnancy.week.33.a','pregnancy.week.33.b','pregnancy.week.33.c',71),(71,'Pregnancy State Week 34',34,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.34','pregnancy.week.34.a','pregnancy.week.34.b','pregnancy.week.34.c',72),(72,'Pregnancy State Week 35',35,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.35','pregnancy.week.35.a','pregnancy.week.35.b','pregnancy.week.35.c',73),(73,'Pregnancy State Week 36',36,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.36','pregnancy.week.36.a','pregnancy.week.36.b','pregnancy.week.36.c',74),(74,'Pregnancy State Week 37',37,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.37','pregnancy.week.37.a','pregnancy.week.37.b','pregnancy.week.37.c',75),(75,'Pregnancy State Week 38',38,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.38','pregnancy.week.38.a','pregnancy.week.38.b','pregnancy.week.38.c',76),(76,'Pregnancy State Week 39',39,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.39','pregnancy.week.39.a','pregnancy.week.39.b','pregnancy.week.39.c',77),(77,'Pregnancy State Week 40',40,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.40','pregnancy.week.40.a','pregnancy.week.40.b','pregnancy.week.40.c',78),(78,'Pregnancy State Week 41',41,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.1','child.week.1.a','child.week.1.b','child.week.1.c',79),(79,'Pregnancy State Week 42',42,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.2','child.week.2.a','child.week.2.b','child.week.2.c',80),(80,'Pregnancy State Week 43',43,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.3','child.week.3.a','child.week.3.b','child.week.3.c',81),(81,'Pregnancy State Week 44',44,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.4','child.week.4.a','child.week.4.b','child.week.4.c',142),(82,'End Child Info State Week 52',93,'week','enrollment_obs_datevalue',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(83,'Pregnancy State Week 5',5,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.5','pregnancy.week.5.a','pregnancy.week.5.b','pregnancy.week.5.c',84),(84,'Pregnancy State Week 6',6,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.6','pregnancy.week.6.a','pregnancy.week.6.b','pregnancy.week.6.c',85),(85,'Pregnancy State Week 7',7,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.7','pregnancy.week.7.a','pregnancy.week.7.b','pregnancy.week.7.c',86),(86,'Pregnancy State Week 8',8,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.8','pregnancy.week.8.a','pregnancy.week.8.b','pregnancy.week.8.c',87),(87,'Pregnancy State Week 9',9,'week','enrollment_obs_datevalue',NULL,NULL,'pregnancy.week.9','pregnancy.week.9.a','pregnancy.week.9.b','pregnancy.week.9.c',47),(88,'Child Info State Week 1',1,'week','patient_birthdate',NULL,NULL,'child.week.1','child.week.1.a','child.week.1.b','child.week.1.c',89),(89,'Child Info State Week 2',2,'week','patient_birthdate',NULL,NULL,'child.week.2','child.week.2.a','child.week.2.b','child.week.2.c',90),(90,'Child Info State Week 3',3,'week','patient_birthdate',NULL,NULL,'child.week.3','child.week.3.a','child.week.3.b','child.week.3.c',91),(91,'Child Info State Week 4',4,'week','patient_birthdate',NULL,NULL,'child.week.4','child.week.4.a','child.week.4.b','child.week.4.c',92),(92,'Child Info State Week 5',5,'week','patient_birthdate',NULL,NULL,'child.week.5','child.week.5.a','child.week.5.b','child.week.5.c',93),(93,'Child Info State Week 6',6,'week','patient_birthdate',NULL,NULL,'child.week.6','child.week.6.a','child.week.6.b','child.week.6.c',94),(94,'Child Info State Week 7',7,'week','patient_birthdate',NULL,NULL,'child.week.7','child.week.7.a','child.week.7.b','child.week.7.c',95),(95,'Child Info State Week 8',8,'week','patient_birthdate',NULL,NULL,'child.week.8','child.week.8.a','child.week.8.b','child.week.8.c',96),(96,'Child Info State Week 9',9,'week','patient_birthdate',NULL,NULL,'child.week.9','child.week.9.a','child.week.9.b','child.week.9.c',97),(97,'Child Info State Week 10',10,'week','patient_birthdate',NULL,NULL,'child.week.10','child.week.10.a','child.week.10.b','child.week.10.c',98),(98,'Child Info State Week 11',11,'week','patient_birthdate',NULL,NULL,'child.week.11','child.week.11.a','child.week.11.b','child.week.11.c',99),(99,'Child Info State Week 12',12,'week','patient_birthdate',NULL,NULL,'child.week.12','child.week.12.a','child.week.12.b','child.week.12.c',100),(100,'Child Info State Week 13',13,'week','patient_birthdate',NULL,NULL,'child.week.13','child.week.13.a','child.week.13.b','child.week.13.c',101),(101,'Child Info State Week 14',14,'week','patient_birthdate',NULL,NULL,'child.week.14','child.week.14.a','child.week.14.b','child.week.14.c',102),(102,'Child Info State Week 15',15,'week','patient_birthdate',NULL,NULL,'child.week.15','child.week.15.a','child.week.15.b','child.week.15.c',103),(103,'Child Info State Week 16',16,'week','patient_birthdate',NULL,NULL,'child.week.16','child.week.16.a','child.week.16.b','child.week.16.c',104),(104,'Child Info State Week 17',17,'week','patient_birthdate',NULL,NULL,'child.week.17','child.week.17.a','child.week.17.b','child.week.17.c',105),(105,'Child Info State Week 18',18,'week','patient_birthdate',NULL,NULL,'child.week.18','child.week.18.a','child.week.18.b','child.week.18.c',106),(106,'Child Info State Week 19',19,'week','patient_birthdate',NULL,NULL,'child.week.19','child.week.19.a','child.week.19.b','child.week.19.c',107),(107,'Child Info State Week 20',20,'week','patient_birthdate',NULL,NULL,'child.week.20','child.week.20.a','child.week.20.b','child.week.20.c',108),(108,'Child Info State Week 21',21,'week','patient_birthdate',NULL,NULL,'child.week.21','child.week.21.a','child.week.21.b','child.week.21.c',109),(109,'Child Info State Week 22',22,'week','patient_birthdate',NULL,NULL,'child.week.22','child.week.22.a','child.week.22.b','child.week.22.c',110),(110,'Child Info State Week 23',23,'week','patient_birthdate',NULL,NULL,'child.week.23','child.week.23.a','child.week.23.b','child.week.23.c',111),(111,'Child Info State Week 24',24,'week','patient_birthdate',NULL,NULL,'child.week.24','child.week.24.a','child.week.24.b','child.week.24.c',112),(112,'Child Info State Week 25',25,'week','patient_birthdate',NULL,NULL,'child.week.25','child.week.25.a','child.week.25.b','child.week.25.c',113),(113,'Child Info State Week 26',26,'week','patient_birthdate',NULL,NULL,'child.week.26','child.week.26.a','child.week.26.b','child.week.26.c',114),(114,'Child Info State Week 27',27,'week','patient_birthdate',NULL,NULL,'child.week.27','child.week.27.a','child.week.27.b','child.week.27.c',115),(115,'Child Info State Week 28',28,'week','patient_birthdate',NULL,NULL,'child.week.28','child.week.28.a','child.week.28.b','child.week.28.c',116),(116,'Child Info State Week 29',29,'week','patient_birthdate',NULL,NULL,'child.week.29','child.week.29.a','child.week.29.b','child.week.29.c',117),(117,'Child Info State Week 30',30,'week','patient_birthdate',NULL,NULL,'child.week.30','child.week.30.a','child.week.30.b','child.week.30.c',118),(118,'Child Info State Week 31',31,'week','patient_birthdate',NULL,NULL,'child.week.31','child.week.31.a','child.week.31.b','child.week.31.c',119),(119,'Child Info State Week 32',32,'week','patient_birthdate',NULL,NULL,'child.week.32','child.week.32.a','child.week.32.b','child.week.32.c',120),(120,'Child Info State Week 33',33,'week','patient_birthdate',NULL,NULL,'child.week.33','child.week.33.a','child.week.33.b','child.week.33.c',121),(121,'Child Info State Week 34',34,'week','patient_birthdate',NULL,NULL,'child.week.34','child.week.34.a','child.week.34.b','child.week.34.c',122),(122,'Child Info State Week 35',35,'week','patient_birthdate',NULL,NULL,'child.week.35','child.week.35.a','child.week.35.b','child.week.35.c',123),(123,'Child Info State Week 36',36,'week','patient_birthdate',NULL,NULL,'child.week.36','child.week.36.a','child.week.36.b','child.week.36.c',124),(124,'Child Info State Week 37',37,'week','patient_birthdate',NULL,NULL,'child.week.37','child.week.37.a','child.week.37.b','child.week.37.c',125),(125,'Child Info State Week 38',38,'week','patient_birthdate',NULL,NULL,'child.week.38','child.week.38.a','child.week.38.b','child.week.38.c',126),(126,'Child Info State Week 39',39,'week','patient_birthdate',NULL,NULL,'child.week.39','child.week.39.a','child.week.39.b','child.week.39.c',127),(127,'Child Info State Week 40',40,'week','patient_birthdate',NULL,NULL,'child.week.40','child.week.40.a','child.week.40.b','child.week.40.c',128),(128,'Child Info State Week 41',41,'week','patient_birthdate',NULL,NULL,'child.week.41','child.week.41.a','child.week.41.b','child.week.41.c',129),(129,'Child Info State Week 42',42,'week','patient_birthdate',NULL,NULL,'child.week.42','child.week.42.a','child.week.42.b','child.week.42.c',130),(130,'Child Info State Week 43',43,'week','patient_birthdate',NULL,NULL,'child.week.43','child.week.43.a','child.week.43.b','child.week.43.c',131),(131,'Child Info State Week 44',44,'week','patient_birthdate',NULL,NULL,'child.week.44','child.week.44.a','child.week.44.b','child.week.44.c',132),(132,'Child Info State Week 45',45,'week','patient_birthdate',NULL,NULL,'child.week.45','child.week.45.a','child.week.45.b','child.week.45.c',133),(133,'Child Info State Week 46',46,'week','patient_birthdate',NULL,NULL,'child.week.46','child.week.46.a','child.week.46.b','child.week.46.c',134),(134,'Child Info State Week 47',47,'week','patient_birthdate',NULL,NULL,'child.week.47','child.week.47.a','child.week.47.b','child.week.47.c',135),(135,'Child Info State Week 48',48,'week','patient_birthdate',NULL,NULL,'child.week.48','child.week.48.a','child.week.48.b','child.week.48.c',136),(136,'Child Info State Week 49',49,'week','patient_birthdate',NULL,NULL,'child.week.49','child.week.49.a','child.week.49.b','child.week.49.c',137),(137,'Child Info State Week 50',50,'week','patient_birthdate',NULL,NULL,'child.week.50','child.week.50.a','child.week.50.b','child.week.50.c',138),(138,'Child Info State Week 51',51,'week','patient_birthdate',NULL,NULL,'child.week.51','child.week.51.a','child.week.51.b','child.week.51.c',139),(139,'Child Info State Week 52',52,'week','patient_birthdate',NULL,NULL,'child.week.52','child.week.52.a','child.week.52.b','child.week.52.c',140),(140,'End Child Info State Week 52',53,'week','patient_birthdate',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(142,'Child Info State Week 5',45,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.5','child.week.5.a','child.week.5.b','child.week.5.c',143),(143,'Child Info State Week 6',46,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.6','child.week.6.a','child.week.6.b','child.week.6.c',144),(144,'Child Info State Week 7',47,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.7','child.week.7.a','child.week.7.b','child.week.7.c',145),(145,'Child Info State Week 8',48,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.8','child.week.8.a','child.week.8.b','child.week.8.c',146),(146,'Child Info State Week 9',49,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.9','child.week.9.a','child.week.9.b','child.week.9.c',147),(147,'Child Info State Week 10',50,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.10','child.week.10.a','child.week.10.b','child.week.10.c',148),(148,'Child Info State Week 11',51,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.11','child.week.11.a','child.week.11.b','child.week.11.c',149),(149,'Child Info State Week 12',52,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.12','child.week.12.a','child.week.12.b','child.week.12.c',150),(150,'Child Info State Week 13',53,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.13','child.week.13.a','child.week.13.b','child.week.13.c',151),(151,'Child Info State Week 14',54,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.14','child.week.14.a','child.week.14.b','child.week.14.c',152),(152,'Child Info State Week 15',55,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.15','child.week.15.a','child.week.15.b','child.week.15.c',153),(153,'Child Info State Week 16',56,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.16','child.week.16.a','child.week.16.b','child.week.16.c',154),(154,'Child Info State Week 17',57,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.17','child.week.17.a','child.week.17.b','child.week.17.c',155),(155,'Child Info State Week 18',58,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.18','child.week.18.a','child.week.18.b','child.week.18.c',156),(156,'Child Info State Week 19',59,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.19','child.week.19.a','child.week.19.b','child.week.19.c',157),(157,'Child Info State Week 20',60,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.20','child.week.20.a','child.week.20.b','child.week.20.c',158),(158,'Child Info State Week 21',61,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.21','child.week.21.a','child.week.21.b','child.week.21.c',159),(159,'Child Info State Week 22',62,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.22','child.week.22.a','child.week.22.b','child.week.22.c',160),(160,'Child Info State Week 23',63,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.23','child.week.23.a','child.week.23.b','child.week.23.c',161),(161,'Child Info State Week 24',64,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.24','child.week.24.a','child.week.24.b','child.week.24.c',162),(162,'Child Info State Week 25',65,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.25','child.week.25.a','child.week.25.b','child.week.25.c',163),(163,'Child Info State Week 26',66,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.26','child.week.26.a','child.week.26.b','child.week.26.c',164),(164,'Child Info State Week 27',67,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.27','child.week.27.a','child.week.27.b','child.week.27.c',165),(165,'Child Info State Week 28',68,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.28','child.week.28.a','child.week.28.b','child.week.28.c',166),(166,'Child Info State Week 29',69,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.29','child.week.29.a','child.week.29.b','child.week.29.c',167),(167,'Child Info State Week 30',70,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.30','child.week.30.a','child.week.30.b','child.week.30.c',168),(168,'Child Info State Week 31',71,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.31','child.week.31.a','child.week.31.b','child.week.31.c',169),(169,'Child Info State Week 32',72,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.32','child.week.32.a','child.week.32.b','child.week.32.c',170),(170,'Child Info State Week 33',73,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.33','child.week.33.a','child.week.33.b','child.week.33.c',171),(171,'Child Info State Week 34',74,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.34','child.week.34.a','child.week.34.b','child.week.34.c',172),(172,'Child Info State Week 35',75,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.35','child.week.35.a','child.week.35.b','child.week.35.c',173),(173,'Child Info State Week 36',76,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.36','child.week.36.a','child.week.36.b','child.week.36.c',174),(174,'Child Info State Week 37',77,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.37','child.week.37.a','child.week.37.b','child.week.37.c',175),(175,'Child Info State Week 38',78,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.38','child.week.38.a','child.week.38.b','child.week.38.c',176),(176,'Child Info State Week 39',79,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.39','child.week.39.a','child.week.39.b','child.week.39.c',177),(177,'Child Info State Week 40',80,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.40','child.week.40.a','child.week.40.b','child.week.40.c',178),(178,'Child Info State Week 41',81,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.41','child.week.41.a','child.week.41.b','child.week.41.c',179),(179,'Child Info State Week 42',82,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.42','child.week.42.a','child.week.42.b','child.week.42.c',180),(180,'Child Info State Week 43',83,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.43','child.week.43.a','child.week.43.b','child.week.43.c',181),(181,'Child Info State Week 44',84,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.44','child.week.44.a','child.week.44.b','child.week.44.c',182),(182,'Child Info State Week 45',85,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.45','child.week.45.a','child.week.45.b','child.week.45.c',183),(183,'Child Info State Week 46',86,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.46','child.week.46.a','child.week.46.b','child.week.46.c',184),(184,'Child Info State Week 47',87,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.47','child.week.47.a','child.week.47.b','child.week.47.c',185),(185,'Child Info State Week 48',88,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.48','child.week.48.a','child.week.48.b','child.week.48.c',186),(186,'Child Info State Week 49',89,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.49','child.week.49.a','child.week.49.b','child.week.49.c',187),(187,'Child Info State Week 50',90,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.50','child.week.50.a','child.week.50.b','child.week.50.c',188),(188,'Child Info State Week 51',91,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.51','child.week.51.a','child.week.51.b','child.week.51.c',189),(189,'Child Info State Week 52',92,'week','enrollment_obs_datevalue',NULL,NULL,'child.week.52','child.week.52.a','child.week.52.b','child.week.52.c',82);
/*!40000 ALTER TABLE `motechmodule_message_program_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_message_program_state_transition`
--

DROP TABLE IF EXISTS `motechmodule_message_program_state_transition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_message_program_state_transition` (
  `motechmodule_message_program_state_transition_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `transition_type` varchar(20) DEFAULT NULL,
  `next_state` bigint(20) DEFAULT NULL,
  `prev_state` bigint(20) DEFAULT NULL,
  `parent_state` bigint(20) DEFAULT NULL,
  `time_value` int(10) DEFAULT NULL,
  `time_period` varchar(20) DEFAULT NULL,
  `expected_number` int(20) DEFAULT NULL,
  `transition_order` int(10) DEFAULT NULL,
  PRIMARY KEY (`motechmodule_message_program_state_transition_id`),
  KEY `fk_next_state` (`next_state`),
  KEY `fk_prev_state` (`prev_state`),
  KEY `fk_parent_state` (`parent_state`),
  CONSTRAINT `fk_next_state` FOREIGN KEY (`next_state`) REFERENCES `motechmodule_message_program_state` (`motechmodule_message_program_state_id`),
  CONSTRAINT `fk_prev_state` FOREIGN KEY (`prev_state`) REFERENCES `motechmodule_message_program_state` (`motechmodule_message_program_state_id`),
  CONSTRAINT `fk_parent_state` FOREIGN KEY (`parent_state`) REFERENCES `motechmodule_message_program_state` (`motechmodule_message_program_state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=376 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_message_program_state_transition`
--

LOCK TABLES `motechmodule_message_program_state_transition` WRITE;
/*!40000 ALTER TABLE `motechmodule_message_program_state_transition` DISABLE KEYS */;
INSERT INTO `motechmodule_message_program_state_transition` VALUES (10,'DATE',11,10,10,-2,'day',NULL,0),(11,'DEFAULT',10,10,10,NULL,NULL,NULL,1),(12,'DATE',12,11,11,-2,'day',NULL,0),(13,'DEFAULT',11,11,11,NULL,NULL,NULL,1),(14,'DATE',13,12,12,-2,'day',NULL,0),(15,'DEFAULT',12,12,12,NULL,NULL,NULL,1),(16,'DATE',14,13,13,-2,'day',NULL,0),(17,'DEFAULT',13,13,13,NULL,NULL,NULL,1),(18,'DATE',15,14,14,-2,'day',NULL,0),(19,'DEFAULT',14,14,14,NULL,NULL,NULL,1),(20,'DATE',16,15,15,-2,'day',NULL,0),(21,'DEFAULT',15,15,15,NULL,NULL,NULL,1),(22,'DATE',17,16,16,-2,'day',NULL,0),(23,'DEFAULT',16,16,16,NULL,NULL,NULL,1),(24,'DATE',18,17,17,-2,'day',NULL,0),(25,'DEFAULT',17,17,17,NULL,NULL,NULL,1),(26,'DATE',19,18,18,-2,'day',NULL,0),(27,'DEFAULT',18,18,18,NULL,NULL,NULL,1),(28,'DATE',20,19,19,-2,'day',NULL,0),(29,'DEFAULT',19,19,19,NULL,NULL,NULL,1),(30,'DATE',21,20,20,-2,'day',NULL,0),(31,'DEFAULT',20,20,20,NULL,NULL,NULL,1),(32,'DATE',22,21,21,-2,'day',NULL,0),(33,'DEFAULT',21,21,21,NULL,NULL,NULL,1),(34,'DATE',23,22,22,-2,'day',NULL,0),(35,'DEFAULT',22,22,22,NULL,NULL,NULL,1),(36,'DATE',24,23,23,-2,'day',NULL,0),(37,'DEFAULT',23,23,23,NULL,NULL,NULL,1),(38,'DATE',25,24,24,-2,'day',NULL,0),(39,'DEFAULT',24,24,24,NULL,NULL,NULL,1),(40,'DATE',26,25,25,-2,'day',NULL,0),(41,'DEFAULT',25,25,25,NULL,NULL,NULL,1),(42,'DATE',27,26,26,-2,'day',NULL,0),(43,'DEFAULT',26,26,26,NULL,NULL,NULL,1),(44,'DATE',28,27,27,-2,'day',NULL,0),(45,'DEFAULT',27,27,27,NULL,NULL,NULL,1),(46,'DATE',29,28,28,-2,'day',NULL,0),(47,'DEFAULT',28,28,28,NULL,NULL,NULL,1),(48,'DATE',30,29,29,-2,'day',NULL,0),(49,'DEFAULT',29,29,29,NULL,NULL,NULL,1),(50,'DATE',31,30,30,-2,'day',NULL,0),(51,'DEFAULT',30,30,30,NULL,NULL,NULL,1),(52,'DATE',32,31,31,-2,'day',NULL,0),(53,'DEFAULT',31,31,31,NULL,NULL,NULL,1),(54,'DATE',33,32,32,-2,'day',NULL,0),(55,'DEFAULT',32,32,32,NULL,NULL,NULL,1),(56,'DATE',34,33,33,-2,'day',NULL,0),(57,'DEFAULT',33,33,33,NULL,NULL,NULL,1),(58,'DATE',35,34,34,-2,'day',NULL,0),(59,'DEFAULT',34,34,34,NULL,NULL,NULL,1),(60,'DATE',36,35,35,-2,'day',NULL,0),(61,'DEFAULT',35,35,35,NULL,NULL,NULL,1),(62,'DATE',37,36,36,-2,'day',NULL,0),(63,'DEFAULT',36,36,36,NULL,NULL,NULL,1),(64,'DATE',38,37,37,-2,'day',NULL,0),(65,'DEFAULT',37,37,37,NULL,NULL,NULL,1),(66,'DATE',39,38,38,-2,'day',NULL,0),(67,'DEFAULT',38,38,38,NULL,NULL,NULL,1),(68,'DATE',40,39,39,-2,'day',NULL,0),(69,'DEFAULT',39,39,39,NULL,NULL,NULL,1),(70,'DATE',41,40,40,-2,'day',NULL,0),(71,'DEFAULT',40,40,40,NULL,NULL,NULL,1),(72,'DEFAULT',41,41,41,NULL,NULL,NULL,0),(73,'DATE',43,42,42,-2,'day',NULL,0),(74,'DEFAULT',42,42,42,NULL,NULL,NULL,1),(75,'DATE',44,43,43,-2,'day',NULL,0),(76,'DEFAULT',43,43,43,NULL,NULL,NULL,1),(77,'DATE',45,44,44,-2,'day',NULL,0),(78,'DEFAULT',44,44,44,NULL,NULL,NULL,1),(79,'DATE',46,45,45,-2,'day',NULL,0),(80,'DEFAULT',45,45,45,NULL,NULL,NULL,1),(81,'DATE',6,46,46,-2,'day',NULL,0),(82,'DEFAULT',46,46,46,NULL,NULL,NULL,1),(83,'DATE',7,6,6,-2,'day',NULL,0),(84,'DEFAULT',6,6,6,NULL,NULL,NULL,1),(85,'DATE',8,7,7,-2,'day',NULL,0),(86,'DEFAULT',7,7,7,NULL,NULL,NULL,1),(87,'DATE',9,8,8,-2,'day',NULL,0),(88,'DEFAULT',8,8,8,NULL,NULL,NULL,1),(89,'DATE',10,9,9,-2,'day',NULL,0),(90,'DEFAULT',9,9,9,NULL,NULL,NULL,1),(91,'DATE',48,47,47,-2,'day',NULL,0),(92,'DEFAULT',47,47,47,NULL,NULL,NULL,1),(93,'DATE',49,48,48,-2,'day',NULL,0),(94,'DEFAULT',48,48,48,NULL,NULL,NULL,1),(95,'DATE',50,49,49,-2,'day',NULL,0),(96,'DEFAULT',49,49,49,NULL,NULL,NULL,1),(97,'DATE',51,50,50,-2,'day',NULL,0),(98,'DEFAULT',50,50,50,NULL,NULL,NULL,1),(99,'DATE',52,51,51,-2,'day',NULL,0),(100,'DEFAULT',51,51,51,NULL,NULL,NULL,1),(101,'DATE',53,52,52,-2,'day',NULL,0),(102,'DEFAULT',52,52,52,NULL,NULL,NULL,1),(103,'DATE',54,53,53,-2,'day',NULL,0),(104,'DEFAULT',53,53,53,NULL,NULL,NULL,1),(105,'DATE',55,54,54,-2,'day',NULL,0),(106,'DEFAULT',54,54,54,NULL,NULL,NULL,1),(107,'DATE',56,55,55,-2,'day',NULL,0),(108,'DEFAULT',55,55,55,NULL,NULL,NULL,1),(109,'DATE',57,56,56,-2,'day',NULL,0),(110,'DEFAULT',56,56,56,NULL,NULL,NULL,1),(111,'DATE',58,57,57,-2,'day',NULL,0),(112,'DEFAULT',57,57,57,NULL,NULL,NULL,1),(113,'DATE',59,58,58,-2,'day',NULL,0),(114,'DEFAULT',58,58,58,NULL,NULL,NULL,1),(115,'DATE',60,59,59,-2,'day',NULL,0),(116,'DEFAULT',59,59,59,NULL,NULL,NULL,1),(117,'DATE',61,60,60,-2,'day',NULL,0),(118,'DEFAULT',60,60,60,NULL,NULL,NULL,1),(119,'DATE',62,61,61,-2,'day',NULL,0),(120,'DEFAULT',61,61,61,NULL,NULL,NULL,1),(121,'DATE',63,62,62,-2,'day',NULL,0),(122,'DEFAULT',62,62,62,NULL,NULL,NULL,1),(123,'DATE',64,63,63,-2,'day',NULL,0),(124,'DEFAULT',63,63,63,NULL,NULL,NULL,1),(125,'DATE',65,64,64,-2,'day',NULL,0),(126,'DEFAULT',64,64,64,NULL,NULL,NULL,1),(127,'DATE',66,65,65,-2,'day',NULL,0),(128,'DEFAULT',65,65,65,NULL,NULL,NULL,1),(129,'DATE',67,66,66,-2,'day',NULL,0),(130,'DEFAULT',66,66,66,NULL,NULL,NULL,1),(131,'DATE',68,67,67,-2,'day',NULL,0),(132,'DEFAULT',67,67,67,NULL,NULL,NULL,1),(133,'DATE',69,68,68,-2,'day',NULL,0),(134,'DEFAULT',68,68,68,NULL,NULL,NULL,1),(135,'DATE',70,69,69,-2,'day',NULL,0),(136,'DEFAULT',69,69,69,NULL,NULL,NULL,1),(137,'DATE',71,70,70,-2,'day',NULL,0),(138,'DEFAULT',70,70,70,NULL,NULL,NULL,1),(139,'DATE',72,71,71,-2,'day',NULL,0),(140,'DEFAULT',71,71,71,NULL,NULL,NULL,1),(141,'DATE',73,72,72,-2,'day',NULL,0),(142,'DEFAULT',72,72,72,NULL,NULL,NULL,1),(143,'DATE',74,73,73,-2,'day',NULL,0),(144,'DEFAULT',73,73,73,NULL,NULL,NULL,1),(145,'DATE',75,74,74,-2,'day',NULL,0),(146,'DEFAULT',74,74,74,NULL,NULL,NULL,1),(147,'DATE',76,75,75,-2,'day',NULL,0),(148,'DEFAULT',75,75,75,NULL,NULL,NULL,1),(149,'DATE',77,76,76,-2,'day',NULL,0),(150,'DEFAULT',76,76,76,NULL,NULL,NULL,1),(151,'DATE',78,77,77,-2,'day',NULL,0),(152,'DEFAULT',77,77,77,NULL,NULL,NULL,1),(153,'DATE',79,78,78,-2,'day',NULL,0),(154,'DEFAULT',78,78,78,NULL,NULL,NULL,1),(155,'DATE',80,79,79,-2,'day',NULL,0),(156,'DEFAULT',79,79,79,NULL,NULL,NULL,1),(157,'DATE',81,80,80,-2,'day',NULL,0),(158,'DEFAULT',80,80,80,NULL,NULL,NULL,1),(159,'DATE',142,81,81,-2,'day',NULL,0),(160,'DEFAULT',81,81,81,NULL,NULL,NULL,1),(161,'DEFAULT',82,82,82,NULL,NULL,NULL,0),(162,'DATE',84,83,83,-2,'day',NULL,0),(163,'DEFAULT',83,83,83,NULL,NULL,NULL,1),(164,'DATE',85,84,84,-2,'day',NULL,0),(165,'DEFAULT',84,84,84,NULL,NULL,NULL,1),(166,'DATE',86,85,85,-2,'day',NULL,0),(167,'DEFAULT',85,85,85,NULL,NULL,NULL,1),(168,'DATE',87,86,86,-2,'day',NULL,0),(169,'DEFAULT',86,86,86,NULL,NULL,NULL,1),(170,'DATE',47,87,87,-2,'day',NULL,0),(171,'DEFAULT',87,87,87,NULL,NULL,NULL,1),(172,'DATE',89,88,88,-2,'day',NULL,0),(173,'DEFAULT',88,88,88,NULL,NULL,NULL,1),(174,'DATE',90,89,89,-2,'day',NULL,0),(175,'DEFAULT',89,89,89,NULL,NULL,NULL,1),(176,'DATE',91,90,90,-2,'day',NULL,0),(177,'DEFAULT',90,90,90,NULL,NULL,NULL,1),(178,'DATE',92,91,91,-2,'day',NULL,0),(179,'DEFAULT',91,91,91,NULL,NULL,NULL,1),(180,'DATE',93,92,92,-2,'day',NULL,0),(181,'DEFAULT',92,92,92,NULL,NULL,NULL,1),(182,'DATE',94,93,93,-2,'day',NULL,0),(183,'DEFAULT',93,93,93,NULL,NULL,NULL,1),(184,'DATE',95,94,94,-2,'day',NULL,0),(185,'DEFAULT',94,94,94,NULL,NULL,NULL,1),(186,'DATE',96,95,95,-2,'day',NULL,0),(187,'DEFAULT',95,95,95,NULL,NULL,NULL,1),(188,'DATE',97,96,96,-2,'day',NULL,0),(189,'DEFAULT',96,96,96,NULL,NULL,NULL,1),(190,'DATE',98,97,97,-2,'day',NULL,0),(191,'DEFAULT',97,97,97,NULL,NULL,NULL,1),(192,'DATE',99,98,98,-2,'day',NULL,0),(193,'DEFAULT',98,98,98,NULL,NULL,NULL,1),(194,'DATE',100,99,99,-2,'day',NULL,0),(195,'DEFAULT',99,99,99,NULL,NULL,NULL,1),(196,'DATE',101,100,100,-2,'day',NULL,0),(197,'DEFAULT',100,100,100,NULL,NULL,NULL,1),(198,'DATE',102,101,101,-2,'day',NULL,0),(199,'DEFAULT',101,101,101,NULL,NULL,NULL,1),(200,'DATE',103,102,102,-2,'day',NULL,0),(201,'DEFAULT',102,102,102,NULL,NULL,NULL,1),(202,'DATE',104,103,103,-2,'day',NULL,0),(203,'DEFAULT',103,103,103,NULL,NULL,NULL,1),(204,'DATE',105,104,104,-2,'day',NULL,0),(205,'DEFAULT',104,104,104,NULL,NULL,NULL,1),(206,'DATE',106,105,105,-2,'day',NULL,0),(207,'DEFAULT',105,105,105,NULL,NULL,NULL,1),(208,'DATE',107,106,106,-2,'day',NULL,0),(209,'DEFAULT',106,106,106,NULL,NULL,NULL,1),(210,'DATE',108,107,107,-2,'day',NULL,0),(211,'DEFAULT',107,107,107,NULL,NULL,NULL,1),(212,'DATE',109,108,108,-2,'day',NULL,0),(213,'DEFAULT',108,108,108,NULL,NULL,NULL,1),(214,'DATE',110,109,109,-2,'day',NULL,0),(215,'DEFAULT',109,109,109,NULL,NULL,NULL,1),(216,'DATE',111,110,110,-2,'day',NULL,0),(217,'DEFAULT',110,110,110,NULL,NULL,NULL,1),(218,'DATE',112,111,111,-2,'day',NULL,0),(219,'DEFAULT',111,111,111,NULL,NULL,NULL,1),(220,'DATE',113,112,112,-2,'day',NULL,0),(221,'DEFAULT',112,112,112,NULL,NULL,NULL,1),(222,'DATE',114,113,113,-2,'day',NULL,0),(223,'DEFAULT',113,113,113,NULL,NULL,NULL,1),(224,'DATE',115,114,114,-2,'day',NULL,0),(225,'DEFAULT',114,114,114,NULL,NULL,NULL,1),(226,'DATE',116,115,115,-2,'day',NULL,0),(227,'DEFAULT',115,115,115,NULL,NULL,NULL,1),(228,'DATE',117,116,116,-2,'day',NULL,0),(229,'DEFAULT',116,116,116,NULL,NULL,NULL,1),(230,'DATE',118,117,117,-2,'day',NULL,0),(231,'DEFAULT',117,117,117,NULL,NULL,NULL,1),(232,'DATE',119,118,118,-2,'day',NULL,0),(233,'DEFAULT',118,118,118,NULL,NULL,NULL,1),(234,'DATE',120,119,119,-2,'day',NULL,0),(235,'DEFAULT',119,119,119,NULL,NULL,NULL,1),(236,'DATE',121,120,120,-2,'day',NULL,0),(237,'DEFAULT',120,120,120,NULL,NULL,NULL,1),(238,'DATE',122,121,121,-2,'day',NULL,0),(239,'DEFAULT',121,121,121,NULL,NULL,NULL,1),(240,'DATE',123,122,122,-2,'day',NULL,0),(241,'DEFAULT',122,122,122,NULL,NULL,NULL,1),(242,'DATE',124,123,123,-2,'day',NULL,0),(243,'DEFAULT',123,123,123,NULL,NULL,NULL,1),(244,'DATE',125,124,124,-2,'day',NULL,0),(245,'DEFAULT',124,124,124,NULL,NULL,NULL,1),(246,'DATE',126,125,125,-2,'day',NULL,0),(247,'DEFAULT',125,125,125,NULL,NULL,NULL,1),(248,'DATE',127,126,126,-2,'day',NULL,0),(249,'DEFAULT',126,126,126,NULL,NULL,NULL,1),(250,'DATE',128,127,127,-2,'day',NULL,0),(251,'DEFAULT',127,127,127,NULL,NULL,NULL,1),(252,'DATE',129,128,128,-2,'day',NULL,0),(253,'DEFAULT',128,128,128,NULL,NULL,NULL,1),(254,'DATE',130,129,129,-2,'day',NULL,0),(255,'DEFAULT',129,129,129,NULL,NULL,NULL,1),(256,'DATE',131,130,130,-2,'day',NULL,0),(257,'DEFAULT',130,130,130,NULL,NULL,NULL,1),(258,'DATE',132,131,131,-2,'day',NULL,0),(259,'DEFAULT',131,131,131,NULL,NULL,NULL,1),(260,'DATE',133,132,132,-2,'day',NULL,0),(261,'DEFAULT',132,132,132,NULL,NULL,NULL,1),(262,'DATE',134,133,133,-2,'day',NULL,0),(263,'DEFAULT',133,133,133,NULL,NULL,NULL,1),(264,'DATE',135,134,134,-2,'day',NULL,0),(265,'DEFAULT',134,134,134,NULL,NULL,NULL,1),(266,'DATE',136,135,135,-2,'day',NULL,0),(267,'DEFAULT',135,135,135,NULL,NULL,NULL,1),(268,'DATE',137,136,136,-2,'day',NULL,0),(269,'DEFAULT',136,136,136,NULL,NULL,NULL,1),(270,'DATE',138,137,137,-2,'day',NULL,0),(271,'DEFAULT',137,137,137,NULL,NULL,NULL,1),(272,'DATE',139,138,138,-2,'day',NULL,0),(273,'DEFAULT',138,138,138,NULL,NULL,NULL,1),(274,'DEFAULT',139,139,139,NULL,NULL,NULL,1),(275,'DATE',140,139,139,-2,'day',NULL,0),(276,'DEFAULT',140,140,140,NULL,NULL,NULL,0),(280,'DATE',143,142,142,-2,'day',NULL,0),(281,'DEFAULT',142,142,142,NULL,NULL,NULL,1),(282,'DATE',144,143,143,-2,'day',NULL,0),(283,'DEFAULT',143,143,143,NULL,NULL,NULL,1),(284,'DATE',145,144,144,-2,'day',NULL,0),(285,'DEFAULT',144,144,144,NULL,NULL,NULL,1),(286,'DATE',146,145,145,-2,'day',NULL,0),(287,'DEFAULT',145,145,145,NULL,NULL,NULL,1),(288,'DATE',147,146,146,-2,'day',NULL,0),(289,'DEFAULT',146,146,146,NULL,NULL,NULL,1),(290,'DATE',148,147,147,-2,'day',NULL,0),(291,'DEFAULT',147,147,147,NULL,NULL,NULL,1),(292,'DATE',149,148,148,-2,'day',NULL,0),(293,'DEFAULT',148,148,148,NULL,NULL,NULL,1),(294,'DATE',150,149,149,-2,'day',NULL,0),(295,'DEFAULT',149,149,149,NULL,NULL,NULL,1),(296,'DATE',151,150,150,-2,'day',NULL,0),(297,'DEFAULT',150,150,150,NULL,NULL,NULL,1),(298,'DATE',152,151,151,-2,'day',NULL,0),(299,'DEFAULT',151,151,151,NULL,NULL,NULL,1),(300,'DATE',153,152,152,-2,'day',NULL,0),(301,'DEFAULT',152,152,152,NULL,NULL,NULL,1),(302,'DATE',154,153,153,-2,'day',NULL,0),(303,'DEFAULT',153,153,153,NULL,NULL,NULL,1),(304,'DATE',155,154,154,-2,'day',NULL,0),(305,'DEFAULT',154,154,154,NULL,NULL,NULL,1),(306,'DATE',156,155,155,-2,'day',NULL,0),(307,'DEFAULT',155,155,155,NULL,NULL,NULL,1),(308,'DATE',157,156,156,-2,'day',NULL,0),(309,'DEFAULT',156,156,156,NULL,NULL,NULL,1),(310,'DATE',158,157,157,-2,'day',NULL,0),(311,'DEFAULT',157,157,157,NULL,NULL,NULL,1),(312,'DATE',159,158,158,-2,'day',NULL,0),(313,'DEFAULT',158,158,158,NULL,NULL,NULL,1),(314,'DATE',160,159,159,-2,'day',NULL,0),(315,'DEFAULT',159,159,159,NULL,NULL,NULL,1),(316,'DATE',161,160,160,-2,'day',NULL,0),(317,'DEFAULT',160,160,160,NULL,NULL,NULL,1),(318,'DATE',162,161,161,-2,'day',NULL,0),(319,'DEFAULT',161,161,161,NULL,NULL,NULL,1),(320,'DATE',163,162,162,-2,'day',NULL,0),(321,'DEFAULT',162,162,162,NULL,NULL,NULL,1),(322,'DATE',164,163,163,-2,'day',NULL,0),(323,'DEFAULT',163,163,163,NULL,NULL,NULL,1),(324,'DATE',165,164,164,-2,'day',NULL,0),(325,'DEFAULT',164,164,164,NULL,NULL,NULL,1),(326,'DATE',166,165,165,-2,'day',NULL,0),(327,'DEFAULT',165,165,165,NULL,NULL,NULL,1),(328,'DATE',167,166,166,-2,'day',NULL,0),(329,'DEFAULT',166,166,166,NULL,NULL,NULL,1),(330,'DATE',168,167,167,-2,'day',NULL,0),(331,'DEFAULT',167,167,167,NULL,NULL,NULL,1),(332,'DATE',169,168,168,-2,'day',NULL,0),(333,'DEFAULT',168,168,168,NULL,NULL,NULL,1),(334,'DATE',170,169,169,-2,'day',NULL,0),(335,'DEFAULT',169,169,169,NULL,NULL,NULL,1),(336,'DATE',171,170,170,-2,'day',NULL,0),(337,'DEFAULT',170,170,170,NULL,NULL,NULL,1),(338,'DATE',172,171,171,-2,'day',NULL,0),(339,'DEFAULT',171,171,171,NULL,NULL,NULL,1),(340,'DATE',173,172,172,-2,'day',NULL,0),(341,'DEFAULT',172,172,172,NULL,NULL,NULL,1),(342,'DATE',174,173,173,-2,'day',NULL,0),(343,'DEFAULT',173,173,173,NULL,NULL,NULL,1),(344,'DATE',175,174,174,-2,'day',NULL,0),(345,'DEFAULT',174,174,174,NULL,NULL,NULL,1),(346,'DATE',176,175,175,-2,'day',NULL,0),(347,'DEFAULT',175,175,175,NULL,NULL,NULL,1),(348,'DATE',177,176,176,-2,'day',NULL,0),(349,'DEFAULT',176,176,176,NULL,NULL,NULL,1),(350,'DATE',178,177,177,-2,'day',NULL,0),(351,'DEFAULT',177,177,177,NULL,NULL,NULL,1),(352,'DATE',179,178,178,-2,'day',NULL,0),(353,'DEFAULT',178,178,178,NULL,NULL,NULL,1),(354,'DATE',180,179,179,-2,'day',NULL,0),(355,'DEFAULT',179,179,179,NULL,NULL,NULL,1),(356,'DATE',181,180,180,-2,'day',NULL,0),(357,'DEFAULT',180,180,180,NULL,NULL,NULL,1),(358,'DATE',182,181,181,-2,'day',NULL,0),(359,'DEFAULT',181,181,181,NULL,NULL,NULL,1),(360,'DATE',183,182,182,-2,'day',NULL,0),(361,'DEFAULT',182,182,182,NULL,NULL,NULL,1),(362,'DATE',184,183,183,-2,'day',NULL,0),(363,'DEFAULT',183,183,183,NULL,NULL,NULL,1),(364,'DATE',185,184,184,-2,'day',NULL,0),(365,'DEFAULT',184,184,184,NULL,NULL,NULL,1),(366,'DATE',186,185,185,-2,'day',NULL,0),(367,'DEFAULT',185,185,185,NULL,NULL,NULL,1),(368,'DATE',187,186,186,-2,'day',NULL,0),(369,'DEFAULT',186,186,186,NULL,NULL,NULL,1),(370,'DATE',188,187,187,-2,'day',NULL,0),(371,'DEFAULT',187,187,187,NULL,NULL,NULL,1),(372,'DATE',189,188,188,-2,'day',NULL,0),(373,'DEFAULT',188,188,188,NULL,NULL,NULL,1),(374,'DATE',82,189,189,-2,'day',NULL,0),(375,'DEFAULT',189,189,189,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `motechmodule_message_program_state_transition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_messageattribute`
--

DROP TABLE IF EXISTS `motechmodule_messageattribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_messageattribute` (
  `motechmodule_messageattribute_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `attribute_name` varchar(255) NOT NULL,
  `attribute_property` varchar(255) NOT NULL,
  PRIMARY KEY (`motechmodule_messageattribute_id`),
  UNIQUE KEY `attribute_name` (`attribute_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_messageattribute`
--

LOCK TABLES `motechmodule_messageattribute` WRITE;
/*!40000 ALTER TABLE `motechmodule_messageattribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_messageattribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_messagedefinition`
--

DROP TABLE IF EXISTS `motechmodule_messagedefinition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_messagedefinition` (
  `motechmodule_messagedefinition_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message_key` varchar(255) NOT NULL,
  `public_id` bigint(20) NOT NULL,
  `message_type` varchar(13) NOT NULL,
  PRIMARY KEY (`motechmodule_messagedefinition_id`),
  UNIQUE KEY `message_key` (`message_key`),
  UNIQUE KEY `public_id` (`public_id`)
) ENGINE=InnoDB AUTO_INCREMENT=409 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_messagedefinition`
--

LOCK TABLES `motechmodule_messagedefinition` WRITE;
/*!40000 ALTER TABLE `motechmodule_messagedefinition` DISABLE KEYS */;
INSERT INTO `motechmodule_messagedefinition` VALUES (1,'tetanus.info.1',2,'INFORMATIONAL'),(2,'tetanus.info.2',3,'INFORMATIONAL'),(3,'tetanus.info.3',5,'INFORMATIONAL'),(4,'tetanus.info.4',6,'INFORMATIONAL'),(5,'tetanus.1.prompt',4,'REMINDER'),(6,'tetanus.1.reminder.1',7,'REMINDER'),(7,'tetanus.1.reminder.2',8,'REMINDER'),(8,'tetanus.2.prompt',9,'REMINDER'),(9,'tetanus.2.reminder.1',10,'REMINDER'),(10,'tetanus.2.reminder.2',11,'REMINDER'),(11,'pregnancy.week.5',18,'INFORMATIONAL'),(12,'pregnancy.week.6',19,'INFORMATIONAL'),(13,'pregnancy.week.7',20,'INFORMATIONAL'),(14,'pregnancy.week.8',21,'INFORMATIONAL'),(15,'pregnancy.week.9',22,'INFORMATIONAL'),(16,'pregnancy.week.10',23,'INFORMATIONAL'),(17,'pregnancy.week.11',24,'INFORMATIONAL'),(18,'pregnancy.week.12',25,'INFORMATIONAL'),(19,'pregnancy.week.13',26,'INFORMATIONAL'),(20,'pregnancy.week.14',27,'INFORMATIONAL'),(21,'pregnancy.week.15',28,'INFORMATIONAL'),(22,'pregnancy.week.16',29,'INFORMATIONAL'),(23,'pregnancy.week.17',30,'INFORMATIONAL'),(24,'pregnancy.week.18',31,'INFORMATIONAL'),(25,'pregnancy.week.19',32,'INFORMATIONAL'),(26,'pregnancy.week.20',33,'INFORMATIONAL'),(27,'pregnancy.week.21',34,'INFORMATIONAL'),(28,'pregnancy.week.22',35,'INFORMATIONAL'),(29,'pregnancy.week.23',36,'INFORMATIONAL'),(30,'pregnancy.week.24',37,'INFORMATIONAL'),(31,'pregnancy.week.25',38,'INFORMATIONAL'),(32,'pregnancy.week.26',39,'INFORMATIONAL'),(33,'pregnancy.week.27',40,'INFORMATIONAL'),(34,'pregnancy.week.28',41,'INFORMATIONAL'),(35,'pregnancy.week.29',42,'INFORMATIONAL'),(36,'pregnancy.week.30',43,'INFORMATIONAL'),(37,'pregnancy.week.31',44,'INFORMATIONAL'),(38,'pregnancy.week.32',45,'INFORMATIONAL'),(39,'pregnancy.week.33',46,'INFORMATIONAL'),(40,'pregnancy.week.34',47,'INFORMATIONAL'),(41,'pregnancy.week.35',48,'INFORMATIONAL'),(42,'pregnancy.week.36',49,'INFORMATIONAL'),(43,'pregnancy.week.37',50,'INFORMATIONAL'),(44,'pregnancy.week.38',51,'INFORMATIONAL'),(45,'pregnancy.week.39',52,'INFORMATIONAL'),(46,'pregnancy.week.40',53,'INFORMATIONAL'),(47,'child.week.1',54,'INFORMATIONAL'),(48,'child.week.2',55,'INFORMATIONAL'),(49,'child.week.3',56,'INFORMATIONAL'),(50,'child.week.4',57,'INFORMATIONAL'),(51,'demo.minute.1',58,'INFORMATIONAL'),(52,'demo.minute.2',59,'INFORMATIONAL'),(53,'demo.minute.3',60,'INFORMATIONAL'),(54,'demo.minute.4',61,'INFORMATIONAL'),(55,'demo.minute.5',62,'INFORMATIONAL'),(56,'demo.minute.6',63,'INFORMATIONAL'),(57,'demo.minute.7',64,'INFORMATIONAL'),(58,'demo.minute.8',65,'INFORMATIONAL'),(59,'demo.minute.9',66,'INFORMATIONAL'),(60,'demo.minute.10',67,'INFORMATIONAL'),(61,'demo.minute.11',68,'INFORMATIONAL'),(62,'demo.minute.12',69,'INFORMATIONAL'),(63,'demo.minute.13',70,'INFORMATIONAL'),(64,'demo.minute.14',71,'INFORMATIONAL'),(65,'demo.minute.15',72,'INFORMATIONAL'),(66,'demo.minute.16',73,'INFORMATIONAL'),(67,'demo.minute.17',74,'INFORMATIONAL'),(68,'demo.minute.18',75,'INFORMATIONAL'),(69,'demo.minute.19',76,'INFORMATIONAL'),(70,'demo.minute.20',77,'INFORMATIONAL'),(71,'tt.upcoming',78,'REMINDER'),(72,'tt.overdue',79,'REMINDER'),(73,'ipt.upcoming',80,'REMINDER'),(74,'ipt.overdue',81,'REMINDER'),(75,'anc.upcoming',82,'REMINDER'),(76,'anc.overdue',83,'REMINDER'),(77,'pnc.mother.upcoming',84,'REMINDER'),(78,'pnc.mother.overdue',85,'REMINDER'),(79,'pnc.baby.upcoming',86,'REMINDER'),(80,'pnc.baby.overdue',87,'REMINDER'),(81,'bcg.upcoming',88,'REMINDER'),(82,'bcg.overdue',89,'REMINDER'),(83,'opv.upcoming',90,'REMINDER'),(84,'opv.overdue',91,'REMINDER'),(85,'penta.upcoming',92,'REMINDER'),(86,'penta.overdue',93,'REMINDER'),(87,'ipti.upcoming',94,'REMINDER'),(88,'ipti.overdue',95,'REMINDER'),(89,'yellowfever.upcoming',96,'REMINDER'),(90,'yellowfever.overdue',97,'REMINDER'),(91,'measles.upcoming',98,'REMINDER'),(92,'measles.overdue',99,'REMINDER'),(93,'vitamina.upcoming',100,'REMINDER'),(94,'vitamina.overdue',101,'REMINDER'),(95,'pregnancy.notification',102,'INFORMATIONAL'),(96,'pregnancy.week.5.a',104,'INFORMATIONAL'),(97,'pregnancy.week.5.b',105,'INFORMATIONAL'),(98,'pregnancy.week.5.c',106,'INFORMATIONAL'),(99,'pregnancy.week.6.a',107,'INFORMATIONAL'),(100,'pregnancy.week.6.b',108,'INFORMATIONAL'),(101,'pregnancy.week.6.c',109,'INFORMATIONAL'),(102,'pregnancy.week.7.a',110,'INFORMATIONAL'),(103,'pregnancy.week.7.b',111,'INFORMATIONAL'),(104,'pregnancy.week.7.c',112,'INFORMATIONAL'),(105,'pregnancy.week.8.a',113,'INFORMATIONAL'),(106,'pregnancy.week.8.b',114,'INFORMATIONAL'),(107,'pregnancy.week.8.c',115,'INFORMATIONAL'),(108,'pregnancy.week.9.a',116,'INFORMATIONAL'),(109,'pregnancy.week.9.b',117,'INFORMATIONAL'),(110,'pregnancy.week.9.c',118,'INFORMATIONAL'),(111,'pregnancy.week.10.a',119,'INFORMATIONAL'),(112,'pregnancy.week.10.b',120,'INFORMATIONAL'),(113,'pregnancy.week.10.c',121,'INFORMATIONAL'),(114,'pregnancy.week.11.a',122,'INFORMATIONAL'),(115,'pregnancy.week.11.b',123,'INFORMATIONAL'),(116,'pregnancy.week.11.c',124,'INFORMATIONAL'),(117,'pregnancy.week.12.a',125,'INFORMATIONAL'),(118,'pregnancy.week.12.b',126,'INFORMATIONAL'),(119,'pregnancy.week.12.c',127,'INFORMATIONAL'),(120,'pregnancy.week.13.a',128,'INFORMATIONAL'),(121,'pregnancy.week.13.b',129,'INFORMATIONAL'),(122,'pregnancy.week.13.c',130,'INFORMATIONAL'),(123,'pregnancy.week.14.a',131,'INFORMATIONAL'),(124,'pregnancy.week.14.b',132,'INFORMATIONAL'),(125,'pregnancy.week.14.c',133,'INFORMATIONAL'),(126,'pregnancy.week.15.a',134,'INFORMATIONAL'),(127,'pregnancy.week.15.b',135,'INFORMATIONAL'),(128,'pregnancy.week.15.c',136,'INFORMATIONAL'),(129,'pregnancy.week.16.a',137,'INFORMATIONAL'),(130,'pregnancy.week.16.b',138,'INFORMATIONAL'),(131,'pregnancy.week.16.c',139,'INFORMATIONAL'),(132,'pregnancy.week.17.a',140,'INFORMATIONAL'),(133,'pregnancy.week.17.b',141,'INFORMATIONAL'),(134,'pregnancy.week.17.c',142,'INFORMATIONAL'),(135,'pregnancy.week.18.a',143,'INFORMATIONAL'),(136,'pregnancy.week.18.b',144,'INFORMATIONAL'),(137,'pregnancy.week.18.c',145,'INFORMATIONAL'),(138,'pregnancy.week.19.a',146,'INFORMATIONAL'),(139,'pregnancy.week.19.b',147,'INFORMATIONAL'),(140,'pregnancy.week.19.c',148,'INFORMATIONAL'),(141,'pregnancy.week.20.a',149,'INFORMATIONAL'),(142,'pregnancy.week.20.b',150,'INFORMATIONAL'),(143,'pregnancy.week.20.c',151,'INFORMATIONAL'),(144,'pregnancy.week.21.a',152,'INFORMATIONAL'),(145,'pregnancy.week.21.b',153,'INFORMATIONAL'),(146,'pregnancy.week.21.c',154,'INFORMATIONAL'),(147,'pregnancy.week.22.a',155,'INFORMATIONAL'),(148,'pregnancy.week.22.b',156,'INFORMATIONAL'),(149,'pregnancy.week.22.c',157,'INFORMATIONAL'),(150,'pregnancy.week.23.a',158,'INFORMATIONAL'),(151,'pregnancy.week.23.b',159,'INFORMATIONAL'),(152,'pregnancy.week.23.c',160,'INFORMATIONAL'),(153,'pregnancy.week.24.a',161,'INFORMATIONAL'),(154,'pregnancy.week.24.b',162,'INFORMATIONAL'),(155,'pregnancy.week.24.c',163,'INFORMATIONAL'),(156,'pregnancy.week.25.a',164,'INFORMATIONAL'),(157,'pregnancy.week.25.b',165,'INFORMATIONAL'),(158,'pregnancy.week.25.c',166,'INFORMATIONAL'),(159,'pregnancy.week.26.a',167,'INFORMATIONAL'),(160,'pregnancy.week.26.b',168,'INFORMATIONAL'),(161,'pregnancy.week.26.c',169,'INFORMATIONAL'),(162,'pregnancy.week.27.a',170,'INFORMATIONAL'),(163,'pregnancy.week.27.b',171,'INFORMATIONAL'),(164,'pregnancy.week.27.c',172,'INFORMATIONAL'),(165,'pregnancy.week.28.a',173,'INFORMATIONAL'),(166,'pregnancy.week.28.b',174,'INFORMATIONAL'),(167,'pregnancy.week.28.c',175,'INFORMATIONAL'),(168,'pregnancy.week.29.a',176,'INFORMATIONAL'),(169,'pregnancy.week.29.b',177,'INFORMATIONAL'),(170,'pregnancy.week.29.c',178,'INFORMATIONAL'),(171,'pregnancy.week.30.a',179,'INFORMATIONAL'),(172,'pregnancy.week.30.b',180,'INFORMATIONAL'),(173,'pregnancy.week.30.c',181,'INFORMATIONAL'),(174,'pregnancy.week.31.a',182,'INFORMATIONAL'),(175,'pregnancy.week.31.b',183,'INFORMATIONAL'),(176,'pregnancy.week.31.c',184,'INFORMATIONAL'),(177,'pregnancy.week.32.a',185,'INFORMATIONAL'),(178,'pregnancy.week.32.b',186,'INFORMATIONAL'),(179,'pregnancy.week.32.c',187,'INFORMATIONAL'),(180,'pregnancy.week.33.a',188,'INFORMATIONAL'),(181,'pregnancy.week.33.b',189,'INFORMATIONAL'),(182,'pregnancy.week.33.c',190,'INFORMATIONAL'),(183,'pregnancy.week.34.a',191,'INFORMATIONAL'),(184,'pregnancy.week.34.b',192,'INFORMATIONAL'),(185,'pregnancy.week.34.c',193,'INFORMATIONAL'),(186,'pregnancy.week.35.a',194,'INFORMATIONAL'),(187,'pregnancy.week.35.b',195,'INFORMATIONAL'),(188,'pregnancy.week.35.c',196,'INFORMATIONAL'),(189,'pregnancy.week.36.a',197,'INFORMATIONAL'),(190,'pregnancy.week.36.b',198,'INFORMATIONAL'),(191,'pregnancy.week.36.c',199,'INFORMATIONAL'),(192,'pregnancy.week.37.a',200,'INFORMATIONAL'),(193,'pregnancy.week.37.b',201,'INFORMATIONAL'),(194,'pregnancy.week.37.c',202,'INFORMATIONAL'),(195,'pregnancy.week.38.a',203,'INFORMATIONAL'),(196,'pregnancy.week.38.b',204,'INFORMATIONAL'),(197,'pregnancy.week.38.c',205,'INFORMATIONAL'),(198,'pregnancy.week.39.a',206,'INFORMATIONAL'),(199,'pregnancy.week.39.b',207,'INFORMATIONAL'),(200,'pregnancy.week.39.c',208,'INFORMATIONAL'),(201,'pregnancy.week.40.a',209,'INFORMATIONAL'),(202,'pregnancy.week.40.b',210,'INFORMATIONAL'),(203,'pregnancy.week.40.c',211,'INFORMATIONAL'),(204,'child.week.1.a',212,'INFORMATIONAL'),(205,'child.week.1.b',213,'INFORMATIONAL'),(206,'child.week.1.c',214,'INFORMATIONAL'),(207,'child.week.2.a',215,'INFORMATIONAL'),(208,'child.week.2.b',216,'INFORMATIONAL'),(209,'child.week.2.c',217,'INFORMATIONAL'),(210,'child.week.3.a',218,'INFORMATIONAL'),(211,'child.week.3.b',219,'INFORMATIONAL'),(212,'child.week.3.c',220,'INFORMATIONAL'),(213,'child.week.4.a',221,'INFORMATIONAL'),(214,'child.week.4.b',222,'INFORMATIONAL'),(215,'child.week.4.c',223,'INFORMATIONAL'),(216,'child.week.5',224,'INFORMATIONAL'),(217,'child.week.6',225,'INFORMATIONAL'),(218,'child.week.7',226,'INFORMATIONAL'),(219,'child.week.8',227,'INFORMATIONAL'),(220,'child.week.9',228,'INFORMATIONAL'),(221,'child.week.10',229,'INFORMATIONAL'),(222,'child.week.11',230,'INFORMATIONAL'),(223,'child.week.12',231,'INFORMATIONAL'),(224,'child.week.13',232,'INFORMATIONAL'),(225,'child.week.14',233,'INFORMATIONAL'),(226,'child.week.15',234,'INFORMATIONAL'),(227,'child.week.16',235,'INFORMATIONAL'),(228,'child.week.17',236,'INFORMATIONAL'),(229,'child.week.18',237,'INFORMATIONAL'),(230,'child.week.19',238,'INFORMATIONAL'),(231,'child.week.20',239,'INFORMATIONAL'),(232,'child.week.21',240,'INFORMATIONAL'),(233,'child.week.22',241,'INFORMATIONAL'),(234,'child.week.23',242,'INFORMATIONAL'),(235,'child.week.24',243,'INFORMATIONAL'),(236,'child.week.25',244,'INFORMATIONAL'),(237,'child.week.26',245,'INFORMATIONAL'),(238,'child.week.27',246,'INFORMATIONAL'),(239,'child.week.28',247,'INFORMATIONAL'),(240,'child.week.29',248,'INFORMATIONAL'),(241,'child.week.30',249,'INFORMATIONAL'),(242,'child.week.31',250,'INFORMATIONAL'),(243,'child.week.32',251,'INFORMATIONAL'),(244,'child.week.33',252,'INFORMATIONAL'),(245,'child.week.34',253,'INFORMATIONAL'),(246,'child.week.35',254,'INFORMATIONAL'),(247,'child.week.36',255,'INFORMATIONAL'),(248,'child.week.37',256,'INFORMATIONAL'),(249,'child.week.38',257,'INFORMATIONAL'),(250,'child.week.39',258,'INFORMATIONAL'),(251,'child.week.40',259,'INFORMATIONAL'),(252,'child.week.41',260,'INFORMATIONAL'),(253,'child.week.42',261,'INFORMATIONAL'),(254,'child.week.43',262,'INFORMATIONAL'),(255,'child.week.44',263,'INFORMATIONAL'),(256,'child.week.45',264,'INFORMATIONAL'),(257,'child.week.46',265,'INFORMATIONAL'),(258,'child.week.47',266,'INFORMATIONAL'),(259,'child.week.48',267,'INFORMATIONAL'),(260,'child.week.49',268,'INFORMATIONAL'),(261,'child.week.50',269,'INFORMATIONAL'),(262,'child.week.51',270,'INFORMATIONAL'),(263,'child.week.52',271,'INFORMATIONAL'),(264,'child.week.5.a',272,'INFORMATIONAL'),(265,'child.week.5.b',273,'INFORMATIONAL'),(266,'child.week.5.c',274,'INFORMATIONAL'),(267,'child.week.6.a',275,'INFORMATIONAL'),(268,'child.week.6.b',276,'INFORMATIONAL'),(269,'child.week.6.c',277,'INFORMATIONAL'),(270,'child.week.7.a',278,'INFORMATIONAL'),(271,'child.week.7.b',279,'INFORMATIONAL'),(272,'child.week.7.c',280,'INFORMATIONAL'),(273,'child.week.8.a',281,'INFORMATIONAL'),(274,'child.week.8.b',282,'INFORMATIONAL'),(275,'child.week.8.c',283,'INFORMATIONAL'),(276,'child.week.9.a',284,'INFORMATIONAL'),(277,'child.week.9.b',285,'INFORMATIONAL'),(278,'child.week.9.c',286,'INFORMATIONAL'),(279,'child.week.10.a',287,'INFORMATIONAL'),(280,'child.week.10.b',288,'INFORMATIONAL'),(281,'child.week.10.c',289,'INFORMATIONAL'),(282,'child.week.11.a',290,'INFORMATIONAL'),(283,'child.week.11.b',291,'INFORMATIONAL'),(284,'child.week.11.c',292,'INFORMATIONAL'),(285,'child.week.12.a',293,'INFORMATIONAL'),(286,'child.week.12.b',294,'INFORMATIONAL'),(287,'child.week.12.c',295,'INFORMATIONAL'),(288,'child.week.13.a',296,'INFORMATIONAL'),(289,'child.week.13.b',297,'INFORMATIONAL'),(290,'child.week.13.c',298,'INFORMATIONAL'),(291,'child.week.14.a',299,'INFORMATIONAL'),(292,'child.week.14.b',300,'INFORMATIONAL'),(293,'child.week.14.c',301,'INFORMATIONAL'),(294,'child.week.15.a',302,'INFORMATIONAL'),(295,'child.week.15.b',303,'INFORMATIONAL'),(296,'child.week.15.c',304,'INFORMATIONAL'),(297,'child.week.16.a',305,'INFORMATIONAL'),(298,'child.week.16.b',306,'INFORMATIONAL'),(299,'child.week.16.c',307,'INFORMATIONAL'),(300,'child.week.17.a',308,'INFORMATIONAL'),(301,'child.week.17.b',309,'INFORMATIONAL'),(302,'child.week.17.c',310,'INFORMATIONAL'),(303,'child.week.18.a',311,'INFORMATIONAL'),(304,'child.week.18.b',312,'INFORMATIONAL'),(305,'child.week.18.c',313,'INFORMATIONAL'),(306,'child.week.19.a',314,'INFORMATIONAL'),(307,'child.week.19.b',315,'INFORMATIONAL'),(308,'child.week.19.c',316,'INFORMATIONAL'),(309,'child.week.20.a',317,'INFORMATIONAL'),(310,'child.week.20.b',318,'INFORMATIONAL'),(311,'child.week.20.c',319,'INFORMATIONAL'),(312,'child.week.21.a',320,'INFORMATIONAL'),(313,'child.week.21.b',321,'INFORMATIONAL'),(314,'child.week.21.c',322,'INFORMATIONAL'),(315,'child.week.22.a',323,'INFORMATIONAL'),(316,'child.week.22.b',324,'INFORMATIONAL'),(317,'child.week.22.c',325,'INFORMATIONAL'),(318,'child.week.23.a',326,'INFORMATIONAL'),(319,'child.week.23.b',327,'INFORMATIONAL'),(320,'child.week.23.c',328,'INFORMATIONAL'),(321,'child.week.24.a',329,'INFORMATIONAL'),(322,'child.week.24.b',330,'INFORMATIONAL'),(323,'child.week.24.c',331,'INFORMATIONAL'),(324,'child.week.25.a',332,'INFORMATIONAL'),(325,'child.week.25.b',333,'INFORMATIONAL'),(326,'child.week.25.c',334,'INFORMATIONAL'),(327,'child.week.26.a',335,'INFORMATIONAL'),(328,'child.week.26.b',336,'INFORMATIONAL'),(329,'child.week.26.c',337,'INFORMATIONAL'),(330,'child.week.27.a',338,'INFORMATIONAL'),(331,'child.week.27.b',339,'INFORMATIONAL'),(332,'child.week.27.c',340,'INFORMATIONAL'),(333,'child.week.28.a',341,'INFORMATIONAL'),(334,'child.week.28.b',342,'INFORMATIONAL'),(335,'child.week.28.c',343,'INFORMATIONAL'),(336,'child.week.29.a',344,'INFORMATIONAL'),(337,'child.week.29.b',345,'INFORMATIONAL'),(338,'child.week.29.c',346,'INFORMATIONAL'),(339,'child.week.30.a',347,'INFORMATIONAL'),(340,'child.week.30.b',348,'INFORMATIONAL'),(341,'child.week.30.c',349,'INFORMATIONAL'),(342,'child.week.31.a',350,'INFORMATIONAL'),(343,'child.week.31.b',351,'INFORMATIONAL'),(344,'child.week.31.c',352,'INFORMATIONAL'),(345,'child.week.32.a',353,'INFORMATIONAL'),(346,'child.week.32.b',354,'INFORMATIONAL'),(347,'child.week.32.c',355,'INFORMATIONAL'),(348,'child.week.33.a',356,'INFORMATIONAL'),(349,'child.week.33.b',357,'INFORMATIONAL'),(350,'child.week.33.c',358,'INFORMATIONAL'),(351,'child.week.34.a',359,'INFORMATIONAL'),(352,'child.week.34.b',360,'INFORMATIONAL'),(353,'child.week.34.c',361,'INFORMATIONAL'),(354,'child.week.35.a',362,'INFORMATIONAL'),(355,'child.week.35.b',363,'INFORMATIONAL'),(356,'child.week.35.c',364,'INFORMATIONAL'),(357,'child.week.36.a',365,'INFORMATIONAL'),(358,'child.week.36.b',366,'INFORMATIONAL'),(359,'child.week.36.c',367,'INFORMATIONAL'),(360,'child.week.37.a',368,'INFORMATIONAL'),(361,'child.week.37.b',369,'INFORMATIONAL'),(362,'child.week.37.c',370,'INFORMATIONAL'),(363,'child.week.38.a',371,'INFORMATIONAL'),(364,'child.week.38.b',372,'INFORMATIONAL'),(365,'child.week.38.c',373,'INFORMATIONAL'),(366,'child.week.39.a',374,'INFORMATIONAL'),(367,'child.week.39.b',375,'INFORMATIONAL'),(368,'child.week.39.c',376,'INFORMATIONAL'),(369,'child.week.40.a',377,'INFORMATIONAL'),(370,'child.week.40.b',378,'INFORMATIONAL'),(371,'child.week.40.c',379,'INFORMATIONAL'),(372,'child.week.41.a',380,'INFORMATIONAL'),(373,'child.week.41.b',381,'INFORMATIONAL'),(374,'child.week.41.c',382,'INFORMATIONAL'),(375,'child.week.42.a',383,'INFORMATIONAL'),(376,'child.week.42.b',384,'INFORMATIONAL'),(377,'child.week.42.c',385,'INFORMATIONAL'),(378,'child.week.43.a',386,'INFORMATIONAL'),(379,'child.week.43.b',387,'INFORMATIONAL'),(380,'child.week.43.c',388,'INFORMATIONAL'),(381,'child.week.44.a',389,'INFORMATIONAL'),(382,'child.week.44.b',390,'INFORMATIONAL'),(383,'child.week.44.c',391,'INFORMATIONAL'),(384,'child.week.45.a',392,'INFORMATIONAL'),(385,'child.week.45.b',393,'INFORMATIONAL'),(386,'child.week.45.c',394,'INFORMATIONAL'),(387,'child.week.46.a',395,'INFORMATIONAL'),(388,'child.week.46.b',396,'INFORMATIONAL'),(389,'child.week.46.c',397,'INFORMATIONAL'),(390,'child.week.47.a',398,'INFORMATIONAL'),(391,'child.week.47.b',399,'INFORMATIONAL'),(392,'child.week.47.c',400,'INFORMATIONAL'),(393,'child.week.48.a',401,'INFORMATIONAL'),(394,'child.week.48.b',402,'INFORMATIONAL'),(395,'child.week.48.c',403,'INFORMATIONAL'),(396,'child.week.49.a',404,'INFORMATIONAL'),(397,'child.week.49.b',405,'INFORMATIONAL'),(398,'child.week.49.c',406,'INFORMATIONAL'),(399,'child.week.50.a',407,'INFORMATIONAL'),(400,'child.week.50.b',408,'INFORMATIONAL'),(401,'child.week.50.c',409,'INFORMATIONAL'),(402,'child.week.51.a',410,'INFORMATIONAL'),(403,'child.week.51.b',411,'INFORMATIONAL'),(404,'child.week.51.c',412,'INFORMATIONAL'),(405,'child.week.52.a',413,'INFORMATIONAL'),(406,'child.week.52.b',414,'INFORMATIONAL'),(407,'child.week.52.c',415,'INFORMATIONAL'),(408,'pregnancy.notification.for.patient.with.no.community',416,'INFORMATIONAL');
/*!40000 ALTER TABLE `motechmodule_messagedefinition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_messagedefinition_attribute`
--

DROP TABLE IF EXISTS `motechmodule_messagedefinition_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_messagedefinition_attribute` (
  `definition_id` bigint(20) NOT NULL,
  `attribute_id` bigint(20) NOT NULL,
  KEY `definition_of_attributes` (`definition_id`),
  KEY `attribute_of_definitions` (`attribute_id`),
  CONSTRAINT `definition_of_attributes` FOREIGN KEY (`definition_id`) REFERENCES `motechmodule_messagedefinition` (`motechmodule_messagedefinition_id`),
  CONSTRAINT `attribute_of_definitions` FOREIGN KEY (`attribute_id`) REFERENCES `motechmodule_messageattribute` (`motechmodule_messageattribute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_messagedefinition_attribute`
--

LOCK TABLES `motechmodule_messagedefinition_attribute` WRITE;
/*!40000 ALTER TABLE `motechmodule_messagedefinition_attribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_messagedefinition_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_rct_assignment`
--

DROP TABLE IF EXISTS `motechmodule_rct_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_rct_assignment` (
  `assignment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `stratum_id` bigint(20) NOT NULL,
  `assignment_num` int(11) NOT NULL,
  `assignment` char(1) NOT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `fk_assignment_to_stratum` (`stratum_id`),
  CONSTRAINT `fk_assignment_to_stratum` FOREIGN KEY (`stratum_id`) REFERENCES `motechmodule_rct_stratum` (`stratum_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_rct_assignment`
--

LOCK TABLES `motechmodule_rct_assignment` WRITE;
/*!40000 ALTER TABLE `motechmodule_rct_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_rct_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_rct_facility`
--

DROP TABLE IF EXISTS `motechmodule_rct_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_rct_facility` (
  `rct_facility_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `facility_id` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`rct_facility_id`),
  KEY `fk_to_rct_facility` (`facility_id`),
  CONSTRAINT `fk_to_rct_facility` FOREIGN KEY (`facility_id`) REFERENCES `motechmodule_facility` (`facility_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_rct_facility`
--

LOCK TABLES `motechmodule_rct_facility` WRITE;
/*!40000 ALTER TABLE `motechmodule_rct_facility` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_rct_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_rct_patient`
--

DROP TABLE IF EXISTS `motechmodule_rct_patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_rct_patient` (
  `rct_patient_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `study_id` varchar(20) NOT NULL,
  `stratum_id` bigint(20) NOT NULL,
  `assignment` char(1) NOT NULL,
  `date_enrolled` datetime NOT NULL,
  `enrolled_by` int(11) NOT NULL,
  `enrolled` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`rct_patient_id`),
  UNIQUE KEY `study_id` (`study_id`),
  KEY `fk_patient_to_stratum` (`stratum_id`),
  KEY `fk_patient_to_user` (`enrolled_by`),
  CONSTRAINT `fk_patient_to_stratum` FOREIGN KEY (`stratum_id`) REFERENCES `motechmodule_rct_stratum` (`stratum_id`),
  CONSTRAINT `fk_patient_to_user` FOREIGN KEY (`enrolled_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_rct_patient`
--

LOCK TABLES `motechmodule_rct_patient` WRITE;
/*!40000 ALTER TABLE `motechmodule_rct_patient` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_rct_patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_rct_stratum`
--

DROP TABLE IF EXISTS `motechmodule_rct_stratum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_rct_stratum` (
  `stratum_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rct_facility_id` bigint(20) NOT NULL,
  `pregnancy_trimester` varchar(10) NOT NULL,
  `phone_ownership` varchar(20) NOT NULL,
  `size` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `next_assignment` int(11) NOT NULL,
  PRIMARY KEY (`stratum_id`),
  KEY `fk_stratum_to_rct_facility` (`rct_facility_id`),
  CONSTRAINT `fk_stratum_to_rct_facility` FOREIGN KEY (`rct_facility_id`) REFERENCES `motechmodule_rct_facility` (`rct_facility_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_rct_stratum`
--

LOCK TABLES `motechmodule_rct_stratum` WRITE;
/*!40000 ALTER TABLE `motechmodule_rct_stratum` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_rct_stratum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_scheduledmessage`
--

DROP TABLE IF EXISTS `motechmodule_scheduledmessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_scheduledmessage` (
  `motechmodule_scheduledmessage_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `scheduled_for` datetime NOT NULL,
  `definition_id` bigint(20) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `enrollment_id` bigint(20) NOT NULL,
  `care_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`motechmodule_scheduledmessage_id`),
  KEY `person_id_for_recipient` (`recipient_id`),
  KEY `definition_of_scheduledmessage` (`definition_id`),
  KEY `enrollment_of_scheduledmessage` (`enrollment_id`),
  CONSTRAINT `person_id_for_recipient` FOREIGN KEY (`recipient_id`) REFERENCES `person` (`person_id`),
  CONSTRAINT `definition_of_scheduledmessage` FOREIGN KEY (`definition_id`) REFERENCES `motechmodule_messagedefinition` (`motechmodule_messagedefinition_id`),
  CONSTRAINT `enrollment_of_scheduledmessage` FOREIGN KEY (`enrollment_id`) REFERENCES `motechmodule_enrollment` (`motechmodule_enrollment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_scheduledmessage`
--

LOCK TABLES `motechmodule_scheduledmessage` WRITE;
/*!40000 ALTER TABLE `motechmodule_scheduledmessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_scheduledmessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_troubledphone`
--

DROP TABLE IF EXISTS `motechmodule_troubledphone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_troubledphone` (
  `motechmodule_tphone_id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(50) NOT NULL,
  `creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `send_failures` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`motechmodule_tphone_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_troubledphone`
--

LOCK TABLES `motechmodule_troubledphone` WRITE;
/*!40000 ALTER TABLE `motechmodule_troubledphone` DISABLE KEYS */;
/*!40000 ALTER TABLE `motechmodule_troubledphone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_url`
--

DROP TABLE IF EXISTS `motechmodule_url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_url` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message_key` varchar(20) NOT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `message_key` (`message_key`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_url`
--

LOCK TABLES `motechmodule_url` WRITE;
/*!40000 ALTER TABLE `motechmodule_url` DISABLE KEYS */;
INSERT INTO `motechmodule_url` VALUES (1,'SUPPORT','http://localhost/openmrs/module/motechmodule/support.form');
/*!40000 ALTER TABLE `motechmodule_url` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motechmodule_user_type`
--

DROP TABLE IF EXISTS `motechmodule_user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motechmodule_user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(50) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motechmodule_user_type`
--

LOCK TABLES `motechmodule_user_type` WRITE;
/*!40000 ALTER TABLE `motechmodule_user_type` DISABLE KEYS */;
INSERT INTO `motechmodule_user_type` VALUES (1,'CHO','Community Health Operator'),(2,'CHN','Community Health Nurse'),(3,'Midwife','Takes care of deliveries'),(4,'HEW',''),(5,'CHV','Community Health Volunteer'),(6,'HPO','Health Promotion Officer'),(7,'Field Agent','MoTeCH Field Agent');
/*!40000 ALTER TABLE `motechmodule_user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `note` (
  `note_id` int(11) NOT NULL DEFAULT '0',
  `note_type` varchar(50) DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `obs_id` int(11) DEFAULT NULL,
  `encounter_id` int(11) DEFAULT NULL,
  `text` text NOT NULL,
  `priority` int(11) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`note_id`),
  UNIQUE KEY `note_uuid_index` (`uuid`),
  KEY `user_who_changed_note` (`changed_by`),
  KEY `user_who_created_note` (`creator`),
  KEY `encounter_note` (`encounter_id`),
  KEY `obs_note` (`obs_id`),
  KEY `note_hierarchy` (`parent`),
  KEY `patient_note` (`patient_id`),
  CONSTRAINT `encounter_note` FOREIGN KEY (`encounter_id`) REFERENCES `encounter` (`encounter_id`),
  CONSTRAINT `note_hierarchy` FOREIGN KEY (`parent`) REFERENCES `note` (`note_id`),
  CONSTRAINT `obs_note` FOREIGN KEY (`obs_id`) REFERENCES `obs` (`obs_id`),
  CONSTRAINT `patient_note` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON UPDATE CASCADE,
  CONSTRAINT `user_who_changed_note` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_created_note` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_alert`
--

DROP TABLE IF EXISTS `notification_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_alert` (
  `alert_id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(512) NOT NULL,
  `satisfied_by_any` int(11) NOT NULL DEFAULT '0',
  `alert_read` int(11) NOT NULL DEFAULT '0',
  `date_to_expire` datetime DEFAULT NULL,
  `creator` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`alert_id`),
  UNIQUE KEY `notification_alert_uuid_index` (`uuid`),
  KEY `user_who_changed_alert` (`changed_by`),
  KEY `alert_creator` (`creator`),
  CONSTRAINT `alert_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_changed_alert` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_alert`
--

LOCK TABLES `notification_alert` WRITE;
/*!40000 ALTER TABLE `notification_alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_alert_recipient`
--

DROP TABLE IF EXISTS `notification_alert_recipient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_alert_recipient` (
  `alert_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `alert_read` int(11) NOT NULL DEFAULT '0',
  `date_changed` datetime DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`alert_id`,`user_id`),
  KEY `alert_read_by_user` (`user_id`),
  CONSTRAINT `alert_read_by_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `id_of_alert` FOREIGN KEY (`alert_id`) REFERENCES `notification_alert` (`alert_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_alert_recipient`
--

LOCK TABLES `notification_alert_recipient` WRITE;
/*!40000 ALTER TABLE `notification_alert_recipient` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_alert_recipient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_template`
--

DROP TABLE IF EXISTS `notification_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_template` (
  `template_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `template` text,
  `subject` varchar(100) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `recipients` varchar(512) DEFAULT NULL,
  `ordinal` int(11) DEFAULT '0',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`template_id`),
  UNIQUE KEY `notification_template_uuid_index` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_template`
--

LOCK TABLES `notification_template` WRITE;
/*!40000 ALTER TABLE `notification_template` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obs`
--

DROP TABLE IF EXISTS `obs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `obs` (
  `obs_id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `encounter_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `obs_datetime` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `location_id` int(11) DEFAULT NULL,
  `obs_group_id` int(11) DEFAULT NULL,
  `accession_number` varchar(255) DEFAULT NULL,
  `value_group_id` int(11) DEFAULT NULL,
  `value_boolean` tinyint(4) DEFAULT NULL,
  `value_coded` int(11) DEFAULT NULL,
  `value_coded_name_id` int(11) DEFAULT NULL,
  `value_drug` int(11) DEFAULT NULL,
  `value_datetime` datetime DEFAULT NULL,
  `value_numeric` double DEFAULT NULL,
  `value_modifier` varchar(2) DEFAULT NULL,
  `value_text` text,
  `date_started` datetime DEFAULT NULL,
  `date_stopped` datetime DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `value_complex` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`obs_id`),
  UNIQUE KEY `obs_uuid_index` (`uuid`),
  KEY `obs_concept` (`concept_id`),
  KEY `obs_enterer` (`creator`),
  KEY `encounter_observations` (`encounter_id`),
  KEY `obs_location` (`location_id`),
  KEY `obs_grouping_id` (`obs_group_id`),
  KEY `obs_order` (`order_id`),
  KEY `person_obs` (`person_id`),
  KEY `answer_concept` (`value_coded`),
  KEY `obs_name_of_coded_value` (`value_coded_name_id`),
  KEY `answer_concept_drug` (`value_drug`),
  KEY `user_who_voided_obs` (`voided_by`),
  KEY `obs_datetime_idx` (`obs_datetime`),
  CONSTRAINT `answer_concept` FOREIGN KEY (`value_coded`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `answer_concept_drug` FOREIGN KEY (`value_drug`) REFERENCES `drug` (`drug_id`),
  CONSTRAINT `encounter_observations` FOREIGN KEY (`encounter_id`) REFERENCES `encounter` (`encounter_id`),
  CONSTRAINT `obs_concept` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `obs_enterer` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `obs_grouping_id` FOREIGN KEY (`obs_group_id`) REFERENCES `obs` (`obs_id`),
  CONSTRAINT `obs_location` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`),
  CONSTRAINT `obs_name_of_coded_value` FOREIGN KEY (`value_coded_name_id`) REFERENCES `concept_name` (`concept_name_id`),
  CONSTRAINT `obs_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `person_obs` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`) ON UPDATE CASCADE,
  CONSTRAINT `user_who_voided_obs` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obs`
--

LOCK TABLES `obs` WRITE;
/*!40000 ALTER TABLE `obs` DISABLE KEYS */;
/*!40000 ALTER TABLE `obs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_type`
--

DROP TABLE IF EXISTS `order_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_type` (
  `order_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`order_type_id`),
  UNIQUE KEY `order_type_uuid_index` (`uuid`),
  KEY `retired_status` (`retired`),
  KEY `type_created_by` (`creator`),
  KEY `user_who_retired_order_type` (`retired_by`),
  CONSTRAINT `type_created_by` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_order_type` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_type`
--

LOCK TABLES `order_type` WRITE;
/*!40000 ALTER TABLE `order_type` DISABLE KEYS */;
INSERT INTO `order_type` VALUES (2,'Drug Order','An order for a medication to be given to the patient',1,'2010-05-12 00:00:00',0,NULL,NULL,NULL,'131168f4-15f5-102d-96e4-000c29c2a5d7');
/*!40000 ALTER TABLE `order_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_type_id` int(11) NOT NULL DEFAULT '0',
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `orderer` int(11) DEFAULT '0',
  `encounter_id` int(11) DEFAULT NULL,
  `instructions` text,
  `start_date` datetime DEFAULT NULL,
  `auto_expire_date` datetime DEFAULT NULL,
  `discontinued` smallint(6) NOT NULL DEFAULT '0',
  `discontinued_date` datetime DEFAULT NULL,
  `discontinued_by` int(11) DEFAULT NULL,
  `discontinued_reason` int(11) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `patient_id` int(11) NOT NULL,
  `accession_number` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `orders_uuid_index` (`uuid`),
  KEY `order_creator` (`creator`),
  KEY `user_who_discontinued_order` (`discontinued_by`),
  KEY `discontinued_because` (`discontinued_reason`),
  KEY `orders_in_encounter` (`encounter_id`),
  KEY `type_of_order` (`order_type_id`),
  KEY `orderer_not_drug` (`orderer`),
  KEY `order_for_patient` (`patient_id`),
  KEY `user_who_voided_order` (`voided_by`),
  CONSTRAINT `discontinued_because` FOREIGN KEY (`discontinued_reason`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `orderer_not_drug` FOREIGN KEY (`orderer`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_in_encounter` FOREIGN KEY (`encounter_id`) REFERENCES `encounter` (`encounter_id`),
  CONSTRAINT `order_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `order_for_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON UPDATE CASCADE,
  CONSTRAINT `type_of_order` FOREIGN KEY (`order_type_id`) REFERENCES `order_type` (`order_type_id`),
  CONSTRAINT `user_who_discontinued_order` FOREIGN KEY (`discontinued_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_voided_order` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL AUTO_INCREMENT,
  `tribe` int(11) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  KEY `user_who_changed_pat` (`changed_by`),
  KEY `user_who_created_patient` (`creator`),
  KEY `belongs_to_tribe` (`tribe`),
  KEY `user_who_voided_patient` (`voided_by`),
  CONSTRAINT `belongs_to_tribe` FOREIGN KEY (`tribe`) REFERENCES `tribe` (`tribe_id`),
  CONSTRAINT `person_id_for_patient` FOREIGN KEY (`patient_id`) REFERENCES `person` (`person_id`) ON UPDATE CASCADE,
  CONSTRAINT `user_who_changed_pat` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_created_patient` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_voided_patient` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_identifier`
--

DROP TABLE IF EXISTS `patient_identifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_identifier` (
  `patient_identifier_id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) NOT NULL DEFAULT '0',
  `identifier` varchar(50) NOT NULL DEFAULT '',
  `identifier_type` int(11) NOT NULL DEFAULT '0',
  `preferred` smallint(6) NOT NULL DEFAULT '0',
  `location_id` int(11) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`patient_identifier_id`),
  UNIQUE KEY `patient_identifier_uuid_index` (`uuid`),
  KEY `identifier_name` (`identifier`),
  KEY `identifier_creator` (`creator`),
  KEY `defines_identifier_type` (`identifier_type`),
  KEY `patient_identifier_ibfk_2` (`location_id`),
  KEY `identifier_voider` (`voided_by`),
  KEY `idx_patient_identifier_patient` (`patient_id`),
  CONSTRAINT `identifies_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `defines_identifier_type` FOREIGN KEY (`identifier_type`) REFERENCES `patient_identifier_type` (`patient_identifier_type_id`),
  CONSTRAINT `identifier_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `identifier_voider` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `patient_identifier_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_identifier`
--

LOCK TABLES `patient_identifier` WRITE;
/*!40000 ALTER TABLE `patient_identifier` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_identifier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_identifier_type`
--

DROP TABLE IF EXISTS `patient_identifier_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_identifier_type` (
  `patient_identifier_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `format` varchar(50) DEFAULT NULL,
  `check_digit` smallint(6) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `required` smallint(6) NOT NULL DEFAULT '0',
  `format_description` varchar(255) DEFAULT NULL,
  `validator` varchar(200) DEFAULT NULL,
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`patient_identifier_type_id`),
  UNIQUE KEY `patient_identifier_type_uuid_index` (`uuid`),
  KEY `retired_status` (`retired`),
  KEY `type_creator` (`creator`),
  KEY `user_who_retired_patient_identifier_type` (`retired_by`),
  CONSTRAINT `type_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_patient_identifier_type` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_identifier_type`
--

LOCK TABLES `patient_identifier_type` WRITE;
/*!40000 ALTER TABLE `patient_identifier_type` DISABLE KEYS */;
INSERT INTO `patient_identifier_type` VALUES (1,'OpenMRS Identification Number','Unique number used in OpenMRS','',1,1,'2005-09-22 00:00:00',0,NULL,'org.openmrs.patient.impl.LuhnIdentifierValidator',0,NULL,NULL,NULL,'8d793bee-c2cc-11de-8d13-0010c6dffd0f'),(2,'Old Identification Number','Number given out prior to the OpenMRS system (No check digit)','',0,1,'2005-09-22 00:00:00',0,NULL,NULL,0,NULL,NULL,NULL,'8d79403a-c2cc-11de-8d13-0010c6dffd0f'),(3,'MoTeCH Id','Patient Id for MoTeC system.',NULL,1,1,'2011-09-27 15:07:02',0,NULL,NULL,0,NULL,NULL,NULL,'40fbe30a-e8ec-11e0-8e86-a9cbfc8ed377'),(4,'MoTeCH Staff Id','Staff Id for MoTeCH system.',NULL,1,1,'2011-09-27 15:07:02',0,NULL,NULL,0,NULL,NULL,NULL,'40fbe6ac-e8ec-11e0-8e86-a9cbfc8ed377'),(5,'MoTeCH Facility Id','Facility Id for MoTeCH system.',NULL,1,1,'2011-09-27 15:07:02',0,NULL,NULL,0,NULL,NULL,NULL,'40fbe7a6-e8ec-11e0-8e86-a9cbfc8ed377'),(6,'MoTeCH Community Id','Community Id for MoTeCH system.',NULL,1,1,'2011-09-27 15:07:02',0,NULL,NULL,0,NULL,NULL,NULL,'4122c088-e8ec-11e0-8e86-a9cbfc8ed377');
/*!40000 ALTER TABLE `patient_identifier_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_program`
--

DROP TABLE IF EXISTS `patient_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_program` (
  `patient_program_id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) NOT NULL DEFAULT '0',
  `program_id` int(11) NOT NULL DEFAULT '0',
  `date_enrolled` datetime DEFAULT NULL,
  `date_completed` datetime DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`patient_program_id`),
  UNIQUE KEY `patient_program_uuid_index` (`uuid`),
  KEY `user_who_changed` (`changed_by`),
  KEY `patient_program_creator` (`creator`),
  KEY `patient_in_program` (`patient_id`),
  KEY `program_for_patient` (`program_id`),
  KEY `user_who_voided_patient_program` (`voided_by`),
  KEY `patient_program_location_id` (`location_id`),
  CONSTRAINT `patient_program_location_id` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`),
  CONSTRAINT `patient_in_program` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON UPDATE CASCADE,
  CONSTRAINT `patient_program_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `program_for_patient` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`),
  CONSTRAINT `user_who_changed` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_voided_patient_program` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_program`
--

LOCK TABLES `patient_program` WRITE;
/*!40000 ALTER TABLE `patient_program` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_state`
--

DROP TABLE IF EXISTS `patient_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_state` (
  `patient_state_id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_program_id` int(11) NOT NULL DEFAULT '0',
  `state` int(11) NOT NULL DEFAULT '0',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`patient_state_id`),
  UNIQUE KEY `patient_state_uuid_index` (`uuid`),
  KEY `patient_state_changer` (`changed_by`),
  KEY `patient_state_creator` (`creator`),
  KEY `patient_program_for_state` (`patient_program_id`),
  KEY `state_for_patient` (`state`),
  KEY `patient_state_voider` (`voided_by`),
  CONSTRAINT `patient_program_for_state` FOREIGN KEY (`patient_program_id`) REFERENCES `patient_program` (`patient_program_id`),
  CONSTRAINT `patient_state_changer` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `patient_state_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `patient_state_voider` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `state_for_patient` FOREIGN KEY (`state`) REFERENCES `program_workflow_state` (`program_workflow_state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_state`
--

LOCK TABLES `patient_state` WRITE;
/*!40000 ALTER TABLE `patient_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person` (
  `person_id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(50) DEFAULT '',
  `birthdate` date DEFAULT NULL,
  `birthdate_estimated` smallint(6) NOT NULL DEFAULT '0',
  `dead` smallint(6) NOT NULL DEFAULT '0',
  `death_date` datetime DEFAULT NULL,
  `cause_of_death` int(11) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`person_id`),
  UNIQUE KEY `person_uuid_index` (`uuid`),
  KEY `person_birthdate` (`birthdate`),
  KEY `person_death_date` (`death_date`),
  KEY `person_died_because` (`cause_of_death`),
  KEY `user_who_changed_person` (`changed_by`),
  KEY `user_who_created_person` (`creator`),
  KEY `user_who_voided_person` (`voided_by`),
  CONSTRAINT `person_died_because` FOREIGN KEY (`cause_of_death`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `user_who_changed_person` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_created_person` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_voided_person` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'',NULL,0,0,NULL,NULL,1,'2005-01-01 00:00:00',NULL,NULL,0,NULL,NULL,NULL,'da7c83d2-e8eb-11e0-8e86-a9cbfc8ed377');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_address`
--

DROP TABLE IF EXISTS `person_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person_address` (
  `person_address_id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) DEFAULT NULL,
  `preferred` smallint(6) NOT NULL DEFAULT '0',
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city_village` varchar(255) DEFAULT NULL,
  `state_province` varchar(255) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `county_district` varchar(255) DEFAULT NULL,
  `address3` varchar(255) DEFAULT NULL,
  `address6` varchar(255) DEFAULT NULL,
  `address5` varchar(255) DEFAULT NULL,
  `address4` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`person_address_id`),
  UNIQUE KEY `person_address_uuid_index` (`uuid`),
  KEY `patient_address_creator` (`creator`),
  KEY `address_for_person` (`person_id`),
  KEY `patient_address_void` (`voided_by`),
  CONSTRAINT `address_for_person` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`) ON UPDATE CASCADE,
  CONSTRAINT `patient_address_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `patient_address_void` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_address`
--

LOCK TABLES `person_address` WRITE;
/*!40000 ALTER TABLE `person_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `person_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_attribute`
--

DROP TABLE IF EXISTS `person_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person_attribute` (
  `person_attribute_id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL DEFAULT '0',
  `value` varchar(50) NOT NULL DEFAULT '',
  `person_attribute_type_id` int(11) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`person_attribute_id`),
  UNIQUE KEY `person_attribute_uuid_index` (`uuid`),
  KEY `attribute_changer` (`changed_by`),
  KEY `attribute_creator` (`creator`),
  KEY `defines_attribute_type` (`person_attribute_type_id`),
  KEY `identifies_person` (`person_id`),
  KEY `attribute_voider` (`voided_by`),
  CONSTRAINT `attribute_changer` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `attribute_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `attribute_voider` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `defines_attribute_type` FOREIGN KEY (`person_attribute_type_id`) REFERENCES `person_attribute_type` (`person_attribute_type_id`),
  CONSTRAINT `identifies_person` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_attribute`
--

LOCK TABLES `person_attribute` WRITE;
/*!40000 ALTER TABLE `person_attribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `person_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_attribute_type`
--

DROP TABLE IF EXISTS `person_attribute_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person_attribute_type` (
  `person_attribute_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `format` varchar(50) DEFAULT NULL,
  `foreign_key` int(11) DEFAULT NULL,
  `searchable` smallint(6) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `edit_privilege` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  `sort_weight` double DEFAULT NULL,
  PRIMARY KEY (`person_attribute_type_id`),
  UNIQUE KEY `person_attribute_type_uuid_index` (`uuid`),
  KEY `attribute_is_searchable` (`searchable`),
  KEY `name_of_attribute` (`name`),
  KEY `person_attribute_type_retired_status` (`retired`),
  KEY `attribute_type_changer` (`changed_by`),
  KEY `attribute_type_creator` (`creator`),
  KEY `user_who_retired_person_attribute_type` (`retired_by`),
  KEY `privilege_which_can_edit` (`edit_privilege`),
  CONSTRAINT `attribute_type_changer` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `attribute_type_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `privilege_which_can_edit` FOREIGN KEY (`edit_privilege`) REFERENCES `privilege` (`privilege`),
  CONSTRAINT `user_who_retired_person_attribute_type` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_attribute_type`
--

LOCK TABLES `person_attribute_type` WRITE;
/*!40000 ALTER TABLE `person_attribute_type` DISABLE KEYS */;
INSERT INTO `person_attribute_type` VALUES (1,'Race','Group of persons related by common descent or heredity','java.lang.String',0,0,1,'2007-05-04 00:00:00',NULL,NULL,0,NULL,NULL,NULL,NULL,'8d871386-c2cc-11de-8d13-0010c6dffd0f',16),(2,'Birthplace','Location of persons birth','java.lang.String',0,0,1,'2007-05-04 00:00:00',NULL,NULL,0,NULL,NULL,NULL,NULL,'8d8718c2-c2cc-11de-8d13-0010c6dffd0f',0),(3,'Citizenship','Country of which this person is a member','java.lang.String',0,0,1,'2007-05-04 00:00:00',NULL,NULL,0,NULL,NULL,NULL,NULL,'8d871afc-c2cc-11de-8d13-0010c6dffd0f',1),(4,'Mother\'s Name','First or last name of this person\'s mother','java.lang.String',0,0,1,'2007-05-04 00:00:00',NULL,NULL,0,NULL,NULL,NULL,NULL,'8d871d18-c2cc-11de-8d13-0010c6dffd0f',11),(5,'Civil Status','Marriage status of this person','org.openmrs.Concept',1054,0,1,'2007-05-04 00:00:00',NULL,NULL,0,NULL,NULL,NULL,NULL,'8d871f2a-c2cc-11de-8d13-0010c6dffd0f',2),(6,'Health District','District/region in which this patient\' home health center resides','java.lang.String',0,0,1,'2007-05-04 00:00:00',NULL,NULL,0,NULL,NULL,NULL,NULL,'8d872150-c2cc-11de-8d13-0010c6dffd0f',6),(7,'Health Center','Specific Location of this person\'s home health center.','org.openmrs.Location',0,0,1,'2007-05-04 00:00:00',NULL,NULL,0,NULL,NULL,NULL,NULL,'8d87236c-c2cc-11de-8d13-0010c6dffd0f',5),(8,'Phone Number','A person\'s phone number.','java.lang.String',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa89bc4-e8ec-11e0-8e86-a9cbfc8ed377',14),(9,'NHIS Number','A person\'s NHIS number.','java.lang.String',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa89ffc-e8ec-11e0-8e86-a9cbfc8ed377',13),(10,'NHIS Expiration Date','A person\'s NHIS expiration\n            date.','org.openmrs.util.AttributableDate',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa8a150-e8ec-11e0-8e86-a9cbfc8ed377',12),(11,'Language','A person\'s language preference for messages.','java.lang.String',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa8a290-e8ec-11e0-8e86-a9cbfc8ed377',9),(12,'Phone Type','A person\'s phone ownership type (PERSONAL,HOUSEHOLD,or\n            PUBLIC).','java.lang.String',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa8a3c6-e8ec-11e0-8e86-a9cbfc8ed377',15),(13,'Media Type','A person\'s media type preference for messages.','java.lang.String',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa8a51a-e8ec-11e0-8e86-a9cbfc8ed377',10),(14,'Delivery Day','A person\'s preferred delivery day (SUNDAY to\n            SATURDAY).','java.lang.String',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa8a650-e8ec-11e0-8e86-a9cbfc8ed377',3),(15,'Delivery Time','A person\'s preferred delivery time (HH:mm).','java.lang.String',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa8a786-e8ec-11e0-8e86-a9cbfc8ed377',4),(16,'Insured','Is person insured? (TRUE OR FALSE)','java.lang.String',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa8a8b2-e8ec-11e0-8e86-a9cbfc8ed377',8),(17,'How learned of service','How person found out about services.','java.lang.String',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa8a9f2-e8ec-11e0-8e86-a9cbfc8ed377',7),(18,'Reason interested in service','Reason person is interested in\n            services.','java.lang.String',NULL,0,1,'2011-09-27 15:06:59',NULL,NULL,0,NULL,NULL,NULL,NULL,'3fa8ab32-e8ec-11e0-8e86-a9cbfc8ed377',17),(19,'Staff Type','A person\'s staff type.','java.lang.String',NULL,0,1,'2011-09-27 15:07:08',NULL,NULL,0,NULL,NULL,NULL,NULL,'44a70d72-e8ec-11e0-8e86-a9cbfc8ed377',18);
/*!40000 ALTER TABLE `person_attribute_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_name`
--

DROP TABLE IF EXISTS `person_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person_name` (
  `person_name_id` int(11) NOT NULL AUTO_INCREMENT,
  `preferred` smallint(6) NOT NULL DEFAULT '0',
  `person_id` int(11) NOT NULL,
  `prefix` varchar(50) DEFAULT NULL,
  `given_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `family_name_prefix` varchar(50) DEFAULT NULL,
  `family_name` varchar(50) DEFAULT NULL,
  `family_name2` varchar(50) DEFAULT NULL,
  `family_name_suffix` varchar(50) DEFAULT NULL,
  `degree` varchar(50) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`person_name_id`),
  UNIQUE KEY `person_name_uuid_index` (`uuid`),
  KEY `first_name` (`given_name`),
  KEY `last_name` (`family_name`),
  KEY `middle_name` (`middle_name`),
  KEY `user_who_made_name` (`creator`),
  KEY `name_for_person` (`person_id`),
  KEY `user_who_voided_name` (`voided_by`),
  KEY `family_name2` (`family_name2`),
  CONSTRAINT `name_for_person` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`) ON UPDATE CASCADE,
  CONSTRAINT `user_who_made_name` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_voided_name` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_name`
--

LOCK TABLES `person_name` WRITE;
/*!40000 ALTER TABLE `person_name` DISABLE KEYS */;
INSERT INTO `person_name` VALUES (1,1,1,NULL,'Super','',NULL,'User',NULL,NULL,NULL,1,'2005-01-01 00:00:00',0,NULL,NULL,NULL,NULL,NULL,'da7eab9e-e8eb-11e0-8e86-a9cbfc8ed377');
/*!40000 ALTER TABLE `person_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilege` (
  `privilege` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(250) NOT NULL DEFAULT '',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`privilege`),
  UNIQUE KEY `privilege_uuid_index` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege`
--

LOCK TABLES `privilege` WRITE;
/*!40000 ALTER TABLE `privilege` DISABLE KEYS */;
INSERT INTO `privilege` VALUES ('Add Allergies','Add allergies','6e788dd3-6460-4656-b239-0342f31973c6'),('Add Cohorts','Able to add a cohort to the system','56e6eb0c-b98c-4aea-8a41-e9f3637ef944'),('Add Concept Proposals','Able to add concept proposals to the system','5b0a7a29-93db-4eff-9bd6-b06596485721'),('Add Encounters','Able to add patient encounters','b7bd6927-adcd-4280-a022-1ac58d7163a9'),('Add Observations','Able to add patient observations','0c655a32-26a9-48c6-8c97-36faa7ec6eac'),('Add Orders','Able to add orders','7d578f90-8298-403a-bc54-f87fbc1b20d7'),('Add Patient Identifiers','Able to add patient identifiers','310a1414-3882-44bc-b317-71e94cb41ae6'),('Add Patient Programs','Able to add patients to programs','c3c4091c-fc97-499a-9969-086030c1a3ac'),('Add Patients','Able to add patients','b9815b6d-0975-4179-943a-d1a3d378b6fe'),('Add People','Able to add person objects','822b6f28-d0d0-480e-945c-c3c1159c331a'),('Add Problems','Add problems','f8413759-2530-4eb5-938b-e870b504c279'),('Add Relationships','Able to add relationships','d3d7d9f7-2f2a-4659-bd7f-0703c5dc6e04'),('Add Report Objects','Able to add report objects','e93ade64-2141-45d9-ac9a-d76f000d656f'),('Add Reports','Able to add reports','e9571b48-04a3-4ce4-a929-43a94287c384'),('Add Users','Able to add users to OpenMRS','82fe5ea1-5050-4905-b2fd-9b8e897909f8'),('Delete Cohorts','Able to add a cohort to the system','b9eec9c2-3d8a-4cb0-8204-e924a253bace'),('Delete Concept Proposals','Able to delete concept proposals from the system','b63e3458-9f74-4b7a-b340-7d5f90837ca5'),('Delete Encounters','Able to delete patient encounters','5976d29e-b58f-49b0-842d-8848c957ee39'),('Delete Observations','Able to delete patient observations','c2b08ca8-d054-41fe-8a27-b524064f461c'),('Delete Orders','Able to delete orders','7b77250e-bf0f-487b-8e7a-b46ed373c688'),('Delete Patient Identifiers','Able to delete patient identifiers','c9128a48-0afd-4693-90d3-5e13f74f94b0'),('Delete Patient Programs','Able to delete patients from programs','bc3c1be9-2d32-4e2f-a5e4-7b7045294b69'),('Delete Patients','Able to delete patients','33698580-ae63-44c6-bde4-c3a59e6174fc'),('Delete People','Able to delete objects','c12b3674-ada4-47d4-9573-5f90a3a152f3'),('Delete Relationships','Able to delete relationships','0d3e6f29-dacb-413e-a5a3-df1b2bc8f569'),('Delete Report Objects','Able to delete report objects','fd742010-2546-480a-b83e-6205927c6cea'),('Delete Reports','Able to delete reports','8951490a-3e65-4f3f-8612-ffc04c88190b'),('Delete Users','Able to delete users in OpenMRS','75fde2dd-a594-4f5c-932e-e40935712343'),('Duplicate Patients','Allows the admin to delete duplicate patients','2beae95c-25d4-4507-a29a-48cf11759ec1'),('Edit Allergies','Able to edit allergies','d29f38d2-1ecc-4fd6-82b1-85100969ba96'),('Edit Cohorts','Able to add a cohort to the system','accb82fb-95a0-4326-a4e4-5d3eb0a6d6e6'),('Edit Concept Proposals','Able to edit concept proposals in the system','d330e143-ebd6-4696-b741-b378f7ce49fd'),('Edit Encounters','Able to edit patient encounters','c5c2e07f-66e6-47ee-8334-04c65f289767'),('Edit Observations','Able to edit patient observations','56a53486-15d6-4b74-819d-8e64876646f4'),('Edit Orders','Able to edit orders','713ddb58-266d-4750-8a17-44ac0fac69e1'),('Edit Patient Identifiers','Able to edit patient identifiers','4cacaa05-7c55-431a-8ca5-e6c0ccac29ed'),('Edit Patient Programs','Able to edit patients in programs','aa2aa3f1-c1e3-4614-9b18-844a68920648'),('Edit Patients','Able to edit patients','070b0023-70d0-45af-b423-8929866dcef3'),('Edit People','Able to edit person objects','16880a5a-b4cd-4737-8f97-9e3e367a0249'),('Edit Problems','Able to edit problems','3128efa9-6664-4599-9e86-2c2ff07bb2a4'),('Edit Relationships','Able to edit relationships','de7ef521-7174-4f97-9c98-e66ec004f464'),('Edit Report Objects','Able to edit report objects','61c989f9-0593-4210-9fec-7d23ea6dad23'),('Edit Reports','Able to edit reports','d129c5f3-8f51-493b-a76a-03b3f7c3cd03'),('Edit User Passwords','Able to change the passwords of users in OpenMRS','111984cd-6788-41a1-b5fb-1ad6eae75a1b'),('Edit Users','Able to edit users in OpenMRS','fcca7420-2fcb-4bc4-958b-483161d2ac85'),('Form Entry','Able to fill out forms','eeaf52a7-4009-4dc9-9478-a557e6983240'),('Generate Batch of Identifiers','Allows user to generate a batch of identifiers to a file for offline use','5e5021bb-8332-4a11-a598-3c2518706526'),('Manage Alerts','Able to add/edit/delete user alerts','d25795a8-ebc2-4de0-9743-7f1a638279c4'),('Manage Auto Generation Options','Allows user add, edit, and remove auto-generation options','d3e1b0df-1739-4dc6-ba39-65efa69d12dc'),('Manage Concept Classes','Able to add/edit/retire concept classes','95886749-b86d-4e54-8343-7839d0f4684e'),('Manage Concept Datatypes','Able to add/edit/retire concept datatypes','336d757b-69b3-4692-bd41-6b67e6c1ae9c'),('Manage Concept Name tags','Able to add/edit/delete concept name tags','263fc750-3f84-4383-8b48-662bfb179166'),('Manage Concept Sources','Able to add/edit/delete concept sources','53708866-a17a-47d6-80e0-2933f7f1c4bd'),('Manage Concepts','Able to add/edit/delete concept entries','bf3fbf4b-0b6a-4b1e-ac43-29f87bba92bf'),('Manage Encounter Types','Able to add/edit/delete encounter types','07963327-a1c4-43e0-879a-fe3ce635bc5e'),('Manage Field Types','Able to add/edit/retire field types','57b389e1-5370-4c65-8623-8c3af7d88477'),('Manage Forms','Able to add/edit/delete forms','99fccb7f-7868-4f28-b3a5-a58dfddc8cd0'),('Manage Global Properties','Able to add/edit global properties','f71b3bce-6faa-4130-a4b1-419a22fd766f'),('Manage Identifier Sources','Allows user add, edit, and remove identifier sources','782a670a-5944-47de-88f3-e7f991d46173'),('Manage Identifier Types','Able to add/edit/delete patient identifier types','f0cf820e-f20c-4218-b879-3b8c29f15baa'),('Manage Implementation Id','Able to view/add/edit the implementation id for the system','82586f2d-8716-4b0c-9ce8-0edf5f2eafc3'),('Manage Location Tags','Able to add/edit/delete location tags','d1606063-0c18-4486-ae3f-e96513ae4b5e'),('Manage Locations','Able to add/edit/delete locations','604a6a90-a574-4473-95f3-88335c8709e9'),('Manage Modules','Able to add/remove modules to the system','d1080776-a16e-435b-a463-6ff502a25918'),('Manage MoTeCH','Allows viewing and interacting with the MoTeCH management functions','4b19d9ed-8438-446b-97d6-2b4a466bd85c'),('Manage MoTeCH Blackout','Allows management of global blackout interval for MoTeCH','fdad5987-4d0a-4205-af9b-7ab6de434ba1'),('Manage MoTeCH Troubled Phones','Allows ability to view and enable troubled phones via MoTeCH','e54cab54-3455-4aa3-a083-7b1093e15e26'),('Manage Order Types','Able to add/edit/retire order types','f686dcb1-5012-4cb5-ac29-f680263fac0b'),('Manage Person Attribute Types','Able to add/edit/delete person attribute types','05de9af8-ba8d-42a7-b726-30bfd353e97e'),('Manage Privileges','Able to add/edit/delete privileges','7286c244-50f3-4d1e-b4a7-7effe3e184a6'),('Manage Programs','Able to add/view/delete patient programs','cee9dabb-cc24-43e1-a2a9-7111cb33f9f0'),('Manage Relationship Types','Able to add/edit/retire relationship types','112ca4db-d368-4989-9481-acdf1108a2bc'),('Manage Relationships','Able to add/edit/delete relationships','a876ad40-c59b-465d-9b5b-591254e6f52b'),('Manage Roles','Able to add/edit/delete user roles','a11ee572-abea-4cbe-9d0c-628b1043fd38'),('Manage Rule Definitions','Allows creation and editing of user-defined rules','3c5c9234-def9-44c3-8a8d-53443b366652'),('Manage Scheduler','Able to add/edit/remove scheduled tasks','17e3554a-92c4-44b2-a7ed-291c3e9fdd5a'),('Manage Tokens','Allows registering and removal of tokens','7993b1b0-f40c-48cf-9a3a-c5a2a0dda371'),('Patient Dashboard - View Demographics Section','Able to view the \'Demographics\' tab on the patient dashboard','1ce1cef6-8df2-450c-b663-69d8ddf0dff9'),('Patient Dashboard - View Encounters Section','Able to view the \'Encounters\' tab on the patient dashboard','69d7d855-b534-4c9a-8011-b1f758cc1d79'),('Patient Dashboard - View Forms Section','Able to view the \'Forms\' tab on the patient dashboard','d2186cfe-9615-426c-afde-576c76343848'),('Patient Dashboard - View Graphs Section','Able to view the \'Graphs\' tab on the patient dashboard','f3b75055-f00e-4c49-8531-afe576c464af'),('Patient Dashboard - View Overview Section','Able to view the \'Overview\' tab on the patient dashboard','036afe89-3342-40b2-a9fb-b5fad60f9b89'),('Patient Dashboard - View Patient Summary','Able to view the \'Summary\' tab on the patient dashboard','6cb7f01a-d782-4270-b5f3-640595095aab'),('Patient Dashboard - View Regimen Section','Able to view the \'Regimen\' tab on the patient dashboard','b81085fc-78f3-489d-9a29-129a82aa4310'),('Purge Field Types','Able to purge field types','05972f54-7b32-4236-8b1a-22fc42d2b16e'),('Register MoTeCH Communities','Allows to add new communities and edit existing ones','790de86e-606d-4814-a8ed-1b2b90d96d88'),('Register MoTeCH Facility','Allows registration of a facility via MoTeCH','4a640204-2edf-4f1c-ad52-6c23d4ccafbf'),('Register MoTeCH Maternal Visit','Allows registration of a maternal visit via MoTeCH','75f9ed6c-be02-4d6d-9fdf-36334356cf96'),('Register MoTeCH Patient','Allows registration of a patient via MoTeCH','a407bf86-d6a9-4374-a2f0-a6a8e90943df'),('Register MoTeCH Pregnancy','Allows registration of a pregnancy via MoTeCH','530ef3a2-9d70-4c30-8cd9-a2039b68608f'),('Register MoTeCH Staff','Allows registration of a staff member via MoTeCH','463a458c-f67c-4d54-9f54-6e345e99da66'),('Remove Allergies','Remove allergies','9d2ed92f-ba8c-449d-a744-77f06d79cd8a'),('Remove Problems','Remove problems','7ba1a6c5-1366-40cc-bfe2-83f43282dfdb'),('Run Reports','Able to run reports','41d3d42f-e564-47ec-a05b-02e9e9587798'),('Send SMS','Allows the staff to send SMS','b9c50e20-28c4-4595-b363-ba5343fb2263'),('Upload Batch of Identifiers','Allows user to upload a batch of identifiers','8effe051-8664-4572-a16c-2026967b4da1'),('URL Map','Allows the staff map URL for incoming message','c9b41d78-e39e-4554-90fe-56dfd5f111c6'),('Use MoTeCH','Enables a user to view the motech menu in the gutter','95870480-33d8-4f57-b933-32621a0aff81'),('Use MoTeCH Demo','Enables a user to view the motech menu in the gutter','13897b27-3b62-4a40-8a62-16803764cfe1'),('View Administration Functions','Able to view the \'Administration\' link in the navigation bar','c920d10d-a9e0-4b00-b4a7-a8468897ae14'),('View Allergies','Able to view allergies','2adfe4f5-b203-4c66-ae62-8342a7b1e945'),('View Concept Classes','Able to view concept classes','4ed05781-0d41-4dfe-a1ec-b9295670c72c'),('View Concept Datatypes','Able to view concept datatypes','bf8ca3c2-3206-43ca-bf69-11d83f0f8087'),('View Concept Proposals','Able to view concept proposals to the system','73bea83e-4feb-47ee-a932-c928a8148cad'),('View Concept Sources','Able to view concept sources','2d92044e-8ef4-4f68-8ea6-57db941fde53'),('View Concepts','Able to view concept entries','467e83ae-2e59-48e9-b122-3b2e900ef378'),('View Database Changes','Able to view database changes from the admin screen','f3fe5e99-1cc7-4f73-9fa0-37ee3f40e4c5'),('View Encounter Types','Able to view encounter types','aba66a66-5d97-45bf-b195-0f3771aeb0af'),('View Encounters','Able to view patient encounters','3f1a222d-7384-46da-a297-6efc725573b4'),('View Field Types','Able to view field types','bbe6fe08-1595-41c7-b969-2308d9ed380d'),('View Forms','Able to view forms','9390b51f-ef58-4f4c-a03e-f22e8cdc22e2'),('View Global Properties','Able to view global properties on the administration screen','3c46af58-9fbf-4667-9547-191320b3fee5'),('View Identifier Types','Able to view patient identifier types','2d45c3ec-3410-4e4b-b405-66b4a64faea2'),('View Locations','Able to view locations','84705f9d-0ab7-48f9-835d-399934b1e528'),('View MoTeCH Data','Allows viewing MoTeCH data summary','b32bd36b-6286-48bb-91d9-df9561f70484'),('View Navigation Menu','Able to view the navigation menu (Home, View Patients, Dictionary, Administration, My Profile)','e07f3841-66e7-448d-a934-92c0701e2484'),('View Observations','Able to view patient observations','c722cbb7-531f-4d73-a520-91fe6d97ab5d'),('View Order Types','Able to view order types','0072d421-e3c2-4c51-a548-dc052d4f1840'),('View Orders','Able to view orders','14448f5e-99a8-4ab4-b7eb-441eb5ddef96'),('View Patient Cohorts','Able to view patient cohorts','110553cb-28cb-4241-a60f-5ba3d9501338'),('View Patient Identifiers','Able to view patient identifiers','8f289478-6fca-4626-a615-0ac7d59d8158'),('View Patient Programs','Able to see which programs that patients are in','1206949e-d833-4fbb-9c31-419c497bca44'),('View Patients','Able to view patients','102202b5-3bd0-4272-b7f3-77e09604abff'),('View People','Able to view person objects','34714ea9-d979-45de-a6b4-4d9987124a74'),('View Person Attribute Types','Able to view person attribute types','452ae372-3d89-41ff-9c38-9d923b36d2c9'),('View Privileges','Able to view user privileges','39b3be9a-af8a-4d93-99b1-7799278d51b0'),('View Problems','Able to view problems','0b28b9e0-3fc4-4f6e-835b-3d6e1bcdaa9f'),('View Programs','Able to view patient programs','f1673189-28c7-4c91-a99b-a66510454035'),('View RCT Patients','Allows the admin to view patients related to RCT','2f1d350a-1af9-4ec6-aaa3-53873ee1a727'),('View Relationship Types','Able to view relationship types','85d624c0-fba9-4318-80af-296f4c7ecb46'),('View Relationships','Able to view relationships','8e2e0bc7-2755-4710-a6d8-6c4554fffee9'),('View Report Objects','Able to view report objects','ca56bad8-5eea-4ae6-87d8-e92842ad9a05'),('View Reports','Able to view reports','6bb5a035-d162-4933-97c0-0b1f990e872d'),('View Roles','Able to view user roles','33f4ee41-4769-4cb0-b36c-9cfd7ebdcf24'),('View Rule Definitions','Allows viewing of user-defined rules. (This privilege is not necessary to run rules under normal usage.)','9983239d-84eb-4792-ae54-c5afe4e590ea'),('View Unpublished Forms','Able to view and fill out unpublished forms','a48b9949-a796-4698-a2d0-c7f41e54efb2'),('View Users','Able to view users in OpenMRS','f851f2d5-a10f-406e-9266-4a1e8ba6c8cd');
/*!40000 ALTER TABLE `privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program` (
  `program_id` int(11) NOT NULL AUTO_INCREMENT,
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`program_id`),
  UNIQUE KEY `program_uuid_index` (`uuid`),
  KEY `user_who_changed_program` (`changed_by`),
  KEY `program_concept` (`concept_id`),
  KEY `program_creator` (`creator`),
  CONSTRAINT `program_concept` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `program_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_changed_program` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_workflow`
--

DROP TABLE IF EXISTS `program_workflow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program_workflow` (
  `program_workflow_id` int(11) NOT NULL AUTO_INCREMENT,
  `program_id` int(11) NOT NULL DEFAULT '0',
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`program_workflow_id`),
  UNIQUE KEY `program_workflow_uuid_index` (`uuid`),
  KEY `workflow_changed_by` (`changed_by`),
  KEY `workflow_concept` (`concept_id`),
  KEY `workflow_creator` (`creator`),
  KEY `program_for_workflow` (`program_id`),
  CONSTRAINT `program_for_workflow` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`),
  CONSTRAINT `workflow_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `workflow_concept` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `workflow_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_workflow`
--

LOCK TABLES `program_workflow` WRITE;
/*!40000 ALTER TABLE `program_workflow` DISABLE KEYS */;
/*!40000 ALTER TABLE `program_workflow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_workflow_state`
--

DROP TABLE IF EXISTS `program_workflow_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program_workflow_state` (
  `program_workflow_state_id` int(11) NOT NULL AUTO_INCREMENT,
  `program_workflow_id` int(11) NOT NULL DEFAULT '0',
  `concept_id` int(11) NOT NULL DEFAULT '0',
  `initial` smallint(6) NOT NULL DEFAULT '0',
  `terminal` smallint(6) NOT NULL DEFAULT '0',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`program_workflow_state_id`),
  UNIQUE KEY `program_workflow_state_uuid_index` (`uuid`),
  KEY `state_changed_by` (`changed_by`),
  KEY `state_concept` (`concept_id`),
  KEY `state_creator` (`creator`),
  KEY `workflow_for_state` (`program_workflow_id`),
  CONSTRAINT `state_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `state_concept` FOREIGN KEY (`concept_id`) REFERENCES `concept` (`concept_id`),
  CONSTRAINT `state_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `workflow_for_state` FOREIGN KEY (`program_workflow_id`) REFERENCES `program_workflow` (`program_workflow_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_workflow_state`
--

LOCK TABLES `program_workflow_state` WRITE;
/*!40000 ALTER TABLE `program_workflow_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `program_workflow_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship`
--

DROP TABLE IF EXISTS `relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationship` (
  `relationship_id` int(11) NOT NULL AUTO_INCREMENT,
  `person_a` int(11) NOT NULL,
  `relationship` int(11) NOT NULL DEFAULT '0',
  `person_b` int(11) NOT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) DEFAULT NULL,
  PRIMARY KEY (`relationship_id`),
  UNIQUE KEY `relationship_uuid_index` (`uuid`),
  KEY `relation_creator` (`creator`),
  KEY `person_a` (`person_a`),
  KEY `person_b` (`person_b`),
  KEY `relationship_type_id` (`relationship`),
  KEY `relation_voider` (`voided_by`),
  CONSTRAINT `person_a` FOREIGN KEY (`person_a`) REFERENCES `person` (`person_id`) ON UPDATE CASCADE,
  CONSTRAINT `person_b` FOREIGN KEY (`person_b`) REFERENCES `person` (`person_id`) ON UPDATE CASCADE,
  CONSTRAINT `relationship_type_id` FOREIGN KEY (`relationship`) REFERENCES `relationship_type` (`relationship_type_id`),
  CONSTRAINT `relation_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `relation_voider` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship`
--

LOCK TABLES `relationship` WRITE;
/*!40000 ALTER TABLE `relationship` DISABLE KEYS */;
/*!40000 ALTER TABLE `relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationship_type`
--

DROP TABLE IF EXISTS `relationship_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationship_type` (
  `relationship_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `a_is_to_b` varchar(50) NOT NULL,
  `b_is_to_a` varchar(50) NOT NULL,
  `preferred` int(11) NOT NULL DEFAULT '0',
  `weight` int(11) NOT NULL DEFAULT '0',
  `description` varchar(255) NOT NULL DEFAULT '',
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `uuid` char(38) NOT NULL,
  `retired` tinyint(1) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`relationship_type_id`),
  UNIQUE KEY `relationship_type_uuid_index` (`uuid`),
  KEY `user_who_created_rel` (`creator`),
  KEY `user_who_retired_relationship_type` (`retired_by`),
  CONSTRAINT `user_who_created_rel` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_relationship_type` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship_type`
--

LOCK TABLES `relationship_type` WRITE;
/*!40000 ALTER TABLE `relationship_type` DISABLE KEYS */;
INSERT INTO `relationship_type` VALUES (1,'Doctor','Patient',0,0,'Relationship from a primary care provider to the patient',1,'2007-05-04 00:00:00','8d919b58-c2cc-11de-8d13-0010c6dffd0f',0,NULL,NULL,NULL),(2,'Sibling','Sibling',0,0,'Relationship between brother/sister, brother/brother, and sister/sister',1,'2007-05-04 00:00:00','8d91a01c-c2cc-11de-8d13-0010c6dffd0f',0,NULL,NULL,NULL),(3,'Parent','Child',0,0,'Relationship from a mother/father to the child',1,'2007-05-04 00:00:00','8d91a210-c2cc-11de-8d13-0010c6dffd0f',0,NULL,NULL,NULL),(4,'Aunt/Uncle','Niece/Nephew',0,0,'',1,'2007-05-04 00:00:00','8d91a3dc-c2cc-11de-8d13-0010c6dffd0f',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `relationship_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_object`
--

DROP TABLE IF EXISTS `report_object`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_object` (
  `report_object_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `report_object_type` varchar(255) NOT NULL,
  `report_object_sub_type` varchar(255) NOT NULL,
  `xml_data` text,
  `creator` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `voided` smallint(6) NOT NULL DEFAULT '0',
  `voided_by` int(11) DEFAULT NULL,
  `date_voided` datetime DEFAULT NULL,
  `void_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`report_object_id`),
  UNIQUE KEY `report_object_uuid_index` (`uuid`),
  KEY `user_who_changed_report_object` (`changed_by`),
  KEY `report_object_creator` (`creator`),
  KEY `user_who_voided_report_object` (`voided_by`),
  CONSTRAINT `report_object_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_changed_report_object` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_voided_report_object` FOREIGN KEY (`voided_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_object`
--

LOCK TABLES `report_object` WRITE;
/*!40000 ALTER TABLE `report_object` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_object` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_schema_xml`
--

DROP TABLE IF EXISTS `report_schema_xml`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_schema_xml` (
  `report_schema_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `xml_data` mediumtext NOT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`report_schema_id`),
  UNIQUE KEY `report_schema_xml_uuid_index` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_schema_xml`
--

LOCK TABLES `report_schema_xml` WRITE;
/*!40000 ALTER TABLE `report_schema_xml` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_schema_xml` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `role` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`role`),
  UNIQUE KEY `role_uuid_index` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('Anonymous','Privileges for non-authenticated users.','774b2af3-6437-4e5a-a310-547554c7c65c'),('Authenticated','Privileges gained once authentication has been established.','f7fd42ef-880e-40c5-972d-e4ae7c990de2'),('Provider','All users with the \'Provider\' role will appear as options in the default Infopath ','8d94f280-c2cc-11de-8d13-0010c6dffd0f'),('System Developer','Developers of the OpenMRS .. have additional access to change fundamental structure of the database model.','8d94f852-c2cc-11de-8d13-0010c6dffd0f');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_privilege`
--

DROP TABLE IF EXISTS `role_privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_privilege` (
  `role` varchar(50) NOT NULL DEFAULT '',
  `privilege` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`privilege`,`role`),
  KEY `role_privilege` (`role`),
  CONSTRAINT `role_privilege` FOREIGN KEY (`role`) REFERENCES `role` (`role`),
  CONSTRAINT `privilege_definitons` FOREIGN KEY (`privilege`) REFERENCES `privilege` (`privilege`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_privilege`
--

LOCK TABLES `role_privilege` WRITE;
/*!40000 ALTER TABLE `role_privilege` DISABLE KEYS */;
INSERT INTO `role_privilege` VALUES ('Authenticated','View Concept Classes'),('Authenticated','View Concept Datatypes'),('Authenticated','View Encounter Types'),('Authenticated','View Field Types'),('Authenticated','View Global Properties'),('Authenticated','View Identifier Types'),('Authenticated','View Locations'),('Authenticated','View Order Types'),('Authenticated','View Person Attribute Types'),('Authenticated','View Privileges'),('Authenticated','View Relationship Types'),('Authenticated','View Relationships'),('Authenticated','View Roles');
/*!40000 ALTER TABLE `role_privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_role`
--

DROP TABLE IF EXISTS `role_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_role` (
  `parent_role` varchar(50) NOT NULL DEFAULT '',
  `child_role` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`parent_role`,`child_role`),
  KEY `inherited_role` (`child_role`),
  CONSTRAINT `parent_role` FOREIGN KEY (`parent_role`) REFERENCES `role` (`role`),
  CONSTRAINT `inherited_role` FOREIGN KEY (`child_role`) REFERENCES `role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_role`
--

LOCK TABLES `role_role` WRITE;
/*!40000 ALTER TABLE `role_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduler_task_config`
--

DROP TABLE IF EXISTS `scheduler_task_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduler_task_config` (
  `task_config_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `schedulable_class` text,
  `start_time` datetime DEFAULT NULL,
  `start_time_pattern` varchar(50) DEFAULT NULL,
  `repeat_interval` int(11) NOT NULL DEFAULT '0',
  `start_on_startup` int(11) NOT NULL DEFAULT '0',
  `started` int(11) NOT NULL DEFAULT '0',
  `created_by` int(11) DEFAULT '0',
  `date_created` datetime DEFAULT '2005-01-01 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  `last_execution_time` datetime DEFAULT NULL,
  PRIMARY KEY (`task_config_id`),
  UNIQUE KEY `scheduler_task_config_uuid_index` (`uuid`),
  KEY `scheduler_changer` (`changed_by`),
  KEY `scheduler_creator` (`created_by`),
  CONSTRAINT `scheduler_changer` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `scheduler_creator` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduler_task_config`
--

LOCK TABLES `scheduler_task_config` WRITE;
/*!40000 ALTER TABLE `scheduler_task_config` DISABLE KEYS */;
INSERT INTO `scheduler_task_config` VALUES (1,'Immediate Notification Task','Task to send out immediate SMS notifications','org.motechproject.server.omod.tasks.NotificationTask','2010-08-17 06:29:20',NULL,300,1,0,1,'2011-09-27 15:07:00',NULL,NULL,'01b53896-edb4-11e0-a93d-196096cf4d13',NULL),(2,'Daily Notification Task','Task to send out SMS notifications for next day','org.motechproject.server.omod.tasks.NotificationTask','2010-08-17 23:00:00',NULL,86400,1,0,1,'2011-09-27 15:07:00',NULL,NULL,'01b53c24-edb4-11e0-a93d-196096cf4d13',NULL),(3,'MessageProgram Update Task','Task to update message program state for patients','org.motechproject.server.omod.tasks.MessageProgramUpdateTask','2010-08-17 06:31:40',NULL,180,1,0,1,'2011-09-27 15:07:00',NULL,NULL,'01b53d96-edb4-11e0-a93d-196096cf4d13',NULL),(4,'Daily Nurse Care Messaging Task','Task to send out staff SMS care messages for day','org.motechproject.server.omod.tasks.StaffCareMessagingTask','2010-08-17 23:20:00',NULL,86400,0,0,1,'2011-09-27 15:07:00',NULL,NULL,'01b53efe-edb4-11e0-a93d-196096cf4d13',NULL),(5,'Weekly Nurse Care Messaging Task','Task to send out staff SMS care messages for week','org.motechproject.server.omod.tasks.StaffCareMessagingTask','2010-08-15 23:40:00',NULL,604800,0,0,1,'2011-09-27 15:07:00',NULL,NULL,'01b5405c-edb4-11e0-a93d-196096cf4d13',NULL),(6,'Weekly EDD Nurse Care Messaging Task','Task to send out staff EDD SMS care messages for week','org.motechproject.server.omod.tasks.StaffCareMessagingTask','2010-08-15 23:40:00',NULL,604800,0,0,1,'2011-09-27 15:07:07',NULL,NULL,'01b541ba-edb4-11e0-a93d-196096cf4d13',NULL),(7,'Update Concept Index','Iterates through the concept dictionary, re-creating the concept index (which are used for searcing). This task is started when using the \'Update Concept Index Storage\' page and no range is given.  This task stops itself when one iteration has completed.','org.openmrs.scheduler.tasks.ConceptIndexUpdateTask',NULL,NULL,0,1,1,1,'2005-01-01 00:00:00',NULL,'2011-10-03 17:08:45','7c75911e-0310-11e0-8222-18a905e044dc',NULL),(8,'Initialize Logic Rule Providers',NULL,'org.openmrs.logic.task.InitializeLogicRuleProvidersTask','2011-10-03 17:09:15',NULL,1999999999,0,1,NULL,NULL,NULL,NULL,'f8753700-b900-45e1-a797-4a6a3b7424a8',NULL);
/*!40000 ALTER TABLE `scheduler_task_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduler_task_config_property`
--

DROP TABLE IF EXISTS `scheduler_task_config_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduler_task_config_property` (
  `task_config_property_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` text,
  `task_config_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`task_config_property_id`),
  KEY `task_config_for_property` (`task_config_id`),
  CONSTRAINT `task_config_for_property` FOREIGN KEY (`task_config_id`) REFERENCES `scheduler_task_config` (`task_config_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduler_task_config_property`
--

LOCK TABLES `scheduler_task_config_property` WRITE;
/*!40000 ALTER TABLE `scheduler_task_config_property` DISABLE KEYS */;
INSERT INTO `scheduler_task_config_property` VALUES (1,'sendImmediate','true',1),(2,'timeOffset','3600',2),(3,'batchSize','35',3),(4,'careGroups','PNC(mother),PNC(baby)',4),(5,'deliveryTime','08:00',4),(6,'sendUpcoming','true',4),(7,'careGroups','ANC,TT,IPT',5),(8,'deliveryTime','08:00',5),(10,'careGroups','EDD',6),(11,'deliveryTime','08:00',6),(12,'sendUpcoming','true',6),(13,'sendNoDefaulterAndNoUpcomingCareMessage','false',4),(14,'sendNoDefaulterAndNoUpcomingCareMessage','true',5),(15,'sendNoDefaulterAndNoUpcomingCareMessage','true',6);
/*!40000 ALTER TABLE `scheduler_task_config_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serialized_object`
--

DROP TABLE IF EXISTS `serialized_object`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `serialized_object` (
  `serialized_object_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `subtype` varchar(255) NOT NULL,
  `serialization_class` varchar(255) NOT NULL,
  `serialized_data` text NOT NULL,
  `date_created` datetime NOT NULL,
  `creator` int(11) NOT NULL,
  `date_changed` datetime DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `retired` smallint(6) NOT NULL DEFAULT '0',
  `date_retired` datetime DEFAULT NULL,
  `retired_by` int(11) DEFAULT NULL,
  `retire_reason` varchar(1000) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`serialized_object_id`),
  UNIQUE KEY `serialized_object_uuid_index` (`uuid`),
  KEY `serialized_object_creator` (`creator`),
  KEY `serialized_object_changed_by` (`changed_by`),
  KEY `serialized_object_retired_by` (`retired_by`),
  CONSTRAINT `serialized_object_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `serialized_object_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `serialized_object_retired_by` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serialized_object`
--

LOCK TABLES `serialized_object` WRITE;
/*!40000 ALTER TABLE `serialized_object` DISABLE KEYS */;
/*!40000 ALTER TABLE `serialized_object` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tribe`
--

DROP TABLE IF EXISTS `tribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tribe` (
  `tribe_id` int(11) NOT NULL AUTO_INCREMENT,
  `retired` tinyint(4) NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`tribe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tribe`
--

LOCK TABLES `tribe` WRITE;
/*!40000 ALTER TABLE `tribe` DISABLE KEYS */;
/*!40000 ALTER TABLE `tribe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_property`
--

DROP TABLE IF EXISTS `user_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_property` (
  `user_id` int(11) NOT NULL DEFAULT '0',
  `property` varchar(100) NOT NULL DEFAULT '',
  `property_value` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`,`property`),
  CONSTRAINT `user_property` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_property`
--

LOCK TABLES `user_property` WRITE;
/*!40000 ALTER TABLE `user_property` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `user_id` int(11) NOT NULL DEFAULT '0',
  `role` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`role`,`user_id`),
  KEY `user_role` (`user_id`),
  CONSTRAINT `user_role` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `role_definitions` FOREIGN KEY (`role`) REFERENCES `role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'Provider'),(1,'System Developer');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` varchar(50) NOT NULL DEFAULT '',
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `salt` varchar(128) DEFAULT NULL,
  `secret_question` varchar(255) DEFAULT NULL,
  `secret_answer` varchar(255) DEFAULT NULL,
  `creator` int(11) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT '0002-11-30 00:00:00',
  `changed_by` int(11) DEFAULT NULL,
  `date_changed` datetime DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  `retired` tinyint(4) NOT NULL DEFAULT '0',
  `retired_by` int(11) DEFAULT NULL,
  `date_retired` datetime DEFAULT NULL,
  `retire_reason` varchar(255) DEFAULT NULL,
  `uuid` char(38) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_who_changed_user` (`changed_by`),
  KEY `user_creator` (`creator`),
  KEY `person_id_for_user` (`person_id`),
  KEY `user_who_retired_this_user` (`retired_by`),
  CONSTRAINT `person_id_for_user` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`),
  CONSTRAINT `user_creator` FOREIGN KEY (`creator`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_changed_user` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_who_retired_this_user` FOREIGN KEY (`retired_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','','731f205148c4d16aa4ada1e74544ddc27aac0f10226a330a25224f0f9dd16d1048a80ab8beecff6b03e088b3342070b01bb21fa3ec96dd77b90b3d2c7c1d1538','44057890d359ee9307fec4ebf797d493bb68fc0401543cd583272c239ceb8637087e001e735b97ead7dd793e6139d92cdbac47605a7b0db9672c501f096258b3',NULL,NULL,1,'2005-01-01 00:00:00',1,'2011-09-27 15:04:50',1,0,NULL,NULL,NULL,'1c43c0b0-edb4-11e0-a93d-196096cf4d13'),(2,'daemon','daemon',NULL,NULL,NULL,NULL,1,'2010-04-26 13:25:00',NULL,NULL,NULL,0,NULL,NULL,NULL,'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-10-03 17:10:24
