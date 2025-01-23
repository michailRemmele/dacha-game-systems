import type { WidgetSchema } from 'dacha-workbench';

export const parallax: WidgetSchema = {
  title: 'components.parallax.title',
  fields: [
    {
      name: 'distance',
      title: 'components.parallax.distance.title',
      type: 'number',
    },
  ],
  getInitialState: () => ({
    distance: 0,
  }),
};
