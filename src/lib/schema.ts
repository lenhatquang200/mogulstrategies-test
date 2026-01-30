import {
  mysqlTable,
  int,
  varchar,
  datetime,
  tinyint,
  uniqueIndex,
  index,
  text
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";

/* ===== ROLE ===== */
export const Role = mysqlTable(
  "Role",
  {
    id: int("id").primaryKey().autoincrement(),

    name: varchar("name", { length: 191 }).notNull(),

    description: varchar("description", { length: 191 }),

    createdAt: datetime("createdAt", { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),

    updatedAt: datetime("updatedAt", { fsp: 3 }).notNull(),
  },
  (table) => ({
    nameUnique: uniqueIndex("Role_name_key").on(table.name),
  })
);

/* ===== USER ===== */
export const User = mysqlTable(
  "User",
  {
    id: int("id").primaryKey().autoincrement(),

    name: varchar("name", { length: 191 }),

    email: varchar("email", { length: 191 }).notNull(),

    password: varchar("password", { length: 191 }).notNull(),

    roleId: int("roleId")
      .notNull()
      .references(() => Role.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    accreditationStatus: varchar("accreditationStatus", { length: 191 })
      .notNull()
      .default("individual"),

    twoFactorEnabled: tinyint("twoFactorEnabled")
      .notNull()
      .default(1),

    otpCode: varchar("otpCode", { length: 191 }),

    otpExpiry: datetime("otpExpiry", { fsp: 3 }),

    createdAt: datetime("createdAt", { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),

    updatedAt: datetime("updatedAt", { fsp: 3 }).notNull(),
  },
  (table) => ({
    emailUnique: uniqueIndex("User_email_key").on(table.email),
    roleIdx: index("User_roleId_fkey").on(table.roleId),
  })
);

/* ===== RELATIONS ===== */
export const RoleRelations = relations(Role, ({ many }) => ({
  users: many(User),
}));

export const UserRelations = relations(User, ({ one }) => ({
  role: one(Role, {
    fields: [User.roleId],
    references: [Role.id],
  }),
}));


/* ===== CONTACT ===== */
export const Contact = mysqlTable("contacts", {
  id: int("id").primaryKey().autoincrement(),

  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),

  type: varchar("type", { length: 100 }).notNull(),
  accredited: varchar("accredited", { length: 50 }).notNull(),

  message: text("message").notNull(),

  createdAt: datetime("createdAt", { fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),

  updatedAt: datetime("updatedAt", { fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),
});
