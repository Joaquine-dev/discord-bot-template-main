"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __glob = (map) => (path2) => {
  var fn = map[path2];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path2);
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/structure/ApplicationCommand.ts
var _ApplicationCommand, ApplicationCommand, ApplicationCommand_default;
var init_ApplicationCommand = __esm({
  "src/structure/ApplicationCommand.ts"() {
    "use strict";
    _ApplicationCommand = class _ApplicationCommand {
      constructor(structure) {
        this.toJSON = /* @__PURE__ */ __name(() => {
          return { ...this.data };
        }, "toJSON");
        this.data = {
          __type__: 1,
          // Utilisé pour le gestionnaire
          ...structure
        };
      }
    };
    __name(_ApplicationCommand, "ApplicationCommand");
    ApplicationCommand = _ApplicationCommand;
    ApplicationCommand_default = ApplicationCommand;
  }
});

// src/config/config.ts
var config, config_default;
var init_config = __esm({
  "src/config/config.ts"() {
    "use strict";
    config = {
      development: {
        enabled: true,
        guildId: "1369258577990123612"
      },
      commands: {
        prefix: "--",
        message_commands: true,
        application_commands: {
          chat_input: true,
          user_context: true,
          message_context: true
        }
      },
      users: {
        ownerId: "1361668952475832528",
        developers: ["1361668952475832528"]
      },
      messages: {
        NOT_BOT_OWNER: "Vous n'avez pas la permission d'ex\xE9cuter cette commande car vous n'\xEAtes pas mon propri\xE9taire !",
        NOT_BOT_DEVELOPER: "Vous n'avez pas la permission d'ex\xE9cuter cette commande car vous n'\xEAtes pas un de mes d\xE9veloppeurs !",
        NOT_GUILD_OWNER: "Vous n'avez pas la permission d'ex\xE9cuter cette commande car vous n'\xEAtes pas le propri\xE9taire du serveur !",
        CHANNEL_NOT_NSFW: "Vous ne pouvez pas ex\xE9cuter cette commande dans un canal non NSFW !",
        MISSING_PERMISSIONS: "Vous n'avez pas la permission d'ex\xE9cuter cette commande, permissions manquantes.",
        COMPONENT_NOT_PUBLIC: "Vous n'\xEAtes pas l'auteur de ce bouton !",
        GUILD_COOLDOWN: "Vous \xEAtes actuellement en p\xE9riode de recharge, vous pourrez r\xE9utiliser cette commande dans `%cooldown%s`."
      }
    };
    config_default = config;
  }
});

// src/job/userAction.ts
async function canReceiveDM(member) {
  try {
    await member.createDM();
    return true;
  } catch (error2) {
    console.error(`Impossible de cr\xE9er un canal DM pour ${member.user.tag}:`, error2);
    return false;
  }
}
async function canAction(executor, target, permission) {
  if (target.permissions.has(import_discord2.PermissionFlagsBits.Administrator)) return false;
  if (executor.permissions.has(import_discord2.PermissionFlagsBits.Administrator)) return true;
  if (executor.permissions.has(permission)) return true;
  if (executor.id == config_default.users.ownerId) return true;
  if (executor.id === target.id) return false;
  if (executor.roles.highest.position >= target.roles.highest.position) return false;
  return true;
}
var import_discord2;
var init_userAction = __esm({
  "src/job/userAction.ts"() {
    "use strict";
    init_config();
    import_discord2 = require("discord.js");
    __name(canReceiveDM, "canReceiveDM");
    __name(canAction, "canAction");
  }
});

// src/entity/Logs.ts
var import_typeorm, Action2, Logs;
var init_Logs = __esm({
  "src/entity/Logs.ts"() {
    "use strict";
    import_typeorm = require("typeorm");
    Action2 = /* @__PURE__ */ ((Action5) => {
      Action5["BAN"] = "ban";
      Action5["UNBAN"] = "unban";
      Action5["KICK"] = "kick";
      Action5["MUTE"] = "mute";
      Action5["UNMUTE"] = "unmute";
      Action5["DISCONNECT"] = "disconnect";
      return Action5;
    })(Action2 || {});
    Logs = class {
    };
    __name(Logs, "Logs");
    __decorateClass([
      (0, import_typeorm.PrimaryGeneratedColumn)()
    ], Logs.prototype, "id", 2);
    __decorateClass([
      (0, import_typeorm.Column)({ type: "bigint" })
    ], Logs.prototype, "guildId", 2);
    __decorateClass([
      (0, import_typeorm.Column)({ type: "bigint" })
    ], Logs.prototype, "executorId", 2);
    __decorateClass([
      (0, import_typeorm.Column)({ type: "bigint" })
    ], Logs.prototype, "targetId", 2);
    __decorateClass([
      (0, import_typeorm.Column)({ type: "enum", enum: Action2 })
    ], Logs.prototype, "action", 2);
    __decorateClass([
      (0, import_typeorm.Column)({ type: "varchar" })
    ], Logs.prototype, "description", 2);
    __decorateClass([
      (0, import_typeorm.Column)({ type: "timestamp", default: /* @__PURE__ */ __name(() => "CURRENT_TIMESTAMP", "default") })
    ], Logs.prototype, "createdAt", 2);
    Logs = __decorateClass([
      (0, import_typeorm.Entity)()
    ], Logs);
  }
});

// src/services/LogsService.ts
var _LogsService, LogsService;
var init_LogsService = __esm({
  "src/services/LogsService.ts"() {
    "use strict";
    init_Logs();
    _LogsService = class _LogsService {
      static async createLog(client2, guild, executor, target, action, description) {
        const logsRepository = client2.database.getClient().getRepository(Logs);
        const log = logsRepository.create({ guildId: guild.id, executorId: executor.id, targetId: target.id, action, description });
        await logsRepository.save(log);
      }
    };
    __name(_LogsService, "LogsService");
    LogsService = _LogsService;
  }
});

// src/commands/Admin/sc-ban.ts
var require_sc_ban = __commonJS({
  "src/commands/Admin/sc-ban.ts"(exports2, module2) {
    "use strict";
    var import_discord19 = require("discord.js");
    init_ApplicationCommand();
    init_userAction();
    init_Logs();
    init_LogsService();
    module2.exports = new ApplicationCommand_default({
      command: {
        name: "ban",
        description: "Bannir un utilisateur",
        options: [
          {
            type: import_discord19.ApplicationCommandOptionType.User,
            name: "user",
            description: "Utilisateur \xE0 bannir",
            required: true
          },
          {
            type: import_discord19.ApplicationCommandOptionType.String,
            name: "reason",
            description: "Raison du bannissement",
            required: true
          }
        ]
      },
      options: {
        default_member_permissions: import_discord19.PermissionsBitField.Flags.BanMembers
      },
      run: /* @__PURE__ */ __name(async (client2, interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        try {
          const user = interaction.options.getUser("user");
          const reason = interaction.options.getString("reason");
          if (!user) return interaction.reply({ content: "Veuillez entrer un utilisateur valide", ephemeral: true });
          const member = interaction.guild?.members.cache.get(user.id);
          if (!member) return interaction.reply({ content: "Utilisateur non trouv\xE9", ephemeral: true });
          if (!await canAction(
            interaction.member,
            member,
            new import_discord19.PermissionsBitField(import_discord19.PermissionsBitField.Flags.BanMembers)
          )) {
            return interaction.reply({ content: "Vous ne pouvez pas faire cette action", ephemeral: true });
          }
          await member.ban({ reason: reason || "Aucune raison sp\xE9cifi\xE9e" });
          await LogsService.createLog(client2, interaction.guild, interaction.member, member, "ban" /* BAN */, reason || "Aucune raison sp\xE9cifi\xE9e");
          interaction.reply({ content: `Utilisateur banni avec succ\xE8s`, ephemeral: true });
          interaction.deleteReply();
        } catch (error2) {
          console.error(error2);
        }
      }, "run")
    }).toJSON();
  }
});

