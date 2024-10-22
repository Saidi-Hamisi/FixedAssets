package com.fams.fixedasset.LeaseComponent.LeaseModule.HelperServices;

import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.LeaseSchedule.LeaseArmotizationSchedule;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.RouArmotizationSchedule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class LeaseCalculatorService {

    @Autowired DatesCalculator datesCalculator;

   //PaymentTiming = Beginning of Term
    public Double calcLeaseLiability(Double leaseAmt,Double discountRate, Double leaseTerm){
        try {
            //fixedPmt { (1-(1/(1+discountRate)^(leaseTerm-1)))/discountRate}
            DecimalFormat df = new DecimalFormat(".00");
            discountRate=(discountRate/100);
            Double base= (1+discountRate);
            Double exponent=(leaseTerm-1);
            Double pow= Math.pow(base,exponent);
            Double leaseLiability= leaseAmt*(1-(1/(pow)))/discountRate;
            return leaseLiability;
        }catch (Exception e){
            log.error("Error {} "+e);
            return null;
        }
    }

    // PaymentTiming== End of Term
    public Double calcLeaseLiabilityEoT(Double leaseAmt, Double discountRate, Double leaseTerm){
        try{
            //fixedPmt { (1-(1/(1+discountRate)^(leaseTerm)))/discountRate}
            DecimalFormat df = new DecimalFormat(".00");
            discountRate=(discountRate/100);
            Double base= (1+discountRate);
            Double exponentEoT=(leaseTerm);
            Double pow= Math.pow(base,exponentEoT);
            Double leaseLiabilityEoT= leaseAmt*(1-(1/(pow)))/discountRate;
            return leaseLiabilityEoT;
        }catch (Exception e){
            log.error("Error {} "+e);
            return null;
            //g
        }
    }

   //Payment Term = Beginning of Term
   public Double calcRightToUse(Double upfrontAmt,
                                 Double initialCost,
                                 Double leaseIncentive,
                                 Double leaseLiability){
        try {
            log.info("Calculating rou ***********************************");
            //=totalInitial+leaseLiability
           //totalInitial= leaseAmount+initialCost-incentives;
            log.info("fixed payment ::"+upfrontAmt);
            log.info("initial cost ::"+initialCost);
            log.info("lease liability ::"+leaseLiability);

            Double totalInitial=upfrontAmt+initialCost-leaseIncentive;
            Double RightToUse = totalInitial+leaseLiability;
            return RightToUse;

        }catch (Exception e){
            log.error("Error {} "+e);
            return null;
        }
    }

    //ROU PaymentTiming = End of Term
    public Double calcRightToUseEoT (Double upfrontPayment, Double initialCost, Double leaseIncentive, Double leaseLiabilityEoT){
        try {
            Double totalInitialEoT=initialCost-leaseIncentive+upfrontPayment;
            Double RightToUseEoT=totalInitialEoT + leaseLiabilityEoT;
            return RightToUseEoT;
        }catch (Exception e){
            log.error("Error {} "+e);
            return null;
        }
    }

    public Double calcRouDepreciation(Double rou, Double terms){
        try {
            //=rightToUse/terms

            return rou/terms;
        }catch (Exception e){
            log.error("Error {} "+e);
            return null;
        }
    }

    public List<LeaseArmotizationSchedule> generateLeaseAmortizationSchedule(Double openingBal,
                                                                             Double discountRate,
                                                                             Double period,
                                                                             Double leasePayment,
                                                                             String paymentFreq,
                                                                             String paymentTiming,
                                                                             Date startDate) {
        try {
            List<LeaseArmotizationSchedule> scheduleList = new ArrayList<>();

            for (int i = 0; i < period; i++) {
                Double amtToCalcDiscount;
                Double lease = 0.0;

                if (paymentTiming.equals("beginningofterm")) {
                    if (i == 0) {
                        amtToCalcDiscount = openingBal;
                    } else {
                        lease = leasePayment;
                        amtToCalcDiscount = openingBal - lease;
                    }
                } else if (paymentTiming.equals("endofterm")) {
                    if (i >= 0) {
                        lease = leasePayment;
                        amtToCalcDiscount = openingBal;
                    } else {
                        amtToCalcDiscount = openingBal;
                    }
                } else {
                    throw new IllegalArgumentException("Invalid paymentTiming value: " + paymentTiming);
                }

                Double discount = calcDiscount(amtToCalcDiscount, discountRate);
                Double closingBal = openingBal + discount - lease;

                LeaseArmotizationSchedule schedule = new LeaseArmotizationSchedule();
                schedule.setLeasePayment(lease);
                schedule.setOpeningBal(openingBal);
                schedule.setClosingBal(closingBal);
                schedule.setPeriod(i + 1);
                schedule.setDiscount(discount);
                schedule.setDate(startDate);

                scheduleList.add(schedule);

                openingBal = closingBal;
                log.info("New opening balance: " + openingBal);
            }

            if (paymentFreq.equalsIgnoreCase("annually")) {
                startDate = datesCalculator.addDate(startDate, 1, "YEARS");
            } else if (paymentFreq.equalsIgnoreCase("semiAnnually")) {
                startDate = datesCalculator.addDate(startDate, 6, "MONTHS");
            } else if (paymentFreq.equalsIgnoreCase("quarterly")) {
                startDate = datesCalculator.addDate(startDate, 4, "MONTHS");
            } else if (paymentFreq.equalsIgnoreCase("monthly")) {
                startDate = datesCalculator.addDate(startDate, 1, "MONTHS");
            }
            return scheduleList;

        } catch (Exception e) {
            log.error("Error generating lease amortization schedule: " + e.getMessage());
            return null;
        }

    }
    public List<RouArmotizationSchedule> generateRouSchedules(Double openingBal,
                                                              Double period,
                                                              String paymentFreq,
                                                              Double fixedPmt,
                                                              Date startDate,
                                                              String paymentTiming) {
        try {
            List<RouArmotizationSchedule> ls = null;
            if (paymentTiming.equalsIgnoreCase("beginningofyear")) {
                Double depreciation = openingBal / period;
                Double openingBalance = openingBal;

                ls = new ArrayList<>();
                for (Integer i = 0; i < period; i++) {
                    Double closingBal = openingBalance - depreciation;
                    RouArmotizationSchedule sc = new RouArmotizationSchedule();
                    sc.setBalance(openingBalance);
                    sc.setPeriod(i + 1);
                    sc.setDate(startDate);
                    sc.setDepreciation(depreciation);
                    sc.setClosingBal(closingBal);

                    ls.add(sc);

                    openingBalance = closingBal;

                    if (paymentFreq.equalsIgnoreCase("annually")) {
                        startDate = datesCalculator.addDate(startDate, 1, "YEARS");
                    } else if (paymentFreq.equalsIgnoreCase("semiAnnually")) {
                        startDate = datesCalculator.addDate(startDate, 6, "MONTHS");
                    } else if (paymentFreq.equalsIgnoreCase("quarterly")) {
                        startDate = datesCalculator.addDate(startDate, 4, "MONTHS");
                    } else if (paymentFreq.equalsIgnoreCase("monthly")) {
                        startDate = datesCalculator.addDate(startDate, 1, "MONTHS");
                    }

                    log.info("new opening balance :: " + openingBal);
                }
            } else if (paymentTiming.equalsIgnoreCase("endofyear")) {
                RouArmotizationSchedule firstSchedule = ls.get(0);
                firstSchedule.setBalance(openingBal - Double.parseDouble(String.valueOf(fixedPmt)));
                firstSchedule.setClosingBal(firstSchedule.getBalance() - firstSchedule.getDepreciation());
            }

            return ls;

        } catch (Exception e) {
            log.error("Error {} " + e);
            return null;
        }
    }


    public Date getEndDate(Double openingBal,
                           Double period,
                           String paymentFreq,
                           Date startDate) {
        try {
            for (Integer i = 0; i < period; i++) {
                if (paymentFreq.equalsIgnoreCase("annually")) {
                    startDate = datesCalculator.addDate(startDate, 1, "YEARS");
                } else if (paymentFreq.equalsIgnoreCase("semiAnnually")) {
                    startDate = datesCalculator.addDate(startDate, 6, "MONTHS");
                } else if (paymentFreq.equalsIgnoreCase("quarterly")) {
                    startDate = datesCalculator.addDate(startDate, 4, "MONTHS");
                } else if (paymentFreq.equalsIgnoreCase("monthly")) {
                    startDate = datesCalculator.addDate(startDate, 1, "MONTHS");
                }

                log.info("new opening balance :: " + openingBal);
            }

            return startDate;

        } catch (Exception e) {
            log.error("Error {} " + e);
            return null;
        }
    }


    private Double calcDiscount(Double amt, Double rate){
        try {
            return amt*(rate/100);
        }catch (Exception e){
            log.error("Error {} "+e);
            return null;
        }
    }

    // TODO: 6/1/2023 calculate opening balance from escalation schedule

    public Double calcOpeningBalanceFromEscalation(Double escalationRate,
                                      Double fixedAmt,
                                      Double term,
                                      Double discountingRate){
        try {
            Double currentEscalation=fixedAmt;
            Double pvSummation=0.0;
            escalationRate=escalationRate/100;
            discountingRate=discountingRate/100;
            for(Integer i=0;i<term;i++){
                Double periodEscalationFactor=currentEscalation*(1+escalationRate);
                log.info("i ::"+i);
                if(i==0){
                    log.info("currentEscalation  **"+currentEscalation);
                    Double addedRate=1+escalationRate;
                    Double pow=Math.pow(addedRate,i);
                    log.info("pow ::"+pow);
                    periodEscalationFactor=currentEscalation*pow;
                    log.info("periodEscalationFactor  **"+periodEscalationFactor);
                }

                log.info("periodEscalationFactor  **"+periodEscalationFactor);
                Double base=(1/(1+discountingRate));
                Double periodDiscountingFactor= Math.pow(base,i);
                log.info("periodDiscountingFactor  **"+periodDiscountingFactor);
                Double currentPv=(periodEscalationFactor*periodDiscountingFactor);
                log.info("currentPv  **"+currentPv);
                if(i !=0){
                    pvSummation=pvSummation+currentPv;
                }
                log.info("pvSummation  **"+pvSummation);
                currentEscalation=periodEscalationFactor;
                log.info("currentEscalation  **"+currentEscalation);
            }
            return pvSummation;
        }catch (Exception e){
            log.error("Error {} "+e);
            return null;
        }
    }
}
