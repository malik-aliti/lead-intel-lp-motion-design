// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);
// Fonts + @remotion/media audio decode can be CPU-heavy under high concurrency;
// give delayRender() (incl. font loads) generous headroom so a busy worker
// never trips the default 28s timeout.
Config.setDelayRenderTimeoutInMilliseconds(120000);
