export const setWindowLocationHash = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) element.scrollIntoView();
}