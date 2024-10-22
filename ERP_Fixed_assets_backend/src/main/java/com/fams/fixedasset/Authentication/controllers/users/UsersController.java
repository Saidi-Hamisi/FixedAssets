package com.fams.fixedasset.Authentication.controllers.users;

import com.fams.fixedasset.Authentication.models.ERole;
import com.fams.fixedasset.Authentication.models.Role;
import com.fams.fixedasset.Authentication.models.User;
import com.fams.fixedasset.Authentication.payload.requests.activateaccount.ActivateAccount;
import com.fams.fixedasset.Authentication.payload.requests.auditing.Auditing;
import com.fams.fixedasset.Authentication.payload.requests.deleteaccount.DeleteAccount;
import com.fams.fixedasset.Authentication.payload.requests.lockaccount.LockAccount;
import com.fams.fixedasset.Authentication.payload.requests.logout.LogOutRequest;
import com.fams.fixedasset.Authentication.payload.requests.partialuserupdate.PartialUpdate;
import com.fams.fixedasset.Authentication.payload.requests.sendmails.SendMails;
import com.fams.fixedasset.Authentication.payload.requests.signup.SignupRequest;
import com.fams.fixedasset.Authentication.payload.requests.updatedepartment.UpdateDepartment;
import com.fams.fixedasset.Authentication.payload.requests.updatepassword.UpdatePassword;
import com.fams.fixedasset.Authentication.payload.requests.updateuserrole.UpdateUserRole;
import com.fams.fixedasset.Authentication.payload.responses.MessageResponse;
import com.fams.fixedasset.Authentication.repositories.AuditingRepository;
import com.fams.fixedasset.Authentication.repositories.roles.RoleRepository;
import com.fams.fixedasset.Authentication.repositories.users.UserRepository;
import com.fams.fixedasset.Authentication.security.jwt.JwtUtils;
import com.fams.fixedasset.Authentication.services.SendEmailService;
import com.fams.fixedasset.Authentication.utilities.ToolKit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/fams/users")
public class UsersController {

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

    @Autowired
    SendEmailService mailService;

    //Instance of ToolKit Class
    ToolKit tk = new ToolKit();

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

