-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 21, 2022 lúc 08:12 AM
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
(1, 'admin', '123', 10),
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
  `model` int(11) NOT NULL,
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
-- Cấu trúc bảng cho bảng `productdetails`
--

CREATE TABLE `productdetails` (
  `productCode` int(11) NOT NULL,
  `productRam` varchar(255) NOT NULL DEFAULT '4GB',
  `productDetail1` varchar(255) NOT NULL,
  `productDetail2` varchar(255) NOT NULL,
  `productDetail3` varchar(255) NOT NULL,
  `productDetail4` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `productdetails`
--

INSERT INTO `productdetails` (`productCode`, `productRam`, `productDetail1`, `productDetail2`, `productDetail3`, `productDetail4`) VALUES
(1, '8GB', 'Màu sắc rực rỡ, hiển thị chân thực - Màn hình 6.5 inches, super AMOLED', 'Trọng lượng nhẹ, kháng bụi, kháng nước tốt - Nhẹ chỉ 190g, kháng nước, kháng bụi IP67', 'Ảnh chụp có chi tiết cao, nhiều tính năng mới mẻ - Cụm 4 camera 64MP, đa dạng chế độ chụp', 'Trải nhiệm mượt mà trên mọi tác vụ - Exynos 1280 8 nhân, RAM 8GB'),
(2, '8GB', 'Camera chất lượng, bắt trọn từng khoảnh khắc - Cụm 4 camera với cảm biến chính lên đến 108MP', 'Thưởng thức không gian giải trí cực đỉnh - Màn hình lớn 6.7 inches, độ phân giải full HD+, 120HZ mượt mà', 'Cấu hình mạnh mẽ với chip Snapdragon 778G, RAM lên đến 8GB', 'Chiến game thoải mái không lo gián đoạn - Dụng lượng pin 5000mAh, hỗ trợ sạc nhanh 25 W'),
(3, '4GB', 'Thỏa sức tận hưởng thế giới giải trí sống động - Màn hình TFT LCD, 6.6 inches', 'Hiệu năng ổn định, ấn tượng - Chip Exynos 850 mạnh mẽ, xử lý tốt mọi tác vụ', 'Camera nâng cấp với nhiều tính năng độc đáo - Cụm 4 camera 50MP, 5MP, 2MP, 2MP', 'Thoải mái trải nhiệm với viên pim 5000mAh, sạc nhanh 15 Ư'),
(4, '8GB', 'Vi xử lý mạnh mẽ nhất Galaxy - Snapdragon 8 gen 1 (4nm)', 'Camera mắt thần bóng đêm Nightography - Chụp đêm cực đỉnh', 'S Pen đầu tiên trên Galaxy S - Độ trễ thấp, dễ thao tác', 'Dung lượng pin bất chấp ngày đêm - Viên pin 5000mAh, sạc nhanh 45 W'),
(5, '8GB', 'Vi xử lý mạnh mẽ nhất Galaxy - Snapdragon 8 gen 1 (4nm)', 'Camera mắt thần bóng đêm Nightography - Chụp đêm cực đỉnh, bắt trọn khoảnh khắc', 'Mãn nhãn từng chi tiết - Màn hình 6,6\", Dynamic AMOLED 2X, 120HZ', 'Thỏa sức trải nhiệm chỉ với 1 lần sạc - Viên pin 4500mAh, sạc nhanh 45W, sạc không dây'),
(6, '12GB', 'Camera mắt thần bóng đêm cho trải nhiệm chụp ảnh ấn tượng - Camera chính 50MP', 'Màn hình ngoài 6.2\" cùng màn hình chính 7.6\" độc đáo', 'Hiệu năng mạnh mẽ đến từ dòng chip cao cấp của Qualcomm - Snapdragon 8 Plus Gen 1', 'Viên pin ấn tượng, sạc nhanh bứt tốc - Pin 4400mAh, sạc nhanh 25 W');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productions`
--

CREATE TABLE `productions` (
  `batchCode` int(11) NOT NULL,
  `productCode` int(11) NOT NULL,
  `factoryCode` int(11) NOT NULL,
  `MFG` date NOT NULL,
  `quantityInStock` int(11) NOT NULL DEFAULT 0,
  `color` varchar(255) NOT NULL DEFAULT 'Đen'
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
('Galaxy A', ''),
('Galaxy Note', ''),
('Galaxy S', ''),
('Galaxy Z', '');

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
  `warrantyPeriod` varchar(255) DEFAULT '12 tháng'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`productCode`, `productLine`, `productName`, `buyPrice`, `productStatus`, `warrantyPeriod`) VALUES
(1, 'Galaxy A', 'Samsung Galaxy A53 (5G)', 8990000, 'SELLING', '12 tháng'),
(2, 'Galaxy A', 'Samsung Galaxy A73 (5G) 256GB', 1190000, 'SELLING', '12 tháng'),
(3, 'Galaxy A', 'Samsung Galaxy A13 (4G)', 3900000, 'SELLING', '12 tháng'),
(4, 'Galaxy S', 'Samsung Galaxy S22 Ultra (12GB - 256GB)', 26000000, 'SELLING', '12 tháng'),
(5, 'Galaxy S', 'Samsung Galaxy S22 Plus (8GB + 128GB)', 19990000, 'SELLING', '12 tháng'),
(6, 'Galaxy Z', 'Samsung Galaxy Z Fold4', 40000000, 'SELLING', '12 tháng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `userCode` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `userDob` varchar(255) DEFAULT NULL,
  `userAdress` varchar(255) DEFAULT NULL,
  `userPhone` varchar(255) DEFAULT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userStatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`userCode`, `userName`, `userDob`, `userAdress`, `userPhone`, `userEmail`, `userStatus`) VALUES
(1, 'Đỗ Công Đồng', '26/04/2002', 'Ba Vì\r\nCamera bóng tối chụp \r\nVi sử lý mạnh mẽ\r\n', '0963712656', 'dongdo264@gmail.com', 'deleted'),
(2, 'Nguyễn', '00/00/0000', 'N/A', '0987777777', 'N/A', 'verified'),
(5, 'Nguyễn Văn', '12/12/2005', 'HN', '123456789', 'abc@gmail', 'pending'),
(48975618, 'Nguyễn Văn', '12/12/2005', 'HN', '123456789', 'abc@gmail', 'pending'),
(48983331, 'Nguyễn Văn', '12/12/2005', 'HN', '123456789', 'abc@gmail', 'pending'),
(2147483647, 'Nguyễn Văn', '12/12/2002', 'HN', '123456789', 'abc@gmail', 'pending');

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
  ADD PRIMARY KEY (`model`,`userCode`),
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
-- Chỉ mục cho bảng `productdetails`
--
ALTER TABLE `productdetails`
  ADD PRIMARY KEY (`productCode`);

--
-- Chỉ mục cho bảng `productions`
--
ALTER TABLE `productions`
  ADD PRIMARY KEY (`batchCode`,`productCode`,`factoryCode`),
  ADD KEY `fk_productions_factories` (`factoryCode`),
  ADD KEY `fk_productions_products` (`productCode`);

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
-- AUTO_INCREMENT cho bảng `productions`
--
ALTER TABLE `productions`
  MODIFY `batchCode` int(11) NOT NULL AUTO_INCREMENT;

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
-- Các ràng buộc cho bảng `productdetails`
--
ALTER TABLE `productdetails`
  ADD CONSTRAINT `fk_productdetails_products` FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `productions`
--
ALTER TABLE `productions`
  ADD CONSTRAINT `fk_productions_factories` FOREIGN KEY (`factoryCode`) REFERENCES `factories` (`factoryCode`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_productions_products` FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productLine`) REFERENCES `productlines` (`productLine`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
