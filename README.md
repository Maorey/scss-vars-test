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

There are two html pages, `index.html` and `home.html`.

1. Import same scss file in different entry, find it's superior reference recursively always get first entry, see comments in [index](src/pages/index/index.js) and [home](src/pages/home/index.js) (I don't know why, it's not appear before)
2. In `dev` script, they have **different** style; In `build` script, they have **same** style.
