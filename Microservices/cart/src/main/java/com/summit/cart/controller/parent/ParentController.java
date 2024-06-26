package com.summit.cart.controller.parent;

import com.summit.cart.dto.responses.ResponseObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ParentController {
    protected <T> ResponseEntity<ResponseObject> sendResponse(T response, HttpStatus httpStatus) {
        ResponseObject responseBody = new ResponseObject();
        responseBody.setData(response);
        responseBody.setHttpStatus(httpStatus);
        return new ResponseEntity<>(responseBody, httpStatus);
    }

    protected <T> ResponseEntity<ResponseObject> sendSuccessResponse(T response) {
        return sendResponse(response, HttpStatus.OK);
    }

    protected <T> ResponseEntity<ResponseObject> sendSuccessResponse() {
        return sendResponse("200", HttpStatus.OK);
    }

    protected <T> ResponseEntity<ResponseObject> sendCreatedResponse(T response) {
        return sendResponse(response, HttpStatus.CREATED);
    }

    protected ResponseEntity<ResponseObject> sendNoContentResponse() {
        return sendResponse("204", HttpStatus.NO_CONTENT);
    }

    protected ResponseEntity<ResponseObject> sendBadRequest() {
        return sendResponse("400", HttpStatus.BAD_REQUEST);
    }

    protected ResponseEntity<ResponseObject> sendNotFound() {
        return sendResponse("404", HttpStatus.NOT_FOUND);
    }

    protected ResponseEntity<ResponseObject> sendInternalError() {
        return sendResponse("500", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
