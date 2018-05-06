package com.invreactnativeapp.VideoCamera;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.jmolsmobile.landscapevideocapture.VideoCaptureActivity;
import com.jmolsmobile.landscapevideocapture.configuration.CaptureConfiguration;

import java.sql.Timestamp;

public class VideoCamera extends ReactContextBaseJavaModule {

    private Promise mPickerPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {

            WritableMap map = Arguments.createMap();


            if (requestCode == 1337) {
                if (mPickerPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        mPickerPromise.reject("E_VIDEO_CANCELLED", "Image picker was cancelled");
                    } else if (resultCode == Activity.RESULT_OK) {

                        String path = intent.getStringExtra(VideoCaptureActivity.EXTRA_OUTPUT_FILENAME);
                        String name = intent.getStringExtra(VideoCaptureActivity.EXTRA_OUTPUT_FILENAME);

                        if (path == null && name == null) {
                            mPickerPromise.reject("E_NO_VIDEO_DATA_FOUND", "No video data found");
                        } else {
                            map.putString("path", path);

                            mPickerPromise.resolve(map);
                        }
                    }

                    mPickerPromise = null;
                }
            }
        }
    };


    public VideoCamera(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "VideoCamera";
    }
    @ReactMethod
    public void show(final Promise promise) {

        Activity activity = getReactApplicationContext().getCurrentActivity();

        mPickerPromise = promise;

        CaptureConfiguration.Builder builder = new CaptureConfiguration.Builder(1280, 800, 4000);

        // Optional
        builder.showRecordingTime();         // Show the elapsed recording time
        builder.noCameraToggle();            // Remove button to toggle between front and back camera

        // Get the CaptureConfiguration
        CaptureConfiguration configuration = builder.build();

        final Intent intent = new Intent(activity, VideoCaptureActivity.class);
        intent.putExtra(VideoCaptureActivity.EXTRA_CAPTURE_CONFIGURATION, configuration);
        intent.putExtra(VideoCaptureActivity.EXTRA_OUTPUT_FILENAME, String.valueOf(System.currentTimeMillis()) + ".mov");
        activity.startActivityForResult(intent, 1337);

    }
}
