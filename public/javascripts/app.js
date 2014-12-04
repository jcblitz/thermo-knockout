function Thermostat() {
    var me = this;

    me.temperature = ko.observable("--");
    me.running = ko.observable('none');
    me.high = ko.observable(0);
    me.low = ko.observable(0);

    /*
        Takes takes the result returned from the backend and updates the view model
     */
    me.updateStatus = function(data) {
        me.temperature(data.temperature);
        me.high(data.high);
        me.low(data.low);
        me.running(data.running);
    };

    /*
        Take a sample from the thermostat unit
     */
    me.sample = function() {
        $.getJSON( "/api/sample", function(data) {
            me.updateStatus(data);
        });
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

$(function() {
    thermo = new Thermostat();

    ko.applyBindings(thermo);

    thermo.sample();
    setInterval(function () { thermo.sample();  }, 3000);
});