// src/commands/Admin/sc-kick.ts
var require_sc_kick = __commonJS({
  "src/commands/Admin/sc-kick.ts"(exports2, module2) {
    "use strict";
    var import_discord19 = require("discord.js");
    init_ApplicationCommand();
    init_userAction();
    init_Logs();
    init_LogsService();
    module2.exports = new ApplicationCommand_default({
      command: {
        name: "kick",
        description: "Expulser un utilisateur",
        options: [
          {
            type: import_discord19.ApplicationCommandOptionType.User,
            name: "user",
            description: "Utilisateur \xE0 expulser",
            required: true
          },
          {
            type: import_discord19.ApplicationCommandOptionType.String,
            name: "reason",
            description: "Raison de l'expulsion",
            required: false
          }
        ]
      },
      options: {
        default_member_permissions: import_discord19.PermissionsBitField.Flags.KickMembers
      },
      run: /* @__PURE__ */ __name(async (client2, interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        const user = interaction.options.getUser("user");
        if (!user) return interaction.reply({ content: "Utilisateur non trouv\xE9", ephemeral: true });
        const member = interaction.guild?.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: "Utilisateur non trouv\xE9", ephemeral: true });
        if (!await canAction(
          interaction.member,
          member,
          new import_discord19.PermissionsBitField(import_discord19.PermissionsBitField.Flags.KickMembers)
        )) {
          return interaction.reply({ content: "Vous ne pouvez pas faire cette action", ephemeral: true });
        }
        const reason = interaction.options.getString("reason") || "Aucune raison sp\xE9cifi\xE9e";
        try {
          await member.kick(reason);
          await LogsService.createLog(
            client2,
            interaction.guild,
            interaction.member,
            member,
            "kick" /* KICK */,
            `${interaction.member.user.username} a expuls\xE9 ${member.user.username} pour ${reason}`
          );
          return interaction.reply({ content: `Utilisateur expuls\xE9 avec succ\xE8s`, ephemeral: true });
        } catch (error2) {
          console.error(error2);
          return interaction.reply({ content: `Une erreur est survenue lors de l'expulsion de l'utilisateur`, ephemeral: true });
        }
      }, "run")
    }).toJSON();
  }
});

// src/commands/Admin/sc-mute.ts
var require_sc_mute = __commonJS({
  "src/commands/Admin/sc-mute.ts"(exports2, module2) {
    "use strict";
    var import_discord19 = require("discord.js");
    init_ApplicationCommand();
    init_userAction();
    init_Logs();
    init_LogsService();
    module2.exports = new ApplicationCommand_default({
      command: {
        name: "mute",
        description: "Mettre en sourdine un utilisateur",
        options: [
          {
            type: import_discord19.ApplicationCommandOptionType.User,
            name: "user",
            description: "Utilisateur \xE0 mettre en sourdine",
            required: true
          },
          {
            type: import_discord19.ApplicationCommandOptionType.String,
            name: "duration",
            description: "Dur\xE9e de la sourdine (en minutes) default: 10",
            required: false
          },
          {
            type: import_discord19.ApplicationCommandOptionType.String,
            name: "reason",
            description: "Raison de la sourdine",
            required: false
          }
        ]
      },
      options: {
        default_member_permissions: import_discord19.PermissionsBitField.Flags.MuteMembers
      },
      run: /* @__PURE__ */ __name(async (client2, interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        const user = interaction.options.getUser("user");
        if (!user) return interaction.reply({ content: "Utilisateur non trouv\xE9", ephemeral: true });
        const member = interaction.guild?.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: "Utilisateur non trouv\xE9", ephemeral: true });
        if (member?.isCommunicationDisabled()) {
          await member.timeout(null);
          await LogsService.createLog(
            client2,
            interaction.guild,
            interaction.member,
            member,
            "unmute" /* UNMUTE */,
            `${interaction.member.user.username} a d\xE9mut\xE9 ${member.user.username}`
          );
          return interaction.reply({ content: "Utilisateur d\xE9mut\xE9 avec succ\xE8s", ephemeral: true });
        }
        const duration = interaction.options.getString("duration");
        const reason = interaction.options.getString("reason");
        if (!await canAction(interaction.member, member, new import_discord19.PermissionsBitField(import_discord19.PermissionsBitField.Flags.MuteMembers))) {
          return interaction.reply({ content: "Vous ne pouvez pas faire cette action", ephemeral: true });
        }
        try {
          await member.timeout(1e3 * 60 * (duration ? parseInt(duration) : 10));
          await LogsService.createLog(
            client2,
            interaction.guild,
            interaction.member,
            member,
            "mute" /* MUTE */,
            `${interaction.member.user.username} a mis ${member.user.username} en sourdine pour ${duration ? duration + " minutes" : "10 minutes"} ${reason ? `(${reason})` : "sans raison pr\xE9cise"}`
          );
          return interaction.reply({ content: `Utilisateur mis en sourdine avec succ\xE8s`, ephemeral: true });
        } catch (error2) {
          console.error(error2);
          interaction.reply({ content: `Une erreur est survenue lors de la mise en sourdine de l'utilisateur`, ephemeral: true });
        }
      }, "run")
    }).toJSON();
  }
});

// src/entity/Guilds.ts
var import_typeorm2, Guilds;
var init_Guilds = __esm({
  "src/entity/Guilds.ts"() {
    "use strict";
    import_typeorm2 = require("typeorm");
    Guilds = class {
    };
    __name(Guilds, "Guilds");
    __decorateClass([
      (0, import_typeorm2.PrimaryGeneratedColumn)()
    ], Guilds.prototype, "id", 2);
    __decorateClass([
      (0, import_typeorm2.Column)({ type: "bigint" })
    ], Guilds.prototype, "guildId", 2);
    __decorateClass([
      (0, import_typeorm2.Column)({ type: "varchar" })
    ], Guilds.prototype, "name", 2);
    __decorateClass([
      (0, import_typeorm2.Column)({ type: "bigint", nullable: true })
    ], Guilds.prototype, "channelWelcome", 2);
    __decorateClass([
      (0, import_typeorm2.Column)({ type: "bigint", nullable: true })
    ], Guilds.prototype, "categoryChannelGenerator", 2);
    __decorateClass([
      (0, import_typeorm2.Column)({ type: "bigint", nullable: true })
    ], Guilds.prototype, "channelGenerator", 2);
    Guilds = __decorateClass([
      (0, import_typeorm2.Entity)()
    ], Guilds);
  }
});

