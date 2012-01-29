# Sencha Touch 2 Native Packaging for Android

## Requirements

 - [Android SDK Tools][9] (Revisions 13+)
 - Optional. [Eclipse][6]

## Steps to package your Android application

 1. Prerequisite: Obtain an appropriate Android ready certificate (debug or release) for signing the application
 2. Install [Sencha SDK Tools][8] (SenchaSDKTools 2.0).
 3. Create a packaging configuration file to be use with the packager.
 4. Run the packager to create a packaged <application>.apk.

### Step 1: Android certification generation

The Android Keytool included in the Android SDK tools is one way of creating certificate for signing Android applications. Below is an example of a Keytool command that generates a private key:

    $ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name
        -keyalg RSA -keysize 2048 -validity 10000

Follow the steps on the Android developers guide “[Signing Your Applications][2]” for more information about creating certificates and signing applications.

### Step 2: Install the Sencha SDK Tools.

 - Run the Sencha SDK installation: SenchaSDKTools (SenchaSDKTools-2.0.0-Beta)
 - The `sencha` command that includes the package option will be installed to the
   specified location during installation (default: Applications/SenchaSDKTools-2.0.0-Beta/command).

### Step 3: Create a packaging configuration file to be used with the native packager.

The configuration file has the following format:

    {
        "applicationName": "<AppName>",
        "applicationId": "<AppID>",
        "outputPath": "<AppPackageOutputPath>",
        "iconName": "<AppIconName>",
        "versionString": "<AppVersion>",
        "webAppPath": "<PathToWebApp>",
        "configuration": "<Release | Debug>",
        "platform": "<Android | AndroidEmulator>",
        "certificatePath": "<certificatePath>",
        "certificateAlias": "<certificateAlias>",
        "sdkPath": "/android-sdk-mac_86",
        "orientations": [
            "portrait",
            "landscapeLeft",
            "landscapeRight",
            "portraitUpsideDown"
        ],
        "deviceType": "<Not applicable for Android>"
    }

A configuration file template can be created by running the following command:

    sencha package generate <configTemplate.json>

`<configTemplate.json>` is the name of the configuration template file.

*Note:* the `<configTemplate.json>` path or filename cannot contain any space.

The following parameters are applicable to Android packages:

    "applicationName":"<AppName>"

Specifies the name of your application (`AppName`). The output file will have the name `<AppName>.apk`.
	
    "applicationId":"<AppID>"

Specifies an ID given to your application. It's suggested that you use a nameSpace for your app, such as `com.sencha.Touch2Package`.

    "outputPath":"<AppPackageOutputPath>"

Specifies the output location of the packaged application `<application.apk>`.

    "iconName":"<AppIconName>"

Specifies the launcher icon file to be used for your application. Refer to the Android [Launcher Icons][3] guide for further information on icon file specifications.

    "versionString":"<AppVersion>",

Specifies the version of the application.

    "webAppPath":"<PathToWebApp>"

Specifies the path of the web application to be packaged.

    "configuration":"<Release | Debug>"

Specifies the build type from either `Release` or `Debug`.

    "platform":"<Android | AndroidEmulator>"

Specifies if the build is for the Android device (Android) or the Android Emulator (AndroidEmulator).

    "certificatePath":"<certificatePath>",

Specifies a specific Certificate location for the certificate used for signing your application.

    "certificateAlias":"<CertificateAlias>"

Specifies a specific Certificate Alias to use for signing your application.

    "orientations": ["portrait", "landscapeLeft", "landscapeRight", "portraitUpsideDown"

Optional parameter. Specifies the orientations of the application. Available options: `portrait`, `landscape`, `landscapeRight`, and `portraitUpsideDown`. If omitted, defaults to all four orientations mode.

    "deviceType"

This is not applicable for Android applications. This config parameter is ignored when building an Android application.


#### Sample debug configuration file

    {
        "applicationName":"SenchaTouch2Package",
        "applicationId":"com.sencha.Touch2Package",
        "iconName":"icon.png",
        "versionString":"1.0",
        "outputPath":"~/Desktop/STBuild-Android",
        "webAppPath":"~/Desktop/www/",
        "configuration":"Debug",
        "platform":"Android",
        "deviceType":"Universal",
        "certificatePath":"~/Desktop/debug.keystore",
        "certificateAlias":"androiddebugkey",
        "sdkPath":"~/Desktop/android-sdk-mac_x86",
        "orientations": [
            "portrait",
            "landscapeLeft",
            "landscapeRight",
            "portraitUpsideDown"
        ]
    }

#### Sample release configuration file

    {
        "applicationName":"SenchaTouch2Package",
        "applicationId":"com.sencha.Touch2Package",
        "iconName":"icon.png",
        "versionString":"1.0",
        "outputPath":"~/Desktop/STBuild-Android",
        "webAppPath":"~/Desktop/www/",
        "configuration":"Release",
        "platform":"Android",
        "deviceType":"Universal",
        "certificatePath":"~/Desktop/senchatouch-key.keystore",
        "certificateAlias":"senchatouch",
        "sdkPath":"~/Desktop/android-sdk-mac_x86",
        "orientations": [
            "portrait",
            "landscapeLeft",
            "landscapeRight",
            "portraitUpsideDown"
        ]
    }

### Step 4: Run the packager to create a packaged `<application>.apk`

**Packaging a debug application and run it on an Android Emulator**

Prerequisite: The Platform and Configuration setting needs to be set in the config file, for example

    platform: AndroidEmulator
    configuration: Debug

To package a debug application to run on the Android Emulator, do the following:

 - Start the Android Emulator
 - Issue the following command:

       sencha package run <configFile.json>

The application will start in the already running Android Emulator after successful execution of this command. If Android Emulator is not started before issuing the command,  Android Emulator will not start automatically. If package is successful, an <AppName>.apk is available in the application output
location for you to manually test it on an Android Emulator or a device.

More info about Android Emulator can be found on the Android Developer Guide: [Using the Android Emulator][4].

### Packaging the application for distribution

To package a signed application to run on the device, issue the following command:

    sencha package <configFile.json>

An `<AppName.apk>` is created in the specified output location. This is the application that you can use to release for distribution.

### See Also

 1. [Signing Your Applications][2]
 2. [Installing the ADT Plugin for Eclipse][5]
 3. [Eclipse][6]
 4. [Managing Virtual Devices for Android Emulator][7]

[2]: http://developer.android.com/guide/publishing/app-signing.html
[3]: http://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher.html
[4]: http://developer.android.com/guide/developing/devices/emulator.html
[5]: http://developer.android.com/sdk/eclipse-adt.html
[6]: http://www.eclipse.org/
[7]: http://developer.android.com/guide/publishing/app-signing.html%23setup
[8]: http://www.sencha.com/products/sdk-tools/
[9]: http://developer.android.com/sdk/index.html