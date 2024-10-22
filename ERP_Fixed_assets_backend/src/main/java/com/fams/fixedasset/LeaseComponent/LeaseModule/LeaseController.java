package com.fams.fixedasset.LeaseComponent.LeaseModule;

import com.fams.fixedasset.Authentication.exceptions.ApiRequestException;
import com.fams.fixedasset.LeaseComponent.LeaseModule.HelperServices.LeaseCalculatorService;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.LeaseSchedule.LeaseArmotizationSchedule;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.RouArmotizationSchedule;
import com.fams.fixedasset.Utils.Responses.EntityResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Slf4j
@RequestMapping("api/v1/lease")
@RestController
public class LeaseController {
    @Autowired
    private LeaseService leaseService;
    @Autowired
    private LeaseCalculatorService leaseCalculatorService;

    @PostMapping("add/lease")
    public ResponseEntity<?> addLease(@RequestBody Lease lease) {
        try {
            EntityResponse res =leaseService.addLease(lease);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            throw new ApiRequestException("failed");
        }
    }

    @GetMapping("find/by/id/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        try {
            EntityResponse res =leaseService.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }

    @GetMapping("find/all")
    public ResponseEntity<?> findAll() {
        try {
            EntityResponse res =leaseService.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }

    @PutMapping("update/by/id/{id}")
    public ResponseEntity<?> updateLease(@PathVariable("id") Long id, Lease lease) {
        try {
            EntityResponse res =leaseService.updateLease(id,lease);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
//            return null;
            throw new ApiRequestException("failed");
        }
    }

    @PutMapping("temp/delete/{id}")
    public ResponseEntity<?> tempDelete(@PathVariable("id") Long id) {
        try {
            EntityResponse res =leaseService.tempDeleteLease(id);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }

    @DeleteMapping("permanent/delete/{id}")
    public ResponseEntity<?> permanentDelete(@PathVariable("id") Long id) {
        try {
            EntityResponse res =leaseService.permanentDelete(id);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }

    @GetMapping("lease/armotization/schedule/{id}")
    public ResponseEntity<?> getLeaseSchedules(@PathVariable("id") Long id) {
        try {
            EntityResponse res =leaseService.getLeaseSchedules(id);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }

    @GetMapping("rou/armotization/schedule/{id}")
    public ResponseEntity<?> getRouSchedules(@PathVariable("id") Long id) {
        try {
            EntityResponse res =leaseService.getRouSchedules(id);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }

    @GetMapping("calc/lease/liability/BoT")
    public ResponseEntity<?> calcPresentValue(@RequestParam Double leaseAmt,
                                              @RequestParam Double discountRate,
                                              @RequestParam Double leaseTerm) {
        try {
            Double d =leaseCalculatorService.calcLeaseLiability(leaseAmt,discountRate,leaseTerm);
            return ResponseEntity.status(HttpStatus.OK).body(d);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }

    @GetMapping("calc/right/to/use/BowT")
    public ResponseEntity<?> calcRightToUse(@RequestParam Double upfrontAmt,
                                            @RequestParam Double initialCost,
                                            @RequestParam Double leaseIncentive,
                                            @RequestParam Double leaseLiability) {
        try {
            Double d =leaseCalculatorService.calcRightToUse(upfrontAmt,initialCost,leaseIncentive,leaseLiability);
            return ResponseEntity.status(HttpStatus.OK).body(d);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }

    @GetMapping ("calc/rou/EoT")
    public ResponseEntity<?> calcRightToUseEoT (@RequestParam Double initialCost,
                                                @RequestParam Double upfrontAmt,
                                                @RequestParam Double leaseIncentive,
                                                @RequestParam Double leaseLiabilityEoT) {
        try {
            Double d = leaseCalculatorService.calcRightToUseEoT(upfrontAmt, initialCost, leaseIncentive, leaseLiabilityEoT);
            return ResponseEntity.status(HttpStatus.OK).body(d);
        }catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }


    @GetMapping("calc/opening/bal")
    public ResponseEntity<?> calcOpeningBalanceFromEscallation(@RequestParam Double escalationRate,
                                                               @RequestParam Double fixedAmt,
                                                               @RequestParam Double term,
                                                               @RequestParam Double discountingRate) {
        try {
            Double d =leaseCalculatorService.calcOpeningBalanceFromEscalation(escalationRate,fixedAmt,term,discountingRate);
            return ResponseEntity.status(HttpStatus.OK).body(d);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }

    @GetMapping("calc/lease/liability/end")
    public ResponseEntity<?> calcLeaseLiabilityEoT(@RequestParam Double leaseAmt,
                                                   @RequestParam Double discountRate,
                                                   @RequestParam Double leaseTerm) {
        try {
            Double d = leaseCalculatorService.calcLeaseLiabilityEoT(leaseAmt,discountRate,leaseTerm);
            return ResponseEntity.status(HttpStatus.OK).body(d);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }

    @GetMapping("lease/schedules")
    public ResponseEntity<?> getLeaseSchedules(@RequestParam Double openingBal,
                                               @RequestParam Double discountRate,
                                               @RequestParam Double period,
                                               @RequestParam Double leasePayment,
                                               @RequestParam String paymentFreq,
                                               @RequestParam String paymentTiming,
                                               @RequestParam Date startDate) {
        try {
            List<LeaseArmotizationSchedule> ls =leaseCalculatorService.generateLeaseAmortizationSchedule(openingBal,discountRate,
                    period,leasePayment,paymentFreq,paymentTiming,startDate);
            return ResponseEntity.status(HttpStatus.OK).body(ls);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }


    @GetMapping("rou/schedules")
    public ResponseEntity<?> getRouSchedules(@RequestParam Double openingBal,
                                             @RequestParam Double period,
                                             @RequestParam String paymentFreq,
                                             @RequestParam Double  fixedPmt,
                                             @RequestParam Date startDate,
                                             @RequestParam String  paymentTiming)
                                            {
        try {
            List<RouArmotizationSchedule> ls =leaseCalculatorService.generateRouSchedules(openingBal,period, paymentFreq, fixedPmt,startDate, paymentTiming);
            return ResponseEntity.status(HttpStatus.OK).body(ls);
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            throw new ApiRequestException("failed");
        }
    }
}
