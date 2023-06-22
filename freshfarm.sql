-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2022 at 06:17 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freshfarm`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(60) NOT NULL,
  `mobile` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`email`, `password`, `name`, `mobile`) VALUES
('admin@yahoo.com', '123', 'John Doe', '1234567898'),
('inder@yahoo.com', 'inder', 'inder', '7873637449'),
('simran@gmail.com', 'simran', 'simran', '9874561230'),
('taran@yahoo.com', 'taran', 'taran', '9646781240'),
('user@yahoo.com', '456', 'Adam', '9874561203');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_logo` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_logo`) VALUES
(30, 'Vegetable', 'assets/images/category/category-1.png'),
(32, 'Diary', 'assets/images/category/category-2.png'),
(35, 'Fruits', 'assets/images/category/img_1.png');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `grand_total` varchar(10) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `payment_mode` varchar(10) NOT NULL,
  `city` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `address` text NOT NULL,
  `remarks` text DEFAULT NULL,
  `order_status` varchar(50) NOT NULL,
  `tracking_id` varchar(60) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `tracking_url` varchar(100) DEFAULT NULL,
  `person_received` varchar(60) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `ref_id` varchar(100) DEFAULT NULL,
  `payment_status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `grand_total`, `date_time`, `payment_mode`, `city`, `pincode`, `address`, `remarks`, `order_status`, `tracking_id`, `company_name`, `tracking_url`, `person_received`, `username`, `ref_id`, `payment_status`) VALUES
(21, '900', '2022-08-09 07:18:08', 'Online', 'Amritsar', '143001', '909/X/17\r\nKatra Mohar Singh', NULL, 'Delivered', '12345', 'Fedex', 'qwerty', 'hlo', 'user@123', NULL, 'Complete'),
(22, '900', '2022-08-09 07:18:44', 'Online', 'Amritsar', '143001', '909/X/17\r\nKatra Mohar Singh', NULL, 'Cancelled', NULL, NULL, NULL, NULL, 'user@123', NULL, 'Complete'),
(23, '1800', '2022-08-09 07:43:49', 'Online', 'Amritsar', '143001', '909/X/17\r\nKatra Mohar Singh', NULL, 'Cancelled', NULL, NULL, NULL, NULL, 'user@123', 'pay_K3SNMxnevu94fC', 'Complete'),
(24, '170', '2022-09-05 08:42:46', 'COD', 'Amritsar', '143001', 'Amritsar', 'hsdfje', 'Shipped', '651', 'hlo', ',mn', NULL, 'admin@123', NULL, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `details_id` int(11) NOT NULL,
  `price` varchar(10) NOT NULL,
  `discount` varchar(10) NOT NULL,
  `discounted_price` varchar(10) NOT NULL,
  `quantity` varchar(5) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`details_id`, `price`, `discount`, `discounted_price`, `quantity`, `product_id`, `order_id`) VALUES
