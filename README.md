# IFrames for Grafana

The IFrames panel is a simple plugin to use IFrames in Grafana dashboards without having to set the `DISABLE_SANITIZE_HTML` option.

Using this plugin is more secure than disabling HTML sanitization, but still exposes you to the risks IFrames introduce, such as ClickJacking.

## Requirements

- **Grafana 10** or **Grafana 11**. TK

## Getting Started

You can install the IFrames panel from the [Grafana Plugins [catalog](https://grafana.com/grafana/plugins/nmcclain-iframe-panel/) or use the Grafana command line tool.

For the latter, please use the following command:

```bash
grafana-cli plugins install nmcclain-iframe-panel
```

## Highlights

TK
- Provides functionality to create customizable forms.
- Supports custom code for initial and update requests.
- Supports API requests, including the `GET` request to get initial values and the `DELETE`, `PATCH`, `POST`, and `PUT` requests to send values updated in the form.

## Documentation

TK

## Feedback

We're looking forward to your questions and/or contributions.

- Ask a question, request a new feature, or report an issue at [GitHub issues](https://github.com/nmcclain/nmcclain-iframe-panel/issues).
- Star the repository to show your support.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/nmcclain/nmcclain-iframe-panel/blob/main/LICENSE).
