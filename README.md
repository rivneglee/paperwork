# Paperwork:
[![CircleCI](https://circleci.com/gh/rivneglee/paperwork.svg?style=shield&circle-token=6c7f7c4a19f55cb0a379d1888c397df62be57a82)](https://circleci.com/gh/rivneglee/workflows/paperwork)

## Project background

Paperwork is aiming to build a flexible form platform so user can build form and manage result easily.
Typical usage includes survey, online test and all other data collection purpose.  

## Project structure
- packages
  - `ui-widgets` is UI component library which is used by paperwork application and potentially can be used by other internal projects
  - `ui-styles` is the css styling for UI components defined in `ui-widgets`. You can define your css and styling `ui-widgets` if you want
  - `paperwork-web` the application project
    
## Development

#### Run paperwork application
```bash
yarn install
cd packages/paperwork-web
yarn start
```

#### Run SSR service
```bash
yarn server:dev
```

#### Run UI widget storybook
```bash
yarn storybook
```


## Quality control
```bash
yarn test
yarn lint
```