import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpAdapterHost } from '@nestjs/core';

async function listRoutes() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const httpServer = httpAdapterHost.httpAdapter.getInstance();

  const server = httpServer._router;

  const routes = [];
  server.stack.forEach((layer) => {
    if (layer.route) {
      const path = layer.route.path;
      const method = Object.keys(layer.route.methods)[0].toUpperCase();
      routes.push({ method, path });
    }
  });

  console.log(`Number of API routes: ${routes.length}`);
  routes.forEach((route) => {
    console.log(`${route.method} ${route.path}`);
  });

  await app.close();
}

listRoutes();
