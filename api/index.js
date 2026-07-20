var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import httpStatus6 from "http-status";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env")
});
var config_default = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  app_url: process.env.APP_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN
};

// src/middleware/globalErrorHandler.ts
import httpStatus from "http-status";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Comment {\n  id        String        @id @default(uuid())\n  content   String        @db.Text\n  authorId  String\n  author    User          @relation(fields: [authorId], references: [id], onDelete: Cascade)\n  postId    String\n  post      Post          @relation(fields: [postId], references: [id], onDelete: Cascade)\n  status    CommentStatus @default(APPROVED)\n  createdAt DateTime      @default(now())\n  updatedAt DateTime      @updatedAt\n\n  @@index([postId])\n  @@index([authorId])\n  @@map("comments")\n}\n\nenum ActiveStatus {\n  ACTIVE\n  BLOCKED\n}\n\nenum Role {\n  USER\n  AUTHOR\n  ADMIN\n}\n\nenum PostStatus {\n  DRAFT\n  PUBLISHED\n  ARCHIVED\n}\n\nenum CommentStatus {\n  APPROVED\n  REJECT\n}\n\nenum SubscriptionStatus {\n  ACTIVE\n  CANCEL\n  EXPIRED\n}\n\nmodel Post {\n  id         String     @id @default(uuid())\n  title      String     @db.VarChar(255)\n  content    String     @db.Text\n  thumbnail  String?\n  isFeatured Boolean    @default(false)\n  status     PostStatus @default(PUBLISHED)\n  tags       String[]\n  view       Int        @default(0)\n  createdAt  DateTime   @default(now())\n  updatedAt  DateTime   @updatedAt\n  isPremium  Boolean    @default(false)\n\n  authorId String\n  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)\n\n  comment Comment[]\n\n  @@index([authorId])\n  @@map("posts")\n}\n\nmodel Profile {\n  id           String  @default(uuid())\n  profilePhoto String?\n  bio          String?\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("profiles")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Subscription {\n  id String @id @default(uuid())\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  currentPeriodEnd DateTime\n  status           SubscriptionStatus @default(ACTIVE)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel User {\n  id           String       @id @default(uuid())\n  name         String\n  email        String       @unique\n  password     String\n  activeStatus ActiveStatus @default(ACTIVE)\n  role         Role         @default(USER)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  profile      Profile?\n  subscription Subscription?\n\n  comment Comment[]\n  post    Post[]\n\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Comment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"author","kind":"object","type":"User","relationName":"CommentToUser"},{"name":"postId","kind":"scalar","type":"String"},{"name":"post","kind":"object","type":"Post","relationName":"CommentToPost"},{"name":"status","kind":"enum","type":"CommentStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"comments"},"Post":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"PostStatus"},{"name":"tags","kind":"scalar","type":"String"},{"name":"view","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"isPremium","kind":"scalar","type":"Boolean"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"author","kind":"object","type":"User","relationName":"PostToUser"},{"name":"comment","kind":"object","type":"Comment","relationName":"CommentToPost"}],"dbName":"posts"},"Profile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"profilePhoto","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProfileToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"profiles"},"Subscription":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SubscriptionToUser"},{"name":"currentPeriodEnd","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"SubscriptionStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"activeStatus","kind":"enum","type":"ActiveStatus"},{"name":"role","kind":"enum","type":"Role"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"profile","kind":"object","type":"Profile","relationName":"ProfileToUser"},{"name":"subscription","kind":"object","type":"Subscription","relationName":"SubscriptionToUser"},{"name":"comment","kind":"object","type":"Comment","relationName":"CommentToUser"},{"name":"post","kind":"object","type":"Post","relationName":"PostToUser"}],"dbName":"users"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","user","profile","subscription","orderBy","cursor","comment","author","_count","post","Comment.findUnique","Comment.findUniqueOrThrow","Comment.findFirst","Comment.findFirstOrThrow","Comment.findMany","data","Comment.createOne","Comment.createMany","Comment.createManyAndReturn","Comment.updateOne","Comment.updateMany","Comment.updateManyAndReturn","create","update","Comment.upsertOne","Comment.deleteOne","Comment.deleteMany","having","_min","_max","Comment.groupBy","Comment.aggregate","Post.findUnique","Post.findUniqueOrThrow","Post.findFirst","Post.findFirstOrThrow","Post.findMany","Post.createOne","Post.createMany","Post.createManyAndReturn","Post.updateOne","Post.updateMany","Post.updateManyAndReturn","Post.upsertOne","Post.deleteOne","Post.deleteMany","_avg","_sum","Post.groupBy","Post.aggregate","Profile.findUnique","Profile.findUniqueOrThrow","Profile.findFirst","Profile.findFirstOrThrow","Profile.findMany","Profile.createOne","Profile.createMany","Profile.createManyAndReturn","Profile.updateOne","Profile.updateMany","Profile.updateManyAndReturn","Profile.upsertOne","Profile.deleteOne","Profile.deleteMany","Profile.groupBy","Profile.aggregate","Subscription.findUnique","Subscription.findUniqueOrThrow","Subscription.findFirst","Subscription.findFirstOrThrow","Subscription.findMany","Subscription.createOne","Subscription.createMany","Subscription.createManyAndReturn","Subscription.updateOne","Subscription.updateMany","Subscription.updateManyAndReturn","Subscription.upsertOne","Subscription.deleteOne","Subscription.deleteMany","Subscription.groupBy","Subscription.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","ActiveStatus","activeStatus","Role","role","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","userId","currentPeriodEnd","SubscriptionStatus","status","profilePhoto","bio","title","content","thumbnail","isFeatured","PostStatus","tags","view","isPremium","authorId","has","hasEvery","hasSome","postId","CommentStatus","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide","push"]'),
  graph: "vwItUAwHAACjAQAgCQAAwAEAIGIAAL4BADBjAAAHABBkAAC-AQAwZQEAAAABbUAAmAEAIW5AAJgBACGAAQAAvwGRASKEAQEAlQEAIYsBAQCVAQAhjwEBAJUBACEBAAAAAQAgCgEAAKMBACBiAACpAQAwYwAAAwAQZAAAqQEAMGUBAJUBACFtQACYAQAhbkAAmAEAIX0BAJUBACGBAQEAqgEAIYIBAQCqAQAhAQAAAAMAIAoBAACjAQAgYgAAoQEAMGMAAAUAEGQAAKEBADBlAQCVAQAhbUAAmAEAIW5AAJgBACF9AQCVAQAhfkAAmAEAIYABAACiAYABIgEAAAAFACAMBwAAowEAIAkAAMABACBiAAC-AQAwYwAABwAQZAAAvgEAMGUBAJUBACFtQACYAQAhbkAAmAEAIYABAAC_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_AYABIgIAAABVACAPAABhACAGZQEAxAEAIW1AAMcBACFuQADHAQAhfQEAxAEAIX5AAMcBACGAAQAA_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_AZEBIoQBAQCVAQAhiwEBAJUBACGPAQEAlQEAIQRvAAAAkQECcAAAAJEBCHEAAACRAQh2AAC5AZEBIhMGAACbAQAgBwAAowEAIGIAALoBADBjAAAKABBkAAC6AQAwZQEAlQEAIW1AAJgBACFuQACYAQAhgAEAALwBiAEigwEBAJUBACGEAQEAlQEAIYUBAQCqAQAhhgEgALsBACGIAQAArgEAIIkBAgC9AQAhigEgALsBACGLAQEAlQEAIZEBAAAKACCSAQAACgAgAAAAAZYBAQAAAAEBlgEAAABqAgGWAQAAAGwCAZYBQAAAAAEHFgAAgAIAIBcAAIMCACCTAQAAgQIAIJQBAACCAgAglwEAAAMAIJgBAAADACCZAQAAPQAgBxYAAPoBACAXAAD9AQAgkwEAAPsBACCUAQAA_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_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-BAQhghAEpYYUBLQ"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  CommentScalarFieldEnum: () => CommentScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PostScalarFieldEnum: () => PostScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProfileScalarFieldEnum: () => ProfileScalarFieldEnum,
  QueryMode: () => QueryMode,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  SubscriptionScalarFieldEnum: () => SubscriptionScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.8.0",
  engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Comment: "Comment",
  Post: "Post",
  Profile: "Profile",
  Subscription: "Subscription",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var CommentScalarFieldEnum = {
  id: "id",
  content: "content",
  authorId: "authorId",
  postId: "postId",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PostScalarFieldEnum = {
  id: "id",
  title: "title",
  content: "content",
  thumbnail: "thumbnail",
  isFeatured: "isFeatured",
  status: "status",
  tags: "tags",
  view: "view",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  isPremium: "isPremium",
  authorId: "authorId"
};
var ProfileScalarFieldEnum = {
  id: "id",
  profilePhoto: "profilePhoto",
  bio: "bio",
  userId: "userId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SubscriptionScalarFieldEnum = {
  id: "id",
  userId: "userId",
  currentPeriodEnd: "currentPeriodEnd",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  activeStatus: "activeStatus",
  role: "role",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var Role = {
  USER: "USER",
  AUTHOR: "AUTHOR",
  ADMIN: "ADMIN"
};
var PostStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED"
};
var CommentStatus = {
  APPROVED: "APPROVED",
  REJECT: "REJECT"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/middleware/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  console.log("Error :", err);
  let statusCode;
  let errorMessage = err.message || "Internal server Error";
  let errorName = err.name || "Internal server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorMessage = "You have provided incorrect failed type or missing field";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "Duplicate key Error";
    } else if (err.code === "P2003") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "Foreign key constraint failed";
    } else if (err.code === "2025") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "An operation failed because it depends on one or more records that were required but not found";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = httpStatus.UNAUTHORIZED;
      errorMessage = "Authorization failed against database server";
    } else if (err.errorCode === "P1001") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Can't reach database server";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution";
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    name: errorName,
    message: errorMessage,
    error: err.stack
  });
};

