package com.example.demo.controllers;

import com.example.demo.entities.OfferDetails;
import com.example.demo.pojos.MatchingOffers;
import com.example.demo.pojos.RestResponse;
import com.example.demo.serviceImpl.OfferServiceImpl;
import com.example.demo.utils.ResponsePayloadUtils;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Optional;

@Controller
@RequestMapping("/matchingOffers")
public class MatchingOffersController {

    @Resource
    OfferServiceImpl offerService;

    @Resource
    ResponsePayloadUtils responsePayloadUtils;

    @RequestMapping(value={"/all"},method = RequestMethod.GET,produces = {"application/json;charset=utf-8"})
    @ResponseBody
    @Transactional
    public RestResponse getAllMatchingOffers(@RequestParam(required = true) Long offerId){
        RestResponse response = new RestResponse();
        try {
            Optional<OfferDetails> offer = offerService.getOfferDetailsById(offerId);
            if (offer.isPresent()) {
                JsonConfig jc = new JsonConfig();
//                jc.setExcludes(new String[]{"accounts","offers"});
                jc.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
                MatchingOffers matchingOffers = offerService.getMatchingOffers(offer.get());
                JSONObject payload = responsePayloadUtils.matchingOffersJson(matchingOffers);//JSONObject.fromObject(matchingOffers);
                response.setPayload(payload);
                response.setCode(HttpStatus.OK.value());
                response.setMessage("success");
//                response.setDebugMessage("Invalid Offer Id " + offerId);
            } else {
                response.setPayload(null);
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setMessage("failure");
                response.setDebugMessage("Invalid Offer Id " + offerId);
            }
            return response;
        }
        catch (Exception ex){
            response.setPayload(null);
            response.setCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setMessage("failure");
            response.setDebugMessage(ex.getLocalizedMessage());
            return response;
        }
    }
}
