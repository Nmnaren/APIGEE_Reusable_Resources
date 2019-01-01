try {
    var isError = false;
    var req = JSON.parse(context.getVariable("request.content"));
    
    //TODO - perform all the input validation here and set the isError variable accordingly
    
    var firstName = context.getVariable("flow.request.firstName");
    var lastName = context.getVariable("flow.request.lastName");
    
    if (!firstName || firstName === "") isError = true;
    if (!lastName || lastName === "") isError = true;
    
    context.setVariable("flow.err.isError", isError);
} catch (e) {
	context.setVariable("flow.err.jsError", e);
    throw e;
}