// src/middleware/notFound.ts
var notFound = (req, res) => {
  res.status(404).json({
    message: "Route Not Found",
    path: req.originalUrl,
    date: Date()
  });
};

// src/modules/auth/auth.route.ts
import { Router } from "express";

// src/modules/auth/auth.controller.ts
import httpStatus2 from "http-status";

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    error: data.error,
    meta: data.meta
  });
};

// src/modules/auth/auth.service.ts
import bcrypt from "bcrypt";

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
var verifiedToken = (token, secret) => {
  try {
    const verifiedToken2 = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken2
    };
  } catch (error) {
    console.log("Token verification failed :", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifiedToken
};

// src/modules/auth/auth.service.ts
var loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email
    }
  });
  if (user.activeStatus === "BLOCKED") {
    throw new Error("Your account has been blocked. Please contact support");
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }
  const jwtPayload = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    role: user?.role
  };
  const accessToken = jwtUtils.createToken(jwtPayload, config_default.jwt_access_secret, config_default.jwt_access_expires_in);
  const refreshToken3 = jwtUtils.createToken(jwtPayload, config_default.jwt_refresh_secret, config_default.jwt_refresh_expires_in);
  return { accessToken, refreshToken: refreshToken3 };
};
var refreshToken = async (refreshToken3) => {
  const verifiedRefreshToken = jwtUtils.verifiedToken(refreshToken3, config_default.jwt_refresh_secret);
  if (!verifiedRefreshToken.success) {
    throw new Error(verifiedRefreshToken.error);
  }
  const { id } = verifiedRefreshToken.data;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id
    }
  });
  if (user.activeStatus === "BLOCKED") {
    throw new Error("User is Blocked");
  }
  const jwtPayload = {
    id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  return { accessToken };
};
var authService = {
  loginUser,
  refreshToken
};

