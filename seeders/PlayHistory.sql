# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.17)
# Database: spotify
# Generation Time: 2018-11-25 23:39:36 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table PlayHistories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PlayHistories`;

CREATE TABLE `PlayHistories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` varchar(255) NOT NULL,
  `item_type` enum('album','playlist') NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `PlayHistories` WRITE;
/*!40000 ALTER TABLE `PlayHistories` DISABLE KEYS */;

INSERT INTO `PlayHistories` (`id`, `item_id`, `item_type`, `item_name`, `createdAt`, `updatedAt`)
VALUES
  (1,'37i9dQZF1DX71VcjjnyaBQ','playlist','Good Morning Jazz','2018-11-25 20:11:42','2018-11-25 20:11:42'),
  (2,'37i9dQZF1DWVzZlRWgqAGH','playlist','Butter','2018-11-25 21:27:06','2018-11-25 21:27:06'),
  (3,'37i9dQZF1DWVqfgj8NZEp1','playlist','Coffee Table Jazz','2018-11-25 21:29:55','2018-11-25 21:29:55'),
  (4,'37i9dQZF1DWTbzY5gOVvKd','playlist','Jazzy Romance','2018-11-25 21:33:31','2018-11-25 21:33:31'),
  (5,'4H33kRcag5kkSykJ7KllJe','album','Can’t Knock The Hustle / Zombie Bastards (from the Black Album)','2018-11-25 21:50:41','2018-11-25 21:50:41'),
  (6,'37i9dQZF1DWXJyjYpHunCf','playlist','Folk Pop','2018-11-25 22:41:23','2018-11-25 22:41:23'),
  (7,'53mCG3mQnybqhQfgH5ULUK','album','Breakfast At Tiffany\'s (50th Anniversary Edition)','2018-11-25 22:42:49','2018-11-25 22:42:49'),
  (8,'3Z72KfamjH9Wc5m9mgVqI7','album','Crash','2018-11-25 22:48:42','2018-11-25 22:48:42'),
  (9,'3UbZpNuMgdga6UgSp9T2xT','album','...und Tschüss (Das letzte Album)','2018-11-25 22:50:58','2018-11-25 22:50:58'),
  (10,'3FU1R1Z2BpkQJbnZnh4vyV','album','Control (feat. Bryce Vine ','2018-11-25 23:15:40','2018-11-25 23:15:40'),
  (11,'7GaAXgbFSpcJOiLlFGYyOL','album','Feels Like Home','2018-11-25 23:16:02','2018-11-25 23:16:02');

/*!40000 ALTER TABLE `PlayHistories` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
