import type { ActorEvent } from 'remiz';

export const AddEffect = 'AddEffect';
export const RemoveEffect = 'RemoveEffect';
export const ApplyEffect = 'ApplyEffect';
export const CancelEffect = 'CancelEffect';

export type AddEffectEvent = ActorEvent<{
  id: string
  options: Record<string, unknown>
}>;

export type RemoveEffectEvent = ActorEvent<{
  id: string
  options: Record<string, unknown>
}>;

declare module 'remiz' {
  export interface ActorEventMap {
    [AddEffect]: AddEffectEvent
    [RemoveEffect]: RemoveEffectEvent
    [ApplyEffect]: ActorEvent
    [CancelEffect]: ActorEvent
  }
}
