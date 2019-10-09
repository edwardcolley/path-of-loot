-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 09, 2019 at 11:01 PM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `519wickedsales`
--

-- --------------------------------------------------------

--
-- Table structure for table `adverts`
--

CREATE TABLE `adverts` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `path` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `adverts`
--

INSERT INTO `adverts` (`id`, `path`) VALUES
(1, '/images/homeimage2.jpg'),
(2, '/images/homeimage3.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `product_id` mediumint(9) NOT NULL,
  `quantity` mediumint(9) NOT NULL,
  `sessionID` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_session`
--

CREATE TABLE `cart_session` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `session` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cart_session`
--

INSERT INTO `cart_session` (`id`, `session`) VALUES
(2, '2019-09-27 22:40:56');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `image` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `product_id` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `image`, `product_id`) VALUES
(1, '/images/chromatic.png', 1),
(2, '/images/chromatic2.png', 1),
(6, '/images/alchemy.png', 2),
(7, '/images/alchemy2.jpg', 2),
(10, '/images/jewellersorb.png', 3),
(12, '/images/jewllersorb2.jpeg', 3),
(15, '/images/regret.png', 4),
(16, '/images/regret2.jpg', 4),
(19, '/images/regal.png', 5),
(20, '/images/regal2.jpeg', 5),
(22, '/images/chaos.png', 6),
(23, '/images/chaos1.webp', 6),
(24, '/images/exalted.png', 7),
(25, '/images/exaltedorb.jpg', 7),
(26, '/images/mirror.png', 8),
(27, '/images/mirror2.jpeg', 8),
(29, '/images/shavswrappings1.png', 9),
(30, '/images/shavswrappings3.png', 9),
(31, '/images/bringerofrain1.png', 10),
(32, '/images/bringerofrain5.png', 10),
(33, '/images/rainbow1.png', 11),
(34, '/images/rainbow2.png', 11),
(35, '/images/atziri1.png', 12),
(36, '/images/atziri2.png', 12),
(37, '/images/headhunter1.png', 13),
(38, '/images/headhunter2.png', 13),
(39, '/images/facebreakers1.png', 14),
(40, '/images/facebreakers2.png', 14),
(41, '/images/mjolner.png', 15),
(42, '/images/mjolner.png', 15),
(43, '/images/windripper1.png', 16),
(44, '/images/windripper2.png', 16),
(45, '/images/karuiward1.png', 17),
(46, '/images/karuiward2.png', 17),
(47, '/images/ventors1.png', 18),
(48, '/images/ventors2.png', 18);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `price` mediumint(8) UNSIGNED NOT NULL,
  `image` varchar(90) COLLATE utf8_unicode_ci NOT NULL,
  `shortDescription` text COLLATE utf8_unicode_ci NOT NULL,
  `longDescription` text COLLATE utf8_unicode_ci NOT NULL,
  `product_id` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `shortDescription`, `longDescription`, `product_id`) VALUES
