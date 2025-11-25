export default function errorHandler(err, req, res, next) {
  // Log full error server-side for debugging/monitoring
  // (keep this server-side; don't expose stacks to clients)
  console.error(new Date().toISOString(), err);

  // Handle known Prisma errors with short, user-friendly messages
  if (err && err.name === "PrismaClientKnownRequestError") {
    // Unique constraint violation
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Resource already exists" });
    }
    // Other known request errors -> generic DB error message
    return res.status(400).json({ message: "Database error" });
  }

  if (err && err.name === "PrismaClientValidationError") {
    return res.status(400).json({ message: "Invalid request" });
  }

  // If an error object includes an explicit status (controllers can set err.status), use it
  const status = err && err.status ? err.status : 500;

  // For client errors (4xx) echo a short message if available, otherwise a generic one
  if (status >= 400 && status < 500) {
    const clientMsg = err && err.message ? String(err.message) : "Bad request";
    return res.status(status).json({ message: clientMsg });
  }

  // For server errors (5xx) always return a short, non-sensitive message
  return res.status(500).json({ message: "Internal server error" });
}
