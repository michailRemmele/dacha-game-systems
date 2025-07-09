import type { Actor } from 'dacha';

import type { EffectScript } from '../effect-script';
import { Effect } from '../../../components';
import type { PeriodicalEffectOptions } from '../../../components';

import { EffectApplicator } from './effect-applicator';

export class PeriodicalEffectApplicator extends EffectApplicator {
  isFinished: boolean;

  constructor(script: EffectScript, actor: Actor) {
    super(script, actor);

    this.isFinished = false;
  }

  update(deltaTime: number): void {
    if (this.isFinished) {
      return;
    }

    const effect = this.actor.getComponent(Effect) as Effect & PeriodicalEffectOptions;

    effect.cooldown -= deltaTime;

    while (effect.cooldown <= 0) {
      this.script.apply();
      this.handleApply();
      effect.cooldown += effect.frequency;
    }

    if (effect.duration) {
      effect.duration -= deltaTime;
      if (effect.duration <= 0) {
        this.isFinished = true;
      }
    }
  }

  cancel(): void {
    this.handleCancel();
  }
}
