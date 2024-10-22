package com.fams.fixedasset.Authentication.controllers.Authentication;

import com.fams.fixedasset.Authentication.payload.requests.auditing.Auditing;
import com.fams.fixedasset.Authentication.payload.requests.login.LoginRequest;
import com.fams.fixedasset.Authentication.payload.requests.logout.LogOutRequest;
import com.fams.fixedasset.Authentication.payload.responses.JwtResponse;
import com.fams.fixedasset.Authentication.payload.responses.MessageResponse;
import com.fams.fixedasset.Authentication.repositories.AuditingRepository;
import com.fams.fixedasset.Authentication.repositories.roles.RoleRepository;
import com.fams.fixedasset.Authentication.repositories.users.UserRepository;
import com.fams.fixedasset.Authentication.security.jwt.JwtUtils;
import com.fams.fixedasset.Authentication.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/fams/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuditingRepository auditingRepository;

    //Auditing Configs
    String username = "";
    String modified_by = "";
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    String modified_on = dtf.format(now);


    //Auditing
    public void addAudit(Authentication authentication, HttpServletRequest request, String action) {
        Auditing auditing = new Auditing();
        auditing.setActivity(action);
        auditing.setStarttime(dtf.format(now));
        auditing.setUsername(authentication.getName());
        auditing.setRequestip(request.getRemoteAddr());
        auditingRepository.save(auditing);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        //Check Account status
        String deletestatus = userRepository.getDeleteFlag(loginRequest.getUsername());
        //Locked status
        boolean locked = userRepository.getAccountLockedStatus(loginRequest.getUsername());
        //Active status
        boolean active = userRepository.getAccountInactiveStatus(loginRequest.getUsername());
        //Log in status
        boolean isLoggedin = userRepository.getLogInStatus(loginRequest.getUsername());

        if (deletestatus.equalsIgnoreCase("Y")) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Account Deleted ! Contact Admin!"));
        } else if (locked) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Account Locked! Contact Admin!"));
        } else if (!active) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Account Inactive! Contact Admin!"));
        }
        //else if(isLoggedin)
        //{
          //  return ResponseEntity.badRequest().body(new MessageResponse("Error: User Already Logged In! Log Out First or Contact Admin!"));
        //}
        else {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());

            //Update Logged in status to true
            userRepository.updateLogInToTrue(true,modified_on,loginRequest.getUsername(),loginRequest.getUsername());

            //Add records to audit table
            addAudit(authentication, request, "Log In to System");
            return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
        }
    }

    //Sign Out
    @PostMapping("/logout")
    public ResponseEntity<?> signOut(@Valid @RequestBody LogOutRequest logOutRequest, Authentication auth, HttpServletRequest request) {
        //Update Logged in status to true
        userRepository.updateLogInToFalse(false,modified_on,auth.getName(),auth.getName());

        //Add Audit
        addAudit(auth, request, "User Sign Out :: Username :: " + auth.getName());
        return ResponseEntity.ok(new MessageResponse("Logged Out Successfully!"));
    }
}