// src/modules/auth/auth.controller.ts
var loginUser2 = catchAsync(async (req, res, next) => {
  const { accessToken, refreshToken: refreshToken3 } = await authService.loginUser(req.body);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus2.OK,
    message: "User Login Successfully",
    data: { accessToken, refreshToken: refreshToken3 }
  });
});
var refreshToken2 = catchAsync(async (req, res, next) => {
  const { accessToken } = await authService.refreshToken(req.cookies.refreshToken);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus2.OK,
    message: "Token refreshed successfully",
    data: { accessToken }
  });
});
var authController = {
  loginUser: loginUser2,
  refreshToken: refreshToken2
};

// src/modules/auth/auth.route.ts
var router = Router();
router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);
var authRouter = router;

// src/modules/comment/comment.route.ts
import { Router as Router2 } from "express";

// src/middleware/auth.ts
var auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
    if (!token) {
      throw new Error("Your are not logged in . Please log in to access this resource");
    }
    const verifiedToken2 = jwtUtils.verifiedToken(token, config_default.jwt_access_secret);
    if (!verifiedToken2.success) {
      throw new Error(verifiedToken2.error);
    }
    const { id, name, email, role } = verifiedToken2.data;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error("Forbidden . You don't have permission to access this resource");
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
        name,
        email,
        role
      }
    });
    if (!user) {
      throw new Error("User Not found");
    }
    if (user.activeStatus === "BLOCKED") {
      throw new Error("Your account has been blocked. Please contact support");
    }
    req.user = {
      id,
      name,
      email,
      role
    };
    next();
  });
};

