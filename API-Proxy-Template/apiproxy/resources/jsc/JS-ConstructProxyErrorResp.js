try {
    var response = {};
    var date = new Date();
    var code = context.getVariable("flow.err.code");
    var description = context.getVariable("flow.err.description");
    var isSuccess = false;
    var errorList = [];
    var error = {
        "code": code,
        "description": description
    };
    errorList.push(error);

    response.responseDate = date;
    response.isSuccess = isSuccess;
    response.error = {
        "errorList": errorList
    };
    context.setVariable("flow.err.errorResponse", JSON.stringify(response));
    context.setVariable("flow.isError", true);
    
} catch(e) {
	context.setVariable("flow.err.jsError", e);
    throw e;
}
