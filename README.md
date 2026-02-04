# Flow Button Selector

A Lightning Web Component for Salesforce Screen Flows that displays a horizontal row of selectable buttons. Supports both single-select and multi-select modes.

## Deploy to Salesforce

<a href="https://githubsfdeploy.herokuapp.com/app/githubdeploy/jcd386/flow-button-selector?ref=main">
  <img alt="Deploy to Salesforce" src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

## Features

- **Horizontal button layout** with automatic wrapping
- **Single-select mode**: Select one option at a time
- **Multi-select mode**: Select multiple options
- **Dual labels**: Optional secondary label on the right side of each button
- **Pre-selection support**: Initialize with pre-selected values
- **SLDS styling**: Uses standard Lightning Design System button styles

## Configuration

When adding the component to a Screen Flow, configure these properties:

### Required Inputs

| Property | Type | Description |
|----------|------|-------------|
| Button Labels | Text Collection | Primary labels displayed on each button |
| Button Values | Text Collection | Values returned when buttons are selected |

### Optional Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Secondary Labels | Text Collection | - | Secondary labels displayed on the right side of buttons |
| Allow Multiple Selections | Checkbox | false | Enable multi-select mode |
| Pre-Selected Values | Text Collection | - | Values to pre-select when the screen loads |

### Output

| Property | Type | Description |
|----------|------|-------------|
| Selected Values | Text Collection | The value(s) of the selected button(s) |

## Visual Behavior

### Button States
- **Unselected**: Neutral outline style
- **Selected**: Brand color (blue) with white text

### Label Display
- **Single label**: Centered text
- **Dual labels**: Primary label on left, secondary label on right

### Selection Behavior

| Mode | Click Unselected | Click Selected |
|------|------------------|----------------|
| Single-select | Selects it, deselects others | Deselects it |
| Multi-select | Adds to selection | Removes from selection |

## Example Usage

### Basic Single-Select
```
Button Labels: ["Option A", "Option B", "Option C"]
Button Values: ["a", "b", "c"]
Allow Multiple Selections: false
```

### Multi-Select with Secondary Labels
```
Button Labels: ["Premium", "Standard", "Basic"]
Button Values: ["premium", "standard", "basic"]
Secondary Labels: ["$99/mo", "$49/mo", "$19/mo"]
Allow Multiple Selections: true
```

### With Pre-Selected Values
```
Button Labels: ["Yes", "No", "Maybe"]
Button Values: ["yes", "no", "maybe"]
Pre-Selected Values: ["yes"]
```

## Requirements

- Salesforce org with Lightning Experience enabled
- API version 60.0 or higher

## License

MIT License
