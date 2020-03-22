package com.smsapplication;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import android.telephony.SmsManager;
import com.facebook.react.bridge.ReactMethod;

public class DirectSmsModule extends ReactContextBaseJavaModule {

  public DirectSmsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "DirectSms";
  }

  @ReactMethod
  public void sendDirectSmsJava(String phoneNumber, String msg) {
    try {
      System.out.println(phoneNumber + msg);
      SmsManager smsManager = SmsManager.getDefault();
      smsManager.sendTextMessage(phoneNumber, null, msg, null, null);
    } catch (Exception ex) {
      System.out.println(ex + "couldn't send message.");
    }
  }
}
