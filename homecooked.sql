-- MySQL dump 10.13  Distrib 5.7.17, for osx10.12 (x86_64)
--
-- Host: localhost    Database: homecooked
-- ------------------------------------------------------
-- Server version	5.7.17

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
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredients` (
  `ingredient_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `quantity` decimal(3,2) DEFAULT NULL,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'Carrots',4.00),(2,'Carrots',4.00);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mealplans`
--

DROP TABLE IF EXISTS `mealplans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mealplans` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `mealplan` mediumtext,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mealplans`
--

LOCK TABLES `mealplans` WRITE;
/*!40000 ALTER TABLE `mealplans` DISABLE KEYS */;
INSERT INTO `mealplans` VALUES (15,'[[{\"recipe_id\":\"19\",\"mealPosition\":0}],[],[],[],[],[],[]]');
/*!40000 ALTER TABLE `mealplans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipes` (
  `recipe_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `ingredients` mediumtext,
  `instructions` mediumtext,
  `recipe_image` varchar(8000) DEFAULT NULL,
  `serving_size` int(11) DEFAULT NULL,
  `cooking_time` varchar(256) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `blurb` mediumtext,
  PRIMARY KEY (`recipe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (14,'chicken parmesan',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,NULL,NULL,NULL,'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/22/78/2/pic4IW8Lh.jpg',NULL,NULL,NULL,NULL),(16,'Spaghetti',NULL,NULL,'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/22/78/2/pic4IW8Lh.jpg',NULL,NULL,NULL,NULL),(17,'Chicken Soup',NULL,NULL,'http://clv.h-cdn.co/assets/cm/15/10/1600x800/54f4a5bf1042a_-_chicken-noodle-soup-recipe.jpg',NULL,NULL,15,NULL),(18,'Lasagna',NULL,NULL,'https://static01.nyt.com/images/2015/10/15/dining/15RECIPE20DIN/15RECIPE20DIN-superJumbo.jpg',NULL,NULL,15,NULL),(19,'Ramen',NULL,NULL,'https://www.chowstatic.com/blog-media/2015/09/phpThumb_generated_thumbnail-17.jpeg',NULL,NULL,15,NULL),(20,'Sushi Bowl',NULL,NULL,'https://www.budgetbytes.com/wp-content/uploads/2016/06/Sushi-Bowls-Vs.jpg',NULL,NULL,15,NULL),(21,'Garlic Butter Shrimp','[{\"name\":\"Garlic\",\"quantity\":\"4\"},{\"name\":\"Butter\",\"quantity\":\"4\"},{\"name\":\"Shrimp\",\"quantity\":\"4\"}]','[{\"step\":\"Do stuff\"},{\"step\":\"cook it\"},{\"step\":\"eat it\"}]','http://damndelicious.net/wp-content/uploads/2014/04/IMG_5261edit.jpg',4,'40h',15,NULL),(22,'Beef Wellington','[{\"name\":\"Steak\",\"quantity\":\"1\"},{\"name\":\"Bread\",\"quantity\":\"1\"}]','[{\"step\":\"Put the steak in the bread\"},{\"step\":\"cook it\"}]','http://food.fnr.sndimg.com/content/dam/images/food/fullset/2008/12/30/0/TU0602_Beef-Wellington.jpg.rend.hgtvcom.1280.960.jpeg',4,'2h',15,'[object Object]'),(23,'Some salad','[{\"name\":\"Green things\",\"quantity\":\"10\"}]','[{\"step\":\"Throw em together\"}]','https://s-media-cache-ak0.pinimg.com/564x/20/6d/0a/206d0a27c4f3b5fcd4e5fe206f02602a.jpg',4,'30m',15,'You gotta eat healthy and stuff so eat this green stuff');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `profile_picture` varchar(256) DEFAULT NULL,
  `signup_date` date DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (15,'Daniel','sup','sup',NULL);
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

-- Dump completed on 2017-03-08 19:55:53
