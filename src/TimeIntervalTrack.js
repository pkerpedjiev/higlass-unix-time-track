import { format } from 'd3-format';

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [
    h,
    m > 9 ? m : (h ? '0' + m : m || '0'),
    s > 9 ? s : '0' + s,
  ].filter(a => a).join(':');
}

const TimeIntervalTrack = (HGC, ...args) => {
  if (!new.target) {
    throw new Error(
      'Uncaught TypeError: Class constructor cannot be invoked without "new"',
    );
  }

  // HiGlass Code
  const { PIXI } = HGC.libraries;

  class TimeIntervalTrackClass extends HGC.tracks.TiledPixiTrack {
    constructor(
      scene, trackConfig, dataConfig, handleTilesetInfoReceived, animate,
    ) {
      super(
        scene,
        dataConfig,
        handleTilesetInfoReceived,
        trackConfig.options,
        animate,
      );

      this.axisTexts = [];
      this.axisTextFontFamily = 'Arial';
      this.axisTextFontSize = 14;
      this.tickFormat = format('.2');
    }

    createAxisTexts(valueScale, axisHeight) {
      this.tickValues = this.calculateAxisTickValues(valueScale, axisHeight);
      let i = 0;

      // const color = getDarkTheme() ? '#cccccc' : 'black';
      const color = 'black';

      while (i < this.tickValues.length) {
        const tick = this.tickValues[i];

        while (this.axisTexts.length <= i) {
          const newText = new PIXI.Text(
            tick,
            {
              fontSize: `${this.axisTextFontSize}px`,
              fontFamily: this.axisTextFontFamily,
              fill: color,
            },
          );
          this.axisTexts.push(newText);

          this.pMain.addChild(newText);
        }


        this.axisTexts[i].text = formatTime(tick);
        this.axisTexts[i].anchor.y = 0.5;
        this.axisTexts[i].anchor.x = 0.5;
        i++;
      }

      while (this.axisTexts.length > this.tickValues.length) {
        const lastText = this.axisTexts.pop();
        this.pMain.removeChild(lastText);
      }
    }

    calculateAxisTickValues() {
      const scale = +this.tilesetInfo.end_value / +this.tilesetInfo.max_width;
      const tickWidth = 100;
      const tickCount = Math.max(
        Math.ceil((this._xScale.range()[1] - this._xScale.range()[0]) / tickWidth), 1,
      );

      const newScale = this._xScale.copy().domain(
        [this._xScale.domain()[0] * scale, this._xScale.domain()[1] * scale],
      );

      return newScale.ticks(tickCount).filter(
        t => t / scale >= this.tilesetInfo.start_value && t / scale <= this.tilesetInfo.end_value,
      );
    }


    draw() {
      const graphics = this.pMain;

      if (!this.tilesetInfo) return;

      const scale = +this.tilesetInfo.end_value / +this.tilesetInfo.max_width;


      const tickHeight = 10;
      const textHeight = 10;
      const betweenTickAndText = 5;

      const tickStartY = (this.dimensions[1] - tickHeight - textHeight - betweenTickAndText) / 2;
      const tickEndY = tickStartY + tickHeight;

      const ticks = this.calculateAxisTickValues();

      graphics.clear();
      graphics.lineStyle(1, 0x000000, 1);

      this.createAxisTexts();

      ticks.forEach((tick, i) => {
        const xPos = this.position[0] + this._xScale(tick / scale);

        graphics.moveTo(xPos, this.position[1] + tickStartY);
        graphics.lineTo(xPos, this.position[1] + tickEndY); 

        this.axisTexts[i].x = xPos;
        this.axisTexts[i].y = this.position[1] + tickEndY + betweenTickAndText;
      });
    }

    calculateVisibleTiles() { }

    /* --------------------------- Getter / Setter ---------------------------- */

    zoomed(newXScale, newYScale) {
      this.xScale(newXScale);
      this.yScale(newYScale);

      this.draw();
    }
  }

  return new TimeIntervalTrackClass(...args);
};

TimeIntervalTrack.config = {
  type: 'time-interval-track',
  datatype: ['time-interval'],
  orientation: '1d-horizontal',
  name: 'TimeInterval',
  availableOptions: [
  ],
  defaultOptions: {
  },
};

export default TimeIntervalTrack;
