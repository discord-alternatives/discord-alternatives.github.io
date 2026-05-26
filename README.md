# Discord Alternatives

A structured comparison of Discord-like communication platforms, including both open and closed-source alternatives.

This project collects and normalizes feature data across chat platforms to make differences in functionality, privacy, and infrastructure easier to compare at a glance.

All platforms are defined in `/data/platforms.json`.

You can view the live dataset in spreadsheet form here: https://stribes.github.io/discord-alternatives/

# Schema Documentation

# 1. Top-Level Object

Each object represents a single platform.

## name
Type: string  
Definition: Human-readable name of the project.

## website
Type: string (URI)  
Definition: Primary official website or landing page used as the authoritative project source.

Rules:
- Must be the official project site
- Avoid mirrors, forks, or community-maintained pages unless officially primary

## repo
Type: string (URI)  
Definition: Primary source code repository (e.g., GitHub, GitLab, Codeberg).

## license
Type: string  
Definition: Open-source license identifier describing how the project may be used, modified, and redistributed.

Examples:
- MIT
- Apache-2.0
- AGPL-3.0

## open_source
Type: boolean  
Definition: Indicates whether the project is open source.

Value rule:
- Must always be true for entries in this dataset.

# 2. features Object

Definition:
A structured capability model used to compare communication platforms across functional, technical, and ecosystem dimensions.

# 2.1 privacy

## encryption
Type: enum  
Definition: Level of message/data encryption supported by the system.

Values:
- none: No encryption in transit or at rest for messages
- optional: Encryption exists but must be manually enabled or is not universal
- partial: Encryption is used in some parts of the system but not end-to-end or not consistently applied
- full: End-to-end or system-wide encryption is implemented for message/data protection
- unknown: Encryption model is not documented or cannot be verified

## data_harvesting_risk
Type: enum  
Definition: Estimated risk of user data collection beyond core functionality.

Values:
- low: Minimal telemetry, no meaningful data collection beyond operation
- medium: Some analytics or optional telemetry collection
- high: Extensive tracking, unclear usage policies, or aggressive data collection
- unknown: Not verifiable

## security_history
Type: enum  
Definition: Overall historical security posture based on known vulnerabilities and incident handling.

Values:
- good: Few known issues, responsive maintenance, strong security practices
- mixed: Some notable issues or inconsistent response history
- poor: Repeated vulnerabilities, poor response, or unresolved security concerns
- unknown: Not enough data to evaluate

## kyc_required
Type: enum  
Definition: Whether identity verification (KYC) is required to use the platform.

Values:
- none: No identity verification required
- optional: Required only for certain features or tiers
- required: Mandatory identity verification for usage
- unknown: Not documented or unclear

## nsfw_support
Type: enum  
Definition: Whether the platform allows or supports adult content communities.

Values:
- none: NSFW content is disallowed
- limited: NSFW allowed under strict restrictions or moderation constraints
- full: NSFW content is generally supported with minimal restrictions
- unknown: Not documented

# 2.2 core_chat

## channels
Type: enum  
Definition: Structure and sophistication of channel organization.

Values:
- none: No channel system exists
- basic: Simple chat rooms without advanced organization
- advanced: Structured channels with categories, permissions, or hierarchy support

## channel_history
Type: enum  
Definition: Level of message persistence within channels.

Values:
- none: Messages are not persisted or disappear after session
- limited: History is capped by time, size, or accessibility constraints
- full: Complete persistent message history is stored and accessible

## persistent_channel_order
Type: boolean  
Definition: Whether channel ordering is saved and consistent across sessions and devices.

## threads
Type: enum  
Definition: Support for structured sub-conversations within channels.

Values:
- none: No threading system
- basic: Simple replies or lightweight thread-like behavior
- advanced: Full thread system with dedicated UI and independent discussion flows

## pinned_posts
Type: boolean  
Definition: Whether messages can be pinned for persistent visibility within a channel.

## direct_messages
Type: boolean  
Definition: Whether private one-to-one messaging is supported.

## reactions
Type: boolean  
Definition: Whether users can react to messages with emoji or similar reactions.

## embeds
Type: boolean  
Definition: Whether rich link previews or embedded content are supported.

## markdown
Type: enum  
Definition: Level of markdown or text formatting support.

Values:
- none: Plain text only
- basic: Limited formatting (e.g., bold, italic)
- advanced: Full or extended markdown support

## message_editing
Type: boolean  
Definition: Whether users can edit messages after sending.

## search
Type: enum  
Definition: Capability of searching messages and content.

Values:
- none: No search functionality
- basic: Simple keyword search with limited scope
- advanced: Indexed search across messages, channels, and metadata

## typing_indicators
Type: boolean  
Definition: Whether the system shows real-time typing status of users.

# 2.3 voice_media

## voice_calls
Type: boolean  
Definition: Support for real-time audio communication between users.

