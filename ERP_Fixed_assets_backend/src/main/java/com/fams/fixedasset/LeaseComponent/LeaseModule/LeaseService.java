package com.fams.fixedasset.LeaseComponent.LeaseModule;

import com.fams.fixedasset.LeaseComponent.LeaseModule.Constants.PaymentFrequency;
import com.fams.fixedasset.LeaseComponent.LeaseModule.Constants.PaymentTiming;
import com.fams.fixedasset.LeaseComponent.LeaseModule.HelperServices.LeaseCalculatorService;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.LeaseSchedule.LeaseArmotizationSchedule;
import com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.RouArmotizationSchedule;
import com.fams.fixedasset.Utils.CONSTANTS;
import com.fams.fixedasset.Utils.Responses.EntityResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class LeaseService {
    @Autowired
    private LeaseRepo leaseRepo;

    @Autowired
    private LeaseCalculatorService leaseCalculatorService;

    public EntityResponse addLease(Lease lease) {
        try {
            EntityResponse res = new EntityResponse<>();
            lease.setPostedBy("SYS");
            lease.setPostedTime(new Date());
            PaymentFrequency paymentFrequency = lease.getPaymentFrequency();
            Double dr = 0.0;
            Double ct = 0.0;
            Double discountRate = lease.getDiscountRate();
            Integer term = lease.getLeaseTerm();
            log.info("payment freq is :: " + paymentFrequency.name());
            if (paymentFrequency.name().equals("annually")) {
                dr = discountRate / 1;
                ct = term * 1.0;
            } else if (paymentFrequency.name().equals("semiAnnually")) {
                dr = discountRate / 2;
                ct = term * 2.0;
            } else if (paymentFrequency.name().equals("quarterly")) {
                dr = discountRate / 4;
                ct = term * 4.0;
            } else if (paymentFrequency.name().equals("monthly")) {
                dr = discountRate / 12;
                ct = term * 12.0;
            } else {
                res.setEntity(lease);
                res.setStatusCode(HttpStatus.CREATED.value());
                res.setMessage("Invalid payment frequency, expecting annually, semiAnnually, quarterly, monthly");
                return res;
            }

            lease.setComputedTerm(ct);
            lease.setComputedDiscountingRate(dr);

            //beginningOfTerm OR endOfTerm
            Double leaseLiability = null;
            // TODO: 6/16/2023  payment timing.... Lease Liablity

            if (lease.getPaymentTiming().name().trim().toLowerCase().equals(PaymentTiming.beginningofterm.name().toLowerCase())) {
                leaseLiability = leaseCalculatorService.calcLeaseLiability(lease.getFixedPmt(),
                        dr, ct);
            } else if (lease.getPaymentTiming().name().trim().toLowerCase().equals(PaymentTiming.endofterm.name().toLowerCase())) {
                leaseLiability = leaseCalculatorService.calcLeaseLiabilityEoT(lease.getFixedPmt(),dr, ct);
            } else {
                // TODO: 6/16/2023 throw error
            }
            // TODO: 6/16/2023  payment timing.... ROU

            if (lease.getPaymentTiming().name().trim().toLowerCase().equals(PaymentTiming.beginningofterm.name().toLowerCase())) {
                Double rou = leaseCalculatorService.calcRightToUse(lease.getUpfrontPmt(),
                        lease.getInitialCost(), lease.getLeaseIncentive(), leaseLiability);
                lease.setRou(rou);
            } else if (lease.getPaymentTiming().name().trim().toLowerCase().equals(PaymentTiming.endofterm.name().toLowerCase())) {
                Double rou = leaseCalculatorService.calcRightToUseEoT(lease.getUpfrontPmt(), lease.getInitialCost(),lease.getLeaseIncentive(), leaseLiability);
                lease.setRou(rou);
            }

            // TODO: 5/31/2023 calculate lease liability
            lease.setLeaseLiability(leaseLiability);
            log.info("calculated lease liability is :: "+leaseLiability);

           // TODO: 5/31/2023 get lease schedules
            List<LeaseArmotizationSchedule> las = leaseCalculatorService.generateLeaseAmortizationSchedule(leaseLiability,
                    dr, ct, lease.getFixedPmt(), paymentFrequency.name(), lease.getPaymentTiming().name(),lease.getStartDate());
            lease.setLeaseArmotizationSchedules(las);

            // TODO: 5/31/2023 calculate rou
            Double rou = leaseCalculatorService.calcRightToUse(lease.getFixedPmt(),
                    lease.getInitialCost(), lease.getLeaseIncentive(), leaseLiability);
            lease.setRou(rou);

            // TODO: 5/31/2023 get rou schedules
            List<RouArmotizationSchedule> rous = leaseCalculatorService.generateRouSchedules(rou, ct, paymentFrequency.name(),  lease.getFixedPmt(), lease.getStartDate(), lease.getPaymentTiming().name());
            lease.setRouArmotizationSchedules(rous);

            // TODO: 5/31/2023   calc end date
            Date endDate = leaseCalculatorService.getEndDate(rou, ct, paymentFrequency.name(), lease.getStartDate());
            lease.setEndDate(endDate);

            leaseRepo.save(lease);

            res.setEntity(lease);
            res.setStatusCode(HttpStatus.CREATED.value());
            res.setMessage("Lease saved successfully");
            return res;
        } catch (Exception e) {
            EntityResponse res = new EntityResponse<>();
            log.info("Catched Error {} " + e);
            res.setMessage(e.getLocalizedMessage());
            res.setStatusCode(HttpStatus.BAD_REQUEST.value());
            res.setEntity(null);
            return res;
        }

    }


    public String trial() {
        try {

            return "";
        } catch (Exception e) {
            return null;
        }
    }


    public EntityResponse findById(Long id) {
        EntityResponse res = new EntityResponse<>();
        try {
            Optional<Lease> lease = leaseRepo.findByIdAndDeletedFlag(id, CONSTANTS.NO);
            if (lease.isPresent()) {
                Lease pLease = lease.get();
                res.setEntity(pLease);
                res.setStatusCode(HttpStatus.FOUND.value());
                res.setMessage(HttpStatus.FOUND.getReasonPhrase());
            } else {
                res.setEntity(null);
                res.setStatusCode(HttpStatus.NOT_FOUND.value());
                res.setMessage(HttpStatus.NOT_FOUND.getReasonPhrase());
            }

        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            res.setMessage(e.getLocalizedMessage());
            res.setStatusCode(HttpStatus.BAD_REQUEST.value());
            res.setEntity(null);
        }
        return res;
    }

    public EntityResponse findAll() {
        EntityResponse res = new EntityResponse<>();
        try {
            List<Lease> lease = leaseRepo.findByDeletedFlag(CONSTANTS.NO);
            if (lease.size() > 0) {
                res.setEntity(lease);
                res.setStatusCode(HttpStatus.FOUND.value());
                res.setMessage(HttpStatus.FOUND.getReasonPhrase());
            } else {
                res.setEntity(null);
                res.setStatusCode(HttpStatus.NOT_FOUND.value());
                res.setMessage(HttpStatus.NOT_FOUND.getReasonPhrase());
            }

        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            res.setMessage(e.getLocalizedMessage());
            res.setStatusCode(HttpStatus.BAD_REQUEST.value());
            res.setEntity(null);
        }
        return res;
    }

    public EntityResponse updateLease(Long id, Lease lease1) {
        EntityResponse res = new EntityResponse<>();
        try {
            Optional<Lease> lease = leaseRepo.findByIdAndDeletedFlag(id, CONSTANTS.NO);
            if (lease.isPresent()) {
                lease1.setId(id);
                Lease updatedLease = leaseRepo.save(lease1);
                res.setEntity(updatedLease);
                res.setStatusCode(HttpStatus.OK.value());
                res.setMessage("Lease updated successfully");
            } else {
                res.setEntity(null);
                res.setStatusCode(HttpStatus.NOT_FOUND.value());
                res.setMessage(HttpStatus.NOT_FOUND.getReasonPhrase());
            }

        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            res.setMessage(e.getLocalizedMessage());
            res.setStatusCode(HttpStatus.BAD_REQUEST.value());
            res.setEntity(null);
        }
        return res;
    }

    public EntityResponse tempDeleteLease(Long id) {
        EntityResponse res = new EntityResponse<>();
        try {
            Optional<Lease> lease = leaseRepo.findByIdAndDeletedFlag(id, CONSTANTS.NO);
            if (lease.isPresent()) {
                Lease lease1 = lease.get();
                lease1.setDeletedFlag(CONSTANTS.YES);
                Lease updatedLease = leaseRepo.save(lease1);
                res.setEntity(updatedLease);
                res.setStatusCode(HttpStatus.OK.value());
                res.setMessage("Lease deleted successfully");
            } else {
                res.setEntity(null);
                res.setStatusCode(HttpStatus.NOT_FOUND.value());
                res.setMessage(HttpStatus.NOT_FOUND.getReasonPhrase());
            }

        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            res.setMessage(e.getLocalizedMessage());
            res.setStatusCode(HttpStatus.BAD_REQUEST.value());
            res.setEntity(null);
        }
        return res;
    }

    public EntityResponse permanentDelete(Long id) {
        EntityResponse res = new EntityResponse<>();
        try {
            Optional<Lease> lease = leaseRepo.findByIdAndDeletedFlag(id, CONSTANTS.NO);
            if (lease.isPresent()) {

                leaseRepo.deleteById(id);
                res.setStatusCode(HttpStatus.OK.value());
                res.setMessage("Lease deleted successfully");
            } else {
                res.setEntity(null);
                res.setStatusCode(HttpStatus.NOT_FOUND.value());
                res.setMessage(HttpStatus.NOT_FOUND.getReasonPhrase());
            }

        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            res.setMessage(e.getLocalizedMessage());
            res.setStatusCode(HttpStatus.BAD_REQUEST.value());
            res.setEntity(null);
        }
        return res;
    }

    // TODO: 5/31/2023 get lease armotization schedule
    public EntityResponse getLeaseSchedules(Long id) {
        try {
            EntityResponse res = new EntityResponse<>();
            Optional<Lease> lease = leaseRepo.findByIdAndDeletedFlag(id, CONSTANTS.NO);
            if (lease.isPresent()) {
                List<LeaseArmotizationSchedule> sc = lease.get().getLeaseArmotizationSchedules();
                if (sc.size() > 0) {
                    res.setMessage("found");
                    res.setStatusCode(HttpStatus.FOUND.value());
                    res.setEntity(sc);
                } else {
                    res.setMessage("Schedules not found");
                    res.setStatusCode(HttpStatus.NOT_FOUND.value());
                    res.setEntity(null);
                }
            } else {
                res.setMessage("Lease not found");
                res.setStatusCode(HttpStatus.NOT_FOUND.value());
                res.setEntity(null);
            }
            return res;
        } catch (Exception e) {
            EntityResponse res = new EntityResponse<>();
            log.info("Catched Error {} " + e);
            res.setMessage(e.getLocalizedMessage());
            res.setStatusCode(HttpStatus.BAD_REQUEST.value());
            res.setEntity(null);
            return res;
        }
    }

    // TODO: 5/31/2023 get rou armotization schedule
    public EntityResponse getRouSchedules(Long id) {
        try {
            EntityResponse res = new EntityResponse<>();
            Optional<Lease> lease = leaseRepo.findByIdAndDeletedFlag(id, CONSTANTS.NO);
            if (lease.isPresent()) {
                List<RouArmotizationSchedule> sc = lease.get().getRouArmotizationSchedules();
                if (sc.size() > 0) {
                    res.setMessage("found");
                    res.setStatusCode(HttpStatus.FOUND.value());
                    res.setEntity(sc);
                } else {
                    res.setMessage("Schedules not found");
                    res.setStatusCode(HttpStatus.NOT_FOUND.value());
                    res.setEntity(null);
                }
            } else {
                res.setMessage("Lease not found");
                res.setStatusCode(HttpStatus.NOT_FOUND.value());
                res.setEntity(null);
            }
            return res;
        } catch (Exception e) {
            EntityResponse res = new EntityResponse<>();
            log.info("Catched Error {} " + e);
            res.setMessage(e.getLocalizedMessage());
            res.setStatusCode(HttpStatus.BAD_REQUEST.value());
            res.setEntity(null);

            return res;
        }
    }
}
