function Thermostat() {
    var me = this;

    me.temperature = ko.observable(0);
    me.running = ko.observable('none');
    me.high = ko.observable(0);
    me.low = ko.observable(0);

    me.updateStatus = function() {
        $.getJSON( "/api/status", function(data) {
            me.temperature(data.temperature);
            me.high(data.high);
            me.low(data.low);

            // removed running because the front end does it. Eventually the backend will do this
        });
    };

    /*
    Move this to the API at some point
     */
    me.regulateTemperature = function() {
        var high = parseInt(me.high());
        var low = parseInt(me.low());
        var temp = parseInt(me.temperature());

        if (temp > high) {
            me.running('ac');
        } else if (temp < low) {
            me.running('heat');
        } else {
            me.running('none');
        }
    };

    // compute the style for the heater
    me.heaterStatus = ko.pureComputed(function() {
        var style = ((me.running() == "heat") ? "on" : "off");
        return style;
    }, me);

    // compute the style for the AC
    me.acStatus = ko.pureComputed(function() {
        var style = ((me.running() == "ac") ? "on" : "off");
        return style;
    }, me);
}

//{temperature: 75, running: "heat", high: 80, low: 60}

$(function() {
    thermo = new Thermostat();

    thermo.temperature.subscribe(function(updated) {
        thermo.regulateTemperature();
    });

    ko.applyBindings(thermo);

    thermo.updateStatus();
});
