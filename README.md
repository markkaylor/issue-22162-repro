## Setup

### Install deps

In the plugin 

```
yarn install && yarn build
```

In the strapi app

```
yarn install && yarn develop
```


Go to the Example content-type and go to an entry

See the error

## Make it work

In the plugin

```
yarn watch:link
```

In the strapi app

```
yarn remove test-plugin
yarn dlx yalc add --link test-plugin && yarn install
```

Go to the Example content-type and go to an entry

See the plugin output
