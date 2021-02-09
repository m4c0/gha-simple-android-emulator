# gha-simple-android-emulator

GitHub Action to manage an Android emulator.

This downloads and cache a given SDK image, creates an AVD and starts an emulator in the background.

The emulator is barebones, without persistence, interface, audio or acceleration. It is meant to run headless unit tests via ADB.

## Example usage:

```
uses: m4c0/gha-simple-android-emulator
with:
  sdk: system-images;android-29;default;x86_64
```
