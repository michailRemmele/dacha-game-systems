import { Component } from 'dacha';

interface ParallaxConfig {
  distance: number
}

export class Parallax extends Component {
  distance: number;
  startX: number;
  startY: number;

  constructor(config: ParallaxConfig) {
    super();

    this.distance = config.distance;

    this.startX = 0;
    this.startY = 0;
  }

  clone(): Parallax {
    return new Parallax({
      distance: this.distance,
    });
  }
}

Parallax.componentName = 'Parallax';