// src/services/GuildService.ts
var _GuildService, GuildService;
var init_GuildService = __esm({
  "src/services/GuildService.ts"() {
    "use strict";
    init_Guilds();
    _GuildService = class _GuildService {
      static async createGuildIfNotExist(client2, guild) {
        const guildRepository = client2.database.getClient().getRepository(Guilds);
        let guildData = await guildRepository.findOne({ where: { guildId: guild.id } });
        if (!guildData) {
          guildData = guildRepository.create({ guildId: guild.id, name: guild.name });
          await guildRepository.save(guildData);
        }
        return guildData;
      }
      static async getGuildById(client2, guildId) {
        const guildRepository = client2.database.getClient().getRepository(Guilds);
        return await guildRepository.findOne({ where: { guildId } });
      }
      static async updateGuild(client2, guildId, data) {
        const guildRepository = client2.database.getClient().getRepository(Guilds);
        const guild = await guildRepository.findOne({ where: { guildId } });
        if (guild) {
          Object.assign(guild, data);
          await guildRepository.save(guild);
        }
      }
    };
    __name(_GuildService, "GuildService");
    GuildService = _GuildService;
  }
});

// src/commands/Channel/sc-setup-channel-generator.ts
var require_sc_setup_channel_generator = __commonJS({
  "src/commands/Channel/sc-setup-channel-generator.ts"(exports2, module2) {
    "use strict";
    init_ApplicationCommand();
    var import_discord19 = require("discord.js");
    init_GuildService();
    module2.exports = new ApplicationCommand_default({
      command: {
        name: "setup-channel-generator",
        description: "Setup the channel generator"
      },
      options: {
        default_member_permissions: import_discord19.PermissionsBitField.Flags.ManageChannels
      },
      run: /* @__PURE__ */ __name(async (client2, interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        if (!interaction.guild) return;
        const guildData = await GuildService.getGuildById(client2, interaction.guild.id);
        if (!guildData) return interaction.reply({ content: "Erreur lors de la r\xE9cup\xE9ration des donn\xE9es du serveur", ephemeral: true });
        if (guildData.categoryChannelGenerator && guildData.channelGenerator) {
          try {
            await interaction.guild?.channels.cache.get(guildData.categoryChannelGenerator)?.delete();
            await interaction.guild?.channels.cache.get(guildData.channelGenerator)?.delete();
          } catch (error2) {
            console.error(error2);
          }
        }
        const category = await interaction.guild?.channels.create({
          name: "G\xE9n\xE9rateur de salons",
          type: import_discord19.ChannelType.GuildCategory
        });
        if (!category) return interaction.reply({ content: "Erreur lors de la cr\xE9ation de la cat\xE9gorie", ephemeral: true });
        const channel = await interaction.guild?.channels.create({
          name: "\u{1F50A} \u2506 Cr\xE9er un salon vocal",
          type: import_discord19.ChannelType.GuildVoice,
          parent: category,
          permissionOverwrites: [
            {
              id: interaction.guild?.id,
              allow: [import_discord19.PermissionFlagsBits.ViewChannel, import_discord19.PermissionFlagsBits.Connect]
            }
          ]
        });
        if (!channel) return interaction.reply({ content: "Erreur lors de la cr\xE9ation du salon", ephemeral: true });
        await GuildService.updateGuild(client2, interaction.guild?.id, {
          categoryChannelGenerator: category.id,
          channelGenerator: channel.id
        });
        return interaction.reply({ content: "Salon g\xE9n\xE9rateur configur\xE9 avec succ\xE8s", ephemeral: true });
      }, "run")
    }).toJSON();
  }
});

// src/entity/User.ts
var import_typeorm3, User;
var init_User = __esm({
  "src/entity/User.ts"() {
    "use strict";
    import_typeorm3 = require("typeorm");
    User = class {
    };
    __name(User, "User");
    __decorateClass([
      (0, import_typeorm3.PrimaryGeneratedColumn)()
    ], User.prototype, "id", 2);
    __decorateClass([
      (0, import_typeorm3.Column)({ unique: true, type: "bigint" })
    ], User.prototype, "discordId", 2);
    __decorateClass([
      (0, import_typeorm3.Column)({ type: "bigint" })
    ], User.prototype, "guildId", 2);
    __decorateClass([
      (0, import_typeorm3.Column)({ type: "varchar" })
    ], User.prototype, "username", 2);
    __decorateClass([
      (0, import_typeorm3.Column)({ type: "varchar" })
    ], User.prototype, "nickname", 2);
    __decorateClass([
      (0, import_typeorm3.Column)({ default: 0, type: "bigint" })
    ], User.prototype, "xp", 2);
    __decorateClass([
      (0, import_typeorm3.Column)({ default: 0, type: "bigint" })
    ], User.prototype, "level", 2);
    User = __decorateClass([
      (0, import_typeorm3.Entity)()
    ], User);
  }
});

// src/commands/Developper/sc-getclient.ts
var require_sc_getclient = __commonJS({
  "src/commands/Developper/sc-getclient.ts"(exports2, module2) {
    "use strict";
    init_ApplicationCommand();
    init_User();
    module2.exports = new ApplicationCommand_default({
      command: {
        name: "getclient",
        description: "Message d'annonce",
        options: []
      },
      options: {
        botDevelopers: true
      },
      run: /* @__PURE__ */ __name(async (client2, interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        const test = await client2.database.getClient().getRepository(User).find();
        console.log(test);
      }, "run")
    }).toJSON();
  }
});

// src/commands/Developper/sc-reload.ts
var require_sc_reload = __commonJS({
  "src/commands/Developper/sc-reload.ts"(exports2, module2) {
    "use strict";
    var import_discord19 = require("discord.js");
    init_ApplicationCommand();
    init_config();
    module2.exports = new ApplicationCommand_default({
      command: {
        name: "reload",
        description: "Reload every command.",
        options: []
      },
      options: {
        botDevelopers: true
      },
      run: /* @__PURE__ */ __name(async (client2, interaction) => {
        if (!interaction.isChatInputCommand()) return;
        await interaction.deferReply();
        try {
          client2.commands_handler.reload();
          await client2.commands_handler.registerApplicationCommands(config_default.development);
          await interaction.editReply({
            content: "Successfully reloaded application commands and message commands."
          });
        } catch (err) {
          console.error(err);
          await interaction.editReply({
            content: `Something went wrong: ${err.message || err}`,
            files: [
              new import_discord19.AttachmentBuilder(Buffer.from(`${err}`, "utf-8"), { name: "output.ts" })
            ]
          });
        }
      }, "run")
    }).toJSON();
  }
});

