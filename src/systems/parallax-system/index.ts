import {
  ActorCollection,
  System,
  CameraService,
  Transform,
} from 'remiz';
import type { Actor, SystemOptions } from 'remiz';
import { AddActor } from 'remiz/events';
import type { AddActorEvent } from 'remiz/events';

import { Parallax } from '../../components';

export class ParallaxSystem extends System {
  private actorCollection: ActorCollection;
  private cameraService: CameraService;

  constructor(options: SystemOptions) {
    super();

    this.actorCollection = new ActorCollection(options.scene, {
      components: [Transform, Parallax],
    });
    this.cameraService = options.scene.getService(CameraService);
  }

  mount(): void {
    this.actorCollection.forEach((actor) => this.setStartPosition(actor));
    this.actorCollection.addEventListener(AddActor, this.handleAddActor);
  }

  unmount(): void {
    this.actorCollection.removeEventListener(AddActor, this.handleAddActor);
  }

  private handleAddActor = (event: AddActorEvent): void => {
    this.setStartPosition(event.actor);
  };

  private setStartPosition(actor: Actor): void {
    const transform = actor.getComponent(Transform);
    const parallax = actor.getComponent(Parallax);

    parallax.startX = transform.offsetX;
    parallax.startY = transform.offsetY;
  }

  update(): void {
    const currentCamera = this.cameraService.getCurrentCamera();
    const {
      offsetX: cameraOffsetX,
      offsetY: cameraOffsetY,
    } = currentCamera.getComponent(Transform);

    this.actorCollection.forEach((actor) => {
      const transform = actor.getComponent(Transform);
      const parallax = actor.getComponent(Parallax);

      transform.offsetX = parallax.startX + (cameraOffsetX - parallax.startX) * parallax.distance;
      transform.offsetY = parallax.startY + (cameraOffsetY - parallax.startY) * parallax.distance;
    });
  }
}

ParallaxSystem.systemName = 'ParallaxSystem';
