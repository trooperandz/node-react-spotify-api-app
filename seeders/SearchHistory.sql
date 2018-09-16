# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.17)
# Database: spotify
# Generation Time: 2018-09-16 05:14:31 +0000
# ************************************************************


# Dump of table SearchHistories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SearchHistories`;

CREATE TABLE `SearchHistories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `search_term` varchar(255) NOT NULL,
  `search_type` enum('album') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `SearchHistories` WRITE;
/*!40000 ALTER TABLE `SearchHistories` DISABLE KEYS */;

INSERT INTO `SearchHistories` (`id`, `search_term`, `search_type`, `createdAt`, `updatedAt`)
VALUES
	(1,'dave matthews','album','2018-09-16 12:00:00','2018-09-16 12:00:00'),
	(2,'norah jones','album','2018-09-16 12:00:00','2018-09-16 12:00:00'),
	(3,'alice in chains','album','2018-09-16 12:00:00','2018-09-16 12:00:00'),
	(4,'nick drake','album','2018-09-16 12:00:00','2018-09-16 12:00:00'),
	(5,'miles davis','album','2018-09-16 12:00:00','2018-09-16 12:00:00'),
	(6,'george shearing','album','2018-09-16 12:00:00','2018-09-16 12:00:00'),
	(7,'oscar peterson','album','2018-09-16 12:00:00','2018-09-16 12:00:00'),
	(8,'ben harper','album','2018-09-16 12:00:00','2018-09-16 12:00:00');

UNLOCK TABLES;
