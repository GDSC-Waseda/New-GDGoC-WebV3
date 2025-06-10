import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "heq0maho",
  dataset: "blogs",
  apiVersion: "2024-04-29",
  useCdn: true,
});
