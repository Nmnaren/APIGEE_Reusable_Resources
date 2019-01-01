
function getDateString(date){
    try {
        return date.getFullYear()+""+('0' + (date.getMonth()+1)).slice(-2)+ ""+('0' + date.getDate()).slice(-2);
    } catch(e) {
		context.setVariable("flow.err.jsError", e);
        throw e;
    }
}



function isFieldObject(fieldValue){
    var result = '';
    if(typeof fieldValue !== 'object') {
        result = fieldValue;
    }
    return result;
}

function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

function getFlowContext() {
    var flowContext = '';
    flowContext = context.getVariable("context.flow");
    context.setVariable("flowContext", flowContext);
    return flowContext;
}

function setPathSuffix(){
    var targetSuffix = "";
    if(context.flow === "PROXY_REQ_FLOW"){
        var proxySuffix = context.getVariable("flow.proxy.pathsuffix");
	if(proxySuffix == '/resource1'){
	   targetSuffix = "/json";
	}else if(proxySuffix == '/resource2'){
	   targetSuffix = "/iloveapis";
	}else if(proxySuffix == '/resource3'){
	   targetSuffix = "/target/resource3";
	}
	context.setVariable("flow.target.pathsuffix", targetSuffix);
    }
	
}