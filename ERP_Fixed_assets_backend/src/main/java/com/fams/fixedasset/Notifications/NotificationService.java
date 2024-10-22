package com.fams.fixedasset.Notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification getNotificationById(Long id) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);
        return optionalNotification.orElse(null);
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification updateNotification(Notification existingNotification, Notification updatedNotification) {
        existingNotification.setMessage(updatedNotification.getMessage());
        existingNotification.setTime(updatedNotification.getTime());
        existingNotification.setIcon(updatedNotification.getIcon());
        existingNotification.setColor(updatedNotification.getColor());
        existingNotification.setStatus(updatedNotification.getStatus());
        return notificationRepository.save(existingNotification);
    }

    public boolean deleteNotification(Long id) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);
        if (optionalNotification.isPresent()) {
            notificationRepository.delete(optionalNotification.get());
            return true;
        } else {
            return false;
        }
    }
}
