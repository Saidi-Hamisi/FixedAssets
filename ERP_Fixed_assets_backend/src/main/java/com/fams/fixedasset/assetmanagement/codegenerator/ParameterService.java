package com.fams.fixedasset.assetmanagement.codegenerator;

import com.fams.fixedasset.assetmanagement.asset.Asset;
import com.fams.fixedasset.assetmanagement.asset.Assetrepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class ParameterService {

    @Autowired
    private  ParameterRepo repo;

    @Autowired
    private Assetrepository assetrepository;


    public Parameters newParameters(Parameters parameters){
        return  repo.save(parameters);
    }
    public  List<Parameters> getparams(){
        return repo.findAll();
    }

    public List<?> params(){
       return assetrepository.getColumns();
    }


    public StringBuilder testEndpoint(Asset asset)
    {
        JSONObject response = new JSONObject(asset);

        StringBuilder code = new StringBuilder();
        for(String a : repo.parameters())
        {

            if(response.getString(a.toLowerCase()).length() > 3)
            {
                if(response.getString(a.toLowerCase()).contains(" "))
                {
                    code = code.append(getResult(response.getString(a.toLowerCase())).toUpperCase()).append("/");
                }
                else
                {
                    code.append(response.getString(a.toLowerCase()).substring(0,3).toUpperCase()).append("/");
                }
            }
        }
        code = code.append(randomString());
        System.out.println(code);
        repo.parameters();
        return code;
    }

    public  String randomString(){
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 6) {
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String codeString = salt.toString();
        return codeString;
    }

    public String getResult(String input){
        StringBuilder sb = new StringBuilder();
        for(String s : input.split(" ")){
            sb.append(s.charAt(0));
        }
        return sb.toString();
    }
}
