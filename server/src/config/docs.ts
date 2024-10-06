import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Interview Savvy API",
      version: "1.0.0",
    },
  },
  apis: ["./src/api/*.ts"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
