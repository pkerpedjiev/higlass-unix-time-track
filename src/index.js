import register from 'higlass-register';

import UnixTimeTrack from './UnixTimeTrack';

console.log('registering:');

register({
  name: 'UnixTimeTrack',
  track: UnixTimeTrack,
  config: UnixTimeTrack.config,
});
