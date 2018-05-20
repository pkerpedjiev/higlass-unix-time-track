# Time Interval Track for HiGlass

> Display time intervals in the format HH:MM:ss in HiGlass.

[![HiGlass](https://img.shields.io/badge/higlass-👍-red.svg?colorB=0f5d92)](http://higlass.io)
[![Build Status](https://img.shields.io/travis/pkerpedjiev/higlass-time-interval-track/master.svg?colorB=0f5d92)](https://travis-ci.org/pkerpedjiev/higlass-time-interval-track)

![HiGlass showing ski areas with Mapbox](/teaser.jpg?raw=true "Ski areas around Park City shown with Mapbox")

**Note**: This is the source code for the time interval track only! You might want to check out the following repositories as well:

- HiGlass viewer: https://github.com/hms-dbmi/higlass
- HiGlass server: https://github.com/hms-dbmi/higlass-server
- HiGlass docker: https://github.com/hms-dbmi/higlass-docker

## Installation

```
npm install higlass-time-interval-track
```

## Usage

1. Make sure you load this track prior to `hglib.js`. For example:

```
<script src="higlass-time-interval-track.js"></script>
<script src="hglib.js"></script>
<script>
  ...
</script>
```

2. Now, configure the track in your view config and be happy! Cheers 🎉

```
{
  ...
  {
    server: 'http://localhost:8001/api/v1',
    tilesetUid: 'time-interval.json',
    uid: 'blah',
    type: 'time-interval-track',
    options: {

    },
  },
  ...
}
```

Take a look at [`src/index.html`](src/index.html) for an example.

## Development

### Installation

```bash
$ git clone https://github.com/pkerpedjiev/higlass-time-interval-track
$ npm install
```

### Commands

**Developmental server**: `npm start`
**Production build**: `npm run build`
