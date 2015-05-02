var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}
handle["/"] = requestHandlers.start;
handle["/want_plans"] = requestHandlers.want_plans;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/register"] = requestHandlers.register;
server.start(router.route, handle);

//start - want plans
// upload - take plans
