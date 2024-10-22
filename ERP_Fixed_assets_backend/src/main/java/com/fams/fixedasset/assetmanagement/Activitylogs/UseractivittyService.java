package com.fams.fixedasset.assetmanagement.Activitylogs;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class UseractivittyService {

    @Autowired
    private UseractivitiesRepository ur;

    SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");


    public  void newActivity(Useractivities useractivities){
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();
        useractivities.setDateAdded(formatter.format(date));
        ur.save(useractivities);

    }

    public List<Useractivities>  getActivities(){
        return ur.findAll();
    }

//    public  void newActivity(HttpServletRequest request, String action){
//        Date date = new Date();
//        System.out.println("Address :"+ request.getRemoteAddr());
//        System.out.println("USer"+ request.getRemoteUser());
//            Useractivities useractivities = new Useractivities();
//            useractivities.setUserName(request.getRemoteUser());
//        System.out.println();
//            useractivities.setDateAdded(formatter.format(date));
//            useractivities.setAction(action);
//        ur.save(useractivities);
//
//    }
}
