const core = require('@actions/core');
const exec = require('@actions/exec');

const root = process.env.ANDROID_SDK_ROOT;
const cli_root = `${root}/cmdline-tools/latest/bin`;

async function run() {
  const sdk = core.getInput('sdk');

  await core.group('Fetching Android image', async () => {
    return exec.exec('bash', ['-c', `yes | ${cli_root}/sdkmanager '${sdk}'`]);
  });
  await core.group('Creating AVD', async () => {
    return exec.exec('bash', ['-c', `echo | ${cli_root}/avdmanager create avd -n test -k '${sdk}'`]);
  });
  await core.group('Starting emulator', async () => {
    exec.exec(`${root}/emulator/emulator`, ['-avd', 'test', '-no-window', '-no-audio', '-no-snapshot', '-no-boot-anim', '-no-accel']);
    return exec.exec(`${root}/platform-tools/adb`, ['wait-for-device']);
  });
}

try {
  run().catch(error => core.setFailed(error.message));
} catch (error) {
  core.setFailed(error.message);
}
