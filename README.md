   
# TextCase

TextCase is a versatile text case conversion tool that allows users to transform text between various case formats. The application provides both a web interface and a command-line deployment tool.

## Features

- **Multiple Case Conversions**: Convert text between 14 different case formats:
  - Original Text
  - UPPERCASE
  - lowercase
  - Title Case
  - Sentence case
  - ToGgLe CaSe
  - InVeRt CaSe
  - camelCase
  - PascalCase
  - snake_case
  - UPPER_SNAKE_CASE
  - kebab-case
  - Train-Case
  - flatcase

- **Client-Side Processing**: All text conversions happen in the browser, ensuring data privacy and security.
- **Responsive Design**: Works on desktop and mobile devices.
- **AWS Deployment**: Includes AWS CDK infrastructure for deploying to CloudFront and S3.

## Technology Stack

- **Frontend**: Built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/)
- **Infrastructure**: AWS CDK for deployment to CloudFront and S3
- **Testing**: Jest for unit testing
- **Language**: TypeScript

## Installation

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

This will start the Astro development server, typically at http://localhost:4321.

## Building

Build the Astro site:

```bash
npm run build-astro
```

Compile TypeScript files:

```bash
npm run build
```

## Testing

Run tests with Jest:

```bash
npm test
```

## Deployment

The project includes AWS CDK infrastructure for deployment. The stack creates:

- S3 bucket for hosting
- CloudFront distribution
- SSL certificate
- DNS records

To deploy:

1. Make sure you have AWS credentials configured
2. Update the domain settings in `bin/textcase.ts` if needed
3. Run the CDK deployment:

```bash
npm run cdk deploy
```

## CLI Usage

The project includes a CLI tool for deployment:

```bash
textcase
```

## Privacy

All text conversions happen client-side in the browser. Your text is never sent to a server, ensuring complete privacy.

## License

[MIT](LICENSE)