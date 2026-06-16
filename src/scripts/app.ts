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

const ORD_LOW: Record<string, number> = { high: 0, medium: 1, low: 2 };
const ORD_KYC: Record<string, number> = { required: 0, optional: 1, none: 2 };

function ordCheck(
  actual: string | undefined | null,
  want: string,
  ord: Record<string, number>,
): boolean {
  return (ord[actual ?? ""] ?? -1) >= (ord[want] ?? 0);
}

interface PlatformData {
  name: string;
  rating: number;
  open_source: boolean;
  vibecoded?: boolean;
  notes?: string;
  features: {
    privacy: Record<string, any>;
    core_chat: Record<string, any>;
    voice_media: Record<string, any>;
    community: Record<string, any>;
    platform: Record<string, any>;
    architecture: Record<string, any>;
    adoption: Record<string, any>;
    safety: Record<string, any>;
  };
}

type FilterState = Record<string, string | boolean>;

function scorePlatform(p: PlatformData, filters: FilterState): number | null {
  const f = p.features;
  let hits = 0;
  let total = 0;

  function chk(pass: boolean) {
    total++;
    if (pass) hits++;
  }

  if (filters.enc)
    chk(ordCheck(f.privacy.encryption, filters.enc as string, ORD_HIGH));
  if (filters.harv)
    chk(
      ordCheck(f.privacy.data_harvesting_risk, filters.harv as string, ORD_LOW),
    );
  if (filters.kyc)
    chk(ordCheck(f.privacy.kyc_required, filters.kyc as string, ORD_KYC));
  if (filters.nsfw)
    chk(ordCheck(f.privacy.nsfw_support, filters.nsfw as string, ORD_HIGH));
  if (filters.oss) chk(p.open_source === true);
  if (filters.vibecoded) chk(p.vibecoded !== true);
  if (filters.persis_order) chk(f.core_chat.persistent_channel_order === true);
  if (filters.pins) chk(f.core_chat.pinned_posts === true);
  if (filters.ping) chk(f.core_chat.pings === true);
  if (filters.embed) chk(f.core_chat.embeds === true);
  if (filters.type_ind) chk(f.core_chat.typing_indicators === true);
  if (filters.stage) chk(f.voice_media.stage === true);
  if (filters.voice_text) chk(f.voice_media.voice_text_chat === true);
  if (filters.stream) chk(f.voice_media.streaming === true);
  if (filters.nosuppress) chk(f.voice_media.noise_suppression === true);
  if (filters.sound) chk(f.voice_media.soundboard === true);
  if (filters.activ) chk(f.voice_media.activities_games === true);
  if (filters.ringtone) chk(f.voice_media.custom_ringtones === true);
  if (filters.hls) chk(f.voice_media.smart_video_loading_hls === true);
  if (filters.app_gate) chk(f.community.application_gate === true);
  if (filters.web) chk(f.platform.web === true);
  if (filters.chan)
    chk(ordCheck(f.core_chat.channels, filters.chan as string, ORD_HIGH));
  if (filters.thr)
    chk(ordCheck(f.core_chat.threads, filters.thr as string, ORD_HIGH));
  if (filters.srch)
    chk(ordCheck(f.core_chat.search, filters.srch as string, ORD_HIGH));
  if (filters.dm) chk(f.core_chat.direct_messages === true);
  if (filters.dmg) chk(f.core_chat.dm_groups === true);
  if (filters.react) chk(f.core_chat.reactions === true);
  if (filters.edit) chk(f.core_chat.message_editing === true);
  if (filters.voice) chk(f.voice_media.voice_calls === true);
  if (filters.vid) chk(f.voice_media.video_calls === true);
  if (filters.screen) chk(f.voice_media.screen_sharing === true);
  if (filters.files)
    chk(
      ordCheck(f.voice_media.file_sharing, filters.files as string, ORD_HIGH),
    );
  if (filters.bots)
    chk(ordCheck(f.community.bots_plugins, filters.bots as string, ORD_HIGH));
  if (filters.amod)
    chk(ordCheck(f.community.automod, filters.amod as string, ORD_HIGH));
  if (filters.emote) chk(f.community.custom_emotes === true);
  if (filters.stick) chk(f.community.custom_stickers === true);
  if (filters.mob) chk(f.platform.mobile === true);
  if (filters.desk) chk(f.platform.desktop === true);
  if (filters.dsk) chk(f.platform.desktop_app_platform === filters.dsk);
  if (filters.sh)
    chk(ordCheck(f.architecture.self_hosting, filters.sh as string, ORD_HIGH));
  if (filters.fed)
    chk(ordCheck(f.architecture.federation, filters.fed as string, ORD_HIGH));
  if (filters.disc)
    chk(ordCheck(f.architecture.discovery, filters.disc as string, ORD_HIGH));
  if (filters.usr)
    chk(ordCheck(f.adoption.userbase, filters.usr as string, ORD_HIGH));
  if (filters.mkt) chk(f.adoption.market_focus === filters.mkt);
  if (filters.perf)
    chk(ordCheck(f.adoption.performance, filters.perf as string, ORD_HIGH));
  if (filters.safe)
    chk(ordCheck(f.safety.safety_concerns, filters.safe as string, ORD_LOW));
  if (filters.trans)
    chk(ordCheck(f.safety.transparency, filters.trans as string, ORD_HIGH));
  if (filters.sec_hist)
    chk(
      ordCheck(
        f.privacy.security_history,
        filters.sec_hist as string,
        ORD_HIGH,
      ),
    );
  if (filters.ch_hist)
    chk(
      ordCheck(
        f.core_chat.channel_history,
        filters.ch_hist as string,
        ORD_HIGH,
      ),
    );
  if (filters.markdown)
    chk(ordCheck(f.core_chat.markdown, filters.markdown as string, ORD_HIGH));
  if (filters.plural)
    chk(
      ordCheck(
        f.community.plural_kit_support,
        filters.plural as string,
        ORD_HIGH,
      ),
    );
  if (filters.polls)
    chk(ordCheck(f.community.polls, filters.polls as string, ORD_HIGH));
  if (filters.events)
    chk(ordCheck(f.community.events, filters.events as string, ORD_HIGH));
  if (filters.collab)
    chk(
      ordCheck(
        f.community.collaboration_tools,
        filters.collab as string,
        ORD_HIGH,
      ),
    );
  if (filters.import)
    chk(
      ordCheck(
        f.community.import_from_discord,
        filters.import as string,
        ORD_HIGH,
      ),
    );
  if (filters.discord_sync)
    chk(
      ordCheck(
        f.community.discord_bridge_sync,
        filters.discord_sync as string,
        ORD_HIGH,
      ),
    );
  if (filters.cross_lang)
    chk(
      ordCheck(
        f.platform.cross_language_support,
        filters.cross_lang as string,
        ORD_HIGH,
      ),
    );
  if (filters.consumer)
    chk(f.adoption.consumer_relationship === filters.consumer);
  if (filters.ai_safety)
    chk(ordCheck(f.safety.ai_safety, filters.ai_safety as string, ORD_HIGH));

  return total === 0 ? null : Math.round((hits / total) * 100);
}