(1, 'Chromatic Orb', 2599, '/images/chromatic.png', 'Reforges the color of sockets on an item.', 'A Chromatic Orb is a currency item that can be used to re-roll the colour of sockets on a weapon or piece of armour.\r\n\r\nLike most currencies,  Chromatic Orbs can be dropped by monsters, chests, and containers. They also drop from Arcanist\'s Strongboxes.\r\n\r\nChromatic Orbs can also be obtained by vendoring an item with one socket of each colour (red, green, blue) linked together. This is one of the most common ways to Chromatic Orbs. ', 1),
(2, 'Orb of Alchemy', 3500, '/images/alchemy.png', 'Upgrades a normal item to a rare item with random modifiers.', 'Orb of Alchemy is a currency item that can be used to upgrade a piece of normal equipment to rare.\r\n\r\n\r\nOrb of Alchemy can also be obtained by combining 20 Alchemy Shards, which are in turn obtained by selling identified magic and rare items with certain modifiers to any vendor.\r\n\r\nAn Orb of Alchemy can be purchased from Clarissa in exchange for 1 Orb of Regret. ', 2),
(3, 'Jeweller\'s Orb', 1599, '/images/jewellersorb.png', 'Reforges the number of sockets on an item.', 'This currency will reforge the number of sockets on an item.\r\n\r\nA Jeweller\'s Orb is a currency item that can be used to re-roll the number of sockets on a weapon or piece of armour. The maximum number of sockets is still limited by the type of equipment and item level.\r\n\r\nJeweller\'s Orbs can be found from slain enemies and Arcanist\'s Strongboxes.', 3),
(4, 'Orb of Regret', 3333, '/images/regret.png', 'Grants a passive skill refund point.', 'Orb of Regret grant a passive skill refund point.\r\n\r\nOrb of Regret is a currency item that can be used to gain one passive skill refund point.\r\n\r\nSelling an Orb of Regret to a vendor along with any gem will provide a level 1 version of that gem regardless of its previous level.', 4),
(5, 'Regal Orb', 9900, '/images/regal.png', 'Upgrades a magic item to a rare item.', 'Regal Orb is a currency item that can be used to upgrade a piece of magic equipment to rare.\r\n\r\nThe current modifiers are all retained and one new random affix is added.\r\n\r\n Regal Orbs in softcore are uncommon currency items that can be dropped by monsters, chests, and destructible containers. They can also drop from Arcanist\'s Strongboxes.', 5),
(6, 'Chaos Orb', 12299, '/images/chaos.png', 'Reforges a rare item with new random modifiers.', 'Chaos Orbs reforge a rare item with new random properties.\r\n\r\nA Chaos Orb is a currency item that can be used to re-roll the random modifiers on a piece of rare equipment.\r\n\r\nChaos Orbs are uncommon currency items that can be dropped by slain monsters, chests, and destructible containers. They can easily drop from Arcanist\'s Strongboxes.', 6),
(7, 'Exalted Orb', 29999, '/images/exalted.png', 'Enchants a rare item with a new random property.', 'Exalted Orb will enchant a rare item with a new random property.\r\n\r\nExalted Orbs are extremely rare currency items that can be dropped by monsters, chests, and destructible containers. They can drop from Arcanist\'s Strongboxes.\r\n\r\nUnlike most other currency, these orbs can\'t be obtained through vendors.', 7),
(8, 'Mirror of Kalandra', 199999, '/images/mirror.png', 'Creates a mirrored copy of an item.', 'Mirror of Kalandra can create a mirrored copy of an item.\r\n\r\nA Mirror of Kalandra (often refered to as just Mirror) is a currency item that can be used to create a mirrored duplicate of any piece of non-unique equipment, non-corrupted item, or map that is not itself a duplicate. It resembles the Path of Exile logo.\r\n\r\nThe duplicate is identical to the original, except it cannot be modified with currency items in any way. It is labeled as a mirrored item and its image is reversed. Like regular items, there is no restriction on duplicates being dropped, traded, or sold to vendors.\r\n\r\nMirrors of Kalandra are the rarest and most valuable currency items in the game.\r\n\r\nThey can be dropped by slain monsters, chests, and destructible containers (including Arcanist\'s Strongboxes). They are over a thousand times rarer than Exalted Orbs, and only a tiny fraction of players will ever find one as a drop.', 8),
(9, 'Shavronne\'s Wrappings', 69900, '/images/shavswrappings1.png', 'Shavronne\'s Wrappings is a great unique Occultist Vestment item in Path of Exile.', 'You can buy this with random properties and stats.\r\n\r\nIf you are interested in a high roll, full link or specific socket colors, ask us on 24/7 live chat.\r\nWe usually keep stock of Shavronne\'s Wrappings.', 9),
(10, 'Bringer of Rain', 25595, '/images/bringerofrain1.png', 'The Bringer of Rain is a great unique Nightmare Bascinet item in Path of Exile.', 'You can buy this with random properties and stats.\r\n\r\nIf you are interested in a high roll, full link or specific socket colors, ask us on 24/7 live chat.\r\nWe usually keep stock of The Bringer of Rain.', 10),
(11, 'Rainbowstride', 7999, '/images/rainbow1.png', 'Rainbowstride is a great unique Conjurer Boots item in Path of Exile.', 'You can buy this with random properties and stats.\r\n\r\nIf you are interested in a high roll, full link or specific socket colors, ask us on 24/7 live chat.\r\nWe usually keep stock of Rainbowstride.', 11),
(12, 'Atziri\'s Acuity', 99999, '/images/atziri1.png', 'Atziri\'s Acuity is a great unique Vaal Gauntlets item in Path of Exile.', 'You can buy this with random properties and stats.\r\n\r\nIf you are interested in a high roll, full link or specific socket colors, ask us on 24/7 live chat.\r\nWe usually keep stock of Atziri\'s Acuity.', 12),
(13, 'Headhunter', 89999, '/images/headhunter1.png', 'Headhunter is a great unique Leather Belt item in Path of Exile.', 'You can buy this with random properties and stats.\r\n\r\nIf you are interested in a high roll, full link or specific socket colors, ask us on 24/7 live chat.\r\nWe usually keep stock of Headhunter.', 13),
(14, 'Facebreakers', 1599, '/images/facebreakers1.png', 'Facebreaker is a great unique Strapped Mitts item in Path of Exile.', 'You can buy this with random properties and stats.\r\n\r\nIf you are interested in a high roll, full link or specific socket colors, ask us on 24/7 live chat.\r\nWe usually keep stock of Facebreaker.', 14),
(15, 'Mjölner', 8999, '/images/mjolner.png', 'Mjölner is a great unique Gavel item in Path of Exile.', 'You can buy this with random properties and stats.\r\n\r\nIf you are interested in a high roll, full link or specific socket colors, ask us on 24/7 live chat.\r\nWe usually keep stock of Mjölner.', 15),
(16, 'Windripper', 39999, '/images/windripper1.png', 'Windripper is a great unique Imperial Bow item in Path of Exile.', 'You can buy this with random properties and stats.\r\n\r\nIf you are interested in a high roll, full link or specific socket colors, ask us on 24/7 live chat.\r\nWe usually keep stock of Windripper.\r\n', 16),
(17, 'Karui Ward', 199, '/images/karuiward1.png', 'Karui Ward is a great unique Jade Amulet item in Path of Exile.', 'You can buy this with random properties and stats.\r\n\r\nIf you are interested in a high roll, full link or specific socket colors, ask us on 24/7 live chat.\r\nWe usually keep stock of Karui Ward.', 17),
(18, 'Ventor\'s Gamble', 1299, '/images/ventors1.png', 'Ventor\'s Gamble is a great unique Gold Ring item in Path of Exile.', 'You can buy this with random properties and stats.\r\n\r\nIf you are interested in a high roll, full link or specific socket colors, ask us on 24/7 live chat.\r\nWe usually keep stock of Ventor\'s Gamble.', 18);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adverts`
--
ALTER TABLE `adverts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_session`
--
ALTER TABLE `cart_session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adverts`
--
ALTER TABLE `adverts`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
--
-- AUTO_INCREMENT for table `cart_session`
--
ALTER TABLE `cart_session`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
