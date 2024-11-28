import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';

export default {
  bootstrap(app: any) {
    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: PLUGIN_ID,
      Component: () => {
        const ctx = useContentManagerContext();
        console.log('hey hey', ctx);

        return (
          <p>
            <mark>TESTING</mark>
          </p>
        );
      },
    });
  },
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads(app: any) {
    // const { locales } = app;
    console.log('hello from the plugin ')
    const locales = ['en']

    const importedTranslations = await Promise.all(
      (locales as string[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: getTranslation(data),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return importedTranslations;
  },
};
