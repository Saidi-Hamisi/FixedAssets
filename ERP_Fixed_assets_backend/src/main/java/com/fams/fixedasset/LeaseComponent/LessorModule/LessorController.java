package com.fams.fixedasset.LeaseComponent.LessorModule;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/lessor")
public class LessorController {
    private final LessorService lessorService;
    private final LessorRepository lessorRepository;

    public LessorController(LessorService lessorService, LessorRepository lessorRepository) {
        this.lessorService = lessorService;
        this.lessorRepository = lessorRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addLessor(@RequestBody Lessor lessor) {
        try {
            return ResponseEntity.ok().body(lessorService.addLessor(lessor));
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity<?> getAllLessors() {
        try {
            return ResponseEntity.ok().body(lessorService.getAllLessors());
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    @GetMapping("/get/all/active")
    public ResponseEntity<?> getAllActiveLessors() {
        try {
            return ResponseEntity.ok().body(lessorService.getAllActiveLessors());
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    @GetMapping("/find/by/id/{id}")
    public ResponseEntity<?> findLessorById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok().body(lessorService.findLessorById(id));
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    @GetMapping("/find/by/lessor/code")
    public ResponseEntity<?> findLessorByLessorCode(@RequestParam String lessorCode) {
        try {
            return ResponseEntity.ok().body(lessorService.findLessorByLessorCode(lessorCode));
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }
    @GetMapping("/find/doc/by/id/{id}")
    public ResponseEntity<?> findLessorDocument(@PathVariable Long id) {
        try {
            return ResponseEntity.ok().body(lessorService.findLessorDocument(id));
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateLessor(@RequestBody Lessor lessor) {
        try {
            return ResponseEntity.ok().body(lessorService.updateLesor(lessor));
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    @PutMapping("/verify/{id}")
    public ResponseEntity<?> verifyLessor(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok().body(lessorService.verifyLessor(id));
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    @PutMapping("/temporary/delete/{id}")
    public ResponseEntity<?> temporaryDelete(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok().body(lessorService.temporaryDelete(id));
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    @DeleteMapping("/permanent/delete/{id}")
    public ResponseEntity<?> permanentDelete(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok().body(lessorService.permanentDelete(id));
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }
}
