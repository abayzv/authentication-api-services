export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "Authentication API Service",
    description:
      "User API Documentation, include authentication, authorization, role, permission, and user management",
    version: "1.0.0",
  },
  servers: [
    {
      url: process.env.APP_URL,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  tags: [
    {
      name: "Auth",
    },
    {
      name: "Role",
    },
    {
      name: "Permission",
    },
    {
      name: "User",
    },
  ],
  paths: {
    "/api/v1/users/me": {
      get: {
        tags: ["Auth"],
        summary: "Me",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "string",
                  password: "string",
                  name: "string",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "string",
                  password: "string",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/auth/refreshToken": {
      post: {
        tags: ["Auth"],
        summary: "Refresh Token",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  refreshToken: "string",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/auth/revokeRefreshTokens": {
      post: {
        tags: ["Auth"],
        summary: "Revoke Refresh Token",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  userId: "string",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/roles": {
      get: {
        tags: ["Role"],
        summary: "View All Roles",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      post: {
        tags: ["Role"],
        summary: "Create Role",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/roles/{id}": {
      get: {
        tags: ["Role"],
        summary: "Role Details",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      delete: {
        tags: ["Role"],
        summary: "Delete Role",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/roles/assign/{id}": {
      post: {
        tags: ["Role"],
        summary: "Assign Role Permissions",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  permissions: "Array[number]",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "integer",
            },
            required: true,
            example: "2",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/roles/{roleId}": {
      put: {
        tags: ["Role"],
        summary: "Update Role",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "roleId",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/roles/unassign/{id}": {
      delete: {
        tags: ["Role"],
        summary: "Delete Role Permission",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/permissions": {
      get: {
        tags: ["Permission"],
        summary: "View All Permissions",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      post: {
        tags: ["Permission"],
        summary: "Create Permission",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                  action: "string (GET || POST || PUT || DELETE)",
                  menu: "string",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/permissions/{id}": {
      put: {
        tags: ["Permission"],
        summary: "Update Permission",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                  action: "string (GET || POST || PUT || DELETE)",
                  menu: "string",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      delete: {
        tags: ["Permission"],
        summary: "Delete Permission",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/users": {
      get: {
        tags: ["User"],
        summary: "View All Users",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      post: {
        tags: ["User"],
        summary: "Create User",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "yuzong@gmail.com",
                  password: "P@ssw0rd",
                  confirmPassword: "P@ssw0rd",
                  name: "Yu Zong",
                  birthDate: "2022-05-01",
                  address: "China",
                  gender: "Laki-Laki",
                  religion: "Budha",
                  roleId: 4,
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/users/{id}": {
      get: {
        tags: ["User"],
        summary: "View User Detail",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      put: {
        tags: ["User"],
        summary: "Update user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "string",
                  birthDate: "yyyy-mm-dd",
                  address: "string",
                  gender: "string",
                  religion: "string",
                  photo: "string",
                  password: "string",
                  confirmPassword: "string",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
            example: "01320016-bb7b-4756-8bb5-db35d4ff504f",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
      delete: {
        tags: ["User"],
        summary: "Delete User",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
    "/api/v1/users/role/{id}": {
      put: {
        tags: ["User"],
        summary: "Change User Role",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  roleID: "number",
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "string",
            },
            required: true,
            example: "01320016-bb7b-4756-8bb5-db35d4ff504f",
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {},
            },
          },
        },
      },
    },
  },
};
