USE [ecommerce_db]
GO

/****** Object:  Table [dbo].[orders]    Script Date: 13-05-2026 16:13:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[orders](
	[order_id] [varchar](50) NOT NULL,
	[username] [varchar](100) NOT NULL,
	[product_id] [varchar](50) NOT NULL,
	[product_name] [varchar](255) NOT NULL,
	[quantity] [int] NOT NULL,
	[total_price] [float] NOT NULL,
	[status] [varchar](50) NULL,
	[address] [varchar](1000) NULL,
	[pincode] [int] NULL,
	[state] [varchar](20) NULL,
	[district] [varchar](50) NULL,
	[timestamp] [datetime] NULL,
	[phone_number] [bigint] NULL,
	[notes] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[orders] ADD  DEFAULT ('Pending') FOR [status]
GO

ALTER TABLE [dbo].[orders] ADD  DEFAULT (getdate()) FOR [timestamp]
GO