// src/utils/console.ts
var import_colors, fs, info, success, error, warn;
var init_console = __esm({
  "src/utils/console.ts"() {
    "use strict";
    import_colors = require("colors");
    fs = __toESM(require("fs"));
    info = /* @__PURE__ */ __name((...message) => {
      const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      let fileContent = fs.readFileSync("./terminal.log", "utf-8");
      console.info(`[${time}]`.gray, "[Info]".blue, message.join(" "));
      fileContent += [`[${time}]`.gray, "[Info]".blue, message.join(" ")].join(" ") + "\n";
      fs.writeFileSync("./terminal.log", fileContent, "utf-8");
    }, "info");
    success = /* @__PURE__ */ __name((...message) => {
      const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      let fileContent = fs.readFileSync("./terminal.log", "utf-8");
      console.info(`[${time}]`.gray, "[OK]".green, message.join(" "));
      fileContent += [`[${time}]`.gray, "[OK]".green, message.join(" ")].join(" ") + "\n";
      fs.writeFileSync("./terminal.log", fileContent, "utf-8");
    }, "success");
    error = /* @__PURE__ */ __name((...message) => {
      const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      let fileContent = fs.readFileSync("./terminal.log", "utf-8");
      console.error(`[${time}]`.gray, "[Error]".red, message.join(" "));
      fileContent += [`[${time}]`.gray, "[Error]".red, message.join(" ")].join(" ") + "\n";
      fs.writeFileSync("./terminal.log", fileContent, "utf-8");
    }, "error");
    warn = /* @__PURE__ */ __name((...message) => {
      const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      let fileContent = fs.readFileSync("./terminal.log", "utf-8");
      console.warn(`[${time}]`.gray, "[Warning]".yellow, message.join(" "));
      fileContent += [`[${time}]`.gray, "[Warning]".yellow, message.join(" ")].join(" ") + "\n";
      fs.writeFileSync("./terminal.log", fileContent, "utf-8");
    }, "warn");
  }
});

// src/services/UserService.ts
var _UserService, UserService;
var init_UserService = __esm({
  "src/services/UserService.ts"() {
    "use strict";
    init_User();
    _UserService = class _UserService {
      static async createUserIfNotExists(client2, member) {
        const userRepository = client2.database.getClient().getRepository(User);
        let user = await userRepository.findOne({
          where: {
            discordId: member.id,
            guildId: member.guild.id
          }
        });
        if (!user) {
          user = userRepository.create({
            discordId: member.id,
            username: member.user.username,
            nickname: member.nickname || member.user.username,
            guildId: member.guild.id
          });
          await userRepository.save(user);
        }
        return user;
      }
      static async getUserById(client2, userId, guildId) {
        const userRepository = client2.database.getClient().getRepository(User);
        return await userRepository.findOne({
          where: {
            discordId: userId,
            guildId
          },
          select: ["id", "discordId", "username", "nickname", "xp", "level"]
        });
      }
      static async updateUser(client2, userId, guildId, data) {
        const userRepository = client2.database.getClient().getRepository(User);
        const user = await userRepository.findOne({
          where: {
            discordId: userId,
            guildId
          }
        });
        if (user) {
          Object.assign(user, data);
          await userRepository.save(user);
        }
        return user;
      }
      static async deleteUserByGuildId(client2, guildId, clientId) {
        const userRepository = client2.database.getClient().getRepository(User);
        await userRepository.delete({
          guildId,
          discordId: clientId
        });
        return true;
      }
    };
    __name(_UserService, "UserService");
    UserService = _UserService;
  }
});

// src/structure/Event.ts
var _Event, Event, Event_default;
var init_Event = __esm({
  "src/structure/Event.ts"() {
    "use strict";
    _Event = class _Event {
      constructor(structure) {
        this.toJSON = /* @__PURE__ */ __name(() => {
          return {
            __type__: this.__type__,
            event: this.event,
            once: this.once,
            run: this.run
          };
        }, "toJSON");
        this.__type__ = 5;
        this.event = structure.event;
        this.once = structure.once;
        this.run = structure.run;
      }
    };
    __name(_Event, "Event");
    Event = _Event;
    Event_default = Event;
  }
});

// src/events/Client/ready.ts
var ready_exports = {};
__export(ready_exports, {
  default: () => ready_default
});
var import_discord11, ready_default;
var init_ready = __esm({
  "src/events/Client/ready.ts"() {
    "use strict";
    init_GuildService();
    init_UserService();
    init_Event();
    init_console();
    import_discord11 = require("discord.js");
    ready_default = new Event_default({
      event: import_discord11.Events.ClientReady,
      once: true,
      run: /* @__PURE__ */ __name(async (client2) => {
        if (!client2.database.getClient().isInitialized) {
          await new Promise((resolve) => setTimeout(resolve, 1e3));
        }
        client2.guilds.cache.forEach(async (guild) => {
          await GuildService.createGuildIfNotExist(client2, guild);
          guild.members.cache.forEach(async (member) => {
            try {
              await UserService.createUserIfNotExists(client2, member);
            } catch (error2) {
              error(`Erreur lors de la cr\xE9ation/r\xE9cup\xE9ration de l'utilisateur ${member.user.username}:`, error2);
            }
          });
        });
      }, "run")
    }).toJSON();
  }
});

// src/events/GuildMember/guildMemberAdd.ts
var guildMemberAdd_exports = {};
__export(guildMemberAdd_exports, {
  default: () => guildMemberAdd_default
});
var import_discord12, guildMemberAdd_default;
var init_guildMemberAdd = __esm({
  "src/events/GuildMember/guildMemberAdd.ts"() {
    "use strict";
    init_UserService();
    init_Event();
    import_discord12 = require("discord.js");
    guildMemberAdd_default = new Event_default({
      event: import_discord12.Events.GuildMemberAdd,
      run: /* @__PURE__ */ __name(async (client2, member) => {
        await UserService.createUserIfNotExists(client2, member);
      }, "run")
    }).toJSON();
  }
});

// src/events/GuildMember/guildMemberRemove.ts
var guildMemberRemove_exports = {};
__export(guildMemberRemove_exports, {
  default: () => guildMemberRemove_default
});
var import_discord13, guildMemberRemove_default;
var init_guildMemberRemove = __esm({
  "src/events/GuildMember/guildMemberRemove.ts"() {
    "use strict";
    init_UserService();
    init_Event();
    import_discord13 = require("discord.js");
    guildMemberRemove_default = new Event_default({
      event: import_discord13.Events.GuildMemberRemove,
      run: /* @__PURE__ */ __name(async (client2, member) => {
        await UserService.deleteUserByGuildId(client2, member.guild.id, member.id);
      }, "run")
    }).toJSON();
  }
});

// src/events/GuildMember/guildMemberUpdate.ts
var guildMemberUpdate_exports = {};
__export(guildMemberUpdate_exports, {
  default: () => guildMemberUpdate_default
});
var import_discord14, guildMemberUpdate_default;
var init_guildMemberUpdate = __esm({
  "src/events/GuildMember/guildMemberUpdate.ts"() {
    "use strict";
    init_UserService();
    init_Event();
    import_discord14 = require("discord.js");
    guildMemberUpdate_default = new Event_default({
      event: import_discord14.Events.GuildMemberUpdate,
      run: /* @__PURE__ */ __name(async (client2, oldMember, newMember) => {
        if (oldMember.nickname !== newMember.nickname) {
          await UserService.updateUser(client2, newMember.id, newMember.guild.id, {
            nickname: newMember.nickname || newMember.user.username
          });
        }
      }, "run")
    }).toJSON();
  }
});