// src/modules/comment/comment.controller.ts
import httpStatus3 from "http-status";

// src/modules/comment/comment.service.ts
var createComment = async (authorId, payload) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId
    }
  });
  const comment = await prisma.comment.create({
    data: {
      ...payload,
      authorId
    }
    // include:{
    //     post : true
    // }
  });
  return comment;
};
var getCommentByAuthorId = async (authorId) => {
  const comments = await prisma.comment.findMany({
    where: {
      authorId
    },
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });
  return comments;
};
var getCommentByCommentId = async (postId) => {
  const comment = await prisma.comment.findMany({
    where: {
      postId
    }
  });
  return comment;
};
var updateComment = async (commentId, data, authorId) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId
    },
    select: {
      id: true
    }
  });
  const comment = await prisma.comment.update({
    where: {
      id: commentId,
      authorId
    },
    data
  });
  return comment;
};
var deleteComment = async (commentId, authorId) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId
    },
    select: {
      id: true
    }
  });
  const comment = await prisma.comment.delete({
    where: {
      id: commentData.id
    }
  });
  return comment;
};
var moderateComment = async (id, data) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true,
      status: true
    }
  });
  if (commentData.status === data.status) {
    throw new Error(`Your provided status (${data.status}) is already up to date.`);
  }
  const comment = await prisma.comment.update({
    where: {
      id
    },
    data
  });
  return comment;
};
var commentService = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment
};

// src/modules/comment/comment.controller.ts
var createComment2 = catchAsync(async (req, res, next) => {
  const authorId = req.user?.id;
  const result = await commentService.createComment(authorId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus3.CREATED,
    message: "Comment created successfully",
    data: result
  });
});
var getCommentByAuthorId2 = catchAsync(async (req, res, next) => {
  const { authorId } = req.params;
  const result = await commentService.getCommentByAuthorId(authorId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus3.OK,
    message: "Comments retrieved successfully",
    data: result
  });
});
var getCommentByCommentId2 = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const result = await commentService.getCommentByCommentId(postId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus3.OK,
    message: "Comment retrieved successfully",
    data: result
  });
});
var updateComment2 = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { commentId } = req.params;
  const authorId = user?.id;
  const payload = req.body;
  const result = await commentService.updateComment(commentId, payload, authorId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus3.OK,
    message: "Comment updated successfully",
    data: result
  });
});
var deleteComment2 = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { commentId } = req.params;
  const authorId = user?.id;
  const result = await commentService.deleteComment(commentId, authorId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus3.OK,
    message: "Comment deleted successfully",
    data: result
  });
});
var moderateComment2 = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const payload = req.body;
  const result = await commentService.moderateComment(commentId, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus3.OK,
    message: "Comment moderated successfully",
    data: result
  });
});
var commentController = {
  createComment: createComment2,
  getCommentByAuthorId: getCommentByAuthorId2,
  getCommentByCommentId: getCommentByCommentId2,
  updateComment: updateComment2,
  deleteComment: deleteComment2,
  moderateComment: moderateComment2
};

