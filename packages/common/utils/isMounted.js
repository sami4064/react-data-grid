const isMounted = node => {
  if(!node) return false;
  if (node.nodeType === Node.DOCUMENT_NODE) return true;
  if (node.parentNode == undefined) return false;
  return isMounted(node.parentNode);
};

export default isMounted;