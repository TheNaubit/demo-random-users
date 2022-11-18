import { IS_DEV_MODE } from "@constants";
import Logger from "logt";

/**
 * It returns an object with five functions that log to the console
 * @param  - `tag` - The tag to use for the logger.
 * @returns An object with 5 functions.
 */
export function useLogger({ tag = "General" }: { tag?: string }) {
  const logger = new Logger(IS_DEV_MODE ? "silly" : "error");

  function silly(value: string) {
    logger.silly(tag, value);
  }

  function debug(value: any) {
    logger.debug(tag, value);
  }

  function info(value: string) {
    logger.info(tag, value);
  }

  function warn(value: string) {
    logger.warn(tag, value);
  }

  function error(value: string | Error) {
    logger.error(tag, value);
  }

  return {
    silly,
    debug,
    info,
    warn,
    error,
  };
}
