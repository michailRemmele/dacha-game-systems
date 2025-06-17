import { useMemo, useCallback } from 'react';
import type { FC } from 'react';
import {
  Field,
  DependencyField,
  LabelledSelect,
  LabelledNumberInput,
  Widget,
  BehaviorWidget,
  useBehaviors,
  useConfig,
  useCommander,
  commands,
  defineWidget,
} from 'dacha-workbench';
import type { WidgetProps } from 'dacha-workbench';

export const EffectWidget: FC<WidgetProps> = defineWidget('Effect')(({
  fields,
  path,
}) => {
  const { dispatch } = useCommander();

  const behaviors = useBehaviors('EffectsSystem');

  const typePath = useMemo(() => path.concat('type'), [path]);
  const timerPath = useMemo(() => path.concat('timer'), [path]);
  const frequencyPath = useMemo(() => path.concat('frequency'), [path]);
  const durationPath = useMemo(() => path.concat('duration'), [path]);
  const cooldownPath = useMemo(() => path.concat('cooldown'), [path]);
  const scriptPath = useMemo(() => path.concat('script'), [path]);
  const optionsPath = useMemo(() => path.concat('options'), [path]);

  const scriptName = useConfig(scriptPath) as string | undefined;

  const availableEffects = Object.keys(behaviors ?? {});

  const handleSelect = useCallback((newName: unknown) => {
    const nextBehavior = behaviors?.[newName as string];
    if (nextBehavior) {
      dispatch(commands.setValue(optionsPath, nextBehavior.getInitialState?.() ?? {}, true));
    }
  }, [behaviors, optionsPath]);

  return (
    <>
      <Widget path={path} fields={fields} />
      <Field
        path={typePath}
        component={LabelledSelect}
        label="Type"
        options={[
          'instant',
          'delayed',
          'periodical',
          'continuous',
          'timeLimited',
        ]}
      />
      <DependencyField
        path={timerPath}
        component={LabelledNumberInput}
        label="Timer"
        dependencyPath={typePath}
        dependencyValue="delayed"
      />
      <DependencyField
        path={frequencyPath}
        component={LabelledNumberInput}
        label="Frequency"
        dependencyPath={typePath}
        dependencyValue="periodical"
      />
      <DependencyField
        path={durationPath}
        component={LabelledNumberInput}
        label="Duration"
        dependencyPath={typePath}
        dependencyValue="periodical|timeLimited"
      />
      <DependencyField
        path={cooldownPath}
        component={LabelledNumberInput}
        label="Cooldown"
        dependencyPath={typePath}
        dependencyValue="periodical"
      />
      <Field
        path={scriptPath}
        component={LabelledSelect}
        label="Script"
        options={availableEffects}
        onAccept={handleSelect}
      />
      {scriptName ? (
        <BehaviorWidget
          name={scriptName}
          path={optionsPath}
          systemName="EffectsSystem"
        />
      ) : null}
    </>
  );
});
