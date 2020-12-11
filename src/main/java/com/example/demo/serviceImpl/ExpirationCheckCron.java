package com.example.demo.serviceImpl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;

@Component
public class ExpirationCheckCron {

    private static final Logger logger = LogManager.getLogger(ExpirationCheckCron.class);

    @Resource
    CounterOfferServiceImpl counterOfferService;

    @Scheduled(cron = "0 0/1 * * * *")
    public void checkForExpiration(){
        logger.debug("Strating Cron Job at "+(new Date()).toString()+"....");
        counterOfferService.updateExpiredOffers();
        logger.debug("Cron Job Completed....");
    }


}
