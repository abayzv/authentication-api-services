import jwt from "jsonwebtoken";
import { db } from "./utils/db";
import { findRefreshTokenByUserId } from "./api/auth/auth.services";
import { registerLog } from "./api/log/log.services";

async function isPermited(req: any, res: any, next: any) {
  const { role } = req.payload;
  const path = req.originalUrl.split("/").slice(3, 5).join("/");

  if (role === 1) return next();

  const isPermited = await db.role.findMany({
    where: {
      id: role,
      permissions: {
        some: {
          permission: {
            action: req.method,
            menu: {
              contains: path,
              mode: "insensitive",
            },
          },
        },
      },
    },
  });

  if (!isPermited.length) {
    res.status(403);
    const error = new Error("You are not permited to access this route");
    res.json({
      message: error.message,
    });
  } else {
    return next();
  }
}

function notFound(req: any, res: any, next: any) {
  res.status(404);
  const error = new Error(`Url Not Found ${req.originalUrl}`);
  res.json({
    message: error.message,
    // stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  });
}

// eslint-disable no-unused-vars /
function errorHandler(err: any, req: any, res: any, next: any) {
  // eslint-enable no-unused-vars /
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    // stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
}

function logger(req: any, res: any, next: any) {
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const route = req.originalUrl;
  const method = req.method;

  // Auth Logger
  // res.on("finish", () => {
  //   const status = res.statusCode;

  //   if (route.includes("login") || route.includes("register")) {
  //     registerLog({
  //       action: route,
  //       method: method,
  //       status: status,
  //       ipAddress: ipAddress,
  //     });
  //   }

  //   if (req.payload?.userId) {
  //     registerLog({
  //       action: route,
  //       method: method,
  //       status: status,
  //       userId: req.payload.userId,
  //       ipAddress: ipAddress,
  //     });
  //   } else {
  //     registerLog({
  //       action: route,
  //       method: method,
  //       status: status,
  //       ipAddress: ipAddress,
  //     });
  //   }
  // });

  const [oldWrite, oldEnd] = [res.write, res.end];
  const chunks: Buffer[] = [];

  (res.write as unknown) = function (chunk: any) {
    chunks.push(Buffer.from(chunk));
    (oldWrite as Function).apply(res, arguments);
  };

  res.end = function (chunk: any) {
    if (chunk) {
      chunks.push(Buffer.from(chunk));
    }
    const body = Buffer.concat(chunks).toString("utf8");
    console.log(new Date(), `  ↪ [${res.statusCode}]: ${body}`);
    (oldEnd as Function).apply(res, arguments);
  };

  next();
}

function logError(req: any, res: any, next: any) {
  const [oldWrite, oldEnd] = [res.write, res.end];
  const chunks: Buffer[] = [];

  (res.write as unknown) = function (chunk: any) {
    chunks.push(Buffer.from(chunk));
    (oldWrite as Function).apply(res, arguments);
  };

  res.end = function (chunk: any) {
    if (chunk) {
      chunks.push(Buffer.from(chunk));
    }
    const body = Buffer.concat(chunks).toString("utf8");

    if (res.statusCode >= 400) {
      console.log("Ada error");
    }

    (oldEnd as Function).apply(res, arguments);
  };

  next();
}

async function isAuthenticated(req: any, res: any, next: any) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: "Un-Authorized" });

  try {
    const token = authorization.split(" ")[1];
    // @ts-ignore
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as any;
    req.payload = payload;
    const { userId } = payload;
    const activeRefreshToken = await findRefreshTokenByUserId(userId);

    if (!activeRefreshToken)
      return res.status(401).json({ message: "Un-Authorized" });
  } catch (err: any) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      next(new Error("Token Expired"));
    }
    next(new Error("Un-Authorized"));
  }

  return next();
}

export {
  notFound,
  errorHandler,
  isAuthenticated,
  isPermited,
  logger,
  logError,
};
