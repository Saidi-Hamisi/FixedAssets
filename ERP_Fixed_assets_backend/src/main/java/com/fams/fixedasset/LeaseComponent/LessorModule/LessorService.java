package com.fams.fixedasset.LeaseComponent.LessorModule;

import com.fams.fixedasset.Utils.Responses.EntityResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class LessorService {
    private final LessorRepository lessorRepository;

    public LessorService(LessorRepository lessorRepository) {
        this.lessorRepository = lessorRepository;
    }

    public EntityResponse<?> addLessor(Lessor lessor) {
        try {
            EntityResponse response = new EntityResponse();
            Optional<Lessor> searchKra = lessorRepository.findLessorByLessorKraPin(lessor.getLessorKraPin());
            if (searchKra.isPresent()) {
                response.setMessage("Lessor With KRA " + lessor.getLessorKraPin() + " was mapped to " + searchKra.get().getLessorName() + " on " + searchKra.get().getPostedTime());
                response.setStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
            } else {
                Optional<Lessor> searchRegNo = lessorRepository.findLessorByRegDocNo(lessor.getRegDocNo());
                if (searchRegNo.isPresent()) {
                    response.setMessage("Lessor Document with Registration No. " + lessor.getRegDocNo() + " Already mapped to " + searchRegNo.get().getLessorName() + " on " + searchRegNo.get().getPostedTime());
                    response.setStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
                } else {
                    if (lessor.getPhoneNo().length() > 12 || lessor.getPhoneNo().length() < 10) {
                        response.setMessage("Lessor Phone/Mobile Number " + lessor.getPhoneNo() + " is Invalid: !! Check the Correct NO. FORMAT ALLOWED!");
                        response.setStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
                    } else {
                        String prefixCharacters = "LSR";
                        String remainingFourDigits = "";
                        Optional<LessorRepository.getLessorData> lessorData = lessorRepository.findLessors();
                        if (lessorData.isPresent()) {
                            String lessorCode = lessorData.get().getLessorCode();
                            String lastFourCharacters = lessorCode.substring(lessorCode.length() - 4);
                            Long lastFourDigits = Long.valueOf(lastFourCharacters);
                            String newCode = String.valueOf((lastFourDigits + 1));
                            do {
                                newCode = "0" + newCode;
                            } while (newCode.length() < 4);

                            remainingFourDigits = newCode;
                        } else {
                            remainingFourDigits = "0001";
                        }
                        String generatedLessorCode = prefixCharacters + remainingFourDigits;
                        lessor.setLessorCode(generatedLessorCode);
                        lessor.setPostedBy("SYSTEM");
                        lessor.setPostedFlag('Y');
                        lessor.setPostedTime(new Date());
                        Lessor addLessor = lessorRepository.save(lessor);
                        response.setMessage("Lessor with Code  " + addLessor.getLessorCode() + " Created Successfully at " + addLessor.getPostedTime());
                        response.setStatusCode(HttpStatus.CREATED.value());
                        response.setEntity(addLessor);
                    }
                }
            }

            return response;

        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public EntityResponse<?> getAllLessors() {
        try {
            EntityResponse response = new EntityResponse();
            List<Lessor> lessorList = lessorRepository.findAllByDeletedFlagOrderByIdDesc('N');
            if (lessorList.size() > 0) {
                response.setMessage("Lessors Registered Found are : " + lessorList.size());
                response.setStatusCode(HttpStatus.FOUND.value());
                response.setEntity(lessorList);
            } else {
                response.setMessage("Lessors Registered Found are : " + lessorList.size());
                response.setStatusCode(HttpStatus.NOT_FOUND.value());
                response.setEntity(lessorList);
            }
            return response;
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public EntityResponse<?> getAllActiveLessors() {
        try {
            EntityResponse response = new EntityResponse();
            List<Lessor> lessorList = lessorRepository.findAllByDeletedFlagAndVerifiedFlagOrderByIdDesc('N', 'Y');
            if (lessorList.size() > 0) {
                response.setMessage("Lessors Verified Found are : " + lessorList.size());
                response.setStatusCode(HttpStatus.FOUND.value());
                response.setEntity(lessorList);
            } else {
                response.setMessage("Lessors Verified Found are : " + lessorList.size());
                response.setStatusCode(HttpStatus.NOT_FOUND.value());
                response.setEntity(lessorList);
            }
            return response;
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public EntityResponse<?> findLessorById(Long id) {
        try {
            EntityResponse response = new EntityResponse();
            Optional<Lessor> lessor = lessorRepository.findLessorById(id);
            if (lessor.isPresent()) {
                response.setMessage("Lessor Found");
                response.setStatusCode(HttpStatus.FOUND.value());
                response.setEntity(lessor);
            } else {
                response.setMessage("Lessor Not Found");
                response.setStatusCode(HttpStatus.NOT_FOUND.value());
                response.setEntity(lessor);
            }
            return response;
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public EntityResponse<?> findLessorByLessorCode(String lessorCode) {
        try {
            EntityResponse response = new EntityResponse();
            Optional<Lessor> lessor = lessorRepository.findLessorByLessorCode(lessorCode);
            if (lessor.isPresent()) {
                response.setMessage("Lessor Found");
                response.setStatusCode(HttpStatus.FOUND.value());
                response.setEntity(lessor);
            } else {
                response.setMessage("Lessor Not Found");
                response.setStatusCode(HttpStatus.NOT_FOUND.value());
                response.setEntity(lessor);
            }
            return response;
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public EntityResponse<?> findLessorDocument(Long id) {
        try {
            EntityResponse response = new EntityResponse();
            Optional<LessorRepository.getLessorDoc> lessorDoc = lessorRepository.findLessorDoc(id);
            if (lessorDoc.isPresent()) {
                response.setMessage("Lessor Document With Registration " + lessorDoc.get().getRegDocNo() + " Found");
                response.setStatusCode(HttpStatus.FOUND.value());
                response.setEntity(lessorDoc);
            } else {
                response.setMessage("Lessor Not Found");
                response.setStatusCode(HttpStatus.NOT_FOUND.value());
                response.setEntity(lessorDoc);
            }
            return response;
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public EntityResponse<?> verifyLessor(Long id) {
        try {
            EntityResponse response = new EntityResponse();
            Optional<Lessor> lessor = lessorRepository.findLessorById(id);
            if (lessor.isPresent()) {
                Lessor lessor1 = lessor.get();
                lessor1.setVerifiedBy("SYSTEM");
                lessor1.setVerifiedFlag('Y');
                lessor1.setVerifiedTime(new Date());
                Lessor verifyLessor = lessorRepository.save(lessor1);
                response.setMessage("Lessor with Code  " + verifyLessor.getLessorCode() + " Verified Successfully at " + verifyLessor.getVerifiedTime());
                response.setStatusCode(HttpStatus.OK.value());
                response.setEntity(verifyLessor);
            } else {
                response.setMessage("Lessor Not Found");
                response.setStatusCode(HttpStatus.NOT_FOUND.value());
                response.setEntity(lessor);
            }
            return response;
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public EntityResponse<?> updateLesor(Lessor lessor) {
        try {
            EntityResponse response = new EntityResponse();
            Optional<Lessor> searchLessor = lessorRepository.findLessorById(lessor.getId());
            if (searchLessor.isPresent()) {
                if (lessor.getPhoneNo().length() > 12 || lessor.getPhoneNo().length() < 10) {
                    response.setMessage("Lessor Phone/Mobile Number " + lessor.getPhoneNo() + " is Invalid: !! Check the Correct NO. FORMAT ALLOWED!");
                    response.setStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
                } else {
                    Lessor lessor1 = searchLessor.get();
                    lessor.setPostedBy(lessor1.getPostedBy());
                    lessor.setPostedFlag(lessor1.getPostedFlag());
                    lessor.setPostedTime(lessor1.getPostedTime());
                    lessor.setModifiedBy("SYDTEM");
                    lessor.setModifiedFlag('Y');
                    lessor.setModifiedTime(new Date());
                    Lessor updateLesssor = lessorRepository.save(lessor);
                    response.setMessage("Lessor with Code  " + updateLesssor.getLessorCode() + " Modified Successfully at " + updateLesssor.getModifiedTime());
                    response.setStatusCode(HttpStatus.CREATED.value());
                    response.setEntity(updateLesssor);
                }
            } else {
                response.setMessage("Lessor Not Found");
                response.setStatusCode(HttpStatus.NOT_FOUND.value());
                response.setEntity(lessor);
            }
            return response;
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public EntityResponse<?> temporaryDelete(Long id) {
        try {
            EntityResponse response = new EntityResponse();
            Optional<Lessor> lessor = lessorRepository.findLessorById(id);
            if (lessor.isPresent()) {
                Lessor lessor1 = lessor.get();
                lessor1.setDeletedBy("SYSTEM");
                lessor1.setDeletedFlag('Y');
                lessor1.setDeletedTime(new Date());
                Lessor deleteLessor = lessorRepository.save(lessor1);
                response.setMessage("Lessor with Code  " + deleteLessor.getLessorCode() + " Deleted Successfully at " + deleteLessor.getDeletedTime());
                response.setStatusCode(HttpStatus.OK.value());
                response.setEntity(deleteLessor);
            } else {
                response.setMessage("Lessor Not Found");
                response.setStatusCode(HttpStatus.NOT_FOUND.value());
                response.setEntity(lessor);
            }
            return response;
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }

    public EntityResponse<?> permanentDelete(Long id) {
        try {
            EntityResponse response = new EntityResponse();
            Optional<Lessor> lessor = lessorRepository.findLessorById(id);
            if (lessor.isPresent()) {
                lessorRepository.deleteById(lessor.get().getId());
                response.setMessage("Lessor with Code  " + lessor.get().getLessorCode() + " Deleted Successfully at " + new Date());
                response.setStatusCode(HttpStatus.OK.value());
            } else {
                response.setMessage("Lessor Not Found");
                response.setStatusCode(HttpStatus.NOT_FOUND.value());
                response.setEntity(lessor);
            }
            return response;
        } catch (Exception e) {
            log.info("Catched Error {} " + e);
            return null;
        }
    }


}