function scorePlatformWithRating(
  p: PlatformData,
  filters: FilterState,
): number | null {
  const filterScore = scorePlatform(p, filters);
  if (filterScore === null) return null;
  const rating = p.rating === -1 ? 0 : p.rating;
  return Math.round(filterScore * 0.7 + rating * 0.3);
}

const filters: FilterState = {};

const mainList = document.getElementById("main-list")!;
const altsLabel = document.getElementById("alts-label");

const rows: HTMLElement[] = [
  ...document.querySelectorAll<HTMLElement>(".prow:not(.prow--comparison)"),
];

const rowMap = new Map<HTMLElement, PlatformData>();
rows.forEach((row) => {
  const data = JSON.parse(row.dataset.platform!) as PlatformData;
  rowMap.set(row, data);
});

document.querySelectorAll<HTMLButtonElement>(".prow-header").forEach((btn) => {
  btn.addEventListener("click", () => {
    const prow = btn.closest<HTMLElement>(".prow")!;
    const panel = prow.querySelector<HTMLElement>(".prow-expand")!;
    const open = prow.hasAttribute("data-open");
    if (open) {
      prow.removeAttribute("data-open");
      btn.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    } else {
      prow.setAttribute("data-open", "");
      btn.setAttribute("aria-expanded", "true");
      panel.hidden = false;
    }
  });
});

