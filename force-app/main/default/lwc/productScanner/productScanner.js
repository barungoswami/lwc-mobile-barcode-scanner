import { LightningElement, track } from 'lwc';
import { getBarcodeScanner } from 'lightning/mobileCapabilities';

const STATE = {
    UNAVAILABLE: 'unavailable',
    IDLE: 'idle',
    SCANNING: 'scanning',
    RESULT: 'result',
    ERROR: 'error',
};

const ERROR_MESSAGES = {
    USER_DISMISSED: null, // silent — user chose to cancel
    USER_DENIED_PERMISSION:
        'Camera permission was denied. Please allow camera access when prompted and try again.',
    USER_DISABLED_PERMISSION:
        'Camera access is disabled. Go to your device Settings and enable camera permission for the Salesforce app.',
    INVALID_BARCODE_TYPE_REQUESTED:
        'An unsupported barcode type was requested. Please contact your administrator.',
    SERVICE_NOT_ENABLED:
        'Barcode scanning is not enabled for this org. Please contact your administrator.',
    UNKNOWN_REASON:
        'An unexpected error occurred. Please try again.',
};

export default class ProductScanner extends LightningElement {
    @track _state = STATE.IDLE;
    @track scannedValue = '';
    @track scannedType = '';
    @track errorMessage = '';

    _scanner = null;

    connectedCallback() {
        this._scanner = getBarcodeScanner();
        if (!this._scanner || !this._scanner.isAvailable()) {
            this._state = STATE.UNAVAILABLE;
        }
    }

    disconnectedCallback() {
        // Ensure scanner resources are released if the component unmounts mid-scan
        if (this._scanner && this._state === STATE.SCANNING) {
            this._scanner.dismiss();
        }
    }

    async handleScan() {
        if (!this._scanner || !this._scanner.isAvailable()) {
            return;
        }

        this._state = STATE.SCANNING;
        this.scannedValue = '';
        this.scannedType = '';
        this.errorMessage = '';

        const options = {
            instructionText: 'Point the camera at a product barcode',
            successText: 'Product scanned!',
            showSuccessCheckMark: true,
            vibrateOnSuccess: true,
            scannerSize: 'LARGE',
            cameraFacing: 'BACK',
            previewBarcodeData: true,
            enableMultiScan: false,
        };

        try {
            const results = await this._scanner.scan(options);
            if (results && results.length > 0) {
                this.scannedValue = results[0].value;
                this.scannedType = results[0].type;
                this._state = STATE.RESULT;
                this.dispatchEvent(
                    new CustomEvent('barcodedetected', {
                        detail: { value: this.scannedValue, type: this.scannedType },
                        bubbles: true,
                        composed: true,
                    })
                );
            } else {
                this._state = STATE.IDLE;
            }
        } catch (error) {
            const code = error?.code ?? 'UNKNOWN_REASON';
            if (code === 'USER_DISMISSED') {
                // User tapped Cancel — return silently to idle
                this._state = STATE.IDLE;
                return;
            }
            this.errorMessage = ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN_REASON;
            this._state = STATE.ERROR;
        }
    }

    handleClear() {
        this.scannedValue = '';
        this.scannedType = '';
        this.errorMessage = '';
        this._state = STATE.IDLE;
    }

    // --- state helpers for template conditionals ---
    get scannerUnavailable() { return this._state === STATE.UNAVAILABLE; }
    get isIdle()             { return this._state === STATE.IDLE; }
    get isScanning()         { return this._state === STATE.SCANNING; }
    get hasResult()          { return this._state === STATE.RESULT; }
    get hasError()           { return this._state === STATE.ERROR; }
}