    //Add Users
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, Authentication auth, HttpServletRequest request) throws MessagingException, IOException {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        //Current date
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        //Delete flag
        String deleteflag = "N";

        //Is Active flag
        boolean isactiveflag = true;

        //Is Locked flag
        boolean islockedflag = false;

        //Modified By
        String modifiedby = auth.getName();

        //Generate User Password
        String userpassword = tk.generatePassword();

        signUpRequest.setPassword(userpassword);

        // Create new user's account
        User user = new User(signUpRequest.getFirstname(), signUpRequest.getLastname(), signUpRequest.getUsername(), signUpRequest.getPhonenumber(), signUpRequest.getEmail(), signUpRequest.getDepartment(), encoder.encode(signUpRequest.getPassword()), dtf.format(now), modifiedby, dtf.format(now), deleteflag, isactiveflag, islockedflag);

        String strRoles = signUpRequest.getRole().toLowerCase();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_CLERK).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            switch (strRoles) {
                case "admin":

                case "ROLE_ADMIN":
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);

                    break;
                case "executive":

                case "ROLE_EXECUTIVE":
                    Role executiveRole = roleRepository.findByName(ERole.ROLE_EXECUTIVE).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(executiveRole);

                    break;
                case "supervisor":

                case "ROLE_SUPERVISOR":
                    Role supervisorRole = roleRepository.findByName(ERole.ROLE_SUPERVISOR).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(supervisorRole);
                    break;

                case "ROLE_CLERK":
                case "clerk":

                default:
                    Role userRole = roleRepository.findByName(ERole.ROLE_CLERK).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
            }
        }

        user.setRoles(roles);
        userRepository.save(user);

        //Add Audit
        addAudit(auth, request, "Admin Register New User :: User added :: " + user.getUsername());
        SendMails sm = new SendMails();
        sm.setPassword(signUpRequest.getPassword());
        sm.setUsername(user.getUsername());
        sm.setRecipient(user.getEmail());

        String username = user.getUsername();
        String password = signUpRequest.getPassword();

        //Send Email to user
        mailService.sendNewEmail(sm,username,password);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    //All Users with valid accounts
    @GetMapping("/view")
    public ResponseEntity<List<User>> getAllUsers(Authentication auth, HttpServletRequest request) {
        List<User> users = userRepository.allUsers();

        //Add Audit
        addAudit(auth, request, "Admin View Users");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //List all locked accounts
    @GetMapping("/lockedaccounts")
    public ResponseEntity<List<User>> getAllLockedAccounts(Authentication auth, HttpServletRequest request) {
        List<User> users = userRepository.allLockedUsers();

        //Add Audit
        addAudit(auth, request, "Admin view locked user accounts");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //List all deleted user accounts
    @GetMapping("/deletedaccounts")
    public ResponseEntity<List<User>> getAllDeletedAccounts(Authentication auth, HttpServletRequest request) {
        List<User> users = userRepository.allDeletedUsers();

        //Add Audit
        addAudit(auth, request, "Admin view deleted user accounts");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //List Inactive Accounts
    @GetMapping("/inactiveaccounts")
    public ResponseEntity<List<User>> getAllInactiveAccounts(Authentication auth, HttpServletRequest request) {
        List<User> users = userRepository.allInactiveUsers();

        //Add Audit
        addAudit(auth, request, "Admin View inactive user accounts");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    //Update user details (Partial Update)
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@Valid @RequestBody PartialUpdate update, Authentication auth, HttpServletRequest request) {
        //Select username
        String username = userRepository.getUsername(update.getId());

        //Select Email Address
        String email = userRepository.getEmailAddress(update.getId());

        if (userRepository.existsByEmail(update.getEmail()) && !email.equalsIgnoreCase(update.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        userRepository.updateDetails(update.getId(), update.getFirstname(), update.getLastname(), update.getPhonenumber(), modified_by, modified_on, update.getEmail());

        //Add Audit
        addAudit(auth, request, "Admin Update User Details :: Username :: " + username);

        return ResponseEntity.ok(new MessageResponse("Profile Updated successfully!"));
    }

    //Update User Role
    @PutMapping("/updaterole")
    public ResponseEntity<?> updateUserRole(@Valid @RequestBody UpdateUserRole update, Authentication auth, HttpServletRequest request) {
        modified_by = auth.getName();
        userRepository.updateUserRole(update.getRoleid(), update.getUserid());

        //Add Audit
        addAudit(auth, request, "Admin Update User role :: User ID :: " + update.getUserid());
        return ResponseEntity.ok(new MessageResponse("User Role Updated successfully!"));
    }

    //Change Password
    @PutMapping("/updatepassword")
    public ResponseEntity<?> updateUserPassword(@Valid @RequestBody UpdatePassword update, Authentication auth, HttpServletRequest request) {
        modified_by = auth.getName();
        userRepository.updateUserPassword(encoder.encode(update.getPassword()), modified_on, modified_by, update.getUsername());

        //Add Audit
        addAudit(auth, request, "Admin update user password :: User Name :: " + update.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Password Updated successfully!"));
    }

    //Update Account status (lock or unlock)
    @PutMapping("/lockaccount")
    public ResponseEntity<?> activateAccount(@Valid @RequestBody LockAccount update, Authentication auth, HttpServletRequest request) {
        modified_by = auth.getName();
        userRepository.lockUserAccount(update.isStatus(), modified_on, modified_by, update.getUsername());

        //Add Audit
        addAudit(auth, request, "Admin lock user account :: User Name :: " + update.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Account Status Altered successfully!"));
    }

    //Update User Account status (Active or Inactive)
    @PutMapping("/activateaccount")
    public ResponseEntity<?> lockAccount(@Valid @RequestBody ActivateAccount update, Authentication auth, HttpServletRequest request) {
        modified_by = auth.getName();
        userRepository.activateUserAccount(update.isStatus(), modified_on, modified_by, update.getUsername());

        //Add Audit
        addAudit(auth, request, "Admin activate user account :: User Name :: " + update.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Account Status Altered successfully!"));
    }

    //Delete User (Lock Account, Delete flag to Y and set account inactive)
    @PutMapping("/deleteaccount")
    public ResponseEntity<?> deleteAccount(@Valid @RequestBody DeleteAccount update, Authentication auth, HttpServletRequest request) {
        modified_by = auth.getName();
        //Set a/c inactive
        boolean inactive = false;
        update.setInactive(inactive);

        //Lock A/c
        boolean lock = true;
        update.setLock(lock);

        //Delete Flag
        String delete_flag = "Y";

        userRepository.deleteUserAccount(update.isInactive(), update.isInactive(), delete_flag, modified_on, modified_by, update.getUsername());

        //Add Audit
        addAudit(auth, request, "Admin delete user account :: User Name :: " + update.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Account Deleted successfully!"));
    }

    //Un delete an account
    @PutMapping("/restoreaccount")
    public ResponseEntity<?> unDeleteAccount(@Valid @RequestBody DeleteAccount update, Authentication auth, HttpServletRequest request) {
        modified_by = auth.getName();

        //Set a/c inactive
        boolean inactive = true;

        //Lock A/c
        boolean lock = false;

        //Delete Flag
        String delete_flag = "N";

        userRepository.restoreUserAccount(inactive, lock, delete_flag, modified_on, modified_by, update.getUsername());

        //Add Audit
        addAudit(auth, request, "Admin restore user account :: User Name :: " + update.getUsername());

        return ResponseEntity.ok(new MessageResponse("User Account Restored successfully!"));
    }

    //Fetch user details by Id
    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUserDetailsById(@PathVariable("id") long id, Authentication auth, HttpServletRequest request)
    {
        Optional<User> details = userRepository.findById(id);
        //Add Audit
        addAudit(auth, request, "Admin fetch user account details :: User ID :: " + id);
        return new ResponseEntity(details,HttpStatus.OK);
    }



    //Admin Log Out User
    //Sign Out
    @PostMapping("/logout")
    public ResponseEntity<?> signOut(@Valid @RequestBody LogOutRequest logOutRequest, Authentication auth, HttpServletRequest request) {
        //Update Logged in status to true
        userRepository.updateLogInToFalse(false,modified_on,auth.getName(),logOutRequest.getUsername());

        //Add Audit
        addAudit(auth, request, "Admin Sign Out User :: Username :: " + logOutRequest.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Logged Out Successfully!"));
    }

    //Admin Change user's department
    @PutMapping("/updatedepartment")
    public ResponseEntity<?> updateUserDepartment(@Valid @RequestBody UpdateDepartment update, Authentication auth, HttpServletRequest request) {
        modified_by = auth.getName();
        userRepository.updateUserDepartment(update.getDepartment(), modified_on,modified_by, update.getUsername());

        //Add Audit
        addAudit(auth, request, "Admin user's department  :: User Name :: " + update.getUsername());
        return ResponseEntity.ok(new MessageResponse("User Department Updated successfully!"));
    }
}
