package com.smsapplication;

import android.app.Application;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.smsapplication.DirectSmsModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DirectSmsPackage implements ReactPackage {

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new DirectSmsModule(reactContext));
    return modules;
  }


}