// src/modules/comment/comment.route.ts
var router2 = Router2();
router2.post("/", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.createComment);
router2.get("/author/:authorId", commentController.getCommentByAuthorId);
router2.get("/:commentId", commentController.getCommentByCommentId);
router2.put("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.updateComment);
router2.delete("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.deleteComment);
router2.put("/:commentId/moderate", auth(Role.ADMIN), commentController.moderateComment);
var commentRouter = router2;

// src/modules/post/post.route.ts
import { Router as Router3 } from "express";

// src/modules/post/post.controller.ts
import httpStatus4 from "http-status";

// src/modules/post/post.service.ts
var createPost = async (payload, userId) => {
  const result = await prisma.post.create({
    data: {
      title: payload.title,
      content: payload.content,
      thumbnail: payload.thumbnail || null,
      isFeatured: payload.isFeatured || false,
      status: payload.status || PostStatus.PUBLISHED,
      tags: payload.tags,
      authorId: userId
    }
  });
  return result;
};
var getAllPosts = async (query) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [];
  const tags = query.tags ? JSON.parse(query.tags) : null;
  const tagsArray = Array.isArray(tags) ? tags : [];
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          content: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.title) {
    andConditions.push({
      title: query.title
    });
  }
  if (query.content) {
    andConditions.push({
      content: query.content
    });
  }
  if (query.authorId) {
    andConditions.push({
      authorId: query.authorId
    });
  }
  if (query.isFeatured) {
    andConditions.push({
      isFeatured: Boolean(query.isFeatured)
    });
  }
  if (query.tags) {
    andConditions.push({
      tags: {
        hasSome: tagsArray
      }
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  const posts = await prisma.post.findMany({
    //filtering / exact match without and operator
    // where: {
    //     title: "My second Post",
    //     content: "Content of the post goes here."
    // },
    // where: {
    //     AND: [
    //         {
    //             title: "My second Post"
    //         },
    //         {
    //             content: "Content of the post goes here."
    //         },
    //         {
    //             tags: {
    //                 equals: [
    //                     "typescript",
    //                     "prisma",
    //                     "express"
    //                 ]
    //             }
    //         }
    //     ]
    // },
    //searching and partial match
    // where: {
    //     title: {
    //         contains: "my",
    //         mode: "insensitive"
    //     },
    //     content: {
    //         contains: "Content",
    //         mode: "insensitive"
    //     }
    // },
    // where: {
    //     OR: [
    //         {
    //             title: {
    //                 contains: "my",
    //                 mode: "insensitive"
    //             }
    //         },
    //         {
    //             content: {
    //                 contains: "content",
    //                 mode: "insensitive"
    //             }
    //         }
    //     ]
    // },
    // combining search and filtering 
    // where: {
    //     AND: [
    //         //searching
    //         {
    //             OR: [
    //                 {
    //                     title: {
    //                         contains: "my",
    //                         mode: "insensitive"
    //                     },
    //                 },
    //                 {
    //                     content: {
    //                         contains: "content",
    //                         mode: "insensitive"
    //                     }
    //                 }
    //             ]
    //         },
    //         //filtering
    //         {
    //             title: {
    //                 contains: "my",
    //                 mode: "insensitive"
    //             }
    //         }
    //     ]
    // },
    // take: 1,
    // skip: 1,
    // skip:2,
    // skip:3,
    // orderBy: {
    //     createdAt: "desc",
    //     title: "asc",
    //     content: "desc"
    // },
    // where: {
    //     AND: [
    //         query.searchTerm ? {
    //             OR: [
    //                 {
    //                     title: {
    //                         contains: query.searchTerm,
    //                         mode: "insensitive"
    //                     },
    //                 },
    //                 {
    //                     content: {
    //                         contains: query.searchTerm,
    //                         mode: "insensitive"
    //                     }
    //                 }
    //             ]
    //         } : {},
    //         query.title ? { title: query.title } : {},
    //         query.content ? { title: query.content } : {},
    //     ]
    // },
    // where:{
    // }
    where: {
      AND: andConditions
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      author: {
        omit: {
          password: true
        }
      },
      comment: true
    }
  });
  return posts;
};
var getPostStats = async () => {
  const transactionResult = await prisma.$transaction(
    async (tx) => {
      const [
        totalPosts,
        totalPublishedPosts,
        totalDraftPosts,
        totalArchivedPosts,
        totalComments,
        totalApprovedComments,
        totalRejectedComments,
        totalPostsViewsAggregate
      ] = await Promise.all([
        await tx.post.count(),
        await tx.post.count({
          where: {
            status: PostStatus.PUBLISHED
          }
        }),
        await tx.post.count({
          where: {
            status: PostStatus.DRAFT
          }
        }),
        await tx.post.count({
          where: {
            status: PostStatus.ARCHIVED
          }
        }),
        await tx.comment.count(),
        await tx.comment.count({
          where: {
            status: CommentStatus.APPROVED
          }
        }),
        await tx.comment.count({
          where: {
            status: CommentStatus.REJECT
          }
        }),
        await tx.post.aggregate({
          _sum: {
            view: true
          }
        })
        // totalPostsViewsAggregate._sum.view
      ]);
      return {
        totalPosts,
        totalPublishedPosts,
        totalDraftPosts,
        totalArchivedPosts,
        totalComments,
        totalApprovedComments,
        totalRejectedComments,
        // totalPostViews,
        totalPostsViews: totalPostsViewsAggregate._sum.view
      };
    }
  );
  return transactionResult;
};
var getMyPosts = async (authorId) => {
  const result = await prisma.post.findMany({
    where: {
      authorId
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      comment: true,
      author: {
        omit: {
          password: true
        }
      },
      _count: {
        select: {
          comment: true
        }
      }
    }
  });
  return result;
};
var getPostById = async (postId) => {
  const transactionResult = await prisma.$transaction(
    async (tx) => {
      await tx.post.update({
        where: {
          id: postId
        },
        data: {
          view: {
            increment: 1
          }
        }
      });
      const post = await tx.post.findUniqueOrThrow({
        where: {
          id: postId
        },
        include: {
          author: {
            omit: {
              password: true
            }
          },
          comment: {
            where: {
              status: CommentStatus.APPROVED
            },
            orderBy: {
              createdAt: "desc"
            }
          },
          _count: {
            select: {
              comment: true
            }
          }
        }
      });
      return post;
    }
  );
  return transactionResult;
};
var updatePosts = async (postId, payload, authorId, isAdmin) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId
    }
  });
  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("Your are not the owner of this post!");
  }
  const result = await prisma.post.update({
    where: {
      id: postId
    },
    data: payload,
    include: {
      author: {
        omit: {
          password: true
        }
      },
      comment: true
    }
  });
  return result;
};
var deletePost = async (postId, authorId, isAdmin) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId
    }
  });
  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("Your are not the owner of this post!");
  }
  await prisma.post.delete({
    where: {
      id: postId
    }
  });
};
var postService = {
  createPost,
  getAllPosts,
  getPostStats,
  getMyPosts,
  getPostById,
  updatePosts,
  deletePost
};

