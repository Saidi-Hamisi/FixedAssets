package com.fams.fixedasset.assetmanagement.codegenerator;

import java.util.Random;

public class Codegenerator {

    public String gererate(String A,String B){

        String[] string1=A.split(" ");
        String[] string2=B.split(" ");

        if(string1.length==1){
            System.out.println("Each element ::" + string1[0] );
//            string 1
            Character first= string1[0].charAt(0);
            Character second= string1[0].charAt(1);
            Character third= string1[0].charAt(2);
//            string 2
            Character first2= string2[0].charAt(0);
            Character second2= string2[0].charAt(1);
            Character third2= string2[0].charAt(2);
            String abreviation1 = new StringBuilder().append(first).append(second).append(third).toString().toUpperCase();
            String abreviation2 = new StringBuilder().append(first2).append(second2).append(third2).toString().toUpperCase();
            System.out.println("generated string is ::"+ abreviation1+ "::" + abreviation2);
            String finalcode = String.join("/",abreviation1,abreviation2);
            System.out.println("Final string is :: " + finalcode);
            return finalcode;

        } else  if (string1.length==2){
            System.out.println("Each element ::" + string1[0] +" ::" + string1[1] + " :: " );
            Character first= string1[0].charAt(0);
            Character second = string1[1].charAt(0);
            String abreviation1 = new StringBuilder().append(first).append(second).toString().toUpperCase();

            //            string 2
            Character first2= string2[0].charAt(0);
            Character second2= string2[0].charAt(1);
            Character third2= string2[0].charAt(2);
            String abreviation2 = new StringBuilder().append(first2).append(second2).append(third2).toString().toUpperCase();
            System.out.println("generated string is ::"+ abreviation1+ "::" + abreviation2);
            String finalcode = String.join("/",abreviation1,abreviation2);
            System.out.println("Final string is :: " + finalcode);
            return finalcode;

        }else if(string1.length==3) {
            System.out.println("Each element ::" + string1[0] +" ::" + string1[1] + " :: "+ string1[2]);
//            string 1
            Character first= string1[0].charAt(0);
            Character second = string1[1].charAt(0);
            Character third = string1[2].charAt(0);
            String abreviations = new StringBuilder().append(first).append(second).append(third).toString().toUpperCase();

            //            string 2
            Character first2= string2[0].charAt(0);
            Character second2= string2[0].charAt(1);
            Character third2= string2[0].charAt(2);

            String abreviation2 = new StringBuilder().append(first2).append(second2).append(third2).toString().toUpperCase();
            System.out.println("generated string is ::"+ abreviations + "::" + abreviation2);
            String finalcode = String.join("/",abreviations,abreviation2);
            System.out.println("Final string is :: " + finalcode);
            return finalcode;
        }else{
            return  null;
        }


    }
    public  String randomString(){
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 6) {
            // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String codeString = salt.toString();
        return codeString;
    }
}
