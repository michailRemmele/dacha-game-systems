import {
 ActorCollection, SceneSystem, CameraService, Transform,
} from 'dacha';
import type { Actor, SceneSystemOptions } from 'dacha';
import { AddActor } from 'dacha/events';
import type { AddActorEvent } from 'dacha/events';
import { DefineSystem } from 'dacha-workbench/decorators';

import { Parallax } from '../../components';

@DefineSystem({
  name: 'ParallaxSystem',
})
export class ParallaxSystem extends SceneSystem {
  private actorCollection: ActorCollection;
  private cameraService: CameraService;

  constructor(options: SceneSystemOptions) {
    super();

    this.actorCollection = new ActorCollection(options.scene, {
      components: [Transform, Parallax],
    });
    this.cameraService = options.world.getService(CameraService);

    this.actorCollection.forEach((actor) => this.setStartPosition(actor));
    this.actorCollection.addEventListener(AddActor, this.handleAddActor);
  }

  onSceneDestroy(): void {
    this.actorCollection.removeEventListener(AddActor, this.handleAddActor);
  }

  private handleAddActor = (event: AddActorEvent): void => {
    this.setStartPosition(event.actor);
  };

  private setStartPosition(actor: Actor): void {
    const transform = actor.getComponent(Transform);
    const parallax = actor.getComponent(Parallax);

    parallax.startX = transform.world.position.x;
    parallax.startY = transform.world.position.y;
  }

  update(): void {
    const currentCamera = this.cameraService.getCurrentCamera();
    if (!currentCamera) {
      return;
    }

    const {
      world: { position },
    } = currentCamera.getComponent(Transform);

    this.actorCollection.forEach((actor) => {
      const transform = actor.getComponent(Transform);
      const parallax = actor.getComponent(Parallax);

      transform.world.position.x = parallax.startX
        + (position.x - parallax.startX) * parallax.distance;
      transform.world.position.y = parallax.startY
        + (position.y - parallax.startY) * parallax.distance;
    });
  }
}
