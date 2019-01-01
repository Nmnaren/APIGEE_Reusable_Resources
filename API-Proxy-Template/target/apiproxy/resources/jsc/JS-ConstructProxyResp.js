 try {
    var targetResponse = JSON.parse(context.getVariable("response.content"));
    var response = {};
    response.responseDate = new Date();

    //TODO - process response from target and set final response for consumer
    
    //if target has sent success response
    response.isSuccess = true;
    //  response.result=....... as per contract with consumer
    response.result = targetResponse;
    
    //otherwise in case of error
    //  response.isSuccess = false;
    //  response.result=....... erorr response as per defined structure and contract with consumer

    context.setVariable("response.content", JSON.stringify(response));
    
} catch(e) {
	context.setVariable("flow.err.jsError", e);
    throw e;
}