-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Aug 24, 2021 at 08:30 AM
-- Server version: 5.7.26
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `birdyeepbd`
--
CREATE DATABASE IF NOT EXISTS `birdyeepbd` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `birdyeepbd`;

-- --------------------------------------------------------

--
-- Table structure for table `Posts`
--

CREATE TABLE `Posts` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `user` int(11) NOT NULL,
  `tag` int(11) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Posts`
--

INSERT INTO `Posts` (`id`, `text`, `user`, `tag`, `image`) VALUES
(2, 'my first message!', 1, NULL, NULL),
(3, 'this is another message!', 1, NULL, NULL),
(4, 'travelling through the world on a matchbox!', 1, 4, NULL),
(6, 'post made by the best', 2, 2, NULL),
(7, 'more text for test', 1, NULL, NULL),
(8, 'and yet more text with stuff', 1, 3, NULL),
(9, 'more text for test', 1, 2, NULL),
(10, 'and yet more text with stuff', 1, 3, NULL),
(32, 'one more for the test', 1, 3, NULL),
(33, 'more text with data', 1, 1, NULL),
(34, 'one more for the test', 1, 3, NULL),
(50, 'brbvebve', 1, 38, 'bird3.jpg'),
(58, 'monomongo 64', 1, 39, '12bird4.jpg'),
(60, 'this is the first pic of a cat but is a bird because i dont have cat pics', 17, NULL, '14e35e0399ee1745b170f747dba7bc19bird4.jpg'),
(80, 'this works fine!', 17, NULL, ''),
(81, 'vwvw', 17, 63, ''),
(82, 'undefined', 17, 52, ''),
(83, 'vww', 17, 60, ''),
(84, 'vwewv', 17, 61, ''),
(85, 'rwvwv', 17, 64, ''),
(86, 'vewvwe', 17, 61, ''),
(87, 'vewewv', 17, 63, ''),
(88, 'Now it is fine', 17, 66, ''),
(89, 'vwrw', 17, 67, ''),
(90, 'rwevwvw', 17, 68, ''),
(91, 'vwervwv', 17, 63, ''),
(92, 'inserting22', 17, 52, ''),
(93, 'inserting2333333', 17, 69, ''),
(94, 'NOOOOOOOOOOOOOOOOOOOOOOOOOOO', 17, 70, ''),
(95, 'This is the first message of...', 18, 73, 'eeccb432124883ef1e9f79c97f9634c0bird4.jpg'),
(96, 'Another message....', 18, 74, ''),
(97, 'one more message', 18, 79, '');

-- --------------------------------------------------------

--
-- Table structure for table `Tags`
--

CREATE TABLE `Tags` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Tags`
--

INSERT INTO `Tags` (`id`, `name`) VALUES
(1, 'cooking'),
(2, 'love'),
(3, 'travel'),
(4, 'love33'),
(5, 'love334'),
(6, 'love3345'),
(7, 'love33456'),
(32, 'music'),
(34, 'BirdYeep'),
(35, 'besrb'),
(37, 'Owl'),
(38, 'MyBuho'),
(39, 'Monkey'),
(40, 'CatBirds'),
(41, 'besbs'),
(42, 'vberbe3'),
(43, 'webw'),
(44, 'bwrbvw'),
(45, 'bwrbvw33'),
(46, ''),
(47, '22bwrbvw'),
(48, '22bwrbvw22'),
(49, '22bwrbvw22W'),
(50, '22bwrbvw22Wee'),
(51, 'NormalTag'),
(52, 'undefined'),
(53, 'vwrevwr'),
(54, 'waaa'),
(55, 'Nope'),
(56, 'ecve'),
(57, 'vwrv'),
(58, 'vwvw'),
(59, 'vw'),
(60, 'vewvwe'),
(61, 'vwevw'),
(62, 'cvwecvwe'),
(63, 'vwevwe'),
(64, 'vrwvw'),
(65, 'YesWork'),
(66, 'vrewvwer'),
(67, 'vwrvw'),
(68, 'vwevew'),
(69, 'evcws'),
(70, 'VS'),
(71, 'myfirstatg'),
(73, 'CodeLove'),
(74, 'moreStuff'),
(75, 'TagsLove'),
(76, 'cookingPower'),
(77, 'Forever'),
(78, 'ForeverOne'),
(79, 'ForeverOnePlus');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL DEFAULT '',
  `email` varchar(40) NOT NULL DEFAULT '',
  `password` varchar(40) NOT NULL DEFAULT '',
  `identifier` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `user_name`, `email`, `password`, `identifier`) VALUES
(1, 'pedroLoco22', 'pedro@test.test', '827ccb0eea8a706c4c34a16891f84e7b', '12'),
(2, 'Joana', 'joana@test.test', '827ccb0eea8a706c4c34a16891f84e7b', '123'),
(3, 'theist', 'vwvwr@fbvwv.com', '827ccb0eea8a706c4c34a16891f84e7b', '123456789'),
(5, 'test', 'pedro2@test.test', '827ccb0eea8a706c4c34a16891f84e7b', ''),
(7, 'test', 'pedro22@test.test', '827ccb0eea8a706c4c34a16891f84e7b', 'bcee39f6dff776658c50a62da0811086'),
(14, 'pedrop', 'pedro@work.es', '827ccb0eea8a706c4c34a16891f84e7b', 'd03d44f3dc07ba7a708c39f017437534'),
(15, 'pedro3', 'pedro3@work.es', '827ccb0eea8a706c4c34a16891f84e7b', 'ff2dfa18444ee4b504145349431c5fcf'),
(16, 'pepe', 'uiyhbuybuy@hjknbuhi.es', '202cb962ac59075b964b07152d234b70', 'eeaa97642c929126832543ab7c95d496'),
(17, 'maybeCat', 'cat@test.com', 'e10adc3949ba59abbe56e057f20f883e', '14e35e0399ee1745b170f747dba7bc19'),
(18, 'pedroDevSuperMega', 'pedro@dev.com', 'e511341dc05782269d3d859b5ff3939b', 'eeccb432124883ef1e9f79c97f9634c0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `tag` (`tag`);

--
-- Indexes for table `Tags`
--
ALTER TABLE `Tags`
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `id` (`id`) USING BTREE;

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_2` (`id`) USING BTREE,
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `Tags`
--
ALTER TABLE `Tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`tag`) REFERENCES `Tags` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
