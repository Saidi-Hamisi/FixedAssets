package com.fams.fixedasset.LeaseComponent.LeaseModule.HelperServices;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

@Service
@Slf4j
public class DatesCalculator {
    //TODO: FUNCTION TO ADD DATE BY MONTHS/DAYS/YEARS DURATION(days, weeks, months, years)
    public LocalDate addDate(LocalDate dateToBeAdded, Integer period, String durationId){
        try {
            if(durationId.equalsIgnoreCase("DAYS")){
                return dateToBeAdded.plusDays(period);
            } else if (durationId.equalsIgnoreCase("WEEKS")) {
                return dateToBeAdded.plusWeeks(period);
            } else if (durationId.equalsIgnoreCase("MONTHS")) {
                if(isTheLastDayOfMonth(dateToBeAdded)){
                    LocalDate dateAddedDate=dateToBeAdded.plusMonths(period);
                    return getLastDayOfMonth(dateAddedDate);
                }else {
                    return dateToBeAdded.plusMonths(period);
                }
            } else if (durationId.equalsIgnoreCase("YEARS")) {
                return dateToBeAdded.plusYears(period);
            }else {
                return null;
            }
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    //TODO: FUNCTION TO SUBSTRACT DATE BY MONTHS/DAYS/YEARS DURATION(days, weeks, months, years)
    public LocalDate substractDate(LocalDate dateToBeSubstracted, Integer period, String durationId){
        try {
            if(durationId.equalsIgnoreCase("DAYS")){
                return dateToBeSubstracted.minusDays(period);
            } else if (durationId.equalsIgnoreCase("WEEKS")) {
                return dateToBeSubstracted.minusWeeks(period);
            } else if (durationId.equalsIgnoreCase("MONTHS")) {
                if(isTheLastDayOfMonth(dateToBeSubstracted)){
                    LocalDate dateSubstractedDate=dateToBeSubstracted.minusMonths(period);
                    return getLastDayOfMonth(dateSubstractedDate);
                }else {
                    return dateToBeSubstracted.minusMonths(period);
                }
            } else if (durationId.equalsIgnoreCase("YEARS")) {
                return dateToBeSubstracted.minusYears(period);
            }else {
                return null;
            }
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    //TODO: FUNCTION TO ADD DATE BY MONTHS/DAYS/YEARS DURATION(days, weeks, months, years)
//    public Date addDate(Date dateToBeAdded, Integer period, String durationId){
//        try {
//            LocalDate dateConvertedDateToBeAdded=dateToBeAdded.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
//
//            if(durationId.equalsIgnoreCase("DAYS")){
//                LocalDate modifiedDate= dateConvertedDateToBeAdded.plusDays(period);
//                return Date.from(modifiedDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            } else if (durationId.equalsIgnoreCase("WEEKS")) {
//                LocalDate modifiedDate= dateConvertedDateToBeAdded.plusWeeks(period);
//                return Date.from(modifiedDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            } else if (durationId.equalsIgnoreCase("MONTHS")) {
//                LocalDate modifiedDate= dateConvertedDateToBeAdded.plusMonths(period);
//                return Date.from(modifiedDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            } else if (durationId.equalsIgnoreCase("YEARS")) {
//                LocalDate modifiedDate= dateConvertedDateToBeAdded.plusYears(period);
//                return Date.from(modifiedDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            }else {
//                return null;
//            }
//        }catch (Exception e) {
//            log.info("Error {} "+e);
//            return null;
//        }
//    }

    public Date addDate(Date dateToBeAdded, Integer period, String durationId){
        try {
            LocalDate dateConvertedDateToBeAdded= convertDateToLocalDate(dateToBeAdded);
            LocalDate dateAdded = addDate( dateConvertedDateToBeAdded,  period,  durationId);
            return convertLocalDateToDate(dateAdded);
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    public Date substractDate(Date dateToBeSubstracted, Integer period, String durationId){
        try {
            LocalDate dateConvertedDateToBeSubstracted= convertDateToLocalDate(dateToBeSubstracted);

            LocalDate dateSubstracted=substractDate(dateConvertedDateToBeSubstracted, period, durationId);

            Date returnedDate=convertLocalDateToDate(dateSubstracted);
            return returnedDate;

        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    //TODO: GET DAYS DIFFERENCE BETWEEN TWO DAYS
    public Long getDaysDifference(Date startDate, Date endDate){
        try {
            LocalDateTime convertedStartDate=startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay();
            LocalDateTime convertedEndDate=endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atStartOfDay();
            long daysDif= Duration.between(convertedStartDate, convertedEndDate).toDays();
            return daysDif;
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public Long getDaysDifference(LocalDate startDate, LocalDate endDate){
        try {
            long daysDif= Duration.between(startDate.atStartOfDay(), endDate.atStartOfDay()).toDays();
            return daysDif;
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }




    public Long getMonthsDifference(LocalDate startDate, LocalDate endDate){
        try {
            long monthsBetween = ChronoUnit.MONTHS.between(
                    YearMonth.from(startDate),
                    YearMonth.from(endDate)
            );
            return monthsBetween;
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    public Long getMonthsDifference(Date DstartDate, Date DendDate){
        try {
            LocalDate startDate= convertDateToLocalDate(DstartDate);
            LocalDate endDate= convertDateToLocalDate(DendDate);
            long monthsBetween = ChronoUnit.MONTHS.between(
                    YearMonth.from(startDate),
                    YearMonth.from(endDate)
            );
            return monthsBetween;
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    public LocalDate convertDateToLocalDate(Date date){
        try{
            return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public Date convertLocalDateToDate(LocalDate date){
        try{
            return Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public Date convertDateTimeStamp(Date date){
        try{
            LocalDate dateOne=date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            return Date.from(dateOne.atStartOfDay(ZoneId.systemDefault()).toInstant());
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    //TODO: GET THE FIRST DAY OF MONTH

    public LocalDate getFirstDayOfMonth(LocalDate date){
        try {
            return date.with(firstDayOfMonth());
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }
    public LocalDate getLastDayOfMonth(LocalDate date){
        try {
            return date.with(lastDayOfMonth());
        }catch (Exception e) {
            log.info("Error {} "+e);
            return null;
        }
    }

    public boolean isTheLastDayOfMonth(LocalDate date){
        try {
            return date.equals(getLastDayOfMonth(date));
        }catch (Exception e) {
            log.info("Error {} "+e);
            return false;
        }
    }

}
