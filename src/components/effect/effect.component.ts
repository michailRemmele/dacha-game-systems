import { Component } from 'dacha';
import { DefineComponent } from 'dacha-workbench/decorators';

import type { EffectType } from './types';

const REMOVE_TIMEOUT = 5000;

interface EffectConfig {
  type: EffectType
  timer?: number
  frequency?: number
  duration?: number
  cooldown?: number
  script: string
  options: Record<string, unknown>
}

@DefineComponent({
  name: 'Effect',
  getInitialState: () => ({
    type: 'instant',
    script: '',
  }),
})
export class Effect extends Component {
  type: EffectType;

  timer?: number;
  frequency?: number;
  duration?: number;
  cooldown?: number;

  script: string;
  options: Record<string, unknown>;

  isCancelled: boolean;
  removeTimeout: number;

  constructor(config: EffectConfig) {
    super();

    this.type = config.type;

    this.timer = config.timer;
    this.frequency = config.frequency;
    this.duration = config.duration;
    this.cooldown = config.cooldown;

    this.script = config.script;

    this.options = { ...config.options };

    this.isCancelled = false;
    this.removeTimeout = REMOVE_TIMEOUT;
  }

  clone(): Effect {
    return new Effect({
      type: this.type,
      timer: this.timer,
      frequency: this.frequency,
      duration: this.duration,
      cooldown: this.cooldown,
      script: this.script,
      options: this.options,
    });
  }
}
