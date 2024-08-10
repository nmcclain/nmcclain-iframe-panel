# IFrame Panel for Grafana

The IFrame panel is a simple plugin to use IFrames in Grafana dashboards without having to set the `DISABLE_SANITIZE_HTML` option.

Using this plugin is more secure than disabling HTML sanitization, but still exposes you to the inherent risks of IFrames, such as ClickJacking and Cross Frame Scripting.

## Requirements

- **Grafana 10** or **Grafana 11**.

## Getting Started

This plugin is not yet available from the Grafana Labs plugin directory. You have two options to try it out:

1. The pre-release is signed for "localhost:3000" and works for local testing.
2. You can test the plugin by setting app_mode: development, to allow un-signed plugins. This is not recommended in production.

## Highlights

- One required configuration option: URL to show in the IFrame panel.
- Optionally scale/zoom IFrames as desired.
- Optionally disable pointer-events on IFrames.
- Variables are supported for the IFrame Source URL.
- Special variable "iframe_dbid" is available to populate Dashboard ID.
- No Datasource is required/used.

## Feedback

We're looking forward to your questions and/or contributions.

- Ask a question, request a new feature, or report an issue at [GitHub issues](https://github.com/nmcclain/nmcclain-iframe-panel/issues).
- Star the repository to show your support.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/nmcclain/nmcclain-iframe-panel/blob/main/LICENSE).
