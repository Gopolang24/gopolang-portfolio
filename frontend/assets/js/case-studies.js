/* ============================================
   CASE STUDIES FUNCTIONALITY
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Code copy functionality
    const copyButtons = document.querySelectorAll('.code-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the code block
            const codeBlock = this.closest('.code-block');
            const codeElement = codeBlock.querySelector('code');
            const codeText = codeElement.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(codeText).then(() => {
                // Change button text temporarily
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fa fa-check"></i> Copied!';
                this.style.color = '#10b981';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code:', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = codeText;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fa fa-check"></i> Copied!';
                    this.style.color = '#10b981';
                    
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                        this.style.color = '';
                    }, 2000);
                } catch (err) {
                    console.error('Fallback copy failed:', err);
                }
                
                document.body.removeChild(textArea);
            });
        });
    });
});
