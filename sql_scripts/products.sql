USE [ecommerce_db]
GO

/****** Object:  Table [dbo].[products]    Script Date: 13-05-2026 11:40:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[products](
	[product_id] [varchar](50) NOT NULL,
	[product_name] [varchar](255) NOT NULL,
	[price] [float] NOT NULL,
	[description] [varchar](max) NULL,
	[category] [varchar](100) NULL,
	[timestamp] [datetime] NULL,
	[image_urls] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[products] ADD  DEFAULT (getdate()) FOR [timestamp]
GO

ALTER TABLE [dbo].[products] ADD  DEFAULT ('[]') FOR [image_urls]
GO