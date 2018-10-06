const { getGlobal } = require('electron').remote;

interface TrackEventFunction {
  (category: string, action: string, label: string, value: string): void;
}

const trackEvent: TrackEventFunction = (
  category: string,
  action: string,
  label: string,
  value: string
) => {
  console.log('track!', category, action, label, value);
  console.log(getGlobal('trackEvent'));
  console.log(getGlobal('userId'));
  getGlobal('trackEvent')(category, action, label, value);
};

export { trackEvent };
