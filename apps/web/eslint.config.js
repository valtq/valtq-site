import config from '@valtq/config/eslint';

export default [
  ...config,
  {
    ignores: ['next-env.d.ts'],
  },
];