// src/events/Voice/VoiceStateUpdate.ts
var VoiceStateUpdate_exports = {};
__export(VoiceStateUpdate_exports, {
  default: () => VoiceStateUpdate_default
});
var import_discord15, VoiceStateUpdate_default;
var init_VoiceStateUpdate = __esm({
  "src/events/Voice/VoiceStateUpdate.ts"() {
    "use strict";
    init_GuildService();
    init_Event();
    import_discord15 = require("discord.js");
    VoiceStateUpdate_default = new Event_default({
      event: import_discord15.Events.VoiceStateUpdate,
      run: /* @__PURE__ */ __name(async (client2, oldState, newState) => {
        const guild = newState.guild;
        const member = newState.member;
        const guildData = await GuildService.getGuildById(client2, guild.id);
        if (!guildData) return;
        const channelGenerator = guildData.channelGenerator;
        if (!channelGenerator) return;
        if (newState.channelId === channelGenerator && oldState.channelId !== channelGenerator) {
          let name = `Channel de ${member.user.username}`;
          const channel = await guild.channels.create({
            name,
            type: import_discord15.ChannelType.GuildVoice,
            parent: guildData.categoryChannelGenerator,
            permissionOverwrites: [
              {
                id: member.id,
                allow: [import_discord15.PermissionsBitField.Flags.ViewChannel, import_discord15.PermissionsBitField.Flags.Connect, import_discord15.PermissionsBitField.Flags.Speak, import_discord15.PermissionsBitField.Flags.KickMembers, import_discord15.PermissionsBitField.Flags.ManageChannels]
              },
              {
                id: guild.roles.everyone.id,
                allow: [import_discord15.PermissionsBitField.Flags.ViewChannel, import_discord15.PermissionsBitField.Flags.Connect, import_discord15.PermissionsBitField.Flags.Speak]
              }
            ]
          }).then((channel2) => {
            member.voice.setChannel(channel2);
          });
        }
        if (oldState.channel && oldState.channel.members.size === 0 && oldState.channelId !== channelGenerator) {
          oldState.channel.delete();
        }
        if (oldState.channel && oldState.channelId !== channelGenerator) {
          if (oldState.channel.members.size === 0) {
            if (oldState.channel.parentId === newState.channel?.parentId) {
              await oldState.channel.delete();
            }
          }
        }
      }, "run")
    }).toJSON();
  }
});

// require("../../commands/**/*/**/*") in src/client/handler/CommandsHandler.ts
var globRequire_commands = __glob({
  "../../commands/Admin/sc-ban.ts": () => require_sc_ban(),
  "../../commands/Admin/sc-kick.ts": () => require_sc_kick(),
  "../../commands/Admin/sc-mute.ts": () => require_sc_mute(),
  "../../commands/Channel/sc-setup-channel-generator.ts": () => require_sc_setup_channel_generator(),
  "../../commands/Developper/sc-getclient.ts": () => require_sc_getclient(),
  "../../commands/Developper/sc-reload.ts": () => require_sc_reload()
});

// src/client/handler/CommandsHandler.ts
var import_discord5 = require("discord.js");
var import_fs = require("fs");
init_console();
var _CommandsHandler = class _CommandsHandler {
  constructor(client2) {
    this.load = /* @__PURE__ */ __name(() => {
      for (const directory of (0, import_fs.readdirSync)("./src/commands/")) {
        for (const file of (0, import_fs.readdirSync)(`./src/commands/${directory}`).filter((f) => f.endsWith(".ts"))) {
          try {
            const module2 = globRequire_commands(`../../commands/${directory}/${file}`);
            if (!module2) continue;
            if (module2.__type__ === 2) {
              if (!module2.command || !module2.run) {
                error(`Unable to load the message command ${file}`);
                continue;
              }
              this.client.collection.message_commands.set(module2.command.name, module2);
              if ("aliases" in module2.command && Array.isArray(module2.command.aliases)) {
                module2.command.aliases.forEach((alias) => {
                  this.client.collection.message_commands_aliases.set(alias, module2.command.name);
                });
              }
              info(`Loaded new message command: ${file}`);
            } else if (module2.__type__ === 1) {
              if (!module2.command || !module2.run) {
                error(`Unable to load the application command ${file}`);
                continue;
              }
              this.client.collection.application_commands.set(module2.command.name, module2);
              this.client.rest_application_commands_array.push(module2.command);
              info(`Loaded new application command: ${file}`);
            } else {
              error(`Invalid command type ${module2.__type__} from command file ${file}`);
            }
          } catch {
            error(`Unable to load a command from the path: src/commands/${directory}/${file}`);
          }
        }
      }
      success(`Successfully loaded ${this.client.collection.application_commands.size} application commands and ${this.client.collection.message_commands.size} message commands.`);
    }, "load");
    this.reload = /* @__PURE__ */ __name(() => {
      this.client.collection.message_commands.clear();
      this.client.collection.message_commands_aliases.clear();
      this.client.collection.application_commands.clear();
      this.client.rest_application_commands_array = [];
      this.load();
    }, "reload");
    this.registerApplicationCommands = /* @__PURE__ */ __name(async (development, restOptions = null) => {
      if (!this.client.token) {
        throw new Error("Bot token is not set");
      }
      const rest = new import_discord5.REST(restOptions || { version: "10" }).setToken(this.client.token);
      if (!this.client.user) {
        throw new Error("Client user is not initialized");
      }
      if (development.enabled) {
        await rest.put(
          import_discord5.Routes.applicationGuildCommands(this.client.user.id, development.guildId),
          { body: this.client.rest_application_commands_array }
        );
      } else {
        await rest.put(
          import_discord5.Routes.applicationCommands(this.client.user.id),
          { body: this.client.rest_application_commands_array }
        );
      }
    }, "registerApplicationCommands");
    this.client = client2;
  }
};
__name(_CommandsHandler, "CommandsHandler");
var CommandsHandler = _CommandsHandler;
var CommandsHandler_default = CommandsHandler;

