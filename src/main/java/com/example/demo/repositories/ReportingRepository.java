package com.example.demo.repositories;

import com.example.demo.entities.OfferDetails;
import com.example.demo.entities.Transaction;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


@EntityScan(basePackages = {"com.example.demo.entity"})
public interface ReportingRepository extends JpaRepository<OfferDetails,Transaction>{

	 @Transactional
	    @Query(value = "select o.amount,\n"+
	    		 "o.source_currency,\n"+ 
	    		 "(o.amount* o.exchange_rate) as destination_amount,\n"+
	    		 "o.destination_currency,o.exchange_rate,(o.amount*0.0005) as service_fee,\n"+
	    		 "DATE_FORMAT(FROM_UNIXTIME(t.created_at/1000),'%d-%m-%Y') as creation_date\n"+
	    		 "from transactions_details t, offer_details o \n"+
	    		 "where t.offer_id = o.id \n"+
	    		 //"and upper(t.status) = "COMPLETED" \n"+
	    		 "and o.user_id = :userID \n"+
	    		 "and MONTH(FROM_UNIXTIME(t.created_at/1000))= :month\n", nativeQuery = true)	 
	    List<Object[]> getTxnHistory(@Param("userID") Long userID, @Param("month") String month);
	    
	    
	    @Transactional
	    @Query(value = "SELECT CASE UPPER(status)\n"
	    		+ "       WHEN \"COMPLETED\"\n"
	    		+ "       THEN sum(amount)\n"
	    		+ "       ELSE 0\n"
	    		+ "       END as complete_amount, \n"
	    		+ "       CASE UPPER(status)\n"
	    		+ "       WHEN \"INCOMPLETE\"\n"
	    		+ "       THEN sum(amount)\n"
	    		+ "       ELSE 0\n"
	    		+ "       END as incomplete_amount,\n"
	    		+ "       CASE UPPER(status)\n"
	    		+ "       WHEN \"COMPLETED\"\n"
	    		+ "       THEN count(id)\n"
	    		+ "       ELSE 0\n"
	    		+ "       END as complete_txn, \n"
	    		+ "       CASE UPPER(status)\n"
	    		+ "       WHEN \"INCOMPLETE\"\n"
	    		+ "       THEN count(id)\n"
	    		+ "       ELSE 0\n"
	    		+ "       END as incomplete_txn,"
	    		+ "		  CASE UPPER(status)\n"
	    		+ "       WHEN \"COMPLETE\"\n"
	    		+ "       THEN sum(service_fee)\n"
	    		+ "       ELSE 0\n"
	    		+ "       END as total_service_fee"
	    		+ "       from (select td.id AS ID,abs(td.amount) * st.exchange_rate as amount,CASE UPPER(td.status)\n"
	    		+ "					   WHEN \"COMPLETED\"\n"
	    		+ "                       THEN \"COMPLETED\"\n"
	    		+ "                       ELSE \"INCOMPLETE\"\n"
	    		+ "                       END AS status, \n"
	    		+ "sum(abs(td.amount*0.0005) * st.exchange_rate) as service_fee\n"
	    		+ "FROM \n"
	    		+ "transactions_details td,\n"
	    		+ "offer_details od,\n"
	    		+ "static_exchange_rates st\n"
	    		+ "where td.offer_id = od.id\n"
	    		+ "and MONTH(FROM_UNIXTIME(td.created_at/1000))= :month\n"
	    		+ "and st.source_currency = td.currency\n"
	    		+ "and st.destination_currency = \"USD\"\n"
	    		+ "and td.amount <0) totals\n"
	    		+ "group by status;\n", nativeQuery = true)	 
	    List<Object[]> getSysFinancialReport(@Param("month") String month);

}
