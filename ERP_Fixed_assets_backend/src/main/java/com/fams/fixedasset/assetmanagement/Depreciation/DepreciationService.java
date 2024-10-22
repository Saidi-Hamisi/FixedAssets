package com.fams.fixedasset.assetmanagement.Depreciation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DepreciationService {

    @Autowired
    private DepreciationRepository depreciationRepository;
    @Autowired
    private DepreciationEntityRepository depRepository;

    private static final DecimalFormat df = new DecimalFormat("0.00");


    public DepreciationMethods addDepreciationMethod(DepreciationMethods depreciation) {
        return depreciationRepository.save(depreciation);
    }


    public List<DepreciationMethods> fetchDepreciationMethods() {
        return depreciationRepository.findAll();

    }

    public List<Depreciation> selectdepreciationMethod(String depreciation) {
        if (depreciation.equalsIgnoreCase("straight-line")) {
            //call straight line function
//            straightline();
        } else if (depreciation.equalsIgnoreCase("reducing-balance")) {
            //call another function
//            reducingbalance();

        }
        return depRepository.findAll();
    }


    public void straightline(Double cost, Double salvageValue, Long years) {
        depRepository.deleteAll();
        Depreciation d = new Depreciation();
        DecimalFormat df = new DecimalFormat("#.##");

        double dep = 0.0f;
        double Assetcost = 0.0f;
        double beginning = 0.0f;
        double bvalue = 0.0f;
        double new_beginning = 0.0f;

        double end = 0.0f;
        double n_end = 0.0f;
        double new_end = 0.0f;
//        double life = 0.0f;
//        double salvage = 0.0f;


        dep = ((cost - salvageValue) / years);
        System.out.println("Depreciation :: Ksh." + dep);
        beginning = cost;
        end = beginning - dep;

        //Year
        int yr = 1;
        System.out.println("Year       Beginning Value (Ksh.)           Depreciation (Ksh.)             End Year Value (Ksh.)");
        System.out.println(yr + "            " + beginning + "                             " + dep + "                              " + end);

        //Send Results to DB
        d.setDepreciation(dep);
        d.setCost(cost);
        d.setBegginingValue(beginning);
        d.setResidualvalue(salvageValue);
        d.setEndyearValue(end);
        d.setYear((long) yr);
        depRepository.save(d);

        int period = Math.toIntExact(years);
        ArrayList<Double> nb = new ArrayList<>(period);
        nb.add(end);
        for (int i = 2; i <= period; i++) {
            Depreciation d1 = new Depreciation();
            bvalue = nb.get(nb.size() - 1);
            new_beginning = Double.parseDouble(df.format(bvalue));
            System.out.println("new_beginning is " + df.format(new_beginning));
            n_end = new_beginning - dep;
            new_end = Double.parseDouble(df.format(n_end));
            yr = yr + 1;
            System.out.println(yr + "            " + new_beginning + "                             " + dep + "                              " + new_end);
            nb.add(new_end);
            //Send Results to DB
            d1.setDepreciation(dep);
            d1.setCost(cost);
            d1.setBegginingValue(new_beginning);
            d1.setResidualvalue(salvageValue);
//               d1.se(years);
            d1.setYear((long) yr);
            d1.setEndyearValue(new_end);
            depRepository.save(d1);
        }
//      return  depRepository.findAll();
    }




    public List<Depreciation> depreciation(String depreciation, Double cost, Double salvageValue, Long years, Float rate, String assetId) {
        List<Depreciation> existingDepreciations = depRepository.findAllByAssetId(assetId);
        DecimalFormat df = new DecimalFormat("#.##");

        Date date = new Date();
        Integer yearNow = date.getYear() + 1900;

        double beginning = cost;
        double bValue = beginning;
        double dep = 0.0;
        double end = 0.0;
        int year = yearNow;

        if (depreciation.equalsIgnoreCase("Straight line method")) {
            dep = (cost - salvageValue) / years;
        } else if (depreciation.equalsIgnoreCase("Reducing balance method")) {
            dep = (cost - salvageValue) * rate / 100;
        }

        List<Depreciation> newDepreciations = new ArrayList<>();

        for (int i = 1; i <= years; i++) {
            Depreciation d = new Depreciation();
            d.setYear((long) year);
            d.setCost(cost);
            d.setRate(Double.valueOf(rate));
            d.setResidualvalue(salvageValue);
            d.setDepreciation(dep);
            d.setBegginingValue(bValue);
            end = bValue - dep;
            d.setEndyearValue(end);
            d.setUsefullife(years);
            d.setAssetId(assetId);

            newDepreciations.add(d);

            year++;
            bValue = end;
        }

        depRepository.saveAll(newDepreciations);
        existingDepreciations.addAll(newDepreciations);
        return existingDepreciations;
    }


}
