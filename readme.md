# Puppeteer Docker Service

This service provides an API for generating screenshots of web pages using Puppeteer and Express, packaged in a Docker container.

## Requirements

- Docker
- Docker Compose

## Installation

1. Clone the repository

2. Create a `.env` file from the `.env.example`:

    ```sh
    cp .env.example .env
    ```

3. Edit the `.env` file with your values:

    ```env
    PASSWORD=your_password
    PORT=3020
    ```

## Build and Run

1. Build and start the containers using Docker Compose:

    ```sh
    docker-compose build
    docker-compose up -d
    ```

2. The server will be available at `http://localhost:3020`.

## Usage

The API provides an endpoint for generating screenshots of web pages.

### Endpoint

- `GET /generate-screenshot`

### Query Parameters

- `url` (required): The URL of the web page to capture.
- `password` (required): The authorization password.
- `width` (required): The width of the browser window (px).
- `height` (required): The height of the browser window (px).
- `fileName` (required): The name of the file to save the screenshot as.

### Example Request

```sh
curl "http://localhost:3020/generate-screenshot?url=https://example.com&password=your_password&width=1280&height=800&fileName=screenshot"
 ```

#Screenshots are located in src/output