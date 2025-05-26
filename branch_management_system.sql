-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2025 at 06:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `branch_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `location`, `createdAt`, `updatedAt`) VALUES
('sa0011627c42e025', 'Pokhara', '17 Lakeside Street', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0013173aeb5025', 'Lalitpur', '53 Patan Durbar', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa00166847d7b025', 'Chitwan', '102 Bharatpur Center', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa00168cea68b025', 'Janakpur', '77 Ram Mandir Marg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0018bf8ef44025', 'Birgunj', '63 Adarsha Nagar', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0019883304f025', 'David Willis', 'Consequatur Nostrum', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001c55a6a04025', 'Nathaniel Estes', 'Sint unde et error q', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001ccb89549025', 'Kathmandu', '15 Durbar Marg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001cf153c72025', 'Bhaktapur', '22 Taumadi Square', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001e4c06235025', 'Butwal', '33 Siddhartha Path', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001ee58e784025', 'Biratnagar', '88 Main Road', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001fd5455a7025', 'Dharan', '45 Ghopa Camp', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `branch_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `first_name`, `last_name`, `phone`, `email`, `gender`, `branch_id`, `createdAt`, `updatedAt`) VALUES
('sa001001d9764025', 'Binita', 'Mahato', '2963649322', 'binita.mahato@sayuj.com', '', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0010cd96f31025', 'Bikash', 'Joshi', '4027899753', 'bikash.joshi@sayuj.com', '', 'sa0011627c42e025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa00114502dce025', 'Gita', 'Basnet', '6858588469', 'gita.basnet@sayuj.com', '', 'sa001fd5455a7025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0011550027e025', 'Prem', 'Tiwari', '3539464331', 'prem.tiwari@sayuj.com', '', 'sa0018bf8ef44025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0012b5c1879025', 'Rita', 'Tamang', '5201304447', 'rita.tamang@sayuj.com', '', 'sa001ee58e784025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001392359cc025', 'Suraj', 'KC', '9086388359', 'suraj.kc@sayuj.com', '', 'sa0018bf8ef44025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0014330a838025', 'Raju', 'Karki', '4538284555', 'r.karki@sayuj.com', '', 'sa001cf153c72025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001439f8706025', 'Rajesh', 'Pandey', '1495001817', 'rajesh.pandey@sayuj.com', '', 'sa001c55a6a04025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0014cacf4a6025', 'Suman', 'Shrestha', '1365195461', 'suman.shrestha@sayuj.com', '', 'sa001fd5455a7025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0015e671ff0025', 'Kanchhi', 'Maharjan', '6442185886', 'k.maharjan@sayuj.com', '', 'sa001fd5455a7025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001645a2209025', 'Meena', 'Shah', '6833939945', 'meena.shah@sayuj.com', '', 'sa0013173aeb5025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0016dfb248c025', 'Kishor', 'Khatiwada', '3225468076', 'kishor.khatiwada@sayuj.com', '', 'sa0013173aeb5025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa00175c541dd025', 'Mina', 'Dhakal', '1118608125', 'mina.dhakal@sayuj.com', '', 'sa0018bf8ef44025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa0017ef63136025', 'Sunita', 'Bhattarai', '1843717961', 'sunita.bhattarai@sayuj.com', '', 'sa001c55a6a04025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001803fcf34025', 'Anita', 'Bhandari', '1877391373', 'anita.b@sayuj.com', '', 'sa001cf153c72025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa00191e7fec1025', 'Sita', 'Magar', '7496889245', 's.magar@sayuj.com', '', 'sa00166847d7b025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001a6cce1b0025', 'Sita', 'Thapa', '7866870859', 'sita.thapa@sayuj.com', '', 'sa001ee58e784025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001b7cdf644025', 'Ram', 'Sharma', '8329382663', 'ram.sharma@sayuj.com', '', 'sa001fd5455a7025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001ce4e2931025', 'Nisha', 'Subedi', '7433642155', 'n.subedi@sayuj.com', '', 'sa001fd5455a7025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001d10517ea025', 'Pratik', 'Bista', '5758132804', 'pratik.bista@sayuj.com', '', 'sa001cf153c72025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001db9d3997025', 'Hari', 'Rana', '7135712590', 'hari.rana@sayuj.com', '', 'sa00168cea68b025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001ecd98914025', 'Dipak', 'Rai', '1876240006', 'dipak.rai@sayuj.com', '', 'sa0018bf8ef44025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001fdbf0983025', 'Manoj', 'Adhikari', '6145477436', 'manoj.adhikari@sayuj.com', '', 'sa001e4c06235025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001fdd483a8025', 'Sandesh', 'Lama', '1636996950', 's.lama@sayuj.com', '', 'sa0013173aeb5025', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('sa001fe086e63025', 'Kiran', 'Gurung', '7002681693', 'k.gurung@sayuj.com', '', 'sa00168cea68b025', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
('43a1ccf2-05a1-11f0-9973-d843ae09c109', 'admin', 'admin', '2025-03-20 16:37:34', '2025-03-20 16:37:34'),
('9f7433cd-0bf8-11f0-985c-d843ae09c109', 'sayuj', 'sayuj', '2025-03-28 18:18:02', '2025-03-28 18:18:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
