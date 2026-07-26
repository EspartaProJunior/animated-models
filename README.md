# Animated Models

A web-based editor and animator for Minecraft JSON models.

## Live Demo

- **Updated version:** https://espartaprojunior.github.io/animated-models/
- **Original project:** https://vberlier.github.io/animated-models/

## Project Origin

This repository is an **unofficial fork** of
[`vberlier/animated-models`](https://github.com/vberlier/animated-models),
a project originally created by
[Valentin Berlier](https://github.com/vberlier).

The original project provided the user interface, model viewer, and animation
system on which this version is based. This fork preserves that work while
adding support for model formats and geometry used by newer Minecraft
versions.

Fork repository:
[`EspartaProJunior/animated-models`](https://github.com/EspartaProJunior/animated-models)

## Changes in This Fork

This version extends the model parser, validator, and viewer with support for:

- modern rotations using the `x`, `y`, and `z` properties;
- rotations around multiple axes, applied in XYZ order;
- arbitrary positive and negative angles;
- backward compatibility with the legacy `axis` + `angle` format;
- inverted or negative cubes where a `from` value is greater than `to`;
- negative coordinates and unusual geometry;
- safer validation of coordinates, rotation origins, and angles.

## Usage

1. Open the [updated web version](https://espartaprojunior.github.io/animated-models/).
2. Select your model files using the application interface.
3. Arrange the models as animation frames.
4. Configure the duration and timeline options.
5. Use the export option to download the result.

The application is a static website hosted through GitHub Pages.

## Development and Testing

The repository includes test models covering:

- modern rotations around all three axes;
- angles outside Minecraft's traditional angle list;
- negative angles;
- cubes with inverted dimensions.

Run the automated format tests from the repository root:

```bash
node tests/model-format.test.js
```

The visual test page is located at:

```text
tests/viewer-test.html
```

## Credits

- Original project and base implementation:
  [Valentin Berlier](https://github.com/vberlier)
- Modern format support and maintenance of this fork:
  [EspartaProJunior](https://github.com/EspartaProJunior)

This fork is not an official Minecraft product and is not affiliated with
Mojang Studios or Microsoft.

## License

This project retains the
[original MIT License](https://github.com/vberlier/animated-models/blob/master/LICENSE).
See the [`LICENSE`](LICENSE) file for the full license text and original
copyright attribution.
