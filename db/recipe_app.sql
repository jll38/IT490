-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: recipe_app
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Forum_Comments`
--

DROP TABLE IF EXISTS `Forum_Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Forum_Comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Forum_Comments`
--

LOCK TABLES `Forum_Comments` WRITE;
/*!40000 ALTER TABLE `Forum_Comments` DISABLE KEYS */;
INSERT INTO `Forum_Comments` VALUES (1,2,3,'I love vegetarian recipes too!','2024-03-25 10:00:00'),(2,3,4,'Stir fry is my favorite, thanks for the recipe.','2024-03-25 10:05:00'),(3,4,5,'Salad is perfect for my diet!','2024-03-25 10:10:00'),(4,5,1,'Tacos on Friday are a must!','2024-03-25 10:15:00'),(5,6,2,'The roast beef was a hit at dinner!','2024-03-25 10:20:00'),(6,2,3,'I love vegetarian recipes too!','2024-03-25 10:00:00'),(7,3,4,'Stir fry is my favorite, thanks for the recipe.','2024-03-25 10:05:00'),(8,4,5,'Salad is perfect for my diet!','2024-03-25 10:10:00'),(9,5,1,'Tacos on Friday are a must!','2024-03-25 10:15:00'),(10,6,2,'The roast beef was a hit at dinner!','2024-03-25 10:20:00');
/*!40000 ALTER TABLE `Forum_Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Forum_Posts`
--

DROP TABLE IF EXISTS `Forum_Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Forum_Posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Forum_Posts`
--

LOCK TABLES `Forum_Posts` WRITE;
/*!40000 ALTER TABLE `Forum_Posts` DISABLE KEYS */;
INSERT INTO `Forum_Posts` VALUES (1,1,'Best Bolognese Recipe?','Looking for tips to improve my Bolognese.','2024-03-25 12:00:00'),(2,2,'Vegetarian Meal Prep Ideas','Need suggestions for easy vegetarian meals for the week.','2024-03-25 12:30:00'),(3,3,'Post Workout Meals','What are your favorite meals after a workout?','2024-03-25 13:00:00'),(4,1,'chicken breast recipe','this is fire','2024-03-24 16:33:01');
/*!40000 ALTER TABLE `Forum_Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ingredients`
--

DROP TABLE IF EXISTS `Ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ingredients` (
  `ingredient_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `recipe_id` int DEFAULT NULL,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ingredients`
--

LOCK TABLES `Ingredients` WRITE;
/*!40000 ALTER TABLE `Ingredients` DISABLE KEYS */;
INSERT INTO `Ingredients` VALUES (1,'Basil','Herb',1),(2,'Olive Oil','Condiment',2),(3,'Beef','Meat',2),(4,'Lettuce','Vegetable',4),(5,'Tortilla','Grain',5),(6,'Basil','Herb',1),(7,'Olive Oil','Condiment',2),(8,'Beef','Meat',2),(9,'Lettuce','Vegetable',4),(10,'Tortilla','Grain',5);
/*!40000 ALTER TABLE `Ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ratings`
--

DROP TABLE IF EXISTS `Ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ratings` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`rating_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ratings`
--

LOCK TABLES `Ratings` WRITE;
/*!40000 ALTER TABLE `Ratings` DISABLE KEYS */;
INSERT INTO `Ratings` VALUES (1,3,3,5),(2,4,4,4),(3,5,5,3),(4,1,2,2),(5,2,1,5),(6,3,3,5),(7,4,4,4),(8,5,5,3),(9,1,2,2),(10,2,1,5),(11,3,1,0),(12,1,1,0);
/*!40000 ALTER TABLE `Ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipes`
--

DROP TABLE IF EXISTS `Recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recipes` (
  `recipe_id` int NOT NULL AUTO_INCREMENT,
  `recipe_name` varchar(255) NOT NULL,
  `instructions` text NOT NULL,
  `cuisine` varchar(50) DEFAULT NULL,
  `diet_type` varchar(50) DEFAULT NULL,
  `preparation_time` int DEFAULT NULL,
  `cooking_time` int DEFAULT NULL,
  `views` int DEFAULT '0',
  `calories` int DEFAULT NULL,
  `protein` decimal(5,2) DEFAULT NULL,
  `fat` decimal(5,2) DEFAULT NULL,
  `carbs` decimal(5,2) DEFAULT NULL,
  `image_url` text,
  PRIMARY KEY (`recipe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipes`
--

LOCK TABLES `Recipes` WRITE;
/*!40000 ALTER TABLE `Recipes` DISABLE KEYS */;
INSERT INTO `Recipes` VALUES (1,'Chicken Alfredo','Boil pasta. Cook chicken. Mix with sauce. Serve.','Italian','None',15,20,10,600,40.00,25.00,50.00,'https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-bowl.jpg'),(2,'Roast Beef','Season beef. Roast in oven. Slice and serve.','American','None',10,90,5,700,60.00,40.00,0.00,'https://hips.hearstapps.com/hmg-prod/images/delish-roast-beef-horizontal-1540505165.jpg?crop=1xw:0.84375xh;center,top'),(3,'Tofu Stir Fry','Chop veggies. Saute tofu. Mix with sauce and veggies.','Asian','Vegan',10,15,15,400,20.00,10.00,35.00,'https://rainbowplantlife.com/wp-content/uploads/2023/01/tofu-stir-fry-cover-photo-1-of-1.jpg');
/*!40000 ALTER TABLE `Recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `onboarding_complete` tinyint(1) NOT NULL DEFAULT '0',
  `dietary_restrictions` varchar(255) DEFAULT NULL,
  `TDEE` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'chefmike','chefmike@example.com','password_hash_1','salt1',1,'None',2500),(2,'foodiejen','foodiejen@example.com','password_hash_2','salt2',1,'Gluten Free',2200),(3,'veggiebeth','veggiebeth@example.com','password_hash_3','salt3',0,'Vegan',2000),(4,'chefmike2','test@test.com','password_hash_1',NULL,0,NULL,NULL),(5,'chefmike4','test2@test.com','password_hash_1',NULL,0,NULL,NULL),(6,'chefmike7','test5@teat.com','password_hash_1',NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 18:46:35
