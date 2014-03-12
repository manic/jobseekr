// Add New Relic Monitoring
require('newrelic');

var util = require('util'),
    connect = require('connect'),
    port = Number(process.env.PORT || 2222);

connect.createServer(connect.static(__dirname + '/dist')).listen(port);
util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');

