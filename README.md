# lwc-mobile-barcode-scanner

A mobile-friendly LWC named `productScanner` that uses the device's native barcode scanner via `lightning/mobileCapabilities`. Requires Salesforce Mobile App or Field Service Mobile.

## Salesforce DX Project

Salesforce DX is a development approach that brings source-driven development, team collaboration, and continuous integration to the Salesforce Platform. Instead of working directly in an org through a web browser, you work with metadata as source files in a local DX project, track changes in version control, and deploy through automated processes.

## Prerequisites

Before you start, make sure you have:

- **Salesforce CLI** - Download from [developer.salesforce.com/tools/salesforcecli](https://developer.salesforce.com/tools/salesforcecli).
- **VS Code with Salesforce Extension Pack** - See [Installation Instructions](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/install.html).
- **A development org** - Sign up for a free Developer Edition org [here](https://developer.salesforce.com/signup).
- **Dev Hub enabled** (optional, required to create scratch orgs) - Setup > Dev Hub.

## Project Structure

- **`force-app/main/default/`** - Metadata source files
- **`config/`** - Scratch org definitions and project settings
- **`scripts/`** - Automation scripts for common tasks
- **`sfdx-project.json`** - Project manifest

## Common Salesforce CLI Commands

- `sf org login web`: Authorize an org
- `sf org open`: Open your org in a browser
- `sf project deploy start`: Deploy metadata to your org
- `sf project retrieve start`: Retrieve metadata from your org
- `sf apex <command>`: Run Apex tests and anonymous Apex
- `sf data <command>`: Work with test data

## Additional Resources

- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/)
- [BarcodeScanner API Reference](https://developer.salesforce.com/docs/platform/lwc/guide/reference-lightning-barcodescanner.html)
