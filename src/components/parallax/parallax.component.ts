import { Component } from 'dacha';
import { DefineComponent, DefineField } from 'dacha-workbench/decorators';

interface ParallaxConfig {
  distance: number
}

@DefineComponent({
  name: 'Parallax',
})
export class Parallax extends Component {
  @DefineField()
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
