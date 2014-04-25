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
WHERE
	ne_50m_admin_0_countries_lakes.sovereignt = 'Argentina' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Antigua and Barbuda' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Barbados' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Belize' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Bolivia' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Brazil' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Chile' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Colombia' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Costa Rica' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Cuba' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Dominica' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Dominican Republic' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Ecuador' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'El Salvador' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'France' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Grenada' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Guatemala' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Guyana' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Haiti' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Honduras' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Jamaica' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Mexico' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Netherlands' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Nicaragua' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Panama' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Paraguay' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Peru' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Saint Kitts and Nevis' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Saint Lucia' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Saint Vincent and the Grenadines' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Suriname' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'The Bahamas' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Trinidad and Tobago' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'United Kingdom' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Uruguay' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'Venezuela' OR
	ne_50m_admin_0_countries_lakes.sovereignt = 'United States of America';
