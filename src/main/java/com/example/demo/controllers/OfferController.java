package com.example.demo.controllers;

import com.example.demo.entities.OfferDetails;
import com.example.demo.entities.User;
import com.example.demo.enums.Currency;
import com.example.demo.pojos.RestResponse;
import com.example.demo.serviceImpl.OfferServiceImpl;
import com.example.demo.serviceImpl.UserServiceImpl;
import com.example.demo.utils.ResponsePayloadUtils;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Controller
@RequestMapping("/offer")
@CrossOrigin("http://localhost:3000")
public class OfferController {
    @Resource
    OfferServiceImpl offerService;
    @Resource
    UserServiceImpl userService;

    @Resource
    ResponsePayloadUtils responsePayloadUtils;

    @RequestMapping(value={"/"},method = RequestMethod.POST,produces = {"application/json;charset=utf-8"})
    @ResponseBody
    @Transactional
    public RestResponse createOffer(@RequestParam(required = true) String Dcountry,
                                    @RequestParam(required = true) String Dcurrency,
                                    @RequestParam(required = true) String Scountry,
                                    @RequestParam(required = true) String Scurrency,
                                    @RequestParam(required = true) double amount,
                                    @RequestParam(required = true) boolean counterOffer,
                                    @RequestParam(required = true) boolean splitOffer,
                                    @RequestParam(required = true) double rate,
                                    @RequestParam(required = true) long expireDate,
                                    @RequestParam(required = true) long user_id
                                    )
    {
        RestResponse response = new RestResponse();
        OfferDetails offer = new OfferDetails();
        Optional <User> u = userService.getUserDetails(user_id);
        if(u.isPresent()){
            offer.setUserId(u.get());
            offer.setSourceCountry(Scountry);
            offer.setSourceCurrency(Currency.valueOf(Scurrency));
            offer.setDestinationCountry(Dcountry);
            offer.setDestinationCurrency(Currency.valueOf(Dcurrency));
            offer.setAllowCounterOffers(counterOffer);
            offer.setAllowSplitExchange(splitOffer);
            offer.setExchangeRate(rate);
            offer.setExpirationDate(new Date(expireDate));
            offer.setAmount(amount);

            JsonConfig jc = new JsonConfig();
            jc.setExcludes(new String[]{"userId"});
            jc.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);

            response.setPayload(JSONObject.fromObject(offerService.CareteOffer(offer,u.get().getId()),jc));
            response.setCode(HttpStatus.OK.value());
            response.setMessage("success");
        }else{
            response.setCode(HttpStatus.NOT_FOUND.value());
            response.setMessage("no found");
        }
        return response;
    }
}
