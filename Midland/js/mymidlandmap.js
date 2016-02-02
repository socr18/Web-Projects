<!-- Banner/Gallery -->

    <div class="banner">
        <div class="banner-img">
            <a href="#"><Marketpath:ContentArea ID="ContentArea1" /></a>
                <div class="inside-bannerwrap">
                    <div class="row flex">
                        <div class="large-12 columns">
                            <div class="inside-banner-txt"><Marketpath:ContentArea ID="ContentArea2" /></div>
                        </div>
                    </div>
                </div>
        </div>
    </div>

<!-- Main Content -->


<div class="page-content">

    <div class="row">

        <!-- Left Side Main Content -->

        <div class="large-12 medium-12 columns">

            <main>
                <h2>Coming Soon</h2>
                <!-- Dev Acquisition-->
                <div class="large-6 medium-6 columns">
                    <div class="content"><Marketpath:ContentArea ID="ContentArea3" /></div>
                </div>
                <div class="large-6 medium-6 columns">
                    <div class="map-text"><Marketpath:ContentArea ID="ContentArea4" /></div>
                    <div id="property-map" class="dev-property-map"></div>

                        <!--<div class="search-filter">
                            <div class="search-form">
                                <div class="filter-title">Filter Results</div>
                                <form>
                                    <label>Property Type:</label><br/>
                                    <input type="checkbox" id="Development"  name="development" value="Development" onclick="SetFilterValue(this.value, 'property-type', this.checked)"> Development<br/>
                                    <input type="checkbox" id="Acquisition" name="acquisition" value="Acquisition" onclick="SetFilterValue(this.value, 'property-type', this.checked)"> Acquisition<br/>
                                    <input type="checkbox" id="Sold" name="sold" value="Sold" onclick="SetFilterValue(this.value, 'property-type', this.checked)"> Sold<br/>
                                    <label>Sale Type:</label><br/>
                                    <input type="checkbox" id="forSale" name="forsale" value="For Sale" onclick="SetFilterValue(this.value, 'sale-type', this.checked)"> For Sale<br/>
                                    <input type="checkbox" id="forLease" name="forlease" value="For Lease" onclick="SetFilterValue(this.value, 'sale-type', this.checked)"> For Lease<br/>
                                    <input type="checkbox" name="forsalelease" value="" onclick="SetFilterValue(this.value, 'sale-type', this.checked)"> For Sale or Lease<br/>
                                    <input type="hidden" id="sale-type" value="" />
                                    <label>State:</label><br/>
                                    <select id="state-drop" name="state-drop" onchange="SetFilters()" style="color:#000">
                                        <option value="">--All States--</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                    <button onclick="SetFilters()">Apply Filter</button>
                                </form>
                            </div>
                        </div>-->
                    <script title="Midland Atlantic Code">
        /////////////////////////////////////////////////////////////////
        ///* Begin Midland Atlantic *///
        /////////////////////////////////////////////////////////////////
        var midlandAddresses = [];

        //TODO: Come up with some better exception handling
        function SetFilterValue(val, hdn, checked) {
            var pieces = $("#" + hdn).val().split('|');

            var index = pieces.indexOf(val);

            if (index > -1) {
                pieces.splice(index, 1);
            }

            index = pieces.indexOf('');
            if (index > -1) {
                pieces.splice(index, 1);
            }

            if(checked)
                pieces.push(val);

            var newVal = pieces.join('|');

            if (newVal[0] == "|") {
                newVal = newVal.substr(1, newVal.length - 1);
            }

            $("#" + hdn).val(newVal);

            SetFilters();
        }

        function SetFilters() {

            debugger;

            var conditions = [];
            var saleType = $("#sale-type").val();
            var propType = $("#property-type").val();
            var state = $("#state-drop").val();

            if (saleType != "" && saleType != null) {
                conditions.push(new PropertyAttribute("sale-type", saleType, false, true));//Contains the value
            }

            if (propType != "" && propType != null) {
                conditions.push(new PropertyAttribute("property-type", propType, false, true)); //Only show developed options or something
            }

            var stZoom = parseInt('');

            if (state != "" && state != null) {
                conditions.push(new PropertyAttribute("state", state));

                //Set center of map
                geocoder = new google.maps.Geocoder();

                geocoder.geocode({ 'address': state }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);
                            stZoom = '8';
                        }
                    });
            }

            ClearMarkers();

            RenderMap(conditions);

            map.setZoom(stZoom);

            ResultsUpdate();
        }

        function GetMapEntries() {
            var directoryURL = "http://midland.dynamic.marketpath.com/get/directory-data/f28bc9af-5d5a-4cfc-bc24-6890652c5efd";

            var setMapEntries = function (resp, a, b) {
                //console.log(resp);
                //console.log(a);
                //console.log(b);

                for (var n = 0; n < resp.length; n++) {
                    var address = resp[n];

                    var name = address["title"];
                    if(name == "" || name == null)
                    {
                        name = address["street-address"];
                    }

                    var prop = new Property(new Address(address["street-address"], "", address["city"], address["state"], address["zip-code"]), name, address["pageurl"]);

                    var lat = address["latitude"];
                    var long = address["longitude"];

                    if (GetNonNullValue(lat) != null)
                        prop.latitude = parseFloat(lat);
                    else {
                        console.log(JSON.stringify(address));
                        console.log("Lat 1: " + lat);
                        console.log("Lat 2: " + prop.latitude);
                    }

                    if (GetNonNullValue(long) != null)
                        prop.longitude = parseFloat(long);
                    else {
                        console.log("Long 1: " + long);
                        console.log("Long 2: " + prop.longitude);
                    }

                    prop.attributes.push(new PropertyAttribute("property-type", address["property-type"]));
                    prop.attributes.push(new PropertyAttribute("sale-type", address["sale-type"]));
                    prop.attributes.push(new PropertyAttribute("state", address["state"]));

                    mapAddresses.push(prop);
                    prop.directoryEntry = address;
                }

                RenderMap();

                ResultsUpdate();
            };

            $.getJSON(directoryURL, null, setMapEntries);
        }

        function MainMidlandMap() {
            Initialize();

            GetMapEntries();

            baseConditions.push(new PropertyAttribute("property-type", "Sold", false, true, true));
            baseConditions.push(new PropertyAttribute("sale-type", "", true, false, true));

            RenderMap(null, 8);

            ResultsUpdate();

        }

        function AdvancedMidlandMap() {
            Initialize();

            GetMapEntries();

            baseConditions.push(new PropertyAttribute("property-type", "", true, false, true));

            RenderMap(null, 6);

            ResultsUpdate();

        }

        /////////////////////////////////////////////////////////////////
        ///* End Midland Atlantic *///
        /////////////////////////////////////////////////////////////////
    </script>
    <script title="Required Custom Functionality">
        /////////////////////////////////////////////////////////////////
        ///* Begin Customer Specific Code/Properties *///
        /////////////////////////////////////////////////////////////////
        function Initialize() {
            apiKey = "AIzaSyBv9vEKWRF1SrRtWL2WN8GeDRHUa3YVTHY";
            primaryAddress = new Property(new Address("6850 Priority Way South Drive", "Suite 100", "Indianapolis", "IN", "46240"), "Marketpath, Inc", "http://www.marketpath.com");
        }

        function GetIcon(address) {
            //Customer specific logic
            var saleOnly = "https://az480170.vo.msecnd.net/6faae9aa-6b4a-4e9e-9280-75cc14565cb8/img/orig/ff9b515a-8334-4e7e-a69f-7fb4c6b07b15/bluepin.png";
            var leaseOnly = "https://az480170.vo.msecnd.net/6faae9aa-6b4a-4e9e-9280-75cc14565cb8/img/orig/4ec6ceb3-bc23-41b9-b058-041bd402592d/greenpin.png";
            var both = "https://az480170.vo.msecnd.net/6faae9aa-6b4a-4e9e-9280-75cc14565cb8/img/orig/27621a7d-edfe-476e-95cf-ee5bdbf72b1a/darkgreenpin.png";
            var question = "http://images.clipartpanda.com/blue-question-mark-icon-question_mark_blue_23x23.jpg";

            if (null != address) {
                var attr = address.getAttribute("sale-type");
                var pType = address.getAttribute("property-type");

                if (null != attr) {
                    console.log(address.name + ": " + attr.value + "\r\nProperty: " + pType.value);

                    if (pType.value == "Development") {
                        return saleOnly;
                    }

                    if (pType.value == "Acquisition") {
                        return leaseOnly;
                    }

                    return both;

                }
            }

            return question;
        }

        //Here's where we do something once a marker gets clicked
        function ActivateMarker(index, item) {
            //Customer Specific logic

            var address = mapAddresses[index];
            //console.log(item);
            //console.log(JSON.stringify(item));
            //alert(address.name + "\r\n" + address.link);
            window.open(address.link, "_blank");
        }

        function GetUserLocation() {
            //prompt user for their current location or a starting address
            //store the value in userOriginLocation as a Property
        }

        function ResultsUpdate() {
            try {
                var source = $("#results-template").html();
                var template = Handlebars.compile(source);
                $(".property-view").html("");

                //debugger;
                for (var n = 0; n < matchedAddresses.length; n++) {
                    var html = template(matchedAddresses[n]);

                    $(".property-view").append(html);
                }

                $('.property .prop-img img').each(function() {
                    if ($(this).attr('src') == '') {
                        $(this).attr('src','https://az480170.vo.msecnd.net/6faae9aa-6b4a-4e9e-9280-75cc14565cb8/img/orig/8a7d168a-438a-4cb8-8ed6-3972a6086ef9/noimage.jpg');
                    }
                });

                // Sorting the Properties
                    $('.property-item').each(function(i){
                        if ( $(this).data('order') === '') {
                            var numb = 900 + i;
                            $(this).attr('data-order', numb);
                        }
                    });

                    $('.property-item').sort(sorted).appendTo('.property-view');

                    function sorted(a, b) {
                            var aVal = parseInt(a.getAttribute('data-order'));
                            var bVal = parseInt(b.getAttribute('data-order'));
                        return aVal -bVal;
                    }
                // End Sorting

                $('.property-view .property:gt(8)').hide();

                $('.show-button').click(function() {
                    $('.property-view .property:gt(8)').show();
                    $('.show-button').hide();
                });
            }
            catch (e) {
                alert(e);
            }
        }

        /////////////////////////////////////////////////////////////////
        ///* End Customer Specific Code/Properties *///
        /////////////////////////////////////////////////////////////////
    </script>
    <script title="Base Functionality">
        /////////////////////////////////////////////////////////////////
        ///* Begin Base Functionality *///
        /////////////////////////////////////////////////////////////////
        var map;
        var geocoder;
        var markers = [];
        var userOriginLocation = {};
        var baseConditions = [];

        //List of addresses
        var mapAddresses = [];
        var matchedAddresses = [];

        var apiKey = null;

        //Where the map centers
        var primaryAddress = new Property();

        function RenderMap(requiredConditions, zoom) {
            try {

                if (map == null) {
                    map = new google.maps.Map(document.getElementById('property-map'), {
                        zoom: GetNonNullValue(zoom, 7)
                    });

                    //Set center of map
                    geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ 'address': primaryAddress.address.fullAddress() }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);
                        }
                    });
                }

                var tempAddresses = [];

                if (baseConditions != null && baseConditions.length > 0) {
                    if (requiredConditions == null) {
                        requiredConditions = baseConditions;
                    }
                    else {
                        requiredConditions = requiredConditions.concat(baseConditions);
                    }
                }

                if (requiredConditions != null && requiredConditions.length > 0) {
                    for (var a = 0; a < mapAddresses.length; a++) {
                        var entry = mapAddresses[a];
                        var valid = true;

                        for (var c = 0; c < requiredConditions.length; c++) {
                            valid &= entry.matchesFilter(requiredConditions[c]); //Verify all conditions are met
                        }

                        if (valid)//Only add the address if all conditions are met
                            tempAddresses.push(a); //Push the index of the address
                    }
                }
                else {
                    //No conditions, add all of them
                    for (var a = 0; a < mapAddresses.length; a++) {
                        tempAddresses.push(a); //Push the index of the address
                    }
                }

                matchedAddresses = [];

                //Add all addresses to the map
                for (var n = 0; n < tempAddresses.length; n++) {
                    var address = mapAddresses[tempAddresses[n]];

                    var fn = function () { //It wasn't passing the index properly, so had to create a wrapper function
                        var index = tempAddresses[n];//Pulling the index from the counter so that the value doesn't change

                        if (address.latitude == 0 && address.longitude == 0) {
                            GetAddress(index);
                        }
                        else {
                            //AddMarker(address.geolocation, index);
                            AddMarker({ lat: address.latitude, lng: address.longitude }, index);
                        }
                    };//end fn

                    fn();
                    matchedAddresses.push(address);
                }
            }
            catch (e) {
                console.log(e);
                alert(e);
            }
        }

        function GetAddress(index, loop) {
            var address = mapAddresses[index];

            if (!loop) {
                loop = 0;
            }

            if (loop < 100) {//Don't want to try too many times
                var postProcess = function (results, status) {

                    console.log(JSON.stringify(address));
                    console.log("Item #" + index);
                    if (status == google.maps.GeocoderStatus.OK) {//If it found it okay
                        var result = results[0]; //Only display the first matching result

                        //debugger;
                        //Update the object so the call doesn't need to be done twice
                        mapAddresses[index].latitude = result.geometry.location.lat;
                        mapAddresses[index].longitude = result.geometry.location.lng;
                        mapAddresses[index].geolocation = result.geometry.location;

                        AddMarker(result.geometry.location, index);
                    }
                    else {
                        if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                            console.log("Over query limit. Trying again in: " + (loop + 250) + "ms");

                            setTimeout(function () { GetAddress(index, loop + 1) }, loop + 250);
                        }
                        else {
                            console.log(google.maps.GeocoderStatus);
                            console.warn("Address not found - [" + address.address.fullAddress() + "]");
                        }
                    }
                };

                geocoder.geocode({ 'address': address.address.fullAddress() }, postProcess);//end geocode
            }//loop checker
        }

        function AddMarker(location, index) {
            //console.log(JSON.stringify(location));
            var add = mapAddresses[index];
            var title = add.name + "\r\n" + add.address.address1;
            title += "\r\n" + add.address.city + ", " + add.address.state + " " + add.address.zip;

            var marker = new google.maps.Marker({
                map: map,
                position: location,
                clickable: true,
                visible: true,
                icon: GetIcon(mapAddresses[index]),
                title: title,
            });

            marker.addListener('click', function (a) {
                ActivateMarker(index, a);
            });

            markers.push(marker);
        }

        function ClearMarkers() {
            if (null != markers && markers.length > 0) {
                for (var n = 0; n < markers.length; n++) {
                    markers[n].setMap(null);
                }

                markers = [];
            }
        }

        function GetNonNullValue(item, defaultValue) {
            if (item == null || item == "") {
                return defaultValue;
            }

            return item;
        }

        /////////////////////////////////////////////////////////////////
        ///* End Base Functionality *///
        /////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////
        ///* Begin Base Class Declarations *///
        /////////////////////////////////////////////////////////////////
        function PropertyAttribute(name, value, useExactMatch, isArray, excludePositiveResults) {
            this.name = name;
            this.value = value;
            this.exactMatch = GetNonNullValue(useExactMatch, false);
            this.isArray = GetNonNullValue(isArray, false);
            this.excludePositiveResults = GetNonNullValue(excludePositiveResults, false);
        }

        function Property(address, name, link) {
            this.address = GetNonNullValue(address, new Address());
            this.name = GetNonNullValue(GetNonNullValue(name, this.address.fullAddress()), "Property");
            this.latitude = 0;
            this.longitude = 0;
            this.distanceFromOrigin = 0;
            this.geolocation = {};
            this.attributes = [];
            this.link = GetNonNullValue(link, "");
            this.directoryEntry = {};
            this.getAttribute = function (name) {
                if (this.attributes != null) {
                    if (this.attributes.length > 0) {
                        for (var n = 0; n < this.attributes.length; n++) {
                            if (this.attributes[n].name == name) {
                                return this.attributes[n];
                            }
                        }
                    }
                }
                return null;
            };
            this.matchesFilter = function (condition) {
                var attr = this.getAttribute(condition.name);
                //debugger;

                if (attr == null)
                    return false;

                if (condition.exactMatch == false) {
                    if (condition.isArray) {
                        //debugger;
                        //var pieces = condition.value.split(',');
                        var pieces = (condition.value != null) ? condition.value.split('|') : [];

                        if (GetNonNullValue(attr.value, null) != null) {
                            for (var p = 0; p < pieces.length; p++) {
                                var v = pieces[p];

                                if (attr.value.toString().indexOf(v) > -1) {
                                    return true && !condition.excludePositiveResults;
                                }
                            }
                        }

                        return false || condition.excludePositiveResults;
                    }
                    else {
                        if (GetNonNullValue(attr.value, null) != null)
                            return attr.value.toString().indexOf(condition.value) > -1 && !condition.excludePositiveResults;
                        else
                            return false || condition.excludePositiveResults;
                    }
                }
                else {
                    if(!condition.excludePositiveResults)
                        return attr.value == condition.value;
                    else
                        return attr.value != condition.value;
                }
            };
            this.getDistanceFromOrigin = function () {
                //TODO: Do this later
            };
        }

        function Address(address1, address2, city, state, zip, country) {
            this.address1 = GetNonNullValue(address1, "");
            this.address2 = GetNonNullValue(address2, "");
            this.city = GetNonNullValue(city, "");
            this.state = GetNonNullValue(state, "");
            this.zip = GetNonNullValue(zip, "");
            this.country = GetNonNullValue(country, "");
            this.fullAddress = function () {
                return this.address1 + " " + this.address2 + ", " +
                    this.city + ", " + this.state + " " + this.zip + " " + this.country;
            };
        }

        /////////////////////////////////////////////////////////////////
        ///* End Base Class Declarations *///
        /////////////////////////////////////////////////////////////////
    </script>

                <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSn84J20LozLBAHXZ3VJ814qrf-lEjqfY&callback=AdvancedMidlandMap"></script>
                        <script id="results-template" type="text/x-handlebars-template">
                            <div class="large-4 medium-4 columns property-item" data-order="{{directoryEntry.sort}}">
                                <div class="property">
                                    <div class="prop-img">
                                        <a href="{{directoryEntry.pageurl}}"><img src="{{directoryEntry.imgsrc}}" alt="{{directoryEntry.title}}" /></a>
                                    </div>
                                    <p>
                                        <a href="{{directoryEntry.pageurl}}"><span class="MPStyle_PropertyDevTitle">{{directoryEntry.title}}</span></a><br/>
                                        {{directoryEntry.city}}, {{directoryEntry.state}}
                                    </p>
                                </div>
                            </div>
                        </script>

                </div>

                <!-- Properties -->
                <div class="large-12 logo-float">

                    <div class="property-view"></div>

                </div>

                <div class="large-12 columns more-properties">
                    <div class="show-button MPStyle_GreenButton">Show All Properties</div>
                </div>

            </main>

        </div>

    </div>

</div>


$(document).ready(function() {

$('.inside-banner-txt h1').html($('.mp-list-title h1').html());

});

    var cincy = $('.cincy');

    do $(cincy.slice(0,5)).wrapAll('<div class="large-12 employees" />');
    while((cincy = cincy.slice(5)).length>0)

   var indy = $('.indy');

    do $(indy.slice(0,5)).wrapAll('<div class="large-12 employees" />');
    while((indy = indy.slice(5)).length>0)


   $('.biodetails .close').click(function() {
        $('.biowrap').slideUp();
    });
