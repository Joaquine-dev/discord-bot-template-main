
export interface GuildInterface {
    id: number;
    guild_id: string | null;
    channel_logs: string | null;
    channel_welcome: string | null;
    channel_stage: string | null;
    channel_bye: string | null;
    created_at: Date;
    updated_at: Date;
}