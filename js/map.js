			//var urlWhole = "http://" + host + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3APetro_Caribe_Analysis_min_50m&outputformat=json&Filter=<Filter><PropertyIsEqualTo><PropertyName>Analysis</PropertyName><Literal>1</Literal></PropertyIsEqualTo></Filter>";
			var urlWhole = "http://" + host + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3APetro_Caribe_Analysis_min_50m&outputformat=json";
			
			var allLayersGroup = new L.LayerGroup();
			
			var currentLegend;
			
			var currentSidebar = L.control();
			
			var keyToggle = L.control({position: "bottomleft"});
			
			function getGeoJson(data) {
				geoJsonLayerBivariate = new L.geoJson(data, {style: StyleBivariate, onEachFeature: onEachFeature, attribution: cmAttr});
				geoJsonLayerDebtToGDP = new L.geoJson(data, {style: StyleDebtToGDP, onEachFeature: onEachFeature, attribution: cmAttr});
				geoJsonLayerAF = new L.geoJson(data, {style: StyleAF, onEachFeature: onEachFeature, attribution: cmAttr});
				geoJsonLayerGDP = new L.geoJson(data, {style: StyleGDP, onEachFeature: onEachFeature, attribution: cmAttr});
				geoJsonLayerF_GDP = new L.geoJson(data, {style: StyleF_GDP, onEachFeature: onEachFeature, attribution: cmAttr});
				geoJsonLayerVoteCoin = new L.geoJson(data, {style: StyleVoteCoin, onEachFeature: onEachFeature, attribution: cmAttr});
			}
			
			$.ajax({
				url: urlWhole,
				dataType: 'json',
				jsonpCallback: getGeoJson,
				success: getGeoJson
			});
			
			var cmAttr = "<a href='mailto:dittemoremb@state.gov'>eDiplomacy Geo|DST</a>";
			//cmAttr = 'Data: <a href="http://www.eia.gov/countries/data.cfm" title="U.S. Energy Information Administration">EIA</a>, <a href="http://www.openstreetmap.org/" title="&copy; OpenStreetMap contributors">OpenStreetMap</a>, <a href="http://www.cloudmade.com/" title="&copy; 2011 CloudMade">CloudMade</a>, <a href="http://www.stamen.com/" title="Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.">Stamen Design</a>',
			
			function getColorBivariate(d) {
				if (d == 'A1') {
					return	'#fecc5d'
				} else if (d == 'A2') {
					return	'#db8468'
				} else if (d == 'B1') {
					return	'#d4bfb5'
				} else if (d == 'B2') {
					return	'#6badd6'
				} else {
					return	'#dedddd';
				}
			}
			
			function getColorDebtToGDP(d) {
				if (d > 100) {
					return	'#006592'
				} else if (d > 70) {
					return	'#007ba4'
				} else if (d > 50) {
					return	'#5094b8'
				} else if (d > 40) {
					return	'#84b1cd'
				} else if (d > 25) {
					return	'#bed7e7'
				} else {
					return	'#dedddd';
				}
			}
			
			function getColorAF(d) {
				if (d > 6) {
					return	'#d3681b'
				} else if (d > 4) {
					return	'#dd7f27'
				} else if (d > 2) {
					return	'#e69636'
				} else if (d > 1) {
					return	'#f1af48'
				} else if (d == 0) {
					return	'#fecc5d'
				} else {
					return	'#dedddd';
				}
			}
			
			function getColorGDP(d) {
				if (d > 100000000000) {
					return	'#51493f'
				} else if (d > 50000000000) {
					return	'#6d6252'
				} else if (d > 20000000000) {
					return	'#8d7f68'
				} else if (d > 5000000000) {
					return	'#b2a483'
				} else if (d > 2500000000) {
					return	'#e0d2a4'
				} else {
					return	'#dedddd';
				}
			}
			
			function getColorF_GDP(d) {
				if (d > 1) {
					return	'#51493f'
				} else if (d > .7) {
					return	'#6d6252'
				} else if (d > .4) {
					return	'#8d7f68'
				} else if (d > .15) {
					return	'#b2a483'
				} else if (d > .05) {
					return	'#e0d2a4'
				} else {
					return	'#dedddd';
				}
			}
			
			function getColorVoteCoin(d) {
				if (d > 1.2) {
					return	'#51493f'
				} else if (d > 1) {
					return	'#776b59'
				} else if (d > .8) {
					return	'#a5977a'
				} else if (d > .6) {
					return	'#e0d2a4'
				} else {
					return	'#dedddd';
				}
			}
			
			function StyleBivariate(feature) {
				return {
					weight: 1,
					opacity: 1,
					color: 'white',
					//fillOpacity: 0.7,
					fillOpacity: 0.85,
					fillColor: getColorBivariate(feature.properties.Cell_1)
				};
			}
			
			function StyleDebtToGDP(feature) {
				return {
					weight: 1,
					opacity: 1,
					color: 'white',
					//fillOpacity: 0.7,
					fillOpacity: 0.85,
					fillColor: getColorDebtToGDP(feature.properties.DebtToGDP_Ratio_2013)
				};
			}
			
			function StyleAF(feature) {
				return {
					weight: 1,
					opacity: 1,
					color: 'white',
					//fillOpacity: 0.7,
					fillOpacity: 0.85,
					fillColor: getColorAF(feature.properties.Annual_Financing_2012)
				};
			}
			
			function StyleGDP(feature) {
				return {
					weight: 1,
					opacity: 1,
					color: 'white',
					//fillOpacity: 0.7,
					fillOpacity: 0.85,
					fillColor: getColorGDP(feature.properties.Nominal_GDP_USD_2013)
				};
			}
			
			function StyleF_GDP(feature) {
				return {
					weight: 1,
					opacity: 1,
					color: 'white',
					//fillOpacity: 0.7,
					fillOpacity: 0.85,
					fillColor: getColorF_GDP(feature.properties.F_GDP)
				};
			}
			
			function StyleVoteCoin(feature) {
				return {
					weight: 1,
					opacity: 1,
					color: 'white',
					//fillOpacity: 0.7,
					fillOpacity: 0.85,
					fillColor: getColorVoteCoin(feature.properties.VoteCoin)
				};
			}
			
			var map = new L.Map('map', {
				zoomControl: false,
				center: [10, -75],
				maxZoom: 8,
				minZoom: 1,
				zoom: 5,
				maxBounds: [
					//south west
					[-30, -160],
					//north east
					[50, 0]
				]
			});
			
			L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: cmAttr,
				id: 'examples.map-20v6611k'
			}).addTo(map);

			var sidebarBivariate = L.control.sidebar("sidebarBivariate", {
				closeButton: true,
				position: "left",
				autoPan: false
			});
			
			var sidebarDebtToGDP = L.control.sidebar("sidebarDebtToGDP", {
				closeButton: true,
				position: "left",
				autoPan: false
			});
			
			var sidebarAF = L.control.sidebar("sidebarAF", {
				closeButton: true,
				position: "left",
				autoPan: false
			});
			
			var sidebarGDP = L.control.sidebar("sidebarGDP", {
				closeButton: true,
				position: "left",
				autoPan: false
			});
			
			var sidebarF_GDP = L.control.sidebar("sidebarF_GDP", {
				closeButton: true,
				position: "left",
				autoPan: false
			});
			
			var sidebarVoteCoin = L.control.sidebar("sidebarVoteCoin", {
				closeButton: true,
				position: "left",
				autoPan: false
			});
			
			new L.Control.Zoom({ position: 'topright' }).addTo(map);
			
			$(document).one("ajaxStop", function() {
				allLayersGroup.addLayer(geoJsonLayerGDP);
				map.addLayer(allLayersGroup);
				legendGDP.addTo(map);
				sidebarGDP.toggle();
			$("#loading").hide();
			});
			
			var legendBivariate = L.control({position: 'bottomleft'});
			var legendDebtToGDP = L.control({position: 'bottomleft'});
			var legendAF = L.control({position: 'bottomleft'});
			var legendGDP = L.control({position: 'bottomleft'});
			var legendF_GDP = L.control({position: 'bottomleft'});
			var legendVoteCoin = L.control({position: 'bottomleft'});
			
			function changeLayer() {
				currentSidebar.hide();
				allLayersGroup.clearLayers();
			}
			
			 legendDebtToGDP.onAdd = function (map) {
				currentLegend = legendDebtToGDP;
				currentSidebar = sidebarDebtToGDP;
				sidebarDebtToGDP.addTo(map);
				var div = L.DomUtil.create('div'),
					grades = ['101', '71', '51', '41', '26', '0'],
					// this is something like a subheader
					labels = [],
					from;

				for (var i = 0; i < grades.length; i++) {
					from = ['100 or more', '71 to 100', '51 to 70', '41 to 50', '25 to 40', 'No Data'];
					to = 
					labels.push(
						'<i style="background:' + getColorDebtToGDP(grades[i]) + '"></i>' +
						from[i]
					);
				}

				var name = "Debt-To-GDP Ratio (2013)";
				var description = "<h5 class='lorem'></h5>";
				var keyText = "";
				var key = labels.join('<br>');
				//sidebarDebtToGDP.setContent('<h4>' + name + '</h4>' + description + "<br/><h5 style='font-weight:bold'>" + keyText + "</h5>" + "<div class='legend'>" + key + '</div>');
				sidebarDebtToGDP.setContent('<h4>' + name + "</h4><div class='legend'>" + key + '</div>');
				
				return div;
			};
			
			legendAF.onAdd = function (map) {
				currentLegend = legendAF;
				currentSidebar = sidebarAF;
				sidebarAF.addTo(map);
				var div = L.DomUtil.create('div'),
					grades = ['6.1', '4.1', '2.1', '1.1', '0', '-1'],
					// this is something like a subheader
					labels = [],
					from;

				for (var i = 0; i < grades.length; i++) {
					from = ['Greater than 6', '4.1 to 6','2.1 to 4', '1.1 to 2', '1 or less', 'No data'];
					
					labels.push(
						'<i style="background:' + getColorAF(grades[i]) + '"></i>' +
						from[i]
					);
				}

				var name = "Annual Financing (2012)";
				var description = "<h5 class='lorem'></h5>";
				var keyText = "";
				var key = labels.join('<br>');
				sidebarAF.setContent('<h4>' + name + "</h4><div class='legend'>" + key + '</div>');
				
				return div;
			};
			
			legendBivariate.onAdd = function (map) {
				currentLegend = legendBivariate;
				currentSidebar = sidebarBivariate;
				sidebarBivariate.addTo(map);
				var div = L.DomUtil.create('div'),
					grades = ['1', '2', '3', 'No Data'],
					// this is something like a subheader
					labels = [],
					from;

				for (var i = 0; i < grades.length; i++) {
					from = ['1', '2', '3', 'No data'];
					
					labels.push(
						'<i style="background:' + getColorBivariate(grades[i]) + '"></i>' +
						from[i]
					);
				}

				var name = "Debt-To-GDP (2013)<br /><strong><em><center>and</center></em></strong>Annual Financing (2012)";
				var description = "<h5 class='lorem'></h5>";
				var keyText = "";
				var keyImg = "<div><img src='img/Bivariate_Key.png' style='width: 150px; height: 150px;' /></div>";
				var key = labels.join('<br>');
				sidebarBivariate.setContent('<h4>' + name + "</h4><div class='legend'>" + keyImg + '</div>');
				
				return div;
			};
			
			legendGDP.onAdd = function (map) {
				currentLegend = legendGDP;
				currentSidebar = sidebarGDP;
				sidebarGDP.addTo(map);
				var div = L.DomUtil.create('div'),
					grades = ['100000000001', '50000000001', '20000000001', '5000000001', '2500000001', 'No Data'],
					// this is something like a subheader
					labels = [],
					from;

				for (var i = 0; i < grades.length; i++) {
					from = ['Greater than 100', '50 to 100', '20 to 49', '5 to 19', '2.5 to 4', 'No data'];
					
					labels.push(
						'<i style="background:' + getColorGDP(grades[i]) + '"></i>' +
						from[i]
					);
				}

				var name = "Nominal GDP (2013)";
				var description = "<h5 class='lorem'></h5>";
				var keyText = "$USD billion";
				var key = labels.join('<br>');
				sidebarGDP.setContent('<h4>' + name + "<br /><small>" +  keyText + "</small></h4><div class='legend'>" + key + '</div>');
				
				return div;
			};
			
			legendF_GDP.onAdd = function (map) {
				currentLegend = legendF_GDP;
				currentSidebar = sidebarF_GDP;
				sidebarF_GDP.addTo(map);
				var div = L.DomUtil.create('div'),
					grades = ['1.001', '0.701', '0.401', '0.151', '0.051','No Data'],
					// this is something like a subheader
					labels = [],
					from;

				for (var i = 0; i < grades.length; i++) {
					from = ['Greater than 100', '70 to 100', '40 to 69', '15 to 39', '5 to 14', 'No data'];
					
					labels.push(
						'<i style="background:' + getColorF_GDP(grades[i]) + '"></i>' +
						from[i]
					);
				}

				var name = "U.S. Foreign Assistance";
				var description = "<h5 class='lorem'></h5>";
				var keyText = "";
				var key = labels.join('<br>');
				sidebarF_GDP.setContent('<h4>' + name + "</h4><div class='legend'>" + key + '</div>');
				
				return div;
			};
			
			
			legendVoteCoin.onAdd = function (map) {
				currentLegend = legendVoteCoin;
				currentSidebar = sidebarVoteCoin;
				sidebarVoteCoin.addTo(map);
				var div = L.DomUtil.create('div'),
					grades = ['1.21', '1.01', '0.81', '0.61', 'No Data'],
					// this is something like a subheader
					labels = [],
					from;

				for (var i = 0; i < grades.length; i++) {
					from = ['Greater than 1.2', '1.1 to 1.2', '0.81 to 1', '0.61 to 0.8', 'No data'];
					
					labels.push(
						'<i style="background:' + getColorVoteCoin(grades[i]) + '"></i>' +
						from[i]
					);
				}

				var name = "Distance from U.S. Voting <br />Position in the U.N.";
				var description = "<h5 class='lorem'></h5>";
				var keyText = "";
				var key = labels.join('<br>');
				sidebarVoteCoin.setContent('<h4>' + name + "</h4><div class='legend'>" + key + '</div>');
				
				return div;
			};
			
			function highlightFeature(e) {
				var layer = e.target;

				layer.setStyle({
					weight: 2,
					color: '#666',
					dashArray: '',
					fillOpacity: 0.7
				});

				if (!L.Browser.ie && !L.Browser.opera) {
					layer.bringToFront();
				}
			}
			
			function resetHighlight(e) {
				geoJsonLayer1.resetStyle(e.target);
				//geoJsonLayer2.resetStyle(e.target);
			}
			
			function zoomToFeature(e) {
				map.fitBounds(e.target.getBounds());
			}

			var popup = L.popup();

			function onEachFeature(feature, layer) {
				layer.on({
				//mouseover: highlightFeature,
				//mouseout: resetHighlight
				//click: zoomToFeature
			});
			
			var popContent = "";
			//if(feature.properties.Country!=null){
			
			var popupContent = "<h4>" + feature.properties.Country + "</h4><h5>Nominal GDP (2013): US$" + feature.properties.Nominal_GDP_USD_2013 + "</h5><h5>Debt to GDP Ratio: " + feature.properties.DebtToGDP_Ratio_2013 + "%</h5><h5>Annual Financing: " + feature.properties.Annual_Financing_2012 + "% GDP</h5><h5>U.S. Foreign Assistance: " + feature.properties.F_GDP + "% GDP</h5><h5>Distance from U.S. Voting Position in the U.N.: " + feature.properties.VoteCoin + "</h5><h5>IMF Program: " + feature.properties.IMF_Program_2013 + "</h5>";
			//}
			//var popupContent = "<h4>" + feature.properties.Country + "</h4><h5>Nominal GDP (2013): " + feature.properties.Nominal_GDP_2013 + "%</h5><h5>Debt to GDP Ratio: " + feature.properties.DebtToGDP_Ratio_2013 + "%</h5><h5>Annual Financing: " + feature.properties.Annual_Financing_2012 + "% GDP</h5><h5>IMF Program: " + feature.properties.IMF_Program_2013 + "</h5>";
				if (feature.properties && feature.properties.popupContent && feature.properties.Country) {
					popupContent += feature.properties.popupContent;
				}
				layer.bindPopup(popupContent);
			}
			
			//legend.addTo(map);
			
			keyToggle.onAdd = function (map) {
				this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
				this._div.innerHTML = "<a data-toggle='collapse' data-parent='#accordion' onclick='currentSidebar.hide();currentSidebar.show();'>Show/Hide Key</a>";
				return this._div;
			};

			// method that we will use to update the control based on feature properties passed
			
			keyToggle.addTo(map);	