import { LightningElement, api, track } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class FlowButtonSelector extends LightningElement {
    // Input properties from Flow
    @api buttonLabels = [];
    @api buttonValues = [];
    @api buttonLabels2 = [];
    @api allowMultiSelect = false;

    // Internal state for selected values
    @track _selectedValues = [];

    // Getter/setter for pre-selected values to initialize on load
    _preSelectedValues = [];
    _isConnected = false;

    @api
    get preSelectedValues() {
        return this._preSelectedValues;
    }

    set preSelectedValues(value) {
        this._preSelectedValues = value || [];
        if (this._preSelectedValues.length > 0) {
            this._selectedValues = [...this._preSelectedValues];
        }
    }

    // Lifecycle hook - notify Flow of initial selection after component is connected
    connectedCallback() {
        this._isConnected = true;
        // Always notify Flow of initial state so output is populated even if user doesn't interact
        this.notifyFlowOfChange();
    }

    // Output property for Flow - collection of all selected values
    @api
    get selectedValues() {
        return this._selectedValues;
    }

    // Output property for Flow - single value (first selected)
    @api
    get selectedValue() {
        return this._selectedValues.length > 0 ? this._selectedValues[0] : '';
    }

    // Computed property to build button data for the template
    get buttons() {
        if (!this.buttonLabels || !this.buttonValues) {
            return [];
        }

        return this.buttonLabels.map((label, index) => {
            const value = this.buttonValues[index] || '';
            const label2 = this.buttonLabels2 && this.buttonLabels2[index]
                ? this.buttonLabels2[index]
                : null;
            const isSelected = this._selectedValues.includes(value);

            // Build button class based on state and label mode
            let buttonClass = isSelected
                ? 'slds-button slds-button_brand button-item'
                : 'slds-button slds-button_neutral button-item';

            // Add dual-label class for proper flexbox layout
            if (label2) {
                buttonClass += ' dual-label';
            }

            return {
                key: `btn-${index}`,
                value: value,
                label: label,
                label2: label2,
                hasDualLabels: !!label2,
                isSelected: isSelected,
                buttonClass: buttonClass,
                ariaPressed: isSelected ? 'true' : 'false'
            };
        });
    }

    // Handle button click
    handleButtonClick(event) {
        const clickedValue = event.currentTarget.dataset.value;

        // If already selected, do nothing (no deselection allowed)
        if (this._selectedValues.includes(clickedValue)) {
            return;
        }

        if (this.allowMultiSelect) {
            // Multi-select: add to selection
            this._selectedValues = [...this._selectedValues, clickedValue];
        } else {
            // Single-select: replace with clicked value
            this._selectedValues = [clickedValue];
        }

        this.notifyFlowOfChange();
    }

    // Notify Flow of the selection change
    notifyFlowOfChange() {
        // Fire event for collection output
        this.dispatchEvent(new FlowAttributeChangeEvent(
            'selectedValues',
            this._selectedValues
        ));

        // Fire event for single value output (first selected or empty string)
        this.dispatchEvent(new FlowAttributeChangeEvent(
            'selectedValue',
            this._selectedValues.length > 0 ? this._selectedValues[0] : ''
        ));
    }
}
