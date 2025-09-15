package com.melissalau.sistemdesamobile

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "SistemDesaMobile"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return DefaultReactActivityDelegate(
      this,
      mainComponentName,
      DefaultNewArchitectureEntryPoint.fabricEnabled, // enable Fabric renderer if opted-in
      DefaultNewArchitectureEntryPoint.concurrentReactEnabled // enable Concurrent React (React 18)
    )
  }
}
