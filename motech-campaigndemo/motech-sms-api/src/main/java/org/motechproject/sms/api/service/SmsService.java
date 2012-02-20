package org.motechproject.sms.api.service;

import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.List;

public interface SmsService {
    void sendSMS(String recipient, String message);
    void sendSMS(List<String> recipients, String message);
    void sendSMS(String recipient, String message, DateTime deliveryTime);
    void sendSMS(ArrayList<String> recipients, String message, DateTime deliveryTime);
}
