package com.summit.user.controller;

import com.summit.user.dto.ResponseObject;
import com.summit.user.exception.GenericException;
import com.summit.user.exception.InvalidRequestException;
import com.summit.user.exception.UserNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@RequestMapping("/api/v1/")
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
    @ExceptionHandler(value = UserNotFoundException.class)
    private ResponseEntity<ResponseObject> handler(UserNotFoundException exception){
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
    @ExceptionHandler(value = GenericException.class)
    private ResponseEntity<ResponseObject> defaultHandler(Exception exception){
        log.error("Exception occured: {}",exception.getMessage());
        return sendResponse(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
