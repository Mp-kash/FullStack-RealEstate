import { PrismaClient } from "@prisma/client";
import config from "../prisma/config.js";
const prisma = new PrismaClient(config);

export { prisma };
