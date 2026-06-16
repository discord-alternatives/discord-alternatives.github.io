export type FilterState = Record<string, string | boolean>;

const ORD_HIGH: Record<string, number> = {
  none: 0,
  low: 0,
  optional: 1,
  partial: 1,
  basic: 1,
  limited: 1,
  medium: 1,
  full: 2,
  advanced: 2,
  high: 2,
  required: 2,
  yes: 2,
  good: 2,
};
const ORD_LOW: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
  unknown: -1,
};
const ORD_KYC: Record<string, number> = {
  required: 0,
  optional: 1,
  none: 2,
  unknown: -1,
};

function ordCheck(
  actual: string,
  want: string,
  ord: Record<string, number>,
): boolean {
  return (ord[actual ?? ""] ?? -1) >= (ord[want] ?? 0);
}

export function scorePlatform(
  platform: any,
  filters: FilterState,
): number | null {
  const f = platform.features;
  let hits = 0;
  let total = 0;

  function check(pass: boolean) {
    total++;
    if (pass) hits++;
  }

  // Privacy
  if (filters["enc"])
    check(ordCheck(f.privacy.encryption, filters["enc"] as string, ORD_HIGH));
  if (filters["harv"])
    check(
      ordCheck(
        f.privacy.data_harvesting_risk,
        filters["harv"] as string,
        ORD_LOW,
      ),
    );
  if (filters["kyc"])
    check(ordCheck(f.privacy.kyc_required, filters["kyc"] as string, ORD_KYC));
  if (filters["nsfw"])
    check(
      ordCheck(f.privacy.nsfw_support, filters["nsfw"] as string, ORD_HIGH),
    );
  if (filters["oss"]) check(platform.open_source === true);
  if (filters["vibecoded"]) check(platform.vibecoded !== true);
  if (filters["sec_hist"])
    check(
      ordCheck(
        f.privacy.security_history,
        filters["sec_hist"] as string,
        ORD_HIGH,
      ),
    );

  // Core chat
  if (filters["chan"])
    check(ordCheck(f.core_chat.channels, filters["chan"] as string, ORD_HIGH));
  if (filters["thr"])
    check(ordCheck(f.core_chat.threads, filters["thr"] as string, ORD_HIGH));
  if (filters["srch"])
    check(ordCheck(f.core_chat.search, filters["srch"] as string, ORD_HIGH));
  if (filters["dm"]) check(f.core_chat.direct_messages === true);
  if (filters["dmg"]) check(f.core_chat.dm_groups === true);
  if (filters["react"]) check(f.core_chat.reactions === true);
  if (filters["edit"]) check(f.core_chat.message_editing === true);
  if (filters["persis_order"])
    check(f.core_chat.persistent_channel_order === true);
  if (filters["pins"])
    check(
      f.core_chat.pinned_posts === true ||
        f.core_chat.pinned_posts === "partial",
    );
  if (filters["ping"]) check(f.core_chat.pings === true);
  if (filters["embed"]) check(f.core_chat.embeds === true);
  if (filters["type_ind"]) check(f.core_chat.typing_indicators === true);
  if (filters["ch_hist"])
    check(
      ordCheck(
        f.core_chat.channel_history,
        filters["ch_hist"] as string,
        ORD_HIGH,
      ),
    );
  if (filters["markdown"])
    check(
      ordCheck(f.core_chat.markdown, filters["markdown"] as string, ORD_HIGH),
    );

  // Voice & media
  if (filters["voice"]) check(f.voice_media.voice_calls === true);
  if (filters["vid"]) check(f.voice_media.video_calls === true);
  if (filters["screen"]) check(f.voice_media.screen_sharing === true);
  if (filters["files"])
    check(
      ordCheck(
        f.voice_media.file_sharing,
        filters["files"] as string,
        ORD_HIGH,
      ),
    );
  if (filters["stage"]) check(f.voice_media.stage === true);
  if (filters["voice_text"]) check(f.voice_media.voice_text_chat === true);
  if (filters["stream"]) check(f.voice_media.streaming === true);
  if (filters["nosuppress"]) check(f.voice_media.noise_suppression === true);
  if (filters["sound"]) check(f.voice_media.soundboard === true);
  if (filters["activ"]) check(f.voice_media.activities_games === true);
  if (filters["ringtone"]) check(f.voice_media.custom_ringtones === true);
  if (filters["hls"]) check(f.voice_media.smart_video_loading_hls === true);

  // Community
  if (filters["bots"])
    check(
      ordCheck(f.community.bots_plugins, filters["bots"] as string, ORD_HIGH),
    );
  if (filters["amod"])
    check(ordCheck(f.community.automod, filters["amod"] as string, ORD_HIGH));
  if (filters["emote"]) check(f.community.custom_emotes === true);
  if (filters["stick"]) check(f.community.custom_stickers === true);
  if (filters["plural"])
    check(
      ordCheck(
        f.community.plural_kit_support,
        filters["plural"] as string,
        ORD_HIGH,
      ),
    );
  if (filters["polls"])
    check(ordCheck(f.community.polls, filters["polls"] as string, ORD_HIGH));
  if (filters["events"])
    check(ordCheck(f.community.events, filters["events"] as string, ORD_HIGH));
  if (filters["collab"])
    check(
      ordCheck(
        f.community.collaboration_tools,
        filters["collab"] as string,
        ORD_HIGH,
      ),
    );
  if (filters["import"])
    check(
      ordCheck(
        f.community.import_from_discord,
        filters["import"] as string,
        ORD_HIGH,
      ),
    );
  if (filters["discord_sync"])
    check(
      ordCheck(
        f.community.discord_bridge_sync,
        filters["discord_sync"] as string,
        ORD_HIGH,
      ),
    );
  if (filters["app_gate"]) check(f.community.application_gate === true);

  // Platform
  if (filters["mob"]) check(f.platform.mobile === true);
  if (filters["desk"]) check(f.platform.desktop === true);
  if (filters["dsk"]) check(f.platform.desktop_app_platform === filters["dsk"]);
  if (filters["web"]) check(f.platform.web === true);
  if (filters["cross_lang"])
    check(
      ordCheck(
        f.platform.cross_language_support,
        filters["cross_lang"] as string,
        ORD_HIGH,
      ),
    );

  // Architecture
  if (filters["sh"])
    check(
      ordCheck(f.architecture.self_hosting, filters["sh"] as string, ORD_HIGH),
    );
  if (filters["fed"])
    check(
      ordCheck(f.architecture.federation, filters["fed"] as string, ORD_HIGH),
    );
  if (filters["disc"])
    check(
      ordCheck(f.architecture.discovery, filters["disc"] as string, ORD_HIGH),
    );

  // Adoption
  if (filters["usr"])
    check(ordCheck(f.adoption.userbase, filters["usr"] as string, ORD_HIGH));
  if (filters["mkt"]) check(f.adoption.market_focus === filters["mkt"]);
  if (filters["perf"])
    check(
      ordCheck(f.adoption.performance, filters["perf"] as string, ORD_HIGH),
    );
  if (filters["consumer"])
    check(f.adoption.consumer_relationship === filters["consumer"]);

  // Safety
  if (filters["safe"])
    check(
      ordCheck(f.safety.safety_concerns, filters["safe"] as string, ORD_LOW),
    );
  if (filters["trans"])
    check(
      ordCheck(f.safety.transparency, filters["trans"] as string, ORD_HIGH),
    );
  if (filters["ai_safety"])
    check(
      ordCheck(f.safety.ai_safety, filters["ai_safety"] as string, ORD_HIGH),
    );

  if (total === 0) return null;
  return Math.round((hits / total) * 100);
}

export function scorePlatformWithRating(
  platform: any,
  filters: FilterState,
): number | null {
  const filterScore = scorePlatform(platform, filters);
  if (filterScore === null) return null;
  const rating = platform.rating === -1 ? 0 : platform.rating;
  return Math.round(filterScore * 0.7 + rating * 0.3);
}

export function scoreColor(sc: number): string {
  if (sc >= 75) return "#5aad5a";
  if (sc >= 50) return "#c4872a";
  return "#c44a4a";
}
