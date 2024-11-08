<div align="center">
  <img src="assets/LogoPodcast.png">
</div>

<br/>

<p align="center">
    <a href="https://github.com/FelippeChemello">
        <img alt="Author" src="https://img.shields.io/badge/Author-FelippeChemello-blue?style=for-the-badge&logo=appveyor">
    </a> 
    <br/>
    <a href="https://www.npmjs.com/package/podcast-maker">
        <img alt="GitHub Workflow Status" src="https://img.shields.io/npm/v/podcast-maker/latest?label=CLI&style=for-the-badge">
    </a>
</p>

## Tecnologies

<div align="center">
  <img src="assets/TechLogos.png" style="height='128px'">
</div>

This project was developed using:

-   [Typescript](https://www.typescriptlang.org/)
-   [NodeJS](https://nodejs.dev/)
-   [ReactJS](https://reactjs.org/)
-   [Remotion](https://www.remotion.dev/)

## Examples

-   [YouTube](https://www.youtube.com/channel/UCEQb3ajJgTK_Xr33OE0jeoQ)
-   [Instagram](https://www.instagram.com/codestackme/)

## ⚙️ Requirements

-   You need to install both NodeJS, PNPM, FFMPEG and Full Google Chrome to run this project (To run it on as Server Side, check actions workflow [here](https://github.com/FelippeChemello/podcast-maker/blob/master/.github/workflows/build-video.yml#L215-L223))
-   Access to YouTube API and/or Account on Instagram

## 💻 Getting started

### Install and Usage

**Clone repository**

```sh-session
$ git clone https://github.com/FelippeChemello/podcast-maker.git
```

**Install dependencies**

```sh-session
$ pnpm
```

**Build and configure**

```sh-session
$ pnpm build
$ ./bin/run configure
```

> To configure image generation, you need to setup [this project](https://github.com/FelippeChemello/modal_flux.1) and use the provided production URL

### Compose Video

```sh
./bin/run compose story -f ./content/18-phieu-luu-trong-phong-hop/
```

### Build Video

```bash
./bin/dev create local -c Main -f ./content/18-phieu-luu-trong-phong-hop/
```

### Preview Video

```bash
./bin/dev remotion preview -c Main -f ./content/18-phieu-luu-trong-phong-hop/
```

### Render Video locally

```bash
./bin/dev remotion render -c Main -f ./content/18-phieu-luu-trong-phong-hop/
```

### Deploy Video site

```bash
npx remotion lambda sites create video/mayst/index.tsx
```

### Render Video on lambda

```bash
./bin/dev remotion lambda-render -s is0hnubew5 -t mayst -c Main -f ./content/18-phieu-luu-trong-phong-hop/
```

```bash
./bin/dev remotion lambda-render -s 8qpsat00y7 -t mayst -c Main -f 
```

```bash
./bin/dev remotion lambda-render-thumb -s 8qpsat00y7 -t mayst -c Thumbnail -f 
```
