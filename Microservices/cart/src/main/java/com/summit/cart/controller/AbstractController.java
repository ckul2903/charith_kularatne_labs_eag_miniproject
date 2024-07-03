package com.summit.cart.controller;

import com.summit.cart.dto.exception.CartNotFoundException;
import com.summit.cart.dto.exception.InvalidRequestException;
import com.summit.cart.dto.responses.ResponseObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
public class AbstractController {
    protected <T> ResponseEntity<ResponseObject> sendResponse(T response, HttpStatus httpStatus) {
        ResponseObject responseBody = new ResponseObject(response,httpStatus);
        return new ResponseEntity<>(responseBody, httpStatus);
    }

    protected <T> ResponseEntity<ResponseObject> sendSuccessResponse(T response) {
        return sendResponse(response, HttpStatus.OK);
    }

    protected <T> ResponseEntity<ResponseObject> sendCreatedResponse(T response) {
        return sendResponse(response, HttpStatus.CREATED);
    }

    protected ResponseEntity<ResponseObject> sendNoContentResponse() {
        return sendResponse("204", HttpStatus.NO_CONTENT);
    }

    @ResponseBody
    @ExceptionHandler(value = CartNotFoundException.class)
    private ResponseEntity<ResponseObject> handler(CartNotFoundException exception){
        log.error("Exception occured: {}",exception.getMessage());
        return sendResponse(exception.getMessage(),HttpStatus.NOT_FOUND);
    }

    @ResponseBody
    @ExceptionHandler(value = InvalidRequestException.class)
    private ResponseEntity<ResponseObject> handler(InvalidRequestException exception){
        log.error("Exception occured: {}",exception.getMessage());
        return sendResponse(exception.getMessage(),exception.getHttpCode());
    }

    @ResponseBody
    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    private ResponseEntity<ResponseObject> handler(HttpMessageNotReadableException exception){
        log.error("Exception occured: {}",exception.getMessage());
        return sendResponse(exception.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ResponseBody
    @ExceptionHandler
    private ResponseEntity<ResponseObject> defaultHandler(Exception exception){
        log.error("Exception occured: {}",exception.getMessage());
        return sendResponse(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
