                    var mapLocation = "countries/us/custom/us-all-mainland";
                    var baseVal = 5;
                    var stateColor = "rgb(147,115,115)";//"#B12616";//
                    var statelineColor = "#a14c4f";
                    var hoverColor = "#ededed";//"#FFF";//
                    var textColor = "#FFF";
                    var defaultURL = "https://intelliapp2.driverapponline.com/c/venturelog?uri_b=ia_venturelog_1174961385";
                    //var svgMapLocation = "https://az480170.vo.msecnd.net/895317b4-3e55-4d49-b792-340ff026c160/docs/6a406bed-6c6d-40ef-8526-81710d2de60e/mapnobackground.svg";

                    //20, 9, 763, 475
                    var bgWidth = 800 * 0.95375; //763
                    var bgHeight = 500 * 0.95; //475
                    var bgOffsetX = 155;
                    var bgOffsetY = 10;

                    $(function () {
                        /** var cityJSON = {
                            "type": "FeatureCollection",
                            "crs": { "type": "name", "properties": { "name": "oogityboogity" } },

                            "features": [
                                { "type": "Feature", "properties": { "name": "Indianapolis" }, "geometry": { "type": "Point", "coordinates": [ 6500, 6860 ] } },
                                { "type": "Feature", "properties": { "name": "St. Louis" }, "geometry": { "type": "Point", "coordinates": [ 5690, 6530 ] } },
                                { "type": "Feature", "properties": { "name": "Chicago" }, "geometry": { "type": "Point", "coordinates": [ 6150, 7400 ] } },
                                { "type": "Feature", "properties": { "name": "Laredo" }, "geometry": { "type": "Point", "coordinates": [ 3780, 3560 ] } },
                                { "type": "Feature", "properties": { "name": "Atlanta" }, "geometry": { "type": "Point", "coordinates": [ 7125, 5325 ] } },
                                { "type": "Feature", "properties": { "name": "Spartanburg" }, "geometry": { "type": "Point", "coordinates": [ 7650, 5720 ] } },
                                { "type": "Feature", "properties": { "name": "Lafayette" }, "geometry": { "type": "Point", "coordinates": [ 6350, 7100 ] } },
                                { "type": "Feature", "properties": { "name": "Devens" }, "geometry": { "type": "Point", "coordinates": [ 9250, 8100 ] } }
                            ]
                        };
                        var cities = Highcharts.geojson(cityJSON, 'mappoint'); **/

                        // Prepare demo data
                        var data = [{
                            "hc-key": "us-al",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/alabama"
                        }, {
                            "hc-key": "us-az",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/arizona"
                        }, {
                            "hc-key": "us-ar",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/arkansas"
                        }, {
                            "hc-key": "us-ca",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/california"
                        }, {
                            "hc-key": "us-dc",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/district-columbia"
                        }, {
                            "hc-key": "us-fl",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/florida"
                        }, {
                            "hc-key": "us-ga",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/georgia"
                        }, {
                            "hc-key": "us-il",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/illinois"
                        }, {
                            "hc-key": "us-in",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/indiana"
                        }, {
                            "hc-key": "us-ks",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/kansas"
                        }, {
                            "hc-key": "us-ky",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/kentucky"
                        }, {
                            "hc-key": "us-md",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/maryland"
                        }, {
                            "hc-key": "us-ma",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/massachusetts"
                        }, {
                            "hc-key": "us-mi",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/michigan"
                        }, {
                            "hc-key": "us-mn",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/minnesota"
                        }, {
                            "hc-key": "us-mo",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/missouri"
                        }, {
                            "hc-key": "us-nj",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/new-jersey"
                        }, {
                            "hc-key": "us-ny",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/new-york"
                        }, {
                            "hc-key": "us-nc",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/north-carolina"
                        }, {
                            "hc-key": "us-oh",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/ohio"
                        }, {
                            "hc-key": "us-ok",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/oklahoma"
                        }, {
                            "hc-key": "us-pa",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/pennsylvania"
                        }, {
                            "hc-key": "us-ri",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/rhode-island"
                        }, {
                            "hc-key": "us-sc",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/south-carolina"
                        }, {
                            "hc-key": "us-tn",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/tennessee"
                        }, {
                            "hc-key": "us-tx",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/texas"
                        }, {
                            "hc-key": "us-va",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/virgiana"
                        }, {
                            "hc-key": "us-wa",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/washington"
                        }, {
                            "hc-key": "us-wv",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/west-viginia"
                        }, {
                            "hc-key": "us-wi",
                            "color": "#D3A9A9",
                            "value": baseVal,
                            "url": "/wisconsin"
                        },
                        ];

                        $.each(data, function (i) {
                            //this.drilldown = this.properties['hc-key'];
                            this.value = 0; // Non-random bogus data
                            this.dataLabels = {
                                enabled: false,
                                format: '{point.name}'
                            };
                                this.prevOnClick = function () { this.onclick };
                            this.onclick = function (click) {
                                this.prevOnClick();
                                console.log(this);
                                var url = data[i].url;
                                if(!url || url == "")
                                    url = defaultURL;
                                    window.open(url,'_self');

                        //if(confirm("Are you sure you wish to navigate to the job listings for " + this.properties["name"]))
                        //{
                                    //window.location = url;
                        // window.open(url,'_self');
                        //}
                            }
                        });

                        // Initiate the chart
                        $('.map').highcharts('Map', {
                            title: {
                                text: ''//'TransCorr/Venture Logistics'
                            },

                            chart: {
                                backgroundColor: null,
                                selectionMarkerFill: '#937373',
                                resetZoomButton: {
                                    enabled: false,
                                    position: {
                                        align: 'left',
                                        verticalAlign: 'bottom'
                                    }
                                }
                            },

                            subtitle: {
                                text: ''//'Coverage Map'
                            },

                            legend: {
                                enabled: false
                            },

                            mapNavigation: {
                                enabled: false,
                                buttonOptions: {
                                    verticalAlign: 'bottom'
                                }
                            },

                            colorAxis: {
                                min: 0,
                                minColor: stateColor,
                                maxColor: stateColor,
                            },

                            tooltip: {
                                pointFormat: '{point.name}<br/>',
                                footerFormat: '<span style="font-size: 10px">(Click to choose)</span>'
                            },

                            series: [{
                                data: data,
                                mapData: Highcharts.maps[mapLocation],
                                joinBy: 'hc-key',
                                name: ' ',//'Random data',
                                states: {
                                    hover: {
                                        color: hoverColor,
                                        lineColor: statelineColor
                                    }
                                },
                                dataLabels: {
                                    enabled: false,
                                    format: '{point.name}'
                                }
                            }, {
                                name: 'Separators',
                                type: 'mapline',
                                data: Highcharts.geojson(Highcharts.maps[mapLocation], 'mapline'),
                                color: 'silver',
                                showInLegend: false,
                                enableMouseTracking: false
                            },
                            {
                                name: 'Terminals',
                                type: 'mappoint',
                                //data: cities,
                                color: 'black',
                                marker: {
                                    radius: 2,
                                    states: {
                                        hover: {
                                            enabled: false
                                        }
                                    }
                                },
                                dataLabels: {
                                    align: 'left',
                                    verticalAlign: 'middle'
                                },
                                animation: false,
                                tooltip: {
                                    pointFormat: '{point.name}',
                                    footerFormat: ' '
                                }
                            }
                            ]
                        }, function (chart) { // on complete
                                $("path[fill='" + stateColor + "']").attr("fill-opacity", .30);
                                //var img = chart.renderer.image(svgMapLocation, bgOffsetX, bgOffsetY, bgWidth, bgHeight).add();
                            }
                        );
                    });