// src/client/handler/CommandOptions.ts
var import_discord6 = require("discord.js");
init_config();
var application_commands_cooldown = /* @__PURE__ */ new Map();
var message_commands_cooldown = /* @__PURE__ */ new Map();
var handleApplicationCommandOptions = /* @__PURE__ */ __name(async (interaction, options, command) => {
  if (!interaction.isCommand()) return false;
  if (options.botOwner) {
    if (interaction.user.id !== config_default.users.ownerId) {
      await interaction.reply({
        content: config_default.messages.NOT_BOT_OWNER,
        ephemeral: true
      });
      return false;
    }
  }
  if (options.default_member_permissions) {
    if (interaction.memberPermissions && !interaction.memberPermissions.has(options.default_member_permissions)) {
      await interaction.reply({
        content: config_default.messages.MISSING_PERMISSIONS,
        ephemeral: true
      });
      return false;
    }
  }
  if (options.botDevelopers) {
    if (config_default.users?.developers?.length > 0 && !config_default.users?.developers?.includes(interaction.user.id)) {
      await interaction.reply({
        content: config_default.messages.NOT_BOT_DEVELOPER,
        ephemeral: true
      });
      return false;
    }
  }
  if (options.guildOwner) {
    if (interaction.guild && interaction.user.id !== interaction.guild.ownerId) {
      await interaction.reply({
        content: config_default.messages.NOT_GUILD_OWNER,
        ephemeral: true
      });
      return false;
    }
  }
  if (options.cooldown) {
    const cooldownFunction = /* @__PURE__ */ __name(() => {
      let data = application_commands_cooldown.get(interaction.user.id) || [];
      data.push(interaction.commandName);
      application_commands_cooldown.set(interaction.user.id, data);
      setTimeout(() => {
        let data2 = application_commands_cooldown.get(interaction.user.id) || [];
        data2 = data2.filter((v) => v !== interaction.commandName);
        if (data2.length <= 0) {
          application_commands_cooldown.delete(interaction.user.id);
        } else {
          application_commands_cooldown.set(interaction.user.id, data2);
        }
      }, options.cooldown);
    }, "cooldownFunction");
    if (application_commands_cooldown.has(interaction.user.id)) {
      let data = application_commands_cooldown.get(interaction.user.id) || [];
      if (data.some((cmd) => cmd === interaction.commandName)) {
        await interaction.reply({
          content: config_default.messages.GUILD_COOLDOWN.replace(/%cooldown%/g, (options.cooldown / 1e3).toString()),
          ephemeral: true
        });
        return false;
      } else {
        cooldownFunction();
      }
    } else {
      application_commands_cooldown.set(interaction.user.id, [interaction.commandName]);
      cooldownFunction();
    }
  }
  return true;
}, "handleApplicationCommandOptions");
var handleMessageCommandOptions = /* @__PURE__ */ __name(async (message, options, command) => {
  if (options.botOwner) {
    if (message.author.id !== config_default.users.ownerId) {
      await message.reply({
        content: config_default.messages.NOT_BOT_OWNER
      });
      return false;
    }
  }
  if (options.botDevelopers) {
    if (config_default.users?.developers?.length > 0 && !config_default.users?.developers?.includes(message.author.id)) {
      await message.reply({
        content: config_default.messages.NOT_BOT_DEVELOPER
      });
      return false;
    }
  }
  if (options.guildOwner) {
    if (message.guild && message.author.id !== message.guild.ownerId) {
      await message.reply({
        content: config_default.messages.NOT_GUILD_OWNER
      });
      return false;
    }
  }
  if (options.nsfw) {
    if (!(message.channel instanceof import_discord6.TextChannel) || !message.channel.nsfw) {
      await message.reply({
        content: config_default.messages.CHANNEL_NOT_NSFW
      });
      return false;
    }
  }
  if (options.cooldown) {
    const cooldownFunction = /* @__PURE__ */ __name(() => {
      let data = message_commands_cooldown.get(message.author.id) || [];
      data.push(command.name);
      message_commands_cooldown.set(message.author.id, data);
      setTimeout(() => {
        let data2 = message_commands_cooldown.get(message.author.id) || [];
        data2 = data2.filter((cmd) => cmd !== command.name);
        if (data2.length <= 0) {
          message_commands_cooldown.delete(message.author.id);
        } else {
          message_commands_cooldown.set(message.author.id, data2);
        }
      }, options.cooldown);
    }, "cooldownFunction");
    if (message_commands_cooldown.has(message.author.id)) {
      let data = message_commands_cooldown.get(message.author.id) || [];
      if (data.some((v) => v === command.name)) {
        await message.reply({
          content: config_default.messages.GUILD_COOLDOWN.replace(/%cooldown%/g, (options.cooldown / 1e3).toString())
        });
        return false;
      } else {
        cooldownFunction();
      }
    } else {
      message_commands_cooldown.set(message.author.id, [command.name]);
      cooldownFunction();
    }
  }
  return true;
}, "handleMessageCommandOptions");

// src/client/handler/CommandsListener.ts
var import_discord7 = require("discord.js");
init_config();
init_console();
var _CommandsListener = class _CommandsListener {
  constructor(client2) {
    client2.on(import_discord7.Events.MessageCreate, async (message) => {
      if (message.author.bot || message.channel.type === import_discord7.ChannelType.DM) return;
      if (!message.guild) return;
      if (!config_default.commands.message_commands) return;
      let prefix = config_default.commands.prefix;
      if (!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/\s+/g);
      const commandInput = args.shift()?.toLowerCase();
      if (!commandInput || !commandInput.length) return;
      const command = client2.collection.message_commands.get(commandInput) || client2.collection.message_commands.get(
        client2.collection.message_commands_aliases.get(commandInput) || ""
      );
      if (!command) return;
      try {
        if (command.options) {
          const commandContinue = await handleMessageCommandOptions(
            message,
            command.options,
            command.command
          );
          if (!commandContinue) return;
        }
        if (command.command?.permissions && message.member && !message.member.permissions.has(
          import_discord7.PermissionsBitField.resolve(command.command.permissions)
        )) {
          await message.reply({
            content: config_default.messages.MISSING_PERMISSIONS
          });
          return;
        }
        command.run(client2, message, args);
      } catch (err) {
        error(err instanceof Error ? err.message : String(err));
      }
    });
    client2.on(import_discord7.Events.InteractionCreate, async (interaction) => {
      if (!interaction.isCommand()) return;
      if (!config_default.commands.application_commands.chat_input && interaction.isChatInputCommand())
        return;
      if (!config_default.commands.application_commands.user_context && interaction.isUserContextMenuCommand())
        return;
      if (!config_default.commands.application_commands.message_context && interaction.isMessageContextMenuCommand())
        return;
      const command = client2.collection.application_commands.get(
        interaction.commandName
      );
      if (!command) return;
      try {
        if (command.options) {
          const commandContinue = await handleApplicationCommandOptions(
            interaction,
            command.options,
            command.command
          );
          if (!commandContinue) return;
        }
        command.run(client2, interaction);
      } catch (err) {
        error(err instanceof Error ? err.message : String(err));
      }
    });
  }
};
__name(_CommandsListener, "CommandsListener");
var CommandsListener = _CommandsListener;
var CommandsListener_default = CommandsListener;

