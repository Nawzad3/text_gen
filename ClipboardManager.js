/**
 * ClipboardManager.js - Handles clipboard operations
 * Kurdish Text Generator - Claude-style interface
 */

/**
 * ClipboardManager class - Manages clipboard copy operations
 */
class ClipboardManager {
    /**
     * Copy text to clipboard
     * @param {string} text - The text to copy to clipboard
     * @returns {boolean} - True if copy was successful, false otherwise
     */
    copy(text) {
        try {
            // Modern clipboard API (if available)
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text)
                    .catch(err => {
                        console.error('Clipboard API failed:', err);
                        this.fallbackCopyToClipboard(text);
                    });
                return true;
            } else {
                // Fallback for older browsers or non-HTTPS contexts
                return this.fallbackCopyToClipboard(text);
            }
        } catch (err) {
            console.error('Unable to copy text:', err);
            return false;
        }
    }
    
    /**
     * Fallback method to copy text when Clipboard API is not available
     * @param {string} text - The text to copy
     * @returns {boolean} - True if copy was successful, false otherwise
     * @private
     */
    fallbackCopyToClipboard(text) {
        try {
            // Create a temporary textarea element to copy from
            const textarea = document.createElement('textarea');
            textarea.value = text;
            
            // Make the textarea out of viewport to make it invisible
            textarea.style.position = 'fixed';
            textarea.style.left = '-999999px';
            textarea.style.top = '-999999px';
            
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            
            // Execute copy command
            const success = document.execCommand('copy');
            
            // Remove temporary textarea
            document.body.removeChild(textarea);
            
            return success;
        } catch (err) {
            console.error('Fallback clipboard copy failed:', err);
            return false;
        }
    }
}

// Make the class available globally
window.ClipboardManager = ClipboardManager;