// src/modules/post/post.controller.ts
var createPost2 = catchAsync(async (req, res, next) => {
  const result = await postService.createPost(req.body, req.user?.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus4.CREATED,
    message: "Post created successfully",
    data: { result }
  });
});
var getAllPosts2 = catchAsync(async (req, res, next) => {
  const query = req.query;
  const posts = await postService.getAllPosts(query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus4.OK,
    message: "Get all post retrieved",
    data: { posts }
  });
});
var getPostStats2 = catchAsync(async (req, res, next) => {
  const result = await postService.getPostStats();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus4.OK,
    message: "Post stars retrieved retrieved successfully",
    data: { result }
  });
});
var getMyPosts2 = catchAsync(async (req, res, next) => {
  const authorId = await postService.getMyPosts(req.user?.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus4.OK,
    message: "Get my post retrieved",
    data: { authorId }
  });
});
var getPostById2 = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  if (!postId) {
    throw new Error("Post id Required in params");
  }
  const post = await postService.getPostById(postId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus4.OK,
    message: "Get single post retrieved",
    data: { post }
  });
});
var updatePosts2 = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  const payload = req.body;
  const authorId = req.user?.id;
  const isAdmin = req.user?.role === "ADMIN";
  const result = await postService.updatePosts(postId, payload, authorId, isAdmin);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus4.OK,
    message: "Post updated successfully",
    data: { result }
  });
});
var deletePost2 = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;
  if (!postId) {
    throw new Error("Post id required in params");
  }
  const authorId = req.user?.id;
  const isAdmin = req.user?.role === "ADMIN";
  await postService.deletePost(postId, authorId, isAdmin);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus4.OK,
    message: "Post delete successfully",
    data: null
  });
});
var postController = {
  createPost: createPost2,
  getAllPosts: getAllPosts2,
  getPostStats: getPostStats2,
  getMyPosts: getMyPosts2,
  getPostById: getPostById2,
  updatePosts: updatePosts2,
  deletePost: deletePost2
};

