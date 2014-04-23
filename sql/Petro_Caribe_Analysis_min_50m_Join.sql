DROP TABLE IF EXISTS public."Petro_Caribe_Analysis_min_50m";
CREATE TABLE public."Petro_Caribe_Analysis_min_50m" AS
SELECT 
	sovereignt,
	"Petro_Caribe_Analysis_min"."Country",
	"Petro_Caribe_Analysis_min"."Analysis",
	"Petro_Caribe_Analysis_min"."Extended_Credit_Facility",
	"Petro_Caribe_Analysis_min"."Agreement",
	"Petro_Caribe_Analysis_min"."GDP_Growth_2013",
	"Petro_Caribe_Analysis_min"."DebtToGDP_Ratio_2013",
	"Petro_Caribe_Analysis_min"."IMF_Program_2013",
	"Petro_Caribe_Analysis_min"."Annual_Financing_2012",
	"Petro_Caribe_Analysis_min"."Nominal_GDP_USD_2013",
	"Petro_Caribe_Analysis_min"."Annual_Financing_USD_2012",
	"Petro_Caribe_Analysis_min"."F_GDP",
	"Petro_Caribe_Analysis_min"."F_USD",
	"Petro_Caribe_Analysis_min"."VoteCoin",
	"Petro_Caribe_Analysis_min"."DebtToGDP_Index",
	"Petro_Caribe_Analysis_min"."AF_Index",
	"Petro_Caribe_Analysis_min"."Main_Index",
	"Petro_Caribe_Analysis_min"."Cell_1",
	"Petro_Caribe_Analysis_min"."Cell_2",
	the_geom
FROM opengeo."ne_50m_admin_0_countries_lakes" LEFT OUTER JOIN public."Petro_Caribe_Analysis_min" ON (ne_50m_admin_0_countries_lakes.sovereignt = "Petro_Caribe_Analysis_min"."Country")
WHERE "Petro_Caribe_Analysis_min"."Country" is not null;