const notesModal = document.getElementById("notes-modal")!;
const notesModalBackdrop = document.querySelector(
  ".notes-modal-backdrop",
) as HTMLElement;
const notesModalClose = document.getElementById(
  "notes-modal-close",
) as HTMLButtonElement;
const notesModalTitle = document.getElementById("notes-modal-title")!;
const notesModalText = document.getElementById("notes-modal-text")!;

document.querySelectorAll<HTMLButtonElement>(".notes-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const prow = btn.closest<HTMLElement>(".prow")!;
    const platform = JSON.parse(prow.dataset.platform!) as PlatformData;
    notesModalTitle.textContent = `Reviewer Notes for ${platform.name}`;
    notesModalText.textContent = platform.notes || "No notes";
    notesModal.hidden = false;
  });
});

notesModalClose.addEventListener("click", (e) => {
  e.stopPropagation();
  notesModal.hidden = true;
});

notesModalBackdrop.addEventListener("click", () => {
  notesModal.hidden = true;
});

document
  .querySelector(".notes-modal-content")!
  .addEventListener("click", (e) => {
    e.stopPropagation();
  });

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !notesModal.hidden) {
    notesModal.hidden = true;
  }
});

function scoreColor(sc: number): string {
  if (sc >= 75) return "#5aad5a";
  if (sc >= 50) return "#c4872a";
  return "#c44a4a";
}

function rerank(): void {
  const anySet = Object.values(filters).some((v) => v);

  const scored = rows.map((row) => {
    const data = rowMap.get(row)!;
    return {
      row,
      data,
      sc: anySet
        ? scorePlatformWithRating(data, filters)!
        : (() => {
            const rating = data.rating === -1 ? 0 : data.rating;
            return rating;
          })(),
    };
  });

  scored.sort((a, b) => {
    if (a.sc !== b.sc) return b.sc - a.sc;
    const ra = a.data.rating === -1 ? 0 : a.data.rating;
    const rb = b.data.rating === -1 ? 0 : b.data.rating;
    if (ra !== rb) return rb - ra;
    return a.data.name.localeCompare(b.data.name);
  });

  scored.forEach(({ row, sc }, i) => {
    const scoreEl = row.querySelector<HTMLElement>("[data-match-score]");
    if (scoreEl) {
      scoreEl.textContent = sc + "%";
      scoreEl.style.color = scoreColor(sc);
    }

    const nameEl = row.querySelector<HTMLElement>(".prow-name");
    const existing = nameEl?.querySelector<HTMLElement>(".badge--best");
    if (i === 0 && anySet) {
      if (!existing) {
        const badge = document.createElement("span");
        badge.className = "badge badge--best";
        badge.textContent = "Best match";
        nameEl?.appendChild(badge);
      }
    } else {
      existing?.remove();
    }
  });

  scored.forEach(({ row }) => {
    mainList.appendChild(row);
  });

  if (altsLabel) {
    altsLabel.textContent = anySet
      ? "Alternatives (ranked by match)"
      : "Alternatives (ranked by rating)";
  }
}

document
  .querySelectorAll<HTMLSelectElement>(".f-sel[data-filter]")
  .forEach((sel) => {
    sel.addEventListener("change", () => {
      const key = sel.dataset.filter!;
      filters[key] = sel.value || false;
      rerank();
    });
  });

document
  .querySelectorAll<HTMLButtonElement>(".toggle[data-filter]")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      const checked = btn.getAttribute("aria-checked") === "true";
      btn.setAttribute("aria-checked", String(!checked));
      const key = btn.dataset.filter!;
      filters[key] = !checked;
      rerank();
    });
  });

document.getElementById("reset-btn")?.addEventListener("click", () => {
  document
    .querySelectorAll<HTMLSelectElement>(".f-sel[data-filter]")
    .forEach((sel) => {
      sel.value = "";
    });
  document
    .querySelectorAll<HTMLButtonElement>(".toggle[data-filter]")
    .forEach((btn) => {
      btn.setAttribute("aria-checked", "false");
    });
  Object.keys(filters).forEach((k) => delete filters[k]);
  rerank();
});

rerank();
