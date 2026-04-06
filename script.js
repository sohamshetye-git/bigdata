function copyCode(button) {
    const codeBlock = button.nextElementSibling.querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Change button text and style temporarily
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 2000);
    });
}

// Add some basic syntax highlighting
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('code');
    
    codeBlocks.forEach(block => {
        let html = block.innerHTML;
        
        // Highlight Python keywords
        html = html.replace(/\b(def|import|from|for|if|else|elif|return|class|try|except|with|as|in|and|or|not|True|False|None|print)\b/g, '<span class="keyword">$1</span>');
        
        // Highlight strings
        html = html.replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>');
        
        // Highlight comments
        html = html.replace(/(#.*$)/gm, '<span class="comment">$1</span>');
        
        // Highlight numbers
        html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
        
        block.innerHTML = html;
    });
});