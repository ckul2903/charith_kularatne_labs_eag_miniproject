package com.summit.cart.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseObject {
    private Object data;
    private HttpStatus httpStatus;

}
