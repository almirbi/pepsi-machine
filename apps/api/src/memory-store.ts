import * as session from "express-session";

// TODO leaks memory, not production ready
// TODO must be a better way to share with controller
export const memoryStore = new session.MemoryStore();
