-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 17, 2022 lúc 10:50 AM
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
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `role`) VALUES
(1, 'dongdo', '1234', 1),
(2, 'nguyen', 'nguyen', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `agentwarehouses`
--

CREATE TABLE `agentwarehouses` (
  `agentCode` int(11) NOT NULL,
  `productCode` int(11) NOT NULL,
  `quantityInStock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer_products`
--

CREATE TABLE `customer_products` (
  `userCode` int(11) NOT NULL,
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
(1, 'VIETTEL', 'Lô D26, Khu đô thị mới Cầu Giấy, phường Yên Hòa, quận Cầu Giấy, Hà Nội', 'HÀ NỘI', '0288888888'),
(2, 'CellphoneS', '350-352 Võ Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh', 'HỒ CHÍ MINH', '0999999999'),
(3, 'Agent3', 'Khu 2 Hoàng Cương, Thanh Ba, Phú Thọ', 'Phú Thọ', '0488888999');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `factories`
--

CREATE TABLE `factories` (
  `factoryCode` int(11) NOT NULL,
  `factoryAdress` varchar(255) NOT NULL,
  `factoryCity` varchar(255) NOT NULL,
  `factoryPhone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `factories`
--

INSERT INTO `factories` (`factoryCode`, `factoryAdress`, `factoryCity`, `factoryPhone`) VALUES
(1, 'Khu công nghiệp Yên Phong I, Xã Yên Trung, Huyện Yên Phong, Tỉnh Bắc Ninh', 'BẮC NINH', '02413696049'),
(2, 'Khu Công nghiệp Yên Bình, Phường Đồng Tiến, Thị xã Phổ Yên, Tỉnh Thái Nguyên', 'THÁI NGUYÊN', '0987678972'),
(3, 'Khu Công nghiệp ABC, Phường BCD, Quận 7, TP. Hồ Chí Minh', 'HỒ CHÍ MINH', '0567898744');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetails`
--

CREATE TABLE `orderdetails` (
  `orderCode` int(11) NOT NULL,
  `productCode` int(11) NOT NULL,
  `quantityOrdered` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `orderCode` int(11) NOT NULL,
  `userCode` int(11) NOT NULL,
  `orderDate` date NOT NULL,
  `comments` varchar(4000) DEFAULT NULL,
  `orderStatus` varchar(255) DEFAULT 'Đang xử lý'
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
('Laptop', ''),
('Smartwatch', 'Đồng hồ thông minh'),
('Tablet', 'Máy tính bảng'),
('Điện thoại', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `productCode` int(11) NOT NULL,
  `productLine` varchar(255) NOT NULL,
  `productDescription` varchar(4000) NOT NULL,
  `productQuantity` int(11) NOT NULL DEFAULT 0,
  `productPrice` int(11) NOT NULL,
  `factoryCode` int(11) NOT NULL,
  `wcCode` int(11) DEFAULT NULL,
  `productStatus` varchar(255) DEFAULT NULL,
  `warrantyPeriod` varchar(255) DEFAULT '12 tháng'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `userCode` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userDob` varchar(255) DEFAULT NULL,
  `userAdress` varchar(255) NOT NULL,
  `userPhone` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userStatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`userCode`, `userName`, `userDob`, `userAdress`, `userPhone`, `userEmail`, `userStatus`) VALUES
(1, 'Đỗ Công Đồng', '26/04/2002', 'Ba Vì', '0963712656', 'dongdo264@gmail.com', 'verified'),
(2, 'Nguyễn', '00/00/0000', 'N/A', '0987777777', 'N/A', 'verified');

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
-- Đang đổ dữ liệu cho bảng `warrantycenters`
--

INSERT INTO `warrantycenters` (`wcCode`, `wcAdress`, `wcCity`, `wcPhone`, `workingTime`) VALUES
(1, '303 Trường Chinh, P. Phùng Chí Kiên, TP. Bắc Kạn', 'BẮC KẠN', '(0209) 6538686', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(2, '2A Nguyễn Thị Minh Khai, P. Ngô Quyền, TP. Bắc Giang', 'BẮC GIANG', '(0204) 3851421 - (0204) 3854176', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(3, 'Số 10 Trần Phú, P. Mộ Lao, Hà Đông', 'HÀ NỘI', '(0243) 5682529 - (0243) 5510466', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(4, '115 Hoàng Cầu, Q. Đống Đa', 'HÀ NỘI', '(0243) 5682431 - (0243) 7373008', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(5, '	\r\nLô 55-S6 Khu đô thị Hà Tiên, đường Trần Phú, TP. Vĩnh Yên', 'Vĩnh Phúc', '(0211) 3777979', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(6, '21 Lương Khánh Thiện, Q. Ngô Quyền, TP. Hải Phòng', 'Hải Phòng', '(0225) 3859305', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(7, '17 Trần Đang Ninh, Tổ 33, P. Cốc Lếu, TP. Lào Cai', 'Lào Cai', '(0214) 3820202- (0214) 3824766', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(8, '117 Tôn Đức Thắng, TP. Tam Kỳ', 'QUẢNG NAM', '(0235) 3859045', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(9, '56 Trần Bình Trọng, P. Quyết Thắng, TP. Kon Tum', 'KON TUM', '	\r\n(0260) 6555999', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(10, '48 Lê Thị Pha, TP. Bảo Lộc', 'LÂM ĐỒNG', '(0263) 3711477', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(11, '12B-12C Đường 23 Tháng 10, P. Phương Sơn, TP. Nha Trang', 'KHÁNH HÒA', '(0258) 3814268', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(12, '115 Tỉnh Lộ 8, Khu phố 7, TT. Củ Chi, H. Củ Chi', 'HỒ CHÍ MINH', '(0283) 7924925', '8h00 - 17h00 từ thứ Hai đến thứ Bảy'),
(13, '56 Đường số 10, KDC Him Lam, P. Tân Hưng, Q.7', 'HỒ CHÍ MINH', '19006047 (nhánh số 2)', '8h00 - 17h00 từ thứ Hai đến thứ Bảy');

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
  ADD KEY `productCode` (`productCode`);

--
-- Chỉ mục cho bảng `customer_products`
--
ALTER TABLE `customer_products`
  ADD PRIMARY KEY (`userCode`),
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
-- Chỉ mục cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`orderCode`),
  ADD KEY `productCode` (`productCode`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderCode`),
  ADD KEY `userCode` (`userCode`);

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
  ADD KEY `fk_products_warrantycenters` (`wcCode`),
  ADD KEY `productLine` (`productLine`),
  ADD KEY `factoryCode` (`factoryCode`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userCode`);

--
-- Chỉ mục cho bảng `warrantycenters`
--
ALTER TABLE `warrantycenters`
  ADD PRIMARY KEY (`wcCode`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `agentwarehouses`
--
ALTER TABLE `agentwarehouses`
  MODIFY `agentCode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `distributionagents`
--
ALTER TABLE `distributionagents`
  MODIFY `agentCode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `factories`
--
ALTER TABLE `factories`
  MODIFY `factoryCode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `orderCode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `orderCode` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `warrantycenters`
--
ALTER TABLE `warrantycenters`
  MODIFY `wcCode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `fk_accounts_users` FOREIGN KEY (`id`) REFERENCES `users` (`userCode`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `agentwarehouses`
--
ALTER TABLE `agentwarehouses`
  ADD CONSTRAINT `agentwarehouses_ibfk_1` FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_agentwarehouses_distributionagents` FOREIGN KEY (`agentCode`) REFERENCES `distributionagents` (`agentCode`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `customer_products`
--
ALTER TABLE `customer_products`
  ADD CONSTRAINT `customer_products_ibfk_1` FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_customer_products_users` FOREIGN KEY (`userCode`) REFERENCES `users` (`userCode`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `fk_orderdetails_orders` FOREIGN KEY (`orderCode`) REFERENCES `orders` (`orderCode`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userCode`) REFERENCES `users` (`userCode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_agentwarehouses` FOREIGN KEY (`productCode`) REFERENCES `agentwarehouses` (`productCode`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_products_warrantycenters` FOREIGN KEY (`wcCode`) REFERENCES `warrantycenters` (`wcCode`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_61` FOREIGN KEY (`productLine`) REFERENCES `productlines` (`productLine`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_62` FOREIGN KEY (`factoryCode`) REFERENCES `factories` (`factoryCode`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
