import { ZodError } from "zod";
import type { TErrorSources } from "../interface/error";

const handleZodHandler = (err: ZodError) => {
  const errorSources: TErrorSources = err.issues?.map((issue) => {
    const lastPath = issue.path[issue.path.length - 1];

    return {
      path: typeof lastPath === "symbol" ? String(lastPath) : (lastPath ?? ""),
      message: issue?.message,
    };
  });

  const statusCode = 500;

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodHandler;
