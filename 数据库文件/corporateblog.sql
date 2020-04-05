-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: corporateblog
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_author` varchar(45) NOT NULL,
  `article_title` varchar(45) NOT NULL,
  `article_synopsis` varchar(45) NOT NULL,
  `article_content` varchar(10000) NOT NULL,
  `createtime` varchar(45) DEFAULT NULL,
  `updatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (28,'libai','怎样学好JavaScript','最近在学习js时常常感到疑惑，所以总结心得体会','从基础学起，一步步来，多看书','2019/9/30 下午2:45:01',NULL),(29,'hanxin','关于学习nodejs心得体会','最近学习nodejs有一些 收获跟大家分享一些','学习node最重要的是，回调函数，几乎每一步都需要回调函数，所以回调函数很重要','2019/9/30 下午2:49:21',NULL),(30,'luban','运维该怎么做呢','并不知道运维是什么','不晓得','2019/9/30 下午2:50:34',NULL),(31,'daji','关于测试的吐槽','测试时遇到的一些事，跟大家吐槽一下','最近测试的时候，发现bug，开发总甩锅，说理想的效果就是这样的，我信你个鬼','2019/9/30 下午2:52:47',NULL),(32,'admin','下午开个会','关于产品进度','最近产品进度跟不上，也不晓得是咋回事','2019/9/30 下午2:54:14',NULL),(33,'admin','有些人总偷懒','某些人就不知道好好干 ，对产品负责','最近在巡查的时候总看见有人搁那偷偷的玩手机，就不好好工作，再玩手机把你手机没收了','2019/9/30 下午2:57:09',NULL),(34,'libai','我没偷懒','我都是在好好工作','我上班从不玩手机','2019/9/30 下午2:58:40',NULL),(35,'hanxin','我也没偷懒','我也是在好好工作','我也上班从不玩手机','2019/9/30 下午2:59:38',NULL),(36,'luban','我也不会偷懒','我也都是在好好工作','我也不会在上班的时候玩手机','2019/9/30 下午3:00:59',NULL),(37,'daji','我更不会偷懒','我更加好好上班','我更加不会在上班的时候玩手机','2019/9/30 下午3:01:57',NULL),(38,'admin','到底是谁偷懒呢','每个人都说自己没有偷懒，那到底是谁偷懒呢','其实谁偷懒我都看见了，以后好好干，我还是一样重视你们的','2019/9/30 下午3:03:57',NULL);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_cname` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `user_password` varchar(45) NOT NULL,
  `user_department` varchar(45) NOT NULL,
  `user_role` varchar(45) DEFAULT NULL,
  `article_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'李白','libai','libai','IT部','前端工程师',5),(2,'韩信','hanxin','hanxin','IT部','后端工程师',7),(15,'鲁班','luban','luban','IT部','运维工程师',6),(33,'妲己','daji','daji','IT部','测试工程师',8),(36,'管理员','admin','123456','IT部','产品经理',3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-30 15:12:26