// src/client/handler/ComponentsHandler.ts
init_console();
var import_fs2 = require("fs");
var _ComponentsHandler = class _ComponentsHandler {
  constructor(client2) {
    this.load = /* @__PURE__ */ __name(() => {
      for (const directory of (0, import_fs2.readdirSync)("./src/components/")) {
        for (const file of (0, import_fs2.readdirSync)(`./src/components/${directory}`).filter((f) => f.endsWith(".ts"))) {
          try {
            const module2 = require(`@components/${directory}/${file}`).default;
            if (directory === "reactions") continue;
            if (!module2) continue;
            if (module2.__type__ === 3) {
              const component = module2;
              if (!component.customId || !component.type || !component.run) {
                error("Unable to load the button/select/modal component " + file);
                continue;
              }
              switch (component.type) {
                case "modal":
                  if (Array.isArray(component.customId)) {
                    component.customId.forEach((id) => {
                      this.client.collection.components.modals.set(id, component);
                    });
                  } else {
                    this.client.collection.components.modals.set(component.customId, component);
                  }
                  break;
                case "select":
                  if (Array.isArray(component.customId)) {
                    component.customId.forEach((id) => {
                      this.client.collection.components.selects.set(id, component);
                    });
                  } else {
                    this.client.collection.components.selects.set(component.customId, component);
                  }
                  break;
                case "button":
                  if (Array.isArray(component.customId)) {
                    component.customId.forEach((id) => {
                      this.client.collection.components.buttons.set(id, component);
                    });
                  } else {
                    this.client.collection.components.buttons.set(component.customId, component);
                  }
                  break;
                default:
                  error("Invalid component type (not: button, select, or modal): " + file);
                  continue;
              }
              info(`Loaded new component (type: ${component.type}) : ` + file);
            } else if (module2.__type__ === 4) {
              const autocompleteComponent = module2;
              if (!autocompleteComponent.commandName || !autocompleteComponent.run) {
                error("Unable to load the autocomplete component " + file);
                continue;
              }
              this.client.collection.components.autocomplete.set(autocompleteComponent.commandName, autocompleteComponent);
              info(`Loaded new component (type: autocomplete) : ` + file);
            } else {
              error("Invalid component type " + module2.__type__ + " from component file " + file);
            }
          } catch (err) {
            error(`Unable to load a component from the path: src/component/${directory}/${file}`);
          }
        }
      }
      const componentsCollection = this.client.collection.components;
      success(`Successfully loaded ${componentsCollection.autocomplete.size + componentsCollection.buttons.size + componentsCollection.selects.size + componentsCollection.modals.size} components.`);
    }, "load");
    this.reload = /* @__PURE__ */ __name(() => {
      this.client.collection.components.autocomplete.clear();
      this.client.collection.components.buttons.clear();
      this.client.collection.components.modals.clear();
      this.client.collection.components.selects.clear();
      this.load();
    }, "reload");
    this.client = client2;
  }
};
__name(_ComponentsHandler, "ComponentsHandler");
var ComponentsHandler = _ComponentsHandler;
var ComponentsHandler_default = ComponentsHandler;

// src/client/handler/ComponentsListener.ts
var import_discord8 = require("discord.js");
init_config();
init_console();
var _ComponentsListener = class _ComponentsListener {
  /**
   *
   * @param client - Instance de DiscordBot
   */
  constructor(client2) {
    client2.on(import_discord8.Events.InteractionCreate, async (interaction) => {
      const checkUserPermissions = /* @__PURE__ */ __name(async (component) => {
        if ("message" in interaction && component.options?.public === false && interaction.user.id !== interaction.user?.id) {
          await interaction.reply({
            content: config_default.messages.COMPONENT_NOT_PUBLIC,
            ephemeral: true
          });
          return false;
        }
        return true;
      }, "checkUserPermissions");
      try {
        if (interaction.isButton()) {
          let component = client2.collection.components.buttons.get(
            interaction.customId
          );
          if (!component) {
            component = Array.from(
              client2.collection.components.buttons.values()
            ).find(
              (comp) => comp.customId instanceof RegExp && comp.customId.test(interaction.customId)
            );
          }
          if (!component) return;
          if (!await checkUserPermissions(component)) return;
          try {
            component.run(client2, interaction);
          } catch (err) {
            error(err instanceof Error ? err.message : String(err));
          }
          return;
        }
        if (interaction.isAnySelectMenu()) {
          const component = client2.collection.components.selects.get(
            interaction.customId
          );
          if (!component) return;
          if (!await checkUserPermissions(component)) return;
          try {
            component.run(client2, interaction);
          } catch (err) {
            error(err instanceof Error ? err.message : String(err));
          }
          return;
        }
        if (interaction.isModalSubmit()) {
          const component = client2.collection.components.modals.get(
            interaction.customId
          );
          if (!component) return;
          try {
            component.run(client2, interaction);
          } catch (err) {
            error(err instanceof Error ? err.message : String(err));
          }
          return;
        }
        if (interaction.isAutocomplete()) {
          const component = client2.collection.components.autocomplete.get(
            interaction.commandName
          );
          if (!component) return;
          try {
            component.run(client2, interaction);
          } catch (err) {
            error(err instanceof Error ? err.message : String(err));
          }
          return;
        }
      } catch (err) {
        error(err instanceof Error ? err.message : String(err));
      }
    });
  }
};
__name(_ComponentsListener, "ComponentsListener");
var ComponentsListener = _ComponentsListener;
var ComponentsListener_default = ComponentsListener;

// require("../../events/**/*/**/*") in src/client/handler/EventsHandler.ts
var globRequire_events = __glob({
  "../../events/Client/ready.ts": () => (init_ready(), __toCommonJS(ready_exports)),
  "../../events/GuildMember/guildMemberAdd.ts": () => (init_guildMemberAdd(), __toCommonJS(guildMemberAdd_exports)),
  "../../events/GuildMember/guildMemberRemove.ts": () => (init_guildMemberRemove(), __toCommonJS(guildMemberRemove_exports)),
  "../../events/GuildMember/guildMemberUpdate.ts": () => (init_guildMemberUpdate(), __toCommonJS(guildMemberUpdate_exports)),
  "../../events/Voice/VoiceStateUpdate.ts": () => (init_VoiceStateUpdate(), __toCommonJS(VoiceStateUpdate_exports))
});

// src/client/handler/EventsHandler.ts
init_console();
var import_fs3 = require("fs");
var _EventsHandler = class _EventsHandler {
  constructor(client2) {
    this.load = /* @__PURE__ */ __name(() => {
      let total = 0;
      for (const directory of (0, import_fs3.readdirSync)("./src/events/")) {
        for (const file of (0, import_fs3.readdirSync)(`./src/events/${directory}`).filter((f) => f.endsWith(".ts"))) {
          try {
            const module2 = globRequire_events(`../../events/${directory}/${file}`).default;
            if (!module2) {
              error(`Module not found for ${file}`);
              continue;
            }
            if (module2.__type__ !== 5) {
              error("Invalid event type " + module2.__type__ + " from event file " + file);
              continue;
            }
            if (!module2.event || !module2.run) {
              error("Unable to load the event " + file);
              continue;
            }
            const eventData = module2;
            info(`Registering event: ${file} with event type: ${eventData.event}`);
            if (eventData.once) {
              this.client.once(eventData.event, async (...args) => {
                info(`Executing once event: ${file}`);
                try {
                  await eventData.run(this.client, ...args);
                } catch (err) {
                  error(`Erreur lors de l'ex\xE9cution de l'\xE9v\xE9nement ${file}: ${err}`);
                }
              });
            } else {
              this.client.on(eventData.event, async (...args) => {
                info(`Executing event: ${file}`);
                try {
                  await eventData.run(this.client, ...args);
                } catch (err) {
                  error(`Erreur lors de l'ex\xE9cution de l'\xE9v\xE9nement ${file}: ${err}`);
                }
              });
            }
            info(`Loaded new event: ` + file);
            total++;
          } catch (err) {
            error("Unable to load an event from the path: src/events/" + directory + "/" + file);
            error(err);
          }
        }
      }
      success(`Successfully loaded ${total} events.`);
    }, "load");
    this.client = client2;
  }
};
__name(_EventsHandler, "EventsHandler");
var EventsHandler = _EventsHandler;
var EventsHandler_default = EventsHandler;

