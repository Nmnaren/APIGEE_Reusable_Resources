var messageId = "";
var incomingMessageId = context.getVariable("request.header.X-TransactionId");
if (incomingMessageId === "" || incomingMessageId === null){
    messageId = generateGuid();
    context.setVariable("request.header.X-TransactionId", messageId);
}else{
    messageId = incomingMessageId;
} 

context.setVariable("flow.tracking.messageId", messageId);