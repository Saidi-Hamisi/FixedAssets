package com.fams.fixedasset.assetmanagement.Custodian;


import com.fams.fixedasset.assetmanagement.AssetCategory.Category;
import com.fams.fixedasset.assetmanagement.codegenerator.Codegenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Access;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class CustodianService {

    @Autowired
    private CustodianRepository custodianRepository;


    public Custodian addCustodian(Custodian custodian){

        String custodianString  = custodian.getCustodianName();


        Character char1= custodianString.charAt(0);
        Character char2= custodianString.charAt(1);
        Character char3= custodianString.charAt(2);
        String custCOde = new StringBuilder().append(char1).append(char2).append(char3).toString().toUpperCase();
        Codegenerator codegenerator = new Codegenerator();
        String randomeString = codegenerator.randomString();

        String finalcode = String.join("/",custCOde,randomeString);

        custodian.setDeletedFlag(false);


        System.out.println("codeString is " + Arrays.toString(splitToNChar(custodianString,3)).toUpperCase());

        custodian.setCustodianCode(finalcode);
        return  custodianRepository.save(custodian);
    }
    private static String[] splitToNChar(String text, int size) {
        List<String> parts = new ArrayList<>();

        int length = text.length();
        for (int i = 0; i < length; i += size) {
            parts.add(text.substring(i, Math.min(length, i + size)));
        }
        return parts.toArray(new String[0]);
    }
    public List<Custodian> getcustodians(){
        return custodianRepository.findByDeletedFlag(false);
    }

    public  Custodian updateCustodian(Custodian custodian){
        custodian.setDeletedFlag(false);
        return custodianRepository.save(custodian);
    }

    public Custodian getCustodianByid(Long id){
       return custodianRepository.getCustodianByid(id);

    }
    public void deleteCustodian(Long id){
        Custodian custodian = custodianRepository.getCustodianByid(id);
        custodian.setDeletedFlag(true);
        custodianRepository.save(custodian);
        log.info("Custodian has been deleted successfully");
    }
}
