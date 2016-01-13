<div id="property-map" class="property-map"></div>

        <div class="search-filter">
            <div class="search-form">
                <div class="filter-title">Filter Results</div>
                <form>
                    <!--<label>Property Type:</label><br/>
                    <input type="checkbox" name="development" value="development"> Development<br/>
                    <input type="checkbox" name="acquisition" value="acquisition"> Acquisition<br/>
                    <input type="checkbox" name="sold" value="sold"> Sold<br/>-->
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
        </div>
    <script title="Midland Atlantic Code">
        /////////////////////////////////////////////////////////////////
        ///* Begin Midland Atlantic *///
        /////////////////////////////////////////////////////////////////
        var midlandAddresses = [];

        //TODO: Come up with some better exception handling
        function SetFilterValue(val, hdn, checked) {
            var pieces = $("#" + hdn).val().split(',');

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

            var newVal = pieces.join(',');

            if (newVal[0] == ",") {
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

            if (state != "" && state != null) {
                conditions.push(new PropertyAttribute("state", state));
            }

            ClearMarkers();

            RenderMap(conditions);

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

            baseConditions.push(new PropertyAttribute("sale-type", "", false, true, true));

            RenderMap(null, 8);

            ResultsUpdate();
        }

        function AdvancedMidlandMap() {
            Initialize();

            GetMapEntries();

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
            var saleOnly = "http://www.propertypigeon.co.uk/content/images/for-sale-icon-small.gif";
            var leaseOnly = "http://www.propertypigeon.co.uk/content/images/for-rent-icon-small.gif";
            var both = "http://2.bp.blogspot.com/-6APSO8qI3kE/U-7FHBtnr1I/AAAAAAAAG3s/G1iTgS1cdFE/s1600/aa1.gif";
            var question = "http://images.clipartpanda.com/blue-question-mark-icon-question_mark_blue_23x23.jpg";

            if (null != address) {
                var attr = address.getAttribute("sale-type");
                var pType = address.getAttribute("property-type");

                if (null != attr) {
                    console.log(address.name + ": " + attr.value + "\r\nProperty: " + pType.value);

                    if (attr.value == "For Sale") {
                        return saleOnly;
                    }

                    if (attr.value == "For Lease") {
                        return leaseOnly;
                    }

                    if (attr.value != null && attr.value.indexOf("Sale") > -1 && attr.value.indexOf("Lease") > -1) {
                        return both;
                    }
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
                        zoom: GetNonNullValue(zoom, 8)
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
                        var pieces = (condition.value != null) ? condition.value.split(',') : [];

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
                    return attr.value == condition.value && !condition.excludePositiveResults;
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


    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSn84J20LozLBAHXZ3VJ814qrf-lEjqfY&callback=MainMidlandMap"></script>
        <!-- Main Content -->

        <div class="page-content">

            <div class="row">

                <!-- Left Side Main Content -->

                <div class="large-12 medium-12 columns">

                    <main>

                        <!-- Property Search -->

                        <script id="results-template" type="text/x-handlebars-template">
                            <div class="large-6 medium-6 columns">
                                <div class="property-search-wrap {{directoryEntry.state}} {{directoryEntry.property-type}} {{directoryEntry.sale-type}}">
                                    <div class="property-search-img">
                                        <img src="{{directoryEntry.imgsrc}}" alt="{{directoryEntry.title}}" />
                                    </div>
                                    <div class="property-search-text">
                                        <div class="property-search-title">
                                            <a href="{{directoryEntry.pageurl}}">{{directoryEntry.title}}</a>
                                        </div>
                                        <div class="property-search-address">
                                            {{directoryEntry.street-address}}, {{directoryEntry.city}}, {{directoryEntry.state}} {{directoryEntry.zip-code}}
                                        </div>
                                        <div class="property-type">
                                            <i class="fa fa-map-marker">&nbsp;</i>{{directoryEntry.sale-type}}<br/>
                                            <!--<i class="fa fa-map-marker">&nbsp;</i>%%property-type%%-->
                                        </div>
                                        <div class="property-read-more">
                                            <a href="{{pageurl}}">
                                                <span class="MPStyle_GreenButton"> Read More </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </script>

                        <div class="property-view"></div>

                    </main>

                </div>

            </div>

    </div>
