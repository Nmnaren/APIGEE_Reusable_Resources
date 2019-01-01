function createLoggingMessage(loggerObj) {
    var isLogHeaders = context.getVariable("isLogHeaders");
    var isLogPayload = context.getVariable("isLogPayload");
    var clientIp = context.getVariable("proxy.client.ip");
    var browser = "";
    var uuid = "";
    var conditionFlow = "";
    var reqHeadersString = "";
    var headerCount = context.getVariable("request.headers.count");
    var headerNames = context.getVariable("request.headers.names");
    var environmentName = context.getVariable("environment.name");
    headerNames = headerNames.toArray();
    if(isLogHeaders === "Y") {
        for(var i = 0; i < headerCount; i++) {
            var headerName = headerNames[i];
            var headerVal = context.getVariable("request.header." + headerName);
            reqHeadersString = reqHeadersString + "[" + headerName + ": " + headerVal + "]";
            if (i + 1 !== headerCount) {
                reqHeadersString = reqHeadersString + ",";
            }
        }
    }
    browser = context.getVariable("request.header.user-agent");
    conditionFlow = context.getVariable("conditionFlowName");
    uuid = context.getVariable("flow.tracking.messageId");
    
    var log_message = loggerObj.loglevel + "|" + loggerObj.type + "|" + environmentName + "|" + reqHeadersString + "|" + loggerObj.timeStamp + "|" + loggerObj.statusCode + "|" + loggerObj.apiErrorCode + "|" + loggerObj.errorDescription + "|" + conditionFlow + "|" + clientIp + "|" + uuid + "|" + browser;
    
    if (isLogPayload === "Y")
        log_message += "|" + loggerObj.payload;
    
    context.setVariable("syslog_message", log_message);
}

var reqContent = "";
var resContent = "";
var timeTaken = "";
var loggerObj ={};
var statusCode = context.getVariable("response.status.code");
var currentSystemTime = context.getVariable("system.timestamp");
var httpVerb = context.getVariable("request.verb");
var loglevel = context.getVariable("logLevel");
var flowContext = context.getVariable("flowContext");

if (flowContext === "PROXY_REQ_FLOW") {
    if(httpVerb === "GET") {
        reqContent = context.getVariable('request.querystring');
    } else {
        reqContent = context.getVariable('request.content').trim().replace(/\t/g, '').replace(/\r/g, '').replace(/\n/g, '');
    }
    loggerObj = {
        "payload": reqContent,
        "loglevel": loglevel,
        "type": "Request-Proxy",
        "statusCode": "",
        "apiErrorCode": "",
        "errorDescription": "",
        "timeStamp": ""
    };
} else if(flowContext === "TARGET_REQ_FLOW") {
    reqContent = context.getVariable('request.content').trim().replace(/\r/g, '').replace(/\n/g, '').trim();
    loggerObj = {
        "payload": reqContent,
        "loglevel": loglevel,
        "type": "Request-Target",
        "statusCode": "",
        "apiErrorCode": "",
        "errorDescription": "",
        "timeStamp": ""
    };
} else if(flowContext === "PROXY_RESP_FLOW") {
    resContent = context.getVariable('response.content').replace(/\n/g, '').trim();
    var proxyTimeStamp = context.getVariable("client.received.end.timestamp");
    timeTaken = currentSystemTime - proxyTimeStamp;
    loggerObj = {
        "payload": resContent,
        "loglevel": loglevel,
        "type": "Response-Proxy",
        "statusCode": statusCode,
        "apiErrorCode": "",
        "errorDescription": "",
        "timeStamp": timeTaken
    };
 } else if(flowContext === "TARGET_RESP_FLOW") {
    resContent = context.getVariable('response.content').replace(/\n/g, '').trim();
    var targetStartTimeStamp = context.getVariable("target.sent.start.timestamp");
    timeTaken = currentSystemTime - targetStartTimeStamp;
    loggerObj = {
        "payload": resContent,
        "loglevel": loglevel,
        "type": "Response-Target",
        "statusCode": statusCode,
        "apiErrorCode": "",
        "errorDescription": "",
        "timeStamp": timeTaken
    };
   
} else if(flowContext === "ERROR"){
    reqContent = context.getVariable('error.content').trim().replace(/\t/g, '').replace(/\r/g, '').replace(/\n/g, '');
    statusCode = context.getVariable("error.status.code");
    var apiErrorCode = context.getVariable("flow.err.code");
    var errorDescription = context.getVariable("flow.err.description");
	var jsError = context.getVariable("flow.err.jsError");
    if(jsError !== null){
        errorDescription = errorDescription + " - " + jsError;
    }

    if((apiErrorCode === "API-ERR-1004") && (context.getVariable("fault.name") === "InvalidApiKey")) {
        errorDescription = "InvalidApiKey";
    }
    if((apiErrorCode === "API-ERR-1004") && (context.getVariable("fault.name") === "InvalidApiKeyForGivenResource")) {
        errorDescription = "InvalidApiKeyForGivenResource";
    }
    if((apiErrorCode === "API-ERR-1004") && (context.getVariable("fault.name") === "TokenExpired")) {
        errorDescription = "InvalidToken";
    }
    if((apiErrorCode === "API-ERR-1004") && (context.getVariable("fault.name") === "FailedToDecode")) {
        errorDescription = "InvalidToken";
    }
    loggerObj = {
        "payload": reqContent,
        "loglevel": "ERROR",
        "type": "Response-Proxy",
        "statusCode": statusCode,
        "apiErrorCode": apiErrorCode,
        "errorDescription": errorDescription,
        "timeStamp": ""
    };
}
createLoggingMessage(loggerObj);
