try {
    var req = JSON.parse(context.getVariable("request.content"));
    
    //Sample for extracting info from Auth token
    var actor = context.getVariable("jwt.JWT-VerifyToken.claim.actor");
    var userId = context.getVariable("jwt.JWT-VerifyToken.claim.userId");
    var messageId =  context.getVariable("flow.tracking.messageId");
    
    context.setVariable("conditionFlowName", "Resource1"); 

    //sample request for target - constructed by mapping to various fields in request, header, token etc.
    var reqObj = {
        "userId": userId,
        "actor" : actor,
        "messageId" : messageId,
        "firstName" : req.firstName,      
        "lastName" : req.lastName
    };

    context.setVariable("flow.target.verb", "POST");  //set HTTP verb for target
    context.setVariable("flow.target.pathsuffix", "/post");
    context.setVariable("conditionFlowName", "resource1");
    context.setVariable("request.content", JSON.stringify(reqObj));
    
} catch (e) {
	context.setVariable("flow.err.jsError", e);
    throw e;
}
