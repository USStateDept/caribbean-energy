DROP TABLE IF EXISTS public."Petro_Caribe_Analysis_min";
CREATE TABLE public."Petro_Caribe_Analysis_min"
(
	"Country" text,
	"Analysis" real,
	"Extended_Credit_Facility" real,
	"Agreement" text,
	"GDP_Growth_2013" real,
	"DebtToGDP_Ratio_2013" real,
	"IMF_Program_2013" text,
	"Annual_Financing_2012" real,
	"DebtToGDP_Index" real,
	"AF_Index" real,
	"Main_Index" real,
	"Cell_1" text,
	"Cell_2" text
);

set client_encoding to 'UTF-8';

COPY "Petro_Caribe_Analysis_min" FROM 'C:\OpenGeo\webapps\ve-oil-subsidies\sql\Petro_Caribe_Analysis_min.csv' DELIMITER ',' CSV;