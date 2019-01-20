package com.example.android.smsmessaging;

import android.location.Location;
import android.location.LocationListener;
import android.os.Bundle;
import android.util.Log;

public class MyCurrentLocationListener implements LocationListener {



    public void onLocationChanged(Location location) {

        System.out.println("Getting info...");
        location.getLatitude();
        location.getLongitude();

        String myLocation = "Latitude = " + location.getLatitude() + " Longitude = " + location.getLongitude();

        //I make a log to see the results
        System.out.println("MY CURRENT LOCATION" + myLocation);

    }

    public void onStatusChanged(String s, int i, Bundle bundle) {

    }

    public void onProviderEnabled(String s) {

    }

    public void onProviderDisabled(String s) {

    }
}
