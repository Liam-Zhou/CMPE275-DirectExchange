package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.pojos.RestResponse;
import com.example.demo.serviceImpl.UserServiceImpl;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Optional;


@CrossOrigin("http://localhost:3000")
@Controller
@RequestMapping("/user")
public class UserController {
    @Resource
    UserServiceImpl userService;

    @RequestMapping(value={"/login"},method = RequestMethod.GET,produces = {"application/json;charset=utf-8"})
    @ResponseBody
    @Transactional
    public RestResponse login(@RequestParam(required = false) String out_id,
                              @RequestParam(required = false) String email,
                              @RequestParam(required = false) String pwd
                              ){
        RestResponse response = new RestResponse();
        if(out_id != ""){
            Optional<User> user = userService.getUserByOutId(out_id);
            if(user.isPresent()){
                response.setPayload(JSONObject.fromObject(user.get()));
                response.setCode(HttpStatus.OK.value());
                response.setMessage("success");
            }else {
                response.setCode(HttpStatus.NOT_FOUND.value());
                response.setMessage("not found");
            }
        }
        if(email != ""){
            Optional<User> user = userService.getUserByEmail(email);
            if(user.isPresent()){
                response.setPayload(JSONObject.fromObject(user.get()));
                response.setCode(HttpStatus.OK.value());
                response.setMessage("success");
            }else {
                response.setCode(HttpStatus.NOT_FOUND.value());
                response.setMessage("not found");
            }
        }
        return response;
    }


    @RequestMapping(value={"/signUpInLocal"},method = RequestMethod.POST,produces = {"application/json;charset=utf-8"})
    @ResponseBody
    @Transactional
    public RestResponse signUpInLocal(@RequestParam(required = true) String emailId,
                                      @RequestParam(required = true) String pwd,
                                      @RequestParam(required = true) String nickName
                                      ){
        RestResponse response = new RestResponse();
        Optional<User> user =  userService.creatUser(emailId,pwd,nickName);
        if(user.isPresent()){
            response.setPayload(JSONObject.fromObject(user));
            response.setCode(HttpStatus.OK.value());
            response.setMessage("success");
        }else{
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setMessage("no");
        }

        return response;
    }
    @RequestMapping(value={"/signupByOutId"},method = RequestMethod.POST,produces = {"application/json;charset=utf-8"})
    @ResponseBody
    @Transactional
    public RestResponse signupByOutId(@RequestParam(required = true) String out_id){
        RestResponse response = new RestResponse();
        User user =  userService.creatUserByOutId(out_id);
        response.setPayload(JSONObject.fromObject(user));
        response.setCode(HttpStatus.OK.value());
        response.setMessage("success");
        return response;
    }

    @RequestMapping(value={"/connectLocalAccount"},method = RequestMethod.PUT,produces = {"application/json;charset=utf-8"})
    @ResponseBody
    @Transactional
    public RestResponse connectLocalAccount(@RequestParam(required = true) String out_id,
                                            @RequestParam(required = true) String emailId,
                                            @RequestParam(required = true) String pwd,
                                            @RequestParam(required = true) String nickName
                                      ){
        RestResponse response = new RestResponse();
        int res = userService.connectLocalAccount(out_id,emailId,pwd,nickName);

        if(res==1){
            response.setCode(HttpStatus.OK.value());
            response.setMessage("success");

            }else{
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("bad");
            }
        return response;
    }
    @RequestMapping(value={"/getByOutId"},method = RequestMethod.GET,produces = {"application/json;charset=utf-8"})
    @ResponseBody
    public RestResponse getByOutId(@RequestParam(required = true) String out_id){
        RestResponse response = new RestResponse();
        Optional<User> user = userService.getUserByOutId(out_id);
        if(user.isPresent()){
            JsonConfig jc = new JsonConfig();
            jc.setExcludes(new String[]{"userId","accounts","offers"});
            jc.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
            response.setPayload(JSONObject.fromObject(user.get(),jc));
            response.setCode(HttpStatus.OK.value());
            response.setMessage("success");
        }else{
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("no found");
        }
        return response;
    }
}