(19, '1000', '10', '900', '1', 1, 21),
(20, '1000', '10', '900', '1', 1, 22),
(21, '1000', '10', '900', '2', 1, 23),
(22, '40', '15', '34', '5', 9, 24);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `photo` varchar(150) NOT NULL,
  `price` varchar(10) NOT NULL,
  `discount` varchar(10) NOT NULL,
  `description` text NOT NULL,
  `subcategory_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `photo`, `price`, `discount`, `description`, `subcategory_id`) VALUES
(6, 'Coriander Leaves', 'products/coriander bunch(dhaniya).jpg', '25', '5', 'Coriander Leaves (Dhaniya) ', 13),
(7, 'CURRY LEAVES', 'products/Curry-leaf.jpg', '20', '15', 'Curry Leaves', 13),
(8, 'Green Basil leaves', 'products/Green basil leaves.jpg', '30', '10', 'Green Basil leaves', 13),
(9, 'Spinach', 'products/Spinach.jpg', '40', '15', 'Spinach ( Palak )', 13),
(10, 'Mint Leaves', 'products/Mint leaves pudina.png', '45', '5', 'Mint Leaves (Pudina)', 13),
(11, 'Bitter', 'products/bitter gourd(Karela).jpg', '50', '10', 'Bitter (karela)', 14),
(12, 'Bottlet ', 'products/Bottlet gOurd(lauki).jpg', '45', '5', 'Bottlet ( Lauki)', 14),
(13, 'Bottlet', 'products/Calabash,bottleGourd.jpg', '50', '5', 'Bottlet (Kaddu)', 14),
(14, 'Parval', 'products/Pointed Gourd(Parval).png', '50', '5', 'Parval', 14),
(15, 'Turai', 'products/Ridge Gourd(Turai).png', '54', '6', 'Turai', 14),
(16, 'Kundru', 'products/Ivy Gourd(kundru).png', '43', '7', 'Kundru', 14),
(17, 'Arroweoot', 'products/Arrowroot,Â Tapioca.jpg', '21', '0', 'Arrowroot', 12),
(18, 'Beetroot', 'products/beetroot(chukandar).jpg', '63', '7', 'Beetroot ( Chukandar )', 14),
(19, 'Garlic', 'products/garlic lehsun.png', '30', '10', 'garlic (Lehsun)', 12),
(20, 'Colocasia ', 'products/colocasia(arbi).png', '54', '12', 'Colocasia(Arbi)', 12),
(21, 'Ginger', 'products/Ginger(adrak).png', '30', '2', 'Ginger(Adrak)', 12),
(22, 'Raw Turmeric', 'products/raw turmeric kachi haldi.png', '80', '12', 'Raw Turmeric (Kachi Haldi )', 16),
(23, 'Red Potato', 'products/Red Potato(Lal aloo).png', '34', '4', 'Red Potato Lal Aloo', 12),
(24, 'Sweet potato', 'products/sweet potato.png', '53', '15', 'Sweet Potato', 12),
(25, 'Baby Potato', 'products/Baby Potato((chota aloo).png', '23', '6', 'Baby Potato (chota aloo)', 12),
(26, 'Red Onion', 'products/redonion(pyaz).jpg', '45', '5', 'Red Onion (pyaz)', 12),
(27, 'Spring Onion', 'products/SpringOnion.jpg', '25', '12', 'Spring Onion', 12),
(28, 'Avocado', 'products/avocado.png', '45', '6', 'Avocado', 16),
(29, 'Brinjal', 'products/brinjal(Baingan).jpg', '46', '6', 'Brinjal (Baingan)', 16),
(30, 'Brocolie', 'products/brocolie.jpg', '23', '3', 'Brocolie', 16),
(31, 'Cabbage', 'products/cabbage(PAtta gobhi.jpg', '65', '2', 'Cabbage ( patta  gobhi)', 16),
(32, 'Cauliflower', 'products/cauliflower.jpg', '23', '3', 'Cauliflower', 16),
(33, 'Corn', 'products/corn.jpg', '30', '9', 'Corn', 16),
(34, 'Cucumber (kheera)', 'products/cucumber(Kheera).jpg', '32', '12', 'Kheera ( Cucumber)', 16),
(35, 'Fansini', 'products/fansini.jpg', '65', '15', 'fansini', 16),
(36, 'Green Chilli', 'products/green chilli hari mirch.jpg', '35', '5', 'Green Chilli', 16),
(37, 'Green Garlic', 'products/greenGarlic.jpg', '25', '12', 'Green garlic', 12),
(38, 'Ladyfinger', 'products/ladyfinger(Bhindi).jpg', '45', '3', 'Ladyfinger(bhindi)', 16),
(39, 'Lemon', 'products/lemon(Nimbu).jpg', '30', '0', 'Lemon', 16),
(40, 'Pumkin', 'products/pumkin.jpg', '33', '2', 'Pumkin', 16),
(41, 'Radish', 'products/radish.jpg', '40', '2', 'Radish', 12),
(42, 'Turnip', 'products/turnip.jpg', '50', '12', 'Turnip', 12),
(43, 'Baby Corn', 'products/baby corn packet.png', '25', '', 'baby corn', 16),
(44, 'Organic Beetroot', 'products/beetroot(chukandar) og.png', '65', '12', 'Organic Beetroot', 16),
(45, 'Cluster Beans', 'products/Cluster beans(Gawar Phali).png', '35', '4', 'Cluster Beans (gawar phali)', 16),
(46, 'Drumsticks', 'products/drumstick.png', '34', '3', 'Drumsticks', 16),
(47, 'Lemon grass', 'products/emon grass.png', '56', '4', 'Lemon grass', 16),
(48, 'French Beans', 'products/french Beans.png', '66', '6', 'French Beans', 16),
(49, 'Peas', 'products/Green peas(matar).png', '45', '3', 'Peas', 16),
(50, 'Green Pumpkin', 'products/Green Pumpkin (Hara Kaddu).png', '56', '', '', 16),
(51, 'Mushroom', 'products/Mushroom.png', '24', '1', 'Mushroom', 16),
(52, 'Picadoor Chilli', 'products/picadoor chilli.png', '35', '12', 'Picadoor Chilli', 16),
(53, 'Yellow Capsicum', 'products/yellow capsicum.png', '45', '3', 'Yellow Capsicum', 16),
(54, 'Tomato', 'products/Tomato.jpg', '45', '3', 'Tomato', 16),
(55, 'Cherry Tomato', 'products/cherry tomato.png', '23', '0', 'Cherry Tomato', 16),
(59, 'Amla', 'products/amla.jpg', '100', '10', 'Amla', 23),
(60, 'Apricot', 'products/Apricot.jpg', '90', '10', 'Apricot', 23),
(61, 'Banana (Kela)', 'products/Banana (Kela).png', '50', '20', 'Banana ( Kela )', 23),
(62, 'Bartlett Pear', 'products/Bartlett Pear.png', '40', '2', 'Bartlett Pear', 23),
(63, 'Black Mulberry', 'products/Black Mulberry.jpg', '60', '6', 'Black Mulberry', 23),
(64, 'Brown Coconut (Nariyal)', 'products/Brown Coconut (Nariyal).png', '30', '2', 'Brown Coconut (Nariyal)', 23),
(65, 'Craneberries', 'products/craneberries.jpg', '60', '4', 'Craneberries', 23),
(66, 'Custard Apple', 'products/Custrad Apple.jpg', '64', '15', 'Custard Apple', 23),
(67, 'Damson plum', 'products/Damson plum.jpg', '55', '5', 'Damson plum', 23),
(68, 'Dragon', 'products/Dragon.jpg', '150', '10', 'Dragon', 23),
(69, 'Elderberry', 'products/elderberry.jpg', '89', '5', 'Elderberry', 23),
(70, 'Fig', 'products/fig.jpg', '68', '4', 'Fig', 23),
(71, 'Gooseberry', 'products/Gooseberry.jpg', '160', '10', 'Gooseberry', 23),
(72, 'Grape Fruit', 'products/Grapefruit.jpg', '99', '2', 'Grape Fruit', 23),
(73, 'Grapes', 'products/Grapes.jpg', '60', '5', 'Grapes', 23),
(74, 'Green Grapes', 'products/Green Grapes.png', '56', '4', 'Green Grapes', 23),
(75, 'Grewia', 'products/grewia.jpg', '78', '6', 'Grewia', 23),
(76, 'Guava', 'products/Guava.png', '45', '1', 'Guava', 23),
(77, 'Jamun', 'products/Jamun.jpg', '50', '5', 'Jamun', 23),
(78, 'Kiwi (Kevee)', 'products/Kiwi (Keevee).png', '64', '2', 'Kiwi (Kevee)', 23),
(79, 'Lady Pink Apple', 'products/Lady Pink Apple.png', '160', '22', 'Lady Pink Apple', 23),
(80, 'Lychee', 'products/lychee.jpg', '89', '5', 'Lychee', 23),
(81, 'Mango', 'products/mANGO.jpg', '79', '5', 'Mango', 23),
(82, 'Muskmelon (Kharbuja)', 'products/Muskmelon (Kharbuja).png', '78', '4', 'Muskmelon (Kharbuja)', 23),
(83, 'Olive', 'products/olive.jpg', '146', '21', 'Olive', 23),
(84, 'Papaya ( Papita )', 'products/Papaya (Papita).png', '56', '2', 'Papaya ( Papita )', 23),
(85, 'Peaches', 'products/Peaches.jpg', '64', '6', 'Peaches', 23),
(86, 'Pear (Nashpati)', 'products/Pear (Nashpati).png', '45', '2', 'Pear (Nashpati)', 23),
(87, 'Pear Beauty', 'products/Pear Beauty.png', '65', '10', 'Pear Beauty', 23),
(88, 'Pineapple', 'products/pineapple.jpg', '98', '5', 'Pineapple', 23),
(89, 'Pomegranate', 'products/Pomegranate.png', '190', '10', 'Pomegranate', 23),
(90, 'Raspberry', 'products/Raspberry.jpg', '86', '16', 'Raspberry', 23),
(91, 'Ratnagiri Mango', 'products/ratnagiri mango.jpg', '250', '25', 'Ratnagiri Mango', 23),
(92, 'Red Cherry Imported', 'products/Red Cherry Imported.png', '246', '15', 'Red Cherry Imported', 23),
(93, 'Raw Mango', 'products/Raw Mango (Kacha Aam).png', '65', '2', 'Raw Mango', 23),
(94, 'Red Delicious Apple', 'products/Red Delicious Apple - Imported.png', '300', '10', 'Red Delicious Apple', 23),
(95, 'Royal Gala Apple Imported', 'products/Royal Gala Apple Imported.png', '136', '0', 'Royal Gala Apple Imported', 23),
(96, 'Sapota( Chikoo)', 'products/Sapota (Chikoo).png', '89', '5', 'Sapota( Chikoo)', 23),
(97, 'Shimla Apple', 'products/Shimla Apple.png', '100', '1', 'Shimla Apple', 23),
(98, 'Strawberry', 'products/strawberry.jpg', '153', '3', 'Strawberry', 23),
(99, 'Sweet Lime ( Mosambi )', 'products/Sweet Lime (Mosambi).png', '95', '3', 'Sweet Lime ( Mosambi )', 23),
(100, 'Tender Coconut(Nariyal pani)', 'products/Tender Coconut (Nariyal Pani).png', '56', '15', 'Tender Coconut(Nariyal pani)', 23),
(101, 'Valencia Orange Imported', 'products/Valencia Orange Imported.png', '102', '2', 'Valencia Orange Imported', 23),
(102, 'Watermelon (Tarbuj)', 'products/Watermelon (Tarbuj).png', '64', '2', 'Watermelon (Tarbuj)', 23),
(103, 'Yellow Marian Plum', 'products/Yellow Marian Plum.jpg', '56', '2', 'Yellow Marian Plum', 23),
(104, 'Amul Garlic & Butter ', 'products/Amul Garlic & Herbs Butter rs 150.png', '150', '10', 'Amul Garlic & Butter', 25),
(105, 'Amul Gold full Cream Fresh Milk', 'products/Amul Gold Full Cream Fresh Milk rs 170.png', '177', '7', 'Amul Gold full Cream Fresh Milk', 24),
(106, 'Amul Gold Milk', 'products/Amul Gold Milk rs76.png', '76', '0', 'Amul Gold Milk', 24),
(107, 'Amul Lactose Free Milk', 'products/Amul Lactose Free Milk rs25.png', '30', '5', 'Amul Lactose Free Milk', 24),
(108, 'Amul Moti Toned Milk (90 Days Shelf Life) ', 'products/Amul Moti Toned Milk (90 Days Shelf Life) rs30.png', '30', '0', 'Amul Moti Toned Milk (90 Days Shelf Life) ', 24),
(109, 'Amul Pure Ghee - Pack of 3 ', 'products/Amul Pure Ghee - Pack of 3 rs 817.png', '820', '3', 'Amul Pure Ghee - Pack of 3 ', 27),
(110, 'Amul Pure Ghee (Tetra Pack) - Pack of 2 ', 'products/Amul Pure Ghee (Tetra Pack) - Pack of 2 rs1034.png', '1034', '4', 'Amul Pure Ghee (Tetra Pack) - Pack of 2 ', 27),
(111, 'Amul Pure Ghee ', 'products/Amul Pure Ghee 543.png', '543', '3', 'Amul Pure Ghee ', 27),
(112, 'Amul Pure Ghee ', 'products/Amul Pure Ghee rs523.png', '523', '3', 'Amul Pure Ghee ', 27),
(113, 'Amul Salted Butter (100 g) ', 'products/Amul Salted Butter (100 g) 52.png', '52', '50', 'Amul Salted Butter (100 g) ', 25),
(114, 'Amul Salted Butter (500 g) ', 'products/Amul Salted Butter (500 g) 255.png', '255', '5', 'Amul Salted Butter (500 g) ', 25),
(115, 'Amul Taaza Homogenised Toned Milk ', 'products/Amul Taaza Homogenised Toned Milk rs68.png', '68', '0', 'Amul Taaza Homogenised Toned Milk ', 24),
(116, 'Amul Taaza Toned Fresh Milk ', 'products/Amul Taaza Toned Fresh Milk rs50.png', '50', '0', 'Amul Taaza Toned Fresh Milk rs50', 24),
(117, 'Amul Vanilla Magic Gold Ice Cream ', 'products/Amul Vanilla Magic Gold Ice Cream 300.png', '300', '300', 'Amul Vanilla Magic Gold Ice Cream ', 26),
(118, 'Amul Cheese Slices ', 'products/Amul Cheese Slices 148.png', '148', '2', 'Amul Cheese Slices ', 28),
(119, 'Amul Salted Butter (200 g) ', 'products/Amul Salted Butter (200 g) 110.png', '110', '0', 'Amul Salted Butter (200 g) ', 25);

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `subcategory_id` int(11) NOT NULL,
  `subcategory_name` varchar(100) NOT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`subcategory_id`, `subcategory_name`, `category`) VALUES
(12, 'Root', 30),
(13, 'Leaves', 30),
(14, 'Gourd', 30),
(16, 'other', 30),
(23, 'Other', 35),
(24, 'Milk', 32),
(25, 'Butter', 32),
(26, 'Cream', 32),
(27, 'Ghee', 32),
(28, 'cheese', 32),
(29, 'other', 32);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `photo` varchar(150) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `email`, `name`, `gender`, `photo`, `address`) VALUES
('admin@456', '123', 'subhratosingh@gmail.com', 'Subhrato Singh', 'Male', 'users/female-avatar.png', '909/X/17\r\nKatra Mohar Singh'),
('user@123', '456', 'user@yahoo.com', 'John Doe', 'Male', 'users/male-avatar.png', 'QWERTY'),
('[inder]', '[inder]', '[inder@gmail.com]', '[inder]', '[female]', '\"E:\\webstrom\\ABCD\\FrontHtml\\images\\fashion\\images\\pic-4.png\"', '[amritsar]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`details_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subcategory_id` (`subcategory_id`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`subcategory_id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`subcategory_id`);

--
-- Constraints for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