## video_calls
Type: boolean  
Definition: Support for real-time video communication.

## screen_sharing
Type: boolean  
Definition: Ability to share a screen or application window in real time.

## streaming
Type: boolean  
Definition: Support for broadcasting live media streams to other users.

## noise_suppression
Type: boolean  
Definition: Audio processing feature that reduces background noise during voice communication.

## file_sharing
Type: enum  
Definition: Capability and limits of sending files between users.

Values:
- none: File transfer not supported
- limited: Restricted by size, type, or access constraints
- full: Broad or unrestricted file sharing support

## soundboard
Type: boolean  
Definition: Ability to play audio clips or effects in voice channels.

# 2.4 community

## bots_plugins
Type: enum  
Definition: Level of support for bots, automation, or plugin ecosystems.

Values:
- none: No automation or plugin support
- limited: Basic bot support with restricted APIs
- full: Extensive bot API or plugin ecosystem

## plural_kit_support
Type: enum  
Definition: Support for identity-switching systems similar to PluralKit-style integrations.

Values:
- none: No support
- partial: Workarounds or limited compatibility
- full: Native or first-class support

## custom_emotes
Type: boolean  
Definition: Whether users can create and use custom emoji/emotes.

## custom_stickers
Type: boolean  
Definition: Whether users can create and use custom sticker-style media.

## polls
Type: enum  
Definition: Availability and sophistication of polling features.

Values:
- none: No polling functionality
- basic: Simple single-question polls
- advanced: Multi-option or feature-rich polling systems

## events
Type: enum  
Definition: Ability to schedule and manage community events.

Values:
- none: No event system
- basic: Simple scheduling or announcements
- advanced: Full event management with reminders and integrations

## collaboration_tools
Type: enum  
Definition: Level of structured cooperative features beyond messaging.

Values:
- none: Only messaging exists; no shared work structures
- basic: Light collaboration tools (threads, mentions, simple coordination features)
- advanced: Dedicated collaborative systems (shared docs, real-time editing, shared state, integrations)

# 2.5 platform

## mobile
Type: boolean  
Definition: Availability of a mobile client.

## web
Type: boolean  
Definition: Availability of a web-based client.

## desktop
Type: boolean  
Definition: Availability of a native desktop client.

# 2.6 architecture

## federation
Type: enum  
Definition: Degree to which the system supports decentralized or federated communication.

Values:
- none: Fully centralized system
- partial: Limited federation or bridging support
- full: Fully federated architecture

## self_hosting
Type: enum  
Definition: Whether users can host their own instance of the platform.

Values:
- none: Cannot be self-hosted
- partial: Limited or experimental self-hosting support
- full: Fully self-hostable system

## discovery
Type: enum  
Definition: How users discover servers, communities, or peers.

Values:
- none: No discovery mechanism
- basic: Invite-only or manual discovery
- advanced: Searchable directories or public discovery systems

## open_source
Type: boolean  
Definition: Indicates whether core architecture is open source.

Value rule:
- Must always be true in this dataset.

# 2.7 adoption

## userbase
Type: enum  
Definition: Relative size of active user population.

Values:
- low: Small or niche userbase
- medium: Moderate adoption
- high: Large-scale adoption
- unknown: Not verifiable

## performance
Type: enum  
Definition: Overall performance efficiency and responsiveness.

Values:
- low: Poor performance or heavy resource usage
- medium: Acceptable performance under normal conditions
- high: Efficient and optimized performance
- unknown: Not verifiable

## market_focus
Type: enum  
Definition: Primary intended audience or use case.

Values:
- gaming: Focused on gaming communities
- general: General-purpose communication
- enterprise: Business or organizational use
- privacy: Privacy-focused communication
- mixed: Multiple overlapping focus areas
- unknown: Not clearly defined

## consumer_relationship
Type: enum  
Definition: Relationship model between developers and users.

Values:
- closed: Controlled, product-driven ecosystem
- neutral: Standard open-source or balanced governance model
- open: Highly permissive APIs and extensibility
- community-driven: Governance and development strongly community-led

# 2.8 safety

## ai_safety
Type: enum  
Definition: Level of safety controls applied to AI-related features (if present).

Values:
- none: No AI features or no safety systems in place
- partial: Basic filtering or limited controls
- yes: Structured AI safety systems and policies exist
- unknown: Not verifiable

## safety_concerns
Type: enum  
Definition: Level of known safety or abuse-related concerns in the platform.

Values:
- low: Minimal known issues
- medium: Some documented concerns or incidents
- high: Significant or recurring issues
- unknown: Not enough data

## transparency
Type: enum  
Definition: How openly the platform publishes information about policies, moderation, and operations.

Values:
- low: Little to no public documentation
- medium: Partial documentation or inconsistent transparency
- high: Clear policies, audits, or strong public documentation
