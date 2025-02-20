package com.fams.fixedasset.Utils.HttpInterceptor;

public class AccessTokenContext {
    private static ThreadLocal<String> currentAccessToken = new InheritableThreadLocal<>();

    public static String getCurrentAccessToken() {
        return currentAccessToken.get();
    }

    public static void setCurrentAccessToken(String accessToken) {
        currentAccessToken.set(accessToken);
    }

    public static void clear() {
        currentAccessToken.set(null);
    }
}
