-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 25, 2022 lúc 04:45 PM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dev_int3306`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `accStatus` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `role`, `accStatus`) VALUES
(4, 'factory1', '1234', 1, 'active'),
(5, 'factory2', '12321', 1, 'active'),
(60518352, 'dongdo', '12321', 3, 'active'),
(70642695, 'admin', '123', 3, 'active'),
(71203838, '20020393', 'dẳ', 1, 'active'),
(71298891, 'admin123', '12321', 3, 'active'),
(72399220, '20020393', '12321', 3, 'deleted'),
(72410710, '200203931', '12321', 3, 'deleted'),
(72413966, '2002039312', '12321', 3, 'active'),
(72416464, '20020393123', '12321', 3, 'active'),
(72426111, '20020393123432', '12321', 3, 'active'),
(72442785, '20020393123432', '12321', 1, 'active'),
(72449561, '20020393123432', '12321', 1, 'active');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `agentwarehouses`
--

CREATE TABLE `agentwarehouses` (
  `agentCode` int(11) NOT NULL,
  `bathCode` int(11) NOT NULL,
  `quantityInStock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `customerCode` int(11) NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `customerDob` varchar(255) DEFAULT NULL,
  `customerAdress` varchar(255) NOT NULL,
  `customerPhone` varchar(255) NOT NULL,
  `customerEmail` varchar(255) DEFAULT NULL,
  `customerStatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer_products`
--

