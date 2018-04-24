package com.invreactnativeapp.AlertMessage;

import android.app.Activity;
import android.content.Context;
import android.support.v4.content.ContextCompat;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.invreactnativeapp.R;
import com.tapadoo.alerter.Alerter;

public class AlertMessage extends ReactContextBaseJavaModule implements NativeModule {


    public AlertMessage(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AlertMessage";
    }

    @ReactMethod
    public void showError(String message) {

        Activity activity = getReactApplicationContext().getCurrentActivity();

        if (activity != null) {
            Alerter.create(activity)
                    .setTitle(message)
                    .setDuration(3000)
                    .setBackgroundColorInt(ContextCompat.getColor(activity, R.color.red))
                    .show();
        }
    }

    @ReactMethod
    public void showSuccess(String message) {

        Activity activity = getReactApplicationContext().getCurrentActivity();

        if (activity != null) {
            Alerter.create(activity)
                    .setTitle(message)
                    .setDuration(3000)
                    .setBackgroundColorInt(ContextCompat.getColor(activity, R.color.orange))
                    .show();
        }
    }

}
