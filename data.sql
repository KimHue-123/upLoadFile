CREATE DATABASE DichVu
go
CREATE TABLE CUSTOMER(
	Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	FullName NVARCHAR(50),
	Sex NVARCHAR(10),
	AddressCustomer NVARCHAR(100),
	Score INT DEFAULT 0,
	PhoneNumber VARCHAR(10)
)
go
DROP TABLE NHAXUATBAN

CREATE TABLE SACH(
	MASACH INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	TENSACH nvarchar(50) NOT NULL,
	MALOAISACH int NOT NULL,
	TACGIA nvarchar(50) NOT NULL,
	MANXB int NOT NULL,
	SOLUONGHIENTAI int NOT NULL,
	HINHANH image NULL,
	GIANHAP money NOT NULL,
	GIABAN money NOT NULL,
	NOIDUNG nvarchar(100) NULL
)
GO
CREATE TABLE LOAISACH(
	MALOAISACH INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	TENLOAISACH nvarchar(30) NOT NULL,
	CHUDE nvarchar(30) NULL
)
GO
GO
CREATE TABLE NHAXUATBAN(
	MANXB INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	TENNXB nvarchar(30) NOT NULL,
	DIACHI nvarchar(50) NULL
)
GO
ALTER TABLE [dbo].[SACH]  WITH CHECK ADD  CONSTRAINT [F_K_SACH_LAOISACH] FOREIGN KEY([MALOAISACH])
REFERENCES [dbo].[LOAISACH] ([MALOAISACH])
GO

ALTER TABLE [dbo].[SACH]  WITH CHECK ADD  CONSTRAINT [F_K_SACH_NXB] FOREIGN KEY([MANXB])
REFERENCES [dbo].[NHAXUATBAN] ([MANXB])
GO





INSERT [dbo].[LOAISACH] ([TENLOAISACH], [CHUDE]) VALUES ( N'Trinh thám', NULL)
GO
INSERT [dbo].[LOAISACH] ([TENLOAISACH], [CHUDE]) VALUES (N'Truyện tranh', NULL)
GO
INSERT [dbo].[LOAISACH] ([TENLOAISACH], [CHUDE]) VALUES (N'Nghệ thuật', NULL)
GO

INSERT [dbo].[NHAXUATBAN] ([TENNXB], [DIACHI]) VALUES (N'Kim Đồng', N'P. Phạm Ngũ Lão, Q.1, TP. Hồ Chí Minh')
GO
INSERT [dbo].[NHAXUATBAN] ([TENNXB], [DIACHI]) VALUES (N'NXB Trẻ', N'Phường 7, Quận 3 , TP. Hồ Chí Minh')



---------------------------------LOAI SACH-------------------------------
--Lay danh sach loai sach
CREATE PROCEDURE getListLoaiSach
AS
BEGIN
	SELECT * FROM LOAISACH
END

EXEC getListLoaiSach

--Them loai sach
		CREATE PROCEDURE THEM_LS
		@TENLOAISACH nvarchar(30),
		@CHUDE nvarchar(30) 
		AS
		BEGIN
			INSERT LOAISACH
			        ( TENLOAISACH ,
			          CHUDE 
			        )
			VALUES  ( @TENLOAISACH , 
			          @CHUDE 
			        )
		END
GO
EXEC THEM_LS "Ngôn Tình", NULL

---------------------------------NHA XUAT BAN-------------------------------
--Lay danh sach NXB
CREATE PROCEDURE getListNXB
AS
BEGIN
	SELECT * FROM NHAXUATBAN
END

EXEC getListNXB

--Them NXB
		CREATE PROCEDURE THEM_NXB
		@TENNXB nvarchar(30) ,
		@DIACHI nvarchar(50)
		AS
		BEGIN
			INSERT NHAXUATBAN
			        ( TENNXB ,
			          DIACHI 
			        )
			VALUES  ( @TENNXB , 
			          @DIACHI 
			        )
		END
GO