CREATE TABLE `customer_products` (
  `model` int(11) NOT NULL,
  `customerCode` int(11) NOT NULL,
  `agentCode` int(11) NOT NULL,
  `productCode` int(11) NOT NULL,
  `dateOfPurchase` date NOT NULL,
  `productStatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `distributionagents`
--

CREATE TABLE `distributionagents` (
  `agentCode` int(11) NOT NULL,
  `agentName` varchar(255) NOT NULL DEFAULT 'VIETTEL',
  `agentAdress` varchar(255) NOT NULL,
  `agentCity` varchar(255) NOT NULL,
  `agentPhone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `distributionagents`
--

INSERT INTO `distributionagents` (`agentCode`, `agentName`, `agentAdress`, `agentCity`, `agentPhone`) VALUES
(72399220, 'Nguyễn Văn A', 'a', 'Ha Noi', '0963712656'),
(72410710, 'Nguyễn Văn A', 'a', 'Ha Noi', '0963712656'),
(72413966, 'Nguyễn Văn A', 'a', 'Ha Noi', '0963712656'),
(72416464, 'Nguyễn Văn A', 'a', 'Ha Noi', '0963712656'),
(72426111, 'Nguyễn Văn A', 'a', 'Ha Noi', '0963712656');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `factories`
--

CREATE TABLE `factories` (
  `factoryCode` int(11) NOT NULL,
  `factoryName` varchar(255) DEFAULT 'Nhà Máy',
  `factoryAdress` varchar(255) NOT NULL,
  `factoryCity` varchar(255) NOT NULL,
  `factoryPhone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `factories`
--

INSERT INTO `factories` (`factoryCode`, `factoryName`, `factoryAdress`, `factoryCity`, `factoryPhone`) VALUES
(4, 'Nhà Máy 1', 'Ba vì - Hà Nội', 'Hà Nội', '0288999999'),
(5, 'Nhà Máy 2', 'Thái Bình', 'Thái Bình', '0999999999'),
(71203838, '2131wqesdf', '123', 'Ha Noi', '0332133188'),
(72442785, 'Nguyễn Văn An', 'a', 'Ha Noi', '0963712656'),
(72449561, 'Nguyễn Văn Ánh', 'a', 'Ha Noi', '0963712656');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productdetails`
--

CREATE TABLE `productdetails` (
  `productCode` int(11) NOT NULL,
  `size` varchar(255) NOT NULL DEFAULT '99KG',
  `frame` varchar(255) NOT NULL,
  `shock` varchar(255) NOT NULL DEFAULT 'N/A',
  `rims` varchar(255) DEFAULT NULL,
  `tires` varchar(255) DEFAULT NULL,
  `handlebar` varchar(255) DEFAULT NULL,
  `saddle` varchar(255) DEFAULT NULL,
  `pedals` varchar(255) DEFAULT NULL,
  `brakes` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT 'Trọng lượng có thể thay đổi dựa trên kích cỡ, chất liệu hoàn thiện, chi tiết kim loại và các phụ kiện.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `productdetails`
--

INSERT INTO `productdetails` (`productCode`, `size`, `frame`, `shock`, `rims`, `tires`, `handlebar`, `saddle`, `pedals`, `brakes`, `weight`) VALUES
(1, 'One Size', 'ALUXX-Grade Aluminum', 'N/A', 'Giant Kids 16″, alloy', 'Innova IA-2094, 16×2.25″', 'Giant Kids, middle high, 520mm width', 'Giant Kids', 'Platform', 'Alloy, linear pull', 'Trọng lượng có thể thay đổi dựa trên kích cỡ, chất liệu hoàn thiện, chi tiết kim loại và các phụ kiện.'),
(2, 'S', 'ALUXX-Grade aluminum', 'Aluminum alloy', 'Alloy, double layer', 'Innova 26×1.95', 'Giant alloy, 31.8mm', 'Giant', 'Platform, 9/16″', 'JAK mechanical disc brake', 'Trọng lượng có thể thay đổi dựa trên kích cỡ, chất liệu hoàn thiện, chi tiết kim loại và các phụ kiện.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productions`
--

CREATE TABLE `productions` (
  `batchCode` int(11) NOT NULL,
  `productCode` int(11) NOT NULL,
  `factoryCode` int(11) NOT NULL,
  `MFG` date NOT NULL,
  `color` varchar(255) NOT NULL DEFAULT 'Đen',
  `quantityInStock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productlines`
--

CREATE TABLE `productlines` (
  `productLine` varchar(255) NOT NULL,
  `textDescription` varchar(4000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `productlines`
--

INSERT INTO `productlines` (`productLine`, `textDescription`) VALUES
('Xe đạp trẻ em', ''),
('Xe đạp địa hình', ''),
('Xe đạp đường phố', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `productCode` int(11) NOT NULL,
  `productLine` varchar(255) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `buyPrice` int(11) NOT NULL,
  `productStatus` varchar(255) DEFAULT 'SELLING',
  `warrantyPeriod` varchar(255) DEFAULT '60 tháng'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`productCode`, `productLine`, `productName`, `buyPrice`, `productStatus`, `warrantyPeriod`) VALUES
(1, 'Xe đạp trẻ em', 'Xe Đạp Trẻ Em Youth LIV Adore F/W 16 – Bánh 16 Inches – 2022', 5390000, 'SELLING', '60 tháng'),
(2, 'Xe đạp địa hình', 'Xe Đạp Địa Hình MTB GIANT ATX 620 – Phanh Đĩa, Bánh 26 Inches – 2022', 8390000, 'SELLING', '60 tháng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `warranties`
--

CREATE TABLE `warranties` (
  `warrantyCode` int(11) NOT NULL,
  `wcCode` int(11) NOT NULL,
  `model` int(11) DEFAULT NULL,
  `productCode` int(11) NOT NULL,
  `createAt` date NOT NULL,
  `finishAt` date DEFAULT NULL,
  `warrantyStatus` varchar(4000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `warrantycenters`
--

CREATE TABLE `warrantycenters` (
  `wcCode` int(11) NOT NULL,
  `wcAdress` varchar(255) NOT NULL,
  `wcCity` varchar(255) NOT NULL,
  `wcPhone` varchar(255) NOT NULL,
  `workingTime` varchar(255) DEFAULT '8h00 - 17h00 từ thứ Hai đến thứ Bảy'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`,`username`);

--
-- Chỉ mục cho bảng `agentwarehouses`
--
ALTER TABLE `agentwarehouses`
  ADD PRIMARY KEY (`agentCode`),
  ADD UNIQUE KEY `agentwarehouses_bathCode_agentCode_unique` (`agentCode`,`bathCode`),
  ADD KEY `bathCode` (`bathCode`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerCode`);

--
-- Chỉ mục cho bảng `customer_products`
--
ALTER TABLE `customer_products`
  ADD PRIMARY KEY (`model`,`customerCode`,`productCode`),
  ADD UNIQUE KEY `customer_products_productCode_customerCode_unique` (`customerCode`,`productCode`),
  ADD KEY `productCode` (`productCode`);

--
-- Chỉ mục cho bảng `distributionagents`
--
ALTER TABLE `distributionagents`
  ADD PRIMARY KEY (`agentCode`);

--
-- Chỉ mục cho bảng `factories`
--
ALTER TABLE `factories`
  ADD PRIMARY KEY (`factoryCode`);

--
-- Chỉ mục cho bảng `productdetails`
--
ALTER TABLE `productdetails`
  ADD PRIMARY KEY (`productCode`);

--
-- Chỉ mục cho bảng `productions`
--
ALTER TABLE `productions`
  ADD PRIMARY KEY (`batchCode`,`productCode`,`factoryCode`),
  ADD UNIQUE KEY `productions_productCode_factoryCode_unique` (`productCode`,`factoryCode`),
  ADD KEY `factoryCode` (`factoryCode`);

--
-- Chỉ mục cho bảng `productlines`
--
ALTER TABLE `productlines`
  ADD PRIMARY KEY (`productLine`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productCode`),
  ADD KEY `productLine` (`productLine`);

--
-- Chỉ mục cho bảng `warranties`
--
ALTER TABLE `warranties`
  ADD PRIMARY KEY (`warrantyCode`),
  ADD KEY `wcCode` (`wcCode`);

--
-- Chỉ mục cho bảng `warrantycenters`
--
ALTER TABLE `warrantycenters`
  ADD PRIMARY KEY (`wcCode`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `agentwarehouses`
--
ALTER TABLE `agentwarehouses`
  MODIFY `agentCode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `customerCode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `customer_products`
--
ALTER TABLE `customer_products`
  MODIFY `model` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `distributionagents`
--
ALTER TABLE `distributionagents`
  MODIFY `agentCode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72426112;

--
-- AUTO_INCREMENT cho bảng `factories`
--
ALTER TABLE `factories`
  MODIFY `factoryCode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72449562;

--
-- AUTO_INCREMENT cho bảng `productions`
--
ALTER TABLE `productions`
  MODIFY `batchCode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `warranties`
--
ALTER TABLE `warranties`
  MODIFY `warrantyCode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `warrantycenters`
--
ALTER TABLE `warrantycenters`
  MODIFY `wcCode` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `agentwarehouses`
--
ALTER TABLE `agentwarehouses`
  ADD CONSTRAINT `agentwarehouses_ibfk_1` FOREIGN KEY (`agentCode`) REFERENCES `distributionagents` (`agentCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `agentwarehouses_ibfk_2` FOREIGN KEY (`bathCode`) REFERENCES `productions` (`batchCode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `customer_products`
--
ALTER TABLE `customer_products`
  ADD CONSTRAINT `customer_products_ibfk_1` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_products_ibfk_2` FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `distributionagents`
--
ALTER TABLE `distributionagents`
  ADD CONSTRAINT `fk_distributionagents_accounts` FOREIGN KEY (`agentCode`) REFERENCES `accounts` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `factories`
--
ALTER TABLE `factories`
  ADD CONSTRAINT `fk_factories_accounts` FOREIGN KEY (`factoryCode`) REFERENCES `accounts` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `productdetails`
--
ALTER TABLE `productdetails`
  ADD CONSTRAINT `productdetails_ibfk_1` FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `productions`
--
ALTER TABLE `productions`
  ADD CONSTRAINT `productions_ibfk_1` FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productions_ibfk_2` FOREIGN KEY (`factoryCode`) REFERENCES `factories` (`factoryCode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productLine`) REFERENCES `productlines` (`productLine`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `warranties`
--
ALTER TABLE `warranties`
  ADD CONSTRAINT `warranties_ibfk_1` FOREIGN KEY (`wcCode`) REFERENCES `warrantycenters` (`wcCode`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
