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

This is a minimal starter template for React Native apps using Expo and React Navigation.

It includes the following:

- Example [Native Stack](https://reactnavigation.org/docs/native-stack-navigator) with a nested [Bottom Tab](https://reactnavigation.org/docs/bottom-tab-navigator)
- Web support with [React Native for Web](https://necolas.github.io/react-native-web/)
- TypeScript support and configured for React Navigation
- Automatic deep link and URL handling configuration
- Expo [Development Build](https://docs.expo.dev/develop/development-builds/introduction/) with [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)
- Edge-to-edge configured on Android with [`react-native-edge-to-edge`](https://www.npmjs.com/package/react-native-edge-to-edge)

## Getting Started

1. Create a new project using this template:

   ```sh
   npx create-expo-app@latest --template react-navigation/template
   ```

2. Edit the `app.json` file to configure the `name`, `slug`, `scheme` and bundle identifiers (`ios.bundleIdentifier` and `android.bundleIdentifier`) for your app.

3. Edit the `src/App.tsx` file to start working on your app.

## Running the app

- Install the dependencies:

  ```sh
  npm install
  ```

- Start the development server:

  ```sh
  npm start
  ```

- Build and run iOS and Android development builds:

  ```sh
  npm run ios
  # or
  npm run android
  ```

- In the terminal running the development server, press `i` to open the iOS simulator, `a` to open the Android device or emulator, or `w` to open the web browser.

## Notes

This project uses a [development build](https://docs.expo.dev/develop/development-builds/introduction/) and cannot be run with [Expo Go](https://expo.dev/go). To run the app with Expo Go, edit the `package.json` file, remove the `expo-dev-client` package and `--dev-client` flag from the `start` script. However, Edge-to-edge won't work on Expo Go.

We highly recommend using the development builds for normal development and testing.

The `ios` and `android` folder are gitignored in the project by default as they are automatically generated during the build process ([Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)). This means that you should not edit these folders directly and use [config plugins](https://docs.expo.dev/config-plugins/) instead. However, if you need to edit these folders, you can remove them from the `.gitignore` file so that they are tracked by git.

## Resources

- [React Navigation documentation](https://reactnavigation.org/)
- [Expo documentation](https://docs.expo.dev/)

---

Demo assets are from [lucide.dev](https://lucide.dev/)
