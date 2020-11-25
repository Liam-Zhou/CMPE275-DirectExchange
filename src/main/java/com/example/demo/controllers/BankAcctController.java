package com.example.demo.controllers;

import com.example.demo.entities.BankAccount;
import com.example.demo.entities.User;
import com.example.demo.enums.Currency;
import com.example.demo.pojos.RestResponse;
import com.example.demo.serviceImpl.BankAcctServiceImpl;
import com.example.demo.serviceImpl.UserServiceImpl;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import java.util.Optional;

@Controller
@RequestMapping("/bank")
public class BankAcctController {

    private static final Logger logger = LogManager.getLogger(BankAcctController.class);

    @Resource
    BankAcctServiceImpl bankAcctService;

    @Resource
    UserServiceImpl userService;

    @RequestMapping(value={"/setup"},method = RequestMethod.POST,produces = {"application/json;charset=utf-8"})
    @ResponseBody
    @Transactional
    public RestResponse setUpBankAcct(@RequestParam(required = true) Long userId,
                                          @RequestParam(required = true) String bankName,
                                          @RequestParam(required = true) String country,
                                          @RequestParam(required = true) String acctNo,
                                          @RequestParam(required = true) String ownerName,
                                          @RequestParam(required = true) String ownerAddress,
                                          @RequestParam(required = true) Currency currency,
                                          @RequestParam(required = true) Boolean sending,
                                          @RequestParam(required = true) Boolean receiving) {

        BankAccount acct;
        RestResponse response = new RestResponse();
        try {
            Optional<User> user = userService.getUserDetails(userId);
            if(user.isPresent()) {
                acct = bankAcctService.saveBankAcct(userId, bankName, country, acctNo, ownerName, ownerAddress, currency, sending, receiving, user.get());
                JsonConfig jc = new JsonConfig();
                jc.setExcludes(new String[]{"accounts","offers"});
                jc.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
                response.setPayload(JSONObject.fromObject(acct, jc));
                response.setCode(HttpStatus.OK);
                response.setMessage("success");
            } else {
                response.setPayload(null);
                response.setCode(HttpStatus.BAD_REQUEST);
                response.setMessage("failure");
                response.setDebugMessage("Invalid User Id " + userId);
            }
            return response;
        }
        catch (Exception ex){
            response.setPayload(null);
            response.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setMessage("failure");
            response.setDebugMessage(ex.getLocalizedMessage());
            return response;
        }
    }
}
