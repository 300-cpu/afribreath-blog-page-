function highlightText() {
    const input = document.getElementById('search-input');
    const filter = input.value.toLowerCase();
    const content = document.getElementById('content');
    const textNodes = getTextNodes(content);
  
    resetHighlight(content);
  
    if (filter) {
      textNodes.forEach(node => {
        const parent = node.parentNode;
        const text = node.nodeValue;
        const index = text.toLowerCase().indexOf(filter);
  
        if (index !== -1) {
          const highlightedText = document.createElement('span');
          highlightedText.className = 'highlight bg-yellow-300';
          highlightedText.textContent = text.substring(index, index + filter.length);
  
          const beforeText = document.createTextNode(text.substring(0, index));
          const afterText = document.createTextNode(text.substring(index + filter.length));
  
          parent.insertBefore(beforeText, node);
          parent.insertBefore(highlightedText, node);
          parent.insertBefore(afterText, node);
          parent.removeChild(node);
        }
      });
    }
  }
  
  function getTextNodes(node) {
    let textNodes = [];
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node);
    } else {
      node.childNodes.forEach(child => {
        textNodes = textNodes.concat(getTextNodes(child));
      });
    }
    return textNodes;
  }
  
  function resetHighlight(node) {
    const highlightedElements = node.querySelectorAll('.highlight');
    highlightedElements.forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
  }
  