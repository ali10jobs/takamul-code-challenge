import type { Core } from "@strapi/strapi";
import fs from "fs";
import path from "path";

const SEED_DIR = path.join(process.cwd(), "data", "seed");

const readJson = <T>(file: string): T[] =>
  JSON.parse(fs.readFileSync(path.join(SEED_DIR, file), "utf-8"));

async function grantPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });
  if (!publicRole) return;

  const readActions = [
    "api::hero-slide.hero-slide.find",
    "api::hero-slide.hero-slide.findOne",
    "api::service.service.find",
    "api::service.service.findOne",
    "api::team-member.team-member.find",
    "api::team-member.team-member.findOne",
    "api::client-testimonial.client-testimonial.find",
    "api::client-testimonial.client-testimonial.findOne",
  ];
  const writeActions = ["api::subscriber.subscriber.create"];

  for (const action of [...readActions, ...writeActions]) {
    const existing = await strapi.db
      .query("plugin::users-permissions.permission")
      .findOne({ where: { action, role: publicRole.id } });
    if (existing) continue;
    await strapi.db.query("plugin::users-permissions.permission").create({
      data: { action, role: publicRole.id },
    });
  }
}

async function seedCollection(
  strapi: Core.Strapi,
  uid: string,
  file: string
) {
  const count = await strapi.documents(uid as never).count({});
  if (count > 0) return;
  const rows = readJson<Record<string, unknown>>(file);
  for (const row of rows) {
    await strapi.documents(uid as never).create({
      data: row as never,
      status: "published",
    });
  }
  strapi.log.info(`Seeded ${rows.length} ${uid} records`);
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedCollection(strapi, "api::hero-slide.hero-slide", "hero-slides.json");
    await seedCollection(strapi, "api::service.service", "services.json");
    await seedCollection(strapi, "api::team-member.team-member", "team-members.json");
    await seedCollection(
      strapi,
      "api::client-testimonial.client-testimonial",
      "client-testimonials.json"
    );
    await grantPublicPermissions(strapi);
  },
};
