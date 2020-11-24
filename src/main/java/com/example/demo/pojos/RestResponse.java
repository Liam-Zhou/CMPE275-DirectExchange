package com.example.demo.pojos;

import lombok.Data;
import net.sf.json.JSONObject;

@Data
public class RestResponse {

    private String status;
    private Integer code;
    private JSONObject payload;
}
