// Central file for all Lottie animations configuration
const lottieBaseUrl = import.meta.env.PROD ? '/assets/lotties/lockchain/' : '/src/assets/lotties/lockchain/';

export const lottieFiles = [
  'icon_display',
  'blockchain',
  'verify_myself_lottie',
  'verify_others_lottie',
  'data_upload_success_bitcoin',
  'searching_blockchain',
  'generation_loading',
  'scan',
  'verified'
].map(name => `${lottieBaseUrl}${name}.json`);

export default lottieFiles;
