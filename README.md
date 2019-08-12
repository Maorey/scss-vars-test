# scss-vars-test

minimum reproducible test repo for inject scss variables

## install

```bash
yarn
```

## scripts

### development

```bash
yarn run dev
```

### production

```bash
yarn run build
```

## debug scripts above

You can use two debug configurations `dev` and `build` in VSCode debug view.

## problem

There are two html pages, `index.html` and `home.html`, Scss files was imported in [index](src/pages/index/index.js) and [home](src/pages/home/index.js).

1. Import same scss file in different entry, `data` only emit once, `loaderContext.cacheable(false)` is useless.
2. The buttons in `dev` and `build` have different styles.
