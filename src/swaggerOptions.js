const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API Documentation',
      version: '1.0.0',
      description: 'This documentation is powered by Swagger and details the endpoints for my Express API with Spotify authentication.',
    },
    servers: [
      {
        url: 'https://backend-spotify-hm8v.onrender.com/',
      },
    ],
    paths: {
      '/auth/token': {
        get: {
          summary: 'Retrieve an access token',
          description: 'This endpoint retrieves an access token using Spotify\'s client credentials flow.',
          responses: {
            200: {
              description: 'Access token retrieved successfully',
            },
            500: {
              description: 'Failed to fetch token',
            },
          },
        },
      },
      '/auth/callback': {
        post: {
          summary: 'Exchange authorization code for access token',
          description: 'This endpoint exchanges an authorization code for an access token as part of Spotify\'s authorization code flow.',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: {
                      type: 'string',
                      description: 'The authorization code received from Spotify\'s authorization server.',
                    },
                  },
                  required: ['code'],
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Access token retrieved successfully',
            },
            500: {
              description: 'Failed to exchange code for token',
            },
          },
        },
      },
      '/profile': {
        get: {
          summary: 'Retrieve user profile',
          description: 'This endpoint fetches the Spotify profile of the authenticated user.',
          responses: {
            200: {
              description: 'Profile retrieved successfully',
            },
            500: {
              description: 'Failed to fetch profile',
            },
          },
        },
      },
    },
  },
  apis: ['./routes.js'], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
