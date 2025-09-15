# Panduan Build Expo
Pastikan hapus folder node_modules terlebih dahulu. 

1. ```npm install```
2. set ANDROID_HOME path
   - Buka View Advanced System Settings 
   - Klik Enviroment Variables 
   - Masukkan variable ANDROID_HOME 
   - Masukkan value C:\Users\namauser\AppData\Local\Android\Sdk di System Variables dan User Variables 
3. Download emulator SDK 35
4. Enable long path
   ```New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force```
5. Hidupkan developer mode di Settings Windows > Systems > Developer Mode (ON)
6. Restart Laptop 
7. Download Ninja SDK Manager
   - Download NDK di SDK Manager > SDK Tools di Android Studio terlebih dahulu.
   - Download Ninja versi terbaru di https://github.com/ninja-build/ninja/releases , pilih yang ninja-win.zip kemudian extract folder zipnya.
   - Jika sudah terdownload dan terekstrak, replace ninja.exe di C:\Users\namauser\AppData\Local\Android\Sdk\cmake\3.22.1\bin dengan ninja.exe terbaru. 
8. Hapus /android kemudian jalankan npx expo prebuild 
9. Edit file build.gradle di sistem-desa\android\app\build.gradle, pastikan dipaste dibagian kode android.defaultConfig
    ```
            externalNativeBuild {
           cmake {
              def cmakeDir = "${android.sdkDirectory}/cmake/3.22.1/bin"
              def ninjaExecutable = Os.isFamily(Os.FAMILY_WINDOWS) ? "ninja.exe" : "ninja"
              def ninjaPath = "${cmakeDir}/${ninjaExecutable}".replace("\\", "/")

              arguments "-DCMAKE_MAKE_PROGRAM=${ninjaPath}",
                        "-DCMAKE_OBJECT_PATH_MAX=1024"
           }
        }
      ```
10. Tambahkan di file build.gradle di sistem-desa\android\app\build.gradle di line paling atas
    ```import org.apache.tools.ant.taskdefs.condition.Os```
11. Jika sudah, buka terminal lalu masukkan perintah 
    ```npm run android-release```
12. Hasil build app/release app dapat ditemukan di android/app/build/outputs/apk/release
      


# Starter Template with React Navigation

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