// src/modules/post/post.route.ts
var router3 = Router3();
router3.post("/", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.createPost);
router3.get("/", postController.getAllPosts);
router3.get("/stats", auth(Role.ADMIN, Role.USER), postController.getPostStats);
router3.get("/my-post", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.getMyPosts);
router3.get("/:postId", postController.getPostById);
router3.put("/:postId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.updatePosts);
router3.delete("/:postId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.deletePost);
var postRouter = router3;

// src/modules/user/user.route.ts
import { Router as Router4 } from "express";

// src/modules/user/user.controller.ts
import httpStatus5 from "http-status";

// src/modules/user/user.service.ts
import bcrypt2 from "bcrypt";
var registerUserIntoDB = async (payload) => {
  const { name, email, password, profilePhoto } = payload;
  const isUserExists = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (isUserExists) {
    throw new Error("User with this email already exists");
  }
  const hashPassword = await bcrypt2.hash(password, Number(config_default.bcrypt_salt_round));
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      profile: {
        create: {
          profilePhoto
        }
      }
    }
  });
  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email
    },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  });
  return user;
};
var getMyProfileIntoDB = async (userId) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId
    },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  });
  return user;
};
var updateMyProfileIntoDB = async (userId, payload) => {
  const { name, email, profilePhoto, bio } = payload;
  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name,
      email,
      profile: {
        update: {
          profilePhoto,
          bio
        }
      }
    },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  });
  return updatedUser;
};
var userService = {
  registerUserIntoDB,
  getMyProfileIntoDB,
  updateMyProfileIntoDB
};

// src/modules/user/user.controller.ts
var registerUser = catchAsync(async (req, res, next) => {
  const user = await userService.registerUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus5.CREATED,
    message: "User created Successfully",
    data: { user }
  });
});
var getMyProfile = catchAsync(async (req, res, next) => {
  const profile = await userService.getMyProfileIntoDB(req.user?.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus5.OK,
    message: "User profile fetched Successfully",
    data: { profile }
  });
});
var updateMyProfile = catchAsync(async (req, res, next) => {
  const updateProfile = await userService.updateMyProfileIntoDB(req.user?.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus5.OK,
    message: "Updated my profile",
    data: { updateProfile }
  });
});
var userController = {
  registerUser,
  getMyProfile,
  updateMyProfile
};

// src/modules/user/user.route.ts
var router4 = Router4();
router4.post("/register", userController.registerUser);
router4.get(
  "/me",
  //     (req: Request, res: Response, next: NextFunction) => {
  //     console.log(req.cookies);
  //     const { accessToken } = req.cookies;
  //     const verifiedToken = jwtUtils.verifiedToken(accessToken, config.jwt_access_secret);
  //     if (typeof verifiedToken === "string") {
  //         throw new Error(verifiedToken)
  //     }
  //     const { id, name, email, role } = verifiedToken;
  //     const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER];
  //     if (!requiredRoles.includes(role)) {
  //         return res.status(httpStatus.FORBIDDEN).json({
  //             success: false,
  //             statusCode: httpStatus.FORBIDDEN,
  //             message: "Forbidden . You don't have permission to access this resource"
  //         })
  //     }
  //     req.user = {
  //         id,
  //         name,
  //         email,
  //         role
  //     }
  //     next();
  // }, 
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  userController.getMyProfile
);
router4.put("/my-profile", auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.updateMyProfile);
var userRouter = router4;

// src/app.ts
var app = express();
app.use(cors({
  origin: config_default.app_url,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(httpStatus6.OK).json({
    success: true,
    statuscode: httpStatus6.OK,
    message: "Express Server Created",
    data: {}
  });
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use(notFound);
app.use(globalErrorHandler);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