/*kich hoat lại constraint
ALTER TABLE [dbo].[SACH] CHECK CONSTRAINT [F_K_SACH_LAOISACH]
vo hieu hoa constraint 
ALTER TABLE Vay NOCHECK CONSTRAINT check_ngayhethan*/
GO
select * from CUSTOMER
delete from CUSTOMER where Id =	1
go
-----load danh sách khách hàng( phân trang + tìm ki?m)
ALTER PROCEDURE customerPhanTrang (
 @PageIndex int = 1,
 @PageSize int = 10,
 @TextSearch nvarchar(50),
 @TotalRecord int output
)

AS
BEGIN 
	IF (@TextSearch is null)
		BEGIN
			SET @TotalRecord = (SELECT COUNT(*) FROM CUSTOMER)
			SELECT *  FROM CUSTOMER ORDER BY Id OFFSET @PageSize *(@PageIndex - 1) ROWS FETCH NEXT @pageSize ROWS ONLY;

		END
	ELSE
		BEGIN
			SET @TotalRecord = (SELECT COUNT(*) FROM CUSTOMER WHERE FullName LIKE '%'+ @TextSearch + '%')
			SELECT *  FROM CUSTOMER WHERE FullName LIKE '%'+ @TextSearch + '%' ORDER BY Id  OFFSET @PageSize *(@PageIndex - 1) ROWS FETCH NEXT @pageSize ROWS ONLY;
		END
END


declare @total int
EXEC customerPhanTrang 1,3,"A", @total output
-----Tìm ki?m theo id
ALTER PROCEDURE getCustomerById
	@Id int
AS
BEGIN
	SELECT FullName,Sex, AddressCustomer, PhoneNumber FROM CUSTOMER
	WHERE Id = @Id
END

EXEC getCustomerById 2
------ch?nh s?a khách hàng----
ALTER PROCEDURE UpdateCustomer (
	@Id int,
	@FullName NVARCHAR(50),
	@Sex NVARCHAR(10),
	@AddressCustomer NVARCHAR(100),
	@PhoneNumber VARCHAR(10)
)

AS
BEGIN 
	UPDATE  CUSTOMER
	SET FullName = @FullName,
		Sex = @Sex,
		AddressCustomer = @AddressCustomer,
		PhoneNumber = @PhoneNumber
	WHERE Id = @Id

END

----------------------

EXEC UpdateCustomer 5, "Tr?n Th? E", "N?", "Qu?n 5", "555"

------Xóa khách hàng----
CREATE PROCEDURE DeleteCustomer (
	@Id int
)

AS
BEGIN 
	DELETE FROM CUSTOMER WHERE Id = @Id

END

----------------------

--THÊM KHÁCH HÀNG
		CREATE PROCEDURE THEM_KH
		@FullName NVARCHAR(50),
		@Sex NVARCHAR(10),
		@AddressCustomer NVARCHAR(100),
		@PhoneNumber VARCHAR(10)
		AS
		BEGIN
			INSERT CUSTOMER
			        ( FullName ,
			          Sex ,
			          AddressCustomer ,
			          PhoneNumber 
			        )
			VALUES  ( @FullName , 
			          @Sex , 
			          @AddressCustomer , 
			          @PhoneNumber 
			        )
		END
GO
EXEC THEM_KH "Võ Th? G", "N?", "Qu?n 7", "777"



/*ALTER PROCEDURE customerPhanTrang (
 @PageIndex int = 1,
 @PageSize int = 10
)

AS
BEGIN 
	SELECT *  FROM CUSTOMER ORDER BY Id OFFSET @PageSize *(@PageIndex - 1) ROWS FETCH NEXT @pageSize ROWS ONLY;
END


declare @total int
EXEC customerPhanTrang 1,3,@total out

ALTER PROCEDURE customerPhanTrang (
 @PageIndex int = 1,
 @PageSize int = 10
)

AS
BEGIN 
	SELECT @PageIndex, @PageSize;
END*/

/*CREATE PROCEDURE GetCustomers
@PageSize INT,
@PageIndex INT
AS
BEGIN
	SELECT * FROM CUSTOMER
	ORDER BY CUSTOMER.FullName DESC OFFSET @PageSize * (@PageIndex - 1) ROWS FETCH NEXT @PageSize ROWS ONLY;
END*/