// src/client/handler/ReactionsListener.ts
var import_discord17 = require("discord.js");
init_console();
var _ReactionsListener = class _ReactionsListener {
  /**
   *
   * @param client - Instance de DiscordBot
   */
  constructor(client2) {
    client2.on(import_discord17.Events.MessageReactionAdd, async (reaction, user) => {
      if (user.bot) return;
      try {
        const emoji = reaction.emoji.name;
        if (!emoji) return;
        const reactionComponent = client2.collection.reactions.get(emoji);
        if (!reactionComponent) return;
        try {
          await reactionComponent.run(client2, reaction, user);
        } catch (err) {
          error(err instanceof Error ? err.message : String(err));
        }
      } catch (err) {
        error(err instanceof Error ? err.message : String(err));
      }
    });
  }
};
__name(_ReactionsListener, "ReactionsListener");
var ReactionsListener = _ReactionsListener;
var ReactionsListener_default = ReactionsListener;

// src/client/handler/ReactionsHandler.ts
var import_fs4 = require("fs");
init_console();
var _ReactionsHandler = class _ReactionsHandler {
  constructor(client2) {
    this.load = /* @__PURE__ */ __name(() => {
      for (const file of (0, import_fs4.readdirSync)("./src/components/reactions/").filter((f) => f.endsWith(".ts"))) {
        try {
          const module2 = require(`@components/reactions/${file}`).default;
          if (!module2) continue;
          const reaction = module2;
          if (!reaction.emoji || !reaction.run) {
            error("Unable to load the reaction: " + file);
            continue;
          }
          this.client.collection.reactions.set(reaction.emoji, reaction);
          info(`Loaded reaction for emoji: ${reaction.emoji}`);
        } catch (err) {
          error(`Unable to load reaction from path: src/components/reactions/${file}`);
        }
      }
      success(`Successfully loaded ${this.client.collection.reactions.size} reactions.`);
    }, "load");
    this.reload = /* @__PURE__ */ __name(() => {
      this.client.collection.reactions.clear();
      this.load();
    }, "reload");
    this.client = client2;
  }
};
__name(_ReactionsHandler, "ReactionsHandler");
var ReactionsHandler = _ReactionsHandler;
var ReactionsHandler_default = ReactionsHandler;

// src/utils/typeorm.config.ts
var import_typeorm4 = require("typeorm");
var dotenv = __toESM(require("dotenv"));
var import_path = __toESM(require("path"));
var import_pg_connection_string = require("pg-connection-string");
var import_reflect_metadata = require("reflect-metadata");
init_User();
init_Guilds();
init_Logs();
dotenv.config();
var dbConfig;
if (process.env.DATABASE_URL) {
  const parsed = (0, import_pg_connection_string.parse)(process.env.DATABASE_URL);
  dbConfig = {
    type: "postgres",
    host: parsed.host,
    port: parseInt(parsed.port || "5432"),
    username: parsed.user,
    password: parsed.password,
    database: parsed.database
  };
} else {
  dbConfig = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };
}
var typeorm_config_default = new import_typeorm4.DataSource({
  ...dbConfig,
  entities: [User, Guilds, Logs],
  migrations: [import_path.default.join(__dirname, "..", "migrations", "*.{js,ts}")],
  synchronize: false,
  logging: true,
  logger: "advanced-console"
});

// src/client/handler/Database.ts
var import_reflect_metadata2 = require("reflect-metadata");
init_console();
var _Database = class _Database {
  constructor() {
    this.dataSource = typeorm_config_default;
  }
  async connect() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      success("\u{1F5C4}\uFE0F TypeORM connect\xE9 \xE0 PostgreSQL");
    }
  }
  async disconnect() {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      error("\u{1F6D1} TypeORM d\xE9connect\xE9");
    }
  }
  getClient() {
    return this.dataSource;
  }
};
__name(_Database, "Database");
var Database = _Database;

// src/client/DiscordBot.ts
var import_discord18 = require("discord.js");
init_console();
init_config();
var _DiscordBot = class _DiscordBot extends import_discord18.Client {
  constructor() {
    const clientOptions = {
      intents: 3276799,
      partials: [
        import_discord18.Partials.Channel,
        import_discord18.Partials.GuildMember,
        import_discord18.Partials.Message,
        import_discord18.Partials.Reaction,
        import_discord18.Partials.User
      ],
      presence: {
        activities: [
          {
            name: "keep this empty",
            type: import_discord18.ActivityType.Custom,
            state: "Version TS"
          }
        ]
      }
    };
    super(clientOptions);
    this.connect = /* @__PURE__ */ __name(async () => {
      warn(
        `Attempting to connect to the Discord bot... (${this.login_attempts + 1})`
      );
      try {
        this.commands_handler.load();
        this.components_handler.load();
        this.events_handler.load();
        this.reactions_handler.load();
        await this.login(process.env.CLIENT_TOKEN);
        this.login_timestamp = Date.now();
        await this.database.connect();
        this.user?.setPresence({
          activities: [
            {
              name: "Discord Bot",
              type: import_discord18.ActivityType.Playing
            }
          ]
        });
        warn(
          "Attempting to register application commands... (this might take a while!)"
        );
        await this.application?.commands.set([]);
        warn("Toutes les commandes existantes ont \xE9t\xE9 supprim\xE9es globalement.");
        await this.commands_handler.registerApplicationCommands(
          config_default.development
        );
        success(
          "Successfully registered application commands. For specific guild? " + (config_default.development.enabled ? "Yes" : "No")
        );
      } catch (err) {
        error("Failed to connect to the Discord bot, retrying...");
        if (err instanceof Error) {
          error(err.message);
        } else {
          error("An unknown error occurred");
        }
        this.login_attempts++;
        setTimeout(this.connect, 5e3);
      }
    }, "connect");
    this.collection = {
      application_commands: new import_discord18.Collection(),
      message_commands: new import_discord18.Collection(),
      message_commands_aliases: new import_discord18.Collection(),
      components: {
        buttons: new import_discord18.Collection(),
        selects: new import_discord18.Collection(),
        modals: new import_discord18.Collection(),
        autocomplete: new import_discord18.Collection()
      },
      reactions: new import_discord18.Collection()
    };
    this.rest_application_commands_array = [];
    this.login_attempts = 0;
    this.login_timestamp = 0;
    this.statusMessages = [
      { name: "Status 1", type: import_discord18.ActivityType.Custom },
      { name: "Status 2", type: import_discord18.ActivityType.Custom },
      { name: "Status 3", type: import_discord18.ActivityType.Custom }
    ];
    this.commands_handler = new CommandsHandler_default(this);
    this.components_handler = new ComponentsHandler_default(this);
    this.events_handler = new EventsHandler_default(this);
    this.reactions_handler = new ReactionsHandler_default(this);
    this.database = new Database();
    new CommandsListener_default(this);
    new ComponentsListener_default(this);
    new ReactionsListener_default(this);
  }
};
__name(_DiscordBot, "DiscordBot");
var DiscordBot14 = _DiscordBot;
var DiscordBot_default = DiscordBot14;

// src/index.ts
var import_reflect_metadata3 = require("reflect-metadata");
var import_dotenv = __toESM(require("dotenv"));
var import_fs5 = __toESM(require("fs"));
import_dotenv.default.config();
import_fs5.default.writeFileSync("./terminal.log", "[INFO]".blue + " [Bot loaded].\n", "utf-8");
var client = new DiscordBot_default();
client.connect();
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
//# sourceMappingURL=index.js.map