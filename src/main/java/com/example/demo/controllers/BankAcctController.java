package com.example.demo.controllers;

import com.example.demo.entities.BankAccount;
import com.example.demo.enums.Currency;
import com.example.demo.pojos.RestResponse;
import com.example.demo.serviceImpl.BankAcctServiceImpl;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Controller
@RequestMapping("/bank")
public class BankAcctController {

    @Resource
    BankAcctServiceImpl bankAcctService;

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
            acct = bankAcctService.saveBankAcct(userId, bankName, country, acctNo, ownerName, ownerAddress, currency, sending, receiving);
            JsonConfig jc = new JsonConfig();
            jc.setExcludes(new String[]{"accounts"});
            jc.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
//            payload = JSONObject.fromObject(player1,jc) ;
            response.setPayload(JSONObject.fromObject(acct,jc));
            response.setCode(200);
            response.setStatus("success");
        }
        catch (Exception ex){
//            response.setPayload(null);
//            response.setCode(400);
            response.setStatus("failure");
        }
        return response;
    }
}
